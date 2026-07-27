"use client";

import React, { useState } from "react";
import {
  Search,
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  LogOut,
  Hash,
  ChevronDown,
  ChevronRight,
  Inbox,
  Activity,
  CreditCard,
  Globe,
  Terminal,
  Blocks,
  Command,
  X,
  Sparkles,
  Upload,
  Eye,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export type NavItemData = {
  id: string;
  title: string;
  icon: React.ElementType;
  badge?: number | string;
  shortcut?: string;
  children?: NavItemData[];
};

export type NavGroupData = {
  heading?: string;
  items: NavItemData[];
};

/* ------------------------------------------------------------------ */
/*  TWINFOLIO-specific navigation config                               */
/* ------------------------------------------------------------------ */

const twinfolicNavGroups: NavGroupData[] = [
  {
    items: [
      { id: "search", title: "Search", icon: Search, shortcut: "⌘K" },
      { id: "overview", title: "Overview", icon: LayoutDashboard },
      { id: "inbox", title: "Inbox", icon: Inbox, badge: 3 },
      { id: "analytics", title: "Analytics", icon: Activity },
    ],
  },
  {
    heading: "Portfolio",
    items: [
      {
        id: "portfolios",
        title: "My Portfolios",
        icon: FolderKanban,
        children: [
          { id: "p-live", title: "Live", icon: Hash },
          { id: "p-draft", title: "Drafts", icon: Hash },
          { id: "p-archived", title: "Archived", icon: Hash },
        ],
      },
      { id: "ai-twin", title: "AI Twin", icon: Sparkles },
      { id: "import", title: "Import", icon: Upload },
      { id: "preview", title: "Preview Live", icon: Eye },
    ],
  },
  {
    heading: "Account",
    items: [
      { id: "billing", title: "Billing", icon: CreditCard },
      { id: "custom-domain", title: "Custom Domain", icon: Globe },
      {
        id: "team",
        title: "Team",
        icon: Users,
        children: [
          { id: "t-members", title: "Members", icon: Hash },
          { id: "t-invites", title: "Invites", icon: Hash },
        ],
      },
    ],
  },
  {
    heading: "Developers",
    items: [
      { id: "api", title: "API Keys", icon: Terminal },
      { id: "webhooks", title: "Webhooks", icon: Blocks },
      { id: "integrations", title: "Integrations", icon: Zap },
    ],
  },
];

const bottomItems: NavItemData[] = [
  { id: "settings", title: "Settings", icon: Settings, shortcut: "⌘," },
  { id: "logout", title: "Log out", icon: LogOut },
];

/* ------------------------------------------------------------------ */
/*  WorkspaceSwitcher                                                   */
/* ------------------------------------------------------------------ */

function WorkspaceSwitcher({
  name,
  plan = "Pro Plan",
}: {
  name: string;
  plan?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(name);
  const workspaces = [name, "Personal Workspace", "Client Sandbox"];

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-2 py-2 mb-4 rounded-lg hover:bg-white/5 cursor-pointer transition-colors select-none group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[6px] bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-[13px] shadow-sm text-white">
            {selected.charAt(0)}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[13px] font-medium leading-none mb-1 text-white truncate max-w-[120px]">
              {selected}
            </span>
            <span className="text-[11px] text-zinc-500 leading-none">{plan}</span>
          </div>
        </div>
        <ChevronDown
          className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0"
          strokeWidth={1.5}
        />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-[52px] left-0 w-full bg-zinc-900 border border-white/10 rounded-lg shadow-xl z-50 py-1 flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-100">
            {workspaces.map((ws) => (
              <div
                key={ws}
                onClick={() => {
                  setSelected(ws);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 mx-1 text-[13px] rounded-md cursor-pointer transition-colors ${
                  selected === ws
                    ? "bg-violet-500/20 text-violet-300 font-medium"
                    : "text-zinc-300 hover:bg-white/5"
                }`}
              >
                {ws}
              </div>
            ))}
            <div className="h-px bg-white/10 my-1 mx-2" />
            <div className="px-3 py-2 mx-1 text-[13px] text-zinc-500 hover:bg-white/5 rounded-md cursor-pointer flex items-center gap-2 transition-colors">
              <span className="text-[16px] leading-none mb-0.5">+</span> Create Workspace
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NavItem (recursive)                                                 */
/* ------------------------------------------------------------------ */

function NavItem({
  item,
  activeId,
  onSelect,
  level = 0,
}: {
  item: NavItemData;
  activeId: string;
  onSelect: (id: string) => void;
  level?: number;
}) {
  const isActive = activeId === item.id;
  const hasChildren = !!item.children;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else {
      onSelect(item.id);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className={`group flex items-center justify-between px-2.5 py-[7px] rounded-[6px] cursor-pointer transition-all duration-200 select-none
          ${
            isActive
              ? "bg-white/10 text-white font-medium"
              : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
          }
        `}
        style={{ paddingLeft: `${level * 12 + 10}px` }}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2.5">
          <item.icon
            className={`w-[16px] h-[16px] transition-colors ${
              isActive
                ? "text-cyan-400"
                : "text-zinc-500 group-hover:text-zinc-300"
            }`}
            strokeWidth={1.5}
          />
          <span className="text-[13px] tracking-wide truncate">{item.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {item.shortcut && (
            <kbd className="hidden group-hover:inline-flex items-center justify-center h-5 px-1.5 text-[10px] font-medium font-mono text-zinc-600 bg-zinc-800 border border-white/10 rounded-[4px]">
              {item.shortcut}
            </kbd>
          )}
          {item.badge && (
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-medium rounded-full bg-cyan-500/20 text-cyan-400">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <ChevronRight
              className={`w-3.5 h-3.5 text-zinc-600 transition-transform duration-200 ${
                isOpen ? "rotate-90" : ""
              }`}
              strokeWidth={2}
            />
          )}
        </div>
      </div>

      {hasChildren && (
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden min-h-0 relative flex flex-col gap-0.5 mt-0.5">
            <div
              className="absolute top-0 bottom-0 border-l border-white/5"
              style={{ left: `${level * 12 + 17.5}px` }}
            />
            {item.children!.map((child) => (
              <NavItem
                key={child.id}
                item={child}
                activeId={activeId}
                onSelect={onSelect}
                level={level + 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SidebarNav — main exportable sidebar                               */
/* ------------------------------------------------------------------ */

export function SidebarNav({
  className = "",
  activeId,
  onSelect,
  userName,
  userPlan,
}: {
  className?: string;
  activeId?: string;
  onSelect?: (id: string) => void;
  userName?: string;
  userPlan?: string;
}) {
  const [internalId, setInternalId] = useState("overview");
  const currentId = activeId !== undefined ? activeId : internalId;
  const handleSelect = onSelect || setInternalId;

  return (
    <div
      className={`flex flex-col w-[260px] h-full bg-zinc-950 border-r border-white/[0.06] p-3 font-sans ${className}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 py-3 mb-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg">
          <div className="w-2.5 h-2.5 bg-white rounded-full" />
        </div>
        <span className="font-bold text-sm tracking-wide text-white">
          TWINFOLIO
        </span>
      </div>

      <WorkspaceSwitcher name={userName ?? "My Workspace"} plan={userPlan} />

      {/* Nav groups */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-4 mt-2">
        {twinfolicNavGroups.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-0.5">
            {group.heading && (
              <span className="px-2.5 mb-1 text-[10px] font-semibold tracking-widest text-zinc-600 uppercase">
                {group.heading}
              </span>
            )}
            {group.items.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                activeId={currentId}
                onSelect={handleSelect}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Bottom items */}
      <div className="mt-auto pt-4 border-t border-white/[0.06] flex flex-col gap-0.5">
        {bottomItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            activeId={currentId}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Search Modal                                                        */
/* ------------------------------------------------------------------ */

export function SearchModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm px-4">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 border-b border-white/10">
          <Search
            className="w-[18px] h-[18px] text-zinc-500 mr-3 shrink-0"
            strokeWidth={1.5}
          />
          <input
            autoFocus
            className="flex-1 bg-transparent py-4 outline-none text-[14px] text-white placeholder:text-zinc-600"
            placeholder="Search portfolios, settings, actions…"
          />
          <kbd
            onClick={onClose}
            className="hidden sm:inline-flex items-center justify-center h-5 px-1.5 ml-2 text-[10px] font-medium font-mono text-zinc-600 bg-zinc-800 border border-white/10 rounded-[4px] cursor-pointer hover:text-white transition-colors"
          >
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="ml-3 p-1 rounded-md text-zinc-600 hover:bg-white/5 hover:text-white transition-colors"
          >
            <X className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>
        </div>
        <div className="p-2 py-10 flex flex-col items-center justify-center">
          <Command
            className="w-6 h-6 text-zinc-700 mb-2"
            strokeWidth={1.5}
          />
          <p className="text-[13px] text-zinc-500 font-medium">
            Type a command or search…
          </p>
        </div>
      </div>
    </div>
  );
}

export default SidebarNav;
