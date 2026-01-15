"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { themes } from "@/themes/themes";
import QRCode from "qrcode";


export default function CreateWallPage() {
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [title, setTitle] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [wallPassword, setWallPassword] = useState("");
  const [selectedThemeId, setSelectedThemeId] = useState(themes[0].id);
  const [loading, setLoading] = useState(false);
  const [wallUrl, setWallUrl] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const router = useRouter();

  const handleAdminGate = () => {
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (!expected) {
      alert("ADMIN password not configured");
      return;
    }
    if (adminPasswordInput === expected) {
      setIsAuthed(true);
    } else {
      alert("Incorrect admin password");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !wallPassword) return;
    try {
      setLoading(true);
      const res = await fetch("/api/walls/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          customerName,
          password: wallPassword,
          themeId: selectedThemeId
        })
      });
      if (!res.ok) {
        throw new Error("Failed to create wall");
      }
      const data = await res.json();
      const url = `${window.location.origin}/wall/${data.wall_id}`;
      setWallUrl(url);
      const qr = await QRCode.toDataURL(url);
      setQrDataUrl(qr);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      alert("Error creating wall");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "memory-wall-qr.png";
    a.click();
  };

  if (!isAuthed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-sm space-y-4 bg-slate-900/70 border border-slate-700 rounded-2xl p-5">
          <h1 className="text-lg font-semibold text-white">Admin Access</h1>
          <input
            type="password"
            placeholder="Admin password"
            value={adminPasswordInput}
            onChange={(e) => setAdminPasswordInput(e.target.value)}
            className="w-full rounded-full bg-slate-800 border border-slate-700 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400/60"
          />
          <button
            onClick={handleAdminGate}
            className="w-full rounded-full bg-white text-slate-950 py-2 text-sm font-medium hover:bg-slate-100 transition"
          >
            Enter
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="mx-auto max-w-xl space-y-8">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-white">
            Create Memory Wall
          </h1>
          <p className="text-xs text-slate-400">
            Fill the details, choose a theme, and generate a unique wall link &
            QR code.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300">Wall Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-full bg-slate-900 border border-slate-700 px-4 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-pink-400/60"
              placeholder="e.g. Amma’s 60th Birthday Wall"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300">
              Customer Name (optional)
            </label>
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full rounded-full bg-slate-900 border border-slate-700 px-4 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-pink-400/60"
              placeholder="Name you’ll remember"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300">
              Wall Password (4–6 digits)
            </label>
            <input
              value={wallPassword}
              onChange={(e) => setWallPassword(e.target.value)}
              maxLength={6}
              className="w-full rounded-full bg-slate-900 border border-slate-700 px-4 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-pink-400/60"
              placeholder="1234"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300">Theme</label>
            <select
              value={selectedThemeId}
              onChange={(e) => setSelectedThemeId(e.target.value)}
              size={6}   // ✅ THIS IS THE FIX
              className="
                w-full
                rounded-2xl
                bg-slate-900
                border border-slate-700
                px-4 py-2
                text-sm text-white
                outline-none
                overflow-y-auto
              "
            >
              {themes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-white text-slate-950 py-2 text-sm font-medium hover:bg-slate-100 transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Wall"}
          </button>
        </form>

        {wallUrl && (
          <section className="mt-6 space-y-3 rounded-2xl bg-slate-900/70 border border-slate-700 p-4">
            <p className="text-xs font-medium text-slate-200">
              Wall Created
            </p>
            <p className="text-xs text-slate-400 break-all">{wallUrl}</p>
            {qrDataUrl && (
              <div className="flex flex-col items-center gap-2 pt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrDataUrl}
                  alt="QR Code"
                  className="w-40 h-40 bg-white rounded-xl p-2"
                />
                <button
                  onClick={handleDownloadQr}
                  className="text-xs rounded-full bg-white text-slate-950 px-4 py-1.5 font-medium hover:bg-slate-100 transition"
                >
                  Download QR
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}


