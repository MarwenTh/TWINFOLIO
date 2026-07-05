"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

/**
 * Global site header with Clerk v7 authentication controls.
 * Shows Sign In / Start Free when signed out, UserButton when signed in.
 */
export default function Header() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/40 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
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
            className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#showcase"
            className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            Showcase
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            Pricing
          </Link>
        </nav>

        {/* Auth Controls */}
        <div className="flex gap-4 items-center min-w-[140px] justify-end">
          {!isLoaded ? (
            /* Loading skeleton */
            <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />
          ) : isSignedIn ? (
            /* Signed-in: show user avatar/menu */
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-9 h-9 ring-2 ring-violet-500 ring-offset-2 ring-offset-black",
                },
              }}
            />
          ) : (
            /* Signed-out: show Log In + Start Free */
            <>
              <SignInButton mode="modal">
                <button className="hidden sm:block text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                  Log In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="text-sm font-semibold bg-white text-black px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  Start Free
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
