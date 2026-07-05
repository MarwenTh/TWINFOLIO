import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/40 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
             <div className="w-3 h-3 bg-white rounded-full"></div>
           </div>
           <span className="font-bold text-xl tracking-wide text-white">TWINFOLIO</span>
        </Link>
        
        <nav className="hidden md:flex gap-8 items-center bg-white/5 px-6 py-2 rounded-full border border-white/10">
           <Link href="#features" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Features</Link>
           <Link href="#showcase" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Showcase</Link>
           <Link href="#pricing" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Pricing</Link>
        </nav>

        <div className="flex gap-5 items-center">
           <Link href="/login" className="hidden sm:block text-sm font-medium text-zinc-300 hover:text-white transition-colors">
             Log In
           </Link>
           <Link href="/signup" className="text-sm font-semibold bg-white text-black px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
             Start Free
           </Link>
        </div>
      </div>
    </header>
  );
}
