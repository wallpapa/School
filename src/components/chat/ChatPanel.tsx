"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLang } from "@/i18n/LangProvider";
import { useChat, type ChatMessage as ChatMsg } from "@/hooks/useChat";
import { useSession } from "@/hooks/useSession";
import ChatMessage from "./ChatMessage";
import SuggestionChips, { isActionChip } from "./SuggestionChips";

interface ChatPanelProps {
  onClose: () => void;
  onNewMessage?: () => void;
}

export default function ChatPanel({ onClose, onNewMessage }: ChatPanelProps) {
  const { lang, t } = useLang();
  const { sessionId } = useSession();
  const {
    messages,
    isLoading,
    suggestions,
    sendMessage,
  } = useChat(sessionId, lang);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage(text);
    onNewMessage?.();
  }, [input, isLoading, sendMessage, onNewMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChipSelect = (suggestion: string) => {
    setInput(suggestion);
    // Auto-send the suggestion
    setTimeout(() => {
      sendMessage(suggestion);
      setInput("");
    }, 100);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] flex flex-col bg-white shadow-2xl shadow-black/20 transition-all duration-300 lg:bottom-6 lg:left-auto lg:right-6 lg:top-auto lg:w-[400px] lg:max-h-[600px] lg:rounded-2xl lg:border lg:border-gray-200" style={{ top: "env(safe-area-inset-top, 0px)", maxHeight: "calc(100dvh - env(safe-area-inset-top, 0px))" }}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-white lg:rounded-t-2xl">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg">
          🎓
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold">{t("chatTitle")}</h3>
          <p className="text-[10px] text-white/80">{t("chatSubtitle")}</p>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/20 hover:text-white"
          aria-label="Close chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ minHeight: 0 }}>
        {/* Welcome message */}
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-3xl">
              🎓
            </div>
            <h4 className="text-sm font-semibold text-gray-800">
              {t("chatWelcomeTitle")}
            </h4>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed max-w-[280px] mx-auto">
              {t("chatWelcomeBody")}
            </p>

            {/* Quick start suggestions */}
            <div className="mt-4 space-y-2">
              {getQuickStarts(lang).map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleChipSelect(q)}
                  className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-left text-xs text-gray-700 transition hover:border-indigo-300 hover:bg-indigo-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Legal notice */}
            <p className="mt-4 text-[10px] text-gray-400 leading-relaxed px-4">
              {t("chatLegalNotice")}
            </p>
          </div>
        )}

        {/* Chat messages */}
        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            role={msg.role}
            content={msg.content}
            disclaimer={msg.disclaimer}
            schools={msg.schools}
            isStreaming={msg.isStreaming}
          />
        ))}

        {/* Loading indicator */}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex items-center gap-2 text-gray-400">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-sm">
              🎓
            </div>
            <div className="flex gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-300 [animation-delay:0ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-300 [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-300 [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion chips */}
      {suggestions.length > 0 && !isLoading && (
        <div className="border-t border-gray-100 px-4 py-2">
          <SuggestionChips
            suggestions={suggestions}
            onSelect={handleChipSelect}
          />
        </div>
      )}

      {/* Input area */}
      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 lg:rounded-b-2xl">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("chatPlaceholder")}
            disabled={isLoading}
            className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white transition hover:bg-indigo-700 active:scale-95 disabled:opacity-40 disabled:hover:bg-indigo-600"
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Quick start suggestions by language ── */
/* Warm, natural language — like asking a friend, not filling out a form */
function getQuickStarts(lang: string): string[] {
  const starts: Record<string, string[]> = {
    th: [
      "ลูกกำลังจะเข้าเรียน อยากดูตัวเลือกโรงเรียน",
      "อยากรู้ว่าหลักสูตร IB กับ IGCSE ต่างกันยังไง",
      "มีโรงเรียนดีๆ แถวบ้านไหม",
    ],
    en: [
      "My child is starting school — show me options",
      "What's the difference between IB and IGCSE?",
      "Any good schools near where I live?",
    ],
    zh: [
      "孩子要入学了，想看看有什么选择",
      "IB和IGCSE有什么区别？",
      "我家附近有好学校吗？",
    ],
    ja: [
      "子どもが入学するので、学校の選択肢を見たい",
      "IBとIGCSEの違いを教えて",
      "家の近くにいい学校はある？",
    ],
  };
  return starts[lang] || starts.th;
}
