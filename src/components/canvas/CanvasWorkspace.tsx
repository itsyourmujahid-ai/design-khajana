/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, Text, Line, Transformer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import { useCanvasStore } from "./useCanvasStore";
import { useCanvasPersist } from "./useLocalStorage";
import { Topbar } from "./Topbar";
import { SidebarLeft } from "./SidebarLeft";
import { SidebarRight } from "./SidebarRight";

function CanvasImage({ el, onSelect, onChange, isSelected }: any  ) {
  const [img] = useImage(el.src || "");
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        image={img}
        x={el.x}
        y={el.y}
        width={el.width}
        height={el.height}
        rotation={el.rotation}
        scaleX={el.scaleX}
        scaleY={el.scaleY}
        opacity={el.opacity}
        draggable={!el.isLocked && isSelected}
        onDragEnd={(e: any  ) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && !el.isLocked && (
        <Transformer ref={trRef} boundBoxFunc={(oldBox, newBox) => {
          if (newBox.width < 5 || newBox.height < 5) return oldBox;
          return newBox;
        }} />
      )}
    </>
  );
}

function EditableText({ el, onSelect, onChange, isSelected }: any  ) {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        text={el.text || "Double click to edit"}
        x={el.x}
        y={el.y}
        fill={el.fill || "#000"}
        fontSize={el.fontSize || 24}
        fontFamily={el.fontFamily || "Arial"}
        fontStyle={el.fontWeight || "normal"}
        align={el.textAlign || "left"}
        lineHeight={el.lineHeight || 1.2}
        rotation={el.rotation}
        scaleX={el.scaleX}
        scaleY={el.scaleY}
        opacity={el.opacity}
        draggable={!el.isLocked && isSelected}
        onDragEnd={(e: any  ) => onChange({ x: e.target.x(), y: e.target.y() })}
        onTransformEnd={() => {
          const node = shapeRef.current;
          onChange({
            x: node.x(),
            y: node.y(),
            scaleX: node.scaleX(),
            scaleY: node.scaleY(),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && !el.isLocked && (
        <Transformer
          ref={trRef}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          boundBoxFunc={(oldBox, newBox) => newBox}
        />
      )}
    </>
  );
}

function ShapeElement({ el, onSelect, onChange, isSelected }: any  ) {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const commonProps = {
    onClick: onSelect,
    onTap: onSelect,
    ref: shapeRef,
    x: el.x,
    y: el.y,
    width: el.width,
    height: el.height,
    fill: el.fill,
    stroke: el.stroke?.color,
    strokeWidth: el.stroke?.width,
    rotation: el.rotation,
    scaleX: el.scaleX,
    scaleY: el.scaleY,
    opacity: el.opacity,
    draggable: !el.isLocked && isSelected,
    onDragEnd: (e: any  ) => onChange({ x: e.target.x(), y: e.target.y() }),
    onTransformEnd: () => {
      const node = shapeRef.current;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      node.scaleX(1);
      node.scaleY(1);
      onChange({
        x: node.x(),
        y: node.y(),
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(5, node.height() * scaleY),
        rotation: node.rotation(),
      });
    }
  };

  return (
    <>
      {el.type === 'rectangle' && <Rect {...commonProps} />}
      {el.type === 'ellipse' && <Circle {...commonProps} radius={el.width! / 2} />}
      {el.type === 'line' && <Line {...commonProps} points={el.points || []} stroke={el.stroke?.color || "#000"} strokeWidth={el.stroke?.width || 2} />}

      {isSelected && !el.isLocked && (
        <Transformer ref={trRef} boundBoxFunc={(oldBox, newBox) => {
          if (newBox.width < 5 || newBox.height < 5) return oldBox;
          return newBox;
        }} />
      )}
    </>
  );
}

export function CanvasWorkspace() {
  const store = useCanvasStore();
  const stageRef = useRef<any>(null);
  const isLoaded = useCanvasPersist(store.state, store.forceLoadState);

  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState<number[]>([]);

  if (!isLoaded) return <div className="h-screen w-full flex items-center justify-center text-zinc-500">Loading workspace...</div>;

  const handleWheel = (e: any  ) => {
    e.evt.preventDefault();
    const scaleBy = 1.05;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();

    if (!e.evt.ctrlKey) {
      const dx = e.evt.deltaX;
      const dy = e.evt.deltaY;
      store.setViewport(store.state.zoom, store.state.panX - dx, store.state.panY - dy);
      return;
    }

    const pointer = stage.getPointerPosition();
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    store.setViewport(newScale, newPos.x, newPos.y);
  };

  const handleMouseDown = (e: any  ) => {
    const isStage = e.target === e.target.getStage() || e.target.hasName('bg-rect');

    if (isStage && store.state.activeTool === 'select') {
      store.setSelected([]);
      return;
    }

    if (store.state.activeTool === 'pencil') {
      setIsDrawing(true);
      const pos = e.target.getStage().getRelativePointerPosition();
      setCurrentLine([pos.x, pos.y]);
    }
  };

  const handleMouseMove = (e: any  ) => {
    if (!isDrawing) return;
    if (store.state.activeTool === 'pencil') {
      const stage = e.target.getStage();
      const point = stage.getRelativePointerPosition();
      setCurrentLine([...currentLine, point.x, point.y]);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && store.state.activeTool === 'pencil') {
      setIsDrawing(false);
      store.addElement({
        type: "line",
        name: "Drawing",
        x: 0, y: 0,
        rotation: 0, scaleX: 1, scaleY: 1,
        opacity: 1, isLocked: false, isHidden: false,
        points: currentLine,
        stroke: { color: "#000", width: 4 }
      });
      setCurrentLine([]);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0a0a0a] text-zinc-300 font-sans overflow-hidden">
      <Topbar store={store} />

      <div className="flex flex-1 overflow-hidden relative">
        <SidebarLeft store={store} />

        <div className="flex-1 relative cursor-crosshair overflow-hidden" id="canvas-container">
          <Stage
            ref={stageRef}
            width={typeof window !== 'undefined' ? window.innerWidth - 60 - 240 : 1000}
            height={typeof window !== 'undefined' ? window.innerHeight - 56 : 800}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            scaleX={store.state.zoom}
            scaleY={store.state.zoom}
            x={store.state.panX}
            y={store.state.panY}
            draggable={store.state.activeTool === 'hand'}
            onDragEnd={(e: any  ) => {
              if (e.target === stageRef.current) {
                store.setViewport(store.state.zoom, e.target.x(), e.target.y());
              }
            }}
          >
            <Layer>
              <Rect
                name="bg-rect"
                x={0} y={0}
                width={store.state.canvasWidth}
                height={store.state.canvasHeight}
                fill={store.state.canvasBg}
                shadowColor="rgba(0,0,0,0.5)"
                shadowBlur={20}
              />

              {store.state.elements.filter(el => !el.isHidden).map((el) => {
                const isSelected = store.state.selectedIds.includes(el.id);
                const onChange = (newAttrs: any  ) => store.updateElement(el.id, newAttrs, true);
                const onSelect = () => {
                  if (store.state.activeTool === 'select') store.setSelected([el.id]);
                };

                if (el.type === 'image') return <CanvasImage key={el.id} el={el} isSelected={isSelected} onSelect={onSelect} onChange={onChange} />;
                if (el.type === 'text') return <EditableText key={el.id} el={el} isSelected={isSelected} onSelect={onSelect} onChange={onChange} />;
                return <ShapeElement key={el.id} el={el} isSelected={isSelected} onSelect={onSelect} onChange={onChange} />;
              })}

              {isDrawing && currentLine.length > 0 && (
                <Line
                  points={currentLine}
                  stroke="#000"
                  strokeWidth={4}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                />
              )}
            </Layer>
          </Stage>
        </div>

        <SidebarRight store={store} stageRef={stageRef} />
      </div>
    </div>
  );
}
