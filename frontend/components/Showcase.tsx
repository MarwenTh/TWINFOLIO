export default function Showcase() {
  return (
    <section className="relative w-full max-w-6xl mx-auto px-6 pb-32">
      <div className="relative rounded-2xl md:rounded-[2.5rem] bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-4 md:p-8 shadow-2xl overflow-hidden group">
        
        {/* Animated gradient background inside the card */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="relative bg-zinc-950 border border-white/5 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto md:h-[600px]">
          
          {/* Left panel - Chat/AI interface */}
          <div className="w-full md:w-1/3 bg-black/40 border-r border-white/5 p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center p-[2px]">
                 <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-full h-full rounded-full border-2 border-black object-cover"/>
              </div>
              <div>
                <h3 className="text-white font-medium text-sm">Alex's Twin</h3>
                <p className="text-zinc-500 text-xs">AI Assistant</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 text-sm text-zinc-300 border border-white/5 rounded-tl-none">
              Hi! I'm Alex's AI Twin. What would you like to know about their recent projects?
            </div>
            
            <div className="bg-cyan-500/10 rounded-xl p-4 text-sm text-cyan-100 border border-cyan-500/20 self-end rounded-tr-none max-w-[85%] mt-2">
              Can you show me their latest React Native work?
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 text-sm text-zinc-300 border border-white/5 rounded-tl-none mt-2">
              Absolutely. Check out the panel on the right. I've highlighted the "EcoTrack" app they built last month.
            </div>

            <div className="mt-auto relative group/input cursor-text">
              <div className="bg-black/50 border border-white/10 rounded-full px-4 py-3 text-sm text-zinc-500 flex justify-between items-center group-hover/input:border-white/20 transition-colors">
                <span>Ask anything...</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-400 group-hover/input:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </div>
            </div>
          </div>

          {/* Right panel - Portfolio showcase */}
          <div className="w-full md:w-2/3 p-6 md:p-10 relative overflow-hidden bg-zinc-900">
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-0 pointer-events-none"></div>
             
             <div className="relative z-10 flex flex-col gap-6">
                <div className="flex justify-between items-end">
                   <div>
                     <h2 className="text-2xl font-bold text-white mb-1">EcoTrack Mobile App</h2>
                     <p className="text-zinc-400 text-sm font-medium">React Native, Tailwind, Node.js</p>
                   </div>
                   <div className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-500/30 font-semibold tracking-wide shadow-lg">
                     Featured
                   </div>
                </div>

                <div className="w-full aspect-video rounded-xl bg-zinc-800 border border-white/10 overflow-hidden relative group/image cursor-pointer shadow-2xl">
                   <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/40 to-cyan-600/40 group-hover/image:scale-105 transition-transform duration-700"></div>
                   <div className="absolute inset-0 bg-black/20 group-hover/image:bg-transparent transition-colors duration-500"></div>
                   
                   {/* Abstract UI Elements representing an app */}
                   <div className="absolute bottom-6 left-6 right-6 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex gap-4 transform translate-y-2 group-hover/image:translate-y-0 transition-transform duration-500 shadow-xl">
                     <div className="w-16 h-16 bg-emerald-400/30 rounded-lg border border-white/10"></div>
                     <div className="flex-1 flex flex-col gap-3 justify-center">
                        <div className="h-4 w-3/4 bg-white/30 rounded-full"></div>
                        <div className="h-3 w-1/2 bg-white/20 rounded-full"></div>
                     </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
