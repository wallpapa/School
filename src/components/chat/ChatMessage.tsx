"use client";

import { useState, useMemo } from "react";
import { useLang } from "@/i18n/LangProvider";
import GlossaryTooltip from "@/components/ui/GlossaryTooltip";
import { buildGlossaryRegex, findGlossaryEntry } from "@/lib/glossary";

interface ChatMessageProps {
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
  isStreaming?: boolean;
}

export default function ChatMessage({
  role,
  content,
  disclaimer,
  schools,
  isStreaming,
}: ChatMessageProps) {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(false);
  const isUser = role === "user";

  // Build glossary regex once
  const glossaryRegex = useMemo(() => buildGlossaryRegex(), []);

  // Split content into summary and detail
  const lines = content.split("\n");
  const summaryEnd = Math.min(lines.length, 6);
  const hasSeeMore = lines.length > 8;
  const summaryText = hasSeeMore ? lines.slice(0, summaryEnd).join("\n") : content;

  return (
    <div
      className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm ${
          isUser
            ? "bg-indigo-100 text-indigo-600"
            : "bg-gradient-to-br from-purple-500 to-indigo-600 text-white"
        }`}
      >
        {isUser ? "👤" : "🎓"}
      </div>

      {/* Message bubble */}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? "rounded-tr-sm bg-indigo-600 text-white"
            : "rounded-tl-sm border border-gray-100 bg-white text-gray-800 shadow-sm"
        }`}
      >
        {/* Render content with markdown + links + glossary tooltips */}
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {renderWithGlossary(
            expanded ? content : summaryText,
            isUser ? null : glossaryRegex
          )}
          {isStreaming && (
            <span className="inline-block h-4 w-1 animate-pulse bg-indigo-400 align-middle" />
          )}
        </div>

        {/* See more / See less */}
        {hasSeeMore && !isUser && !isStreaming && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-700"
          >
            {expanded ? t("chatSeeLess") : t("chatSeeMore")} {expanded ? "▴" : "▾"}
          </button>
        )}

        {/* School mini cards */}
        {schools && schools.length > 0 && !isUser && (
          <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
            {schools.map((school) => (
              <div
                key={school.id}
                className="rounded-lg border border-gray-100 bg-gray-50 transition-colors hover:bg-indigo-50 hover:border-indigo-200"
              >
                {/* Main card link */}
                <a
                  href={`/school/${school.id}`}
                  className="flex items-center gap-2 px-3 py-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                    {school.efScore}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      {school.short}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {school.feeRange} · {school.curriculum}
                    </p>
                  </div>
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Action buttons row */}
                {(school.website || school.phone || school.lat) && (
                  <div className="flex items-center gap-1 border-t border-gray-100 px-3 py-1.5">
                    {school.website && (
                      <a
                        href={school.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] text-gray-500 transition hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200"
                        title="Website"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" />
                        </svg>
                        เว็บ
                      </a>
                    )}
                    {school.phone && (
                      <a
                        href={`tel:${school.phone}`}
                        className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] text-gray-500 transition hover:bg-green-50 hover:text-green-600 border border-gray-200"
                        title="Call"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        โทร
                      </a>
                    )}
                    {(school.lat || school.mapsQuery) && (
                      <a
                        href={school.mapsQuery
                          ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(school.mapsQuery)}`
                          : `https://www.google.com/maps/search/?api=1&query=${school.lat},${school.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] text-gray-500 transition hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
                        title="Map"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        แผนที่
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Legal disclaimer */}
        {disclaimer && !isUser && !isStreaming && (
          <div className="mt-2 border-t border-gray-100 pt-2 text-[10px] leading-relaxed text-gray-400">
            {renderMarkdown(disclaimer.replace(/^[\n]+/, ""))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Render text with links + markdown + glossary tooltips ── */
function renderWithGlossary(
  text: string,
  glossaryRegex: RegExp | null
): React.ReactNode[] {
  // Step 1: Split out markdown links [text](url) first (before other processing)
  const linkPattern = /(\[[^\]]+\]\([^)]+\))/g;
  const linkParts = text.split(linkPattern);

  const result: React.ReactNode[] = [];

  linkParts.forEach((segment, si) => {
    // Check if this segment is a markdown link
    const linkMatch = segment.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, linkText, url] = linkMatch;
      // Determine link type
      const isTel = url.startsWith("tel:");
      const isExternal = url.startsWith("http");
      result.push(
        <a
          key={`link-${si}`}
          href={url}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={`inline-flex items-center gap-0.5 underline decoration-1 underline-offset-2 ${
            isTel
              ? "text-green-600 hover:text-green-700"
              : "text-indigo-600 hover:text-indigo-700"
          }`}
        >
          {linkText}
          {isExternal && (
            <svg className="inline h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
        </a>
      );
      return;
    }

    // Step 2: Process remaining text for bare URLs
    const urlPattern = /(https?:\/\/[^\s)]+)/g;
    const urlParts = segment.split(urlPattern);

    urlParts.forEach((urlSeg, ui) => {
      if (urlPattern.test(urlSeg)) {
        // Reset lastIndex after test
        urlPattern.lastIndex = 0;
        const displayUrl = urlSeg.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
        result.push(
          <a
            key={`url-${si}-${ui}`}
            href={urlSeg}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-indigo-600 underline decoration-1 underline-offset-2 hover:text-indigo-700"
          >
            {displayUrl.length > 30 ? displayUrl.slice(0, 30) + "…" : displayUrl}
            <svg className="inline h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        );
        return;
      }

      // Step 3: Process markdown (bold/italic) + glossary
      const mdParts = urlSeg.split(/(\*\*[^*]+\*\*|_[^_]+_)/g);

      mdParts.forEach((part, mi) => {
        const key = `md-${si}-${ui}-${mi}`;
        if (part.startsWith("**") && part.endsWith("**")) {
          const inner = part.slice(2, -2);
          result.push(
            <strong key={key} className="font-semibold">
              {glossaryRegex ? injectGlossaryTooltips(inner, glossaryRegex, key) : inner}
            </strong>
          );
        } else if (part.startsWith("_") && part.endsWith("_")) {
          result.push(
            <em key={key} className="italic">
              {part.slice(1, -1)}
            </em>
          );
        } else if (glossaryRegex) {
          result.push(<span key={key}>{injectGlossaryTooltips(part, glossaryRegex, key)}</span>);
        } else {
          result.push(<span key={key}>{part}</span>);
        }
      });
    });
  });

  return result;
}

/* ── Inject glossary tooltips into plain text ── */
function injectGlossaryTooltips(
  text: string,
  regex: RegExp,
  keyPrefix: string
): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  const tooltipped = new Set<string>();

  // Clone regex to avoid shared state
  const localRegex = new RegExp(regex.source, regex.flags);
  localRegex.lastIndex = 0;

  let match;
  while ((match = localRegex.exec(text)) !== null) {
    const matchText = match[0];
    const entry = findGlossaryEntry(matchText);
    const termKey = entry?.term || matchText;

    if (match.index > lastIndex) {
      result.push(
        <span key={`${keyPrefix}-${lastIndex}`}>
          {text.slice(lastIndex, match.index)}
        </span>
      );
    }

    // Only tooltip first occurrence of each term
    if (entry && !tooltipped.has(termKey)) {
      tooltipped.add(termKey);
      result.push(
        <GlossaryTooltip key={`${keyPrefix}-g${match.index}`} term={matchText}>
          {matchText}
        </GlossaryTooltip>
      );
    } else {
      result.push(
        <span key={`${keyPrefix}-${match.index}`}>{matchText}</span>
      );
    }

    lastIndex = match.index + matchText.length;
  }

  if (lastIndex < text.length) {
    result.push(
      <span key={`${keyPrefix}-end`}>{text.slice(lastIndex)}</span>
    );
  }

  return result.length > 0 ? result : [<span key={`${keyPrefix}-all`}>{text}</span>];
}

/* ── Simple markdown renderer (for disclaimer) ── */
function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("_") && part.endsWith("_")) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
