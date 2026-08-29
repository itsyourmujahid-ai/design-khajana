"use client";

import { Icon } from "@/components/ui/icon";

const socialSizes = [
  { platform: "Instagram", name: "Post (Square)", width: 1080, height: 1080 },
  { platform: "Instagram", name: "Post (Portrait)", width: 1080, height: 1350 },
  { platform: "Instagram", name: "Story & Reel", width: 1080, height: 1920 },
  { platform: "Facebook", name: "Post", width: 1200, height: 630 },
  { platform: "Facebook", name: "Cover Photo", width: 820, height: 312 },
  { platform: "YouTube", name: "Thumbnail", width: 1280, height: 720 },
  { platform: "YouTube", name: "Channel Art", width: 2560, height: 1440 },
  { platform: "LinkedIn", name: "Post", width: 1200, height: 627 },
  { platform: "LinkedIn", name: "Company Cover", width: 1128, height: 191 },
];

export function SocialMediaSizesTool() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Social Media Sizes</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Perfect pixel presets for modern social platforms.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {socialSizes.map((size) => (
          <div key={`${size.platform}-${size.name}`} className="group relative flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:border-indigo-500/30 hover:bg-white/[0.04]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">{size.platform}</span>
              <span className="text-xs text-zinc-500">{size.width} × {size.height} px</span>
            </div>

            <h3 className="text-lg font-medium text-white mb-6">{size.name}</h3>

            <div className="mt-auto flex justify-end">
              <button
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                onClick={() => alert("Canvas integration coming soon!")}
              >
                <Icon name="corner" className="h-3.5 w-3.5" />
                Open in Canvas
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
