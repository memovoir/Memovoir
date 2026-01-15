"use client";

interface EmojiBurstProps {
  emoji: string;
  x: number;
  y: number;
  enabled: boolean;
  onDone: () => void;
}

export function EmojiBurst({
  emoji,
  x,
  y,
  enabled,
  onDone
}: EmojiBurstProps) {
  if (!enabled) return null;

  // This component is intentionally empty.
  // The actual burst is handled imperatively by the hook.
  onDone();
  return null;
}
