"use client";

import { useState } from "react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Eye,
  Upload,
  BarChart2,
  MessageSquare,
  ArrowUpRight,
  Zap,
  Globe,
  Clock,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { SidebarNav, SearchModal } from "@/components/ui/dashboard-sidebar";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface DashboardClientProps {
  userName: string;
  userEmail?: string;
}

/* ------------------------------------------------------------------ */
/*  Stats Card                                                          */
/* ------------------------------------------------------------------ */

function StatCard({
  label,
  value,
  change,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="bg-zinc-950 border border-white/[0.06] rounded-2xl p-5 flex flex-col gap-4 hover:border-white/10 transition-colors">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
          {label}
        </p>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-4 h-4" strokeWidth={1.5} />
        </div>
      </div>
      <div>
        <p className="text-3xl font-extrabold text-white">{value}</p>
        <p className="text-xs text-zinc-500 mt-1">{change}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Portfolio Card                                                       */
/* ------------------------------------------------------------------ */

function PortfolioCard({
  name,
  views,
  chats,
  status,
  updatedAt,
}: {
  name: string;
  views: number;
  chats: number;
  status: "live" | "draft";
  updatedAt: string;
}) {
  return (
    <div className="group flex items-center justify-between py-4 px-5 bg-zinc-950 border border-white/[0.06] rounded-xl hover:border-white/10 transition-all cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/30 to-cyan-500/20 border border-violet-500/20 flex items-center justify-center">
          <span className="text-sm font-bold text-violet-300">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{name}</p>
          <div className="flex items-center gap-3 mt-0.5">
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                status === "live"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-zinc-800 text-zinc-500"
              }`}
            >
              {status === "live" ? "● Live" : "◌ Draft"}
            </span>
            <span className="text-[11px] text-zinc-600 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {updatedAt}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-semibold text-white">{views.toLocaleString()}</span>
          <span className="text-[11px] text-zinc-500">views</span>
        </div>
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-semibold text-white">{chats}</span>
          <span className="text-[11px] text-zinc-500">chats</span>
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white">
          <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Quick Action Button                                                  */
/* ------------------------------------------------------------------ */

function QuickAction({
  icon: Icon,
  label,
  description,
  gradient,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  gradient: string;
}) {
  return (
    <button
      className={`group w-full flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-zinc-950 hover:border-white/10 transition-all text-left cursor-pointer`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${gradient}`}
      >
        <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
      </div>
      <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 ml-auto shrink-0 transition-colors" strokeWidth={1.5} />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  DashboardClient                                                     */
/* ------------------------------------------------------------------ */

/**
 * Interactive dashboard shell — handles sidebar toggle, active nav,
 * search modal, and renders the main workspace content.
 */
export default function DashboardClient({ userName, userEmail }: DashboardClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeId, setActiveId] = useState("overview");
  const [searchOpen, setSearchOpen] = useState(false);

  const pageTitles: Record<string, string> = {
    overview: "Overview",
    inbox: "Inbox",
    analytics: "Analytics",
    portfolios: "My Portfolios",
    "ai-twin": "AI Twin",
    import: "Import",
    preview: "Preview Live",
    billing: "Billing",
    "custom-domain": "Custom Domain",
    team: "Team",
    api: "API Keys",
    webhooks: "Webhooks",
    integrations: "Integrations",
    settings: "Settings",
  };

  const handleSelect = (id: string) => {
    if (id === "search") {
      setSearchOpen(true);
      return;
    }
    setActiveId(id);
  };

  const portfolios = [
    { name: "Product Designer Portfolio", views: 1842, chats: 94, status: "live" as const, updatedAt: "2h ago" },
    { name: "UX Case Studies 2025", views: 673, chats: 31, status: "live" as const, updatedAt: "1d ago" },
    { name: "Freelance Showcase", views: 0, chats: 0, status: "draft" as const, updatedAt: "3d ago" },
  ];

  return (
    <div className="relative flex h-screen bg-black text-white overflow-hidden">
      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <div
        className={`h-full transition-all duration-300 ease-in-out shrink-0 overflow-hidden ${
          sidebarOpen ? "w-[260px]" : "w-0"
        }`}
      >
        <SidebarNav
          className="w-[260px]"
          activeId={activeId}
          onSelect={handleSelect}
          userName={userName}
          userPlan="Pro Plan"
        />
      </div>

      {/* ── Main area ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-14 border-b border-white/[0.06] flex items-center px-4 justify-between bg-zinc-950/80 backdrop-blur shrink-0">
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
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span className="truncate">{userName}</span>
              <span>/</span>
              <span className="font-medium text-white truncate">
                {pageTitles[activeId] ?? "Dashboard"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search shortcut */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 h-8 px-3 rounded-lg bg-white/5 border border-white/[0.06] text-zinc-500 text-xs hover:bg-white/10 hover:text-white transition-colors"
            >
              <span>Search…</span>
              <kbd className="text-[10px] font-mono bg-zinc-800 px-1.5 py-0.5 rounded border border-white/10">
                ⌘K
              </kbd>
            </button>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox:
                    "w-8 h-8 ring-2 ring-violet-500/30 hover:ring-cyan-500/50 transition-all",
                },
              }}
            />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Hero greeting */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Twin Live
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, {userName.split(" ")[0]} 👋
            </h1>
            <p className="text-zinc-400 text-sm mt-1.5">
              Your AI digital twin is active and answering visitors right now.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Profile Views"
              value="2,514"
              change="+18% this week"
              icon={Eye}
              color="bg-violet-500/20 text-violet-400"
            />
            <StatCard
              label="AI Chats"
              value="147"
              change="+23% this week"
              icon={MessageSquare}
              color="bg-cyan-500/20 text-cyan-400"
            />
            <StatCard
              label="Visitors Today"
              value="89"
              change="vs 64 yesterday"
              icon={BarChart2}
              color="bg-emerald-500/20 text-emerald-400"
            />
            <StatCard
              label="Connections"
              value="31"
              change="via contact form"
              icon={Zap}
              color="bg-orange-500/20 text-orange-400"
            />
          </div>

          {/* Two-col layout: portfolios + quick actions */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* Portfolio list */}
            <div className="xl:col-span-2 bg-zinc-900/50 border border-white/[0.06] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-white">My Portfolios</h2>
                <button className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                  View all <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {portfolios.map((p) => (
                  <PortfolioCard key={p.name} {...p} />
                ))}
              </div>
              <button className="mt-4 w-full py-3 rounded-xl border border-dashed border-white/10 text-zinc-600 hover:text-zinc-300 hover:border-white/20 text-sm transition-colors flex items-center justify-center gap-2">
                + Create new portfolio
              </button>
            </div>

            {/* Quick actions */}
            <div className="flex flex-col gap-4">
              <div className="bg-zinc-900/50 border border-white/[0.06] rounded-2xl p-6">
                <h2 className="text-base font-bold text-white mb-4">Quick Actions</h2>
                <div className="flex flex-col gap-3">
                  <QuickAction
                    icon={Upload}
                    label="Import from LinkedIn"
                    description="Auto-build from your profile"
                    gradient="bg-gradient-to-br from-blue-600 to-violet-600"
                  />
                  <QuickAction
                    icon={Sparkles}
                    label="Train AI Twin"
                    description="Upload docs & Q&A"
                    gradient="bg-gradient-to-br from-violet-600 to-pink-600"
                  />
                  <QuickAction
                    icon={Globe}
                    label="Set Custom Domain"
                    description="yourname.com → your twin"
                    gradient="bg-gradient-to-br from-cyan-600 to-teal-600"
                  />
                </div>
              </div>

              {/* AI Twin status card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-violet-600/20 to-cyan-600/10 border border-violet-500/20 rounded-2xl p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" />
                <Sparkles className="w-6 h-6 text-violet-400 mb-3" strokeWidth={1.5} />
                <p className="text-sm font-bold text-white mb-1">AI Twin Status</p>
                <p className="text-xs text-zinc-400 mb-4">
                  Trained on 3 sources · Last updated 2h ago
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-400">Online & responding</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Search modal */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
