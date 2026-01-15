"use client";

import type { Memory } from "./MemoryCard";
import { MemoryCard } from "./MemoryCard";


interface MemoryGridProps {
  memories: Memory[];
  themeId: string;
  onOpenMemory: (memory: Memory) => void;
  onOpenReactions: (memory: Memory) => void;
}

export function MemoryGrid({
  memories,
  themeId,
  onOpenMemory,
  onOpenReactions
}: MemoryGridProps) {
  const isEliteTheme = themeId.startsWith("elite-");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pb-24">
      {memories.map((m) => (
        <MemoryCard
          key={m.memory_id}
          memory={m}
          themeId={themeId}
          onOpenMemory={() => onOpenMemory(m)}
          onOpenReactions={() => onOpenReactions(m)}
         
          isOwner={isEliteTheme} // TEMP: admin only
        />
      ))}
    </div>
  );
}
