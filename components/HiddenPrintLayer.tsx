"use client";

import type { Theme } from "@/themes/themes";
import type { Memory } from "./MemoryCard";

interface HiddenPrintLayerProps {
  memories: Memory[];
  theme: Theme;
  wallTitle: string;
}

export function HiddenPrintLayer({ memories, theme, wallTitle }: HiddenPrintLayerProps) {
  // 1920x1080 ensures high quality (HD) PDF pages
  const WIDTH = 1920;
  const HEIGHT = 1080;
  const LOGO_URL = "https://i.ibb.co/8L4fxrFT/M-1-removebg-preview.png";

  const bgUrl = theme.backgroundImage || "https://i.ibb.co/fallback.png";

  return (
    <div id="memory-wall-print" className="hidden">

      {/* ==========================
          1. TITLE PAGE
         ========================== */}
      <div
        className="pdf-title-page relative flex flex-col items-center justify-center text-center"
        style={{
          width: WIDTH,
          height: HEIGHT,
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/20 backdrop-blur-xl px-24 py-20 rounded-[60px] border border-white/40 shadow-2xl max-w-5xl mx-auto">
          <h1 className="text-[90px] font-serif font-bold text-white mb-6 drop-shadow-lg leading-tight">
            {wallTitle}
          </h1>
          <div className="h-2 w-48 bg-white/70 mx-auto mb-10 rounded-full" />
          <p className="text-4xl text-white/95 font-medium tracking-widest uppercase">
            A collection of {memories.length} memories
          </p>
        </div>

        {/* LOGO: Pushed further with negative values */}
        <img
          src={LOGO_URL}
          alt="Logo"
          className="absolute z-50 drop-shadow-lg opacity-60"
          style={{ 
            width: "300px", 
            height: "auto",
            bottom: "-30px", // Pushes it further down
            left: "-30px"    // Pushes it further left
          }}
          crossOrigin="anonymous"
        />
      </div>

      {/* ==========================
          2. MEMORY PAGES
         ========================== */}
      {memories.map((memory, i) => (
        <div
          key={memory.memory_id}
          className="pdf-page relative box-border flex items-center justify-center"
          // Padding creates the "Background Border" effect
          style={{
            width: WIDTH,
            height: HEIGHT,
            backgroundImage: `url(${bgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "120px" 
          }}
        >
          {/* CONTENT BOX */}
          <div className="flex w-full h-full bg-white rounded-[30px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/50">

            {/* CONDITIONAL LAYOUT */}
            {memory.photo_url ? (
              <>
                {/* --- LAYOUT A: WITH PHOTO --- */}
                {/* LEFT: Photo (40%) */}
                <div className="w-[40%] h-full relative bg-gray-50 border-r border-gray-100">
                  <img
                    src={memory.photo_url}
                    alt="memory"
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>

                {/* RIGHT: Text (60%) */}
                <div className="w-[60%] h-full p-12 flex flex-col justify-start bg-white text-left">
                  
                  {/* Header */}
                  <div className="mb-6 pb-4 border-b border-gray-100">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Memory From
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 leading-none">
                      {memory.contributor_name}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xl text-gray-700 leading-relaxed font-serif whitespace-pre-wrap">
                      {memory.message}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* --- LAYOUT B: NO PHOTO --- */}
                <div className="w-full h-full p-16 flex flex-col justify-center bg-white text-center">
                   
                   <div className="mb-8">
                    <p className="text-4xl font-bold text-gray-900 mb-4">
                      {memory.contributor_name}
                    </p>
                    <div className="h-1 w-20 bg-gray-200 mx-auto rounded-full"/>
                  </div>

                  <div className="max-w-4xl mx-auto h-full overflow-hidden flex items-center">
                    <p className="text-2xl text-gray-700 leading-loose font-serif whitespace-pre-wrap">
                      {memory.message}
                    </p>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* LOGO: Pushed further with negative values */}
          <img
            src={LOGO_URL}
            alt="Logo"
            className="absolute z-50 drop-shadow-lg opacity-60"
            style={{ 
              width: "250px", 
              height: "auto",
              bottom: "-70px", // Pushes it further down
              left: "-50px"    // Pushes it further left
            }}
            crossOrigin="anonymous"
          />

          {/* Page Number */}
          <div className="absolute bottom-6 right-8 text-white/90 text-xl font-bold drop-shadow-md font-mono z-50">
            {i + 1} / {memories.length}
          </div>
        </div>
      ))}
    </div>
  );
}