// utils/emoji.ts
export function normalizeEmoji(emoji: string) {
    return emoji
      .normalize("NFKD")
      .replace(/[\uFE0F\u200D]/g, "");
  }
  