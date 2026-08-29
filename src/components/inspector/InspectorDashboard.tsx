"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { inspectDesign, DesignData } from "./engine";

export function InspectorDashboard({ activeTool }: { activeTool?: string }) {
  const [data, setData] = useState<DesignData>({
    width: 1920,
    height: 1080,
    dpi: 72,
    colorMode: "RGB",
    contrastRatio: 4.0,
    fontSize: 14,
    lineHeight: 1.5,
    letterSpacing: 0,
    margin: 24,
    isPrint: false,
  });

  const results = inspectDesign(data);
  const categories = ["Image", "Typography", "Layout", "Print"];

  const getStatusIcon = (status: string) => {
    if (status === "good") return <Icon name="check" className="h-5 w-5 text-emerald-400" />;
    if (status === "warning") return <span className="text-yellow-400 font-bold text-lg">⚠</span>;
    return <Icon name="close" className="h-5 w-5 text-red-400" />;
  };

  const getStatusBg = (status: string) => {
    if (status === "good") return "border-emerald-500/20 bg-emerald-500/5";
    if (status === "warning") return "border-yellow-500/20 bg-yellow-500/5";
    return "border-red-500/20 bg-red-500/5";
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Design Inspector</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Simulate an audit of your design metrics below to catch issues before deployment or print.
          </p>
        </div>

        <button
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white shrink-0"
          onClick={() => alert("Image/File upload analysis coming soon!")}
        >
          <Icon name="inspect" className="h-3.5 w-3.5" />
          Auto-Extract from Image
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 grid gap-4 content-start">
          <h3 className="text-sm font-semibold text-white mb-2 border-b border-white/10 pb-2">Design Parameters</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Width (px)</label>
              <input type="number" value={data.width} onChange={(e) => setData({ ...data, width: Number(e.target.value) })} className="w-full rounded-lg border border-white/10 bg-black/20 p-2 text-sm text-white" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Height (px)</label>
              <input type="number" value={data.height} onChange={(e) => setData({ ...data, height: Number(e.target.value) })} className="w-full rounded-lg border border-white/10 bg-black/20 p-2 text-sm text-white" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">DPI</label>
              <input type="number" value={data.dpi} onChange={(e) => setData({ ...data, dpi: Number(e.target.value) })} className="w-full rounded-lg border border-white/10 bg-black/20 p-2 text-sm text-white" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Target Output</label>
              <select value={data.isPrint ? "print" : "digital"} onChange={(e) => setData({ ...data, isPrint: e.target.value === "print" })} className="w-full rounded-lg border border-white/10 bg-black/20 p-2 text-sm text-white">
                <option value="digital">Digital (Screen)</option>
                <option value="print">Physical Print</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Colour Mode</label>
              <select value={data.colorMode} onChange={(e) => setData({ ...data, colorMode: e.target.value as "RGB" | "CMYK" })} className="w-full rounded-lg border border-white/10 bg-black/20 p-2 text-sm text-white">
                <option value="RGB">RGB</option>
                <option value="CMYK">CMYK</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Contrast Ratio (X:1)</label>
              <input type="number" step="0.1" value={data.contrastRatio} onChange={(e) => setData({ ...data, contrastRatio: Number(e.target.value) })} className="w-full rounded-lg border border-white/10 bg-black/20 p-2 text-sm text-white" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Base Font Size (px)</label>
              <input type="number" value={data.fontSize} onChange={(e) => setData({ ...data, fontSize: Number(e.target.value) })} className="w-full rounded-lg border border-white/10 bg-black/20 p-2 text-sm text-white" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Line Height</label>
              <input type="number" step="0.1" value={data.lineHeight} onChange={(e) => setData({ ...data, lineHeight: Number(e.target.value) })} className="w-full rounded-lg border border-white/10 bg-black/20 p-2 text-sm text-white" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Safe Margin (px)</label>
              <input type="number" value={data.margin} onChange={(e) => setData({ ...data, margin: Number(e.target.value) })} className="w-full rounded-lg border border-white/10 bg-black/20 p-2 text-sm text-white" />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 h-[600px] flex flex-col">
          <div className="mb-4 flex shrink-0 items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-sm font-semibold text-white">Inspection Report</h3>
            <div className="flex gap-2">
              <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded">
                {results.filter(r => r.status === "good").length} Passed
              </span>
              <span className="text-xs text-red-400 font-medium bg-red-500/10 px-2 py-0.5 rounded">
                {results.filter(r => r.status === "error").length} Failed
              </span>
            </div>
          </div>

          <div className="grid gap-6 overflow-y-auto pr-2 flex-1">
            {categories.map(cat => {
              const catResults = results.filter(r => r.category === cat);
              if (catResults.length === 0) return null;

              return (
                <div key={cat}>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">{cat}</h4>
                  <div className="grid gap-3">
                    {catResults.map(res => (
                      <div key={res.id} className={cn("rounded-xl border p-4", getStatusBg(res.status))}>
                        <div className="flex gap-3">
                          <div className="mt-0.5 shrink-0">
                            {getStatusIcon(res.status)}
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-white mb-1">{res.name}</h5>
                            <p className="text-sm text-zinc-300 mb-2">{res.message}</p>
                            {res.status !== "good" && (
                              <div className="mt-2 rounded bg-black/20 p-2 text-xs text-zinc-400 border border-white/5">
                                <span className="font-semibold text-zinc-300">Recommendation:</span> {res.recommendation}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 shrink-0">
            <button
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-4 font-medium text-zinc-950 transition-colors hover:bg-indigo-400"
              onClick={() => alert(`Opening canvas with inspected dimensions!`)}
            >
              <Icon name="corner" className="h-5 w-5" />
              Open in Canvas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
