"use client";

import { usePathname } from "next/navigation";
import type { ReactNode, CSSProperties } from "react";
import type { Theme } from "@/themes/themes";

interface ThemeWrapperProps {
  theme: Theme;
  children: ReactNode;
}

export function ThemeWrapper({ theme, children }: ThemeWrapperProps) {
  const pathname = usePathname();
  const isSignPage = pathname?.includes("/sign");

  const bgImage = isSignPage && theme.signBackgroundImage
    ? theme.signBackgroundImage
    : theme.backgroundImage;

  // Fallback to black if no text color is defined
  const textColor = theme.textColor || "black";

  const styleVars = {
    "--accent": theme.accentColor,
    "--card-bg": theme.card.background,
    "--card-border": theme.card.border,
    "--card-shadow": theme.card.shadow,
    "--text-color": textColor, // <--- NEW VARIABLE
  } as CSSProperties;

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-stretch"
      style={styleVars}
    >
      {/* VIDEO (ONLY FOR WALL PAGE) */}
      {!isSignPage && theme.backgroundVideo && (
        <video
          key={theme.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="fixed inset-0 w-full h-full object-cover pointer-events-none z-[-2]"
        >
          <source src={theme.backgroundVideo} type="video/mp4" />
        </video>
      )}

      {/* IMAGE BACKGROUND */}
      <div
        className="fixed inset-0 z-[-3]"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      <main className="relative z-10 flex-1 px-4 pt-16 pb-24">
        {children}
      </main>
    </div>
  );
}