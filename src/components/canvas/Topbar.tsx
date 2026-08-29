/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@/components/ui/icon";
import Link from "next/link";

export function Topbar({ store }: { store: any   }) {
  const { state, undo, redo, canUndo, canRedo } = store;

  const handleExport = () => {
    try {
      const stage = document.querySelector('canvas');
      if (stage) {
        const link = document.createElement('a');
        link.download = 'design-khajana-export.png';
        link.href = stage.toDataURL();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (e) {
      console.error(e);
      alert("Export feature coming soon! Will export the precise " + state.canvasWidth + "x" + state.canvasHeight + " artboard.");
    }
  };

  return (
    <header className="h-14 border-b border-white/10 bg-[#0f111a] flex items-center justify-between px-4 shrink-0 z-10 relative">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
          <Icon name="home" className="h-4 w-4" />
        </Link>
        <div className="h-4 w-px bg-white/10" />
        <span className="text-sm font-semibold text-white tracking-wide">Untitled Project</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={undo} disabled={!canUndo}
          className="p-1.5 rounded text-zinc-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <Icon name="corner" className="h-4 w-4 -scale-x-100" />
        </button>
        <button
          onClick={redo} disabled={!canRedo}
          className="p-1.5 rounded text-zinc-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <Icon name="corner" className="h-4 w-4" />
        </button>
        <div className="h-4 w-px bg-white/10 mx-2" />
        <button
          onClick={() => store.toggleGuides()}
          className={`p-1.5 rounded text-xs font-medium ${state.showGuides ? 'bg-indigo-500/20 text-indigo-400' : 'text-zinc-400 hover:bg-white/10 hover:text-white'}`}
          title="Toggle Guides"
        >
          Guides
        </button>
        <button
          onClick={() => store.toggleLockGuides()}
          className={`p-1.5 rounded text-xs font-medium ${state.lockGuides ? 'bg-indigo-500/20 text-indigo-400' : 'text-zinc-400 hover:bg-white/10 hover:text-white'}`}
          title="Lock Guides"
        >
          Lock
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-zinc-500 font-medium font-mono">{Math.round(state.zoom * 100)}%</span>
        <button onClick={() => store.setViewport(1, 0, 0)} className="text-xs font-medium text-indigo-400 hover:text-indigo-300">
          Fit Screen
        </button>
        <div className="h-4 w-px bg-white/10 mx-1" />
        <button onClick={handleExport} className="text-xs font-bold bg-indigo-500 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-400">
          Export
        </button>
      </div>
    </header>
  );
}
