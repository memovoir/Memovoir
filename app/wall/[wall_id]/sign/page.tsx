"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignboardProvider } from "@/components/signboard/SignboardContext";
import { SignboardShell } from "@/components/signboard/SignboardShell";
import { Toolbar } from "@/components/signboard/Toolbar";
import { CanvasStage } from "@/components/signboard/CanvasStage";
import { themes, getThemeById } from "@/themes/themes"; 

export default function SignPage({
  params
}: {
  params: Promise<{ wall_id: string }>;
}) {
  const { wall_id } = use(params);
  const router = useRouter();
  const [themeId, setThemeId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/walls/${wall_id}`);
      if (!res.ok) return;
      const data = await res.json();
      setThemeId(data.theme);
    })();
  }, [wall_id]);

  if (!themeId) return null;

  // Use the helper to get the EXACT theme
  const currentTheme = getThemeById(themeId);
  const bgUrl = currentTheme.signBackgroundImage || currentTheme.backgroundImage || "https://i.ibb.co/fallback-signboard.png";

  /* ---------- Download PNG ---------- */
  const handleDownload = async () => {
    const canvas = (window as any).__SIGNBOARD_CANVAS__ as HTMLCanvasElement;
    if (!canvas) {
      alert("Canvas not ready");
      return;
    }

    const WIDTH = 1644; 
    const HEIGHT = 895;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = WIDTH;
    exportCanvas.height = HEIGHT;

    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    const bg = new Image();
    bg.crossOrigin = "anonymous";
    bg.src = bgUrl;

    await new Promise<void>((resolve, reject) => {
      bg.onload = () => resolve();
      bg.onerror = () => reject();
    });

    // 1. Draw Background
    ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT);

    // 2. (Removed) Draw "White Glass Box" - You requested transparent!
    // ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    // ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // 3. Draw Strokes
    ctx.drawImage(canvas, 0, 0, WIDTH, HEIGHT);

    const link = document.createElement("a");
    link.download = "signboard.png";
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
  };

  /* ---------- RENDER ---------- */
  return (
    <SignboardProvider>
      
      {/* LAYER 1: Background & Canvas */}
      <SignboardShell backgroundImage={bgUrl}>
          <CanvasStage wallId={wall_id} />
      </SignboardShell>

      {/* LAYER 2: UI Overlay */}
      
      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="fixed top-6 right-6 z-[9999] rounded-full bg-white/90 text-black px-4 py-2 text-xs font-semibold shadow-xl hover:bg-white transition"
      >
        Download PNG
      </button>

      {/* Toolbar - Top Center */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999]">
         <Toolbar wallId={wall_id} />
      </div>

      {/* Back Button */}
      <button
        onClick={() => {
          sessionStorage.setItem(`wall-auth-${wall_id}`, "true");
          router.push(`/wall/${wall_id}`);
        }}
        className="fixed bottom-6 right-6 z-[9999] rounded-full bg-white/90 text-black px-5 py-2 text-sm italic font-medium shadow-xl hover:bg-white transition"
      >
        ← Back to wall
      </button>

    </SignboardProvider>
  );
}