"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { submitQuiz, type QuizData } from "@/services/api"
import { trackEvent } from "@/services/tracking"
import { ProgressBar } from "./ProgressBar"
import { QuizStep } from "./QuizStep"

const WALINK_NUMBER = "50289b493"  // replace with your actual number for wa.me

const steps = [
  {
    id: "intro",
    question: "Planifica tu viaje ideal en minutos",
    type: "intro" as const,
    description: "Responde 7 preguntas rápidas y recibe una recomendación personalizada diseñada para ti.\n\nLuego te conectamos directo con un asesor por WhatsApp para cerrar los detalles.",
  },
  {
    id: "timeframe",
    question: "¿Cuándo planeas viajar?",
    type: "options" as const,
    options: [
      { value: "1–3 meses", label: "1–3 meses", description: "Pronto, empezamos a planificar" },
      { value: "3–6 meses", label: "3–6 meses", description: "Tenemos tiempo para conseguir mejores precios" },
      { value: "Explorando", label: "Solo explorando", description: "Quiero conocer opciones primero" },
    ],
  },
  {
    id: "budget",
    question: "¿Cuál es tu presupuesto por persona?",
    type: "options" as const,
    options: [
      { value: "Q5,000 – Q7,000", label: "Q5,000 – Q7,000", description: "Viaje accesible sin sacrificar calidad" },
      { value: "Q7,000 – Q10,000", label: "Q7,000 – Q10,000", description: "Experiencia premium con flexibilidad" },
      { value: "+Q10,000", label: "+Q10,000", description: "Sin límites, quiero lo mejor" },
    ],
  },
  {
    id: "destination",
    question: "¿A dónde quieres viajar?",
    type: "options" as const,
    options: [
      { value: "México", label: "México", description: "CDMX y cultura histórica" },
      { value: "Cartagena", label: "Cartagena", description: "Caribe colonial y playas" },
      { value: "Medellín", label: "Medellín", description: "Eterna primavera y flores" },
      { value: "Punta Cana", label: "Punta Cana", description: "Todo incluido y relax" },
      { value: "Río de Janeiro", label: "Río de Janeiro", description: "Samba, sol y aventura" },
      { value: "Recomiéndame", label: "Recomiéndame", description: "Te sugerimos el ideal para ti" },
    ],
  },
  {
    id: "travel_type",
    question: "¿Qué tipo de viaje buscas?",
    type: "options" as const,
    options: [
      { value: "Relajación", label: "Relajación", description: "Playas, spa, descanso total" },
      { value: "Aventura", label: "Aventura", description: "Actividades, naturaleza, adrenalina" },
      { value: "Mixto", label: "Mixto", description: "Un poco de todo, lo mejor de ambos mundos" },
    ],
  },
  {
    id: "meal_plan",
    question: "¿Qué plan de alimentación prefieres?",
    type: "options" as const,
    options: [
      { value: "Solo habitación", label: "Solo habitación", description: "La opción más económica" },
      { value: "Desayunos", label: "Desayunos incluidos", description: "Comodidad al iniciar el día" },
      { value: "Todo incluido", label: "Todo incluido", description: "Sin preocupaciones (donde aplique)" },
    ],
  },
  {
    id: "travelers",
    question: "¿Cuántas personas viajan?",
    type: "number" as const,
    min: 1,
    max: 20,
  },
]

export function Quiz() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<QuizData>>({})
  const [loading, setLoading] = useState(false)
  const [animating, setAnimating] = useState(false)

  const step = steps[currentStep]
  const totalSteps = steps.length
  const progress = ((currentStep) / totalSteps) * 100

  const handleAnswer = async (value: string | number) => {
    const key = step.id as keyof QuizData
    const updated = { ...answers, [key]: value } as Partial<QuizData>
    setAnswers(updated)

    if (currentStep === 0) {
      trackEvent("quiz_started")
    }
    trackEvent("quiz_step_completed", { value }, step.id)

    if (currentStep < totalSteps - 1) {
      // Animate out, then advance
      setAnimating(true)
      setTimeout(() => {
        setCurrentStep((s) => s + 1)
        setAnimating(false)
      }, 300)
    } else {
      // Last step – submit
      const fullData = updated as QuizData
      setLoading(true)
      try {
        const result = await submitQuiz(fullData)
        trackEvent("quiz_completed", { destination: fullData.destination, budget: fullData.budget })
        // Store in sessionStorage for results page
        sessionStorage.setItem("wanderlux_result", JSON.stringify(result))
        sessionStorage.setItem("wanderlux_quiz", JSON.stringify(fullData))
        router.push("/results")
      } catch {
        // Fallback: redirect with query params
        const params = new URLSearchParams({
          destination: fullData.destination,
          budget: fullData.budget,
          timeframe: fullData.timeframe,
          travel_type: fullData.travel_type,
          travelers: String(fullData.travelers),
        })
        router.push(`/results?${params.toString()}`)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
    }
  }

  return (
    <div id="quiz" className="relative w-full">
      {/* Progress */}
      <ProgressBar progress={progress} step={currentStep} total={totalSteps} />

      {/* Step Content */}
      <div
        key={currentStep}
        className={`transition-all duration-300 ${animating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}
        style={{ transitionProperty: "opacity, transform" }}
      >
        <QuizStep
          step={step}
          value={answers[step.id as keyof QuizData]}
          onAnswer={handleAnswer}
          loading={loading}
        />
      </div>

      {/* Back button */}
      {currentStep > 0 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleBack}
            className="text-sm text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-secondary"
          >
            ← Volver
          </button>
        </div>
      )}

      {/* Step indicator */}
      <p className="text-center text-xs text-muted-foreground mt-6">
        Pregunta {currentStep + 1} de {totalSteps}
      </p>
    </div>
  )
}
