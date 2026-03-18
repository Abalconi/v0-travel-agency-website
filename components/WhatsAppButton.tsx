"use client"

import { MessageCircle } from "lucide-react"
import { trackEvent } from "@/services/tracking"

const WA_NUMBER = "50289b493"  // replace with actual phone number digits only

interface WhatsAppButtonProps {
  destination?: string
  budget?: string
  timeframe?: string
  travelers?: number | string
  travelType?: string
  mealPlan?: string
  className?: string
  size?: "sm" | "md" | "lg"
  label?: string
}

function buildWALink({
  destination,
  budget,
  timeframe,
  travelers,
  travelType,
  mealPlan,
}: Omit<WhatsAppButtonProps, "className" | "size" | "label">) {
  const lines = [
    "¡Hola Wanderlux! Quiero información sobre este viaje:",
    destination ? `Destino: ${destination}` : null,
    budget ? `Presupuesto: ${budget}` : null,
    timeframe ? `Fechas: ${timeframe}` : null,
    travelers ? `Personas: ${travelers}` : null,
    travelType ? `Estilo: ${travelType}` : null,
    mealPlan ? `Plan comida: ${mealPlan}` : null,
    "",
    "¿Pueden ayudarme a planificarlo?",
  ]
    .filter((l) => l !== null)
    .join("\n")

  const encoded = encodeURIComponent(lines)
  return `https://wa.me/${WA_NUMBER}?text=${encoded}`
}

export function WhatsAppButton({
  destination,
  budget,
  timeframe,
  travelers,
  travelType,
  mealPlan,
  className = "",
  size = "lg",
  label = "Hablar con un asesor",
}: WhatsAppButtonProps) {
  const href = buildWALink({ destination, budget, timeframe, travelers, travelType, mealPlan })

  const sizeClasses = {
    sm: "text-sm px-4 py-2.5 gap-2",
    md: "text-base px-6 py-3.5 gap-2",
    lg: "text-lg px-8 py-4 gap-3",
  }

  const handleClick = () => {
    trackEvent("whatsapp_clicked", { destination, budget, timeframe, travelers, travelType })
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      id="whatsapp-cta-btn"
      onClick={handleClick}
      className={`btn-whatsapp inline-flex items-center justify-center font-semibold rounded-xl shadow-lg ${sizeClasses[size]} ${className}`}
    >
      <MessageCircle className={size === "lg" ? "w-6 h-6" : "w-4 h-4"} strokeWidth={2.5} />
      {label}
    </a>
  )
}
