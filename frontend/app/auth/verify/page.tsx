import { redirect } from "next/navigation";

/**
 * Redirect old verify page to home (Clerk handles email verification natively).
 */
export default function VerifyRedirect() {
  redirect("/");
}
