import { redirect } from "next/navigation";

/**
 * Redirect old custom sign-in page to Clerk's hosted sign-in.
 */
export default function SignInRedirect() {
  redirect("/sign-in");
}
