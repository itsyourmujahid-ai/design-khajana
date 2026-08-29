"use client";

import { useState } from "react";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "./utils";

export function ColourConverterTool() {
  const [hex, setHex] = useState("#3b82f6");
  const [r, setR] = useState(59);
  const [g, setG] = useState(130);
  const [b, setB] = useState(246);
  const [h, setH] = useState(217);
  const [s, setS] = useState(90);
  const [l, setL] = useState(60);

  // When HEX changes directly via color picker or text input
  const handleHexChange = (newHex: string) => {
    setHex(newHex);
    if (/^#[0-9A-F]{6}$/i.test(newHex)) {
      const rgb = hexToRgb(newHex);
      setR(rgb.r); setG(rgb.g); setB(rgb.b);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setH(hsl.h); setS(hsl.s); setL(hsl.l);
    }
  };

  // When RGB changes
  const handleRgbChange = (newR: number, newG: number, newB: number) => {
    setR(newR); setG(newG); setB(newB);
    const newHex = rgbToHex(newR, newG, newB);
    setHex(newHex);
    const hsl = rgbToHsl(newR, newG, newB);
    setH(hsl.h); setS(hsl.s); setL(hsl.l);
  };

  // When HSL changes
  const handleHslChange = (newH: number, newS: number, newL: number) => {
    setH(newH); setS(newS); setL(newL);
    const rgb = hslToRgb(newH, newS, newL);
    setR(rgb.r); setG(rgb.g); setB(rgb.b);
    const newHex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setHex(newHex);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Visualizer */}
      <div className="w-full md:w-64 shrink-0 flex flex-col gap-4">
        <div
          className="w-full aspect-square rounded-2xl shadow-inner border border-white/10"
          style={{ backgroundColor: hex }}
        />
        <div className="relative h-12 w-full rounded-xl overflow-hidden border border-white/10">
           <input
             type="color"
             value={/^#[0-9A-F]{6}$/i.test(hex) ? hex : "#000000"}
             onChange={(e) => handleHexChange(e.target.value)}
             className="absolute -inset-2 w-[120%] h-[120%] opacity-0 cursor-pointer"
           />
           <div className="w-full h-full bg-black/20 flex items-center justify-center pointer-events-none">
              <span className="text-sm font-medium text-white shadow-sm">Pick Colour</span>
           </div>
        </div>
      </div>

      {/* Values */}
      <div className="flex-1 space-y-8">

        {/* HEX */}
        <div className="space-y-3">
           <label className="text-xs font-bold tracking-widest text-zinc-500 uppercase">HEX</label>
           <input
             type="text"
             value={hex}
             onChange={e => handleHexChange(e.target.value)}
             className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-lg font-mono text-white focus:outline-none focus:border-violet-500/50"
           />
        </div>

        {/* RGB */}
        <div className="space-y-3">
           <label className="text-xs font-bold tracking-widest text-zinc-500 uppercase">RGB</label>
           <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                 <span className="text-[10px] text-zinc-500 font-mono">R (0-255)</span>
                 <input type="number" min="0" max="255" value={r} onChange={e => handleRgbChange(Number(e.target.value), g, b)} className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-violet-500/50" />
              </div>
              <div className="flex-1 space-y-1">
                 <span className="text-[10px] text-zinc-500 font-mono">G (0-255)</span>
                 <input type="number" min="0" max="255" value={g} onChange={e => handleRgbChange(r, Number(e.target.value), b)} className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-violet-500/50" />
              </div>
              <div className="flex-1 space-y-1">
                 <span className="text-[10px] text-zinc-500 font-mono">B (0-255)</span>
                 <input type="number" min="0" max="255" value={b} onChange={e => handleRgbChange(r, g, Number(e.target.value))} className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-violet-500/50" />
              </div>
           </div>
        </div>

        {/* HSL */}
        <div className="space-y-3">
           <label className="text-xs font-bold tracking-widest text-zinc-500 uppercase">HSL</label>
           <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                 <span className="text-[10px] text-zinc-500 font-mono">H (0-360)</span>
                 <input type="number" min="0" max="360" value={h} onChange={e => handleHslChange(Number(e.target.value), s, l)} className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-violet-500/50" />
              </div>
              <div className="flex-1 space-y-1">
                 <span className="text-[10px] text-zinc-500 font-mono">S (0-100%)</span>
                 <input type="number" min="0" max="100" value={s} onChange={e => handleHslChange(h, Number(e.target.value), l)} className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-violet-500/50" />
              </div>
              <div className="flex-1 space-y-1">
                 <span className="text-[10px] text-zinc-500 font-mono">L (0-100%)</span>
                 <input type="number" min="0" max="100" value={l} onChange={e => handleHslChange(h, s, Number(e.target.value))} className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-violet-500/50" />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}