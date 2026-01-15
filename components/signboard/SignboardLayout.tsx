"use client";

import { ReactNode } from "react";
import { SignboardProvider } from "./SignboardContext";
import { SignboardShell } from "./SignboardShell";

interface Props {
  wallId: string;
  themeId: string;
  children: ReactNode;
}

const SIGNBOARD_BACKGROUNDS: Record<string, string> = {
  "elite-christmas-luxe": "https://i.ibb.co/6cwB4pNQ/hbhbi.png",
  "elite-frosted-eve": "https://i.ibb.co/6cwB4pNQ/hbhbi.png",
  "elite-sakura-glowscape": "https://i.ibb.co/qMSwrYsX/6.png"
};

export function SignboardLayout({ themeId, children }: Props) {
  const backgroundImage =
    SIGNBOARD_BACKGROUNDS[themeId] ??
    "https://i.ibb.co/fallback-signboard.png";

  return (
    <SignboardShell backgroundImage={backgroundImage}>
      <SignboardProvider>
        {children}
      </SignboardProvider>
    </SignboardShell>
  );
}
