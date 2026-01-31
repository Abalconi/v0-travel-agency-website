import { MessageCircle } from "lucide-react"

const WALINK = "https://walink.co/89b493"

interface WhatsAppCTAProps {
  variant?: "default" | "compact"
  className?: string
}

export function WhatsAppCTA({ variant = "default", className = "" }: WhatsAppCTAProps) {
  if (variant === "compact") {
    return (
      <a
        href={WALINK}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors ${className}`}
      >
        <MessageCircle className="h-4 w-4" />
        Contactar por WhatsApp
      </a>
    )
  }

  return (
    <section className={`bg-primary py-16 lg:py-20 ${className}`}>
      <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
        <h2 className="text-2xl font-bold text-primary-foreground lg:text-3xl text-balance">
          ¿Quieres asesoría para tu viaje?
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/90 leading-relaxed">
          Escríbenos por WhatsApp y te ayudamos a planificar tu próximo viaje internacional desde Guatemala.
        </p>
        <a
          href={WALINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-base font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
          Escríbenos por WhatsApp
        </a>
      </div>
    </section>
  )
}
