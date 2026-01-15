"use client";

import { useState } from "react";
import { useSignboard } from "./SignboardContext";
import GradientColorPicker from "./GradientColorPicker";

interface ToolbarProps {
  wallId: string;
}

export function Toolbar({ wallId }: ToolbarProps) {
  const {
    strokes,
    undo,
    redo,
    clearBoard,
    setTool,
    setColor,
    tool,
    color
  } = useSignboard();

  const [showPicker, setShowPicker] = useState(false);

  return (
    <div
      className="
        relative
        flex items-center gap-3
        rounded-full
        bg-white/95
        px-4 py-2
        shadow-xl
        backdrop-blur
        z-50
      "
    >
      <Tool
        label="Pen"
        active={tool === "pen"}
        onClick={() => setTool("pen")}
      />

      <Tool
        label="Eraser"
        active={tool === "eraser"}
        onClick={() => setTool("eraser")}
      />

      {/* 🎨 Color Picker Button */}
      <div className="relative">
          <button
            onClick={() => setShowPicker((v) => !v)}
            className="w-7 h-7 rounded-full border-2 border-black block"
            style={{ backgroundColor: color }}
          />

          {/* ✅ FIX 5: Absolute positioning for the picker popup */}
          {showPicker && (
            <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 z-[100]">
                <GradientColorPicker
                onSelect={(c) => {
                    setColor(c);
                    setShowPicker(false);
                }}
                />
            </div>
          )}
      </div>

      <Divider />

      <Tool label="Undo" onClick={undo} />
      <Tool label="Redo" onClick={redo} />

      <Divider />

      <Tool label="Clear" onClick={clearBoard} />

      <Tool
        label="Save"
        onClick={async () => {
          try {
            await saveBoard(wallId, strokes);
            alert("Signboard saved ✅");
          } catch (err) {
            alert("Save failed. Try again.");
          }
        }}
      />
    </div>
  );
}

/* ---------------- helpers ---------------- */

async function saveBoard(wallId: string, strokes: any[]) {
  try {
    const res = await fetch("/api/signboard/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wall_id: wallId,
        strokes
      })
    });

    if (!res.ok) {
      const t = await res.text();
      console.error("Save failed:", t);
      alert("Save failed. Try again.");
      return;
    }
    alert("Signboard saved ✅");
  } catch (err) {
    console.error("Save error:", err);
  }
}

function Tool({
  label,
  onClick,
  active,
  disabled
}: {
  label: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 py-1.5
        text-xs
        font-medium
        rounded-full
        transition
        ${
          active
            ? "bg-black text-white"
            : "bg-black/70 text-white hover:bg-black"
        }
        disabled:opacity-40
      `}
    >
      {label}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-4 bg-black/30" />;
}