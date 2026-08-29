"use client";

import { useState, useRef } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { inspectDesign, DesignData } from "./engine";
import { analyzeImage } from "./imageAnalyzer";

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

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const results = inspectDesign(data);
  const categories = ["Image", "Typography", "Layout", "Print"];

  const getStatusIcon = (status: string) => {
    if (status === "good") return <Icon name="check" className="h-5 w-5 text-emerald-400" />;
    if (status === "warning") return <span className="text-yellow-400 font-bold text-lg leading-none">⚠</span>;
    return <Icon name="close" className="h-5 w-5 text-red-400" />;
  };

  const getStatusBg = (status: string) => {
    if (status === "good") return "border-emerald-500/20 bg-emerald-500/5";
    if (status === "warning") return "border-yellow-500/20 bg-yellow-500/5";
    return "border-red-500/20 bg-red-500/5";
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;

    setIsAnalyzing(true);
    setPreviewUrl(URL.createObjectURL(file));

    try {
      const result = await analyzeImage(file);
      setData(prev => ({
        ...prev,
        width: result.width,
        height: result.height,
        contrastRatio: Number(result.contrastRatio.toFixed(1))
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Design Inspector</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Upload your design to auto-extract metrics, or tweak parameters manually to catch issues.
          </p>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300 transition-colors hover:bg-indigo-500/20 shrink-0"
        >
          <Icon name="inspect" className="h-4 w-4" />
          Upload & Analyze
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-6">

          {/* Upload Area */}
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={cn(
              "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors",
              isDragging
                ? "border-indigo-500 bg-indigo-500/10"
                : "border-white/10 hover:border-white/20 hover:bg-white/5",
              previewUrl ? "border-solid border-white/20 p-2 bg-black/40" : ""
            )}
          >
            {previewUrl ? (
              <div className="relative w-full h-40">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                <button
                  onClick={() => { setPreviewUrl(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                  className="absolute top-2 right-2 rounded-md bg-black/60 p-1.5 text-white hover:bg-black/80"
                >
                  <Icon name="close" className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <Icon name="image" className="mb-4 h-8 w-8 text-zinc-500" />
                <p className="mb-2 text-sm font-medium text-white">Drag & drop your design here</p>
                <p className="mb-4 text-xs text-zinc-400">Supports PNG, JPG, WEBP</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-lg bg-indigo-500/20 px-4 py-2 text-xs font-semibold text-indigo-300 transition-colors hover:bg-indigo-500/30"
                >
                  Browse files
                </button>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>

          <h3 className="text-sm font-semibold text-white border-b border-white/10 pb-2">Manual Adjustments</h3>

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
            <div className="col-span-2">
              <label className="mb-1 block text-xs font-medium text-zinc-400">Safe Margin (px)</label>
              <input type="number" value={data.margin} onChange={(e) => setData({ ...data, margin: Number(e.target.value) })} className="w-full rounded-lg border border-white/10 bg-black/20 p-2 text-sm text-white" />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 h-[720px] flex flex-col">
          <div className="mb-4 flex shrink-0 items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              {isAnalyzing && <Icon name="refresh" className="h-4 w-4 animate-spin text-zinc-400" />}
              Inspection Report
            </h3>
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
