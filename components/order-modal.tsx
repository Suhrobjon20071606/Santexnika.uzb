"use client"

import type React from "react"

import { useState } from "react"

interface OrderModalProps {
  serviceId: number
  serviceName: string
  onClose: () => void
}

export function OrderModal({ serviceId, serviceName, onClose }: OrderModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phone.trim()) {
      alert("Telefon raqamini kiriting")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          customerName: name,
          customerPhone: phone,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          onClose()
          setSuccess(false)
          setName("")
          setPhone("")
        }, 2000)
      }
    } catch (error) {
      console.error("Order error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-2 text-card-foreground">{serviceName}</h2>
        <p className="text-muted-foreground mb-6">Zakaz berish uchun ma'lumotlarni kiriting</p>

        {success ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✓</div>
            <p className="text-lg font-semibold text-green-600">Zakoz qabul qilindi!</p>
            <p className="text-muted-foreground mt-2">Tez orada siz bilan bog'lanamiz</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-card-foreground">Ismingiz</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                placeholder="Ismingizni kiriting"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-card-foreground">
                Telefon raqami <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                placeholder="+998 90 123 45 67"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition text-foreground font-medium"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-medium disabled:opacity-50"
              >
                {loading ? "Yuborilmoqda..." : "Zakoz qilish"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
