import { createOrder, getAllOrders } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { serviceId, customerName, customerPhone } = await request.json()

    if (customerName === undefined || customerPhone === undefined) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!customerName.trim() || !customerPhone.trim()) {
      return Response.json({ error: "Name and phone cannot be empty" }, { status: 400 })
    }

    const order = createOrder(serviceId || 0, customerName, customerPhone)
    return Response.json(order, { status: 201 })
  } catch (error) {
    console.error("[v0] Create order error:", error)
    return Response.json({ error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const orders = getAllOrders()
    return Response.json(orders)
  } catch (error) {
    console.error("[v0] Get orders error:", error)
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
