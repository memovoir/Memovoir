"use client";

import { ReactNode } from "react";

interface Props {
  backgroundImage: string;
  children: ReactNode;
}

export function SignboardShell({ backgroundImage, children }: Props) {
  return (
    <div className="fixed inset-0 overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />

      {/* NORMAL UI LAYER */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
