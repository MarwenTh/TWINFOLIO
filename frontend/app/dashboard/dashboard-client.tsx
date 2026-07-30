"use client";

import { useState, useEffect } from "react";
import Switch from "@/components/ui/sky-toggle";
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
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Sync with the current html class on mount
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const handleToggle = (checked: boolean) => {
    if (checked) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setIsDark(false);
    }
  };

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
    <div className="relative flex h-screen bg-background text-foreground transition-colors duration-300 overflow-hidden">
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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        {/* Topbar */}
        <header className="h-14 border-b border-border flex items-center px-6 justify-between bg-card/60 backdrop-blur shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-md text-zinc-500 hover:bg-white/5 hover:text-foreground transition-colors"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="w-[18px] h-[18px]" strokeWidth={1.5} />
              ) : (
                <PanelLeftOpen className="w-[18px] h-[18px]" strokeWidth={1.5} />
              )}
            </button>
            <span className="text-sm font-semibold tracking-wide text-foreground">
              {pageTitles[activeId] ?? "Workspace"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Switch checked={isDark} onChange={handleToggle} />
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
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                  Hello {userName.toLowerCase().replace(/\s+/g, "")}!
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-sm hover:underline cursor-pointer select-all">{portfolioUrl}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {copied && <span className="text-xs text-cyan-400">Copied!</span>}
                </div>
              </div>

              {/* Portfolio Checklist Accordion */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300">
                <div
                  onClick={() => setChecklistOpen(!checklistOpen)}
                  className="flex items-center justify-between p-6 cursor-pointer hover:bg-accent/30 transition-colors"
                >
                  <div className="space-y-1">
                    <h2 className="text-base font-bold text-foreground">Portfolio Checklist</h2>
                    <p className="text-sm text-muted-foreground">Complete 1 more section</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-full bg-accent border border-border text-xs font-semibold text-foreground">
                      3/4
                    </span>
                    {checklistOpen ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {checklistOpen && (
                  <div className="px-6 pb-6 border-t border-border pt-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-400 text-sm font-semibold mt-0.5">✓</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Basic Information</p>
                      </div>
                    </div>

                    <div className="flex items-start justify-between border border-border bg-muted/30 rounded-xl p-4">
                      <div className="flex gap-3">
                        <span className="text-amber-500 text-sm font-semibold mt-0.5">⚠</span>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-foreground">AI Personality</p>
                          <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1">
                            <li>Add your current role <span className="opacity-60">(required)</span></li>
                            <li>Add what drives you <span className="opacity-60">(required)</span></li>
                            <li>Add your communication style <span className="opacity-60">(required)</span></li>
                          </ul>
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveId("ai-personality")}
                        className="text-xs font-semibold bg-foreground text-background px-4 py-2 rounded-full hover:opacity-80 transition-all self-start cursor-pointer"
                      >
                        Complete
                      </button>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-emerald-400 text-sm font-semibold mt-0.5">✓</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Tools</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-emerald-400 text-sm font-semibold mt-0.5">✓</span>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">Suggested Questions</p>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-accent border border-border rounded-full text-muted-foreground">
                          8
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Interactive AI Preview Sandbox Card */}
              <div className="bg-card border border-border rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-violet-600/5 rounded-full blur-[80px] pointer-events-none" />

                <div className="text-center space-y-1 mb-8">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Hey, I&apos;m {userName.toLowerCase().replace(/\s+/g, "")} 👋</span>
                  <h2 className="text-3xl font-extrabold text-foreground">AI Portfolio</h2>
                </div>

                {/* Custom sketch avatar */}
                <div className="w-40 h-40 bg-muted border border-border rounded-full flex items-center justify-center overflow-hidden mb-8 shadow-inner">
                  <svg viewBox="0 0 200 200" className="w-32 h-32 text-foreground" fill="none" stroke="currentColor" strokeWidth="2.5">
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
                    className="w-full bg-muted border border-border rounded-full px-6 py-4 pr-14 text-sm text-foreground placeholder:text-muted-foreground outline-none cursor-not-allowed"
                  />
                  <button className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-accent border border-border flex items-center justify-center text-muted-foreground cursor-not-allowed">
                    →
                  </button>
                </div>

                {/* Quick buttons */}
                <div className="flex gap-3 mt-6">
                  <span className="px-4 py-2 rounded-xl bg-accent border border-border text-xs text-muted-foreground">Video</span>
                  <span className="px-4 py-2 rounded-xl bg-accent border border-border text-xs text-muted-foreground">Location</span>
                </div>
              </div>

              {/* Analytics Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Total messages used</p>
                  <p className="text-3xl font-extrabold text-foreground">2<span className="text-muted-foreground text-lg font-medium">/5</span></p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Messages today</p>
                  <p className="text-3xl font-extrabold text-foreground">0</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Unlock Analytics</p>
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
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                    Recent Visitor Questions
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </h2>
                  <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    View all
                  </button>
                </div>

                <div className="space-y-3">
                  {[1, 2].map((_, i) => (
                    <div key={i} className="flex justify-between items-center py-3.5 px-4 bg-muted/40 border border-border rounded-xl">
                      <p className="text-sm font-medium text-foreground">Where are you located?</p>
                      <p className="text-xs text-muted-foreground">25d ago · Tunis, Tunisia</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Actions Row */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Quick Actions</h3>
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
                      className="p-4 rounded-xl border border-border bg-card hover:bg-accent transition-all text-center text-xs font-semibold text-foreground cursor-pointer"
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
              <div className="w-16 h-16 rounded-full bg-accent border border-border flex items-center justify-center">
                <Crown className="w-8 h-8 text-amber-400" />
              </div>
              <div className="space-y-2 max-w-md">
                <h2 className="text-2xl font-bold text-foreground">Analytics is a Pro Feature</h2>
                <p className="text-sm text-muted-foreground">
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
                <h1 className="text-3xl font-extrabold text-foreground">Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage your account settings and preferences</p>
              </div>

              {/* Account Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">Account</h2>
                
                <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Account management</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Manage your login info and account security.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Username */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Username</label>
                      <div className="relative max-w-lg">
                        <input
                          type="text"
                          defaultValue={userName.toLowerCase().replace(/\s+/g, "")}
                          className="w-full bg-muted border border-emerald-500/30 text-foreground px-4 py-3 rounded-xl text-sm focus:outline-none pr-10"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 text-sm font-semibold">✓</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Your portfolio will be available at: <span className="text-foreground/70">{portfolioUrl}</span></p>
                    </div>

                    {/* Email */}
                    <div className="space-y-1 pt-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Email</label>
                      <span className="text-sm font-medium text-foreground">{userEmail ?? "marwentahouri2@gmail.com"}</span>
                    </div>

                    {/* Last Sign In */}
                    <div className="space-y-1 pt-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Last sign in</label>
                      <span className="text-sm font-medium text-foreground">7/5/2026, 11:52:12 PM</span>
                    </div>

                    {/* Account Type */}
                    <div className="space-y-1 pt-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Account type</label>
                      <span className="text-sm font-medium text-foreground">Google Account</span>
                    </div>

                    {/* Delete Account */}
                    <div className="pt-4 border-t border-border flex justify-start">
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
                <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">Billing</h2>
                
                <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Billing & Subscription</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Manage your subscription and billing information.</p>
                  </div>

                  <div className="bg-muted/30 border border-border rounded-xl p-4 text-xs text-muted-foreground max-w-2xl leading-relaxed">
                    You&apos;re on the <span className="text-foreground font-semibold">Free plan with 5 AI messages</span>. Upgrade to Pro for unlimited AI conversations.
                  </div>

                  <div className="flex flex-col gap-4 max-w-sm pt-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Plan:</span>
                      <span className="text-xs font-semibold bg-accent border border-border px-3 py-1 rounded-full text-foreground">Free Plan</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm py-3 rounded-full cursor-pointer transition-all">
                      Upgrade to Pro
                    </button>
                    <span className="text-[10px] text-muted-foreground/60 text-center">Cancel anytime.</span>
                  </div>
                </div>
              </div>

              {/* Portfolio Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">Portfolio</h2>
                
                <div className="space-y-4">
                  {/* Badge card */}
                  <div className="bg-card border border-border rounded-2xl p-6 flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">Fastfolio Badge</h3>
                        <span className="text-[9px] font-extrabold bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded uppercase tracking-wider">Pro</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Show Fastfolio Badge. Required for free plan.</p>
                    </div>
                    <button
                      onClick={() => setShowBadge(!showBadge)}
                      className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                        showBadge ? "bg-cyan-500" : "bg-muted"
                      }`}
                    >
                      <div className={`w-4 h-4 bg-background rounded-full transition-transform duration-200 border border-border ${
                        showBadge ? "translate-x-5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  {/* Custom Domain card */}
                  <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-foreground">Custom Domain</h3>
                          <span className="text-[9px] font-extrabold bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded uppercase tracking-wider">Pro</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Use your own domain instead of fastfol.io/marwentaho</p>
                      </div>
                      <Globe className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <div className="bg-muted/30 border border-border rounded-xl p-4 text-xs text-muted-foreground leading-relaxed">
                      Custom domains are available for Pro users.
                    </div>

                    <button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-xs px-6 py-3 rounded-full cursor-pointer transition-all">
                      Upgrade to Pro
                    </button>
                  </div>

                  {/* Recreate Portfolio card */}
                  <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-foreground">Recreate Portfolio</h3>
                      <p className="text-xs text-muted-foreground">Start fresh by importing your resume or LinkedIn profile again.</p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">What will happen:</p>
                      <ul className="text-xs text-muted-foreground space-y-2 pl-2">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                          Your AI personality will be regenerated
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                          Projects and skills will be updated
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                          Contact information will be refreshed
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                          All manual edits will be lost
                        </li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl pt-2">
                      <button className="flex items-center justify-center gap-2 bg-accent border border-border hover:bg-muted text-foreground font-semibold text-xs py-3 rounded-xl transition-all cursor-pointer">
                        <svg className="w-4 h-4 text-blue-400 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                        LinkedIn PDF Export
                      </button>
                      <button className="flex items-center justify-center gap-2 bg-accent border border-border hover:bg-muted text-foreground font-semibold text-xs py-3 rounded-xl transition-all cursor-pointer">
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
            <div className="bg-card border border-border rounded-3xl p-12 text-center max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-cyan-400">
                {activeId === "basic-info" && <User className="w-8 h-8" />}
                {activeId === "ai-personality" && <Sparkles className="w-8 h-8" />}
                {activeId === "tools" && <Wrench className="w-8 h-8" />}
                {activeId === "questions" && <HelpCircle className="w-8 h-8" />}
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-foreground capitalize">{pageTitles[activeId]} Config</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Customize the raw parameters, vector inputs, or prompt templates for your portfolio twin section.
                </p>
              </div>
              <div className="bg-muted border border-border rounded-2xl p-6 text-left space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-3">
                  <span className="text-xs font-semibold text-muted-foreground">Source status</span>
                  <span className="text-xs text-emerald-400 font-semibold">Ready</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-muted-foreground">Section visibility</span>
                  <span className="text-xs text-cyan-400 font-semibold">Active</span>
                </div>
              </div>
            </div>
          )}

          {/* Custom Footer */}
          {activeId === "overview" && (
            <footer className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
              <span>Fastfolio © 2026</span>
              <div className="flex gap-6">
                <span className="hover:text-foreground cursor-pointer transition-colors" onClick={() => setActiveId("overview")}>Dashboard</span>
                <span className="hover:text-foreground cursor-pointer transition-colors" onClick={() => setActiveId("settings")}>Billing</span>
                <span className="hover:text-foreground cursor-pointer transition-colors">Support</span>
              </div>
              <div className="flex gap-6">
                <span className="hover:text-foreground cursor-pointer transition-colors">Terms</span>
                <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
              </div>
            </footer>
          )}
        </main>
      </div>
    </div>
  );
}
