import Header from "@/components/Header";
import { Component as HorizonHero } from "@/components/ui/horizon-hero-section";
import Showcase from "@/components/Showcase";
import IntroAnimation from "@/components/ui/scroll-morph-hero";
import { auth } from "@/lib/auth/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: session } = await auth.getSession();
  const isLoggedIn = !!session?.user;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Fixed header */}
      <Header />

      {/* Full-scroll 3D Hero */}
      <HorizonHero />

      {/* Below-the-fold sections */}
      <main className="relative z-10 bg-black flex flex-col items-center w-full">
        {/* CTA strip */}
        <section className="w-full max-w-5xl mx-auto px-6 py-32 flex flex-col items-center text-center gap-8 border-t border-white/5">
          <p className="text-xs tracking-[0.5em] uppercase text-zinc-500">
            Powered by AI · Backed by You
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-3xl">
            Your work deserves a portfolio that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500">
              speaks for itself
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl">
            Paste your LinkedIn or upload your resume and watch TWINFOLIO build
            an intelligent, interactive portfolio in seconds.
          </p>

          {/* Input / CTA Button */}
          <div className="w-full max-w-lg relative group mt-4">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-700 -z-10" />
            <div className="flex items-center bg-zinc-950 border border-white/10 rounded-full p-2 shadow-2xl backdrop-blur-xl">
              <input
                type="url"
                placeholder="Paste your LinkedIn URL…"
                className="flex-1 bg-transparent text-white placeholder-zinc-500 px-5 py-3.5 outline-none text-base"
              />
              <Link
                href={isLoggedIn ? "/dashboard" : "/auth/sign-up"}
                className="bg-white text-black font-bold rounded-full px-7 py-3.5 hover:bg-zinc-200 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer text-sm"
              >
                {isLoggedIn ? "Go to Dashboard" : "Generate"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <p className="text-sm text-zinc-600">
            No credit card required.{" "}
            <Link
              href={isLoggedIn ? "/dashboard" : "/auth/sign-up"}
              className="text-cyan-500 hover:text-cyan-300 transition-colors underline underline-offset-4 cursor-pointer"
            >
              Upload Resume instead
            </Link>
          </p>
        </section>

        {/* Scroll Morph Gallery */}
        <section className="w-full max-w-6xl mx-auto px-6 pb-24 flex flex-col items-center">
          <p className="text-xs tracking-[0.5em] uppercase text-zinc-500 mb-4">Interactive Showcase</p>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center tracking-tight">Interactive Project Vault</h3>
          <IntroAnimation />
        </section>

        {/* AI showcase */}
        <Showcase />

        {/* Features grid */}
        <section
          id="features"
          className="w-full max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: "✦",
              title: "AI-Powered Twin",
              desc: "Your portfolio learns from your work and answers visitor questions just like you would.",
            },
            {
              icon: "⬡",
              title: "Import in Seconds",
              desc: "Paste a LinkedIn URL or upload your resume — we handle the rest automatically.",
            },
            {
              icon: "◈",
              title: "Live & Interactive",
              desc: "Visitors can chat with your portfolio, explore projects, and connect instantly.",
            },
            {
              icon: "⟡",
              title: "Beautiful by Default",
              desc: "Every portfolio ships with a stunning dark-mode design and smooth animations.",
            },
            {
              icon: "◉",
              title: "Always Up to Date",
              desc: "Re-import at any time to keep your twin in sync with your latest achievements.",
            },
            {
              icon: "⬥",
              title: "Privacy First",
              desc: "You control what's shared. Keep projects private, highlight what matters most.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 p-8 flex flex-col gap-4 transition-all duration-300 cursor-default"
            >
              <span className="text-3xl text-violet-400 group-hover:text-cyan-400 transition-colors">
                {feature.icon}
              </span>
              <h3 className="text-white font-semibold text-lg">
                {feature.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="w-full max-w-4xl mx-auto px-6 py-24 flex flex-col items-center gap-12"
        >
          <div className="text-center">
            <p className="text-xs tracking-[0.5em] uppercase text-zinc-500 mb-4">
              Simple Pricing
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Start free, scale when ready
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                desc: "Perfect for getting started",
                features: [
                  "1 AI Portfolio",
                  "LinkedIn Import",
                  "Basic Analytics",
                  "Public URL",
                ],
                cta: isLoggedIn ? "Go to Dashboard" : "Get Started",
                link: isLoggedIn ? "/dashboard" : "/auth/sign-up",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$12",
                period: "per month",
                desc: "For professionals who want more",
                features: [
                  "Unlimited Portfolios",
                  "Custom Domain",
                  "Advanced Analytics",
                  "Priority AI responses",
                  "Remove Branding",
                ],
                cta: isLoggedIn ? "Go to Dashboard" : "Start Free Trial",
                link: isLoggedIn ? "/dashboard" : "/auth/sign-up",
                highlight: true,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 flex flex-col gap-6 border transition-all duration-300 ${
                  plan.highlight
                    ? "bg-gradient-to-b from-violet-600/20 to-cyan-600/10 border-violet-500/40 hover:border-violet-400/60"
                    : "bg-white/[0.02] border-white/5 hover:border-white/10"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full tracking-widest uppercase shadow-lg">
                    Most Popular
                  </div>
                )}
                <div>
                  <p className="text-zinc-400 text-sm font-medium mb-1">
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-extrabold text-white">
                      {plan.price}
                    </span>
                    <span className="text-zinc-500 text-sm mb-2">
                      /{plan.period}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-sm mt-1">{plan.desc}</p>
                </div>
                <ul className="flex flex-col gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-cyan-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.link}
                  className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all active:scale-95 flex items-center justify-center cursor-pointer ${
                    plan.highlight
                      ? "bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-white/5 py-12 px-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto text-sm text-zinc-600">
          <span className="font-bold text-white/20 tracking-widest">
            TWINFOLIO
          </span>
          <p>© {new Date().getFullYear()} Twinfolio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-400 transition-colors cursor-pointer">
              Privacy
            </a>
            <a href="#" className="hover:text-zinc-400 transition-colors cursor-pointer">
              Terms
            </a>
            <a href="#" className="hover:text-zinc-400 transition-colors cursor-pointer">
              Contact
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
