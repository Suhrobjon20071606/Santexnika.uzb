import { cookies } from "next/headers"
import { validateSession } from "@/lib/auth"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("admin-session")?.value

    if (!sessionToken) {
      return Response.json({ authenticated: false }, { status: 401 })
    }

    const username = validateSession(sessionToken)
    if (!username) {
      return Response.json({ authenticated: false }, { status: 401 })
    }

    return Response.json({ authenticated: true, username })
  } catch (error) {
    return Response.json({ authenticated: false }, { status: 401 })
  }
}
