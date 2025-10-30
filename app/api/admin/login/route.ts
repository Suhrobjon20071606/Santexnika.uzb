import { verifyAdmin } from "@/lib/db"
import { createSession } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return Response.json({ error: "Missing credentials" }, { status: 400 })
    }

    const isValid = verifyAdmin(username, password)

    if (!isValid) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const sessionToken = createSession(username)
    const cookieStore = await cookies()
    cookieStore.set("admin-session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: "Login failed" }, { status: 500 })
  }
}
