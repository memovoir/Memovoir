"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { Memory } from "./MemoryCard";
import { getThemeById } from "@/themes/themes"; // adjust path if needed


interface SlideshowModalProps {
  open: boolean;
  memories: Memory[];
  currentIndex: number;
  onClose: () => void;
  onChangeIndex: (next: number) => void;
  themeId: string;
}


/* -------------------------
      MAIN COMPONENT
-------------------------- */
export function SlideshowModal({
  open,
  memories,
  currentIndex,
  onClose,
  onChangeIndex,
  themeId
}: SlideshowModalProps) {
  const memory = memories[currentIndex];
  const theme = getThemeById(themeId);

  const isFrosted = theme.slideshow?.frosted ?? false;
  const isAutoplay = theme.slideshow?.autoplay ?? false;


  /* -------------------------
          AUTOPLAY
  -------------------------- */
  useEffect(() => {
    if (!open || !isAutoplay) return;

    const id = setInterval(() => {
      onChangeIndex((currentIndex + 1) % memories.length);
    }, 3000);

    return () => clearInterval(id);
  }, [open, currentIndex, memories.length, isAutoplay, onChangeIndex]);

  if (!open || !memory) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center px-4
                   bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* FRAME */}
        <motion.div
          className={`
            relative max-w-3xl w-full overflow-hidden rounded-3xl 
            ${isFrosted 
                ? "bg-white/45 backdrop-blur-xl border border-white/50 shadow-2xl" 
                : "bg-black/70 backdrop-blur-lg border border-white/10 shadow-2xl"
            }
          `}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >

          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/20">
            <span className={`text-xs font-medium ${
              isFrosted ? "text-slate-700" : "text-white"
            }`}>
              Slideshow
            </span>

            <button
              onClick={onClose}
              className={`text-xs ${isFrosted ? "text-slate-700" : "text-slate-300"} hover:opacity-70`}
            >
              Close
            </button>
          </div>

          {/* PROGRESS BAR FOR AUTOPLAY MODE */}
          {isAutoplay && (
            <div className="h-1 bg-white/10 w-full overflow-hidden">
              <motion.div
                key={currentIndex}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
                className="h-full bg-white"
              />
            </div>
          )}

          {/* IMAGE — FIXED AUTO SCALE */}
          {memory.photo_url && (
  <div className="relative w-full h-[360px] bg-black/10 flex items-center justify-center">
    <Image
      src={memory.photo_url}
      alt="memory"
      fill
      className="object-contain"
    />
  </div>
          )}

          {/* TEXT CONTENT — SCROLLABLE */}
          <div className="px-6 py-4 text-center space-y-2 max-h-[260px] overflow-y-auto">
            <p
    className={`text-xs uppercase tracking-[0.2em] font-semibold ${
      isFrosted ? "text-slate-600" : "text-slate-200"
    }`}
  >
    {memory.contributor_name || "Someone special"}
            </p>

            <p
              className={`text-sm whitespace-pre-wrap leading-relaxed ${
                isFrosted ? "text-slate-700" : "text-slate-100"
              }`}
            >
              {memory.message}
            </p>
          </div>
            
          {/* FOOTER */}
          <div className="flex items-center justify-between px-6 pb-6">
            <button
              onClick={() =>
                onChangeIndex((currentIndex - 1 + memories.length) % memories.length)
              }
              className="px-3 py-1.5 text-xs rounded-full bg-white/20 text-white hover:bg-white/30"
            >
              Prev
            </button>

            <span className={isFrosted ? "text-slate-700 text-xs" : "text-white/70 text-xs"}>
              {currentIndex + 1} / {memories.length}
            </span>

            <button
              onClick={() => onChangeIndex((currentIndex + 1) % memories.length)}
              className="px-3 py-1.5 text-xs rounded-full bg-white/20 text-white hover:bg-white/30"
            >
              Next
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
