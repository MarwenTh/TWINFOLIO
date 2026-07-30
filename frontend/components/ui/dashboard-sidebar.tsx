"use client";

import React, { useState } from "react";
import {
  Search,
  LayoutDashboard,
  Settings,
  User,
  Sparkles,
  Wrench,
  HelpCircle,
  ChevronDown,
  Activity,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";

export type NavItemData = {
  id: string;
  title: string;
  icon: React.ElementType;
  badge?: React.ReactNode;
};

export type NavGroupData = {
  heading?: string;
  items: NavItemData[];
};

export function SidebarNav({
  className = "",
  activeId = "overview",
  onSelect,
  userName = "Marwen Tahouri",
  userEmail = "marwentahouri@gmail.com",
}: {
  className?: string;
  activeId?: string;
  onSelect?: (id: string) => void;
  userName?: string;
  userEmail?: string;
}) {
  const handleSelect = onSelect || (() => {});

  const mainItems: NavItemData[] = [
    { id: "overview", title: "Dashboard", icon: LayoutDashboard },
    { id: "analytics", title: "Analytics", icon: Activity },
    { id: "settings", title: "Settings", icon: Settings },
  ];

  const portfolioItems: NavItemData[] = [
    {
      id: "basic-info",
      title: "Basic Info",
      icon: User,
      badge: <span className="text-[11px] text-emerald-400 font-semibold">✓</span>,
    },
    { id: "ai-personality", title: "AI Personality", icon: Sparkles },
    {
      id: "tools",
      title: "Tools",
      icon: Wrench,
      badge: <span className="text-[11px] text-emerald-400 font-semibold">✓</span>,
    },
    {
      id: "questions",
      title: "Questions",
      icon: HelpCircle,
      badge: <span className="text-[11px] text-emerald-400 font-semibold">✓</span>,
    },
  ];

  return (
    <div
      className={`flex flex-col w-[260px] h-full bg-card border-r border-border p-4 font-sans select-none justify-between transition-colors duration-300 ${className}`}
    >
      <div className="flex flex-col gap-6">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2.5 px-1 py-1">
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <div className="w-2.5 h-2.5 bg-white rounded-[3px]" />
          </div>
          <span className="font-bold text-[15px] tracking-wide text-foreground">
            Fastfolio
          </span>
        </div>

        {/* Main Section */}
        <div className="flex flex-col gap-1.5">
          {mainItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left transition-colors text-[13px] font-medium ${
                  isActive
                    ? "bg-accent text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon
                    className={`w-4 h-4 ${
                      isActive ? "text-cyan-400" : "text-muted-foreground"
                    }`}
                    strokeWidth={2}
                  />
                  <span>{item.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Portfolio Section */}
        <div className="flex flex-col gap-1.5">
          <span className="px-3 mb-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
            Portfolio
          </span>
          {portfolioItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left transition-colors text-[13px] font-medium ${
                  isActive
                    ? "bg-accent text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon
                    className={`w-4 h-4 ${
                      isActive ? "text-cyan-400" : "text-muted-foreground"
                    }`}
                    strokeWidth={2}
                  />
                  <span>{item.title}</span>
                </div>
                {item.badge && <div className="ml-auto">{item.badge}</div>}
              </button>
            );
          })}
        </div>

        {/* Share Button */}
        <div className="px-1 mt-1">
          <button className="w-full py-2.5 rounded-full border border-border bg-accent hover:bg-accent/70 text-[12px] font-semibold text-foreground transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] cursor-pointer">
            Share Portfolio
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4 pt-4 border-t border-border">
        {/* Suggest a feature */}
        <button className="flex items-center justify-between px-2 text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors text-left cursor-pointer">
          <span>Suggest a feature</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        {/* AI Messages Counter */}
        <div className="px-2 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground font-medium">
            <span>AI Messages</span>
            <span>2/5</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="w-[40%] h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full" />
          </div>
        </div>

        {/* Profile Card */}
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-accent cursor-pointer transition-colors">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-[12px] text-white shrink-0">
              {userName.charAt(0)}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[12px] font-semibold text-foreground leading-none mb-1 truncate">
                {userName}
              </span>
              <span className="text-[10px] text-muted-foreground leading-none truncate">
                {userEmail}
              </span>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        </div>
      </div>
    </div>
  );
}
