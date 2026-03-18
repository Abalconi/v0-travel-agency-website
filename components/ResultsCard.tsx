import Image from "next/image"
import { MapPin, Calendar, Users, DollarSign, CheckCircle2, Plane, Shield } from "lucide-react"
import type { Recommendation } from "@/services/api"
import type { QuizData } from "@/services/api"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { trackEvent } from "@/services/tracking"

interface ResultsCardProps {
  recommendation: Recommendation
  quiz: Partial<QuizData>
}

export function ResultsCard({ recommendation, quiz }: ResultsCardProps) {
  return (
    <div className="animate-scale-in">
      {/* Hero image */}
      <div className="relative aspect-[16/7] rounded-2xl overflow-hidden shadow-xl mb-8">
        <Image
          src={recommendation.image}
          alt={`Viaje a ${recommendation.name}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <span className="inline-block bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full mb-2 uppercase tracking-wide">
            {recommendation.country}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
            {recommendation.name}
          </h2>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <p className="text-white/80 flex items-center gap-1 text-sm">
              <MapPin className="w-4 h-4" /> Destino seleccionado
            </p>
            {quiz.budget && !recommendation.priceRange.includes(quiz.budget.split(' – ')[0]) && (
              <p className="text-amber-300 flex items-center gap-1 text-xs font-medium bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm">
                <span>⚠️ Note: El precio estimado puede exceder tu presupuesto inicial.</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { icon: DollarSign, label: "Presupuesto", value: recommendation.priceRange },
          { icon: Calendar, label: "Fechas", value: quiz.timeframe ?? "A confirmar" },
          { icon: Users, label: "Viajeros", value: quiz.travelers ? `${quiz.travelers} persona${Number(quiz.travelers) > 1 ? "s" : ""}` : "—" },
          { icon: MapPin, label: "Estilo", value: quiz.travel_type ?? "—" },
          { icon: CheckCircle2, label: "Plan", value: quiz.meal_plan ?? "—" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</span>
            </div>
            <p className="font-semibold text-foreground text-sm leading-tight">{value}</p>
          </div>
        ))}
      </div>

      {/* Video Section */}
      {recommendation.video_url && (
        <div className="mb-10 animate-fade-up">
          <h3 className="text-xl font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
            Conoce tu próximo destino
          </h3>
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-border bg-black">
            <iframe
              width="100%"
              height="100%"
              src={recommendation.video_url}
              title={`Video de ${recommendation.name}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      )}

      {/* Sample Itinerary */}
      <div className="mb-10">
        <h3 className="text-xl font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
          Itinerario sugerido
        </h3>
        <div className="space-y-4">
          {recommendation.itinerary.map((day) => (
            <div
              key={day.day}
              className="flex gap-4 bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-base">{day.day}</span>
              </div>
              <div>
                <p className="font-semibold text-foreground text-base">{day.title}</p>
                <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{day.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tours Section */}
      {recommendation.tours && recommendation.tours.length > 0 && (
        <div className="mb-10 bg-accent/5 rounded-2xl p-6 border border-accent/20">
          <h3 className="text-xl font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
            Tours disponibles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recommendation.tours.map((tour) => (
              <div key={tour} className="flex items-center gap-3 text-foreground/80 bg-white/50 px-4 py-2.5 rounded-lg text-sm font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                {tour}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Includes */}
      <div className="bg-secondary/50 border border-border rounded-2xl p-6 mb-10">
        <h3 className="font-serif font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
          Lo que incluye este paquete
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Plane, title: "Vuelos", text: "Asesoría para los mejores horarios y tarifas." },
            { icon: CheckCircle2, title: "Hotel", text: `Alojamiento seleccionado en modalidad ${quiz.meal_plan || "a consultar"}.` },
            { icon: MapPin, title: "Traslados Privados", text: "Aeropuerto – Hotel – Aeropuerto (Exclusivo)." },
            { icon: Calendar, title: "Asesoría 24/7", text: "Acompañamiento personalizado durante todo tu viaje." },
            { icon: CheckCircle2, title: "Seguro Médico", text: "Opcional y altamente recomendado (Asistencia total)." },
            { icon: CheckCircle2, title: "Tours Guiados", text: "Entradas y guías certificados en tours seleccionados." },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <item.icon className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">{item.title}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-5 border-t border-border/50">
          <p className="text-[10px] text-muted-foreground leading-relaxed italic">
            * Nota: Los boletos aéreos se cotizan por separado con un asesor para garantizar la mejor tarifa vigente. El presupuesto mostrado es una estimación que incluye vuelos en clase económica.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <WhatsAppButton
            destination={recommendation.name}
            budget={quiz.budget}
            timeframe={quiz.timeframe}
            travelers={quiz.travelers}
            travelType={quiz.travel_type}
            mealPlan={quiz.meal_plan}
            size="lg"
            className="flex-1 transform hover:scale-105 transition-transform"
          />
          <a
            href={`https://wa.me/50289b493?text=Hola!%20Estoy%20listo%20para%20COMPRAR%20mi%20viaje%20a%20${recommendation.name}.%20Quiero%20asesoria%20inmediata.`}
            target="_blank"
            rel="noopener noreferrer"
            id="results-buy-btn"
            onClick={() => trackEvent("whatsapp_clicked", { type: "buy_now_results", destination: recommendation.name })}
            className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-bold text-base px-12 py-4 rounded-xl shadow-lg hover:brightness-95 transition-all duration-200 hover:-translate-y-1 hover:shadow-accent/40 flex-1 whitespace-nowrap transform scale-100 hover:scale-105 font-serif"
          >
            Comprar
          </a>
        </div>
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-wa-green" /> Respuesta inmediata</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-wa-green" /> Asesoría experta</span>
        </div>
      </div>
    </div>
  )
}
