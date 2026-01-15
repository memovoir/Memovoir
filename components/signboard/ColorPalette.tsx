"use client";

const COLORS = [
  "#000000", // black
  "#ffffff", // white
  "#ff0000",
  "#ff7a00",
  "#ffd400",
  "#00c853",
  "#00b0ff",
  "#2962ff",
  "#aa00ff",
  "#ff4081"
];

export function ColorPalette({
  onSelect
}: {
  onSelect: (color: string) => void;
}) {
  return (
    <div
      className="
        absolute top-12 left-1/2 -translate-x-1/2
        grid grid-cols-5 gap-2
        p-3
        rounded-xl
        bg-white/95
        shadow-xl
        backdrop-blur
        z-40
      "
    >
      {COLORS.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className="w-6 h-6 rounded-full border border-black/20"
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  );
}
