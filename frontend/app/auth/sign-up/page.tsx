import { redirect } from "next/navigation";

/**
 * Redirect old custom sign-up page to Clerk's hosted sign-up.
 */
export default function SignUpRedirect() {
  redirect("/sign-up");
}
