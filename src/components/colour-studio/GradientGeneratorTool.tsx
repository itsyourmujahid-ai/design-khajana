"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function GradientGeneratorTool() {
  const [color1, setColor1] = useState("#ec4899");
  const [color2, setColor2] = useState("#8b5cf6");
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(90);
  const [copied, setCopied] = useState(false);

  const gradientString = type === "linear"
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const cssString = `background: ${gradientString};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Preview */}
      <div className="flex-1">
        <div
          className="w-full aspect-square md:aspect-auto md:h-full min-h-[300px] rounded-2xl border border-white/10 shadow-inner"
          style={{ background: gradientString }}
        />
      </div>

      {/* Controls */}
      <div className="w-full md:w-80 space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-medium text-zinc-300">Colours</label>
          <div className="flex gap-4">
            <div className="flex-1 relative h-12 rounded-lg overflow-hidden border border-white/10">
               <input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="absolute -inset-2 w-full h-full opacity-0 cursor-pointer" />
               <div className="w-full h-full" style={{ backgroundColor: color1 }} />
            </div>
            <div className="flex-1 relative h-12 rounded-lg overflow-hidden border border-white/10">
               <input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="absolute -inset-2 w-full h-full opacity-0 cursor-pointer" />
               <div className="w-full h-full" style={{ backgroundColor: color2 }} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
           <label className="text-sm font-medium text-zinc-300">Type</label>
           <div className="flex bg-black/20 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setType("linear")}
                className={cn("flex-1 py-2 text-xs font-medium rounded-lg transition-colors", type === "linear" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300")}
              >
                Linear
              </button>
              <button
                onClick={() => setType("radial")}
                className={cn("flex-1 py-2 text-xs font-medium rounded-lg transition-colors", type === "radial" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300")}
              >
                Radial
              </button>
           </div>
        </div>

        {type === "linear" && (
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">Angle</label>
                <span className="text-xs font-mono text-zinc-500">{angle}°</span>
             </div>
             <input
               type="range"
               min="0"
               max="360"
               value={angle}
               onChange={e => setAngle(Number(e.target.value))}
               className="w-full accent-violet-500"
             />
          </div>
        )}

        <div className="pt-4 border-t border-white/10">
           <div className="bg-black/30 p-3 rounded-xl border border-white/5 font-mono text-xs text-zinc-400 break-all mb-4">
              {cssString}
           </div>
           <button
             onClick={copyToClipboard}
             className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl font-medium transition-colors"
           >
             {copied ? <Icon name="check" className="w-4 h-4 text-emerald-400" /> : <Icon name="code" className="w-4 h-4" />}
             {copied ? "Copied CSS!" : "Copy CSS"}
           </button>
        </div>
      </div>
    </div>
  );
}