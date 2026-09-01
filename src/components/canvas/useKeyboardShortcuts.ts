import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useKeyboardShortcuts(store: any /* eslint-disable-line @typescript-eslint/no-explicit-any */ /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
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

      // Keyboard Movement
      if (store.state.selectedIds.length > 0 && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        const updates = store.state.elements
          .filter((el: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => store.state.selectedIds.includes(el.id))
          .map((el: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => {
            let dx = 0;
            let dy = 0;
            if (e.key === 'ArrowUp') dy = -step;
            if (e.key === 'ArrowDown') dy = step;
            if (e.key === 'ArrowLeft') dx = -step;
            if (e.key === 'ArrowRight') dx = step;
            return { id: el.id, updates: { x: el.x + dx, y: el.y + dy } };
          });
        store.updateElements(updates);
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
          const selected = store.state.elements.filter((el: any /* eslint-disable-line @typescript-eslint/no-explicit-any */ /* eslint-disable-line @typescript-eslint/no-explicit-any */) => store.state.selectedIds.includes(el.id));
          if (selected.length > 0) {
            localStorage.setItem('dk_clipboard', JSON.stringify(selected));
          }
        }

        // Cut
        if (e.key === 'x') {
          const selected = store.state.elements.filter((el: any /* eslint-disable-line @typescript-eslint/no-explicit-any */ /* eslint-disable-line @typescript-eslint/no-explicit-any */) => store.state.selectedIds.includes(el.id));
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
              // Duplicate and offset them slightly
              const newElements = clipboard.map((el: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => {
                const newId = uuidv4();
                return { ...el, id: newId, x: el.x + 20, y: el.y + 20 };
              });

              store.addElements(newElements);
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
            const newElements = selected.map((el: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => {
              const newId = uuidv4();
              return { ...el, id: newId, x: el.x + 20, y: el.y + 20 };
            });

            store.addElements(newElements);
          }
        }

        // Select All (Cmd+A)
        if (e.key === 'a') {
          e.preventDefault();
          store.setSelected(store.state.elements.filter((el: any /* eslint-disable-line @typescript-eslint/no-explicit-any */ /* eslint-disable-line @typescript-eslint/no-explicit-any */) => !el.isLocked && !el.isHidden).map((el: any /* eslint-disable-line @typescript-eslint/no-explicit-any */ /* eslint-disable-line @typescript-eslint/no-explicit-any */) => el.id));
        }

        // Group (Cmd+G)
        if (e.key === 'g') {
          e.preventDefault();
          if (e.shiftKey) {
            store.ungroupSelected();
          } else {
            store.groupSelected();
          }
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
