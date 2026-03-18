"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowDown, MessageCircle, Star, Users, CheckCircle } from "lucide-react"
import { Quiz } from "@/components/quiz/Quiz"
import { trackEvent } from "@/services/tracking"

const WALINK = "https://walink.co/89b493"

const trustBadges = [
  { icon: Star, text: "4.9 / 5 en reseñas" },
  { icon: Users, text: "+500 viajeros asesorados" },
  { icon: CheckCircle, text: "100% en WhatsApp" },
]

export default function HomePage() {
  const scrollToQuiz = () => {
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero-bg.jpg"
          alt="Destino de lujo en el Caribe"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay — asymmetric navy wash */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-foreground/20" />

        {/* Content — left-aligned for editorial feel */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-24 flex flex-col lg:flex-row items-center gap-16">
          {/* Text block */}
          <div className="flex-1 max-w-2xl">
            {/* Eyebrow */}
            {/* Headline */}
            <h1
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] text-balance opacity-0 animate-fade-up delay-100"
              style={{ animationFillMode: "forwards" }}
            >
              Un viaje es la combinación perfecta de <em className="not-italic text-accent">muchos detalles</em>.
            </h1>

            {/* Subheadline */}
            <p
              className="mt-6 text-lg text-white/85 leading-relaxed max-w-xl opacity-0 animate-fade-up delay-200"
              style={{ animationFillMode: "forwards" }}
            >
              Cuando todo encaja, la experiencia se vuelve inolvidable. En Wanderlux usamos tecnología y experiencia en viajes para diseñar itinerarios personalizados, pensados para ti.
            </p>

            {/* Trust badges */}
            <div
              className="mt-6 flex flex-wrap gap-3 opacity-0 animate-fade-up delay-300"
              style={{ animationFillMode: "forwards" }}
            >
              {trustBadges.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 bg-accent/40 backdrop-blur-sm text-white font-semibold text-xs px-3 py-1.5 rounded-full border border-accent/20"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {text}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className="mt-8 flex flex-col sm:flex-row gap-3 opacity-0 animate-fade-up delay-400"
              style={{ animationFillMode: "forwards" }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={WALINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-wa-btn"
                  className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold text-base px-8 py-4 rounded-xl hover:bg-white/25 transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  Hablar por WhatsApp
                </a>
                <a
                  href={`${WALINK}?text=Hola!%20Estoy%20listo%20para%20COMPRAR%20mi%20viaje.%20Quiero%20asesoria%20inmediata.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-buy-btn"
                  onClick={() => trackEvent("whatsapp_clicked", { type: "direct_buy" })}
                  className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-bold text-base px-12 py-4 rounded-xl shadow-lg hover:brightness-95 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Comprar
                </a>
              </div>
            </div>
          </div>

          {/* Quiz Card — right side on desktop */}
          <div
            className="flex-1 w-full max-w-md opacity-0 animate-scale-in delay-300"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="bg-background/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden mx-auto">
              <div className="bg-primary px-6 py-3">
                <p className="text-primary-foreground font-semibold text-sm text-center tracking-wide">
                  Tu quiz de viaje personalizado
                </p>
              </div>
              <div className="p-4 md:p-6">
                <Quiz />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-60 animate-bounce">
          <ArrowDown className="w-5 h-5 text-white" />
        </div>
      </section>


      {/* ─── How it works ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Cómo diseñamos tu experiencia
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Respondes el quiz",
                desc: "5 preguntas rápidas sobre tu destino, presupuesto y preferencias.",
              },
              {
                step: "02",
                title: "Recibes tu recomendación",
                desc: "Te mostramos el itinerario y destino que mejor se adapta a ti.",
              },
              {
                step: "03",
                title: "Conectamos por WhatsApp",
                desc: "Un asesor real te contacta para cerrar los detalles y reservar.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-card rounded-2xl p-6 border border-border shadow-sm text-center">
                <div className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                  Paso {item.step}
                </div>
                <h3 className="font-serif font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WhatsApp CTA Banner ───────────────────────────────────────────────── */}
      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xl font-serif font-semibold text-primary-foreground mb-2">
            ¿Preguntas antes de comenzar?
          </p>
          <p className="text-primary-foreground/80 mb-6 text-sm">
            Estamos disponibles todos los días por WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WALINK}
              target="_blank"
              rel="noopener noreferrer"
              id="bottom-wa-btn"
              className="btn-whatsapp inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-xl text-base shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              Hablar con un asesor
            </a>
            <a
              href={`${WALINK}?text=Hola!%20Estoy%20listo%20para%20COMPRAR%20mi%20viaje.%20Quiero%20asesoria%20inmediata.`}
              target="_blank"
              rel="noopener noreferrer"
              id="bottom-buy-btn"
              onClick={() => trackEvent("whatsapp_clicked", { type: "direct_buy_footer" })}
              className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-bold text-base px-10 py-4 rounded-xl shadow-lg hover:brightness-95 transition-all duration-200 hover:-translate-y-0.5"
            >
              Comprar
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
