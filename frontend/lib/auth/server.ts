import { createNeonAuth } from "@neondatabase/auth/next/server";

/**
 * Unified server-side Neon Auth instance.
 * Use this in:
 *  - API route handlers: auth.handler()
 *  - Middleware: auth.middleware()
 *  - Server components / server actions: auth.getSession(), auth.signIn.email(), etc.
 */
export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
});
