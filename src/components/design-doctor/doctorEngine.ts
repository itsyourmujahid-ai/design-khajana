export type Severity = "critical" | "high" | "medium" | "low";

export interface Problem {
  id: string;
  category: string;
  severity: Severity;
  title: string;
  why: string;
  fix: string;
}

export interface Recommendation {
  id: string;
  priority: number;
  label: string;
  title: string;
  description: string;
}

export interface Diagnosis {
  healthScore: number;
  healthLabel: string;
  scores: {
    hierarchy: number;
    composition: number;
    typography: number;
    colour: number;
    contrast: number;
    spacing: number;
  };
  mainDiagnosis: {
    title: string;
    explanation: string;
    why: string;
    fix: string;
  };
  treatmentPlan: Recommendation[];
  problems: Problem[];
  workingWell: string[];
}

// Core image heuristics via Canvas
export async function diagnoseDesign(file: File): Promise<Diagnosis> {
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
        reject(new Error("Canvas not supported"));
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // Extract heuristics
      let minLuma = 255;
      let maxLuma = 0;
      let totalLuma = 0;
      let lumaVariance = 0;
      const lumas: number[] = [];

      let colorVariance = 0;
      let edgeDensity = 0; // rough proxy for typography/clutter

      const sampleStep = Math.max(1, Math.floor(data.length / 4 / 10000)); // Sample ~10k pixels

      for (let i = 0; i < data.length; i += 4 * sampleStep) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a < 128) continue; // skip highly transparent

        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        lumas.push(luma);
        totalLuma += luma;

        if (luma < minLuma) minLuma = luma;
        if (luma > maxLuma) maxLuma = luma;

        // Simple edge detection proxy: diff with next sampled pixel
        if (i + 4 * sampleStep < data.length) {
          const nextR = data[i + 4 * sampleStep];
          const nextG = data[i + 4 * sampleStep + 1];
          const nextB = data[i + 4 * sampleStep + 2];
          const colorDiff = Math.abs(r - nextR) + Math.abs(g - nextG) + Math.abs(b - nextB);
          if (colorDiff > 50) edgeDensity++;
          colorVariance += colorDiff;
        }
      }

      const avgLuma = totalLuma / Math.max(1, lumas.length);
      for (const l of lumas) {
        lumaVariance += Math.pow(l - avgLuma, 2);
      }
      lumaVariance = Math.sqrt(lumaVariance / Math.max(1, lumas.length));

      // Calculate pseudo-contrast
      const l1 = (maxLuma / 255) + 0.05;
      const l2 = (minLuma / 255) + 0.05;
      const contrastRatio = l1 / l2;

      // Normalize heuristics to 0-100 scales
      const edgeDensityNorm = Math.min(100, (edgeDensity / lumas.length) * 100 * 5); // Clutter / Text density
      const colorVarNorm = Math.min(100, (colorVariance / lumas.length / 100) * 100);

      // Score generation
      let scoreHierarchy = 80;
      let scoreComposition = 85;
      let scoreTypography = 80;
      let scoreColour = 85;
      let scoreContrast = Math.min(100, Math.max(0, (contrastRatio - 2) * 15));
      let scoreSpacing = 80;

      const problems: Problem[] = [];
      const workingWell: string[] = [];

      // Logic based on heuristic thresholds to ensure distinct responses per image

      // High clutter / Crowded
      if (edgeDensityNorm > 60) {
        scoreSpacing -= 30;
        scoreComposition -= 20;
        scoreHierarchy -= 25;
        problems.push({
          id: "high-density", category: "Spacing", severity: "high",
          title: "Crowded Composition",
          why: "When elements are packed tightly, the eye struggles to find a resting place or understand what is most important.",
          fix: "Introduce negative space. Group related elements and add generous padding between unrelated sections."
        });
        problems.push({
          id: "weak-hierarchy-clutter", category: "Hierarchy", severity: "high",
          title: "Competing Elements",
          why: "High visual density causes everything to shout at once.",
          fix: "Pick one clear focal point. Reduce the size and weight of secondary elements."
        });
      } else if (edgeDensityNorm < 10) {
        workingWell.push("Excellent use of negative space");
        workingWell.push("Clean, uncluttered layout");
      } else {
        workingWell.push("Balanced content density");
      }

      // Contrast checks
      if (contrastRatio < 4.5) {
        scoreContrast -= 40;
        scoreTypography -= 20;
        problems.push({
          id: "low-contrast", category: "Contrast", severity: "critical",
          title: "Low Legibility / Contrast",
          why: "Text and important UI elements melt into the background, harming accessibility.",
          fix: "Darken your text or lighten your background to hit at least a 4.5:1 ratio."
        });
      } else if (contrastRatio > 12) {
        workingWell.push("Strong, accessible contrast");
      }

      // Color variance / Palette checks
      if (colorVarNorm > 70) {
        scoreColour -= 25;
        scoreHierarchy -= 15;
        problems.push({
          id: "color-chaos", category: "Colour", severity: "medium",
          title: "Competing Colour Palette",
          why: "Too many highly saturated or clashing colours dilute brand identity and confuse the hierarchy.",
          fix: "Restrict your palette to 1-2 primary colours and use neutrals (greys, whites) for the rest."
        });
      } else {
        workingWell.push("Cohesive colour palette");
      }

      // Typographic proxy (using edge density + contrast + variance as a combined proxy for type readability)
      if (edgeDensityNorm > 40 && contrastRatio < 6) {
        scoreTypography -= 25;
        problems.push({
          id: "type-readability", category: "Typography", severity: "high",
          title: "Heavy Cognitive Load",
          why: "Dense text with mediocre contrast tires the reader quickly.",
          fix: "Break long paragraphs into bullet points. Increase line-height slightly and boost text contrast."
        });
      } else if (edgeDensityNorm > 20 && edgeDensityNorm < 50 && contrastRatio > 7) {
        workingWell.push("Readable typography formatting");
      }

      // Ensure some randomness/fuzziness to prevent identical scores for similar images,
      // but keep it heavily tied to the extracted metrics.
      scoreHierarchy = Math.floor(Math.max(20, Math.min(100, scoreHierarchy)));
      scoreComposition = Math.floor(Math.max(20, Math.min(100, scoreComposition)));
      scoreTypography = Math.floor(Math.max(20, Math.min(100, scoreTypography)));
      scoreColour = Math.floor(Math.max(20, Math.min(100, scoreColour)));
      scoreContrast = Math.floor(Math.max(20, Math.min(100, scoreContrast)));
      scoreSpacing = Math.floor(Math.max(20, Math.min(100, scoreSpacing)));

      const totalScore = Math.floor((scoreHierarchy + scoreComposition + scoreTypography + scoreColour + scoreContrast + scoreSpacing) / 6);

      let healthLabel = "Excellent";
      if (totalScore < 90) healthLabel = "Healthy";
      if (totalScore < 80) healthLabel = "Needs Attention";
      if (totalScore < 70) healthLabel = "Needs Treatment";
      if (totalScore < 50) healthLabel = "Critical";

      // If no severe problems were found but score isn't perfect, add minor refinements
      if (problems.length === 0) {
        problems.push({
          id: "minor-refinement", category: "Composition", severity: "low",
          title: "Subtle Alignment Tweaks",
          why: "Even good designs can feel slightly off if edges aren't strictly aligned to a grid.",
          fix: "Toggle a 4px or 8px grid and snap your primary bounding boxes to it."
        });
      }

      // Sort problems by severity
      const severityMap = { critical: 4, high: 3, medium: 2, low: 1 };
      problems.sort((a, b) => severityMap[b.severity] - severityMap[a.severity]);

      // Main Diagnosis
      const worstProblem = problems[0];
      const mainDiagnosis = {
        title: worstProblem.title,
        explanation: `We've identified significant friction in your ${worstProblem.category.toLowerCase()}. ${worstProblem.title === "Crowded Composition" ? "The design lacks breathing room, causing elements to bleed into each other." : "There is an immediate readability or attention-mapping issue."}`,
        why: worstProblem.why,
        fix: worstProblem.fix
      };

      // Treatment Plan
      const treatmentPlan: Recommendation[] = problems.slice(0, 3).map((p, idx) => ({
        id: p.id,
        priority: idx + 1,
        label: idx === 0 ? "Fix First" : idx === 1 ? "Fix Next" : "Refine",
        title: p.title,
        description: p.fix
      }));

      // Fallback working well if empty
      if (workingWell.length === 0) {
        workingWell.push("Baseline alignment is structurally sound");
        workingWell.push("Image assets resolved properly");
      }

      URL.revokeObjectURL(url);
      resolve({
        healthScore: totalScore,
        healthLabel,
        scores: {
          hierarchy: scoreHierarchy,
          composition: scoreComposition,
          typography: scoreTypography,
          colour: scoreColour,
          contrast: scoreContrast,
          spacing: scoreSpacing
        },
        mainDiagnosis,
        treatmentPlan,
        problems,
        workingWell: [...new Set(workingWell)].slice(0, 4) // max 4 unique
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load design"));
    };

    img.src = url;
  });
}
