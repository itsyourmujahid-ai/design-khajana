"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";

type UnitType = "mm" | "cm" | "inch" | "px";

export function UnitConverterTool() {
  const [value, setValue] = useState<number>(100);
  const [fromUnit, setFromUnit] = useState<UnitType>("mm");
  const [dpi, setDpi] = useState<number>(300);

  let inches = 0;
  if (fromUnit === "inch") inches = value;
  if (fromUnit === "mm") inches = value / 25.4;
  if (fromUnit === "cm") inches = value / 2.54;
  if (fromUnit === "px") inches = value / dpi;

  const results = {
    inch: Number(inches.toFixed(3)),
    mm: Number((inches * 25.4).toFixed(2)),
    cm: Number((inches * 2.54).toFixed(2)),
    px: Math.round(inches * dpi)
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Unit Converter</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Seamlessly translate dimensions across print and digital units.
        </p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

        <div className="flex items-end gap-4 mb-8">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-zinc-300">Convert</label>
            <input
              type="number"
              value={value || ""}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-4 text-xl text-white focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 font-display"
            />
          </div>

          <div className="w-1/3">
            <label className="mb-2 block text-sm font-medium text-zinc-300">From</label>
            <div className="relative">
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as UnitType)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-base font-medium text-white focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
              >
                <option value="mm">Millimeters</option>
                <option value="cm">Centimeters</option>
                <option value="inch">Inches</option>
                <option value="px">Pixels</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                <Icon name="arrowRight" className="h-4 w-4 rotate-90 text-zinc-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-xl border border-white/5 bg-black/20 p-5">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
            <span className="text-sm font-medium text-zinc-400">Millimeters</span>
            <span className="font-display text-xl text-white">{results.mm} <span className="text-zinc-500 text-sm">mm</span></span>
          </div>
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
            <span className="text-sm font-medium text-zinc-400">Centimeters</span>
            <span className="font-display text-xl text-white">{results.cm} <span className="text-zinc-500 text-sm">cm</span></span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-400">Inches</span>
            <span className="font-display text-xl text-white">{results.inch} <span className="text-zinc-500 text-sm">in</span></span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-zinc-300">Pixels (Depends on DPI)</label>
            <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/20 p-1">
              {([72, 150, 300]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDpi(d)}
                  className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                    dpi === d ? "bg-indigo-500/20 text-indigo-300" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 flex items-center justify-between">
            <span className="text-sm font-medium text-indigo-400/80">Pixels</span>
            <span className="font-display text-2xl font-bold text-white">{results.px} <span className="text-indigo-400/50 text-sm font-normal">px</span></span>
          </div>
        </div>

      </div>
    </div>
  );
}
