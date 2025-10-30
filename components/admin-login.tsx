"use client"

import type React from "react"
import { useState } from "react"

interface AdminLoginProps {
  onLogin: () => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        onLogin()
      } else {
        setError("Noto'g'ri login yoki parol")
      }
    } catch (error) {
      setError("Login xatosi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2 text-card-foreground">Admin Panel</h1>
        <p className="text-center text-muted-foreground mb-8">Kirish uchun ma'lumotlarni kiriting</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-card-foreground">Login</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-card-foreground">Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              placeholder="••••••••"
            />
          </div>

          {error && <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50"
          >
            {loading ? "Kirish..." : "Kirish"}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">Test: admin / admin123</p>
      </div>
    </div>
  )
}
