"use client"

import type React from "react"

import { useState } from "react"

export function QuickOrderForm() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!phone.trim()) {
      setError("Telefon raqamini kiriting")
      return
    }

    if (!name.trim()) {
      setError("Ismingizni kiriting")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: 0,
          customerName: name,
          customerPhone: phone,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          setName("")
          setPhone("")
        }, 3000)
      } else {
        setError("Xato yuz berdi. Qayta urinib ko'ring")
      }
    } catch (error) {
      setError("Xato yuz berdi. Qayta urinib ko'ring")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-slide-in {
          animation: slideInUp 0.6s ease-out;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }

        .animate-shake {
          animation: shake 0.5s;
        }

        .input-focus {
          transition: all 0.3s ease;
        }

        .input-focus:focus {
          transform: scale(1.02);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>

      {success ? (
        <div className="animate-slide-in bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center">
          <div className="text-5xl mb-3">✓</div>
          <p className="text-lg font-bold text-green-700">Zakoz qabul qilindi!</p>
          <p className="text-green-600 mt-2">Tez orada siz bilan bog'lanamiz</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ism input */}
          <div className="animate-slide-in" style={{ animationDelay: "0.1s" }}>
            <label className="block text-sm font-bold mb-2 text-foreground">Ismingiz</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`input-focus w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground font-medium placeholder:text-muted-foreground ${
                error && !name ? "animate-shake border-red-500" : ""
              }`}
              placeholder="Ismingizni kiriting"
            />
          </div>

          {/* Telefon input */}
          <div className="animate-slide-in animate-pulse-glow" style={{ animationDelay: "0.2s" }}>
            <label className="block text-sm font-bold mb-2 text-foreground">
              Telefon raqami <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={`input-focus w-full px-4 py-3 border-2 border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 bg-background text-foreground font-medium placeholder:text-muted-foreground ${
                error && !phone ? "animate-shake border-red-500" : ""
              }`}
              placeholder="+998 90 123 45 67"
            />
          </div>

          {/* Xato xabari */}
          {error && (
            <div className="animate-slide-in bg-red-50 border-l-4 border-red-500 p-3 rounded text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Tugmalar */}
          <div className="flex gap-3 pt-4 animate-slide-in" style={{ animationDelay: "0.3s" }}>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:shadow-lg hover:scale-105 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Yuborilmoqda..." : "Zakoz qilish"}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
