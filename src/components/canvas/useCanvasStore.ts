import { useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { CanvasElement, CanvasState, ToolType } from "./types";

export function useCanvasStore() {
  const [state, setState] = useState<CanvasState>({
    elements: [],
    selectedIds: [],
    guides: [],
    canvasWidth: 1080,
    canvasHeight: 1080,
    canvasBg: "#ffffff",
    showGuides: true,
    lockGuides: false,
    zoom: 1,
    panX: 0,
    panY: 0,
    activeTool: "select",
  });

  const [history, setHistory] = useState<CanvasState[]>([state]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const forceLoadState = (newState: CanvasState) => {
    setState(newState);
    setHistory([newState]);
    setHistoryIndex(0);
  };

  // Internal ref to debounce/throttle history updates if needed
  const skipHistoryRef = useRef(false);

  const saveHistory = (newState: CanvasState) => {
    if (skipHistoryRef.current) return;

    // Create new history branch
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);

    // Limit history size to 50
    if (newHistory.length > 50) newHistory.shift();

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const updateState = (updater: (prev: CanvasState) => CanvasState, recordHistory = true) => {
    setState((prev) => {
      const next = updater(prev);
      if (recordHistory) {
        // small timeout to batch rapid updates (like dragging) if we want, but straightforward for now
        saveHistory(next);
      }
      return next;
    });
  };

  // Commands
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((i) => i - 1);
      setState(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((i) => i + 1);
      setState(history[historyIndex + 1]);
    }
  };

  const setTool = (tool: ToolType) => {
    updateState((s) => ({ ...s, activeTool: tool }), false); // don't log tool changes in history
  };

  const addElement = (element: Omit<CanvasElement, "id">) => {
    const newEl: CanvasElement = { ...element, id: uuidv4() };
    updateState((s) => ({
      ...s,
      elements: [...s.elements, newEl],
      selectedIds: [newEl.id],
    }));
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>, recordHistory = true) => {
    updateState((s) => ({
      ...s,
      elements: s.elements.map((el) => (el.id === id ? { ...el, ...updates } : el)),
    }), recordHistory);
  };

  const updateElements = (updatesList: {id: string, updates: Partial<CanvasElement>}[], recordHistory = true) => {
    updateState((s) => {
      const elMap = new Map(s.elements.map(el => [el.id, el]));
      updatesList.forEach(({id, updates}) => {
        const el = elMap.get(id);
        if (el) elMap.set(id, { ...el, ...updates });
      });
      return { ...s, elements: Array.from(elMap.values()) };
    }, recordHistory);
  };

  const addGuide = (orientation: 'horizontal' | 'vertical', position: number) => {
    updateState((s) => ({
      ...s,
      guides: [...(s.guides || []), { id: uuidv4(), orientation, position }]
    }));
  };

  const updateGuide = (id: string, position: number) => {
    updateState((s) => ({
      ...s,
      guides: (s.guides || []).map(g => g.id === id ? { ...g, position } : g)
    }), false); // updating guides while dragging shouldn't spam history
  };

  const removeGuide = (id: string) => {
    updateState((s) => ({
      ...s,
      guides: (s.guides || []).filter(g => g.id !== id)
    }));
  };

  const deleteSelected = () => {
    updateState((s) => ({
      ...s,
      elements: s.elements.filter((el) => !s.selectedIds.includes(el.id)),
      selectedIds: [],
    }));
  };

  const setSelected = (ids: string[]) => {
    updateState((s) => ({ ...s, selectedIds: ids }), false);
  };

  const setViewport = (zoom: number, panX: number, panY: number) => {
    updateState((s) => ({ ...s, zoom, panX, panY }), false);
  };

  const setCanvasSize = (width: number, height: number) => {
    updateState((s) => ({ ...s, canvasWidth: width, canvasHeight: height }));
  };

  const setCanvasBg = (bg: string) => {
    updateState((s) => ({ ...s, canvasBg: bg }));
  };

  const toggleGuides = () => {
    updateState((s) => ({ ...s, showGuides: !s.showGuides }), false);
  };

  const toggleLockGuides = () => {
    updateState((s) => ({ ...s, lockGuides: !s.lockGuides }), false);
  };

  const reorderElement = (id: string, dir: "up" | "down" | "top" | "bottom") => {
    updateState((s) => {
      const idx = s.elements.findIndex(e => e.id === id);
      if (idx === -1) return s;

      const newEls = [...s.elements];
      const [el] = newEls.splice(idx, 1);

      if (dir === "up") newEls.splice(Math.min(newEls.length, idx + 1), 0, el);
      if (dir === "down") newEls.splice(Math.max(0, idx - 1), 0, el);
      if (dir === "top") newEls.push(el);
      if (dir === "bottom") newEls.unshift(el);

      return { ...s, elements: newEls };
    });
  };

  return {
    state,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    setTool,
    addElement,
    updateElement,
    updateElements,
    deleteSelected,
    setSelected,
    setViewport,
    setCanvasSize,
    setCanvasBg,
    reorderElement,
    addGuide,
    updateGuide,
    removeGuide,
    toggleGuides,
    toggleLockGuides,
    // Hack to enable dragging without flooding history
    startTransientUpdate: () => { skipHistoryRef.current = true; },
    commitTransientUpdate: () => {
      skipHistoryRef.current = false;
      saveHistory(state);
    },
    forceLoadState
  };
}
