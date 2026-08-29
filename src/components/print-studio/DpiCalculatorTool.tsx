"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { presets, calculatePixels } from "./utils";

export function DpiCalculatorTool() {
  const [preset, setPreset] = useState("A4");
  const [width, setWidth] = useState<number>(presets["A4"].width);
  const [height, setHeight] = useState<number>(presets["A4"].height);
  const [unit, setUnit] = useState<string>(presets["A4"].unit);
  const [dpi, setDpi] = useState<number>(300);

  const handlePresetChange = (newPreset: string) => {
    setPreset(newPreset);
    if (newPreset !== "Custom") {
      const p = presets[newPreset as keyof typeof presets];
      if (p) {
        setWidth(p.width);
        setHeight(p.height);
        setUnit(p.unit);
      }
    }
  };

  const { pxWidth, pxHeight } = calculatePixels(width || 0, height || 0, unit, dpi);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">DPI Calculator</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Calculate precise pixel dimensions for any print size and resolution.
        </p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <div className="grid gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Preset Size</label>
            <div className="relative">
              <select
                value={preset}
                onChange={(e) => handlePresetChange(e.target.value)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white focus:border-teal-500/50 focus:outline-none focus:ring-1 focus:ring-teal-500/50"
              >
                <option value="Custom">Custom</option>
                {Object.keys(presets).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                <Icon name="arrowRight" className="h-4 w-4 rotate-90 text-zinc-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Width</label>
              <div className="relative">
                <input
                  type="number"
                  value={width || ""}
                  onChange={(e) => { setWidth(Number(e.target.value)); setPreset("Custom"); }}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-teal-500/50 focus:outline-none focus:ring-1 focus:ring-teal-500/50 pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">{unit}</span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Height</label>
              <div className="relative">
                <input
                  type="number"
                  value={height || ""}
                  onChange={(e) => { setHeight(Number(e.target.value)); setPreset("Custom"); }}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-teal-500/50 focus:outline-none focus:ring-1 focus:ring-teal-500/50 pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">{unit}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-zinc-300">Units & DPI</label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/20 p-1 w-max">
                {(["mm", "cm", "inch"] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => { setUnit(u); setPreset("Custom"); }}
                    className={cn(
                      "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                      unit === u ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    {u}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/20 p-1 w-max">
                {([72, 150, 300]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDpi(d)}
                    className={cn(
                      "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                      dpi === d ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    {d} DPI
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-teal-500/30 bg-teal-500/5 p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-2">Required Pixel Dimensions</p>
            <p className="font-display text-4xl font-bold text-white tracking-tight">
              {pxWidth} <span className="text-teal-500/50">×</span> {pxHeight} <span className="text-xl text-zinc-500">px</span>
            </p>
            <p className="mt-2 text-xs text-zinc-400">At {dpi} DPI</p>
          </div>

          <div className="pt-2 border-t border-white/5">
            <button
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-4 font-medium text-zinc-950 transition-colors hover:bg-teal-400"
              onClick={() => alert(`Opening canvas with ${pxWidth}x${pxHeight}px`)}
            >
              <Icon name="corner" className="h-5 w-5" />
              Open in Canvas ({pxWidth}×{pxHeight})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
