import Anthropic from "@anthropic-ai/sdk";
import { classifyIntent, extractSchoolIds, getSuggestions, type Intent } from "@/lib/ai/intent-classifier";
import { retrieveContext, getSchoolNames } from "@/lib/ai/knowledge-retriever";
import { buildSystemPrompt, buildUserMessage } from "@/lib/ai/prompt-builder";
import { extractAnsweredIntents } from "@/lib/ai/intent-flow";
import { getSupabase } from "@/lib/supabase";

/* ── Legal disclaimer appended to every response ── */
const LEGAL_DISCLAIMER: Record<string, string> = {
  th: "\n\n⚠️ _ข้อมูลนี้เป็นเพียงข้อมูลเบื้องต้นเพื่อประกอบการตัดสินใจ ไม่ใช่คำแนะนำทางการศึกษาอย่างเป็นทางการ กรุณาติดต่อโรงเรียนโดยตรงเพื่อยืนยันข้อมูล_",
  en: "\n\n⚠️ _This information is for preliminary reference only and does not constitute official educational advice. Please contact schools directly to verify._",
  zh: "\n\n⚠️ _此信息仅供初步参考，不构成官方教育建议。请直接联系学校确认。_",
  ja: "\n\n⚠️ _この情報は予備的な参考情報であり、公式な教育アドバイスではありません。詳細は学校に直接お問い合わせください。_",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      session_id,
      message,
      lang = "th",
      context: userContext,
      conversation_history,
    } = body as {
      session_id: string;
      message: string;
      lang: string;
      context?: {
        persona?: string;
        budget_range?: [number, number];
        child_age?: string;
        current_page?: string;
        viewed_schools?: number[];
        curricula?: string[];
        location?: string;
      };
      conversation_history?: { role: string; content: string }[];
    };

    if (!message?.trim()) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    // 1) Classify intent
    const intent = classifyIntent(message);

    // 2) Extract mentioned schools
    const schoolNames = getSchoolNames();
    const mentionedIds = extractSchoolIds(message, schoolNames);

    // 3) Retrieve relevant school data
    const retrieved = retrieveContext(intent, message, mentionedIds, {
      budget_range: userContext?.budget_range,
      child_age: userContext?.child_age,
      curricula: userContext?.curricula,
      location: userContext?.location,
    });

    // 4) Get session info from Supabase
    let sessionInfo: {
      schools_viewed?: number[];
      pages_visited?: string[];
      chat_count?: number;
    } = {};
    if (session_id) {
      try {
        const { data: sessionData } = await getSupabase()
          .from("user_sessions")
          .select("schools_viewed, pages_visited, chat_count")
          .eq("session_id", session_id)
          .single();
        if (sessionData) {
          sessionInfo = sessionData;
        }
      } catch {
        // ignore — session may not exist yet
      }
    }

    // 5) Build system prompt
    const systemPrompt = buildSystemPrompt({
      intent,
      lang,
      persona: userContext?.persona,
      schools: retrieved.schools,
      totalSchools: retrieved.totalSchools,
      sessionInfo,
    });

    // 6) Build user messages (with conversation history)
    const userMessages = buildUserMessage(message, conversation_history);

    // 7) Call Claude API (streaming)
    const apiKey = process.env.ANTHROPIC_API_KEY;
    // Track answered intents from conversation history
    const answeredIntents = extractAnsweredIntents(
      conversation_history?.map((m) => ({
        ...m,
        intent: m.role === "assistant" ? classifyIntent(m.content) : undefined,
      }))
    );
    // Add current intent to answered list for suggestion prediction
    const allAnswered: Intent[] = [...answeredIntents, intent];

    if (!apiKey) {
      // Fallback: Return a helpful message without Claude
      const fallbackResponse = buildFallbackResponse(intent, retrieved, lang);
      await logChat(session_id, message, fallbackResponse, intent, mentionedIds, lang);
      return Response.json({
        summary: fallbackResponse,
        intent,
        suggestions: getSuggestions(
          intent,
          mentionedIds.map((id) => schoolNames.find((s) => s.id === id)?.short || ""),
          allAnswered,
          lang
        ),
        schools: retrieved.schools.slice(0, 3),
        disclaimer: LEGAL_DISCLAIMER[lang] || LEGAL_DISCLAIMER.th,
      });
    }

    const anthropic = new Anthropic({ apiKey });

    // Use streaming for better UX
    const stream = await anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: userMessages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    // Collect streamed response
    let fullResponse = "";
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              fullResponse += event.delta.text;
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "text", text: event.delta.text })}\n\n`
                )
              );
            }
          }

          // Send final metadata with flow-aware suggestions
          const mentionedShortNames = mentionedIds.map(
            (id) => schoolNames.find((s) => s.id === id)?.short || ""
          );
          const suggestions = getSuggestions(intent, mentionedShortNames, allAnswered, lang);

          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "done",
                intent,
                suggestions,
                schools: retrieved.schools.slice(0, 3).map((s) => ({
                  id: s.id,
                  name: s.name,
                  short: s.short,
                  efScore: s.efScore,
                  feeRange: s.feeRange,
                  curriculum: s.curriculum,
                  website: s.website,
                  phone: s.phone,
                  lat: s.lat,
                  lng: s.lng,
                  mapsQuery: s.mapsQuery,
                })),
                disclaimer: LEGAL_DISCLAIMER[lang] || LEGAL_DISCLAIMER.th,
              })}\n\n`
            )
          );

          controller.close();

          // Log chat asynchronously (non-blocking)
          logChat(session_id, message, fullResponse, intent, mentionedIds, lang).catch(
            () => {}
          );
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ── Log chat to Supabase ── */
async function logChat(
  sessionId: string,
  userMessage: string,
  aiResponse: string,
  intent: string,
  schoolIds: number[],
  lang: string
) {
  try {
    // Insert user message
    await getSupabase().from("chat_messages").insert({
      session_id: sessionId,
      role: "user",
      content: userMessage,
      intent,
      school_ids: schoolIds,
      metadata: { lang },
    });

    // Insert AI response
    await getSupabase().from("chat_messages").insert({
      session_id: sessionId,
      role: "assistant",
      content: aiResponse,
      intent,
      school_ids: schoolIds,
      metadata: { lang },
    });

    // Increment chat count
    try {
      const { data: session } = await getSupabase()
        .from("user_sessions")
        .select("chat_count")
        .eq("session_id", sessionId)
        .single();

      await getSupabase()
        .from("user_sessions")
        .update({
          chat_count: (session?.chat_count || 0) + 1,
          last_seen: new Date().toISOString(),
        })
        .eq("session_id", sessionId);
    } catch {
      // Silent fail
    }

    // Update intent analytics
    const today = new Date().toISOString().split("T")[0];
    const { data: existing } = await getSupabase()
      .from("intent_analytics")
      .select("*")
      .eq("date", today)
      .eq("intent", intent)
      .single();

    if (existing) {
      const samples = existing.sample_questions || [];
      if (samples.length < 5) samples.push(userMessage.slice(0, 200));
      await getSupabase()
        .from("intent_analytics")
        .update({
          count: (existing.count || 0) + 1,
          sample_questions: samples,
          top_school_ids: schoolIds.length > 0 ? schoolIds : existing.top_school_ids,
        })
        .eq("id", existing.id);
    } else {
      await getSupabase().from("intent_analytics").insert({
        date: today,
        intent,
        count: 1,
        sample_questions: [userMessage.slice(0, 200)],
        top_school_ids: schoolIds,
      });
    }
  } catch {
    // Silent fail — logging is non-critical
  }
}

/* ── Fallback response when no API key ── */
function buildFallbackResponse(
  intent: string,
  retrieved: { schools: { name: string; short: string; efScore: number; feeRange: string; curriculum: string }[] },
  lang: string
): string {
  const top3 = retrieved.schools.slice(0, 3);

  if (lang === "th") {
    let resp = `จากข้อมูลในระบบ เราพบโรงเรียนที่น่าสนใจ ${top3.length} แห่ง:\n\n`;
    top3.forEach((s, i) => {
      resp += `${i + 1}. **${s.short}** (EF ${s.efScore}/10)\n   ${s.feeRange} · ${s.curriculum}\n\n`;
    });
    resp += `💡 ต้องการข้อมูลเพิ่มเติมเกี่ยวกับโรงเรียนไหนเป็นพิเศษ?`;
    return resp;
  }

  let resp = `Based on our database, here are ${top3.length} recommended schools:\n\n`;
  top3.forEach((s, i) => {
    resp += `${i + 1}. **${s.short}** (EF ${s.efScore}/10)\n   ${s.feeRange} · ${s.curriculum}\n\n`;
  });
  resp += `💡 Would you like more details about any of these schools?`;
  return resp;
}
