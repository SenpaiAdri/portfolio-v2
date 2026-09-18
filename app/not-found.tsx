import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex h-dvh w-screen flex-col items-center justify-center gap-6 overflow-hidden bg-surface px-6">
      {/* Grid lines background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--brand-grid) 2px, transparent 2px),
            linear-gradient(to bottom, var(--brand-grid) 2px, transparent 2px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <h1 className="sr-only">Page not found</h1>

      <p className="relative z-10 text-brand text-xs md:text-sm tracking-[0.35em] uppercase">
        [ Error 404 ]
      </p>

      <span
        aria-hidden="true"
        className="relative z-10 select-none text-[10rem] md:text-[16rem] font-black leading-none"
        style={{
          WebkitTextStroke: "2px color-mix(in srgb, var(--brand) 35%, transparent)",
          color: "transparent",
        }}
      >
        404
      </span>

      <div className="relative z-10 w-full max-w-md border-y-2 border-dashed border-line py-4 text-center">
        <p className="text-ink-body text-xs md:text-sm tracking-[0.3em] uppercase">
          File missing from set
        </p>
        <p className="mt-2 text-ink-faint text-[10px] md:text-xs tracking-[0.3em] uppercase">
          The requested page does not exist — check the sheet index
        </p>
      </div>

      <Link
        href="/"
        className="relative z-10 inline-flex items-center gap-3 border-2 border-dashed border-line px-8 py-3 text-ink-body text-xs md:text-sm tracking-[0.3em] uppercase transition-colors hover:border-brand hover:text-brand focus-visible:border-brand focus:outline-none"
      >
        [ Return Home ]
      </Link>
    </main>
  );
}