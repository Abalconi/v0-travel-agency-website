import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Plane, FileText, Calendar, Wallet, AlertCircle } from "lucide-react"
import { WhatsAppCTA } from "@/components/whatsapp-cta"

export const metadata: Metadata = {
  title: "Guía para Viajar desde Guatemala | Wanderlux",
  description: "Todo lo que necesitas saber para viajar desde Guatemala: documentación, aeropuertos, temporadas, divisas y consejos prácticos para tu viaje internacional.",
}

const tips = [
  {
    icon: FileText,
    title: "Documentación común",
    content: "Para la mayoría de destinos turísticos, los guatemaltecos necesitan: pasaporte vigente con al menos 6 meses de validez, boleto de avión de ida y vuelta, comprobante de hospedaje, y demostración de solvencia económica. Algunos destinos como Estados Unidos, Canadá y varios países europeos requieren visa.",
  },
  {
    icon: Plane,
    title: "Aeropuertos en Guatemala",
    content: "El Aeropuerto Internacional La Aurora (GUA) en Ciudad de Guatemala es el principal aeropuerto del país y punto de partida para la mayoría de vuelos internacionales. Ofrece conexiones directas a ciudades en México, Estados Unidos, Centroamérica, Colombia y el Caribe.",
  },
  {
    icon: Calendar,
    title: "Temporadas de viaje",
    content: "Temporada alta (diciembre-abril): mejores precios se consiguen reservando con 2-3 meses de anticipación. Temporada baja (mayo-noviembre): ofertas especiales disponibles, aunque algunos destinos tienen temporada de lluvias o huracanes. Semana Santa y fin de año son las épocas de mayor demanda.",
  },
  {
    icon: Wallet,
    title: "Consejos de divisas",
    content: "Recomendamos llevar una combinación de efectivo en dólares estadounidenses (aceptados en muchos destinos) y tarjetas de crédito/débito internacionales. Avisa a tu banco antes de viajar para evitar bloqueos. En destinos como México o Colombia, puedes cambiar quetzales o dólares fácilmente.",
  },
]

const practicalTips = [
  "Saca copia de tu pasaporte y documentos importantes. Guarda una versión digital en tu correo o nube.",
  "Contrata seguro de viaje, especialmente para destinos lejanos o con requisitos de visa.",
  "Llega al aeropuerto con al menos 3 horas de anticipación para vuelos internacionales.",
  "Verifica los requisitos de vacunación del destino. Algunos países exigen fiebre amarilla.",
  "Registra tu viaje en el consulado guatemalteco del país que visitas si vas por tiempo prolongado.",
  "Descarga mapas offline y aplicaciones de traducción antes de viajar.",
  "Lleva adaptador de corriente universal si vas a destinos con enchufes diferentes.",
  "Confirma el peso y dimensiones de equipaje permitido según tu aerolínea.",
]

export default function ViajarDesdeGuatemalaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl text-balance">
              Guía para viajar desde Guatemala
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Todo lo que necesitas saber antes de tu viaje internacional: documentación, aeropuertos, temporadas y consejos prácticos para viajar sin contratiempos.
            </p>
          </div>
        </div>
      </section>

      {/* Main Info Cards */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-xl border border-border bg-card p-6 lg:p-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <tip.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-card-foreground">
                    {tip.title}
                  </h2>
                </div>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {tip.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Tips */}
      <section className="bg-muted/30 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
            Consejos prácticos para tu viaje
          </h2>
          <p className="mt-2 text-muted-foreground">
            Recomendaciones basadas en nuestra experiencia asesorando viajeros guatemaltecos.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {practicalTips.map((tip, index) => (
              <li
                key={index}
                className="flex items-start gap-3 rounded-lg bg-card border border-border p-4"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {index + 1}
                </span>
                <span className="text-sm text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Visa Info */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-6 lg:p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Información importante sobre visas
                </h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Los requisitos de visa cambian frecuentemente. Antes de comprar tus boletos, verifica siempre los requisitos actualizados en la embajada o consulado del país de destino. Como agencia, te asesoramos sobre los requisitos vigentes y te ayudamos con el proceso cuando es necesario.
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2 text-sm">
                  <div>
                    <strong className="text-foreground">Sin visa (turismo):</strong>
                    <p className="text-muted-foreground">México, Colombia, Brasil, República Dominicana, Perú, Argentina, Chile, Costa Rica, Panamá</p>
                  </div>
                  <div>
                    <strong className="text-foreground">Requieren visa:</strong>
                    <p className="text-muted-foreground">Estados Unidos, Canadá, Reino Unido, países Schengen (Europa), Australia, Bahamas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA to Destinations */}
      <section className="pb-12 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="rounded-xl bg-secondary p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  ¿Ya sabes a dónde quieres viajar?
                </h2>
                <p className="mt-1 text-muted-foreground">
                  Explora nuestras guías detalladas para cada destino con costos y requisitos específicos.
                </p>
              </div>
              <Link
                href="/destinos"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Ver destinos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <WhatsAppCTA />
    </>
  )
}
