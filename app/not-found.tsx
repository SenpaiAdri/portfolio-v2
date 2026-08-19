import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex h-dvh w-screen flex-col items-center justify-center gap-6 overflow-hidden bg-[#0a0a0a] px-6">
      {/* Grid lines background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,25,25,0.1) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(255,25,25,0.1) 2px, transparent 2px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <h1 className="sr-only">Page not found</h1>

      <p className="relative z-10 text-red-500 text-xs md:text-sm tracking-[0.35em] uppercase">
        [ Error 404 ]
      </p>

      <span
        aria-hidden="true"
        className="relative z-10 select-none text-[10rem] md:text-[16rem] font-black leading-none"
        style={{
          WebkitTextStroke: "2px rgba(255,25,25,0.35)",
          color: "transparent",
        }}
      >
        404
      </span>

      <div className="relative z-10 w-full max-w-md border-y-2 border-dashed border-gray-600 py-4 text-center">
        <p className="text-gray-400 text-xs md:text-sm tracking-[0.3em] uppercase">
          File missing from set
        </p>
        <p className="mt-2 text-gray-600 text-[10px] md:text-xs tracking-[0.3em] uppercase">
          The requested page does not exist — check the sheet index
        </p>
      </div>

      <Link
        href="/"
        className="relative z-10 inline-flex items-center gap-3 border-2 border-dashed border-gray-600 px-8 py-3 text-gray-400 text-xs md:text-sm tracking-[0.3em] uppercase transition-colors hover:border-red-500 hover:text-red-500 focus-visible:border-red-500 focus:outline-none"
      >
        [ Return Home ]
      </Link>
    </main>
  );
}