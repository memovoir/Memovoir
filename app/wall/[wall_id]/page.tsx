"use client";

import { use } from "react";
import { useEffect, useState, useCallback } from "react";
import { getThemeById, type Theme } from "@/themes/themes";
import { ThemeWrapper } from "@/components/ThemeWrapper";
import { MemoryGrid } from "@/components/MemoryGrid";
import type { Memory } from "@/components/MemoryCard";
import { AddMemoryForm } from "@/components/AddMemoryForm";
import { SlideshowModal } from "@/components/SlideshowModal";
import { PdfDownloadButton } from "@/components/PdfDownloadButton";
import { MemoryPopup } from "@/components/MemoryPopup";
import ReactionPicker from "@/components/ReactionPicker";
import { HiddenPrintLayer } from "@/components/HiddenPrintLayer";

const isEliteTheme = (theme: Theme) =>
  Boolean(theme.backgroundVideo);

/* ---------------- TEXT COLOR FALLBACK ---------------- */
const getTextColor = (theme: Theme): "black" | "white" => {
  if (!theme.card?.background) return "black";

  const bg = theme.card.background.replace("#", "");
  const r = parseInt(bg.substring(0, 2), 16);
  const g = parseInt(bg.substring(2, 4), 16);
  const b = parseInt(bg.substring(4, 6), 16);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 160 ? "black" : "white";
};

export default function WallPage({
  params
}: {
  params: Promise<{ wall_id: string }>;
}) {
  const { wall_id } = use(params);

  const [wall, setWall] = useState<any>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [authorized, setAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [checking, setChecking] = useState(false);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);
  const [slideshowOpen, setSlideshowOpen] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [reactionPickerOpen, setReactionPickerOpen] = useState(false);
  const [reactionMemory, setReactionMemory] = useState<Memory | null>(null);

  /* LOAD WALL */
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/walls/${wall_id}`);
      if (!res.ok) return;

      const data = await res.json();
      setWall(data);
      setTheme(getThemeById(data.theme));

      const authed = sessionStorage.getItem(`wall-auth-${wall_id}`);
      if (authed === "true") {
        setAuthorized(true);
        await loadMemories();
      }
    })();
  }, [wall_id]);

  const loadMemories = useCallback(async () => {
    const res = await fetch(`/api/memories/list?wall_id=${wall_id}`);
    if (!res.ok) return;
    const data = await res.json();
    setMemories(data.memories ?? []);
  }, [wall_id]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    try {
      const res = await fetch("/api/walls/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wall_id, password: passwordInput })
      });
      if (!res.ok) return;
      sessionStorage.setItem(`wall-auth-${wall_id}`, "true");
      setAuthorized(true);
      await loadMemories();
    } finally {
      setChecking(false);
    }
  };

  const handleOpenSlideshow = () => {
    if (!memories.length) return;
    setSlideshowIndex(0);
    setSlideshowOpen(true);
  };

  const handleReact = async (emoji: string) => {
    if (!reactionMemory) return;
    await fetch("/api/memories/react", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memory_id: reactionMemory.memory_id,
        emoji
      })
    });
    await loadMemories();
    setReactionPickerOpen(false);
  };

  if (!theme || !wall) return null;

  /* COLORS */
  const fallbackTextColor = getTextColor(theme);
  const titleColor = theme.titleColor ?? fallbackTextColor;

  /* PASSWORD SCREEN */
  if (!authorized) {
    return (
      <ThemeWrapper theme={theme}>
        <div className="h-screen flex justify-center pt-6">
          <div className="w-full max-w-md h-[460px] bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl flex flex-col">
            <div className="px-8 pt-4 flex flex-col items-center">
              <h1 className="text-xl font-semibold mb-1" style={{ color: titleColor }}>
                Step Into Your Personalized Wall
              </h1>
              <p className="text-xs mb-4" style={{ color: titleColor }}>
                Enter the passcode
              </p>
              <form onSubmit={handleVerify} className="space-y-3 w-full">
                <input
                  type="password"
                  maxLength={6}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••"
                  className="w-full rounded-full bg-black/60 border border-white/20 px-4 py-2 text-sm text-white text-center tracking-widest"
                />
                <button
                  type="submit"
                  disabled={checking}
                  className="w-full rounded-full bg-white text-black py-2 font-medium"
                >
                  {checking ? "Checking..." : "Enter Wall"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </ThemeWrapper>
    );
  }

  /* WALL */
  return (
    <ThemeWrapper theme={theme}>
      <header className="max-w-6xl mx-auto px-4 -mt-10 mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold" style={{ color: titleColor }}>
          {wall.title}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={handleOpenSlideshow}
            className="rounded-full text-xs px-3 py-1.5 backdrop-blur bg-white/15 hover:bg-white text-black"
          >
            Slideshow
          </button>
          
          <PdfDownloadButton containerId="memory-wall-print" title={wall.title} />
        </div>
      </header>

      {/* Main Content with Padding at bottom for Fixed Footer */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <MemoryGrid
          memories={memories}
          themeId={theme.id}
          onOpenMemory={(m) => {
            setActiveMemory(m);
            setPopupOpen(true);
          }}
          onOpenReactions={(m) => {
            setReactionMemory(m);
            setReactionPickerOpen(true);
          }}
        />
      </div>

      <ReactionPicker
        open={reactionPickerOpen}
        memory={reactionMemory}
        onClose={() => setReactionPickerOpen(false)}
        onReact={handleReact}
      />

      <AddMemoryForm
        wallId={wall.wall_id}
        onAdded={loadMemories}
        isElite={isEliteTheme(theme)}
      />

      <MemoryPopup
        open={popupOpen}
        memory={activeMemory}
        onClose={() => setPopupOpen(false)}
      />

      <SlideshowModal
        open={slideshowOpen}
        memories={memories}
        currentIndex={slideshowIndex}
        onClose={() => setSlideshowOpen(false)}
        onChangeIndex={setSlideshowIndex}
        themeId={theme.id}
      />

      {/* ✅ FIXED FOOTER: Centered at bottom, 2 lines */}
      <footer 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 text-center w-full px-4 z-20 pointer-events-none opacity-60"
        style={{ color: titleColor }}
      >
         <p className="text-[9px] font-bold tracking-widest mb-0.5">
           © 2025 MEMOVOIR. All Rights Reserved.
         </p>
         <p className="text-[8px] leading-tight max-w-xl mx-auto">
           All designs, logos, images, and concepts are the intellectual property of MEMOVOIR. Unauthorized use or duplication is strictly prohibited.
         </p>
      </footer>

      <HiddenPrintLayer 
        memories={memories} 
        theme={theme} 
        wallTitle={wall.title} 
      />

      {/* GLOBAL WALL LOGO (Bottom Left) */}
      <img
        src="https://i.ibb.co/8L4fxrFT/M-1-removebg-preview.png"
        alt="Logo"
        className="fixed z-40 opacity-50 pointer-events-none"
        style={{ 
          width: "150px", 
          height: "auto",
          bottom: "-30px", 
          left: "-20px"    
        }}
      />

    </ThemeWrapper>
  );
}