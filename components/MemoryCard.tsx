"use client";

import Image from "next/image";
import { useState } from "react";
import CommentsPreview from "./CommentsPreview";
import { togglePin } from "../utils/api";
import { ReactionBar } from "./ReactionBar";

export interface Memory {
  memory_id: string;
  wall_id: string;
  contributor_name: string;
  message: string;
  photo_url: string | null;
  created_at: string;
  reactions?: Record<string, number>;
  is_pinned?: boolean;
}

interface MemoryCardProps {
  memory: Memory;
  themeId: string;
  onOpenMemory: () => void;
  onOpenReactions: () => void;
  isOwner?: boolean; 
}

const themePins: Record<string, string> = {
  "pastel-scrapbook": "https://i.ibb.co/HDKyQ4Hq/2-removebg-preview.png",
  "vintage-polaroid": "https://i.ibb.co/C5RKf06S/19.png",
  "neon-Jam": "https://i.ibb.co/hJgQwyKh/7.png",
  "The-celebration-hour": "https://i.ibb.co/d4kXZ1dz/5.png",
  "Christmas Eve": "https://i.ibb.co/Qjdh7xSq/1.png",
  "The-Upside-down": "https://i.ibb.co/fdz2CzT2/2.png",
  "Dreamy-Soft-hues": "https://i.ibb.co/V0hCqKjK/9.png",
  "boho-bloom": "https://i.ibb.co/nsd95ZHH/12.png",
  "starry-celestial": "https://i.ibb.co/Zzv7p2Q4/16.png",
  "tropical-fiesta": "https://i.ibb.co/S49Vrs2W/13.png",
  "Lantern-of-wishes": "https://i.ibb.co/9kkZNC5P/8.png",
  "Coastal_whispers": "https://i.ibb.co/k6MtwYGn/6.png",
  "Purple-letters": "https://i.ibb.co/WWDR0cn6/11.png",
  "Retro_Echoes": "https://i.ibb.co/m5yW4Gkc/4.png",
  "Doodle-Diary": "https://i.ibb.co/My8yMLVW/18.png",
  "Polaroid-days": "https://i.ibb.co/KcnrYZTD/14.png",
  "Shoreline-Echoes": "https://i.ibb.co/4ZPn86SC/15.png",
  "Burnout-Drifts": "https://i.ibb.co/jkH30QDL/17.png",
  "The-Y2K-Crash": "https://i.ibb.co/d0t2LzYx/20.png",
  "Rough-draft-scribbles": "https://i.ibb.co/d025ChWX/10.png",
  "coffee-day": "https://i.ibb.co/fGvZBBVT/21.png",
  "new-year-1": "https://i.ibb.co/pjBwvBDw/22.png",
  "new-year-2": "https://i.ibb.co/tTm4Pnt9/23.png",
  "new-year-3": "https://i.ibb.co/k6xfJ2S2/24.png",
  "gold-black": "https://i.ibb.co/TBjcrRGj/25.png",
   // elite themes
   "elite-sakura-glowscape": "https://i.ibb.co/Tx4vDhkp/39.png",
   "elite-Frosted-Eve": "https://i.ibb.co/sd88mpPL/38.png",
   "elite-Enchanted-Lotusfal": "https://i.ibb.co/S4qNMgRJ/40.png",
   "elite-Golden-Luxe": "https://i.ibb.co/dwRr9bcD/41.png",
   "elite-Cosmic-Reverie": "https://i.ibb.co/Txz8s53P/42.png",
   "elite-love-bloom": "https://i.ibb.co/trxgSGb/43.png"
};

export function MemoryCard({
  memory,
  themeId,
  onOpenMemory,
  onOpenReactions,
  isOwner = false
}: MemoryCardProps) {
  const pin = themePins[themeId];
  const [isPinned, setIsPinned] = useState(!!memory.is_pinned);
  const [loading, setLoading] = useState(false);
  
  const [commentsOpen, setCommentsOpen] = useState(false);

  const isElite = themeId.startsWith("elite-");

  const handlePinToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setLoading(true);
      const res = await togglePin(memory.memory_id, !isPinned);
      setIsPinned(res?.memory?.is_pinned ?? !isPinned);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center card-sway card-swing">
      {!commentsOpen && pin && (
        <img
          src={pin}
          alt="pin"
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-11 h-11 z-20 pointer-events-none"
        />
      )}

      {!commentsOpen && isPinned && (
        <div className="absolute top-2 left-2 z-30 text-sm">📌</div>
      )}

      {!commentsOpen && isOwner && (
        <button
          onClick={handlePinToggle}
          disabled={loading}
          className="absolute top-2 right-2 z-30 text-xs bg-black/70 text-white px-2 py-1 rounded"
        >
          {isPinned ? "Unpin" : "Pin"}
        </button>
      )}

      <div
        onClick={onOpenMemory}
        role="button"
        className="
          relative
          w-full
          min-h-[250px]
          rounded-[14px]
          overflow-hidden
          text-left
          cursor-pointer
          backdrop-blur
          transerancy -0.25
        "
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          boxShadow: "var(--card-shadow)",
          
          /* ✅ FIX: Force card to use the Theme Text Color */
          color: "var(--text-color)"
        }}
      >
        {memory.photo_url && (
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={memory.photo_url}
              alt={memory.contributor_name}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-3 space-y-1">
          {/* ✅ UPDATED: Use opacity instead of fixed color so it inherits the theme color */}
          <p className="text-xs uppercase tracking-widest opacity-75 font-semibold">
            {memory.contributor_name}
          </p>
          
          {/* ✅ UPDATED: Removed 'text-slate-900' so it inherits var(--text-color) */}
          <p className="text-sm line-clamp-2">
            {memory.message}
          </p>
        </div>

        <ReactionBar
          memoryId={memory.memory_id}
          initialReactions={memory.reactions}
          isElite={isElite}
        />

        {isElite && (
          <div className="px-3 pb-3 flex justify-between items-center">
            {/* Pass text color to preview so it matches */}
            <CommentsPreview 
              memoryId={memory.memory_id} 
              onOpenChange={setCommentsOpen}
              textColor="var(--text-color)"
            />
          </div>
        )}
      </div>
    </div>
  );
}