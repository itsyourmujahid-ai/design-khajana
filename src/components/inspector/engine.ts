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
  width: number; // px
  height: number; // px
  dpi: number;
  colorMode: "RGB" | "CMYK";
  contrastRatio: number;
  fontSize: number; // px
  lineHeight: number; // multiplier e.g. 1.5
  letterSpacing: number; // em
  margin: number; // px
  isPrint: boolean;
}

export function inspectDesign(data: DesignData): InspectionItem[] {
  const results: InspectionItem[] = [];

  // Image & Resolution
  const totalPixels = data.width * data.height;
  if (totalPixels < 500000) {
    results.push({
      id: "res-low", category: "Image", name: "Image Resolution", status: "error",
      message: "Resolution is too low for most uses.",
      recommendation: "Use an image with at least 1000x1000 pixels to avoid blurriness."
    });
  } else if (totalPixels < 2000000) {
    results.push({
      id: "res-med", category: "Image", name: "Image Resolution", status: "warning",
      message: "Acceptable for digital, but may be too low for print.",
      recommendation: "Consider a higher resolution image if printing larger than A5."
    });
  } else {
    results.push({
      id: "res-high", category: "Image", name: "Image Resolution", status: "good",
      message: "High resolution detected.",
      recommendation: "Excellent for both digital and high-quality print."
    });
  }

  // DPI
  if (data.isPrint) {
    if (data.dpi < 150) {
      results.push({
        id: "dpi-low", category: "Print", name: "Print DPI", status: "error",
        message: `DPI is ${data.dpi}. Print requires at least 300 DPI for standard quality.`,
        recommendation: "Increase DPI to 300. Do not just upsample a low-res image."
      });
    } else if (data.dpi < 300) {
      results.push({
        id: "dpi-med", category: "Print", name: "Print DPI", status: "warning",
        message: `DPI is ${data.dpi}. This is okay for large posters, but low for handheld print.`,
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
  } else {
    // Digital
    if (data.dpi > 150) {
      results.push({
        id: "dpi-high-digital", category: "Image", name: "Digital DPI", status: "warning",
        message: `DPI is ${data.dpi}. Web images typically use 72-144 DPI.`,
        recommendation: "Consider lowering DPI to reduce file size for web."
      });
    } else {
      results.push({
        id: "dpi-ok-digital", category: "Image", name: "Digital DPI", status: "good",
        message: `DPI is ${data.dpi}.`,
        recommendation: "Appropriate DPI for digital screens."
      });
    }

    if (data.colorMode === "CMYK") {
      results.push({
        id: "color-cmyk-digital", category: "Image", name: "Colour Mode", status: "error",
        message: "CMYK mode detected for a digital design.",
        recommendation: "Convert to RGB for accurate, vibrant display on screens."
      });
    } else {
      results.push({
        id: "color-rgb-digital", category: "Image", name: "Colour Mode", status: "good",
        message: "RGB mode detected.",
        recommendation: "Perfect for digital screens."
      });
    }
  }

  // Contrast
  if (data.contrastRatio < 3) {
    results.push({
      id: "contrast-fail", category: "Typography", name: "Contrast", status: "error",
      message: `Contrast ratio is ${data.contrastRatio.toFixed(1)}:1 (Fails WCAG).`,
      recommendation: "Increase contrast to at least 4.5:1 for readability."
    });
  } else if (data.contrastRatio < 4.5) {
    results.push({
      id: "contrast-warn", category: "Typography", name: "Contrast", status: "warning",
      message: `Contrast ratio is ${data.contrastRatio.toFixed(1)}:1 (Passes AA Large only).`,
      recommendation: "Acceptable for large text, but increase contrast for body text."
    });
  } else {
    results.push({
      id: "contrast-pass", category: "Typography", name: "Contrast", status: "good",
      message: `Contrast ratio is ${data.contrastRatio.toFixed(1)}:1 (Passes AA/AAA).`,
      recommendation: "Excellent readability."
    });
  }

  // Typography - Size
  if (data.fontSize < 12) {
    results.push({
      id: "font-small", category: "Typography", name: "Font Size", status: "warning",
      message: `Font size is ${data.fontSize}px.`,
      recommendation: "Consider increasing base size to at least 14-16px for better legibility."
    });
  } else {
    results.push({
      id: "font-ok", category: "Typography", name: "Font Size", status: "good",
      message: `Font size is ${data.fontSize}px.`,
      recommendation: "Good base font size."
    });
  }

  // Typography - Line Height
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

  // Layout - Margins / Safe Area
  if (data.margin < 16) {
    results.push({
      id: "margin-tight", category: "Layout", name: "Safe Area / Margins", status: "error",
      message: `Margins are very tight (${data.margin}px).`,
      recommendation: "Increase margins to give the design room to breathe and avoid print cutoff."
    });
  } else {
    results.push({
      id: "margin-ok", category: "Layout", name: "Safe Area / Margins", status: "good",
      message: `Margins look adequate (${data.margin}px).`,
      recommendation: "Content is safely within bounds."
    });
  }

  // Layout - Aspect Ratio
  const aspect = Math.max(data.width, data.height) / Math.min(data.width, data.height);
  if (aspect > 3) {
    results.push({
      id: "aspect-extreme", category: "Layout", name: "Aspect Ratio", status: "warning",
      message: "Extreme aspect ratio detected.",
      recommendation: "Ensure this is intended (e.g. panoramic or banner). Standard formats rarely exceed 16:9."
    });
  }

  return results;
}
