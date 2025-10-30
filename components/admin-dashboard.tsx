"use client"

import { useEffect, useState } from "react"

interface Order {
  id: number
  service_id: number
  service_name: string
  customer_name: string
  customer_phone: string
  status: string
  created_at: string
}

interface Stats {
  total: number
  pending: number
  completed: number
}

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, completed: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, statsRes] = await Promise.all([fetch("/api/orders"), fetch("/api/admin/stats")])

        const ordersData = await ordersRes.json()
        const statsData = await statsRes.json()

        setOrders(ordersData)
        setStats(statsData)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
    } catch (error) {
      console.error("Failed to update order:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-primary-foreground text-primary rounded-lg hover:opacity-90 transition font-semibold"
          >
            Chiqish
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card rounded-lg p-6 shadow-md border border-border">
            <p className="text-muted-foreground text-sm mb-2">Jami zakozlar</p>
            <p className="text-4xl font-bold text-primary">{stats.total}</p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-md border border-border">
            <p className="text-muted-foreground text-sm mb-2">Kutilayotgan</p>
            <p className="text-4xl font-bold text-accent">{stats.pending}</p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-md border border-border">
            <p className="text-muted-foreground text-sm mb-2">Bajarilgan</p>
            <p className="text-4xl font-bold text-green-600">{stats.completed}</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-xl font-bold text-card-foreground">Zakozlar</h2>
          </div>

          {loading ? (
            <div className="p-6 text-center text-muted-foreground">Yuklanmoqda...</div>
          ) : orders.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">Zakozlar yo'q</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-card-foreground">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-card-foreground">Xizmat</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-card-foreground">Mijoz</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-card-foreground">Telefon</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-card-foreground">Holati</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-card-foreground">Sana</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-card-foreground">Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition">
                      <td className="px-6 py-4 text-sm text-card-foreground">#{order.id}</td>
                      <td className="px-6 py-4 text-sm text-card-foreground font-medium">
                        {order.service_name || "Umumiy zakoz"}
                      </td>
                      <td className="px-6 py-4 text-sm text-card-foreground font-medium">{order.customer_name}</td>
                      <td className="px-6 py-4 text-sm text-card-foreground">{order.customer_phone}</td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium border-0 cursor-pointer ${
                            order.status === "pending" ? "bg-accent/20 text-accent" : "bg-green-100 text-green-700"
                          }`}
                        >
                          <option value="pending">Kutilayotgan</option>
                          <option value="completed">Bajarilgan</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString("uz-UZ")}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-primary hover:underline font-medium">Ko'rish</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
