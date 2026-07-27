import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client";

export const dynamic = "force-dynamic";

/**
 * Dashboard page — server component.
 * Handles authentication and passes user data to the interactive client shell.
 */
export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  const displayName = user?.firstName
    ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
    : (user?.emailAddresses?.[0]?.emailAddress ?? "User");

  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  return <DashboardClient userName={displayName} userEmail={userEmail} />;
}
