import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Shield, Clock, HeadphonesIcon, DollarSign } from "lucide-react"
import { DestinationCard } from "@/components/destination-card"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { destinations } from "@/lib/destinations"

const WALINK = "https://walink.co/89b493"

const benefits = [
  {
    icon: Shield,
    title: "Asesoría experta",
    description: "Planificamos tu viaje considerando todos los detalles para que disfrutes sin preocupaciones.",
  },
  {
    icon: Clock,
    title: "Ahorra tiempo",
    description: "Nos encargamos de la investigación, reservas y logística para que solo te preocupes por disfrutar.",
  },
  {
    icon: DollarSign,
    title: "Mejores precios",
    description: "Accedemos a tarifas preferenciales con aerolíneas y hoteles que no encontrarás por tu cuenta.",
  },
  {
    icon: HeadphonesIcon,
    title: "Apoyo 24/7",
    description: "Ante cualquier imprevisto durante tu viaje, estamos disponibles para ayudarte.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center">
        <Image
          src="/images/hero-bg.jpg"
          alt="Playa tropical paradisíaca con palmeras y arena blanca en el Caribe"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-background lg:text-5xl text-balance">
            Agencia de viajes en Guatemala especializada en viajes internacionales
          </h1>
          <p className="mt-6 text-lg text-background/90 leading-relaxed max-w-2xl mx-auto">
            Wanderlux es una agencia de viajes en Guatemala especializada en viajes internacionales organizados, enfocada en optimizar rutas, costos y tiempos de viaje mediante asesoría personalizada.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/destinos"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Ver destinos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={WALINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-background/30 bg-background/20 backdrop-blur-sm px-6 py-3 text-base font-medium text-background hover:bg-background/30 transition-colors"
            >
              Solicitar asesoría
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground lg:text-3xl text-balance">
              ¿Por qué viajar con una agencia?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Una agencia de viajes no solo reserva vuelos y hoteles. Te ofrece tranquilidad, ahorro y experiencia para que tu viaje sea memorable.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Preview */}
      <section className="bg-muted/30 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground lg:text-3xl text-balance">
                Destinos populares desde Guatemala
              </h2>
              <p className="mt-2 text-muted-foreground">
                Guías completas con costos, requisitos y recomendaciones reales.
              </p>
            </div>
            <Link
              href="/destinos"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Ver todos los destinos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.slice(0, 6).map((destination) => (
              <DestinationCard
                key={destination.slug}
                name={destination.name}
                slug={destination.slug}
                country={destination.country}
                priceRange={destination.priceRange}
                image={destination.image}
                description={destination.shortDescription}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="rounded-2xl bg-secondary p-8 lg:p-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-foreground lg:text-3xl text-balance">
                Asesoría personalizada para tu viaje
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Cada viaje es diferente. Te ayudamos a planificar según tus preferencias, presupuesto y tiempos. No vendemos paquetes genéricos: diseñamos experiencias a tu medida.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">1</span>
                  <span className="text-muted-foreground">Cuéntanos sobre tu viaje ideal y presupuesto</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">2</span>
                  <span className="text-muted-foreground">Recibe opciones personalizadas con precios reales</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">3</span>
                  <span className="text-muted-foreground">Reservamos y organizamos todo por ti</span>
                </li>
              </ul>
              <div className="mt-8">
                <a
                  href={WALINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Solicitar asesoría por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <WhatsAppCTA />
    </>
  )
}
