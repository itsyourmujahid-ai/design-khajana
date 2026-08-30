import { supabase } from "@/lib/supabase/client";
import { ReferenceLayout } from "./types";

export const categories = [
  "Social Media",
  "Poster",
  "Flyer",
  "Presentation",
  "Business Card",
  "Editorial",
  "Web/UI",
  "Branding",
  "Advertising/Marketing"
];

// Instead of hardcoded data, we fetch from Supabase
export async function fetchPredefinedLayouts(): Promise<ReferenceLayout[]> {
  const { data, error } = await supabase
    .from('grid_references')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error("Error fetching grid references:", error);

    // Return empty array initially, waiting for backend to be provisioned
    return [];
  }

  return data.map((row: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => ({
    id: row.id,
    name: row.name,
    category: row.category,
    canvasWidth: row.canvas_width,
    canvasHeight: row.canvas_height,
    referenceImageUrl: row.reference_image_url,
    gridConfig: row.grid_config,
    analysis: row.analysis
  }));
}
