"use client";

import { useState } from "react";
export function TypographyEditorTool() {
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [weight, setWeight] = useState(400);

  // Recommendations
  const isLineHeightGood = lineHeight >= 1.4 && lineHeight <= 1.6;
  const isHeadingLineHeightGood = lineHeight >= 1.1 && lineHeight <= 1.3;
  const isTrackingGood = letterSpacing >= -0.02 && letterSpacing <= 0.05;

  return (
    <div className="flex flex-col md:flex-row gap-8">
       <div className="w-full md:w-72 shrink-0 space-y-6">
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">Font Size</label>
                <span className="text-xs font-mono text-zinc-500">{fontSize}px</span>
             </div>
             <input
               type="range"
               min="12"
               max="72"
               step="1"
               value={fontSize}
               onChange={e => setFontSize(Number(e.target.value))}
               className="w-full accent-emerald-500"
             />
          </div>

          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">Weight</label>
                <span className="text-xs font-mono text-zinc-500">{weight}</span>
             </div>
             <input
               type="range"
               min="100"
               max="900"
               step="100"
               value={weight}
               onChange={e => setWeight(Number(e.target.value))}
               className="w-full accent-emerald-500"
             />
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">Line Height</label>
                <span className="text-xs font-mono text-zinc-500">{lineHeight.toFixed(2)}</span>
             </div>
             <input
               type="range"
               min="0.8"
               max="2.5"
               step="0.05"
               value={lineHeight}
               onChange={e => setLineHeight(Number(e.target.value))}
               className="w-full accent-emerald-500"
             />
             <div className="flex flex-col gap-1 mt-2">
                {fontSize > 24 ? (
                   <p className="text-[10px] text-zinc-500">
                     <span className={isHeadingLineHeightGood ? "text-emerald-400 font-medium" : "text-amber-400"}>
                        {isHeadingLineHeightGood ? "Good for headings." : "Headings usually look best between 1.1 and 1.3."}
                     </span>
                   </p>
                ) : (
                   <p className="text-[10px] text-zinc-500">
                     <span className={isLineHeightGood ? "text-emerald-400 font-medium" : "text-amber-400"}>
                        {isLineHeightGood ? "Perfect for body text readability." : "Body text is most readable between 1.4 and 1.6."}
                     </span>
                   </p>
                )}
             </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">Letter Spacing (em)</label>
                <span className="text-xs font-mono text-zinc-500">{letterSpacing.toFixed(3)}</span>
             </div>
             <input
               type="range"
               min="-0.1"
               max="0.25"
               step="0.005"
               value={letterSpacing}
               onChange={e => setLetterSpacing(Number(e.target.value))}
               className="w-full accent-emerald-500"
             />
             <p className="text-[10px] text-zinc-500 mt-2">
                <span className={isTrackingGood ? "text-emerald-400 font-medium" : "text-amber-400"}>
                   {isTrackingGood ? "Looks good." : "Extreme letter spacing hurts legibility."}
                </span>
                {" "}Use tighter spacing (-0.01 to -0.04) for large headings, and looser spacing for uppercase subheads.
             </p>
          </div>
       </div>

       <div className="flex-1 bg-white rounded-2xl p-8 border border-white/10 text-zinc-900 overflow-hidden relative">
          <div className="absolute top-4 right-4 bg-black/5 rounded-full px-3 py-1 text-xs font-semibold text-zinc-500">
             Live Preview
          </div>

          <div
             className="w-full h-full custom-scrollbar overflow-y-auto pr-4"
             style={{
                fontSize: `${fontSize}px`,
                lineHeight: lineHeight,
                letterSpacing: `${letterSpacing}em`,
                fontWeight: weight
             }}
          >
             <p className="mb-4">
                Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.
                The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing, and adjusting the space between pairs of letters.
             </p>
             <p>
                The term typography is also applied to the style, arrangement, and appearance of the letters, numbers, and symbols created by the process.
                Good typography makes reading effortless, while poor typography drains the reader&apos;s energy.
             </p>
          </div>
       </div>
    </div>
  );
}