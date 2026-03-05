import Image from "next/image";

export default function Projects2() {
  return (
    <div
      id="PROJECTS"
      className="bg-[#0a0a0a] h-screen w-screen flex flex-col overflow-x-hidden"
    >
      {/* row 1 */}
      <div className="bg-[#0a0a0a] flex-1 flex flex-row border-b-red-600 border-b-4 border-dashed">
        <div className="w-[calc(13/21*100%)] h-full border-r-gray-600 border-r-4 border-dashed flex items-center justify-center">
          <span className="text-gray-500 text-3xl flex">
            [Projects Images Here]
          </span>
        </div>
        {/* Project Logo */}

        {/* slide up this part on next page */}
        <div className="w-[calc(8/21*100%)] h-full flex items-center justify-center">

          <div className="relative w-[90%]">
            <Image
              src="/ai-blogpost-logo.svg"
              alt="profile"
              width={250}
              height={100}
              className="object-cover mx-auto"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-row border-b-gray-600 border-b-4 border-dashed">
        <div className="w-[calc(13/21*100%)] h-full flex flex-col justify-between border-r-gray-600 border-r-4 border-dashed py-10 px-15">
          {/* slide up this part on next page */}
          {/* Title */}
          <div className="flex flex-col gap-10">
            <div className="flex justify-end">
              <span className="text-red-400 text-[2.2rem] tracking-wider text-right font-black">
                AI BLOGPOST <span className="text-red-400">[GENERATOR]</span>
              </span>
            </div>
            {/* Subtitle */}
            <div className="flex justify-end mt-5">
              <span className="text-gray-400 text-lg md:text-xl tracking-wide text-right leading-tight max-w-[90%]">
                AI-POWERED BLOGPOST GENERATOR
                <br className="hidden md:block" />
                FOR CONTENT CREATORS
              </span>
            </div>
          </div>
          {/* slide up this part on next page */}
          {/* Date Row */}
          <div className="flex justify-between items-center mt-14 px-2">
            <span className="text-gray-400 text-lg tracking-widest">
              JANUARY-2026
            </span>
            <span className="text-gray-400 text-lg tracking-widest">--</span>
            <span className="text-gray-400 text-lg tracking-widest">
              PRESENT
            </span>
          </div>
        </div>

        <div className="w-[calc(8/21*100%)] h-full flex flex-col">
          <div className="w-full h-full flex flex-row border-b-red-600 border-b-4 border-dashed">
            <div className="w-full h-full flex flex-4 flex-col border-r-gray-600 border-r-4 border-dashed">
              <div className="w-full h-1/2 flex items-center justify-center border-b-red-600 border-b-4 border-dashed text-red-400">
                #
              </div>
              {/* slide up this part on next page */}
              <div className="w-full h-1/2 flex items-center justify-center text-red-400">
                2
              </div>
            </div>
            <div className="w-content flex flex-5 flex-col text-center justify-center">
              <span className="text-3xl text-gray-400 font-black">PROJECT</span>
            </div>
          </div>
          {/* slide up this part on next page */}
          <div className="h-full flex items-center justify-center">
            <span className="text-3xl text-gray-400">MOBILE DEVELOPER</span>
          </div>
        </div>
      </div>
    </div>
  );
}
