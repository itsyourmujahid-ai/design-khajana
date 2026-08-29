"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { shortenText, analyzeTextLength } from "./utils";

export function TextShortenTool() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const output = shortenText(input);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inStats = analyzeTextLength(input);
  const outStats = analyzeTextLength(output);
  const percentSaved = input ? Math.round((1 - (outStats.charCount / Math.max(1, inStats.charCount))) * 100) : 0;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Shorten Text</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Cut the fluff. Condense your copy to its most powerful core message.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <label htmlFor="shorten-input" className="text-sm font-medium text-zinc-300">
            Original Text ({inStats.wordCount} words)
          </label>
          <textarea
            id="shorten-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your wordy text here..."
            className="h-64 w-full resize-none rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white placeholder:text-zinc-600 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              Shortened Result
              {percentSaved > 0 && (
                <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-semibold text-orange-400">
                  {percentSaved}% shorter
                </span>
              )}
            </label>
            {output && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon name={copied ? "check" : "copy"} className="h-3.5 w-3.5" />
                {copied ? "Copied!" : "Copy result"}
              </button>
            )}
          </div>
          <div className="relative h-64 w-full overflow-y-auto rounded-xl border border-orange-500/30 bg-orange-500/5 p-4 text-sm text-white">
            {output ? (
              <div className="flex flex-col h-full justify-between">
                <p className="leading-relaxed whitespace-pre-wrap">{output}</p>
                <div className="mt-4 border-t border-orange-500/20 pt-3 text-xs text-orange-200/50 flex justify-between">
                  <span>{outStats.wordCount} words</span>
                  <span>{outStats.charCount} characters</span>
                </div>
              </div>
            ) : (
              <p className="text-zinc-500 italic">Your shortened text will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
