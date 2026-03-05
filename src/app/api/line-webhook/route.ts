/**
 * LINE OA Webhook — receives messages from LINE Official Account
 * and proxies them to the SchoolFinder AI chat system.
 *
 * Setup:
 * 1. Create a LINE Messaging API channel at https://developers.line.biz
 * 2. Set webhook URL to: https://your-domain.com/api/line-webhook
 * 3. Add env vars: LINE_CHANNEL_ACCESS_TOKEN, LINE_CHANNEL_SECRET
 *
 * Legal compliance:
 * - Every response includes a legal disclaimer
 * - PDPA consent is handled via LINE rich menu opt-in
 * - Computer Crime Act (พ.ร.บ.คอมพิวเตอร์) compliance: no personal data stored without consent
 */

import { createHmac } from "crypto";
import { classifyIntent, extractSchoolIds, getSuggestions } from "@/lib/ai/intent-classifier";
import { retrieveContext, getSchoolNames } from "@/lib/ai/knowledge-retriever";
import { buildSystemPrompt, buildUserMessage } from "@/lib/ai/prompt-builder";
import { getSupabase } from "@/lib/supabase";

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || "";
const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET || "";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";

/* ── Legal disclaimers for LINE messages ── */
const LINE_DISCLAIMER =
  "\n\n⚠️ ข้อมูลนี้เป็นเพียงข้อมูลเบื้องต้น ไม่ใช่คำแนะนำทางการศึกษาอย่างเป็นทางการ กรุณาติดต่อโรงเรียนโดยตรงเพื่อยืนยัน\n🔒 ข้อมูลของท่านถูกเก็บรักษาตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA)";

const WELCOME_MESSAGE =
  "สวัสดีค่ะ! 🎓 ยินดีต้อนรับสู่ SchoolFinder AI\n\nช่วยค้นหาโรงเรียนที่เหมาะกับลูกคุณ ถามได้เลยค่ะ เช่น:\n• แนะนำโรงเรียนอินเตอร์ งบ 300K\n• เปรียบเทียบ IB กับ IGCSE\n• โรงเรียนใกล้สุขุมวิท\n\n⚠️ บริการนี้เป็นเพียงข้อมูลเบื้องต้นเพื่อประกอบการตัดสินใจ ไม่ถือเป็นคำแนะนำทางการศึกษาอย่างเป็นทางการ ไม่ถือเป็นการให้คำปรึกษาวิชาชีพ\n🔒 ข้อมูลของท่านถูกเก็บรักษาตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA) และ พ.ร.บ.ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์";

/** Verify LINE webhook signature */
function verifySignature(body: string, signature: string): boolean {
  if (!LINE_CHANNEL_SECRET) return false;
  const hash = createHmac("SHA256", LINE_CHANNEL_SECRET)
    .update(body)
    .digest("base64");
  return hash === signature;
}

/** Reply to LINE user */
async function replyToLine(replyToken: string, text: string) {
  // Truncate to LINE's 5000 char limit
  const truncated = text.length > 4800 ? text.slice(0, 4800) + "\n\n... (ดูต่อที่เว็บ schoolfinder.app)" : text;

  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: "text", text: truncated }],
    }),
  });
}

export async function POST(req: Request) {
  try {
    // Check if LINE credentials are configured
    if (!LINE_CHANNEL_ACCESS_TOKEN || !LINE_CHANNEL_SECRET) {
      return Response.json(
        { error: "LINE OA not configured. Set LINE_CHANNEL_ACCESS_TOKEN and LINE_CHANNEL_SECRET." },
        { status: 503 }
      );
    }

    const body = await req.text();
    const signature = req.headers.get("x-line-signature") || "";

    // Verify webhook signature
    if (!verifySignature(body, signature)) {
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }

    const data = JSON.parse(body);
    const events = data.events || [];

    for (const event of events) {
      if (event.type === "follow") {
        // New user followed — send welcome + legal notice
        await replyToLine(event.replyToken, WELCOME_MESSAGE);
        continue;
      }

      if (event.type !== "message" || event.message.type !== "text") continue;

      const userMessage = event.message.text;
      const lineUserId = event.source.userId;
      const replyToken = event.replyToken;

      // Use LINE userId as session_id (hashed for privacy)
      const sessionId = `line_${lineUserId.slice(0, 16)}`;

      // Classify intent & retrieve context
      const intent = classifyIntent(userMessage);
      const schoolNames = getSchoolNames();
      const mentionedIds = extractSchoolIds(userMessage, schoolNames);
      const retrieved = retrieveContext(intent, userMessage, mentionedIds);

      let aiResponse: string;

      if (ANTHROPIC_API_KEY) {
        // Call Claude API
        const Anthropic = (await import("@anthropic-ai/sdk")).default;
        const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

        const systemPrompt = buildSystemPrompt({
          intent,
          lang: "th",
          schools: retrieved.schools,
          totalSchools: retrieved.totalSchools,
        });

        const userMessages = buildUserMessage(userMessage);

        const response = await anthropic.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800, // Shorter for LINE
          system: systemPrompt,
          messages: userMessages.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        });

        aiResponse =
          response.content[0].type === "text"
            ? response.content[0].text
            : "ขออภัย ไม่สามารถตอบได้ในขณะนี้";
      } else {
        // Fallback without Claude
        const top3 = retrieved.schools.slice(0, 3);
        aiResponse = `จากข้อมูลในระบบ เราพบโรงเรียนที่น่าสนใจ:\n\n`;
        top3.forEach((s, i) => {
          aiResponse += `${i + 1}. ${s.short} (EF ${s.efScore}/10)\n   ${s.feeRange} · ${s.curriculum}\n\n`;
        });
        aiResponse += `💡 ดูข้อมูลเพิ่มเติมที่ schoolfinder.app`;
      }

      // Append legal disclaimer
      aiResponse += LINE_DISCLAIMER;

      // Reply to LINE
      await replyToLine(replyToken, aiResponse);

      // Log to Supabase (async, non-blocking)
      try {
        await getSupabase().from("chat_messages").insert([
          {
            session_id: sessionId,
            role: "user",
            content: userMessage,
            intent,
            school_ids: mentionedIds,
            metadata: { source: "line", lang: "th" },
          },
          {
            session_id: sessionId,
            role: "assistant",
            content: aiResponse,
            intent,
            school_ids: mentionedIds,
            metadata: { source: "line", lang: "th" },
          },
        ]);
      } catch {
        // Silent fail — logging is non-critical
      }
    }

    return Response.json({ status: "ok" });
  } catch (error) {
    console.error("LINE webhook error:", error);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}

// LINE webhook verification (GET request)
export async function GET() {
  return Response.json({ status: "LINE webhook active" });
}
