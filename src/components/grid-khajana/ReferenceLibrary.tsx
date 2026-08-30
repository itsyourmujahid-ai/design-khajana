"use client";

import { useState, useRef } from "react";
import { Icon } from "@/components/ui/icon";
import { categories, predefinedLayouts } from "./data";
import { ReferenceLayout } from "./types";
import { cn } from "@/lib/utils";

interface ReferenceLibraryProps {
  onSelectLayout: (layout: ReferenceLayout, mode: "study" | "use") => void;
  onUploadCustom: (file: File) => void;
}

export function ReferenceLibrary({ onSelectLayout, onUploadCustom }: ReferenceLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredLayouts = activeCategory === "All"
    ? predefinedLayouts
    : predefinedLayouts.filter(l => l.category === activeCategory);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadCustom(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Grid References</h2>
          <p className="text-sm text-zinc-400 max-w-xl">
            Choose a professional layout to study its grid structure, or use it directly as an editable starting point.
          </p>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 shrink-0"
        >
          <Icon name="inspect" className="h-4 w-4 text-fuchsia-400" />
          Upload Custom Reference
        </button>
        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFile} />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-white/5">
        <button
          onClick={() => setActiveCategory("All")}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap",
            activeCategory === "All" ? "bg-fuchsia-500/20 text-fuchsia-300" : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
          )}
        >
          All Categories
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap",
              activeCategory === cat ? "bg-fuchsia-500/20 text-fuchsia-300" : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredLayouts.map(layout => (
          <div key={layout.id} className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all hover:border-fuchsia-500/30 hover:bg-white/[0.04]">

            <div className="relative aspect-[4/3] bg-black/40 border-b border-white/5 p-4 flex items-center justify-center">
              <div
                className="bg-white/5 border border-white/10 shadow-xl overflow-hidden relative flex flex-col"
                style={{
                  aspectRatio: `${layout.canvasWidth}/${layout.canvasHeight}`,
                  width: layout.canvasWidth > layout.canvasHeight ? '100%' : 'auto',
                  height: layout.canvasHeight >= layout.canvasWidth ? '100%' : 'auto',
                  maxHeight: '100%',
                  maxWidth: '100%'
                }}
              >
                {/* Reference Image */}
                {layout.referenceImageUrl && (
                  <img
                    src={layout.referenceImageUrl}
                    alt={layout.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {/* Overlay Grid Preview */}
                <div className="absolute inset-0 flex" style={{ padding: `${(layout.gridConfig.margin / Math.max(layout.canvasWidth, layout.canvasHeight)) * 100}%` }}>
                  {Array.from({ length: layout.gridConfig.columns }).map((_, i) => (
                    <div key={i} className="h-full flex-1 border-x border-fuchsia-500/20 bg-fuchsia-500/10" style={{ marginRight: i < layout.gridConfig.columns - 1 ? `${(layout.gridConfig.gutter / layout.canvasWidth) * 100}%` : 0 }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-2 gap-2">
                <h3 className="font-bold text-white leading-tight">{layout.name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-fuchsia-400 bg-fuchsia-500/10 px-2 py-0.5 rounded-full shrink-0">{layout.category}</span>
              </div>
              <p className="text-xs text-zinc-400 mb-4">{layout.analysis.gridNotes}</p>

              <div className="mt-auto grid grid-cols-2 gap-2 pt-4 border-t border-white/5">
                <button
                  onClick={() => onSelectLayout(layout, "study")}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon name="eye" className="h-3.5 w-3.5" />
                  Study Layout
                </button>
                <button
                  onClick={() => onSelectLayout(layout, "use")}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-transparent bg-fuchsia-600 py-2 text-xs font-bold text-white transition-colors hover:bg-fuchsia-500"
                >
                  <Icon name="layout" className="h-3.5 w-3.5" />
                  Use Grid
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
