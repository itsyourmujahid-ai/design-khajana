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
  let data = null;
  let error = null;

  try {
    if (supabase) {
      const res = await supabase
        .from('grid_references')
        .select('*')
        .order('created_at', { ascending: false });
      data = res.data;
      error = res.error;
    } else {
      error = new Error("Supabase client not initialized.");
    }
  } catch (err) {
    error = err;
  }

  if (error || !data || data.length === 0) {
    console.warn("Could not fetch grid references from Supabase. Falling back to local mock data.", error);

    // Fallback data in case the remote database isn't fully provisioned yet
    return [
      {
        id: "mock-1",
        name: 'Swiss Style Exhibition', category: 'Poster', canvasWidth: 800, canvasHeight: 1200,
        referenceImageUrl: 'https://images.unsplash.com/photo-1544002621-e73bc5b4c10a?q=80&w=800&h=1200&fit=crop',
        gridConfig: { type: 'column', columns: 4, gutter: 20, margin: 40, color: '#f43f5e', opacity: 0.5, isVisible: true },
        analysis: { gridNotes: '4 Column Grid', structure: 'Professional Layout Reference', alignment: 'Grid Aligned', style: 'Professional Design', mainAlignment: 'Strict adherence' }
      },
      {
        id: "mock-2",
        name: 'Typographic Movie Poster', category: 'Poster', canvasWidth: 800, canvasHeight: 1200,
        referenceImageUrl: 'https://images.unsplash.com/photo-1510251141369-122e2fec19a1?q=80&w=800&h=1200&fit=crop',
        gridConfig: { type: 'column', columns: 6, gutter: 16, margin: 30, color: '#f43f5e', opacity: 0.5, isVisible: true },
        analysis: { gridNotes: '6 Column Grid', structure: 'Professional Layout Reference', alignment: 'Grid Aligned', style: 'Professional Design', mainAlignment: 'Strict adherence' }
      },
      {
        id: "mock-3",
        name: 'Minimalist Event Poster', category: 'Poster', canvasWidth: 800, canvasHeight: 1200,
        referenceImageUrl: 'https://images.unsplash.com/photo-1518331526-728b7e2cc45b?q=80&w=800&h=1200&fit=crop',
        gridConfig: { type: 'modular', columns: 3, rows: 4, gutter: 20, margin: 50, color: '#f43f5e', opacity: 0.5, isVisible: true },
        analysis: { gridNotes: '3x4 Modular Grid', structure: 'Professional Layout Reference', alignment: 'Grid Aligned', style: 'Professional Design', mainAlignment: 'Strict adherence' }
      },
      {
        id: "mock-4",
        name: 'Fashion Magazine Spread', category: 'Editorial', canvasWidth: 1200, canvasHeight: 800,
        referenceImageUrl: 'https://images.unsplash.com/photo-1584446599763-71d533ab6233?q=80&w=1200&h=800&fit=crop',
        gridConfig: { type: 'column', columns: 12, gutter: 16, margin: 40, color: '#f43f5e', opacity: 0.5, isVisible: true },
        analysis: { gridNotes: '12 Column Grid', structure: 'Professional Layout Reference', alignment: 'Grid Aligned', style: 'Professional Design', mainAlignment: 'Strict adherence' }
      },
      {
        id: "mock-5",
        name: 'Architecture Journal', category: 'Editorial', canvasWidth: 1200, canvasHeight: 800,
        referenceImageUrl: 'https://images.unsplash.com/photo-1582216656752-0941328b9c10?q=80&w=1200&h=800&fit=crop',
        gridConfig: { type: 'modular', columns: 8, rows: 6, gutter: 20, margin: 60, color: '#f43f5e', opacity: 0.5, isVisible: true },
        analysis: { gridNotes: '8x6 Modular Grid', structure: 'Professional Layout Reference', alignment: 'Grid Aligned', style: 'Professional Design', mainAlignment: 'Strict adherence' }
      },
      {
        id: "mock-6",
        name: 'Instagram Carousel Square', category: 'Social Media', canvasWidth: 1080, canvasHeight: 1080,
        referenceImageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1080&h=1080&fit=crop',
        gridConfig: { type: 'modular', columns: 6, rows: 6, gutter: 12, margin: 30, color: '#f43f5e', opacity: 0.5, isVisible: true },
        analysis: { gridNotes: '6x6 Modular Grid', structure: 'Professional Layout Reference', alignment: 'Grid Aligned', style: 'Professional Design', mainAlignment: 'Strict adherence' }
      },
      {
        id: "mock-7",
        name: 'SaaS Landing Page', category: 'Web/UI', canvasWidth: 1440, canvasHeight: 900,
        referenceImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1440&h=900&fit=crop',
        gridConfig: { type: 'column', columns: 12, gutter: 24, margin: 120, color: '#f43f5e', opacity: 0.5, isVisible: true },
        analysis: { gridNotes: '12 Column Grid', structure: 'Professional Layout Reference', alignment: 'Grid Aligned', style: 'Professional Design', mainAlignment: 'Strict adherence' }
      },
      {
        id: "mock-8",
        name: 'Stationery Mockup', category: 'Branding', canvasWidth: 1200, canvasHeight: 900,
        referenceImageUrl: 'https://images.unsplash.com/photo-1598114674722-e3a105f93ea8?q=80&w=1200&h=900&fit=crop',
        gridConfig: { type: 'column', columns: 6, gutter: 20, margin: 50, color: '#f43f5e', opacity: 0.5, isVisible: true },
        analysis: { gridNotes: '6 Column Grid', structure: 'Professional Layout Reference', alignment: 'Grid Aligned', style: 'Professional Design', mainAlignment: 'Strict adherence' }
      },
      {
        id: "mock-9",
        name: 'Corporate Flyer', category: 'Flyer', canvasWidth: 850, canvasHeight: 1100,
        referenceImageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=850&h=1100&fit=crop',
        gridConfig: { type: 'column', columns: 4, gutter: 16, margin: 40, color: '#f43f5e', opacity: 0.5, isVisible: true },
        analysis: { gridNotes: '4 Column Grid', structure: 'Professional Layout Reference', alignment: 'Grid Aligned', style: 'Professional Design', mainAlignment: 'Strict adherence' }
      },
      {
        id: "mock-10",
        name: 'Minimalist Business Card', category: 'Business Card', canvasWidth: 1050, canvasHeight: 600,
        referenceImageUrl: 'https://images.unsplash.com/photo-1589304026857-e923e200c622?q=80&w=1050&h=600&fit=crop',
        gridConfig: { type: 'column', columns: 3, gutter: 10, margin: 30, color: '#f43f5e', opacity: 0.5, isVisible: true },
        analysis: { gridNotes: '3 Column Grid', structure: 'Professional Layout Reference', alignment: 'Grid Aligned', style: 'Professional Design', mainAlignment: 'Strict adherence' }
      },
      {
        id: "mock-11",
        name: 'Keynote Title Slide', category: 'Presentation', canvasWidth: 1920, canvasHeight: 1080,
        referenceImageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1920&h=1080&fit=crop',
        gridConfig: { type: 'column', columns: 12, gutter: 30, margin: 100, color: '#f43f5e', opacity: 0.5, isVisible: true },
        analysis: { gridNotes: '12 Column Grid', structure: 'Professional Layout Reference', alignment: 'Grid Aligned', style: 'Professional Design', mainAlignment: 'Strict adherence' }
      },
      {
        id: "mock-12",
        name: 'Billboard Campaign', category: 'Advertising/Marketing', canvasWidth: 1600, canvasHeight: 800,
        referenceImageUrl: 'https://images.unsplash.com/photo-1542204637-e67bc7d41e48?q=80&w=1600&h=800&fit=crop',
        gridConfig: { type: 'column', columns: 8, gutter: 40, margin: 100, color: '#f43f5e', opacity: 0.5, isVisible: true },
        analysis: { gridNotes: '8 Column Grid', structure: 'Professional Layout Reference', alignment: 'Grid Aligned', style: 'Professional Design', mainAlignment: 'Strict adherence' }
      }
    ] as any /* eslint-disable-line @typescript-eslint/no-explicit-any */;
  }

  return data.map((row: any /* eslint-disable-line @typescript-eslint/no-explicit-any */ /* eslint-disable-line @typescript-eslint/no-explicit-any */) => ({
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
