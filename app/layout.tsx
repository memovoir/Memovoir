import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Memory Wall",
  description: "QR-based private memory wall"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen antialiased text-white bg-transparent">
        {children}
      </body>
    </html>
  );
}
