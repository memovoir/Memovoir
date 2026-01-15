"use client";

import { ReactNode } from "react";

interface Props {
  backgroundImage: string;
  children: ReactNode;
}

export function SignboardShell({ backgroundImage, children }: Props) {
  return (
    <div className="fixed inset-0 overflow-hidden">

      {/* 🌄 BACKGROUND (visual only) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />

      {/* 🔒 BOARD MASK (ONLY CANVAS ALLOWED) */}
      <div
        id="board-mask"
        className="absolute left-1/2 top-1/2 z-10 overflow-hidden pointer-events-none"
        style={{
          width: 1676,      // rounded
          height: 925,
          transform: "translate(-50%, -50%)"
        }}
      >
        {children}
      </div>
    </div>
  );
}
