"use client";

import { useState } from "react";
import { hexToRgb, rgbToHsl } from "./utils";
import { Icon } from "@/components/ui/icon";

export function ColourPickerTool() {
  const [color, setColor] = useState("#8b5cf6");
  const [copied, setCopied] = useState(false);

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formats = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <div className="flex-1 w-full space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-medium text-zinc-300 block">Select a Colour</label>
          <div className="relative h-48 rounded-xl overflow-hidden shadow-inner flex items-center justify-center group border border-white/10">
             <div className="absolute inset-0" style={{ backgroundColor: color }} />
             <input
               type="color"
               value={color}
               onChange={(e) => setColor(e.target.value)}
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
             />
             <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 pointer-events-none">
                <Icon name="pipette" className="w-4 h-4" />
                Click to pick
             </div>
          </div>
        </div>

        <div className="space-y-3">
          {formats.map(format => (
            <div key={format.label} className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
               <span className="w-12 text-xs font-semibold text-zinc-500 uppercase">{format.label}</span>
               <span className="flex-1 font-mono text-sm text-zinc-200">{format.value}</span>
               <button
                  onClick={() => copyToClipboard(format.value)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
                  title="Copy to clipboard"
               >
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
               </button>
            </div>
          ))}
        </div>
      </div>

      {copied && (
         <div className="fixed bottom-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
           <Icon name="check" className="w-4 h-4" />
           Copied to clipboard
         </div>
      )}
    </div>
  );
}