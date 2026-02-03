export const PARALIGHT_SERIES = [
  "5mm-25mm Profile Series",
  "Corner Profile Series",
  "20mm-200mm Profile Series",
  "Hanging Profiles Series",
  "180° Wide-Angle Profile Series",
  "Trimless Recessed Profile Series",
  "In-Ground Profile Series",
  "Skirting & Stairs Profile Series",
  "Glass Wine Cabinet & Shelf Profile Series",
  "Ultra-Low Height Profile Series",
  "Ceiling & Cove Profile Series",
  "Silicone Stabilizing Profile Series",
  "LED Strip Stabilizing Profile Series",
  "Wardrobe & Closet Profile Series",
  "Waterproof Profile Series",
  "Flexible Profile Series",
  "PC Cover Recessed Series",
  "Profile Accessories & Components"
] as const;

export const MAGLINEAR_SERIES = {
  "5mm Magnetic Track Series": [
    "5mm Magnetic Tracks",
    "5mm Magnetic Light Fixtures",
    "5mm Magnetic Accessories"
  ],
  "6mm Magnetic Track Series": [
    "6mm Magnetic Tracks",
    "6mm Magnetic Light Fixtures",
    "6mm Magnetic Accessories"
  ],
  "10mm Magnetic Track Series": [
    "10mm Magnetic Tracks",
    "10mm Magnetic Light Fixtures",
    "10mm Magnetic Accessories"
  ],
  "16mm Magnetic Track Series": [
    "16mm Magnetic Tracks",
    "16mm Magnetic Light Fixtures",
    "16mm Magnetic Accessories"
  ],
  "20mm Magnetic Track Series": [
    "20mm Magnetic Tracks",
    "20mm Magnetic Light Fixtures",
    "20mm Magnetic Accessories"
  ],
  "220V Track Series": [
    "220V Tracks",
    "220V Light Fixtures",
    "220V Accessories"
  ],
  "BeltLight Track Series": [
    "BeltLight Tracks",
    "BeltLight Light Fixtures",
    "BeltLight Accessories"
  ],
  "Downlights": [],
  "LED Panel Lights": [],
  "Linear Pendant Lights": [],
  "Ring Pendant Lights": [],
  "Ultra Thin Tracks Series": [
    "Ultra Thin Tracks",
    "Ultra Thin Light Fixtures",
    "Ultra Thin Accessories"
  ]
} as const;

export const MAGLINEAR_ALL_SERIES = Object.keys(MAGLINEAR_SERIES);
export const MAGLINEAR_ALL_SUBSERIES = Object.values(MAGLINEAR_SERIES).flat();

export type MaglinearSeries = keyof typeof MAGLINEAR_SERIES;
export type MaglinearSubSeries = typeof MAGLINEAR_SERIES[MaglinearSeries][number];
