"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";

export function SafeAreaTool() {
  const [width, setWidth] = useState<number>(210);
  const [height, setHeight] = useState<number>(297);
  const [margin, setMargin] = useState<number>(5); // standard 5mm margin for safe zone

  const safeWidth = width - (margin * 2);
  const safeHeight = height - (margin * 2);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Safe Area Guide</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Determine the safe zone where important text and logos won&apos;t be cut off.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Trim Width (mm)</label>
                <input
                  type="number"
                  value={width || ""}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Trim Height (mm)</label>
                <input
                  type="number"
                  value={height || ""}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Safety Margin per edge (mm)</label>
              <div className="flex gap-2">
                {[3, 5, 10].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMargin(m)}
                    className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${
                      margin === m
                      ? "border-emerald-500/50 bg-emerald-500/20 text-white"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
                    }`}
                  >
                    {m}mm
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/5 bg-black/20 p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">Safe Zone Area</h3>
              <p className="font-display text-3xl font-bold text-white tracking-tight">
                {safeWidth} <span className="text-zinc-600">×</span> {safeHeight} <span className="text-base text-zinc-500">mm</span>
              </p>
            </div>

            <button
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 font-medium text-zinc-950 transition-colors hover:bg-emerald-400 mt-2"
              onClick={() => alert(`Setting up safe guides for ${safeWidth}x${safeHeight}mm`)}
            >
              <Icon name="shield" className="h-5 w-5" />
              Open Canvas with Guides
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 flex flex-col items-center justify-center">
          <div
            className="relative border border-blue-400 bg-white/5 flex items-center justify-center"
            style={{ width: "200px", height: "260px" }}
          >
            <div className="absolute -top-6 text-xs text-blue-400 font-medium">Trim Edge (Final Size)</div>
            <div className="absolute -left-[80px] top-1/2 -translate-y-1/2 -rotate-90 text-xs text-blue-400 font-medium">{height}mm</div>

            <div
              className="absolute border-2 border-emerald-400 border-dashed bg-emerald-500/10 flex items-center justify-center text-zinc-300 text-sm font-medium text-center px-4"
              style={{ top: "15px", bottom: "15px", left: "15px", right: "15px" }}
            >
              Safe Zone
              <div className="absolute -right-[70px] top-1/2 -translate-y-1/2 -rotate-90 text-xs text-emerald-300">{safeHeight}mm</div>
              <div className="absolute -bottom-6 text-xs text-emerald-300">{safeWidth}mm</div>
            </div>
          </div>

          <div className="mt-12 text-sm text-zinc-400 max-w-sm text-center">
            Keep all important text, logos, and critical details inside the <span className="text-emerald-400">green dashed safe zone</span> to ensure they are not accidentally trimmed off.
          </div>
        </div>
      </div>
    </div>
  );
}
