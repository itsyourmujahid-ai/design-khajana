"use client";

import { Icon } from "@/components/ui/icon";
import type { Section } from "@/lib/catalog";
import { cn } from "@/lib/utils";

import { DesignDoctorDashboard } from "./DesignDoctorDashboard";

export function DesignDoctorStudio({ section }: { section: Section }) {
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

      <div className="mt-8 anim-rise-in">
        <DesignDoctorDashboard />
      </div>
    </div>
  );
}
