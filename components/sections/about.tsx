"use client";
import Image from "next/image";
import { Layers } from "lucide-react";
import { LogoAnimated } from "../LogoAnimated";

export default function About() {
  return (
    <div
      id="ABOUT"
      role="region"
      aria-label="About"
      className="bg-[#0a0a0a] h-dvh w-screen overflow-x-hidden"
    >
      <div className="relative h-full w-full">
        {/* Mobile: flex column fill | Desktop: 3x3 grid */}
        <div className="flex flex-col md:grid h-dvh w-full md:grid-cols-[1fr_1fr_.618fr] md:grid-rows-[0.618fr_1fr_.618fr] text-gray-400">
          {/* MOBILE: Header section */}
          {/* DESKTOP: Row 1 - Logo + name (spans first two columns) */}
          <div className="md:col-span-2 md:row-start-1 md:row-end-2 md:border-b-4 md:border-b-red-500 md:border-r-4 md:border-r-gray-600 md:border-dashed flex flex-col md:flex-row items-center justify-center md:justify-center gap-4 md:gap-20 py-6 px-4 border-b-4 border-b-red-500 border-dashed flex-1 md:flex-auto">
            {/* Mobile: Photo first */}
            {/* <div className="relative h-32 w-32 md:hidden overflow-hidden rounded-3xl border border-gray-600/70">
              <Image
                src="/profile.png"
                alt="Adrian M. De Guzman"
                fill
                className="object-cover"
              />
            </div> */}
            {/* <LogoAnimated width={{ base: 150, md: 200, lg: 250 }} /> */}
            <h2 className="text-sm lg:text-2xl lg:font-black tracking-[0.5em] text-gray-500 uppercase text-center md:text-left">
              Adrian M. De Guzman
            </h2>
          </div>

          {/* MOBILE: Hidden | DESKTOP: Photo (right column row 1) */}
          <div className="hidden md:flex col-start-3 row-start-1 row-end-2 border-b-4 border-b-red-500 border-dashed items-center justify-center" aria-hidden="true">
            {/* <div className="relative aspect-square h-28 md:h-32 lg:h-48 overflow-hidden border-4 border-dashed border-red-500">
              <Image
                src="/profile.png"
                alt="Adrian M. De Guzman"
                fill
                className="object-cover"
              />
            </div> */}
          </div>

          {/* MOBILE: Hidden | DESKTOP: Row 2 - Left empty panel */}
          <div className="hidden md:flex col-start-1 row-start-2 row-end-3 border-b-4 border-b-red-500 border-r-4 border-r-gray-600 border-dashed items-center justify-center" aria-hidden="true">
            <LogoAnimated width={{ base: 150, md: 200, lg: 250 }} />
          </div>

          {/* MOBILE: About section */}
          {/* DESKTOP: About text center */}
          <div className="md:col-start-2 md:row-start-2 md:row-end-3 md:border-b-4 md:border-b-red-500 md:border-r-4 md:border-r-gray-600 md:border-dashed px-6 py-6 md:px-10 md:py-8 flex items-center flex-1 md:flex-auto">
            <div className="space-y-3 max-w-xl mx-auto md:ml-auto md:mr-0 text-center md:text-right">
              <p className="text-xl sm:text-2xl md:text-2xl tracking-[0.25em] text-red-500 uppercase">
                -- [About]
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-tight tracking-widest">
                Full-stack developer and Computer Science student with a focus
                on crafting smooth, detail-oriented experiences across web and
                mobile.
              </p>
            </div>
          </div>

          {/* MOBILE: Right panel text */}
          {/* DESKTOP: Row 2 - Right panel */}
          <div className="md:col-start-3 md:row-start-2 md:row-end-3 md:border-b-4 md:border-b-red-500 md:border-dashed px-6 py-6 md:px-10 md:py-8 flex items-center border-t-4 border-t-gray-600 border-dashed md:border-t-0 flex-1 md:flex-auto">
            <p className="text-sm sm:text-base md:text-base text-gray-400 leading-snug text-center md:text-left">
              <span className="text-red-500">- </span>I enjoy designing systems that feel deliberate—from layout grids
              inspired by the golden ratio to performant, maintainable code
              that scales with the product.
            </p>
          </div>

          {/* MOBILE: Hidden | DESKTOP: Bottom-left empty area (only first column) */}
          <div className="hidden md:block col-start-1 row-start-3 row-end-4 border-r-4 border-r-gray-600 border-dashed" aria-hidden="true" />

          {/* Tagline - full width on mobile, spans cols 2-3 on desktop */}
          <div className="col-span-1 md:col-start-2 md:col-end-4 row-start-3 md:row-start-3 md:row-end-4 flex items-center justify-center px-6 py-4 md:py-0 md:px-8 border-t-4 border-t-red-500 border-dashed md:border-t-0 flex-1 md:flex-auto">
            <h2 className="text-sm lg:text-2xl lg:font-black tracking-[0.5em] text-gray-500 uppercase flex items-center gap-3 sm:gap-5">
              <Layers className="w-5 h-5 sm:w-8 sm:h-8 text-red-500" aria-hidden="true" />Full Stack Developer
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
