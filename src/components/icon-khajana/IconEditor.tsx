"use client";

import { useState, useRef } from "react";
import { icons } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconEditorProps {
  iconName: string;
  onClose: () => void;
}

export function IconEditor({ iconName, onClose }: IconEditorProps) {
  const [size, setSize] = useState(256);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [color, setColor] = useState("#ffffff");

  const [copied, setCopied] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LucideIcon = (icons as any)[iconName];

  // Handle color click preset
  const presetColors = [
    "#ffffff", "#000000", "#ef4444", "#f97316", "#f59e0b",
    "#84cc16", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#d946ef"
  ];

  const getSvgString = () => {
    if (!svgRef.current) return "";

    // Clone node to modify attributes for export without affecting preview
    const clone = svgRef.current.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("width", size.toString());
    clone.setAttribute("height", size.toString());
    clone.setAttribute("stroke", color);
    clone.setAttribute("stroke-width", strokeWidth.toString());
    clone.setAttribute("class", ""); // Remove Tailwind classes

    return clone.outerHTML;
  };

  const handleCopySvg = async () => {
    try {
      const svgString = getSvgString();
      await navigator.clipboard.writeText(svgString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy SVG", err);
    }
  };

  const handleDownloadSvg = () => {
    const svgString = getSvgString();
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${iconName.toLowerCase()}-${size}px.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = () => {
    const svgString = getSvgString();
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const DOMURL = window.URL || window.webkitURL || window;
    const url = DOMURL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL("image/png");

        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = `${iconName.toLowerCase()}-${size}px.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      DOMURL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="flex h-full flex-col bg-zinc-950/50 relative">
      <div className="flex items-center justify-between border-b border-white/[0.08] p-4">
        <div>
          <h3 className="font-display text-sm font-semibold text-white">
            {iconName.replace(/([A-Z])/g, ' $1').trim()}
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{iconName}</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        {/* Preview Area */}
        <div
          className="relative mb-8 flex aspect-square w-full items-center justify-center rounded-2xl border border-white/[0.08] bg-[url('/checkers.svg')] bg-zinc-900 overflow-hidden"
          style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)' }}
        >
          {LucideIcon && (
            <div style={{ color, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
              <LucideIcon
                ref={svgRef}
                size={Math.min(size, 200)}
                strokeWidth={strokeWidth}
                className="transition-all duration-200"
              />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-300">Size</label>
              <span className="text-xs font-mono text-zinc-500">{size}px</span>
            </div>
            <input
              type="range"
              min="16"
              max="512"
              step="8"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-violet-500"
            />
            <div className="flex gap-2">
              {[16, 24, 32, 64, 128, 256].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setSize(preset)}
                  className={cn(
                    "flex-1 rounded border border-white/[0.08] py-1 text-[10px] transition-colors",
                    size === preset ? "bg-violet-500/20 text-violet-300 border-violet-500/30" : "bg-white/[0.02] text-zinc-400 hover:bg-white/[0.06]"
                  )}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Stroke Width */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-300">Stroke</label>
              <span className="text-xs font-mono text-zinc-500">{strokeWidth}px</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.25"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="w-full accent-violet-500"
            />
          </div>

          {/* Color */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-300">Color</label>
              <span className="text-xs font-mono text-zinc-500 uppercase">{color}</span>
            </div>

            <div className="flex gap-2">
              <div className="relative h-8 w-12 overflow-hidden rounded border border-white/[0.1]">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="absolute -inset-2 h-12 w-16 cursor-pointer opacity-0"
                />
                <div className="h-full w-full" style={{ backgroundColor: color }} />
              </div>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1 rounded border border-white/[0.08] bg-black/20 px-3 text-xs uppercase text-zinc-300 focus:border-violet-500/50 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {presetColors.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setColor(preset)}
                  className={cn(
                    "h-5 w-5 rounded-full border shadow-sm transition-transform hover:scale-110",
                    color === preset ? "border-white ring-2 ring-violet-500/30" : "border-white/10"
                  )}
                  style={{ backgroundColor: preset }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-white/[0.08] bg-zinc-950/80 p-4">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <button
            onClick={handleDownloadSvg}
            className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.05] py-2.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/[0.1]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            SVG
          </button>
          <button
            onClick={handleDownloadPng}
            className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.05] py-2.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/[0.1]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            PNG
          </button>
        </div>
        <button
          onClick={handleCopySvg}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-violet-500 py-2.5 text-xs font-medium text-white transition-all hover:bg-violet-600 active:scale-[0.98]"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy SVG
            </>
          )}
        </button>
      </div>
    </div>
  );
}