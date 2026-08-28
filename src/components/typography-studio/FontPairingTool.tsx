"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// Using native OS font stacks as "free/local fonts" instead of Google Fonts to strictly avoid external network requests if possible,
// or using the already available next/font ones if they were loaded in layout.
// Since Next.js loads fonts per component or globally, let's just use CSS font stacks for safety and speed.
const fontPairings = [
  {
    name: "Modern Minimalist",
    heading: "system-ui, -apple-system, sans-serif",
    headingName: "System UI (San Francisco / Segoe UI)",
    body: "system-ui, -apple-system, sans-serif",
    bodyName: "System UI",
    desc: "Clean, invisible, and fast. Perfect for dashboards and SaaS.",
    headingWeight: "700",
    bodyWeight: "400",
  },
  {
    name: "Classic Editorial",
    heading: "Georgia, serif",
    headingName: "Georgia",
    body: "system-ui, -apple-system, sans-serif",
    bodyName: "System UI",
    desc: "A timeless serif heading paired with a highly readable sans-serif body.",
    headingWeight: "700",
    bodyWeight: "400",
  },
  {
    name: "Tech & Code",
    heading: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    headingName: "Monospace",
    body: "system-ui, -apple-system, sans-serif",
    bodyName: "System UI",
    desc: "A technical monospace header creates contrast against a smooth body.",
    headingWeight: "700",
    bodyWeight: "400",
  },
  {
    name: "Elegant Serif",
    heading: "Palatino, 'Palatino Linotype', 'Book Antiqua', serif",
    headingName: "Palatino",
    body: "Georgia, serif",
    bodyName: "Georgia",
    desc: "Double serif pairings give a luxurious, premium feel.",
    headingWeight: "400",
    bodyWeight: "400",
  }
];

export function FontPairingTool() {
  const [activePair, setActivePair] = useState(0);
  const pair = fontPairings[activePair];

  return (
    <div className="flex flex-col md:flex-row gap-8 h-full">
       <div className="w-full md:w-64 shrink-0 space-y-2">
          {fontPairings.map((p, idx) => (
             <button
                key={idx}
                onClick={() => setActivePair(idx)}
                className={cn(
                   "w-full text-left px-4 py-3 rounded-xl border transition-all",
                   activePair === idx
                     ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                     : "bg-black/20 border-white/5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                )}
             >
                <div className="text-sm font-bold">{p.name}</div>
                <div className="text-[10px] mt-1 opacity-70 truncate">{p.headingName} + {p.bodyName}</div>
             </button>
          ))}
       </div>

       <div className="flex-1 bg-white rounded-2xl p-8 md:p-12 text-zinc-900 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-xs font-semibold text-zinc-500">
                Previewing: {pair.name}
             </div>

             <div className="space-y-4">
               <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest border-b border-zinc-200 pb-2">
                 Heading: {pair.headingName}
               </div>
               <h1
                 className="text-4xl md:text-5xl tracking-tight text-zinc-900"
                 style={{ fontFamily: pair.heading, fontWeight: pair.headingWeight }}
               >
                 Design is intelligence made visible.
               </h1>
             </div>

             <div className="space-y-4 pt-6">
               <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest border-b border-zinc-200 pb-2">
                 Body: {pair.bodyName}
               </div>
               <p
                 className="text-lg leading-relaxed text-zinc-700"
                 style={{ fontFamily: pair.body, fontWeight: pair.bodyWeight }}
               >
                 Good design is innovative. Good design makes a product useful. Good design is aesthetic.
                 Good design makes a product understandable. Good design is unobtrusive. Good design is honest.
                 Good design is long-lasting. Good design is thorough down to the last detail. Good design is environmentally friendly.
               </p>
               <p
                 className="text-base leading-relaxed text-zinc-600"
                 style={{ fontFamily: pair.body, fontWeight: pair.bodyWeight }}
               >
                 Good design is as little design as possible. Less, but better — because it concentrates on the essential aspects,
                 and the products are not burdened with non-essentials.
               </p>
             </div>

             <div className="pt-8">
                <button
                  className="px-6 py-3 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors"
                  style={{ fontFamily: pair.heading, fontWeight: pair.headingWeight }}
                >
                  Start Designing
                </button>
             </div>
          </div>
       </div>
    </div>
  );
}