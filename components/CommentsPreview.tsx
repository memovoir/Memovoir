"use client";

import { useEffect, useState } from "react";
import CommentsModal, { CommentItem } from "./CommentsModal";

interface Props {
  memoryId: string;
  textColor?: string;
  // New prop to notify parent when modal opens/closes
  onOpenChange?: (isOpen: boolean) => void;
}

export default function CommentsPreview({
  memoryId,
  textColor = "#111",
  onOpenChange
}: Props) {
  const [latest, setLatest] = useState<CommentItem | null>(null);
  const [all, setAll] = useState<CommentItem[]>([]);
  const [open, setOpen] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `/api/comments/list?memory_id=${memoryId}`
      );
      if (res.ok) {
        const data = await res.json();
        const comments: CommentItem[] = data.comments ?? [];
        setAll(comments);
        setLatest(comments.length ? comments[comments.length - 1] : null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [memoryId]);

  const handleAdd = async (name: string, comment: string) => {
    const res = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memory_id: memoryId,
        name,
        comment,
      }),
    });

    if (res.ok) {
      await fetchComments();
    }
  };

  // Helper to sync state with parent
  const handleToggle = (newState: boolean) => {
    setOpen(newState);
    if (onOpenChange) onOpenChange(newState);
  };

  return (
    <div
      className="mt-2 flex items-center gap-2 w-full"
      style={{ color: textColor }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 1. BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleToggle(true);
        }}
        className="text-[13px] text-slate-500 font-medium whitespace-nowrap hover:text-black transition flex-shrink-0"
      >
        Comments 💬
      </button>

      {/* 2. PREVIEW TEXT (Visible only when closed) */}
      {!open && latest && (
        <span 
          className="text-[11px] text-slate-400 truncate max-w-[140px] cursor-pointer hover:text-slate-600 transition"
          onClick={(e) => {
            e.stopPropagation();
            handleToggle(true);
          }}
        >
          <span className="font-bold text-slate-500">{latest.name}:</span> {latest.comment}
        </span>
      )}

      {/* 3. MODAL */}
      <CommentsModal
        open={open}
        comments={all}
        onClose={() => handleToggle(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}