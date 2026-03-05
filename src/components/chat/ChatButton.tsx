"use client";

import { useState } from "react";
import ChatPanel from "./ChatPanel";

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={() => {
          setOpen((prev) => !prev);
          setUnread(0);
        }}
        aria-label="Open chat"
        className="fixed bottom-[88px] right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 lg:bottom-6 lg:right-6 lg:h-[56px] lg:w-[56px]"
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}

        {/* Unread badge */}
        {unread > 0 && !open && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {unread}
          </span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <ChatPanel
          onClose={() => setOpen(false)}
          onNewMessage={() => {
            if (!open) setUnread((u) => u + 1);
          }}
        />
      )}
    </>
  );
}
