import { clerkMiddleware } from "@clerk/nextjs/server";

/**
 * Clerk middleware — runs on all routes.
 * Route protection is handled per-page using auth.protect() (resource-based auth).
 * This approach is recommended by Clerk over path-matching middleware.
 */
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
