"use client";

import { useState } from "react";

export interface CommentItem {
  comment_id: string;
  memory_id: string;
  name: string;
  comment: string;
  created_at: string;
}

interface Props {
  open: boolean;
  comments: CommentItem[];
  onClose: () => void;
  onAdd: (name: string, comment: string) => Promise<void>;
}

export default function CommentsModal({
  open,
  comments,
  onClose,
  onAdd,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  if (!open) return null;

  const submit = async () => {
    if (!text.trim()) return;
    setPosting(true);
    await onAdd(name || "Anonymous", text);
    setText("");
    setName("");
    setPosting(false);
    setShowForm(false);
  };

  return (
    // MAIN CONTAINER
    // absolute inset-0: Fills the card completely
    // h-full: Ensures it knows its height
    // z-50: Sits on top of everything in the card
    <div 
      className="absolute inset-0 z-50 bg-[#fbfbfb] text-black flex flex-col h-full w-full rounded-[14px] overflow-hidden"
      onClick={(e) => e.stopPropagation()} 
    >
      
      {/* 1. HEADER (Fixed Height) */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-white shadow-sm shrink-0">
        <h2 className="text-sm font-bold uppercase tracking-wide">Comments</h2>
        <button 
          onClick={(e) => {
             e.stopPropagation();
             onClose();
          }} 
          className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-full w-6 h-6 flex items-center justify-center transition"
        >
          ✕
        </button>
      </div>

      {/* 2. LIST (Flexible Height) 
          min-h-0 is CRITICAL: It tells Flexbox "you are allowed to shrink this div if space runs out" 
      */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar min-h-0 bg-gray-50/50">
        {comments.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 text-xs italic">
            <p>No comments yet.</p>
            <p>Say something nice!</p>
          </div>
        ) : (
          comments.map((c) => (
            <div
              key={c.comment_id}
              className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm text-sm"
            >
              <strong className="block text-gray-800 text-xs mb-1 uppercase tracking-wider">{c.name}</strong>
              <p className="text-gray-600 leading-snug">{c.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* 3. FOOTER (Fixed Height, Stays at Bottom) */}
      <div className="p-3 bg-white border-t border-gray-200 shrink-0 z-10 relative">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full py-2.5 rounded-lg bg-black text-white text-xs font-bold uppercase tracking-wide hover:bg-gray-800 transition shadow-lg"
          >
            + Add Comment
          </button>
        ) : (
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name (optional)"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:border-black transition bg-gray-50"
            />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-14 text-xs focus:outline-none focus:border-black transition resize-none bg-gray-50"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-1.5 rounded-md border border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={posting}
                className="flex-1 py-1.5 rounded-md bg-black text-white text-xs font-medium hover:bg-gray-800 disabled:opacity-50"
              >
                {posting ? "..." : "Post"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}