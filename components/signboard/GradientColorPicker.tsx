"use client";

import { useRef, useEffect } from "react";

export default function GradientColorPicker({
  onSelect
}: {
  onSelect: (color: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const { width, height } = canvas;

    // Horizontal rainbow
    const hue = ctx.createLinearGradient(0, 0, width, 0);
    hue.addColorStop(0, "red");
    hue.addColorStop(0.17, "orange");
    hue.addColorStop(0.34, "yellow");
    hue.addColorStop(0.51, "green");
    hue.addColorStop(0.68, "cyan");
    hue.addColorStop(0.85, "blue");
    hue.addColorStop(1, "magenta");

    ctx.fillStyle = hue;
    ctx.fillRect(0, 0, width, height);

    // Vertical shade
    const shade = ctx.createLinearGradient(0, 0, 0, height);
    shade.addColorStop(0, "rgba(255,255,255,1)");
    shade.addColorStop(0.5, "rgba(255,255,255,0)");
    shade.addColorStop(1, "rgba(0,0,0,1)");

    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, width, height);
  }, []);

  const pick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d")!;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pixel = ctx.getImageData(x, y, 1, 1).data;

    onSelect(`rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`);
  };

  return (
    <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-white rounded-xl p-2 shadow-xl">
      <canvas
        ref={canvasRef}
        width={180}
        height={120}
        onClick={pick}
        className="rounded-lg cursor-crosshair"
      />
    </div>
  );
}
