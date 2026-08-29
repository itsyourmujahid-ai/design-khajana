"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const scales = [
  { name: "Minor Second", ratio: 1.067 },
  { name: "Major Second", ratio: 1.125 },
  { name: "Minor Third", ratio: 1.200 },
  { name: "Major Third", ratio: 1.250 },
  { name: "Perfect Fourth", ratio: 1.333 },
  { name: "Augmented Fourth", ratio: 1.414 },
  { name: "Perfect Fifth", ratio: 1.500 },
  { name: "Golden Ratio", ratio: 1.618 },
];

export function TypeScaleTool() {
  const [baseSize, setBaseSize] = useState(16);
  const [scaleIdx, setScaleIdx] = useState(3); // Major Third default

  const ratio = scales[scaleIdx].ratio;

  // Generate 6 sizes above base and 2 below
  const steps = [-2, -1, 0, 1, 2, 3, 4, 5];

  const sizes = steps.map(step => {
     let size = baseSize;
     if (step > 0) {
        size = baseSize * Math.pow(ratio, step);
     } else if (step < 0) {
        size = baseSize / Math.pow(ratio, Math.abs(step));
     }

     // Name them according to hierarchy
     let label = "";
     if (step === 5) label = "Hero Heading (h1)";
     else if (step === 4) label = "Heading 2 (h2)";
     else if (step === 3) label = "Heading 3 (h3)";
     else if (step === 2) label = "Heading 4 (h4)";
     else if (step === 1) label = "Subheading (h5/h6)";
     else if (step === 0) label = "Body";
     else if (step === -1) label = "Small (Caption)";
     else if (step === -2) label = "Tiny (Legal)";

     return { step, size: Math.round(size * 10) / 10, label };
  }).reverse();

  return (
    <div className="flex flex-col md:flex-row gap-8">
       {/* Controls */}
       <div className="w-full md:w-64 shrink-0 space-y-6">
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">Base Size</label>
                <span className="text-xs font-mono text-zinc-500">{baseSize}px</span>
             </div>
             <input
               type="range"
               min="12"
               max="24"
               step="1"
               value={baseSize}
               onChange={e => setBaseSize(Number(e.target.value))}
               className="w-full accent-emerald-500"
             />
          </div>

          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">Scale Ratio</label>
                <span className="text-xs font-mono text-zinc-500">{ratio.toFixed(3)}</span>
             </div>
             <select
               value={scaleIdx}
               onChange={e => setScaleIdx(Number(e.target.value))}
               className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
             >
                {scales.map((s, i) => (
                   <option key={i} value={i} className="bg-zinc-900 text-white">{s.name} ({s.ratio})</option>
                ))}
             </select>
          </div>

          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mt-6">
             <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Why modular scale?</h4>
             <p className="text-xs text-emerald-500/80 leading-relaxed">
               A modular scale uses a fixed ratio to generate a harmonic progression of text sizes,
               bringing mathematical rhythm and visual consistency to your design.
             </p>
          </div>
       </div>

       {/* Preview Stage */}
       <div className="flex-1 bg-black/20 border border-white/5 rounded-2xl p-6 overflow-hidden">
          <div className="space-y-6 custom-scrollbar overflow-y-auto max-h-[600px] pr-4">
             {sizes.map((s) => (
                <div key={s.step} className={cn(
                  "flex flex-col border-b border-white/5 pb-6 last:border-0",
                  s.step === 0 ? "border-emerald-500/30" : ""
                )}>
                   <div className="flex items-end justify-between mb-2">
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{s.label}</span>
                      <div className="flex items-center gap-2">
                         <span className={cn(
                           "text-[10px] px-1.5 py-0.5 rounded bg-white/5 font-mono",
                           s.step === 0 ? "text-emerald-400 bg-emerald-500/10" : "text-zinc-400"
                         )}>
                            {s.size}px
                         </span>
                         <span className="text-[10px] text-zinc-600 font-mono">
                            {(s.size / baseSize).toFixed(3)}rem
                         </span>
                      </div>
                   </div>
                   <div
                      className={cn(
                        "text-white truncate font-medium",
                        s.step === 0 ? "text-emerald-50" : ""
                      )}
                      style={{ fontSize: `${s.size}px`, lineHeight: 1.2 }}
                   >
                      The quick brown fox
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}