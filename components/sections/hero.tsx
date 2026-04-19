"use client";

import { RevealScrollTo } from "../reveal-scroll";
import { Activity, Github, Linkedin, Maximize } from "lucide-react";
import { useRef } from "react";
import TextType from "../TextType";
import { LogoAnimated } from "../LogoAnimated";

export default function Hero() {
  const logoRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-[#0a0a0a] h-dvh w-screen flex flex-col overflow-x-hidden">
      {/* row 1 */}
      <div className="flex-[0.1] border-b-red-600 border-b-4 border-dashed
      md:flex-1 flex flex-col-reverse md:flex-row mt-3 md:mt-0">

        {/* Welcome message */}
        <div className="w-full h-10 sm:h-full px-5 pb-2 md:border-r-gray-600 md:border-r-4 border-dashed flex justify-start items-center 
          md:pr-20 md:w-[calc(13/21*100%)] md:items-end md:pb-20 md:px-0">
          <span className="flex items-center text-gray-500 text-md md:text-2xl lg:text-4xl font-medium tracking-widest whitespace-nowrap md:ml-auto text-left my-5">
            <Activity className="mx-2 md:mx-4 text-red-500 w-5 md:w-7 lg:w-9" />
            <TextType
              text={["WELCOME TO MY PORTFOLIO!", "I'M ADRIAN", "A COMPUTER SCIENCE STUDENT", "Full-Stack Developer"]}
              typingSpeed={200}
              pauseDuration={2100}
              showCursor
              cursorCharacter="▎"
              deletingSpeed={30}
              variableSpeed={{ min: 55, max: 125 }}
              cursorBlinkDuration={0.5}
              className="text-sm sm:text-3xl"
            />
          </span>
        </div>

        {/* Profile image / Logo with DrawSVG animation */}
        <div className="flex items-center justify-center 
        md:w-[calc(8/21*100%)]"
          ref={logoRef}>
          <LogoAnimated width={{ base: 150, md: 200, lg: 250 }} />
        </div>
      </div>

      {/* row 2 */}
      <div className="flex-1 flex flex-col-reverse md:flex-row border-b-gray-600 border-b-4 border-dashed">
        <div
          className="md:w-[calc(13/21*100%)] h-3/4 sm:h-full flex flex-row items-end
          justify-end gap-10 p-10 border-dashed relative overflow-hidden
        md:border-r-gray-600 md:border-r-4"
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
          {/* Radial Gradient */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black/20" />

          {/* Path/Education Background */}
          <div className="flex flex-row items-start justify-end gap-3 md:gap-10 z-10">

            <span className="text-red-500 text-xl text-nowrap md:text-2xl">
              ---
            </span>
            <div className="flex flex-col ">
              <TextType text="[PATH]"
                loop={false}
                typingSpeed={200}
                className="text-red-500 text-xl md:text-2xl mb-2" />
              <span className="text-gray-500 text-base md:text-2xl">
                Compute Science Student
              </span>
              <span className="text-gray-500 text-base md:text-2xl">
                Specialized in Mobile Programming
              </span>
            </div>
          </div>
        </div>

        {/* Navigation and Socials */}
        <div className="md:w-[calc(8/21*100%)] h-3/4 sm:h-full flex flex-col">
          <div className="w-full h-full flex flex-row border-b-red-600 border-b-4 border-dashed">

            {/* Socials */}
            <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden border-r-gray-600 border-r-4 border-dashed">
              <div className="w-full h-full flex items-center justify-center md:border-b-red-600 md:border-b-4 border-dashed ">
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
              <div className="w-full h-full flex flex-col items-end justify-center overflow-hidden gap-2 pr-5 sm:pr-10">
                <TextType
                  text="[ HOME ]"
                  loop={false}
                  typingSpeed={200}
                  className="text-red-500 text-base md:text-lg xl:text-2xl" />
                <RevealScrollTo
                  to={1}
                  className="text-gray-500 text-base md:text-lg xl:text-2xl
              hover:text-red-500 hover:-translate-x-4 transition-all cursor-pointer"
                >
                  [ PROJECTS ]
                </RevealScrollTo>
                <RevealScrollTo
                  to={2}
                  className="text-gray-500 text-base md:text-lg xl:text-2xl
              hover:text-red-500 hover:-translate-x-4 transition-all"
                >
                  [ ABOUT ]
                </RevealScrollTo>
                <RevealScrollTo
                  to={3}
                  className="text-gray-500 text-base md:text-lg xl:text-2xl
              hover:text-red-500 hover:-translate-x-4 transition-all"
                >
                  [ CONTACT ]
                </RevealScrollTo>
              </div>
            </section>
          </div>
          <div className="hidden md:flex h-full items-end justify-end pr-15 pb-10">
            <Maximize className="text-red-500" size={35} />
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="flex-[0.15] md:flex-[0.3] flex flex-col border-b-gray-600 border-b-4 border-dashed overflow-hidden relative">
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
