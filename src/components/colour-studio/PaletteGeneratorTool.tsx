"use client";

import { useState } from "react";
import { generateHarmony } from "./utils";
import { cn } from "@/lib/utils";

export function PaletteGeneratorTool() {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [copied, setCopied] = useState<string | null>(null);

  const palettes = [
    { name: "Complementary", colors: generateHarmony(baseColor, "complementary") },
    { name: "Analogous", colors: generateHarmony(baseColor, "analogous") },
    { name: "Triadic", colors: generateHarmony(baseColor, "triadic") },
    { name: "Tetradic", colors: generateHarmony(baseColor, "tetradic") },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-zinc-300 whitespace-nowrap">Base Colour:</label>
        <div className="relative h-10 w-24 rounded-lg overflow-hidden border border-white/10 shadow-inner">
           <input
             type="color"
             value={baseColor}
             onChange={(e) => setBaseColor(e.target.value)}
             className="absolute -inset-2 w-32 h-20 opacity-0 cursor-pointer"
           />
           <div className="w-full h-full" style={{ backgroundColor: baseColor }} />
        </div>
        <span className="font-mono text-sm uppercase text-zinc-400">{baseColor}</span>
      </div>

      <div className="grid gap-6">
        {palettes.map((palette) => (
          <div key={palette.name} className="space-y-3">
             <h4 className="text-sm font-semibold text-zinc-400">{palette.name}</h4>
             <div className="flex h-24 rounded-xl overflow-hidden border border-white/10 shadow-sm">
                {palette.colors.map((color, i) => (
                   <button
                     key={i}
                     onClick={() => copyToClipboard(color.toUpperCase())}
                     className="group relative flex-1 h-full transition-all hover:flex-[1.2]"
                     style={{ backgroundColor: color }}
                     title={`Copy ${color.toUpperCase()}`}
                   >
                     <div className={cn(
                       "absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all",
                       copied === color.toUpperCase() ? "bg-black/40" : ""
                     )}>
                        <span className={cn(
                          "px-2 py-1 rounded bg-black/60 text-white font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity",
                          copied === color.toUpperCase() ? "opacity-100 bg-emerald-500/80" : ""
                        )}>
                          {copied === color.toUpperCase() ? "Copied!" : color.toUpperCase()}
                        </span>
                     </div>
                   </button>
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}