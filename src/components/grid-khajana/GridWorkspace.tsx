"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { ReferenceLibrary } from "./ReferenceLibrary";
import { ReferenceLayout, GridConfig, LayoutElement } from "./types";

export function GridWorkspace() {
  const router = useRouter();
  const [activeLayout, setActiveLayout] = useState<ReferenceLayout | null>(null);
  const [mode, setMode] = useState<"study" | "use" | null>(null);

  const [gridConfig, setGridConfig] = useState<GridConfig | null>(null);
  const [elements, setElements] = useState<LayoutElement[]>([]);
  const [customImage, setCustomImage] = useState<string | null>(null);

  const handleSelectLayout = (layout: ReferenceLayout, selectedMode: "study" | "use") => {
    setActiveLayout(layout);
    setMode(selectedMode);
    setGridConfig(layout.gridConfig);
    setElements(layout.elements);
    setCustomImage(null);
  };

  const handleUploadCustom = (file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const layout: ReferenceLayout = {
        id: "custom",
        name: "Custom Reference",
        category: "Custom",
        canvasWidth: img.width,
        canvasHeight: img.height,
        gridConfig: {
          type: "column",
          columns: 12,
          gutter: 20,
          margin: 40,
          color: "#fuchsia",
          opacity: 0.4,
          isVisible: true,
        },
        analysis: {
          gridNotes: "Custom Image",
          structure: "Analyze structure manually",
          alignment: "Unknown",
          style: "Custom",
          mainAlignment: "Adjust grid to match image",
        },
        elements: [
          {
            id: "bg",
            type: "background",
            position: { x: 0, y: 0, width: img.width, height: img.height },
            shapeStyle: { backgroundColor: "#ffffff" },
            isHidden: false,
            isLocked: true,
          }
        ]
      };

      setCustomImage(url);
      setActiveLayout(layout);
      setMode("study");
      setGridConfig(layout.gridConfig);
      setElements(layout.elements);
    };
    img.src = url;
  };

  const closeWorkspace = () => {
    setActiveLayout(null);
    setMode(null);
    if (customImage) URL.revokeObjectURL(customImage);
  };

  if (!activeLayout || !gridConfig || !mode) {
    return <ReferenceLibrary onSelectLayout={handleSelectLayout} onUploadCustom={handleUploadCustom} />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[800px]">

      {/* Sidebar Controls */}
      <div className="w-full lg:w-80 flex flex-col gap-6 overflow-y-auto pr-2">
        <div className="flex items-center justify-between">
          <button onClick={closeWorkspace} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
            <Icon name="arrowRight" className="h-4 w-4 rotate-180" /> Back to Library
          </button>
          <span className="text-[10px] font-bold uppercase tracking-wider text-fuchsia-400 bg-fuchsia-500/10 px-2 py-1 rounded-md">
            {mode === "study" ? "Study Mode" : "Edit Mode"}
          </span>
        </div>

        {/* Info Panel */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <h3 className="font-bold text-white mb-1">{activeLayout.name}</h3>
          <p className="text-xs text-zinc-400 mb-4">{activeLayout.canvasWidth} × {activeLayout.canvasHeight} px</p>

          <div className="space-y-3 pt-4 border-t border-white/5">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-0.5">Structure</span>
              <p className="text-sm text-zinc-300">{activeLayout.analysis.structure}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-0.5">Main Alignment</span>
              <p className="text-sm text-zinc-300">{activeLayout.analysis.mainAlignment}</p>
            </div>
          </div>
        </div>

        {/* Grid Settings */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">Grid Guides</h3>
            <button
              onClick={() => setGridConfig({...gridConfig, isVisible: !gridConfig.isVisible})}
              className={cn("p-1.5 rounded-md", gridConfig.isVisible ? "bg-fuchsia-500/20 text-fuchsia-400" : "bg-white/5 text-zinc-500")}
            >
              <Icon name="eye" className="h-4 w-4" />
            </button>
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-2">Columns: {gridConfig.columns}</label>
            <input
              type="range" min="1" max="24" value={gridConfig.columns}
              onChange={e => setGridConfig({...gridConfig, columns: Number(e.target.value)})}
              className="w-full dk-range"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-2">Margin: {gridConfig.margin}px</label>
            <input
              type="range" min="0" max="200" value={gridConfig.margin}
              onChange={e => setGridConfig({...gridConfig, margin: Number(e.target.value)})}
              className="w-full dk-range"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-2">Gutter: {gridConfig.gutter}px</label>
            <input
              type="range" min="0" max="100" value={gridConfig.gutter}
              onChange={e => setGridConfig({...gridConfig, gutter: Number(e.target.value)})}
              className="w-full dk-range"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-2">Opacity</label>
            <input
              type="range" min="0.1" max="1" step="0.1" value={gridConfig.opacity}
              onChange={e => setGridConfig({...gridConfig, opacity: Number(e.target.value)})}
              className="w-full dk-range"
            />
          </div>
        </div>

        <button
          onClick={() => {
            // Only send Grid Configuration to canvas, as specified in requirements
            const canvasState = {
              elements: [],
              selectedIds: [],
              canvasWidth: activeLayout.canvasWidth,
              canvasHeight: activeLayout.canvasHeight,
              canvasBg: "#ffffff",
              showGuides: true,
              lockGuides: false,
              guides: [],
              zoom: 1,
              panX: 0,
              panY: 0,
              activeTool: "select",
              gridOverlay: gridConfig // Extended for canvas implementation to draw guides
            };

            localStorage.setItem('dk_canvas_save', JSON.stringify(canvasState));
            router.push("/canvas");
          }}
          className="w-full flex justify-center items-center gap-2 rounded-xl bg-fuchsia-600 px-4 py-3 font-bold text-white transition-colors hover:bg-fuchsia-500"
        >
          <Icon name="corner" className="h-4 w-4" /> Use Grid in Canvas
        </button>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center p-8 overflow-hidden relative">
        <div
          className="relative bg-white shadow-2xl transition-all"
          style={{
            aspectRatio: `${activeLayout.canvasWidth}/${activeLayout.canvasHeight}`,
            width: activeLayout.canvasWidth > activeLayout.canvasHeight ? '100%' : 'auto',
            height: activeLayout.canvasHeight >= activeLayout.canvasWidth ? '100%' : 'auto',
            maxHeight: '100%',
            maxWidth: '100%',
            transformOrigin: "center center"
          }}
        >
          {/* Elements Layer */}
          {elements.map(el => {
            if (el.isHidden) return null;

            const isBg = el.type === 'background';
            const style: React.CSSProperties = {
              position: 'absolute',
              left: isBg ? 0 : `${(el.position.x / activeLayout.canvasWidth) * 100}%`,
              top: isBg ? 0 : `${(el.position.y / activeLayout.canvasHeight) * 100}%`,
              width: isBg ? '100%' : `${(el.position.width / activeLayout.canvasWidth) * 100}%`,
              height: isBg ? '100%' : `${(el.position.height / activeLayout.canvasHeight) * 100}%`,
              backgroundColor: el.shapeStyle?.backgroundColor || 'transparent',
              borderRadius: el.shapeStyle?.borderRadius ? `${el.shapeStyle.borderRadius}px` : 0,
              display: 'flex',
              alignItems: el.type === 'text' ? 'flex-start' : 'center',
              justifyContent: el.type === 'text' ? (el.textStyle?.textAlign === 'center' ? 'center' : el.textStyle?.textAlign === 'right' ? 'flex-end' : 'flex-start') : 'center',
              overflow: 'hidden',
              border: 'none',
              cursor: 'default',
            };

            return (
              <div key={el.id} style={style} className="z-0">
                {el.type === 'text' && (
                  <span style={{
                    fontSize: `${(el.textStyle?.fontSize || 16) / 2}px`, // Scaled down roughly for preview
                    fontWeight: el.textStyle?.fontWeight,
                    color: el.textStyle?.color,
                    lineHeight: el.textStyle?.lineHeight,
                    textAlign: el.textStyle?.textAlign,
                    letterSpacing: el.textStyle?.letterSpacing ? `${el.textStyle.letterSpacing}px` : 'normal',
                    textTransform: el.textStyle?.textTransform,
                    whiteSpace: "pre-wrap"
                  }}>
                    {el.content}
                  </span>
                )}
              </div>
            );
          })}

          {/* Custom Uploaded Image Layer */}
          {customImage && (
             <img src={customImage} alt="Custom Reference" className="absolute inset-0 w-full h-full object-contain opacity-80 z-20 pointer-events-none" />
          )}

          {/* Grid Overlay Layer */}
          {gridConfig.isVisible && (
            <div
              className="absolute inset-0 z-30 pointer-events-none flex"
              style={{
                padding: `${(gridConfig.margin / Math.max(activeLayout.canvasWidth, activeLayout.canvasHeight)) * 100}%`,
                opacity: gridConfig.opacity
              }}
            >
              {Array.from({ length: gridConfig.columns }).map((_, i) => (
                <div
                  key={i}
                  className="h-full flex-1"
                  style={{
                    backgroundColor: gridConfig.color,
                    marginRight: i < gridConfig.columns - 1 ? `${(gridConfig.gutter / activeLayout.canvasWidth) * 100}%` : 0
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
