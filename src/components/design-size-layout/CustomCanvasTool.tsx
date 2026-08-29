"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function CustomCanvasTool() {
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [unit, setUnit] = useState<"px" | "mm" | "cm">("px");

  const setOrientation = (orientation: "portrait" | "landscape" | "square") => {
    const max = Math.max(width, height);
    const min = Math.min(width, height);

    if (orientation === "portrait") {
      setWidth(min);
      setHeight(max);
    } else if (orientation === "landscape") {
      setWidth(max);
      setHeight(min);
    } else if (orientation === "square") {
      setWidth(max);
      setHeight(max);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Custom Canvas</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Start with any width, height, and orientation.
        </p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <div className="grid gap-8">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 p-1 w-max">
            {(["px", "mm", "cm"] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={cn(
                  "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                  unit === u ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-200"
                )}
              >
                {u}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Width</label>
              <div className="relative">
                <input
                  type="number"
                  value={width || ""}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 pr-12"
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
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">{unit}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-zinc-300">Orientation</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setOrientation("landscape")}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/5 py-4 transition-colors hover:bg-white/10 text-zinc-300 hover:text-white"
              >
                <div className="h-6 w-8 rounded-sm border-2 border-current" />
                <span className="text-xs">Landscape</span>
              </button>
              <button
                onClick={() => setOrientation("portrait")}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/5 py-4 transition-colors hover:bg-white/10 text-zinc-300 hover:text-white"
              >
                <div className="h-8 w-6 rounded-sm border-2 border-current" />
                <span className="text-xs">Portrait</span>
              </button>
              <button
                onClick={() => setOrientation("square")}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/5 py-4 transition-colors hover:bg-white/10 text-zinc-300 hover:text-white"
              >
                <div className="h-7 w-7 rounded-sm border-2 border-current" />
                <span className="text-xs">Square</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <button
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-4 font-medium text-zinc-950 transition-colors hover:bg-indigo-400"
              onClick={() => alert(`Opening canvas with ${width}x${height}${unit}`)}
            >
              <Icon name="corner" className="h-5 w-5" />
              Open Custom Canvas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
