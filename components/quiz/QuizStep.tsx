"use client"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"

interface OptionConfig {
  value: string
  label: string
  description: string
}

interface StepConfig {
  id: string
  question: string
  type: "options" | "number" | "intro"
  options?: OptionConfig[]
  description?: string
  min?: number
  max?: number
}

interface QuizStepProps {
  step: StepConfig
  value: string | number | undefined
  onAnswer: (value: string | number) => void
  loading?: boolean
}

export function QuizStep({ step, value, onAnswer, loading }: QuizStepProps) {
  const [numberValue, setNumberValue] = useState<number>(
    typeof value === "number" ? value : 1
  )

  if (step.type === "intro") {
    return (
      <div className="py-4 px-4 text-center max-w-md mx-auto">
        <div className="animate-fade-up">
          <h2 className="text-xl md:text-2xl font-serif font-semibold text-foreground leading-tight mb-4">
            {step.question}
          </h2>
          <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
            {step.description?.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <button
            onClick={() => onAnswer("start")}
            className="w-full px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Comenzar mi diseño
          </button>
        </div>
      </div>
    )
  }

  if (step.type === "number") {
    return (
      <div className="py-4 px-4">
        <div className="text-center mb-6 animate-fade-up">
          <h2 className="text-xl md:text-2xl font-serif font-semibold text-foreground leading-tight">
            {step.question}
          </h2>
          <p className="text-muted-foreground mt-1 text-xs md:text-sm">Incluyéndote a ti</p>
        </div>

        <div className="flex flex-col items-center gap-6 animate-fade-up delay-200">
          {/* Number stepper */}
          <div className="flex items-center gap-4 bg-card border border-border rounded-2xl px-6 py-4 shadow-sm">
            <button
              onClick={() => setNumberValue((v) => Math.max(step.min ?? 1, v - 1))}
              className="w-10 h-10 rounded-full border-2 border-primary text-primary font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 flex items-center justify-center"
            >
              −
            </button>
            <span className="text-4xl font-serif font-bold text-primary w-14 text-center tabular-nums">
              {numberValue}
            </span>
            <button
              onClick={() => setNumberValue((v) => Math.min(step.max ?? 20, v + 1))}
              className="w-10 h-10 rounded-full border-2 border-primary text-primary font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 flex items-center justify-center"
            >
              +
            </button>
          </div>

          <p className="text-muted-foreground text-sm">
            {numberValue === 1 ? "Solo tú" : numberValue === 2 ? "Dos personas" : `${numberValue} personas`}
          </p>

          <button
            onClick={() => onAnswer(numberValue)}
            disabled={loading}
            id="quiz-submit-btn"
            className="mt-2 w-full max-w-sm px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Calculando...
              </>
            ) : (
              "Ver mi recomendación"
            )}
          </button>
        </div>
      </div>
    )
  }

  // Options type
  return (
    <div className="py-4 px-4">
      <div className="text-center mb-6 animate-fade-up">
        <h2 className="text-xl md:text-2xl font-serif font-semibold text-foreground leading-tight">
          {step.question}
        </h2>
      </div>

      <div className="grid gap-3 max-w-lg mx-auto animate-fade-up delay-100">
        {step.options?.map((option, idx) => {
          const isSelected = value === option.value
          return (
            <button
              key={option.value}
              id={`quiz-option-${step.id}-${idx}`}
              onClick={() => onAnswer(option.value)}
              className={`option-card w-full text-left p-3 rounded-xl bg-card flex items-center gap-3 group
                ${isSelected ? "selected" : ""}`}
            >
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-base transition-colors ${isSelected ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                  {option.label}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5 truncate">
                  {option.description}
                </p>
              </div>
              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
