import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Sparkles, Layout, Settings, BarChart2, Eye, LogOut } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* Dashboard Header */}
      <header className="border-b border-white/10 bg-zinc-950/50 backdrop-blur px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="font-bold text-lg tracking-wide text-white">
                TWINFOLIO
              </span>
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-sm text-zinc-400 font-medium tracking-wide">Workspace</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">
              Welcome, <span className="text-white font-semibold">{session.user.name}</span>
            </span>
            <Link
              href="/"
              className="px-4 py-2 text-xs bg-white/5 border border-white/10 hover:bg-white/10 rounded-full transition-all cursor-pointer text-zinc-300 hover:text-white"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 flex flex-col gap-2">
          {[
            { label: "Overview", icon: Layout, active: true },
            { label: "Analytics", icon: BarChart2, active: false },
            { label: "Twin Configuration", icon: Settings, active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                item.active
                  ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/10 border border-violet-500/30 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <item.icon className="size-4 text-cyan-400" />
              {item.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="lg:col-span-3 space-y-8">
          {/* Main Status Panel */}
          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                  Twin Live
                </div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {session.user.name}'s Digital Twin
                </h1>
                <p className="text-zinc-400 text-sm">
                  Your AI portfolio assistant is trained and online.
                </p>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-white text-black font-bold px-5 py-3 rounded-full hover:bg-zinc-200 cursor-pointer shadow-lg active:scale-95 transition-all text-sm">
                  <Eye className="size-4" />
                  View Live Twin
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5 relative z-10">
              {[
                { label: "Profile Views", value: "342", change: "+12% this week" },
                { label: "AI Chats Initiated", value: "87", change: "+8% this week" },
                { label: "Contact Form / Links", value: "14", change: "Steady" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/[0.02] border border-white/5 rounded-2xl p-5"
                >
                  <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-extrabold">{stat.value}</p>
                  <p className="text-zinc-400 text-xs mt-1">{stat.change}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Knowledge Training */}
          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 space-y-4">
            <h2 className="text-xl font-bold">Knowledge Sources</h2>
            <p className="text-zinc-400 text-sm max-w-xl">
              Add custom documents, project briefs, or link your social profiles to increase your AI twin's answering accuracy.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold px-5 py-3 rounded-full cursor-pointer transition-all text-sm">
                + Upload Resume
              </button>
              <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold px-5 py-3 rounded-full cursor-pointer transition-all text-sm">
                + Sync LinkedIn
              </button>
              <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold px-5 py-3 rounded-full cursor-pointer transition-all text-sm">
                + Add Custom Q&A
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
