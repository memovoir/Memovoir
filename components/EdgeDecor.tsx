"use client";

import type { Theme } from "@/themes/themes";

interface EdgeDecorProps {
  theme: Theme;
}

export function EdgeDecor({ theme }: EdgeDecorProps) {
  // Disabled: should never add blur, vignette, glow, or overlays.
  return null;
}
