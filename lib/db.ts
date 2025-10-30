// This works on Vercel serverless environment

export interface Service {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category: string
  created_at: string
}

export interface Order {
  id: number
  service_id: number
  service_name: string
  customer_name: string
  customer_phone: string
  status: string
  created_at: string
}

// Mock data for services
const mockServices: Service[] = [
  {
    id: 1,
    name: "Quvur ta'mirlash",
    description: "Buzilgan quvurlarni tez va sifatli ta'mirlash",
    price: 150000,
    image_url: "/pipe-repair-plumbing.jpg",
    category: "ta'mirlash",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Quvur o'rnatish",
    description: "Yangi quvurlarni professional o'rnatish",
    price: 250000,
    image_url: "/pipe-installation.png",
    category: "o'rnatish",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Suv tozalash",
    description: "Suv tizimini tozalash va dezinfeksiya",
    price: 120000,
    image_url: "/water-cleaning.jpg",
    category: "ta'mirlash",
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Kanalizatsiya ta'mirlash",
    description: "Kanalizatsiya tizimini ta'mirlash va tozalash",
    price: 180000,
    image_url: "/sewage-system-repair.jpg",
    category: "ta'mirlash",
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Radiator o'rnatish",
    description: "Isitish radiatorlarini o'rnatish va ulanish",
    price: 200000,
    image_url: "/radiator-installation.jpg",
    category: "o'rnatish",
    created_at: new Date().toISOString(),
  },
  {
    id: 6,
    name: "Suv baki ta'mirlash",
    description: "Suv bakisini ta'mirlash va almashtirish",
    price: 160000,
    image_url: "/water-tank-repair.jpg",
    category: "ta'mirlash",
    created_at: new Date().toISOString(),
  },
]

// In-memory storage for orders (will reset on server restart)
const orders: Order[] = []
let orderIdCounter = 1

export function getAllServices(): Service[] {
  return mockServices
}

export function getServiceById(id: number): Service | undefined {
  return mockServices.find((s) => s.id === id)
}

export function createOrder(serviceId: number, customerName: string, customerPhone: string): Order {
  const service = getServiceById(serviceId)
  const serviceName = service?.name || "Umumiy zakoz"

  const order: Order = {
    id: orderIdCounter++,
    service_id: serviceId,
    service_name: serviceName,
    customer_name: customerName,
    customer_phone: customerPhone,
    status: "pending",
    created_at: new Date().toISOString(),
  }
  orders.push(order)
  return order
}

export function getAllOrders(): Order[] {
  return orders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export function updateOrderStatus(orderId: number, status: string): void {
  const order = orders.find((o) => o.id === orderId)
  if (order) {
    order.status = status
  }
}

export function getOrderStats() {
  return {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    completed: orders.filter((o) => o.status === "completed").length,
  }
}

export function verifyAdmin(username: string, password: string): boolean {
  // Simple admin verification (in production, use proper authentication)
  return username === "admin" && password === "admin123"
}
