import { getAllServices } from "@/lib/db"

export async function GET() {
  try {
    const services = getAllServices()
    return Response.json(services)
  } catch (error) {
    console.error("[v0] Services API error:", error)
    return Response.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}
