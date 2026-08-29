"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";

export function BleedTool() {
  const [width, setWidth] = useState<number>(210);
  const [height, setHeight] = useState<number>(297);
  const [bleed, setBleed] = useState<number>(3); // standard 3mm bleed

  const finalWidth = width + (bleed * 2);
  const finalHeight = height + (bleed * 2);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Bleed Calculator</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Calculate the final canvas size required to accommodate print bleed.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Target Width (mm)</label>
                <input
                  type="number"
                  value={width || ""}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Target Height (mm)</label>
                <input
                  type="number"
                  value={height || ""}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Bleed per edge (mm)</label>
              <div className="flex gap-2">
                {[2, 3, 5].map((b) => (
                  <button
                    key={b}
                    onClick={() => setBleed(b)}
                    className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${
                      bleed === b
                      ? "border-indigo-500/50 bg-indigo-500/20 text-white"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
                    }`}
                  >
                    {b}mm
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/5 bg-black/20 p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">Canvas Size with Bleed</h3>
              <p className="font-display text-3xl font-bold text-white tracking-tight">
                {finalWidth} <span className="text-zinc-600">×</span> {finalHeight} <span className="text-base text-zinc-500">mm</span>
              </p>
            </div>

            <button
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-4 font-medium text-zinc-950 transition-colors hover:bg-indigo-400 mt-2"
              onClick={() => alert(`Opening canvas with ${finalWidth}x${finalHeight}mm`)}
            >
              <Icon name="corner" className="h-5 w-5" />
              Open Canvas with Bleed
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 flex flex-col items-center justify-center">
          <div
            className="relative border-2 border-red-500/50 border-dashed bg-white/5 flex items-center justify-center"
            style={{ width: "200px", height: "260px" }}
          >
            <div className="absolute -top-6 text-xs text-red-400 font-medium">Bleed Edge (Canvas bounds)</div>
            <div className="absolute -left-[90px] top-1/2 -translate-y-1/2 -rotate-90 text-xs text-red-400 font-medium">{finalHeight}mm</div>
            <div className="absolute -bottom-6 text-xs text-red-400 font-medium">{finalWidth}mm</div>

            <div
              className="absolute border border-blue-400 bg-white/10 flex items-center justify-center text-zinc-300 text-sm font-medium text-center px-4"
              style={{ top: "10px", bottom: "10px", left: "10px", right: "10px" }}
            >
              Trim Edge<br/>(Final Product)
              <div className="absolute -left-[70px] top-1/2 -translate-y-1/2 -rotate-90 text-xs text-blue-300">{height}mm</div>
              <div className="absolute -bottom-6 text-xs text-blue-300">{width}mm</div>
            </div>
          </div>

          <div className="mt-12 text-sm text-zinc-400 max-w-sm text-center">
            Extend your background colours and images into the <span className="text-red-400">red dashed bleed area</span> to avoid white edges when the paper is cut at the <span className="text-blue-400">blue trim line</span>.
          </div>
        </div>
      </div>
    </div>
  );
}
