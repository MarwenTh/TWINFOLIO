"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth/client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkles, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Suspense } from "react";

/**
 * Standalone email verification page.
 * Users land here when:
 *   - They registered but closed the tab before verifying
 *   - They tried to sign in but email is not yet verified
 *
 * Flow:
 *   Step 1 – Enter email → request a new code (resend)
 *   Step 2 – Enter the OTP code to confirm account
 */
function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Pre-fill email from query param if redirected from sign-in
  const prefillEmail = searchParams.get("email") || "";

  const [step, setStep] = useState<"email" | "code">(
    prefillEmail ? "code" : "email"
  );
  const [email, setEmail] = useState(prefillEmail);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(
    prefillEmail
      ? "Enter the code that was sent to your email, or request a new one."
      : ""
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0); // resend cooldown in seconds

  // Countdown timer for resend button
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  /** Request a new verification code for the given email */
  const handleSendCode = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const { error: sendError } = await authClient.sendVerificationEmail({
        email,
        callbackURL: window.location.origin + "/",
      });

      if (sendError) {
        setError(sendError.message || "Failed to send verification email.");
      } else {
        setMessage(`A verification code has been sent to ${email}`);
        setStep("code");
        setCooldown(60); // 60-second resend cooldown
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /** Submit the OTP code */
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const { data, error: verifyError } = await authClient.emailOtp.verifyEmail({
        email,
        otp: code,
      });

      if (verifyError) {
        setError(verifyError.message || "Invalid or expired code. Try requesting a new one.");
      } else if (data) {
        // Successfully verified — redirect to sign-in (auto-login may happen)
        router.push("/dashboard");
      } else {
        setMessage("Email verified! You can now sign in.");
        router.push("/auth/sign-in");
      }
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Card */}
      <div className="w-full max-w-md bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="font-bold text-lg tracking-wide">TWINFOLIO</span>
          </Link>

          {/* Animated email icon */}
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-cyan-500/20 flex items-center justify-center">
            <Mail className="w-7 h-7 text-cyan-400" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight mb-2">
            {step === "email" ? "Verify your email" : "Enter your code"}
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
            {step === "email"
              ? "Enter your email address below and we'll send you a new verification code."
              : `We sent a code to ${email}. It expires in 15 minutes.`}
          </p>
        </div>

        {/* Step 1: Email input */}
        {step === "email" && (
          <form onSubmit={handleSendCode} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-white/5 border-white/10 text-white focus:border-cyan-500 focus:bg-white/[0.08]"
              />
            </div>

            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-950/20 border border-red-900/30 rounded-xl text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-white text-black font-bold hover:bg-zinc-200 cursor-pointer active:scale-[0.98] transition-all text-sm"
            >
              {isLoading ? "Sending..." : "Send Verification Code"}
            </Button>
          </form>
        )}

        {/* Step 2: OTP input */}
        {step === "code" && (
          <form onSubmit={handleVerifyCode} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Verification Code
              </Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter OTP code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                autoFocus
                className="h-14 bg-white/5 border-white/10 text-white focus:border-cyan-500 text-center tracking-[0.5em] text-xl font-bold"
              />
            </div>

            {message && (
              <div className="p-3 text-sm text-cyan-400 bg-cyan-950/20 border border-cyan-900/30 rounded-xl text-center">
                {message}
              </div>
            )}

            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-950/20 border border-red-900/30 rounded-xl text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-white text-black font-bold hover:bg-zinc-200 cursor-pointer active:scale-[0.98] transition-all text-sm"
            >
              {isLoading ? "Verifying..." : "Confirm & Activate Account"}
            </Button>

            {/* Resend / change email */}
            <div className="flex flex-col items-center gap-3 pt-2">
              <button
                type="button"
                disabled={cooldown > 0 || isLoading}
                onClick={handleSendCode}
                className="text-sm text-cyan-400 hover:text-cyan-300 disabled:text-zinc-600 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {cooldown > 0
                  ? `Resend code in ${cooldown}s`
                  : "Resend verification code"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setCode("");
                  setError("");
                  setMessage("");
                }}
                className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                Use a different email
              </button>
            </div>
          </form>
        )}

        {/* Footer links */}
        <div className="mt-8 pt-6 border-t border-white/5 flex justify-center gap-6 text-xs text-zinc-500">
          <Link href="/auth/sign-in" className="hover:text-zinc-300 transition-colors cursor-pointer">
            Back to Sign In
          </Link>
          <Link href="/auth/sign-up" className="hover:text-zinc-300 transition-colors cursor-pointer">
            Create new account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
