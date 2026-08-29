import { useEffect, useState } from 'react';
import { CanvasState } from './types';

const STORAGE_KEY = 'dk_canvas_save';

export function useCanvasPersist(state: CanvasState, setLoadedState: (s: CanvasState) => void) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initial load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.elements) {
          setLoadedState(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load canvas state", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      // Don't save transient view state (pan/zoom) to prevent excessive writes
      const toSave = { ...state, panX: 0, panY: 0, zoom: 1 };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.error("Failed to save canvas state", e);
    }
  }, [state, isLoaded]);

  return isLoaded;
}
