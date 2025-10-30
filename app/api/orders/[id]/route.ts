import { updateOrderStatus } from "@/lib/db"
import { cookies } from "next/headers"
import { validateSession } from "@/lib/auth"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("admin-session")?.value

    if (!sessionToken || !validateSession(sessionToken)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const { status } = await request.json()

    if (!status) {
      return Response.json({ error: "Status is required" }, { status: 400 })
    }

    updateOrderStatus(Number.parseInt(id), status)
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: "Failed to update order" }, { status: 500 })
  }
}
