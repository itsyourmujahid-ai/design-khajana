export const presets = {
  "A4": { width: 210, height: 297, unit: "mm" },
  "A3": { width: 297, height: 420, unit: "mm" },
  "A5": { width: 148, height: 210, unit: "mm" },
  "Letter": { width: 8.5, height: 11, unit: "inch" },
  "Legal": { width: 8.5, height: 14, unit: "inch" },
  "Business Card": { width: 3.5, height: 2, unit: "inch" },
  "Flyer": { width: 4, height: 6, unit: "inch" },
  "Brochure": { width: 11, height: 8.5, unit: "inch" },
  "Poster": { width: 18, height: 24, unit: "inch" },
  "Banner": { width: 72, height: 24, unit: "inch" },
};

export function convertToInches(value: number, unit: string) {
  if (unit === "mm") return value / 25.4;
  if (unit === "cm") return value / 2.54;
  return value; // already inch
}

export function convertFromInches(inches: number, targetUnit: string) {
  if (targetUnit === "mm") return inches * 25.4;
  if (targetUnit === "cm") return inches * 2.54;
  return inches; // target is inch
}

export function calculatePixels(width: number, height: number, unit: string, dpi: number) {
  const widthInches = convertToInches(width, unit);
  const heightInches = convertToInches(height, unit);

  return {
    pxWidth: Math.round(widthInches * dpi),
    pxHeight: Math.round(heightInches * dpi)
  };
}
