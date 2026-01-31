import type { Metadata } from "next"
import { DestinationCard } from "@/components/destination-card"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { destinations } from "@/lib/destinations"

export const metadata: Metadata = {
  title: "Destinos Internacionales desde Guatemala | Wanderlux",
  description: "Guías completas para viajar desde Guatemala a Cartagena, Medellín, Ciudad de México, Punta Cana, Bahamas y Río de Janeiro. Costos, requisitos y recomendaciones.",
}

export default function DestinosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl text-balance">
              Destinos internacionales desde Guatemala
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Estas guías responden las preguntas más comunes sobre costos, documentos, temporadas y recomendaciones reales para viajar desde Guatemala.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
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

      {/* Info Section */}
      <section className="bg-muted/30 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                ¿Cómo elegir tu próximo destino?
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Cada destino tiene características únicas. Te ayudamos a elegir según tus preferencias, presupuesto y el tipo de experiencia que buscas.
              </p>
              <ul className="mt-6 space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold">Playa y relax:</span>
                  Punta Cana, Cartagena, Bahamas
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold">Cultura y gastronomía:</span>
                  Ciudad de México, Río de Janeiro
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold">Ciudad moderna:</span>
                  Medellín, Ciudad de México
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold">Presupuesto ajustado:</span>
                  Medellín, Ciudad de México
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold">Experiencia premium:</span>
                  Bahamas, Punta Cana (todo incluido)
                </li>
              </ul>
            </div>
            <div className="rounded-xl bg-card border border-border p-6 lg:p-8">
              <h3 className="text-lg font-semibold text-card-foreground">
                Información importante
              </h3>
              <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
                <li>
                  <strong className="text-card-foreground">Precios estimados:</strong> Los rangos de precios son aproximados y varían según temporada, anticipación de reserva y disponibilidad.
                </li>
                <li>
                  <strong className="text-card-foreground">Documentos:</strong> Verifica siempre los requisitos migratorios actualizados antes de viajar, ya que pueden cambiar.
                </li>
                <li>
                  <strong className="text-card-foreground">Seguro de viaje:</strong> Recomendamos siempre contratar un seguro de viaje, especialmente para destinos con requisitos de visa.
                </li>
                <li>
                  <strong className="text-card-foreground">Asesoría gratuita:</strong> Contáctanos por WhatsApp para recibir una cotización personalizada sin compromiso.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <WhatsAppCTA />
    </>
  )
}
