import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-black px-6">
      <div className="max-w-lg text-center space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Memory Wall V1
        </h1>
        <p className="text-sm text-slate-300">
          Create intimate, password-protected walls of memories for special
          people and events.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/admin/create-wall"
            className="rounded-full bg-white/90 text-slate-950 px-5 py-2 text-sm font-medium shadow-lg shadow-pink-500/20 hover:bg-white transition"
          >
            Admin: Create Wall
          </Link>
        </div>
      </div>
    </main>
  );
}


