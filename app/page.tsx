import { Activity, Maximize } from "lucide-react";
export default function Test() {
  return (
    <div className="h-screen w-screen flex flex-col">
      {/* row 1 */}
      <div className="flex-1 flex flex-row border-b-red-600 border-b-4 border-dashed">
        <div className="w-[calc(13/21*100%)] h-full border-r-gray-600 border-r-4 border-dashed flex items-end justify-end pb-10 pr-15">
          <span className="text-gray-500 text-3xl flex">
            <Activity className="mr-4 text-red-500" size={35} />
            Welcome to my Portfolio
          </span>
        </div>
        <div className="w-[calc(8/21*100%)] h-full flex items-center justify-center">
          <img
            src="/logo.svg"
            alt="profile"
            className="object-cover mx-auto"
          />
        </div>
      </div>

      {/* row 2 */}
      <div className="flex-1 flex flex-row border-b-gray-600 border-b-4 border-dashed">
        <div className="w-[calc(13/21*100%)] h-full border-r-gray-600 border-r-4 border-dashed flex flex-row items-end justify-end gap-10 p-10">
          <div className="flex flex-row items-start justify-end gap-10">
            <span className="text-red-500 text-2xl">---</span>
            <div className="flex flex-col ">
              <span className="text-red-500 text-2xl mb-2">[PATH]</span>
              <span className="text-gray-500 text-2xl">Compute Science Student</span>
              <span className="text-gray-500 text-2xl">Specialized in Mobile Programming</span>
            </div>
          </div>
        </div>

        <div className="w-[calc(8/21*100%)] h-full flex flex-col">
          <div className=" h-full flex flex-row border-b-red-600 border-b-4 border-dashed">
            <div className="w-3/5 h-full flex flex-col border-r-gray-600 border-r-4 border-dashed">
              <div className="w-full h-full border-b-red-600 border-b-4 border-dashed">above</div>
              <div className="w-full h-full">below</div>
            </div>
            <div className="w-full h-full flex flex-col text-right p-10">
              <span className="text-gray-500 text-2xl
              hover:text-red-500 hover:translate-x-[-10px] transition-all">[HOME]</span>
              <span className="text-gray-500 text-2xl
              hover:text-red-500 hover:translate-x-[-10px] transition-all">[PROJECTS]</span>
              <span className="text-gray-500 text-2xl
              hover:text-red-500 hover:translate-x-[-10px] transition-all">[ABOUT]</span>
              <span className="text-gray-500 text-2xl
              hover:text-red-500 hover:translate-x-[-10px] transition-all">[CONTACT]</span>

            </div>
          </div>
          <div className="h-full flex items-end justify-end mr-10 mb-10">
            <Maximize className="text-red-500" size={35} />
          </div>
        </div>
      </div >
      <div className="flex-[0.3] flex flex-col border-b-gray-600 border-b-4 border-dashed overflow-hidden relative">
        <div className="absolute whitespace-nowrap animate-marquee text-[3rem] md:text-[6rem] text-[#18181c] select-none"
          style={{
            WebkitTextStroke: '2px #333',
            color: 'transparent',
            left: 0,
            minWidth: '100%',
          }}>
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