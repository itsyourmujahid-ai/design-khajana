"use client";

import { useState, useEffect, useRef } from "react";
import { icons } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconGridProps {
  icons: string[];
  selectedIcon: string | null;
  onSelectIcon: (iconName: string) => void;
}

export function IconGrid({ icons: iconNames, selectedIcon, onSelectIcon }: IconGridProps) {
  // Simple pagination to load icons in chunks so we don't render 2000 icons at once
  const [displayedCount, setDisplayedCount] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);

  const [prevIconNames, setPrevIconNames] = useState(iconNames);

  // Instead of updating state in effect, update it during render for derived state
  if (prevIconNames !== iconNames) {
    setPrevIconNames(iconNames);
    setDisplayedCount(100);
  }

  // Effect only for DOM manipulation (scrolling)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [iconNames]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      // Load next chunk if we're near the bottom
      if (displayedCount < iconNames.length) {
        setDisplayedCount((prev) => Math.min(prev + 100, iconNames.length));
      }
    }
  };

  const displayedIcons = iconNames.slice(0, displayedCount);

  if (iconNames.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] text-zinc-500">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <p className="text-sm font-medium text-zinc-300">No icons found</p>
        <p className="mt-1 text-xs text-zinc-500">Try a different search term or category.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar"
      onScroll={handleScroll}
    >
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
        {displayedIcons.map((name) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const LucideIcon = (icons as any)[name];
          if (!LucideIcon) return null;

          const isSelected = selectedIcon === name;

          return (
            <button
              key={name}
              onClick={() => onSelectIcon(name)}
              className={cn(
                "group flex flex-col items-center justify-center gap-2 rounded-xl border p-3 transition-all",
                isSelected
                  ? "border-violet-500/50 bg-violet-500/10 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                  : "border-white/[0.04] bg-white/[0.02] text-zinc-400 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-zinc-200"
              )}
              title={name}
            >
              <div className="flex h-10 w-10 items-center justify-center">
                <LucideIcon size={24} strokeWidth={2} />
              </div>
              <span className="w-full truncate text-center text-[10px] opacity-70 group-hover:opacity-100">
                {name.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </button>
          );
        })}
      </div>
      {displayedCount < iconNames.length && (
        <div className="mt-6 flex justify-center pb-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-500 border-t-transparent" />
        </div>
      )}
    </div>
  );
}