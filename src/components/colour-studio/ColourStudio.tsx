"use client";

import { useState } from "react";
import type { Section } from "@/lib/catalog";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { ColourPickerTool } from "./ColourPickerTool";
import { PaletteGeneratorTool } from "./PaletteGeneratorTool";
import { GradientGeneratorTool } from "./GradientGeneratorTool";
import { ContrastCheckerTool } from "./ContrastCheckerTool";
import { ColourHarmonyTool } from "./ColourHarmonyTool";
import { ColourConverterTool } from "./ColourConverterTool";

export function ColourStudio({ section }: { section: Section }) {
  const [activeTool, setActiveTool] = useState<string>("colour-picker");

  // Normalize IDs in case they weren't assigned in catalog
  const tools = section.tools.map(t => ({
    ...t,
    id: t.id || t.name.toLowerCase().replace(/\s+/g, '-')
  }));

  const renderTool = () => {
    switch (activeTool) {
      case "colour-picker":
        return <ColourPickerTool />;
      case "palette-generator":
        return <PaletteGeneratorTool />;
      case "gradient-generator":
        return <GradientGeneratorTool />;
      case "contrast-checker":
        return <ContrastCheckerTool />;
      case "colour-harmony":
        return <ColourHarmonyTool />;
      case "colour-converter":
        return <ColourConverterTool />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <Icon name="wrench" className="h-12 w-12 text-zinc-600 mb-4" />
             <h3 className="text-lg font-medium text-white">Tool Under Construction</h3>
             <p className="text-zinc-500 mt-2">This tool is being built right now.</p>
          </div>
        );
    }
  };

  const activeToolObj = tools.find(t => t.id === activeTool);

  return (
    <div className="mx-auto max-w-[1400px]">
      <section className="anim-rise-in relative mb-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
        <div
          aria-hidden
          className={cn(
            "absolute -right-24 -top-28 h-64 w-64 rounded-full bg-gradient-to-br opacity-20 blur-3xl",
            section.accent.gradient,
          )}
        />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
          <div
            className={cn(
              "grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-xl",
              section.accent.gradient,
              section.accent.glow,
            )}
          >
            <Icon name={section.icon} className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Design Studio · Functional
            </p>
            <h1 className="font-display mt-0.5 text-2xl font-bold tracking-tight text-white">
              {section.name}
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              {section.description} All running perfectly offline.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live tools
          </span>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[210px_minmax(0,1fr)]">
        {/* Tool rail */}
        <aside className="order-1">
          <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Tools
          </p>
          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0 custom-scrollbar">
            {tools.map((item) => {
              const active = item.id === activeTool;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTool(item.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2.5 rounded-xl border px-3 py-2 text-[13px] font-medium transition-colors lg:w-full",
                    active
                      ? "border-white/10 bg-white/[0.07] text-white shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]"
                      : "border-transparent text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200",
                  )}
                  aria-pressed={active}
                >
                  <Icon
                    name={item.icon}
                    className={cn("h-[18px] w-[18px]", active ? section.accent.text : "text-zinc-500")}
                  />
                  <span className="truncate">{item.name}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Stage */}
        <section className="order-2 min-w-0">
           <div className="flex items-center justify-between gap-3 mb-4">
              <div className="min-w-0">
                <p className="truncate text-lg font-bold text-white">{activeToolObj?.name}</p>
                <p className="text-sm text-zinc-400">
                  {activeToolObj?.description}
                </p>
              </div>
           </div>

           <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
             {renderTool()}
           </div>
        </section>
      </div>
    </div>
  );
}
