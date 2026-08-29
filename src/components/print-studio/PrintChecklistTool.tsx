"use client";

import { Icon } from "@/components/ui/icon";

export function PrintChecklistTool() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Print Checklist</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Run through this final check before sending your files to the press.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
          <h3 className="mb-6 text-lg font-bold text-white flex items-center gap-2">
            <Icon name="check" className="h-5 w-5 text-emerald-400" />
            The Ultimate Print Checklist
          </h3>

          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                1
              </div>
              <div>
                <p className="text-sm font-medium text-white">Resolution is 300 DPI</p>
                <p className="text-xs text-zinc-400 leading-relaxed mt-1">Images must be high-res. 72 DPI will print blurry and pixelated.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                2
              </div>
              <div>
                <p className="text-sm font-medium text-white">Colour Mode is CMYK</p>
                <p className="text-xs text-zinc-400 leading-relaxed mt-1">Convert RGB to CMYK to ensure colours look as expected.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                3
              </div>
              <div>
                <p className="text-sm font-medium text-white">Bleed is Added</p>
                <p className="text-xs text-zinc-400 leading-relaxed mt-1">Include a 3mm (or 0.125&quot;) bleed around all edges if your design touches the page edge.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                4
              </div>
              <div>
                <p className="text-sm font-medium text-white">Safe Zone is Respected</p>
                <p className="text-xs text-zinc-400 leading-relaxed mt-1">Keep critical text 5mm away from the trim line.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                5
              </div>
              <div>
                <p className="text-sm font-medium text-white">Fonts are Outlined</p>
                <p className="text-xs text-zinc-400 leading-relaxed mt-1">Convert text to paths/outlines so the printer doesn&apos;t need your exact font files.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 sm:p-8">
          <h3 className="mb-6 text-lg font-bold text-white flex items-center gap-2">
            <Icon name="gauge" className="h-5 w-5 text-blue-400" />
            Resolution Guide
          </h3>

          <div className="space-y-6">
            <div className="border-l-2 border-green-500 pl-4">
              <h4 className="text-sm font-bold text-white">300 DPI</h4>
              <p className="text-xs font-medium text-green-400 uppercase tracking-wider mb-1 mt-1">Gold Standard Print</p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The standard for anything held in the hand. Magazines, flyers, business cards, photos.
              </p>
            </div>

            <div className="border-l-2 border-yellow-500 pl-4">
              <h4 className="text-sm font-bold text-white">150 DPI</h4>
              <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-1 mt-1">Large Format / Posters</p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Good for posters viewed from a few feet away. The human eye cannot detect individual pixels at a distance.
              </p>
            </div>

            <div className="border-l-2 border-red-500 pl-4">
              <h4 className="text-sm font-bold text-white">72 DPI</h4>
              <p className="text-xs font-medium text-red-400 uppercase tracking-wider mb-1 mt-1">Digital Screen Only</p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Perfect for websites and social media. <strong>Never</strong> use 72 DPI for print unless it&apos;s a massive billboard viewed from across a street.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
