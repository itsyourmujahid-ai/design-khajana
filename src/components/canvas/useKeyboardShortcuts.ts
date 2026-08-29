import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useKeyboardShortcuts(store: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if typing in an input/textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      // Delete/Backspace
      if (e.key === 'Backspace' || e.key === 'Delete') {
        if (store.state.selectedIds.length > 0) {
          store.deleteSelected();
        }
      }

      // Undo/Redo
      if (e.metaKey || e.ctrlKey) {
        if (e.key === 'z') {
          e.preventDefault();
          if (e.shiftKey) {
            store.redo();
          } else {
            store.undo();
          }
        }

        // Copy / Duplicate
        if (e.key === 'c') {
          const selected = store.state.elements.filter((el: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => store.state.selectedIds.includes(el.id));
          if (selected.length > 0) {
            localStorage.setItem('dk_clipboard', JSON.stringify(selected));
          }
        }

        // Cut
        if (e.key === 'x') {
          const selected = store.state.elements.filter((el: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => store.state.selectedIds.includes(el.id));
          if (selected.length > 0) {
            localStorage.setItem('dk_clipboard', JSON.stringify(selected));
            store.deleteSelected();
          }
        }

        // Paste
        if (e.key === 'v') {
          try {
            const clipStr = localStorage.getItem('dk_clipboard');
            if (clipStr) {
              const clipboard = JSON.parse(clipStr);
              const newIds: string[] = [];
              // Duplicate and offset them slightly
              clipboard.forEach((el: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => {
                const newEl = { ...el, id: uuidv4(), x: el.x + 20, y: el.y + 20 };
                store.addElement(newEl);
                newIds.push(newEl.id);
              });
              store.setSelected(newIds);
            }
          } catch (e) {
            console.error(e);
          }
        }

        // Duplicate (Cmd+D)
        if (e.key === 'd') {
          e.preventDefault();
          const selected = store.state.elements.filter((el: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => store.state.selectedIds.includes(el.id));
          if (selected.length > 0) {
            const newIds: string[] = [];
            selected.forEach((el: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => {
              const newEl = { ...el, id: uuidv4(), x: el.x + 20, y: el.y + 20 };
              store.addElement(newEl);
              newIds.push(newEl.id);
            });
            store.setSelected(newIds);
          }
        }

        // Select All (Cmd+A)
        if (e.key === 'a') {
          e.preventDefault();
          store.setSelected(store.state.elements.filter((el: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => !el.isLocked && !el.isHidden).map((el: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => el.id));
        }
      }

      // Tool shortcuts
      if (!e.metaKey && !e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'v': store.setTool('select'); break;
          case 'h': store.setTool('hand'); break;
          case 'p': store.setTool('pencil'); break;
          case 'r': store.setTool('rectangle'); break;
          case 'e': store.setTool('ellipse'); break;
          case 't': store.setTool('text'); break;
          case 'i': store.setTool('image'); break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [store]);
}
