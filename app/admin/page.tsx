"use client"

import { useState, useEffect } from "react"
import { AdminLogin } from "@/components/admin-login"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    verifySession()
  }, [])

  const verifySession = async () => {
    try {
      const response = await fetch("/api/admin/verify")
      const data = await response.json()
      setAuthenticated(data.authenticated)
    } catch (error) {
      setAuthenticated(false)
    }
  }

  const handleLogin = async () => {
    await verifySession()
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      setAuthenticated(false)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (!mounted || authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Yuklanmoqda...</p>
      </div>
    )
  }

  return authenticated ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLogin={handleLogin} />
}
