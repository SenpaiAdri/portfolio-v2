"use client";
import Image from "next/image";
import { Layers } from "lucide-react";
import { LogoAnimated } from "../LogoAnimated";

export default function About() {
  return (
    <div
      id="ABOUT"
      className="bg-[#0a0a0a] h-screen w-screen flex items-center justify-center overflow-x-hidden"
    >
      <div className="relative h-full w-full">
        {/* Global 3x3 grid so all vertical lines align */}
        <div className="grid h-full w-full grid-cols-[1fr_1fr_.618fr] grid-rows-[0.618fr_1fr_.618fr] text-gray-400">
          {/* Row 1 - logical 2 columns via col-span */}
          {/* Logo + name (spans first two columns) */}
          <div className="col-span-2 row-start-1 row-end-2 border-b-4 border-b-red-500 border-r-4 border-r-gray-600 border-dashed flex items-center justify-center">
            <div className="flex items-center gap-20">
              <LogoAnimated />
              <div className="text-[1rem] text-xs md:text-sm lg:text-2xl lg:font-black tracking-[0.5em] text-gray-500 uppercase">
                Adrian M. De Guzman
              </div>
            </div>
          </div>

          {/* Photo (right column) */}
          <div className="col-start-3 row-start-1 row-end-2 border-b-4 border-b-red-500 border-dashed flex items-center justify-center">
            <div className="relative h-28 w-28 md:h-32 md:w-32 lg:h-60 lg:w-50 overflow-hidden rounded-3xl border border-gray-600/70">
              <Image
                src="/profile.png"
                alt="Adrian M. De Guzman"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Row 2 - true 3 columns */}
          {/* Left empty panel */}
          <div className="col-start-1 row-start-2 row-end-3 border-b-4 border-b-red-500 border-r-4 border-r-gray-600 border-dashed" />

          {/* About text center */}
          <div className="col-start-2 row-start-2 row-end-3 border-b-4 border-b-red-500 border-r-4 border-r-gray-600 border-dashed px-10 py-8 flex items-center">
            <div className="space-y-3 max-w-xl ml-auto text-right">
              <p className="text-2xl tracking-[0.25em] text-red-500 uppercase">
                -- [About]
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-tight tracking-widest">
                Full-stack developer and Computer Science student with a focus
                on crafting smooth, detail-oriented experiences across web and
                mobile.
              </p>
             
            </div>
          </div>

          {/* Row 2 - Right panel */}
          <div className="col-start-3 row-start-2 row-end-3 border-b-4 border-b-red-500 border-dashed px-10 py-8 flex items-center">
            <p className="text-sm md:text-base text-gray-400 leading-snug">
              <span className="text-red-500">-  </span>I enjoy designing systems that feel deliberate—from layout grids
              inspired by the golden ratio to performant, maintainable code
              that scales with the product.
            </p>
          </div>

          {/* Row 3 - align to Row 2 col-1 right grid line */}
          {/* Bottom-left empty area (only first column) */}
          <div className="col-start-1 row-start-3 row-end-4 border-r-4 border-r-gray-600 border-dashed" />

          {/* Tagline spans columns 2-3 */}
          <div className="col-start-2 col-end-4 row-start-3 row-end-4  flex items-center justify-center px-8">
            <span className="text-[0.75rem] md:text-sm lg:text-2xl lg:font-black tracking-[0.6em] text-gray-500 uppercase flex items-center gap-5">
              <Layers className="w-8 h-8 text-red-500" />Full Stack Developer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
