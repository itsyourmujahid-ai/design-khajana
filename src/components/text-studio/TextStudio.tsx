"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import type { Section } from "@/lib/catalog";
import { cn } from "@/lib/utils";

import { TextHierarchyTool } from "./TextHierarchyTool";
import { TextRewriteTool } from "./TextRewriteTool";
import { TextShortenTool } from "./TextShortenTool";
import { TextToneTool } from "./TextToneTool";

export function TextStudio({ section }: { section: Section }) {
  const [activeTool, setActiveTool] = useState(section.tools[0].name);

  return (
    <div className="mx-auto max-w-6xl">
      <section className="anim-rise-in relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-10">
        <div
          aria-hidden
          className={cn(
            "absolute -right-24 -top-28 h-64 w-64 rounded-full bg-gradient-to-br opacity-20 blur-3xl",
            section.accent.gradient,
          )}
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-6">
            <div
              className={cn(
                "grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-xl",
                section.accent.gradient,
                section.accent.glow,
              )}
            >
              <Icon name={section.icon} className="h-8 w-8" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Design Studio · Functional
              </p>
              <h1 className="font-display mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {section.name}
              </h1>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
                {section.description}
              </p>
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live tools
          </span>
        </div>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr] xl:gap-8">
        <aside className="anim-rise-in flex flex-col gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-2">
          <p className="mb-2 px-3 pt-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Tools
          </p>
          {section.tools.map((tool) => {
            const active = activeTool === tool.name;
            return (
              <button
                key={tool.name}
                type="button"
                onClick={() => setActiveTool(tool.name)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-white/[0.08] text-white shadow-sm"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200",
                )}
              >
                <Icon
                  name={tool.icon}
                  className={cn(
                    "h-4 w-4 transition-colors",
                    active ? section.accent.text : "text-zinc-500",
                  )}
                />
                {tool.name}
              </button>
            );
          })}
        </aside>

        <div className="anim-rise-in min-h-[500px]">
          {activeTool === "Text Hierarchy" && <TextHierarchyTool />}
          {activeTool === "Heading" && <TextHierarchyTool focus="Heading" />}
          {activeTool === "Subheading" && <TextHierarchyTool focus="Subheading" />}
          {activeTool === "Body" && <TextHierarchyTool focus="Body" />}
          {activeTool === "CTA" && <TextHierarchyTool focus="CTA" />}

          {activeTool === "Rewrite" && <TextRewriteTool />}
          {activeTool === "Shorten" && <TextShortenTool />}

          {activeTool === "Professional" && <TextToneTool tone="Professional" />}
          {activeTool === "Premium" && <TextToneTool tone="Premium" />}
          {activeTool === "Corporate" && <TextToneTool tone="Corporate" />}
          {activeTool === "Catchy" && <TextToneTool tone="Catchy" />}
        </div>
      </div>
    </div>
  );
}
