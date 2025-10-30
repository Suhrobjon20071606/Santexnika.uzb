import { getOrderStats } from "@/lib/db"
import { cookies } from "next/headers"
import { validateSession } from "@/lib/auth"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("admin-session")?.value

    if (!sessionToken || !validateSession(sessionToken)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const stats = getOrderStats()
    return Response.json(stats)
  } catch (error) {
    return Response.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
