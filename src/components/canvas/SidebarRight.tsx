/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function SidebarRight({ store }: { store: any  , stageRef: any   }) {
  const { state, setSelected, reorderElement, deleteSelected } = store;

  const selectedEls = state.elements.filter((e: any  ) => state.selectedIds.includes(e.id));
  const el = selectedEls.length === 1 ? selectedEls[0] : null;

  return (
    <aside className="w-64 shrink-0 bg-[#0f111a] border-l border-white/10 flex flex-col z-10">

      {/* Layers Panel */}
      <div className="flex-1 flex flex-col min-h-[50%] border-b border-white/10">
        <div className="p-3 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Layers</span>
          <button onClick={deleteSelected} disabled={!el} className="text-zinc-500 hover:text-red-400 disabled:opacity-30">
            <Icon name="close" className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {[...state.elements].reverse().map((layer: any  ) => {
            const isSelected = state.selectedIds.includes(layer.id);
            return (
              <div
                key={layer.id}
                onClick={() => setSelected([layer.id])}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer border",
                  isSelected ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-100" : "bg-transparent border-transparent text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  <Icon name={layer.type === 'text' ? 'type' : layer.type === 'image' ? 'image' : layer.type === 'line' ? 'pen' : 'rectangle'} className="w-3.5 h-3.5 opacity-50 shrink-0" />
                  <span className="truncate">{layer.name}</span>
                </div>

                {isSelected && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={(e) => { e.stopPropagation(); reorderElement(layer.id, "up"); }} className="hover:text-white p-0.5"><Icon name="arrowRight" className="w-3 h-3 -rotate-90" /></button>
                    <button onClick={(e) => { e.stopPropagation(); reorderElement(layer.id, "down"); }} className="hover:text-white p-0.5"><Icon name="arrowRight" className="w-3 h-3 rotate-90" /></button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Properties Panel */}
      <div className="flex-1 overflow-y-auto bg-[#141621]">
        <div className="p-3 border-b border-white/10">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Properties</span>
        </div>

        {el ? (
          <div className="p-4 space-y-4">

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] uppercase text-zinc-500 mb-1 block">X</label>
                <input type="number" value={Math.round(el.x)} readOnly className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-sm text-zinc-300" />
              </div>
              <div>
                <label className="text-[10px] uppercase text-zinc-500 mb-1 block">Y</label>
                <input type="number" value={Math.round(el.y)} readOnly className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-sm text-zinc-300" />
              </div>
              <div>
                <label className="text-[10px] uppercase text-zinc-500 mb-1 block">W</label>
                <input type="number" value={Math.round(el.width || 0)} readOnly className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-sm text-zinc-300" />
              </div>
              <div>
                <label className="text-[10px] uppercase text-zinc-500 mb-1 block">H</label>
                <input type="number" value={Math.round(el.height || 0)} readOnly className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-sm text-zinc-300" />
              </div>
            </div>

            {el.type !== 'line' && el.type !== 'image' && (
              <div>
                <label className="text-[10px] uppercase text-zinc-500 mb-1 block">Fill</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={el.fill || "#000000"} onChange={(e) => store.updateElement(el.id, { fill: e.target.value })} className="w-8 h-8 rounded border-none bg-transparent cursor-pointer" />
                  <input type="text" value={el.fill || "#000000"} onChange={(e) => store.updateElement(el.id, { fill: e.target.value })} className="flex-1 bg-black/40 border border-white/10 rounded px-2 py-1 text-sm text-zinc-300 uppercase font-mono" />
                </div>
              </div>
            )}

            {el.type === 'text' && (
              <div>
                <label className="text-[10px] uppercase text-zinc-500 mb-1 block">Text</label>
                <textarea
                  value={el.text}
                  onChange={(e) => store.updateElement(el.id, { text: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-sm text-zinc-300 resize-y min-h-[60px]"
                />
              </div>
            )}

            <div>
              <label className="text-[10px] uppercase text-zinc-500 mb-1 block">Opacity</label>
              <input type="range" min="0" max="1" step="0.1" value={el.opacity} onChange={(e) => store.updateElement(el.id, { opacity: Number(e.target.value) })} className="w-full" />
            </div>

          </div>
        ) : (
          <div className="p-8 text-center text-sm text-zinc-500">
            Select an object to edit its properties.
          </div>
        )}
      </div>

    </aside>
  );
}
