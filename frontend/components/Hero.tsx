import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-48 pb-20 px-6 flex flex-col items-center text-center overflow-hidden w-full max-w-7xl mx-auto min-h-[85vh] justify-center z-10">
      {/* Glow effect behind the hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet-600/20 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer group shadow-lg">
        <span className="flex h-2 w-2 rounded-full bg-cyan-400 relative">
          <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping"></span>
        </span>
        <span className="text-xs font-semibold text-zinc-300 tracking-widest uppercase">The Future of Portfolios</span>
      </div>

      <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-8 max-w-5xl leading-[1.1] drop-shadow-2xl">
        Let AI build your <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500">
          Perfect Digital Twin
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mb-14 leading-relaxed font-light">
        A stunning, interactive portfolio that learns from your work and speaks on your behalf.
      </p>

      <div className="w-full max-w-xl relative group">
        {/* Glow effect behind the input */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-300 -z-10"></div>
        
        <div className="relative flex items-center bg-zinc-950/80 backdrop-blur-2xl border border-white/10 rounded-full p-2 shadow-2xl">
          <input
            type="url"
            placeholder="Paste your LinkedIn URL..."
            className="flex-1 bg-transparent text-white placeholder-zinc-500 px-6 py-4 outline-none text-lg"
          />
          <button className="bg-white text-black font-bold rounded-full px-8 py-4 hover:bg-zinc-200 active:scale-95 transition-all flex items-center gap-2 text-lg shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            Generate <span className="hidden sm:inline">Twin</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-zinc-500">
        No credit card required. <Link href="/upload" className="text-cyan-400 hover:underline hover:text-cyan-300 transition-colors">Upload Resume instead</Link>
      </p>
    </section>
  );
}
