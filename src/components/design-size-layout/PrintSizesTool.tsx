"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const printSizes = [
  { name: "A4", width: 210, height: 297 },
  { name: "A3", width: 297, height: 420 },
  { name: "A5", width: 148, height: 210 },
  { name: "Business Card", width: 85, height: 55 },
  { name: "DL Flyer", width: 99, height: 210 },
  { name: "Poster (Arch E)", width: 914, height: 1219 }, // Arch E in mm ~ 914x1219
];

export function PrintSizesTool() {
  const [unit, setUnit] = useState<"mm" | "cm">("mm");

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Print Sizes</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Standard print dimensions ready for the press.
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/20 p-1">
          <button
            onClick={() => setUnit("mm")}
            className={cn(
              "rounded-md px-3 py-1 text-xs font-medium transition-colors",
              unit === "mm" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            mm
          </button>
          <button
            onClick={() => setUnit("cm")}
            className={cn(
              "rounded-md px-3 py-1 text-xs font-medium transition-colors",
              unit === "cm" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            cm
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {printSizes.map((size) => {
          const w = unit === "cm" ? (size.width / 10).toFixed(1) : size.width;
          const h = unit === "cm" ? (size.height / 10).toFixed(1) : size.height;

          return (
            <div key={size.name} className="group relative flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:border-indigo-500/30 hover:bg-white/[0.04]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Print</span>
                <span className="text-xs text-zinc-500">{w} × {h} {unit}</span>
              </div>

              <h3 className="text-lg font-medium text-white mb-6">{size.name}</h3>

              <div className="mt-auto flex justify-end">
                <button
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                  onClick={() => alert("Canvas integration coming soon!")}
                >
                  <Icon name="corner" className="h-3.5 w-3.5" />
                  Open in Canvas
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
