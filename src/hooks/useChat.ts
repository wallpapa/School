"use client";

import { useState, useCallback, useRef } from "react";
import type { SuggestionItem, ActionChip } from "@/components/chat/SuggestionChips";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  disclaimer?: string;
  schools?: {
    id: number;
    name: string;
    short: string;
    efScore: number;
    feeRange: string;
    curriculum: string;
    website?: string;
    phone?: string;
    lat?: number;
    lng?: number;
    mapsQuery?: string;
  }[];
  suggestions?: string[];
  intent?: string;
  isStreaming?: boolean;
}

interface ChatContext {
  persona?: string;
  budget_range?: [number, number];
  child_age?: string;
  current_page?: string;
  viewed_schools?: number[];
  curricula?: string[];
  location?: string;
}

export function useChat(sessionId: string, lang: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [answeredIntents, setAnsweredIntents] = useState<string[]>([]);
  const contextRef = useRef<ChatContext>({});

  /** Update context (persona, budget, etc.) */
  const setContext = useCallback((ctx: Partial<ChatContext>) => {
    contextRef.current = { ...contextRef.current, ...ctx };
  }, []);

  /** Build action chips from school data (website, phone, map) */
  function buildActionChips(
    schools?: ChatMessage["schools"]
  ): ActionChip[] {
    if (!schools?.length) return [];
    const chips: ActionChip[] = [];
    const first = schools[0];

    if (first.phone) {
      chips.push({
        label: `📞 โทร ${first.short}`,
        type: "tel",
        value: first.phone,
      });
    }
    if (first.website) {
      chips.push({
        label: `🌐 เว็บ ${first.short}`,
        type: "link",
        value: first.website,
      });
    }
    if (first.lat || first.mapsQuery) {
      const mapsUrl = first.mapsQuery
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(first.mapsQuery)}`
        : `https://www.google.com/maps/search/?api=1&query=${first.lat},${first.lng}`;
      chips.push({
        label: `📍 แผนที่ ${first.short}`,
        type: "map",
        value: mapsUrl,
      });
    }
    return chips;
  }

  /** Send a message and process streaming response */
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      // Add user message
      const userMsg: ChatMessage = { role: "user", content: text };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      setSuggestions([]);

      // Build conversation history (last 6 messages for context)
      const history = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        // Add current page to context
        if (typeof window !== "undefined") {
          contextRef.current.current_page = window.location.pathname;
        }

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            message: text,
            lang,
            context: contextRef.current,
            conversation_history: history,
          }),
        });

        if (!res.ok) {
          throw new Error(`Chat API error: ${res.status}`);
        }

        const contentType = res.headers.get("content-type") || "";

        if (contentType.includes("text/event-stream")) {
          // Handle streaming response
          const reader = res.body?.getReader();
          if (!reader) throw new Error("No reader");

          const decoder = new TextDecoder();
          let aiContent = "";

          // Add empty assistant message for streaming
          const streamingMsg: ChatMessage = {
            role: "assistant",
            content: "",
            isStreaming: true,
          };
          setMessages((prev) => [...prev, streamingMsg]);

          let buffer = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              try {
                const data = JSON.parse(line.slice(6));

                if (data.type === "text") {
                  aiContent += data.text;
                  setMessages((prev) => {
                    const updated = [...prev];
                    const last = updated[updated.length - 1];
                    if (last.role === "assistant") {
                      updated[updated.length - 1] = {
                        ...last,
                        content: aiContent,
                        isStreaming: true,
                      };
                    }
                    return updated;
                  });
                }

                if (data.type === "done") {
                  // Track answered intent
                  if (data.intent) {
                    setAnsweredIntents((prev) =>
                      prev.includes(data.intent) ? prev : [...prev, data.intent]
                    );
                  }

                  // Finalize message
                  setMessages((prev) => {
                    const updated = [...prev];
                    const last = updated[updated.length - 1];
                    if (last.role === "assistant") {
                      updated[updated.length - 1] = {
                        ...last,
                        content: aiContent,
                        isStreaming: false,
                        schools: data.schools,
                        disclaimer: data.disclaimer,
                        intent: data.intent,
                      };
                    }
                    return updated;
                  });

                  // Merge text suggestions + action chips from school data
                  const textSuggestions: SuggestionItem[] = data.suggestions || [];
                  const actionChips = buildActionChips(data.schools);
                  setSuggestions([...textSuggestions, ...actionChips]);
                }
              } catch {
                // Skip malformed JSON
              }
            }
          }
        } else {
          // Handle JSON response (fallback, no streaming)
          const data = await res.json();
          const aiMsg: ChatMessage = {
            role: "assistant",
            content: data.summary || data.error || "ขออภัย ไม่สามารถตอบได้ในขณะนี้",
            schools: data.schools,
            disclaimer: data.disclaimer,
            intent: data.intent,
          };
          setMessages((prev) => [...prev, aiMsg]);

          // Track answered intent
          if (data.intent) {
            setAnsweredIntents((prev) =>
              prev.includes(data.intent) ? prev : [...prev, data.intent]
            );
          }

          const textSuggestions: SuggestionItem[] = data.suggestions || [];
          const actionChips = buildActionChips(data.schools);
          setSuggestions([...textSuggestions, ...actionChips]);
        }
      } catch (error) {
        console.error("Chat error:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              lang === "th"
                ? "ขออภัย เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
                : "Sorry, an error occurred. Please try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, lang, messages, isLoading]
  );

  /** Clear chat history */
  const clearChat = useCallback(() => {
    setMessages([]);
    setSuggestions([]);
    setAnsweredIntents([]);
  }, []);

  return {
    messages,
    isLoading,
    suggestions,
    answeredIntents,
    sendMessage,
    clearChat,
    setContext,
  };
}
