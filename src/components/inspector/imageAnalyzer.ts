export interface ImageMetrics {
  width: number;
  height: number;
  contrastRatio: number;
  avgLuma: number;
  lumaVariance: number;
  edgeDensity: number;
  colorVariance: number;
}

export async function analyzeImage(file: File): Promise<ImageMetrics> {
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
        resolve({ width, height, contrastRatio: 4.5, avgLuma: 128, lumaVariance: 50, edgeDensity: 10, colorVariance: 10 }); // fallback
        return;
      }

      // Draw downsampled if image is huge to save performance
      const MAX_SIZE = 800;
      let drawWidth = width;
      let drawHeight = height;
      if (width > MAX_SIZE || height > MAX_SIZE) {
        const ratio = Math.min(MAX_SIZE / width, MAX_SIZE / height);
        drawWidth = width * ratio;
        drawHeight = height * ratio;
        canvas.width = drawWidth;
        canvas.height = drawHeight;
      }

      ctx.drawImage(img, 0, 0, drawWidth, drawHeight);

      const imageData = ctx.getImageData(0, 0, drawWidth, drawHeight);
      const data = imageData.data;

      let minLuma = 255;
      let maxLuma = 0;
      let totalLuma = 0;
      const lumas: number[] = [];

      let edgeCount = 0;
      let colorDiffSum = 0;

      // Sample pixels
      const step = 4 * Math.max(1, Math.floor((drawWidth * drawHeight) / 50000)); // Sample ~50k pixels

      for (let i = 0; i < data.length; i += step) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a < 128) continue;

        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        lumas.push(luma);
        totalLuma += luma;

        if (luma < minLuma) minLuma = luma;
        if (luma > maxLuma) maxLuma = luma;

        // Compare with pixel below (rough edge/color diff)
        const rowBelowIdx = i + (drawWidth * 4);
        if (rowBelowIdx < data.length) {
          const nr = data[rowBelowIdx];
          const ng = data[rowBelowIdx + 1];
          const nb = data[rowBelowIdx + 2];
          const diff = Math.abs(r - nr) + Math.abs(g - ng) + Math.abs(b - nb);
          colorDiffSum += diff;
          if (diff > 45) edgeCount++;
        }
      }

      const l1 = (maxLuma / 255) + 0.05;
      const l2 = (minLuma / 255) + 0.05;
      const contrastRatio = l1 / l2;

      const avgLuma = totalLuma / Math.max(1, lumas.length);
      let varianceSum = 0;
      for (const l of lumas) varianceSum += Math.pow(l - avgLuma, 2);
      const lumaVariance = Math.sqrt(varianceSum / Math.max(1, lumas.length));

      const edgeDensity = (edgeCount / Math.max(1, lumas.length)) * 100;
      const colorVariance = colorDiffSum / Math.max(1, lumas.length);

      URL.revokeObjectURL(url);
      resolve({
        width,
        height,
        contrastRatio,
        avgLuma,
        lumaVariance,
        edgeDensity,
        colorVariance
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}
