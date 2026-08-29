"use client";

import { Icon } from "@/components/ui/icon";

const ratios = [
  { name: "Square", ratio: "1:1", width: 1080, height: 1080 },
  { name: "Standard", ratio: "4:3", width: 1024, height: 768 },
  { name: "Widescreen", ratio: "16:9", width: 1920, height: 1080 },
  { name: "Vertical", ratio: "9:16", width: 1080, height: 1920 },
  { name: "Classic Photo", ratio: "3:2", width: 1200, height: 800 },
  { name: "Portrait Photo", ratio: "2:3", width: 800, height: 1200 },
  { name: "Cinematic", ratio: "21:9", width: 2560, height: 1080 },
  { name: "Ultrawide", ratio: "32:9", width: 3440, height: 1080 },
];

export function RatiosTool() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Aspect Ratios</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Standard aspect ratios for screens and photography.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ratios.map((ratio) => (
          <div key={ratio.name} className="group relative flex flex-col items-center rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-center transition-colors hover:border-indigo-500/30 hover:bg-white/[0.04]">

            <div className="flex h-32 w-full items-center justify-center mb-4">
              <div
                className="rounded border-2 border-indigo-400/50 bg-indigo-500/10 flex items-center justify-center transition-transform group-hover:scale-105"
                style={{
                  aspectRatio: ratio.ratio.replace(':', '/'),
                  width: ratio.width > ratio.height ? '100%' : 'auto',
                  height: ratio.height >= ratio.width ? '100%' : 'auto',
                  maxHeight: '100%',
                  maxWidth: '100%'
                }}
              >
                <span className="text-sm font-bold text-indigo-300">{ratio.ratio}</span>
              </div>
            </div>

            <h3 className="text-base font-medium text-white mb-1">{ratio.name}</h3>
            <p className="text-xs text-zinc-500 mb-6">{ratio.width} × {ratio.height} px</p>

            <div className="mt-auto w-full">
              <button
                className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                onClick={() => alert("Canvas integration coming soon!")}
              >
                <Icon name="corner" className="h-3.5 w-3.5" />
                Open Canvas
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
