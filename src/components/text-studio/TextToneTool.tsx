"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { rewriteProfessional, rewritePremium, rewriteCorporate, rewriteCatchy } from "./utils";

export function TextToneTool({ tone }: { tone: string }) {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  let output = "";
  if (input) {
    switch (tone) {
      case "Professional":
        output = rewriteProfessional(input);
        break;
      case "Premium":
        output = rewritePremium(input);
        break;
      case "Corporate":
        output = rewriteCorporate(input);
        break;
      case "Catchy":
        output = rewriteCatchy(input);
        break;
      default:
        output = input;
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">{tone} Tone</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Paste your text to automatically rewrite it in a {tone.toLowerCase()} voice.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <label htmlFor="tone-input" className="text-sm font-medium text-zinc-300">
            Original Text
          </label>
          <textarea
            id="tone-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste your text here..."
            className="h-64 w-full resize-none rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white placeholder:text-zinc-600 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-300">
              Rewritten Output
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
              <p className="leading-relaxed whitespace-pre-wrap">{output}</p>
            ) : (
              <p className="text-zinc-500 italic">Your rewritten text will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
