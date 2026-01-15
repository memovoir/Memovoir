"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Memory } from "./MemoryCard";

interface MemoryPopupProps {
  open: boolean;
  memory: Memory | null;
  onClose: () => void;
}

export function MemoryPopup({ open, memory, onClose }: MemoryPopupProps) {
  if (!memory) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* POPUP CONTAINER */}
          <motion.div
            className="
              relative 
              flex flex-col /* Establishes a column layout */
              w-full max-w-xl 
              max-h-[90vh] 
              /* Removed overflow-y-auto from here, added overflow-hidden */
              overflow-hidden
              rounded-3xl 
              /* Removed padding from here, moved to content wrapper */
              bg-white/40
              backdrop-blur-xl
              border border-white/50 
              shadow-[0_15px_60px_rgba(0,0,0,0.25)]
            "
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 16 }}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* 1. CLOSE BUTTON (Fixed/Absolute)
               This sits ON TOP of the scroll view. 
               z-50 ensures it's always clickable.
            */}
            <div className="absolute top-4 right-5 z-50">
              <button
                type="button"
                onClick={onClose}
                className="
                  text-xs text-slate-700 hover:text-slate-900 font-medium
                  bg-white/80 backdrop-blur-md 
                  border border-white/40 
                  rounded-full px-3 py-1.5 shadow-md
                  hover:bg-white transition
                "
              >
                Close
              </button>
            </div>

            {/* 2. SCROLLABLE CONTENT AREA 
               This takes up the remaining space and handles scrolling.
               p-6 applies the padding inside the scroll view.
               pt-12 ensures top content doesn't get hidden behind the close button.
            */}
            <div className="overflow-y-auto p-6 pt-14 space-y-4 h-full custom-scrollbar">

              {/* ⭐ DYNAMIC IMAGE ⭐ */}
              {memory.photo_url && (
                <div
                  className="
                    relative 
                    w-full 
                    /* Reduced max-h slightly to ensure text is reachable on small screens */
                    max-h-[60vh] 
                    overflow-hidden 
                    rounded-[24px] 
                    flex items-center justify-center
                    
                    bg-white/20            
                    backdrop-blur-md       
                    border border-white/30 
                  "
                >
                  <Image
                    src={memory.photo_url}
                    alt={memory.contributor_name || 'Memory photo'}
                    width={800}
                    height={1000}
                    className="object-contain w-auto h-auto max-h-[60vh]"
                  />
                </div>
              )}

              {/* TEXT AREA */}
              <div className="space-y-2 pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                  {memory.contributor_name || "Someone special"}
                </p>

                <p className="text-sm text-slate-900 whitespace-pre-wrap leading-relaxed">
                  {memory.message}
                </p>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}