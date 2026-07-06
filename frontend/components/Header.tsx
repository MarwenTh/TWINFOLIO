"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { useState } from "react";

/**
 * Global site header with Neon Auth controls.
 * Shows Log In / Start Free when signed out, User Profile / Sign Out when signed in.
 */
export default function Header() {
  const { data: session, isPending } = authClient.useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/40 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <span className="font-bold text-xl tracking-wide text-white">
            TWINFOLIO
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center bg-white/5 px-6 py-2 rounded-full border border-white/10">
          <Link
            href="#features"
            className="text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            Features
          </Link>
          <Link
            href="#showcase"
            className="text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            Showcase
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            Pricing
          </Link>
        </nav>

        {/* Auth Controls */}
        <div className="flex gap-4 items-center min-w-[140px] justify-end relative">
          {isPending ? (
            /* Loading skeleton */
            <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />
          ) : session?.user ? (
            /* Signed-in user menu */
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded-full transition-all text-sm text-white cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-500 flex items-center justify-center font-bold text-xs uppercase text-white shadow-md">
                  {session.user.name?.charAt(0) || "U"}
                </div>
                <span className="hidden sm:inline font-medium max-w-[100px] truncate">
                  {session.user.name}
                </span>
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-950 border border-white/10 rounded-2xl p-2 shadow-2xl z-20 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/5 rounded-xl transition-all cursor-pointer"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 rounded-xl transition-all cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Signed-out */
            <>
              <Link
                href="/auth/sign-in"
                className="hidden sm:block text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                Log In
              </Link>
              <Link
                href="/auth/sign-up"
                className="text-sm font-semibold bg-white text-black px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-pointer"
              >
                Start Free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
