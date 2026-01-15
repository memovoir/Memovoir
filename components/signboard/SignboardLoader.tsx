"use client";

import { useEffect } from "react";
import { useSignboard } from "./SignboardContext";

export function SignboardLoader({ wallId }: { wallId: string }) {
  const { loadStrokes } = useSignboard();

  useEffect(() => {
    if (!wallId) return;
    loadStrokes(wallId);
  }, [wallId, loadStrokes]);

  return null;
}
