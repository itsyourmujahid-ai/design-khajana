"use client";

import { Icon } from "@/components/ui/icon";

export function ColorModeTool() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">RGB vs CMYK</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Understand the vital difference between screen and print colour modes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
              <Icon name="eye" className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">RGB</h3>
              <p className="text-xs font-medium text-zinc-500">Red, Green, Blue</p>
            </div>
          </div>

          <p className="mb-6 text-sm leading-relaxed text-zinc-300">
            Used for <strong className="text-white">Digital Screens</strong> (web, social media, video).
            RGB is an additive colour model. It starts black and adds light to create colours.
            Because screens emit light, RGB has a much wider gamut, allowing for bright, vibrant, and neon colours.
          </p>

          <div className="flex justify-center gap-4 py-8">
            <div className="h-16 w-16 rounded-full bg-[#FF0000] mix-blend-screen -mr-8 border-2 border-black"></div>
            <div className="h-16 w-16 rounded-full bg-[#00FF00] mix-blend-screen -mr-8 border-2 border-black mt-8"></div>
            <div className="h-16 w-16 rounded-full bg-[#0000FF] mix-blend-screen border-2 border-black"></div>
          </div>

          <div className="mt-6 rounded-lg bg-white/5 p-4">
            <h4 className="mb-2 text-xs font-semibold text-zinc-400">Best for:</h4>
            <ul className="flex flex-wrap gap-2 text-xs text-zinc-300">
              <li className="rounded-md bg-white/10 px-2 py-1">Websites</li>
              <li className="rounded-md bg-white/10 px-2 py-1">Social Media</li>
              <li className="rounded-md bg-white/10 px-2 py-1">Apps</li>
              <li className="rounded-md bg-white/10 px-2 py-1">Video</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
              <Icon name="printer" className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">CMYK</h3>
              <p className="text-xs font-medium text-teal-500/70">Cyan, Magenta, Yellow, Key (Black)</p>
            </div>
          </div>

          <p className="mb-6 text-sm leading-relaxed text-zinc-300">
            Used for <strong className="text-white">Physical Print</strong>.
            CMYK is a subtractive colour model. It starts with white paper and uses ink to subtract light.
            Because paper doesn&apos;t emit light, CMYK cannot reproduce the extremely bright or neon colours seen in RGB.
          </p>

          <div className="flex justify-center gap-4 py-8">
            <div className="h-16 w-16 rounded-full bg-[#00FFFF] mix-blend-multiply -mr-8 border-2 border-transparent"></div>
            <div className="h-16 w-16 rounded-full bg-[#FF00FF] mix-blend-multiply -mr-8 border-2 border-transparent mt-8"></div>
            <div className="h-16 w-16 rounded-full bg-[#FFFF00] mix-blend-multiply border-2 border-transparent"></div>
          </div>

          <div className="mt-6 rounded-lg bg-teal-500/10 p-4">
            <h4 className="mb-2 text-xs font-semibold text-teal-400/80">Best for:</h4>
            <ul className="flex flex-wrap gap-2 text-xs text-teal-100">
              <li className="rounded-md bg-teal-500/20 px-2 py-1">Business Cards</li>
              <li className="rounded-md bg-teal-500/20 px-2 py-1">Posters</li>
              <li className="rounded-md bg-teal-500/20 px-2 py-1">Brochures</li>
              <li className="rounded-md bg-teal-500/20 px-2 py-1">Packaging</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
        <div className="flex items-start gap-4">
          <Icon name="help" className="mt-0.5 h-5 w-5 text-orange-400 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-white">Rule of Thumb</h4>
            <p className="mt-1 text-sm text-zinc-300 leading-relaxed">
              Always design in CMYK if the final product will be printed. If you design in RGB and convert to CMYK later, bright colours will look dull and washed out when printed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
