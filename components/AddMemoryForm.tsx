"use client";

import { useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface AddMemoryFormProps {
  wallId: string;
  onAdded: () => Promise<void> | void;
  isElite: boolean;
}

export function AddMemoryForm({
  wallId,
  onAdded,
  isElite
}: AddMemoryFormProps) {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  // REMOVED: const [relationship, setRelationship] = useState(""); 
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: ""
  });

  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = (msg: string) => {
    setToast({ visible: true, message: msg });

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2500);
  };

  /* MESSAGE LIMIT — 1280 */
  const handleMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const limit = 1280;

    if (value.length > limit) {
      showToast("Character limit reached (1280).");
      setMessage(value.slice(0, limit));
    } else {
      setMessage(value);
    }
  };

  /* SINGLE IMAGE ONLY */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      setFile(null);
      return;
    }

    if (files.length > 1) {
      showToast("Only one image can be uploaded.");
      e.target.value = "";
      setFile(null);
      return;
    }

    const selected = files[0];

    if (!selected.type.startsWith("image/")) {
      showToast("Only image files are allowed.");
      e.target.value = "";
      setFile(null);
      return;
    }

    setFile(selected);
  };

  /* SUBMIT — NAME REQUIRED */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast("Please enter your name.");
      return;
    }

    if (!message.trim()) {
      showToast("Message cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("wall_id", wallId);
      fd.append("contributor_name", name.trim());
      // REMOVED: fd.append("relationship", relationship.trim());
      fd.append("message", message.trim());
      if (file) fd.append("photo", file);

      const res = await fetch("/api/memories/add", {
        method: "POST",
        body: fd
      });

      if (!res.ok) {
        showToast("Failed to save memory.");
        return;
      }

      setName("");
      // REMOVED: setRelationship("");
      setMessage("");
      setFile(null);
      setOpen(false);
      await onAdded();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FIXED BUTTON GROUP */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-30 flex items-center gap-3">

        {/* SIGNBOARD BUTTON — ELITE ONLY */}
        {isElite && (
          <button
            type="button"
            onClick={() =>
              router.push(`/wall/${params.wall_id}/sign`)
            }
            className="
              w-11 h-11
              rounded-full
              bg-white/50
              hover:bg-white
              shadow-lg
              transition
              flex items-center justify-center
            "
          >
            <img
              src="https://i.ibb.co/7xQCyCXs/Untitled-design-3.png"
              alt="Sign the wall"
              className="w-5 h-5 object-contain"
            />
          </button>
        )}

        {/* ADD MEMORY BUTTON */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            rounded-full
            bg-[var(--accent)]
            text-[var(--text-color)]
            px-5 py-2.5
            text-sm font-semibold
            shadow-lg shadow-[var(--accent)]/40
            hover:translate-y-[-1px]
            transition
          "
        >
          + Add Memory
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 p-5 space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-semibold text-slate-900">
                Add a Memory
              </h2>
              <button
                className="text-xs"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name *"
                className="
                  w-full rounded-full
                  bg-white/90
                  text-slate-900
                  placeholder-slate-500
                  px-4 py-2 text-sm
                  outline-none
                  focus:ring-2 focus:ring-[var(--accent)]/60
                "
              />

              {/* REMOVED: Relationship Input Field */}

              <textarea
                value={message}
                onChange={handleMessageChange}
                rows={4}
                placeholder="Your message"
                className="
                  w-full rounded-2xl
                  bg-white/90
                  text-slate-900
                  placeholder-slate-500
                  px-4 py-2 text-sm
                  resize-none
                  outline-none
                  focus:ring-2 focus:ring-[var(--accent)]/60
                "
              />

              <p className="text-[10px] text-slate-600 text-right">
                {message.length}/1280
              </p>

              {/* FILE INPUT */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-xs text-slate-700 file:mr-3 file:rounded-full file:border-0 file:bg-white/80 file:px-3 file:py-1.5 file:text-xs file:text-slate-900"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[var(--accent)] py-2 font-semibold"
              >
                {loading ? "Saving..." : "Save Memory"}
              </button>
            </form>
          </div>
        </div>
      )}

      {toast.visible && (
        <div className="toast-root">
          <div className="toast-glass">
            ⚠️ {toast.message}
          </div>
        </div>
      )}
    </>
  );
}