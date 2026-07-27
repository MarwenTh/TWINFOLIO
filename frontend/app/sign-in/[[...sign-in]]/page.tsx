import { SignIn } from "@clerk/nextjs";

/**
 * Clerk hosted sign-in page at /sign-in
 */
export default function SignInPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-zinc-950 border border-white/10 shadow-2xl",
            headerTitle: "text-white",
            headerSubtitle: "text-zinc-400",
            socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10",
            formFieldLabel: "text-zinc-300",
            formFieldInput: "bg-white/5 border-white/10 text-white",
            footerActionLink: "text-cyan-400 hover:text-cyan-300",
            formButtonPrimary: "bg-white text-black hover:bg-zinc-200",
          },
        }}
      />
    </div>
  );
}
