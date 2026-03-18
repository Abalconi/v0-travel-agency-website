import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check, Calendar, Clock, FileText, Plane } from "lucide-react"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { destinations, getDestination, getAllDestinationSlugs } from "@/lib/destinations"

const WALINK = "https://walink.co/89b493"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllDestinationSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const destination = getDestination(slug)

  if (!destination) {
    return {
      title: "Destino no encontrado | Wanderlux",
    }
  }

  return {
    title: `Viajar a ${destination.name} desde Guatemala | Guía práctica | Wanderlux`,
    description: destination.directAnswer,
  }
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params
  const destination = getDestination(slug)

  if (!destination) {
    notFound()
  }

  const otherDestinations = destinations.filter((d) => d.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
          <Link
            href="/destinos"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a destinos
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="relative h-64 lg:h-80">
          <Image
            src={destination.heroImage || destination.image || "/placeholder.svg"}
            alt={`Viajar a ${destination.name} desde Guatemala`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8">
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                {destination.country}
              </span>
              <h1 className="mt-2 text-3xl font-bold text-background lg:text-4xl">
                Viajar a {destination.name} desde Guatemala
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Answer */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-6 lg:p-8">
            <p className="text-lg text-foreground leading-relaxed">
              {destination.directAnswer}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="pb-8 lg:pb-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Plane className="h-4 w-4" />
                <span className="text-sm">Precio estimado</span>
              </div>
              <p className="mt-1 font-semibold text-card-foreground">{destination.priceRange}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Duración recomendada</span>
              </div>
              <p className="mt-1 font-semibold text-card-foreground">{destination.recommendedDays}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Mejor época</span>
              </div>
              <p className="mt-1 font-semibold text-card-foreground line-clamp-1">{destination.bestSeason.split('.')[0]}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="text-sm">Visa</span>
              </div>
              <p className="mt-1 font-semibold text-card-foreground">
                {destination.visaRequired ? "Requerida" : "No requerida"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-12 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* What's included */}
              <div>
                <h2 className="text-xl font-bold text-foreground lg:text-2xl">
                  ¿Qué incluye normalmente un viaje a {destination.name}?
                </h2>
                <ul className="mt-4 space-y-3">
                  {destination.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Sections */}
              {destination.sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-bold text-foreground lg:text-2xl">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* CTA Card */}
                <div className="rounded-xl bg-primary p-6 text-primary-foreground">
                  <h3 className="text-lg font-semibold">
                    ¿Te interesa viajar a {destination.name}?
                  </h3>
                  <p className="mt-2 text-sm text-primary-foreground/90">
                    Escríbenos por WhatsApp para recibir una cotización personalizada sin compromiso.
                  </p>
                  <a
                    href={WALINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
                  >
                    Solicitar cotización
                  </a>
                </div>

                {/* Other destinations */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-card-foreground">
                    Otros destinos populares
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {otherDestinations.map((dest) => (
                      <li key={dest.slug}>
                        <Link
                          href={`/destinos/${dest.slug}`}
                          className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <span>Viajar a {dest.name}</span>
                          <span className="text-xs">{dest.priceRange}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/destinos"
                    className="mt-4 block text-center text-sm font-medium text-primary hover:underline"
                  >
                    Ver todos los destinos
                  </Link>
                </div>
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
