import { NextResponse, type NextRequest } from "next/server"

async function handle(request: NextRequest) {
  if (!process.env.DATABASE_URL || !process.env.AUTH_SECRET)
    return NextResponse.json(
      { error: "Authentication is unavailable in the local demo." },
      { status: 503 }
    )
  const handlers = await import("@/auth")
  return request.method === "POST"
    ? handlers.POST(request)
    : handlers.GET(request)
}
export { handle as GET, handle as POST }
