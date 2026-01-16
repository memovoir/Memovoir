import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Memory Wall",
  description: "Create your private memory wall",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}