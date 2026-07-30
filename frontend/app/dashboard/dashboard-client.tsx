"use client";

import { useState } from "react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  Copy,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { SidebarNav } from "@/components/ui/dashboard-sidebar";

interface DashboardClientProps {
  userName: string;
  userEmail?: string;
}

export default function DashboardClient({ userName, userEmail }: DashboardClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeId, setActiveId] = useState("overview");
  const [checklistOpen, setChecklistOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const portfolioUrl = `https://www.fastfol.io/${userName.toLowerCase().replace(/\s+/g, "")}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex h-screen bg-black text-white overflow-hidden">
      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <div
        className={`h-full transition-all duration-300 ease-in-out shrink-0 overflow-hidden ${
          sidebarOpen ? "w-[260px]" : "w-0"
        }`}
      >
        <SidebarNav
          activeId={activeId}
          onSelect={setActiveId}
          userName={userName}
          userEmail={userEmail}
        />
      </div>

      {/* ── Main area ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-zinc-950/40">
        {/* Topbar */}
        <header className="h-14 border-b border-white/[0.06] flex items-center px-6 justify-between bg-zinc-950/60 backdrop-blur shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-md text-zinc-500 hover:bg-white/5 hover:text-white transition-colors"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="w-[18px] h-[18px]" strokeWidth={1.5} />
              ) : (
                <PanelLeftOpen className="w-[18px] h-[18px]" strokeWidth={1.5} />
              )}
            </button>
            <span className="text-sm font-semibold tracking-wide text-white">
              Workspace
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </div>
            <button className="flex items-center gap-1.5 text-xs font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-transform cursor-pointer">
              Portfolio <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Greeting Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Hello {userName.toLowerCase().replace(/\s+/g, "")}!
            </h1>
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-sm hover:underline cursor-pointer select-all">{portfolioUrl}</span>
              <button
                onClick={handleCopy}
                className="p-1 rounded hover:bg-white/5 text-zinc-500 hover:text-white transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
              {copied && <span className="text-xs text-cyan-400">Copied!</span>}
            </div>
          </div>

          {/* Portfolio Checklist Accordion */}
          <div className="bg-zinc-900/40 border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-300">
            <div
              onClick={() => setChecklistOpen(!checklistOpen)}
              className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/[0.02] transition-colors"
            >
              <div className="space-y-1">
                <h2 className="text-base font-bold text-white">Portfolio Checklist</h2>
                <p className="text-sm text-zinc-400">Complete 1 more section</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white">
                  3/4
                </span>
                {checklistOpen ? (
                  <ChevronUp className="w-5 h-5 text-zinc-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-500" />
                )}
              </div>
            </div>

            {checklistOpen && (
              <div className="px-6 pb-6 border-t border-white/[0.06] pt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-sm font-semibold mt-0.5">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-white">Basic Information</p>
                  </div>
                </div>

                <div className="flex items-start justify-between border border-white/[0.06] bg-white/[0.01] rounded-xl p-4">
                  <div className="flex gap-3">
                    <span className="text-amber-500 text-sm font-semibold mt-0.5">⚠</span>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-white">AI Personality</p>
                      <ul className="list-disc pl-4 text-xs text-zinc-500 space-y-1">
                        <li>Add your current role <span className="text-zinc-600">(required)</span></li>
                        <li>Add what drives you <span className="text-zinc-600">(required)</span></li>
                        <li>Add your communication style <span className="text-zinc-600">(required)</span></li>
                      </ul>
                    </div>
                  </div>
                  <button className="text-xs font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-all self-start">
                    Complete
                  </button>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-sm font-semibold mt-0.5">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-white">Tools</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-sm font-semibold mt-0.5">✓</span>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">Suggested Questions</p>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-white/5 border border-white/10 rounded-full text-zinc-400">
                      8
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive AI Preview Sandbox Card */}
          <div className="bg-zinc-900/30 border border-white/[0.06] rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-violet-600/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="text-center space-y-1 mb-8">
              <span className="text-xs text-zinc-500 uppercase tracking-widest">Hey, I&apos;m {userName.toLowerCase().replace(/\s+/g, "")} 👋</span>
              <h2 className="text-3xl font-extrabold text-white">AI Portfolio</h2>
            </div>

            {/* Custom sketch avatar */}
            <div className="w-40 h-40 bg-zinc-950 border border-white/10 rounded-full flex items-center justify-center overflow-hidden mb-8 shadow-inner">
              <svg viewBox="0 0 200 200" className="w-32 h-32 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M70,140 Q100,165 130,140" strokeLinecap="round" />
                <circle cx="80" cy="95" r="5" fill="currentColor" />
                <circle cx="120" cy="95" r="5" fill="currentColor" />
                <path d="M100,98 L100,118" strokeLinecap="round" />
                {/* Hair line */}
                <path d="M50,90 Q100,50 150,90" strokeLinecap="round" />
                <path d="M50,90 Q40,110 55,120" strokeLinecap="round" />
                <path d="M150,90 Q160,110 145,120" strokeLinecap="round" />
                {/* Minimalist Hat style outline */}
                <path d="M60,60 L140,60 L130,35 L70,35 Z" fill="none" />
                <path d="M45,65 Q100,75 155,65" strokeLinecap="round" />
              </svg>
            </div>

            {/* Simulated Input field */}
            <div className="w-full max-w-xl relative">
              <input
                type="text"
                placeholder="Ask me anything..."
                disabled
                className="w-full bg-zinc-950/80 border border-white/10 rounded-full px-6 py-4 pr-14 text-sm text-white placeholder-zinc-500 outline-none cursor-not-allowed"
              />
              <button className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 cursor-not-allowed">
                →
              </button>
            </div>

            {/* Quick buttons */}
            <div className="flex gap-3 mt-6">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-400">Video</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-400">Location</span>
            </div>
          </div>

          {/* Analytics Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-950 border border-white/[0.06] rounded-2xl p-6">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Total messages used</p>
              <p className="text-3xl font-extrabold text-white">2<span className="text-zinc-600 text-lg font-medium">/5</span></p>
            </div>

            <div className="bg-zinc-950 border border-white/[0.06] rounded-2xl p-6">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Messages today</p>
              <p className="text-3xl font-extrabold text-white">0</p>
            </div>

            <div className="bg-zinc-950 border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Unlock Analytics</p>
                <TrendingUp className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-sm font-semibold text-cyan-400 mt-2 hover:underline cursor-pointer">Upgrade to access →</p>
            </div>
          </div>

          {/* Recent Visitor Questions */}
          <div className="bg-zinc-900/20 border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Recent Visitor Questions
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </h2>
              <button className="text-xs text-zinc-400 hover:text-white transition-colors">
                View all
              </button>
            </div>

            <div className="space-y-3">
              {[1, 2].map((_, i) => (
                <div key={i} className="flex justify-between items-center py-3.5 px-4 bg-zinc-950/60 border border-white/[0.06] rounded-xl">
                  <p className="text-sm font-medium text-white">Where are you located?</p>
                  <p className="text-xs text-zinc-500">25d ago · Tunis, Tunisia</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Quick Actions Row */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Basic Info", id: "basic-info" },
                { label: "AI Personality", id: "ai-personality" },
                { label: "Tools", id: "tools" },
                { label: "Questions", id: "questions" },
              ].map((act) => (
                <button
                  key={act.id}
                  onClick={() => setActiveId(act.id)}
                  className="p-4 rounded-xl border border-white/[0.06] bg-zinc-950 hover:bg-white/[0.02] hover:border-white/10 transition-all text-center text-xs font-semibold text-white cursor-pointer"
                >
                  {act.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Footer */}
          <footer className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <span>Fastfolio © 2026</span>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer">Dashboard</span>
              <span className="hover:text-white cursor-pointer">Billing</span>
              <span className="hover:text-white cursor-pointer">Support</span>
            </div>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer">Terms</span>
              <span className="hover:text-white cursor-pointer">Privacy</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
