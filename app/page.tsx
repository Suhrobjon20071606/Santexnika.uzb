"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceCard } from "@/components/service-card"
import { QuickOrderForm } from "@/components/quick-order-form"

interface Service {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category: string
}

export default function Home() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services")
        const data = await response.json()
        setServices(data)
      } catch (error) {
        console.error("Failed to fetch services:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const categories = Array.from(new Set(services.map((s) => s.category)))

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Santexnika.uz 24/7</h2>
          <p className="text-xl text-muted-foreground mb-8">Professional santexnika xizmatları, tez va sifatli</p>
          <div className="flex gap-4 justify-center">
            <div className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold">✓ 24/7 Xizmat</div>
            <div className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold">
              ✓ Professional Mutaxassislar
            </div>
            <div className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold">✓ Tez Javob</div>
          </div>
        </section>

        <section className="mb-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border-2 border-primary/20">
          <h3 className="text-2xl font-bold mb-2 text-center text-foreground">Tez Zakoz Qilish</h3>
          <p className="text-center text-muted-foreground mb-8">Xizmat turini tanlashdan oldin ham zakoz qila olasiz</p>
          <QuickOrderForm />
        </section>

        {/* Services by Category */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Xizmatlar yuklanmoqda...</p>
          </div>
        ) : (
          <>
            {categories.map((category) => (
              <section key={category} className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-foreground capitalize">
                  {category === "ta'mirlash" ? "Ta'mirlash Xizmatları" : "O'rnatish Xizmatları"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services
                    .filter((s) => s.category === category)
                    .map((service) => (
                      <ServiceCard key={service.id} {...service} />
                    ))}
                </div>
              </section>
            ))}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
