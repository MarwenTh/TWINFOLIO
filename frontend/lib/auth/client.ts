"use client";

import { createAuthClient } from "@neondatabase/auth/next";

/**
 * Client-side Neon Auth instance.
 * Use this in client components for:
 *  - authClient.signIn.email()
 *  - authClient.signUp.email()
 *  - authClient.signOut()
 *  - authClient.useSession()  (reactive session hook)
 */
export const authClient = createAuthClient();
