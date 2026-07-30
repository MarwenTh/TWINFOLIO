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
  Crown,
  Trash2,
  Globe,
  RefreshCw,
  FileText,
  Wrench,
  User,
  HelpCircle,
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
  const [showBadge, setShowBadge] = useState(true);

  const portfolioUrl = `https://www.fastfol.io/${userName.toLowerCase().replace(/\s+/g, "")}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pageTitles: Record<string, string> = {
    overview: "Workspace",
    analytics: "Analytics",
    settings: "Settings",
    "basic-info": "Basic Info",
    "ai-personality": "AI Personality",
    tools: "Tools",
    questions: "Questions",
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
              {pageTitles[activeId] ?? "Workspace"}
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
        <main className="flex-1 overflow-y-auto p-6 md:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* ──────────────────────────────────────────────────────── */}
          {/* 1. DASHBOARD VIEW (overview)                            */}
          {/* ──────────────────────────────────────────────────────── */}
          {activeId === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-200">
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
                      <button 
                        onClick={() => setActiveId("ai-personality")}
                        className="text-xs font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-all self-start cursor-pointer"
                      >
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
                    <path d="M50,90 Q100,50 150,90" strokeLinecap="round" />
                    <path d="M50,90 Q40,110 55,120" strokeLinecap="round" />
                    <path d="M150,90 Q160,110 145,120" strokeLinecap="round" />
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
                  <p 
                    onClick={() => setActiveId("analytics")}
                    className="text-sm font-semibold text-cyan-400 mt-2 hover:underline cursor-pointer"
                  >
                    Upgrade to access →
                  </p>
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
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* 2. ANALYTICS VIEW                                       */}
          {/* ──────────────────────────────────────────────────────── */}
          {activeId === "analytics" && (
            <div className="h-[70vh] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Crown className="w-8 h-8 text-amber-400" />
              </div>
              <div className="space-y-2 max-w-md">
                <h2 className="text-2xl font-bold text-white">Analytics is a Pro Feature</h2>
                <p className="text-sm text-zinc-400">
                  Unlock detailed analytics and insights about your portfolio performance with a Pro subscription.
                </p>
              </div>
              <button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-sm px-8 py-3 rounded-full cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-violet-500/20">
                Upgrade to Pro
              </button>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* 3. SETTINGS VIEW                                        */}
          {/* ──────────────────────────────────────────────────────── */}
          {activeId === "settings" && (
            <div className="space-y-10 max-w-4xl mx-auto animate-in fade-in duration-200">
              <div>
                <h1 className="text-3xl font-extrabold text-white">Settings</h1>
                <p className="text-sm text-zinc-400 mt-1">Manage your account settings and preferences</p>
              </div>

              {/* Account Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-white border-b border-white/[0.06] pb-2">Account</h2>
                
                <div className="bg-zinc-950 border border-white/[0.06] rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Account management</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">Manage your login info and account security.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Username */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Username</label>
                      <div className="relative max-w-lg">
                        <input
                          type="text"
                          defaultValue={userName.toLowerCase().replace(/\s+/g, "")}
                          className="w-full bg-zinc-900 border border-emerald-500/30 text-white px-4 py-3 rounded-xl text-sm focus:outline-none pr-10"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 text-sm font-semibold">✓</span>
                      </div>
                      <p className="text-xs text-zinc-500">Your portfolio will be available at: <span className="text-zinc-400">{portfolioUrl}</span></p>
                    </div>

                    {/* Email */}
                    <div className="space-y-1 pt-2">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Email</label>
                      <span className="text-sm font-medium text-white">{userEmail ?? "marwentahouri2@gmail.com"}</span>
                    </div>

                    {/* Last Sign In */}
                    <div className="space-y-1 pt-2">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Last sign in</label>
                      <span className="text-sm font-medium text-white">7/5/2026, 11:52:12 PM</span>
                    </div>

                    {/* Account Type */}
                    <div className="space-y-1 pt-2">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Account type</label>
                      <span className="text-sm font-medium text-white">Google Account</span>
                    </div>

                    {/* Delete Account */}
                    <div className="pt-4 border-t border-white/[0.06] flex justify-start">
                      <button className="flex items-center gap-2 text-xs font-semibold bg-red-500/15 border border-red-500/20 text-red-400 px-5 py-2.5 rounded-full hover:bg-red-500/25 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete account
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-white border-b border-white/[0.06] pb-2">Billing</h2>
                
                <div className="bg-zinc-950 border border-white/[0.06] rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Billing & Subscription</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">Manage your subscription and billing information.</p>
                  </div>

                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 text-xs text-zinc-400 max-w-2xl leading-relaxed">
                    You&apos;re on the <span className="text-white font-semibold">Free plan with 5 AI messages</span>. Upgrade to Pro for unlimited AI conversations.
                  </div>

                  <div className="flex flex-col gap-4 max-w-sm pt-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Plan:</span>
                      <span className="text-xs font-semibold bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white">Free Plan</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm py-3 rounded-full cursor-pointer transition-all">
                      Upgrade to Pro
                    </button>
                    <span className="text-[10px] text-zinc-600 text-center">Cancel anytime.</span>
                  </div>
                </div>
              </div>

              {/* Portfolio Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-white border-b border-white/[0.06] pb-2">Portfolio</h2>
                
                <div className="space-y-4">
                  {/* Badge card */}
                  <div className="bg-zinc-950 border border-white/[0.06] rounded-2xl p-6 flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white">Fastfolio Badge</h3>
                        <span className="text-[9px] font-extrabold bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded uppercase tracking-wider">Pro</span>
                      </div>
                      <p className="text-xs text-zinc-500">Show Fastfolio Badge. Required for free plan.</p>
                    </div>
                    <button
                      onClick={() => setShowBadge(!showBadge)}
                      className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                        showBadge ? "bg-cyan-500" : "bg-zinc-800"
                      }`}
                    >
                      <div className={`w-4 h-4 bg-black rounded-full transition-transform duration-200 ${
                        showBadge ? "translate-x-5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  {/* Custom Domain card */}
                  <div className="bg-zinc-950 border border-white/[0.06] rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-white">Custom Domain</h3>
                          <span className="text-[9px] font-extrabold bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded uppercase tracking-wider">Pro</span>
                        </div>
                        <p className="text-xs text-zinc-500">Use your own domain instead of fastfol.io/marwentaho</p>
                      </div>
                      <Globe className="w-5 h-5 text-zinc-500" />
                    </div>

                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 text-xs text-zinc-400 leading-relaxed">
                      Custom domains are available for Pro users.
                    </div>

                    <button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-xs px-6 py-3 rounded-full cursor-pointer transition-all">
                      Upgrade to Pro
                    </button>
                  </div>

                  {/* Recreate Portfolio card */}
                  <div className="bg-zinc-950 border border-white/[0.06] rounded-2xl p-6 space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-white">Recreate Portfolio</h3>
                      <p className="text-xs text-zinc-500">Start fresh by importing your resume or LinkedIn profile again.</p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">What will happen:</p>
                      <ul className="text-xs text-zinc-500 space-y-2 pl-2">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                          Your AI personality will be regenerated
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                          Projects and skills will be updated
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                          Contact information will be refreshed
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                          All manual edits will be lost
                        </li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl pt-2">
                      <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-xs py-3 rounded-xl transition-all cursor-pointer">
                        <svg className="w-4 h-4 text-blue-400 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                        LinkedIn PDF Export
                      </button>
                      <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-xs py-3 rounded-xl transition-all cursor-pointer">
                        <FileText className="w-4 h-4 text-cyan-400" />
                        Resume PDF
                      </button>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 bg-red-600/90 hover:bg-red-500 text-white font-bold text-xs py-3.5 rounded-full cursor-pointer transition-all">
                      <RefreshCw className="w-3.5 h-3.5" />
                      Recreate Portfolio
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* 4. STATIC PORTFOLIO SECTIONS STUBS                       */}
          {/* ──────────────────────────────────────────────────────── */}
          {["basic-info", "ai-personality", "tools", "questions"].includes(activeId) && (
            <div className="bg-zinc-900/30 border border-white/[0.06] rounded-3xl p-12 text-center max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-cyan-400">
                {activeId === "basic-info" && <User className="w-8 h-8" />}
                {activeId === "ai-personality" && <Sparkles className="w-8 h-8" />}
                {activeId === "tools" && <Wrench className="w-8 h-8" />}
                {activeId === "questions" && <HelpCircle className="w-8 h-8" />}
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white capitalize">{pageTitles[activeId]} Config</h2>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                  Customize the raw parameters, vector inputs, or prompt templates for your portfolio twin section.
                </p>
              </div>
              <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-left space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-xs font-semibold text-zinc-400">Source status</span>
                  <span className="text-xs text-emerald-400 font-semibold">Ready</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-zinc-400">Section visibility</span>
                  <span className="text-xs text-cyan-400 font-semibold">Active</span>
                </div>
              </div>
            </div>
          )}

          {/* Custom Footer */}
          {activeId === "overview" && (
            <footer className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
              <span>Fastfolio © 2026</span>
              <div className="flex gap-6">
                <span className="hover:text-white cursor-pointer" onClick={() => setActiveId("overview")}>Dashboard</span>
                <span className="hover:text-white cursor-pointer" onClick={() => setActiveId("settings")}>Billing</span>
                <span className="hover:text-white cursor-pointer">Support</span>
              </div>
              <div className="flex gap-6">
                <span className="hover:text-white cursor-pointer">Terms</span>
                <span className="hover:text-white cursor-pointer">Privacy</span>
              </div>
            </footer>
          )}
        </main>
      </div>
    </div>
  );
}
