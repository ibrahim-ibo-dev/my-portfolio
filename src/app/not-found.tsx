import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function NotFound() {
  return (
    <main className={`relative flex flex-col items-center justify-center min-h-screen bg-[#0A0A0F] text-[#E0E0E0] overflow-hidden ${spaceGrotesk.className}`}>
      <CustomCursor />
      
      {/* Glitch Background Effect */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4A574]/20 via-[#0A0A0F]/50 to-[#0A0A0F]"></div>

      <div className="z-10 text-center flex flex-col items-center space-y-8 p-8 relative">
        <h1 
          className="text-[clamp(6rem,20vw,15rem)] font-black leading-none tracking-tighter select-none relative z-10"
          style={{ WebkitTextStroke: "2px #D4A574", color: "transparent" }}
        >
          404
        </h1>
        
        {/* Fake Glitch Layers */}
        <h1 
          className="absolute top-8 left-1/2 -translate-x-1/2 text-[clamp(6rem,20vw,15rem)] font-black leading-none tracking-tighter select-none text-[#0ff] opacity-70 animate-pulse mix-blend-screen pointer-events-none -ml-2"
          style={{ WebkitTextStroke: "0px", clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
          aria-hidden="true"
        >
          404
        </h1>
        <h1 
          className="absolute top-8 left-1/2 -translate-x-1/2 text-[clamp(6rem,20vw,15rem)] font-black leading-none tracking-tighter select-none text-[#f0f] opacity-70 animate-pulse mix-blend-screen pointer-events-none ml-2"
          style={{ WebkitTextStroke: "0px", clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)", animationDelay: "0.2s" }}
          aria-hidden="true"
        >
          404
        </h1>

        <div className="space-y-4 max-w-lg z-20 mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#D4A574]">
            SYSTEM BREACH: PAGE NOT FOUND
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            The coordinates you requested do not exist in this sector of the cyberspace. 
            You might have taken a wrong turn, or the data has been expunged.
          </p>
        </div>

        <Link 
          href="/" 
          className="group relative inline-flex items-center justify-center px-8 py-4 mt-8 overflow-hidden rounded-full bg-[#1A1A24] border border-[#D4A574]/30 hover:border-[#D4A574] transition-all duration-300 z-20 cursor-pointer"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#D4A574]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          <span className="relative text-[#D4A574] font-medium tracking-wider text-sm uppercase flex items-center gap-2">
            Return to Base
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </Link>
      </div>
      
      {/* Tech decoration lines */}
      <div className="absolute top-0 left-10 w-[1px] h-full bg-gradient-to-b from-transparent via-[#D4A574]/20 to-transparent"></div>
      <div className="absolute top-0 right-10 w-[1px] h-full bg-gradient-to-b from-transparent via-[#D4A574]/20 to-transparent"></div>
      
      <div className="absolute bottom-10 left-10 text-[10px] text-[#D4A574]/50 tracking-[0.3em] font-mono rotate-90 origin-left">
        STATUS: OFFLINE
      </div>
      <div className="absolute top-10 right-10 text-[10px] text-[#D4A574]/50 tracking-[0.3em] font-mono rotate-90 origin-right">
        ERROR_CODE: 404
      </div>
    </main>
  );
}
