import { ImageMetrics } from "./imageAnalyzer";

export type InspectionResult = "good" | "warning" | "error";

export interface InspectionItem {
  id: string;
  category: "Image" | "Print" | "Typography" | "Layout";
  name: string;
  status: InspectionResult;
  message: string;
  recommendation: string;
}

export interface DesignData {
  width: number;
  height: number;
  dpi: number;
  colorMode: "RGB" | "CMYK";
  contrastRatio: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  margin: number;
  isPrint: boolean;
  metrics?: ImageMetrics; // Actual extracted metrics
}

export function inspectDesign(data: DesignData): InspectionItem[] {
  const results: InspectionItem[] = [];

  // Image & Resolution
  const totalPixels = data.width * data.height;
  if (totalPixels < 500000) {
    results.push({
      id: "res-low", category: "Image", name: "Resolution", status: "error",
      message: `Resolution is low (${data.width}x${data.height}).`,
      recommendation: "Use an image with at least 1000x1000 pixels to avoid blurriness."
    });
  } else if (totalPixels < 2000000) {
    results.push({
      id: "res-med", category: "Image", name: "Resolution", status: "warning",
      message: `Resolution (${data.width}x${data.height}) is okay for digital, low for large print.`,
      recommendation: "Consider a higher resolution image if printing larger than A5."
    });
  } else {
    results.push({
      id: "res-high", category: "Image", name: "Resolution", status: "good",
      message: `High resolution detected (${data.width}x${data.height}).`,
      recommendation: "Excellent for both digital and high-quality print."
    });
  }

  // DPI
  if (data.isPrint) {
    if (data.dpi < 150) {
      results.push({
        id: "dpi-low", category: "Print", name: "Print DPI", status: "error",
        message: `DPI is ${data.dpi}. Print requires at least 300 DPI.`,
        recommendation: "Increase DPI to 300. Do not just upsample a low-res image."
      });
    } else if (data.dpi < 300) {
      results.push({
        id: "dpi-med", category: "Print", name: "Print DPI", status: "warning",
        message: `DPI is ${data.dpi}. Okay for posters, low for handheld print.`,
        recommendation: "Increase to 300 DPI for business cards or flyers."
      });
    } else {
      results.push({
        id: "dpi-high", category: "Print", name: "Print DPI", status: "good",
        message: `DPI is ${data.dpi}.`,
        recommendation: "Perfect resolution for high-quality print."
      });
    }

    if (data.colorMode === "RGB") {
      results.push({
        id: "color-rgb-print", category: "Print", name: "Colour Mode", status: "error",
        message: "RGB mode detected for a print design.",
        recommendation: "Convert to CMYK before printing to avoid dull or shifted colours."
      });
    } else {
      results.push({
        id: "color-cmyk-print", category: "Print", name: "Colour Mode", status: "good",
        message: "CMYK mode detected.",
        recommendation: "Correct colour mode for physical printing."
      });
    }
  }

  // Layout - Aspect Ratio
  const aspect = Math.max(data.width, data.height) / Math.min(data.width, data.height);
  if (aspect > 3) {
    results.push({
      id: "aspect-extreme", category: "Layout", name: "Aspect Ratio", status: "warning",
      message: `Extreme aspect ratio detected (${aspect.toFixed(2)}:1).`,
      recommendation: "Ensure this panoramic/banner format is intended."
    });
  } else {
    results.push({
      id: "aspect-ok", category: "Layout", name: "Aspect Ratio", status: "good",
      message: `Standard aspect ratio (${aspect.toFixed(2)}:1).`,
      recommendation: "Safe for most general use cases."
    });
  }

  // Use Dynamic Extracted Metrics if available
  if (data.metrics) {
    const { contrastRatio, avgLuma, edgeDensity, colorVariance } = data.metrics;

    // Contrast
    if (contrastRatio < 3.5) {
      results.push({
        id: "contrast-fail", category: "Typography", name: "Contrast", status: "error",
        message: `Measured contrast ratio is ${contrastRatio.toFixed(1)}:1 (Fails WCAG).`,
        recommendation: "Increase contrast between foreground elements and background to at least 4.5:1."
      });
    } else if (contrastRatio < 5.5) {
      results.push({
        id: "contrast-warn", category: "Typography", name: "Contrast", status: "warning",
        message: `Measured contrast ratio is ${contrastRatio.toFixed(1)}:1 (Passes AA Large only).`,
        recommendation: "Acceptable for large text/headings, but weak for fine body text."
      });
    } else {
      results.push({
        id: "contrast-pass", category: "Typography", name: "Contrast", status: "good",
        message: `Measured contrast ratio is ${contrastRatio.toFixed(1)}:1.`,
        recommendation: "Excellent readability and WCAG AAA compliance."
      });
    }

    // Brightness (Luma)
    if (avgLuma < 40) {
      results.push({
        id: "luma-dark", category: "Image", name: "Brightness", status: "warning",
        message: "Image is unusually dark overall.",
        recommendation: "Ensure critical details aren't lost in shadows, especially if printing on uncoated paper."
      });
    } else if (avgLuma > 230) {
      results.push({
        id: "luma-bright", category: "Image", name: "Brightness", status: "warning",
        message: "Image is extremely bright/overexposed.",
        recommendation: "Watch for washed-out highlights and lack of definition in bright areas."
      });
    } else {
      results.push({
        id: "luma-ok", category: "Image", name: "Brightness", status: "good",
        message: "Image brightness is well balanced.",
        recommendation: "Good tonal distribution."
      });
    }

    // Complexity / Density
    if (edgeDensity > 18) {
      results.push({
        id: "density-high", category: "Layout", name: "Visual Complexity", status: "error",
        message: "High density of edges/details detected.",
        recommendation: "The design appears crowded. Increase negative space and reduce clutter."
      });
    } else if (edgeDensity < 3) {
      results.push({
        id: "density-low", category: "Layout", name: "Visual Complexity", status: "good",
        message: "Minimalist composition detected.",
        recommendation: "Clean use of negative space."
      });
    } else {
      results.push({
        id: "density-ok", category: "Layout", name: "Visual Complexity", status: "good",
        message: "Balanced content density.",
        recommendation: "Good distribution of elements."
      });
    }

    // Colour Variety
    if (colorVariance > 120) {
      results.push({
        id: "color-busy", category: "Image", name: "Colour Palette", status: "warning",
        message: "High colour variance/clashing hues detected.",
        recommendation: "Ensure colours don't compete for attention. Try restricting the palette."
      });
    } else {
      results.push({
        id: "color-ok", category: "Image", name: "Colour Palette", status: "good",
        message: "Cohesive colour variance.",
        recommendation: "Colours appear harmonized."
      });
    }

  } else {
    // Fallback manual metrics if no image uploaded
    if (data.contrastRatio < 4.5) {
      results.push({
        id: "contrast-warn-manual", category: "Typography", name: "Contrast (Manual)", status: "warning",
        message: `Contrast set to ${data.contrastRatio}:1.`,
        recommendation: "Increase to at least 4.5:1."
      });
    }
  }

  // Typography - Line Height (Manual fallback since we can't extract font metrics from flattened image safely without ML)
  if (data.lineHeight < 1.2) {
    results.push({
      id: "lh-tight", category: "Typography", name: "Line Height", status: "error",
      message: `Line height is ${data.lineHeight.toFixed(1)}. Text will look cramped.`,
      recommendation: "Increase line height to 1.4 - 1.6 for body text."
    });
  } else if (data.lineHeight > 2.0) {
    results.push({
      id: "lh-loose", category: "Typography", name: "Line Height", status: "warning",
      message: `Line height is ${data.lineHeight.toFixed(1)}. Lines are very far apart.`,
      recommendation: "Reduce line height to prevent disjointed reading."
    });
  } else {
    results.push({
      id: "lh-ok", category: "Typography", name: "Line Height", status: "good",
      message: `Line height is ${data.lineHeight.toFixed(1)}.`,
      recommendation: "Optimal line spacing."
    });
  }

  return results;
}
