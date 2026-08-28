"use client";

import { useState, useMemo } from "react";
import { icons } from "lucide-react";
import type { Section } from "@/lib/catalog";
import { IconGrid } from "./IconGrid";
import { IconEditor } from "./IconEditor";
import { CATEGORIES, getIconCategory } from "./categories";
import { cn } from "@/lib/utils";

// Get all icon names from lucide-react
const allIconNames = Object.keys(icons).filter(
  (name) => name !== "createLucideIcon" && name !== "default" && name !== "Icon" && name !== "LucideProps"
) as Array<keyof typeof icons>;

export function IconKhajana({ section }: { section: Section }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  // Memoize icon list based on search and category to prevent unneeded recalculations
  const filteredIcons = useMemo(() => {
    return allIconNames.filter((name) => {
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (selectedCategory === "all") return true;

      const iconCategories = getIconCategory(name);
      // If we are looking for misc, check if it didn't match any other category
      if (selectedCategory === "misc") {
         return iconCategories.includes("misc");
      }

      return iconCategories.includes(selectedCategory);
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex h-[calc(100vh-10rem)] max-h-[800px] flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-950/50 lg:flex-row">
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header / Toolbar */}
        <div className="flex flex-col gap-4 border-b border-white/[0.08] bg-zinc-900/50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-4">
            <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-xl", section.accent.gradient)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M6 3h12l4 6-10 12L2 9z" />
                <path d="M11 3 8 9l4 12 4-12-3-6" />
                <path d="M2 9h20" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white sm:text-xl">Icon Khajana</h2>
              <p className="text-xs text-zinc-400">
                {filteredIcons.length} icons found
              </p>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-3 sm:max-w-md">
            <div className="relative flex-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search icons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-black/20 py-2 pl-9 pr-4 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
              />
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-white/[0.04] p-3 sm:px-6 custom-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                selectedCategory === cat.id
                  ? "bg-violet-500/10 text-violet-300"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              )}
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={() => setSelectedCategory("misc")}
            className={cn(
              "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              selectedCategory === "misc"
                ? "bg-violet-500/10 text-violet-300"
                : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
            )}
          >
            Misc
          </button>
        </div>

        {/* Icon Grid (Lazy loaded/virtualized or paginated internally) */}
        <div className="flex-1 overflow-hidden relative">
          <IconGrid
            icons={filteredIcons}
            selectedIcon={selectedIcon}
            onSelectIcon={setSelectedIcon}
          />
        </div>
      </div>

      {/* Editor Sidebar */}
      {selectedIcon && (
        <div className="w-full shrink-0 border-t border-white/[0.08] bg-black/20 lg:w-80 lg:border-l lg:border-t-0">
          <IconEditor
            iconName={selectedIcon}
            onClose={() => setSelectedIcon(null)}
          />
        </div>
      )}
    </div>
  );
}