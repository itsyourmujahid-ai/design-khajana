import { Metadata } from "next";
import { CanvasWorkspace } from "@/components/canvas/CanvasWorkspace";

export const metadata: Metadata = {
  title: "Canvas Editor",
  description: "Advanced vector and raster workspace for Design Khajana.",
};

export default function CanvasPage() {
  return <CanvasWorkspace />;
}
