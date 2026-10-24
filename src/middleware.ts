import { NextResponse, type NextRequest } from "next/server"
export function middleware(request: NextRequest) {
  // The public demo never requires authentication or external services.
  if (!process.env.DATABASE_URL && request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.json({ error: "Authentication is unavailable in the local booking demo." }, { status: 503 })
  }
  return NextResponse.next()
}
export const config = { matcher: ["/api/auth/:path*"] }
