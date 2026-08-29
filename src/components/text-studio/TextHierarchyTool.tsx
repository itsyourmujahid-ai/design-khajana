"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { getRecommendedHeading, getRecommendedSubheading, getRecommendedBody, getRecommendedCTA, analyzeTextLength } from "./utils";

export function TextHierarchyTool({ focus = "All" }: { focus?: string }) {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const heading = getRecommendedHeading(input);
  const subheading = getRecommendedSubheading(input);
  const body = getRecommendedBody(input);
  const cta = getRecommendedCTA(input);
  const { wordCount, charCount, readingTime } = analyzeTextLength(input);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Text Hierarchy</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Paste your raw copy below to instantly generate a structured layout with recommended headings, subheadings, and CTAs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <label htmlFor="text-input" className="mb-2 block text-sm font-medium text-zinc-300">
              Raw Text Input
            </label>
            <textarea
              id="text-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your paragraph or marketing copy here..."
              className="h-64 w-full resize-none rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white placeholder:text-zinc-600 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-zinc-400">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
            <span>~{readingTime} min read</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="mb-2 text-sm font-medium text-zinc-300">Live Preview</h3>

          {(!focus || focus === "All" || focus === "Heading") && (
            <div className="group relative">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-orange-400">Recommended Heading</div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {heading}
              </h1>
              <button
                onClick={() => copyToClipboard(heading, "heading")}
                className="absolute right-0 top-0 opacity-0 transition-opacity group-hover:opacity-100 rounded-md bg-white/10 p-1.5 text-zinc-300 hover:bg-white/20 hover:text-white"
                title="Copy Heading"
              >
                <Icon name={copied === "heading" ? "check" : "copy"} className="h-4 w-4" />
              </button>
            </div>
          )}

          {(!focus || focus === "All" || focus === "Subheading") && (
            <div className="group relative mt-2">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-orange-400">Recommended Subheading</div>
              <p className="text-lg leading-relaxed text-zinc-400">
                {subheading}
              </p>
              <button
                onClick={() => copyToClipboard(subheading, "subheading")}
                className="absolute right-0 top-0 opacity-0 transition-opacity group-hover:opacity-100 rounded-md bg-white/10 p-1.5 text-zinc-300 hover:bg-white/20 hover:text-white"
                title="Copy Subheading"
              >
                <Icon name={copied === "subheading" ? "check" : "copy"} className="h-4 w-4" />
              </button>
            </div>
          )}

          {(!focus || focus === "All" || focus === "Body") && (
            <div className="group relative mt-2">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-orange-400">Body Copy</div>
              <p className="text-sm leading-relaxed text-zinc-300">
                {body}
              </p>
              <button
                onClick={() => copyToClipboard(body, "body")}
                className="absolute right-0 top-0 opacity-0 transition-opacity group-hover:opacity-100 rounded-md bg-white/10 p-1.5 text-zinc-300 hover:bg-white/20 hover:text-white"
                title="Copy Body"
              >
                <Icon name={copied === "body" ? "check" : "copy"} className="h-4 w-4" />
              </button>
            </div>
          )}

          {(!focus || focus === "All" || focus === "CTA") && (
            <div className="group relative mt-6 inline-block self-start">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-orange-400">Recommended CTA</div>
              <button className="rounded-xl bg-orange-500 px-6 py-3 font-medium text-zinc-950 transition-colors hover:bg-orange-400 pr-10 relative overflow-hidden">
                {cta}
                <div
                  onClick={(e) => { e.stopPropagation(); copyToClipboard(cta, "cta"); }}
                  className="absolute right-0 top-0 bottom-0 flex items-center justify-center bg-black/10 w-10 hover:bg-black/20 text-black cursor-pointer"
                  title="Copy CTA"
                >
                  <Icon name={copied === "cta" ? "check" : "copy"} className="h-4 w-4" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
