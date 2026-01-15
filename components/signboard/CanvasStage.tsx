"use client";

import React, {
  useRef,
  useEffect,
  useState,
  forwardRef
} from "react";
import { useSignboard } from "./SignboardContext";
import { nanoid } from "nanoid";

type CanvasStageProps = {
  wallId: string;
};

// 🔒 STRICT DIMENSIONS
const BOARD_WIDTH = 1644;
const BOARD_HEIGHT = 895;

export const CanvasStage = forwardRef<
  HTMLCanvasElement,
  CanvasStageProps
>(function CanvasStage({ wallId }, forwardedRef) {
  const internalRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef =
    (forwardedRef as React.MutableRefObject<HTMLCanvasElement | null>) ??
    internalRef;

  const { strokes, addStroke, tool, color, loadStrokes } = useSignboard();
  const [current, setCurrent] = useState<any>(null);

  useEffect(() => {
    if (!wallId) return;
    loadStrokes(wallId); 
  }, [wallId]);

  /* -------- Resize + Redraw -------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    (window as any).__SIGNBOARD_CANVAS__ = canvas;

    // 1. Set internal resolution
    canvas.width = BOARD_WIDTH;
    canvas.height = BOARD_HEIGHT;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    strokes.forEach((s: any) => drawStroke(ctx, s));
    if (current) drawStroke(ctx, current);
  }, [strokes, current]);

  /* -------- Pointer Handlers -------- */
  const start = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    (e.target as Element).setPointerCapture(e.pointerId);

    const p = getCanvasPoint(e, canvas);
    setCurrent({
      id: nanoid(),
      tool,
      color,
      width: tool === "eraser" ? 16 : 3,
      points: [p]
    });
  };

  const move = (e: React.PointerEvent) => {
    if (!current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const p = getCanvasPoint(e, canvas);
    setCurrent((c: any) => ({
      ...c,
      points: [...c.points, p]
    }));
  };

  const end = (e: React.PointerEvent) => {
    (e.target as Element).releasePointerCapture(e.pointerId);
    if (current) addStroke(current);
    setCurrent(null);
  };

  return (
    // 1. GLOBAL WRAPPER: Centers the board, ignores clicks elsewhere
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
      
      {/* 2. THE CROP BOX (MASK):
             - overflow-hidden: THE KEY FIX. Cuts off any ink that goes outside.
             - pointer-events-auto: Re-enables clicking ONLY inside this box.
             - border: A subtle guide (remove border-white/40 if you want invisible edges)
      */}
      <div
        style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT }}
        className="
          relative 
          overflow-hidden 
          pointer-events-auto 
          border-2 border-white/40 
          bg-transparent
        "
      >
        <canvas
          ref={canvasRef}
          width={BOARD_WIDTH}
          height={BOARD_HEIGHT}
          style={{ 
            width: "100%", 
            height: "100%", 
            display: "block",
            cursor: "crosshair"
          }}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
        />
      </div>
    </div>
  );  
});

/* ---------------- HELPERS ---------------- */

function drawStroke(ctx: CanvasRenderingContext2D, s: any) {
  ctx.save();

  if (s.tool === "eraser") {
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "rgba(0,0,0,1)";
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = s.color;
  }

  ctx.lineWidth = s.width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  s.points.forEach((p: any, i: number) =>
    i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
  );
  ctx.stroke();

  ctx.restore();
}

function getCanvasPoint(
  e: React.PointerEvent,
  canvas: HTMLCanvasElement
) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY
  };
}