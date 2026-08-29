"use client";

import { useState } from "react";
import { generateHarmony } from "./utils";
import { cn } from "@/lib/utils";

export function ColourHarmonyTool() {
  const [baseColor, setBaseColor] = useState("#f43f5e");

  const types = [
    { id: "complementary", label: "Complementary", desc: "Opposite on the colour wheel. High contrast." },
    { id: "analogous", label: "Analogous", desc: "Adjacent on the colour wheel. Smooth & harmonious." },
    { id: "triadic", label: "Triadic", desc: "Evenly spaced on the wheel. Vibrant but balanced." },
    { id: "tetradic", label: "Tetradic", desc: "Two complementary pairs. Rich and complex." }
  ] as const;

  const [activeType, setActiveType] = useState<typeof types[number]["id"]>("complementary");

  const activeDesc = types.find(t => t.id === activeType)?.desc;
  const colors = generateHarmony(baseColor, activeType);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center gap-6 justify-between bg-black/20 p-4 rounded-2xl border border-white/5">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-zinc-300">Base Colour</label>
          <div className="relative h-12 w-24 rounded-lg overflow-hidden border border-white/10 shadow-inner">
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

        <div className="flex bg-white/5 p-1 rounded-xl">
           {types.map(t => (
             <button
               key={t.id}
               onClick={() => setActiveType(t.id)}
               className={cn(
                 "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
                 activeType === t.id ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"
               )}
             >
               {t.label}
             </button>
           ))}
        </div>
      </div>

      <div className="text-center max-w-md mx-auto">
         <p className="text-sm text-zinc-400">{activeDesc}</p>
      </div>

      <div className="flex h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
         {colors.map((color, i) => (
           <div
             key={i}
             className="flex-1 flex flex-col items-center justify-end pb-6 transition-all hover:flex-[1.2]"
             style={{ backgroundColor: color }}
           >
              <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-white font-mono text-xs shadow-lg">
                 {color.toUpperCase()}
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}