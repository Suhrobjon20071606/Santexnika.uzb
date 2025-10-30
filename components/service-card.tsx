"use client"

import Image from "next/image"
import { useState } from "react"
import { OrderModal } from "./order-modal"

interface ServiceCardProps {
  id: number
  name: string
  description: string
  price: number
  image_url: string
}

export function ServiceCard({ id, name, description, price, image_url }: ServiceCardProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full bg-muted">
          <Image src={image_url || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-card-foreground">{name}</h3>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-accent">{price.toLocaleString()} so'm</span>
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition font-semibold"
            >
              Zakaz qilish
            </button>
          </div>
        </div>
      </div>
      {showModal && <OrderModal serviceId={id} serviceName={name} onClose={() => setShowModal(false)} />}
    </>
  )
}
