/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon, IconName } from "@/components/ui/icon";
import { ToolType } from "./types";
import { cn } from "@/lib/utils";

export function SidebarLeft({ store }: { store: any   }) {
  const { state, setTool, addElement } = store;

  const tools: { id: ToolType; icon: IconName; label: string }[] = [
    { id: "select", icon: "cursor", label: "Select (V)" },
    { id: "hand", icon: "help", label: "Pan (H)" },
    { id: "pencil", icon: "pen", label: "Pencil (P)" },
    { id: "rectangle", icon: "rectangle", label: "Rectangle (R)" },
    { id: "ellipse", icon: "circle" as any, label: "Ellipse (E)" },
    { id: "text", icon: "type", label: "Text (T)" },
    { id: "image", icon: "image", label: "Image (I)" },
  ];

  const handleToolClick = (tool: ToolType) => {
    setTool(tool);

    if (tool === "rectangle") {
      addElement({ type: "rectangle", name: "Rectangle", x: 100, y: 100, width: 200, height: 150, fill: "#3b82f6", rotation: 0, scaleX: 1, scaleY: 1, opacity: 1, isLocked: false, isHidden: false });
      setTool("select");
    } else if (tool === "ellipse") {
      addElement({ type: "ellipse", name: "Ellipse", x: 200, y: 200, width: 150, height: 150, fill: "#ef4444", rotation: 0, scaleX: 1, scaleY: 1, opacity: 1, isLocked: false, isHidden: false });
      setTool("select");
    } else if (tool === "text") {
      addElement({ type: "text", name: "Text", text: "Double click to edit", x: 100, y: 300, fill: "#000000", fontSize: 48, fontFamily: "Arial", rotation: 0, scaleX: 1, scaleY: 1, opacity: 1, isLocked: false, isHidden: false });
      setTool("select");
    } else if (tool === "image") {
      alert("Image upload placeholder. Will integrate with HTML5 file input.");
      setTool("select");
    }
  };

  return (
    <aside className="w-14 shrink-0 bg-[#0f111a] border-r border-white/10 flex flex-col items-center py-4 gap-2 z-10">
      {tools.map((t) => {
        // Just cast to any since "circle" is not in the IconName union currently
        const iconName = (t.icon as any) === "circle" ? "scan" : t.icon;

        return (
          <button
            key={t.id}
            onClick={() => handleToolClick(t.id)}
            title={t.label}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
              state.activeTool === t.id ? "bg-indigo-500/20 text-indigo-400" : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            <Icon name={iconName} className="w-5 h-5" />
          </button>
        )
      })}
    </aside>
  );
}
