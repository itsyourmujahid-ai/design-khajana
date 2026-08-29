"use client";

import { useState } from "react";
import { getContrast, getRecommendedTextColor } from "./utils";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function ContrastCheckerTool() {
  const [fg, setFg] = useState("#ffffff");
  const [bg, setBg] = useState("#2563eb");

  const ratio = getContrast(fg, bg);
  const recommended = getRecommendedTextColor(bg);

  // WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.
  // WCAG 2.1 level AAA requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text.
  const passAA = ratio >= 4.5;
  const passAALarge = ratio >= 3.0;
  const passAAA = ratio >= 7.0;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-80 space-y-6">
         <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-zinc-300">Foreground</label>
              <span className="text-xs font-mono text-zinc-500 uppercase">{fg}</span>
            </div>
            <div className="relative h-12 rounded-xl overflow-hidden border border-white/10">
               <input type="color" value={fg} onChange={e => setFg(e.target.value)} className="absolute -inset-2 w-full h-full opacity-0 cursor-pointer" />
               <div className="w-full h-full" style={{ backgroundColor: fg }} />
            </div>
         </div>

         <div className="flex items-center justify-center">
            <button
               onClick={() => { const temp = fg; setFg(bg); setBg(temp); }}
               className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 transition-colors"
               title="Swap colours"
            >
               <Icon name="arrows" className="w-4 h-4" />
            </button>
         </div>

         <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-zinc-300">Background</label>
              <span className="text-xs font-mono text-zinc-500 uppercase">{bg}</span>
            </div>
            <div className="relative h-12 rounded-xl overflow-hidden border border-white/10">
               <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="absolute -inset-2 w-full h-full opacity-0 cursor-pointer" />
               <div className="w-full h-full" style={{ backgroundColor: bg }} />
            </div>
         </div>

         {/* Recommendation */}
         {fg.toLowerCase() !== recommended.toLowerCase() && (
           <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                 <Icon name="sparkles" className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                 <div>
                   <p className="text-sm font-medium text-amber-300">Smart Suggestion</p>
                   <p className="text-xs text-amber-500/80 mt-1 mb-2">For best readability on this background, use {recommended === "#ffffff" ? "White" : "Black"}.</p>
                   <button
                     onClick={() => setFg(recommended)}
                     className="text-xs font-semibold bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-lg hover:bg-amber-500/30 transition-colors"
                   >
                     Apply {recommended.toUpperCase()}
                   </button>
                 </div>
              </div>
           </div>
         )}
      </div>

      <div className="flex-1 space-y-6">
         {/* Big Score */}
         <div className="flex flex-col items-center justify-center py-10 bg-black/20 rounded-2xl border border-white/5">
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Contrast Ratio</h3>
            <div className={cn(
              "text-6xl font-display font-bold mb-4",
              ratio >= 4.5 ? "text-emerald-400" : ratio >= 3 ? "text-amber-400" : "text-rose-400"
            )}>
               {ratio.toFixed(2)}
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-sm font-medium">
               <span className={ratio >= 4.5 ? "text-emerald-400" : "text-rose-400"}>
                 {ratio >= 4.5 ? "Good contrast" : "Poor contrast"}
               </span>
            </div>
         </div>

         {/* Breakdown */}
         <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-black/20 rounded-xl border border-white/5 space-y-2">
               <div className="flex justify-between items-center">
                 <span className="text-sm font-medium text-zinc-300">Normal Text</span>
                 <Badge pass={passAA} label="AA" />
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-xs text-zinc-500">WCAG AAA</span>
                 <Badge pass={passAAA} label="AAA" />
               </div>
            </div>
            <div className="p-4 bg-black/20 rounded-xl border border-white/5 space-y-2">
               <div className="flex justify-between items-center">
                 <span className="text-sm font-medium text-zinc-300">Large Text</span>
                 <Badge pass={passAALarge} label="AA" />
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-xs text-zinc-500">WCAG AAA</span>
                 <Badge pass={passAA} label="AAA" /> {/* AAA large text requires 4.5:1 which is same as AA normal */}
               </div>
            </div>
         </div>

         {/* Live Preview */}
         <div
           className="w-full p-8 rounded-2xl border border-white/10 shadow-inner mt-6"
           style={{ backgroundColor: bg }}
         >
           <h2 className="text-2xl font-bold mb-4" style={{ color: fg }}>The quick brown fox</h2>
           <p className="text-sm leading-relaxed" style={{ color: fg }}>
             Jumps over the lazy dog. This is how normal text will look with the selected foreground and background colours.
             Ensure the contrast ratio is at least 4.5:1 for optimal readability.
           </p>
         </div>
      </div>
    </div>
  );
}

function Badge({ pass, label }: { pass: boolean, label: string }) {
  return (
    <span className={cn(
      "px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase",
      pass ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
    )}>
      {pass ? "Pass " + label : "Fail"}
    </span>
  );
}