export async function analyzeImage(file: File): Promise<{ width: number, height: number, contrastRatio: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        URL.revokeObjectURL(url);
        resolve({ width, height, contrastRatio: 4.5 }); // fallback
        return;
      }

      ctx.drawImage(img, 0, 0);

      // Calculate a basic contrast heuristic
      // Sample pixels to find brightest and darkest areas
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      let minLuma = 255;
      let maxLuma = 0;

      // Sample every 100th pixel to save processing time
      for (let i = 0; i < data.length; i += 400) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a < 128) continue; // skip highly transparent pixels

        // Relative luminance formula
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        if (luma < minLuma) minLuma = luma;
        if (luma > maxLuma) maxLuma = luma;
      }

      // Convert luma (0-255) to relative luminance (0-1) for WCAG formula
      const l1 = (maxLuma / 255) + 0.05;
      const l2 = (minLuma / 255) + 0.05;
      const contrastRatio = l1 / l2;

      URL.revokeObjectURL(url);
      resolve({ width, height, contrastRatio });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}
