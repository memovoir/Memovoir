// components/ReactionBar.tsx
"use client";

import { useState, useMemo } from "react";
import { normalizeEmoji } from "../utils/emoji";
import { useEmojiBurst } from "./Reactions/useEmojiBurst"; // ✅ FIXED PATH

type ReactionsMap = Record<string, number>;

interface ReactionBarProps {
  memoryId: string;
  initialReactions?: ReactionsMap | null;
  isElite?: boolean; // ✅ elite flag
}

const ALL_EMOJIS = [
  "❤️","😭","🥳","🤗","🫶🏼","👻","😂","☺️","🫂","💋","✨","💗",
  "🎊","🎉","😍","🥹","😊","🫠","😘","🥰","😇","😜","😎",
  "🤩","😌","😉","🙂‍↕️"
];

const VISIBLE_EMOJIS = ["❤️", "😂", "🥹", "🎉", "😍"];

export function ReactionBar({
  memoryId,
  initialReactions,
  isElite = false
}: ReactionBarProps) {

  const [reactions, setReactions] = useState<ReactionsMap>(
    initialReactions ?? {}
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [pendingEmoji, setPendingEmoji] = useState<string | null>(null);

  // ✅ hook activated ONLY for elite
  const { trigger } = useEmojiBurst(isElite);

  const activeChips = useMemo(
    () =>
      Object.entries(reactions)
        .map(([emoji, count]) => ({ emoji, count }))
        .filter((r) => r.count > 0),
    [reactions]
  );

  const othersCount = ALL_EMOJIS.length - VISIBLE_EMOJIS.length;

  const handleReact = async (
    emoji: string,
    e?: React.MouseEvent
  ) => {
    try {
      // ✅ emoji burst BEFORE API call
      if (e && isElite) {
        trigger(emoji, e.clientX, e.clientY);
      }

      setPendingEmoji(emoji);

      const res = await fetch("/api/memories/react", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memory_id: memoryId,
          emoji: normalizeEmoji(emoji)
        })
      });

      if (!res.ok) {
        console.error("Failed to react");
        return;
      }

      const data = (await res.json()) as { reactions: ReactionsMap };
      setReactions(data.reactions ?? {});
      setPickerOpen(false);
      setShowAll(false);
    } catch (err) {
      console.error(err);
    } finally {
      setPendingEmoji(null);
    }
  };

  return (
    <div
      className="mt-1 px-3 pb-3 flex items-center justify-between text-xs"
      onClick={(e) => e.stopPropagation()}
    >
      {/* ACTIVE REACTIONS */}
      <div className="flex flex-wrap gap-1">
        {activeChips.map((r) => (
          <div
            key={r.emoji}
            className="inline-flex items-center gap-1 px-2 py-[2px] rounded-full bg-black/5 text-[11px] text-slate-700"
          >
            <span>{r.emoji}</span>
            <span className="font-medium">{r.count}</span>
          </div>
        ))}
      </div>

      {/* PICKER */}
      <div className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setPickerOpen((p) => !p);
            setShowAll(false);
          }}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-base"
        >
          ➕
        </button>

        {pickerOpen && (
          <div className="absolute bottom-9 right-0 flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 rounded-full bg-white/90 shadow-lg border border-black/5 px-2 py-1">
              {VISIBLE_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className={`h-7 w-7 flex items-center justify-center rounded-full hover:bg-black/5 text-base ${
                    pendingEmoji === emoji ? "opacity-60" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReact(emoji, e);
                  }}
                >
                  {emoji}
                </button>
              ))}

              {othersCount > 0 && (
                <button
                  type="button"
                  className="text-[11px] px-2 py-[3px] rounded-full bg-black/5 hover:bg-black/10 font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAll((p) => !p);
                  }}
                >
                  +{othersCount}
                </button>
              )}
            </div>

            {showAll && (
              <div className="rounded-2xl bg-white/95 border border-black/5 shadow-xl p-2 grid grid-cols-7 gap-1">
                {ALL_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className={`h-7 w-7 flex items-center justify-center rounded-full hover:bg-black/5 text-base ${
                      pendingEmoji === emoji ? "opacity-60" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReact(emoji, e);
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
