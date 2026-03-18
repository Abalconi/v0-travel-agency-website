import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Plane } from "lucide-react"

const WALINK = "https://walink.co/89b493"


const links = [
  { name: "Inicio", href: "/" },
  { name: "Destinos", href: "/destinos" },
  { name: "Viajar desde Guatemala", href: "/viajar-desde-guatemala" },
  { name: "Preguntas Frecuentes", href: "/preguntas-frecuentes" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-final.png"
                alt="Wanderlux Travel Agency"
                width={80}
                height={80}
                className="h-20 w-auto object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Agencia de viajes en Guatemala especializada en viajes internacionales con asesoría personalizada.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Guatemala City, Guatemala</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+502 3961-6185</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+502 5109-0041</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>reservas@wandergt.com</span>
              </div>
            </div>
          </div>

          {/* Empty column to keep grid balance or other links */}
          <div></div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Enlaces</h3>
            <ul className="mt-4 space-y-2">
              {links.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Asesoría Personalizada</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              ¿Quieres asesoría para tu viaje? Escríbenos por WhatsApp y te ayudamos a planificarlo.
            </p>
            <a
              href={WALINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tekylab. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
