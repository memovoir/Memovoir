"use client";

import { useCallback } from "react";

export function useEmojiBurst(isEnabled: boolean) {
  const trigger = useCallback(
    (emoji: string, x: number, y: number) => {
      if (!isEnabled) return;

      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = `${x}px`;
      container.style.top = `${y}px`;
      container.style.pointerEvents = "none";
      container.style.zIndex = "9999";

      document.body.appendChild(container);

      const count = 6;

      for (let i = 0; i < count; i++) {
        const span = document.createElement("span");
        span.textContent = emoji;
        span.style.position = "absolute";
        span.style.fontSize = "20px";
        span.style.left = "0px";
        span.style.top = "0px";
        span.style.transition = "transform 900ms ease, opacity 900ms ease";
        span.style.opacity = "1";

        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 20;

        requestAnimationFrame(() => {
          span.style.transform = `translate(${Math.cos(angle) * distance}px, ${
            Math.sin(angle) * distance - 40
          }px) scale(0.9)`;
          span.style.opacity = "0";
        });

        container.appendChild(span);
      }

      setTimeout(() => {
        container.remove();
      }, 1000);
    },
    [isEnabled]
  );

  return { trigger };
}
