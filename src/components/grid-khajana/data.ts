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

export const predefinedLayouts: ReferenceLayout[] = [
  {
    "id": "ref-0",
    "name": "Swiss Style Exhibition",
    "category": "Poster",
    "canvasWidth": 800,
    "canvasHeight": 1200,
    "referenceImageUrl": "https://images.unsplash.com/photo-1544002621-e73bc5b4c10a?q=80&w=800&h=1200&fit=crop",
    "gridConfig": {
      "type": "column",
      "columns": 4,
      "gutter": 20,
      "margin": 40,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "4 Column Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-1",
    "name": "Typographic Movie Poster",
    "category": "Poster",
    "canvasWidth": 800,
    "canvasHeight": 1200,
    "referenceImageUrl": "https://images.unsplash.com/photo-1510251141369-122e2fec19a1?q=80&w=800&h=1200&fit=crop",
    "gridConfig": {
      "type": "column",
      "columns": 6,
      "gutter": 16,
      "margin": 30,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "6 Column Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-2",
    "name": "Minimalist Event Poster",
    "category": "Poster",
    "canvasWidth": 800,
    "canvasHeight": 1200,
    "referenceImageUrl": "https://images.unsplash.com/photo-1518331526-728b7e2cc45b?q=80&w=800&h=1200&fit=crop",
    "gridConfig": {
      "type": "modular",
      "columns": 3,
      "rows": 4,
      "gutter": 20,
      "margin": 50,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "3x4 Modular Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-3",
    "name": "Fashion Magazine Spread",
    "category": "Editorial",
    "canvasWidth": 1200,
    "canvasHeight": 800,
    "referenceImageUrl": "https://images.unsplash.com/photo-1584446599763-71d533ab6233?q=80&w=1200&h=800&fit=crop",
    "gridConfig": {
      "type": "column",
      "columns": 12,
      "gutter": 16,
      "margin": 40,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "12 Column Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-4",
    "name": "Architecture Journal",
    "category": "Editorial",
    "canvasWidth": 1200,
    "canvasHeight": 800,
    "referenceImageUrl": "https://images.unsplash.com/photo-1582216656752-0941328b9c10?q=80&w=1200&h=800&fit=crop",
    "gridConfig": {
      "type": "modular",
      "columns": 8,
      "rows": 6,
      "gutter": 20,
      "margin": 60,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "8x6 Modular Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-5",
    "name": "Lifestyle Article",
    "category": "Editorial",
    "canvasWidth": 1200,
    "canvasHeight": 800,
    "referenceImageUrl": "https://images.unsplash.com/photo-1512411961623-c5dc56453673?q=80&w=1200&h=800&fit=crop",
    "gridConfig": {
      "type": "column",
      "columns": 6,
      "gutter": 24,
      "margin": 48,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "6 Column Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-6",
    "name": "Instagram Carousel Square",
    "category": "Social Media",
    "canvasWidth": 1080,
    "canvasHeight": 1080,
    "referenceImageUrl": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1080&h=1080&fit=crop",
    "gridConfig": {
      "type": "modular",
      "columns": 6,
      "rows": 6,
      "gutter": 12,
      "margin": 30,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "6x6 Modular Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-7",
    "name": "Product Drop Promo",
    "category": "Social Media",
    "canvasWidth": 1080,
    "canvasHeight": 1080,
    "referenceImageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1080&h=1080&fit=crop",
    "gridConfig": {
      "type": "modular",
      "columns": 4,
      "rows": 4,
      "gutter": 20,
      "margin": 40,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "4x4 Modular Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-8",
    "name": "Quote Post",
    "category": "Social Media",
    "canvasWidth": 1080,
    "canvasHeight": 1080,
    "referenceImageUrl": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1080&h=1080&fit=crop",
    "gridConfig": {
      "type": "column",
      "columns": 4,
      "gutter": 20,
      "margin": 80,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "4 Column Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-9",
    "name": "SaaS Landing Page",
    "category": "Web/UI",
    "canvasWidth": 1440,
    "canvasHeight": 900,
    "referenceImageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1440&h=900&fit=crop",
    "gridConfig": {
      "type": "column",
      "columns": 12,
      "gutter": 24,
      "margin": 120,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "12 Column Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-10",
    "name": "E-commerce Product Page",
    "category": "Web/UI",
    "canvasWidth": 1440,
    "canvasHeight": 900,
    "referenceImageUrl": "https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=1440&h=900&fit=crop",
    "gridConfig": {
      "type": "column",
      "columns": 12,
      "gutter": 30,
      "margin": 80,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "12 Column Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-11",
    "name": "Dashboard Interface",
    "category": "Web/UI",
    "canvasWidth": 1440,
    "canvasHeight": 900,
    "referenceImageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1440&h=900&fit=crop",
    "gridConfig": {
      "type": "modular",
      "columns": 12,
      "rows": 8,
      "gutter": 16,
      "margin": 40,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "12x8 Modular Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-12",
    "name": "Stationery Mockup",
    "category": "Branding",
    "canvasWidth": 1200,
    "canvasHeight": 900,
    "referenceImageUrl": "https://images.unsplash.com/photo-1598114674722-e3a105f93ea8?q=80&w=1200&h=900&fit=crop",
    "gridConfig": {
      "type": "column",
      "columns": 6,
      "gutter": 20,
      "margin": 50,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "6 Column Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-13",
    "name": "Logo Presentation",
    "category": "Branding",
    "canvasWidth": 1200,
    "canvasHeight": 900,
    "referenceImageUrl": "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&h=900&fit=crop",
    "gridConfig": {
      "type": "modular",
      "columns": 4,
      "rows": 3,
      "gutter": 30,
      "margin": 60,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "4x3 Modular Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-14",
    "name": "Brand Guidelines Page",
    "category": "Branding",
    "canvasWidth": 1200,
    "canvasHeight": 900,
    "referenceImageUrl": "https://images.unsplash.com/photo-1507238692062-5a042e9e80b5?q=80&w=1200&h=900&fit=crop",
    "gridConfig": {
      "type": "column",
      "columns": 8,
      "gutter": 24,
      "margin": 80,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "8 Column Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-15",
    "name": "Billboard Campaign",
    "category": "Advertising/Marketing",
    "canvasWidth": 1600,
    "canvasHeight": 800,
    "referenceImageUrl": "https://images.unsplash.com/photo-1542204637-e67bc7d41e48?q=80&w=1600&h=800&fit=crop",
    "gridConfig": {
      "type": "column",
      "columns": 8,
      "gutter": 40,
      "margin": 100,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "8 Column Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-16",
    "name": "Banner Ad",
    "category": "Advertising/Marketing",
    "canvasWidth": 1200,
    "canvasHeight": 600,
    "referenceImageUrl": "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1200&h=600&fit=crop",
    "gridConfig": {
      "type": "column",
      "columns": 6,
      "gutter": 20,
      "margin": 40,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "6 Column Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-17",
    "name": "Corporate Flyer",
    "category": "Flyer",
    "canvasWidth": 850,
    "canvasHeight": 1100,
    "referenceImageUrl": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=850&h=1100&fit=crop",
    "gridConfig": {
      "type": "column",
      "columns": 4,
      "gutter": 16,
      "margin": 40,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "4 Column Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-18",
    "name": "Club Night Flyer",
    "category": "Flyer",
    "canvasWidth": 850,
    "canvasHeight": 1100,
    "referenceImageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=850&h=1100&fit=crop",
    "gridConfig": {
      "type": "modular",
      "columns": 4,
      "rows": 5,
      "gutter": 12,
      "margin": 30,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "4x5 Modular Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-19",
    "name": "Minimalist Business Card",
    "category": "Business Card",
    "canvasWidth": 1050,
    "canvasHeight": 600,
    "referenceImageUrl": "https://images.unsplash.com/photo-1589304026857-e923e200c622?q=80&w=1050&h=600&fit=crop",
    "gridConfig": {
      "type": "column",
      "columns": 3,
      "gutter": 10,
      "margin": 30,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "3 Column Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-20",
    "name": "Creative Studio Card",
    "category": "Business Card",
    "canvasWidth": 1050,
    "canvasHeight": 600,
    "referenceImageUrl": "https://images.unsplash.com/photo-1559055816-4dc4a86b97b0?q=80&w=1050&h=600&fit=crop",
    "gridConfig": {
      "type": "modular",
      "columns": 4,
      "rows": 2,
      "gutter": 10,
      "margin": 40,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "4x2 Modular Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-21",
    "name": "Keynote Title Slide",
    "category": "Presentation",
    "canvasWidth": 1920,
    "canvasHeight": 1080,
    "referenceImageUrl": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1920&h=1080&fit=crop",
    "gridConfig": {
      "type": "column",
      "columns": 12,
      "gutter": 30,
      "margin": 100,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "12 Column Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  },
  {
    "id": "ref-22",
    "name": "Data Slide",
    "category": "Presentation",
    "canvasWidth": 1920,
    "canvasHeight": 1080,
    "referenceImageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&h=1080&fit=crop",
    "gridConfig": {
      "type": "modular",
      "columns": 12,
      "rows": 6,
      "gutter": 20,
      "margin": 80,
      "color": "#f43f5e",
      "opacity": 0.5,
      "isVisible": true
    },
    "analysis": {
      "gridNotes": "12x6 Modular Grid",
      "structure": "Professional Layout Reference",
      "alignment": "Grid Aligned",
      "style": "Professional Design",
      "mainAlignment": "Strict adherence"
    }
  }
];
