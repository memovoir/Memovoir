"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Memory } from "./MemoryCard";
import { normalizeEmoji } from "../utils/emoji";



const ALL_EMOJIS = [
  "❤️",
  "😭",
  "🥳",
  "🤗",
  "🫶🏼",
  "👻",
  "😂",
  "☺️",
  "🫂",
  "💋",
  "✨",
  "💗",
  "🎊",
  "🎉",
  "😍",
  "🥹",
  "😊",
  "🫠",
  "😘",
  "🥰",
  "😇",
  "😜",
  "😎",
  "🤩",
  "😌",
  "😉",
  "🙂‍↕️"
];

interface ReactionPickerProps {
  open: boolean;
  memory: Memory | null;
  onClose: () => void;
  onReact: (emoji: string) => Promise<void> | void;
}

export default function ReactionPicker({
  open,
  memory,
  onClose,
  onReact
}: ReactionPickerProps) {
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
          <motion.div
            className="relative max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-[0_20px_60px_rgba(15,23,42,0.45)]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 170, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                React to memory
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-[11px] px-2 py-1 rounded-full bg-white/70 border border-slate-200 text-slate-600 hover:bg-white"
              >
                Close
              </button>
            </div>

            <p className="text-sm text-slate-800 line-clamp-2 mb-4">
              {memory.message}
            </p>

            {/* Emoji grid */}
            <div className="grid grid-cols-6 gap-2 text-xl">
              {ALL_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className="flex items-center justify-center rounded-2xl bg-white/80 hover:bg-white shadow-sm py-2"
                  onClick={async () => {
                    await onReact(normalizeEmoji(emoji));
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
