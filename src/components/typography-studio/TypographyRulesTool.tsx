"use client";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const rules = [
  {
    title: "Limit Line Length",
    description: "Keep lines between 45 and 75 characters long. Lines that are too long make it hard for the eye to track back to the start of the next line.",
    do: "This is a good line length. It is easy to read and your eyes don't get tired. It feels natural and comfortable.",
    dont: "This line is far too long and it makes it very difficult for the reader to keep their place when they try to move their eyes back to the beginning of the next line, causing fatigue and loss of focus.",
    doClass: "max-w-[65ch]",
    dontClass: "max-w-full"
  },
  {
    title: "Establish Hierarchy",
    description: "Use size, weight, and color to show which text is most important. Don't rely on size alone.",
    doNode: (
       <div className="space-y-1">
          <h4 className="text-xl font-bold text-white">Main Heading</h4>
          <p className="text-sm text-zinc-400">Supporting body text that provides context.</p>
       </div>
    ),
    dontNode: (
       <div className="space-y-1">
          <h4 className="text-lg font-normal text-zinc-300">Main Heading</h4>
          <p className="text-lg font-normal text-zinc-300">Supporting body text that provides context.</p>
       </div>
    ),
  },
  {
    title: "Sufficient Contrast",
    description: "Ensure text stands out from its background. Low contrast causes accessibility issues.",
    doNode: (
       <div className="p-4 bg-zinc-900 rounded-lg border border-white/10">
          <p className="text-white font-medium">High contrast text is easy to read.</p>
       </div>
    ),
    dontNode: (
       <div className="p-4 bg-zinc-900 rounded-lg border border-white/10">
          <p className="text-zinc-600 font-medium">Low contrast text causes eye strain.</p>
       </div>
    ),
  },
  {
    title: "Avoid Center Alignment for Long Blocks",
    description: "Left-aligned text is easier to read because the eye knows exactly where the next line starts.",
    doNode: (
       <div className="text-left space-y-2">
          <p className="text-sm text-zinc-300">Left-aligned text provides a consistent starting point for the eye.</p>
          <p className="text-sm text-zinc-300">This makes reading long paragraphs much more comfortable.</p>
       </div>
    ),
    dontNode: (
       <div className="text-center space-y-2">
          <p className="text-sm text-zinc-300">Centered text forces the eye to find the starting point of each line.</p>
          <p className="text-sm text-zinc-300">This jagged edge makes reading slower.</p>
       </div>
    ),
  }
];

export function TypographyRulesTool() {
  return (
    <div className="space-y-12">
      {rules.map((rule, idx) => (
         <div key={idx} className="space-y-4">
            <div>
               <h3 className="text-lg font-bold text-white">{rule.title}</h3>
               <p className="text-sm text-zinc-400 mt-1">{rule.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* DO */}
               <div className="bg-black/20 rounded-xl p-6 border border-emerald-500/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50" />
                  <div className="flex items-center gap-2 mb-4">
                     <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Icon name="check" className="w-3 h-3 text-emerald-400" />
                     </div>
                     <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Do</span>
                  </div>
                  {rule.doNode ? rule.doNode : (
                     <p className={cn("text-sm text-zinc-300", rule.doClass)}>{rule.do}</p>
                  )}
               </div>

               {/* DON'T */}
               <div className="bg-black/20 rounded-xl p-6 border border-rose-500/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-rose-500/50" />
                  <div className="flex items-center gap-2 mb-4">
                     <div className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center">
                        <Icon name="close" className="w-3 h-3 text-rose-400" />
                     </div>
                     <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Don&apos;t</span>
                  </div>
                  {rule.dontNode ? rule.dontNode : (
                     <p className={cn("text-sm text-zinc-300", rule.dontClass)}>{rule.dont}</p>
                  )}
               </div>
            </div>
         </div>
      ))}
    </div>
  );
}