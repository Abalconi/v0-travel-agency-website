"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import type { Recommendation, QuizData, LeadResponse } from "@/services/api"
import { ResultsCard } from "@/components/ResultsCard"
import { trackEvent } from "@/services/tracking"

// Fallback recommendation for demo (when backend is offline)
const FALLBACK_RECOMMENDATION: Recommendation = {
  slug: "cartagena",
  name: "Cartagena",
  country: "Colombia",
  priceRange: "Q. 6,500 – Q. 9,800",
  image: "/images/cartagena.jpg",
  itinerary: [
    { day: 1, title: "Ciudad Amurallada", description: "Recorrido colonial, castillo San Felipe de Barajas." },
    { day: 2, title: "Islas del Rosario", description: "Snorkel en aguas cristalinas del Caribe." },
    { day: 3, title: "Getsemaní y arte callejero", description: "Murales, plazas y gastronomía local." },
    { day: 4, title: "Playas de Bocagrande", description: "Relax en la playa y atardecer caribeño." },
  ],
}

export default function ResultsPage() {
  const router = useRouter()
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [quiz, setQuiz] = useState<Partial<QuizData>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    trackEvent("results_viewed")

    try {
      const storedResult = sessionStorage.getItem("wanderlux_result")
      const storedQuiz = sessionStorage.getItem("wanderlux_quiz")

      if (storedResult) {
        const parsed: LeadResponse = JSON.parse(storedResult)
        setRecommendation(parsed.recommendation)
      } else {
        // Use fallback when coming directly to results page
        setRecommendation(FALLBACK_RECOMMENDATION)
      }

      if (storedQuiz) {
        setQuiz(JSON.parse(storedQuiz))
      }
    } catch {
      setRecommendation(FALLBACK_RECOMMENDATION)
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Preparando tu recomendación...</p>
        </div>
      </div>
    )
  }

  if (!recommendation) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold mb-2">Ups, algo salió mal</h2>
          <p className="text-muted-foreground mb-6">No encontramos tu recomendación.</p>
          <Link href="/" className="btn-primary text-sm px-6 py-3 rounded-xl bg-primary text-primary-foreground">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-16 z-10 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          <div className="h-4 w-px bg-border" />
          <p className="text-sm text-muted-foreground">
            Tu viaje ideal está listo!
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            Recomendación personalizada
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Tu viaje recomendado
          </h1>
          <p className="text-muted-foreground mt-2">
            Basado en tus respuestas, esto es lo que te proponemos:
          </p>
        </div>

        <ResultsCard recommendation={recommendation} quiz={quiz} />

        {/* Footer note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-muted-foreground">
            ¿Quieres explorar otras opciones?{" "}
            <Link href="/" className="text-primary hover:underline font-medium">
              Volver al quiz
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
