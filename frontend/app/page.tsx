import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <Header />
      <main className="flex flex-col items-center w-full">
        <Hero />
        <Showcase />
      </main>
    </div>
  );
}

