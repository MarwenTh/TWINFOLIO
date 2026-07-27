import { NextResponse } from "next/server";

/**
 * This API route previously handled custom auth.
 * Now replaced by Clerk — this file is kept to avoid 404s on any old links.
 */
export function GET() {
  return NextResponse.json({ message: "Auth handled by Clerk" });
}
