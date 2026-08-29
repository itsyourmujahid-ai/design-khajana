/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, Text, Line, Transformer, Image as KonvaImage, Group } from "react-konva";
import { Html } from "react-konva-utils";
import useImage from "use-image";
import { useCanvasStore } from "./useCanvasStore";
import { useCanvasPersist } from "./useLocalStorage";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";
import { CanvasRulers } from "./CanvasRulers";
import Konva from "konva";
import { v4 as uuidv4 } from "uuid";
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

function EditableText({ el, onSelect, onChange, isSelected, store }: any  ) {
  const shapeRef = useRef<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(el.text || "Double click to edit");

  // Sync state if external changes happen safely without cascading render
  if (el.text && el.text !== textValue && !isEditing) {
    setTextValue(el.text);
  }

  const handleDoubleClick = () => {
    if (!el.isLocked) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (textValue !== el.text) {
      onChange({ text: textValue });
    }
  };

  return (
    <Group
      x={el.x}
      y={el.y}
      rotation={el.rotation}
      scaleX={el.scaleX}
      scaleY={el.scaleY}
      draggable={!el.isLocked && isSelected && !isEditing}
      onDragEnd={(e: any) => {
        onChange({ x: e.target.x(), y: e.target.y() });
      }}
    >
      {!isEditing && (
        <Text
          id={`el-${el.id}`}
          className="element"
          onClick={onSelect}
          onTap={onSelect}
          onDblClick={handleDoubleClick}
          onDblTap={handleDoubleClick}
          ref={shapeRef}
          text={el.text || "Double click to edit"}
          fill={el.fill || "#000"}
          fontSize={el.fontSize || 24}
          fontFamily={el.fontFamily || "Arial"}
          fontStyle={el.fontWeight || "normal"}
          align={el.textAlign || "left"}
          lineHeight={el.lineHeight || 1.2}
          opacity={el.opacity}
        />
      )}
      {isEditing && (
        <Html divProps={{ style: { position: 'absolute', top: 0, left: 0 } }}>
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            style={{
              width: `${(el.width || 200) * (el.scaleX || 1)}px`,
              height: `${(el.height || 50) * (el.scaleY || 1)}px`,
              fontSize: `${(el.fontSize || 24) * store.state.zoom}px`,
              fontFamily: el.fontFamily || "Arial",
              fontWeight: el.fontWeight === "bold" ? "bold" : "normal",
              fontStyle: el.fontWeight === "italic" ? "italic" : "normal",
              color: el.fill || "#000",
              background: 'transparent',
              border: '1px dashed #00a1ff',
              padding: 0,
              margin: 0,
              overflow: 'hidden',
              resize: 'none',
              outline: 'none',
              lineHeight: el.lineHeight || 1.2,
              transformOrigin: 'top left',
            }}
            onKeyDown={(e) => {
              // Submit on Enter (Shift+Enter for newline)
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleBlur();
              }
            }}
          />
        </Html>
      )}
    </Group>
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
  const trRef = useRef<any>(null);
  const selectionRectRef = useRef<any>(null);
  const selectionLayerRef = useRef<any>(null);
  const isLoaded = useCanvasPersist(store.state, store.forceLoadState);

  // Custom hooks
  useKeyboardShortcuts(store);

  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState<number[]>([]);
  const [selectionBox, setSelectionBox] = useState<{ x1: number, y1: number, x2: number, y2: number } | null>(null);

  // Keep the transformer synced with selected objects
  useEffect(() => {
    if (trRef.current && stageRef.current) {
      const nodes = store.state.selectedIds.map((id: string) => stageRef.current.findOne(`#el-${id}`)).filter(Boolean);
      trRef.current.nodes(nodes);
      trRef.current.getLayer().batchDraw();
    }
  }, [store.state.selectedIds, store.state.elements]);

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

    if (store.state.activeTool === 'select') {
      if (isStage) {
        // Start selection box
        const pos = e.target.getStage().getRelativePointerPosition();
        setSelectionBox({ x1: pos.x, y1: pos.y, x2: pos.x, y2: pos.y });
        store.setSelected([]);
      }
      return;
    }

    if (store.state.activeTool === 'text' && isStage) {
      const pos = e.target.getStage().getRelativePointerPosition();
      store.addElement({
        type: 'text',
        name: 'Text',
        x: pos.x,
        y: pos.y,
        text: 'Double click to edit',
        fill: '#000000',
        fontSize: 24,
        fontFamily: 'Inter',
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        isLocked: false,
        isHidden: false
      });

      // Select the newly added element (the store's addElement pushes it to selectedIds)
      store.setTool('select');
      return;
    }

    if (store.state.activeTool === 'pencil') {
      setIsDrawing(true);
      const pos = e.target.getStage().getRelativePointerPosition();
      setCurrentLine([pos.x, pos.y]);
    }
  };

  const handleMouseMove = (e: any  ) => {
    if (store.state.activeTool === 'select' && selectionBox) {
      const pos = e.target.getStage().getRelativePointerPosition();
      setSelectionBox({ ...selectionBox, x2: pos.x, y2: pos.y });
      return;
    }

    if (!isDrawing) return;
    if (store.state.activeTool === 'pencil') {
      const stage = e.target.getStage();
      const point = stage.getRelativePointerPosition();
      setCurrentLine([...currentLine, point.x, point.y]);
    }
  };

  const handleMouseUp = () => {
    if (store.state.activeTool === 'select' && selectionBox) {
      // Find intersecting elements
      const box = selectionRectRef.current?.getClientRect();
      setSelectionBox(null);

      if (box && box.width > 0 && box.height > 0 && stageRef.current) {
        const shapes = stageRef.current.find('.element');
        const selected = shapes.filter((shape: any) => {
          // Exclude locked shapes from bounding box
          const elState = store.state.elements.find(el => el.id === shape.id().replace('el-', ''));
          if (elState?.isLocked || elState?.isHidden) return false;

          return Konva.Util.haveIntersection(box, shape.getClientRect());
        });

        store.setSelected(selected.map((s: any) => s.id().replace('el-', '')));
      }
      return;
    }

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
          <CanvasRulers store={store} stageRef={stageRef} />

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
                const onSelect = (e: any) => {
                  if (store.state.activeTool === 'select') {
                    if (el.isLocked) return;

                    const metaPressed = e?.evt?.shiftKey || e?.evt?.ctrlKey || e?.evt?.metaKey;
                    if (metaPressed) {
                      if (isSelected) {
                        store.setSelected(store.state.selectedIds.filter(id => id !== el.id));
                      } else {
                        store.setSelected([...store.state.selectedIds, el.id]);
                      }
                    } else if (!isSelected) {
                      store.setSelected([el.id]);
                    }
                  }
                };

                if (el.type === 'image') return <CanvasImage key={el.id} el={el} isSelected={isSelected} onSelect={onSelect} onChange={onChange} />;
                if (el.type === 'text') return <EditableText key={el.id} el={el} isSelected={isSelected} onSelect={onSelect} onChange={onChange} store={store} />;
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

              {/* Guides Layer essentially */}
              {store.state.showGuides && store.state.guides?.map((guide: any) => {
                const isHorizontal = guide.orientation === 'horizontal';
                const length = 10000; // sufficiently long
                return (
                  <Line
                    key={guide.id}
                    points={
                      isHorizontal
                        ? [-length, guide.position, length, guide.position]
                        : [guide.position, -length, guide.position, length]
                    }
                    stroke="#00ffff"
                    strokeWidth={1 / store.state.zoom}
                    draggable={!store.state.lockGuides}
                    onDragMove={(e: any) => {
                      if (store.state.lockGuides) return;
                      const pos = e.target.position();
                      // constrain dragging to axis
                      if (isHorizontal) {
                        e.target.y(pos.y);
                        e.target.x(0);
                      } else {
                        e.target.x(pos.x);
                        e.target.y(0);
                      }
                    }}
                    onDragEnd={(e: any) => {
                      if (store.state.lockGuides) return;
                      const pos = e.target.position();
                      // Update guide position
                      const newPos = isHorizontal ? guide.position + pos.y : guide.position + pos.x;

                      // Remove if dragged completely off canvas bounds (approximate)
                      if (
                        (isHorizontal && (newPos < -5000 || newPos > 5000)) ||
                        (!isHorizontal && (newPos < -5000 || newPos > 5000))
                      ) {
                        store.removeGuide(guide.id);
                      } else {
                        store.updateGuide(guide.id, newPos);
                        e.target.position({x:0, y:0}); // reset line relative offset since we update state
                      }
                    }}
                    hitStrokeWidth={10 / store.state.zoom}
                    onMouseEnter={(e: any) => {
                      if (store.state.lockGuides) return;
                      const container = e.target.getStage().container();
                      container.style.cursor = isHorizontal ? 'row-resize' : 'col-resize';
                    }}
                    onMouseLeave={(e: any) => {
                      if (store.state.lockGuides) return;
                      const container = e.target.getStage().container();
                      container.style.cursor = 'crosshair';
                    }}
                  />
                );
              })}

              <Transformer
                ref={trRef}
                boundBoxFunc={(oldBox, newBox) => {
                  if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) return oldBox;
                  return newBox;
                }}
                onTransformEnd={() => {
                  const nodes = trRef.current.nodes();
                  nodes.forEach((node: any) => {
                    const id = node.id().replace('el-', '');
                    store.updateElement(id, {
                      x: node.x(),
                      y: node.y(),
                      rotation: node.rotation(),
                      scaleX: node.scaleX(),
                      scaleY: node.scaleY(),
                    }, true);
                  });
                }}
                onDragEnd={() => {
                   const nodes = trRef.current.nodes();
                   nodes.forEach((node: any) => {
                     const id = node.id().replace('el-', '');
                     store.updateElement(id, {
                       x: node.x(),
                       y: node.y(),
                     }, true);
                   });
                }}
              />

              {selectionBox && (
                <Rect
                  ref={selectionRectRef}
                  x={Math.min(selectionBox.x1, selectionBox.x2)}
                  y={Math.min(selectionBox.y1, selectionBox.y2)}
                  width={Math.abs(selectionBox.x2 - selectionBox.x1)}
                  height={Math.abs(selectionBox.y2 - selectionBox.y1)}
                  fill="rgba(0, 161, 255, 0.3)"
                  stroke="rgba(0, 161, 255, 0.8)"
                  strokeWidth={1}
                  listening={false}
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
