"use client";

import { RevealScrollTo } from "../reveal-scroll";
import { Activity, Github, Linkedin, Maximize } from "lucide-react";
import { useRef } from "react";
import TextType from "../TextType";
import { LogoAnimated } from "../LogoAnimated";

export default function Hero() {
  const logoRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-[#0a0a0a] h-screen w-screen flex flex-col overflow-x-hidden">
      {/* row 1 */}
      <div className="flex-1 flex flex-row border-b-red-600 border-b-4 border-dashed">

        {/* Welcome message */}
        <div className="w-[calc(13/21*100%)] h-full border-r-gray-600 border-r-4 border-dashed flex items-end pb-20 pr-20">
          <span className="flex items-center justify-start text-gray-500 text-4xl ml-auto font-medium tracking-widest whitespace-nowrap text-left">
            <Activity className="mr-4 text-red-500" size={35} />
            <TextType
              text={["WELCOME TO MY PORTFOLIO!", "I'M ADRIAN", "A COMPUTER SCIENCE STUDENT", "Full-Stack Developer"]}
              typingSpeed={200}
              pauseDuration={2100}
              showCursor
              cursorCharacter="▎"
              deletingSpeed={30}
              variableSpeed={{ min: 55, max: 125 }}
              cursorBlinkDuration={0.5}
            />
          </span>
        </div>

        {/* Profile image / Logo with DrawSVG animation */}
        <div className="w-[calc(8/21*100%)] h-full flex items-center justify-center" ref={logoRef}>
          <LogoAnimated />
        </div>
      </div>

      {/* row 2 */}
      <div className="flex-1 flex flex-row border-b-gray-600 border-b-4 border-dashed">
        <div
          className="w-[calc(13/21*100%)] h-full flex flex-row items-end justify-end gap-10 p-10 border-r-gray-600 border-r-4 border-dashed relative overflow-hidden"
        >
          {/* Grid lines background */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 pointer-events-none select-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,25,25,0.1) 2px, transparent 1px),
                linear-gradient(to bottom, rgba(255,25,25,0.1) 2px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black/20" />

          {/* Path/Education Background */}
          <div className="flex flex-row items-start justify-end gap-10 z-10 relative">

            <span className="text-red-500 text-2xl">---</span>
            <div className="flex flex-col ">
              <TextType text="[PATH]"
                loop={false}
                typingSpeed={200}
                className="text-red-500 text-2xl mb-2" />
              <span className="text-gray-500 text-2xl">
                Compute Science Student
              </span>
              <span className="text-gray-500 text-2xl">
                Specialized in Mobile Programming
              </span>
            </div>
          </div>
        </div>

        {/* Navigation and Socials */}
        <div className="w-[calc(8/21*100%)] h-full flex flex-col">
          <div className="w-full h-full flex flex-row border-b-red-600 border-b-4 border-dashed">

            {/* Socials */}
            <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden border-r-gray-600 border-r-4 border-dashed">
              <div className="w-full h-full flex items-center justify-center border-b-red-600 border-b-4 border-dashed ">
                <a href="https://github.com/SenpaiAdri" target="_blank" rel="noopener noreferrer">
                  <Github className="text-red-500 hover:text-red-400 hover:scale-110 transition-all cursor-pointer" size={35} />
                </a>
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <a href="https://www.linkedin.com/in/eydriannn/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="text-red-500 hover:text-red-400 hover:scale-110 transition-all cursor-pointer" size={35} />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <section className="w-full h-full flex flex-col items-end justify-center overflow-hidden gap-5">
              <div className="w-full h-full flex flex-col items-end justify-center overflow-hidden gap-2 pr-10">
                <TextType
                  text="[ HOME ]"
                  loop={false}
                  typingSpeed={200}
                  className="text-red-500 text-2xl" />
                <RevealScrollTo
                  to={1}
                  className="text-gray-500 text-2xl
              hover:text-red-500 hover:-translate-x-4 transition-all cursor-pointer"
                >
                  [ PROJECTS ]
                </RevealScrollTo>
                <RevealScrollTo
                  to={2}
                  className="text-gray-500 text-2xl
              hover:text-red-500 hover:-translate-x-4 transition-all"
                >
                  [ ABOUT ]
                </RevealScrollTo>
                <span
                  className="text-gray-500 text-2xl
              hover:text-red-500 hover:-translate-x-4 transition-all"
                >
                  [ CONTACT ]
                </span>
              </div>
            </section>
          </div>
          <div className="h-full flex items-end justify-end pr-15 pb-10">
            <Maximize className="text-red-500" size={35} />
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="flex-[0.3] flex flex-col border-b-gray-600 border-b-4 border-dashed overflow-hidden relative">
        <div
          className="absolute whitespace-nowrap animate-marquee text-[3rem] md:text-[6rem] text-[#18181c] select-none"
          style={{
            WebkitTextStroke: "2px #333",
            color: "transparent",
            left: 0,
            minWidth: "100%",
          }}
        >
          ADRIAN ADRIAN ADRIAN ADRIAN ADRIAN ADRIAN ADRIAN
        </div>
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 15s linear infinite;
            }
          `}
        </style>
      </div>
    </div >
  );
}
