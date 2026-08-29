"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { rewriteProfessional, rewritePremium, rewriteCorporate, rewriteCatchy } from "./utils";

function OptionCard({ title, content, id, copiedId, onCopy }: { title: string, content: string, id: string, copiedId: string | null, onCopy: (text: string, id: string) => void }) {
  return (
    <div className="group relative rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-orange-500/30 hover:bg-white/[0.04]">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">{title}</span>
        <button
          onClick={() => onCopy(content, id)}
          className="rounded-md p-1.5 text-zinc-400 opacity-0 transition-opacity hover:bg-white/10 hover:text-white group-hover:opacity-100"
          title="Copy text"
        >
          <Icon name={copiedId === id ? "check" : "copy"} className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="text-sm leading-relaxed text-zinc-300">
        {content || <span className="italic text-zinc-600">Waiting for input...</span>}
      </p>
    </div>
  );
}

export function TextRewriteTool() {
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Smart Rewrite</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Compare multiple angles and tones for your text instantly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <label htmlFor="rewrite-input" className="text-sm font-medium text-zinc-300">
            Original Text
          </label>
          <textarea
            id="rewrite-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste your text here..."
            className="h-64 w-full resize-none rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white placeholder:text-zinc-600 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
          />
        </div>

        <div className="flex flex-col gap-4">
          <OptionCard title="Professional" content={rewriteProfessional(input)} id="prof" copiedId={copiedId} onCopy={copyToClipboard} />
          <OptionCard title="Premium" content={rewritePremium(input)} id="prem" copiedId={copiedId} onCopy={copyToClipboard} />
          <OptionCard title="Corporate" content={rewriteCorporate(input)} id="corp" copiedId={copiedId} onCopy={copyToClipboard} />
          <OptionCard title="Catchy" content={rewriteCatchy(input)} id="catchy" copiedId={copiedId} onCopy={copyToClipboard} />
        </div>
      </div>
    </div>
  );
}
