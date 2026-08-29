"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-black/[0.04] text-zinc-600 transition-colors hover:bg-black/[0.08] hover:text-black dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.08] dark:hover:text-white"
      aria-label="Toggle theme"
    >
      <Icon name={isDark ? "sun" : "moon"} className="h-[18px] w-[18px]" />
    </button>
  );
}
