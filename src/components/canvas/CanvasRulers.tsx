import React, { useEffect, useRef } from 'react';

export function CanvasRulers({ store, stageRef }: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
  const horizontalRef = useRef<HTMLCanvasElement>(null);
  const verticalRef = useRef<HTMLCanvasElement>(null);
  const isDraggingGuide = useRef(false);

  const createHorizontalGuide = (e: React.PointerEvent) => {
    isDraggingGuide.current = true;
    const stage = stageRef.current;
    if (!stage) return;

    // Ruler is at the top (y=0 in screen space). We just use the mouse Y to get logical Y.
    // However, pointer down on ruler gives us client coordinates.
    // We can translate client coordinate to stage logical coordinate using the stage's absolute transform.
    // To do this properly, we should use the stage's offset.
    const transform = stage.getAbsoluteTransform().copy().invert();

    // We can get the canvas bounding rect to find the click pos relative to the stage container
    const containerRect = stage.container().getBoundingClientRect();
    const localY = e.clientY - containerRect.top;

    const logicalPos = transform.point({ x: 0, y: localY });
    store.addGuide('horizontal', logicalPos.y);
  };

  const createVerticalGuide = (e: React.PointerEvent) => {
    isDraggingGuide.current = true;
    const stage = stageRef.current;
    if (!stage) return;

    const transform = stage.getAbsoluteTransform().copy().invert();
    const containerRect = stage.container().getBoundingClientRect();
    const localX = e.clientX - containerRect.left;

    const logicalPos = transform.point({ x: localX, y: 0 });
    store.addGuide('vertical', logicalPos.x);
  };

  useEffect(() => {
    const drawRuler = (
      canvas: HTMLCanvasElement | null,
      orientation: 'horizontal' | 'vertical',
      scale: number,
      offset: number,
      length: number
    ) => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const size = 20; // ruler width/height
      const dpr = window.devicePixelRatio || 1;

      // Setup canvas for crisp rendering
      if (orientation === 'horizontal') {
        canvas.width = length * dpr;
        canvas.height = size * dpr;
        canvas.style.width = `${length}px`;
        canvas.style.height = `${size}px`;
      } else {
        canvas.width = size * dpr;
        canvas.height = length * dpr;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${length}px`;
      }

      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, length, size);

      // Background
      ctx.fillStyle = '#f4f4f5';
      if (orientation === 'horizontal') {
        ctx.fillRect(0, 0, length, size);
      } else {
        ctx.fillRect(0, 0, size, length);
      }

      ctx.fillStyle = '#71717a';
      ctx.strokeStyle = '#a1a1aa';
      ctx.lineWidth = 1;
      ctx.font = '9px Arial';

      // Drawing logic
      const step = 50 * scale; // every 50px logical
      const startLog = Math.floor(-offset / scale / 50) * 50;
      const endLog = startLog + Math.ceil(length / scale) + 100;

      for (let i = startLog; i <= endLog; i += 10) {
        const isMajor = i % 100 === 0;
        const isHalf = i % 50 === 0;
        const pos = i * scale + offset;

        if (pos < 0 || pos > length) continue;

        const tickLength = isMajor ? size : isHalf ? size * 0.5 : size * 0.25;

        ctx.beginPath();
        if (orientation === 'horizontal') {
          ctx.moveTo(pos, size - tickLength);
          ctx.lineTo(pos, size);
          if (isMajor) {
            ctx.fillText(i.toString(), pos + 2, 9);
          }
        } else {
          ctx.moveTo(size - tickLength, pos);
          ctx.lineTo(size, pos);
          if (isMajor) {
            ctx.save();
            ctx.translate(9, pos + 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(i.toString(), 0, 0);
            ctx.restore();
          }
        }
        ctx.stroke();
      }

      // Add border line
      ctx.beginPath();
      if (orientation === 'horizontal') {
        ctx.moveTo(0, size);
        ctx.lineTo(length, size);
      } else {
        ctx.moveTo(size, 0);
        ctx.lineTo(size, length);
      }
      ctx.stroke();
    };

    const updateRulers = () => {
      const container = stageRef.current?.container();
      if (!container) return;

      const width = container.offsetWidth;
      const height = container.offsetHeight;

      drawRuler(horizontalRef.current, 'horizontal', store.state.zoom, store.state.panX, width);
      drawRuler(verticalRef.current, 'vertical', store.state.zoom, store.state.panY, height);
    };

    // Initial draw and setup resize listener
    updateRulers();
    window.addEventListener('resize', updateRulers);

    return () => {
      window.removeEventListener('resize', updateRulers);
    };
  }, [store.state.zoom, store.state.panX, store.state.panY, stageRef]);

  return (
    <>
      <canvas
        ref={horizontalRef}
        onPointerDown={createHorizontalGuide}
        style={{
          position: 'absolute',
          top: 0,
          left: 20, // offset by vertical ruler
          zIndex: 10,
          cursor: 'row-resize'
        }}
      />
      <canvas
        ref={verticalRef}
        onPointerDown={createVerticalGuide}
        style={{
          position: 'absolute',
          top: 20, // offset by horizontal ruler
          left: 0,
          zIndex: 10,
          cursor: 'col-resize'
        }}
      />
      {/* Corner block */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          backgroundColor: '#f4f4f5',
          borderRight: '1px solid #a1a1aa',
          borderBottom: '1px solid #a1a1aa',
          zIndex: 11
        }}
      />
    </>
  );
}
