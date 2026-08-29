export type ElementType = "text" | "image" | "shape" | "background";
export type GridType = "column" | "modular" | "baseline" | "hierarchical" | "symmetrical" | "asymmetrical";

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TextStyle {
  fontSize: number;
  fontWeight: string;
  textAlign: "left" | "center" | "right";
  color: string;
  lineHeight: number;
  textTransform?: "uppercase" | "lowercase" | "none";
  letterSpacing?: number;
}

export interface ShapeStyle {
  backgroundColor: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
}

export interface ImageStyle {
  objectFit: "cover" | "contain" | "fill";
  opacity: number;
  filter?: string; // grayscale, etc.
}

export interface LayoutElement {
  id: string;
  type: ElementType;
  position: Position; // Based on a 1000x1000 normalized coordinate space or % to keep it scalable
  label?: string; // e.g. "Headline", "CTA"

  // Content
  content?: string; // text content or image URL

  // Styling
  textStyle?: TextStyle;
  shapeStyle?: ShapeStyle;
  imageStyle?: ImageStyle;

  // State
  isHidden: boolean;
  isLocked: boolean;
}

export interface GridConfig {
  type: GridType;
  columns: number;
  rows?: number;
  gutter: number; // px or %
  margin: number; // px or %
  baselineSpacing?: number; // px
  color: string;
  opacity: number;
  isVisible: boolean;
}

export interface LayoutAnalysis {
  gridNotes: string;
  structure: string;
  alignment: string;
  style: string;
  mainAlignment: string;
}

export interface ReferenceLayout {
  id: string;
  name: string;
  category: string;
  canvasWidth: number;
  canvasHeight: number;
  gridConfig: GridConfig;
  elements: LayoutElement[];
  analysis: LayoutAnalysis;
}
