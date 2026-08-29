export type ElementType = "rectangle" | "ellipse" | "text" | "image" | "path" | "polygon" | "line";
export type ToolType = "select" | "hand" | "node" | "pen" | "pencil" | "rectangle" | "ellipse" | "text" | "image" | "line";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface StrokeConfig {
  color: string;
  width: number;
  dash?: number[];
  lineCap?: "butt" | "round" | "square";
  lineJoin?: "miter" | "round" | "bevel";
}

export interface CanvasElement {
  id: string;
  type: ElementType;
  name: string;

  // Transform
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation: number;
  scaleX: number;
  scaleY: number;

  // Style
  fill?: string;
  stroke?: StrokeConfig;
  opacity: number;

  // Text Specific
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right";
  lineHeight?: number;
  letterSpacing?: number;

  // Path / Line Specific
  points?: number[]; // [x1,y1, x2,y2, ...]
  closed?: boolean;

  // Image Specific
  src?: string; // base64 or objectURL

  // State
  isLocked: boolean;
  isHidden: boolean;
}

export interface CanvasState {
  elements: CanvasElement[];
  selectedIds: string[];
  canvasWidth: number;
  canvasHeight: number;
  canvasBg: string;

  // Viewport
  zoom: number;
  panX: number;
  panY: number;

  // Tools
  activeTool: ToolType;
}
