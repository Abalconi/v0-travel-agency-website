import type { Metadata } from "next"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const WALINK = "https://walink.co/89b493"

export const metadata: Metadata = {
  title: "Preguntas Frecuentes sobre Viajes | Wanderlux",
  description: "Respuestas a las preguntas más comunes sobre viajar con agencia: seguros, retrasos, cotizaciones, pagos y más. Agencia de viajes en Guatemala.",
}

const faqs = [
  {
    question: "¿Es mejor viajar con agencia o por cuenta propia?",
    answer: "Viajar con agencia ofrece varias ventajas: acceso a tarifas preferenciales con aerolíneas y hoteles, asesoría experta sobre destinos, optimización de rutas e itinerarios, y apoyo ante imprevistos durante el viaje. Para viajeros primerizos o destinos complejos, una agencia puede ahorrarte tiempo, dinero y preocupaciones. Sin embargo, viajeros experimentados que disfrutan planificar cada detalle pueden preferir hacerlo por su cuenta.",
  },
  {
    question: "¿Qué pasa si hay retrasos o cancelaciones en mi vuelo?",
    answer: "Cuando reservas con nosotros, te brindamos apoyo en caso de retrasos o cancelaciones. Dependiendo de la situación, podemos ayudarte a gestionar cambios de vuelo, coordinar con el hotel si llegas tarde, o buscar alternativas. Si tienes seguro de viaje (recomendado), también te asesoramos sobre cómo hacer válida tu cobertura. Las aerolíneas tienen obligaciones de compensación según la regulación de cada país.",
  },
  {
    question: "¿El seguro de viaje está incluido en los paquetes?",
    answer: "El seguro de viaje generalmente no está incluido en el precio base de los paquetes, pero lo ofrecemos como opción adicional altamente recomendada. El costo varía según el destino, duración del viaje y cobertura deseada. Un seguro básico puede cubrir gastos médicos, cancelación de viaje, pérdida de equipaje y asistencia en emergencias. Para destinos que requieren visa, algunos consulados exigen seguro obligatorio.",
  },
  {
    question: "¿Cómo se cotiza un viaje?",
    answer: "El proceso es sencillo: contáctanos por WhatsApp o correo indicando el destino deseado, fechas aproximadas, número de personas y cualquier preferencia especial (tipo de hotel, actividades, presupuesto). En un plazo de 24-48 horas te enviamos opciones personalizadas con precios reales y detalles de lo que incluye cada alternativa. La cotización no tiene costo ni compromiso.",
  },
  {
    question: "¿Cuánto tiempo antes debo reservar mi viaje?",
    answer: "Recomendamos reservar con al menos 4-6 semanas de anticipación para obtener mejores precios y disponibilidad. En temporada alta (diciembre-abril, Semana Santa) es mejor reservar con 2-3 meses de anticipación. Para viajes de última hora también podemos ayudarte, aunque las opciones pueden ser más limitadas y los precios más altos.",
  },
  {
    question: "¿Qué formas de pago aceptan?",
    answer: "Aceptamos transferencia bancaria, depósito en cuenta, tarjetas de crédito y débito (Visa, Mastercard). Para paquetes grandes, ofrecemos planes de pago donde puedes reservar con un anticipo y completar el pago antes del viaje. Los términos específicos se acuerdan según el monto y las fechas.",
  },
  {
    question: "¿Qué documentos necesito para viajar?",
    answer: "Los requisitos varían según el destino. En general necesitas: pasaporte vigente con al menos 6 meses de validez, visa (si aplica), boleto aéreo de ida y vuelta, comprobante de hospedaje, y prueba de solvencia económica. Algunos países piden vacunas específicas. Te asesoramos sobre los requisitos exactos de tu destino al momento de cotizar.",
  },
  {
    question: "¿Pueden ayudarme con el trámite de visa?",
    answer: "Sí, te asesoramos sobre los requisitos de visa y el proceso de solicitud para destinos que lo requieran. Te indicamos qué documentos necesitas, cómo llenar los formularios y qué esperar en la entrevista (si aplica). Sin embargo, la decisión final de otorgar la visa corresponde al consulado o embajada del país de destino.",
  },
  {
    question: "¿Qué sucede si necesito cancelar mi viaje?",
    answer: "Las políticas de cancelación dependen de cada aerolínea y hotel. Al momento de reservar, te explicamos las condiciones específicas de tu paquete. Algunos servicios son reembolsables (total o parcialmente), mientras que otros tienen penalidades. El seguro de viaje puede cubrir cancelaciones por motivos justificados como enfermedad o emergencias familiares.",
  },
  {
    question: "¿Organizan viajes en grupo?",
    answer: "Sí, organizamos viajes grupales para familias, amigos o grupos corporativos. Los viajes en grupo pueden acceder a tarifas especiales y descuentos por volumen. También podemos coordinar actividades grupales, transporte privado y experiencias exclusivas. Contáctanos con los detalles de tu grupo para una cotización personalizada.",
  },
]

export default function PreguntasFrecuentesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl text-balance">
              Preguntas frecuentes sobre viajes
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Respuestas a las dudas más comunes de nuestros viajeros. Si no encuentras lo que buscas, escríbenos por WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-border bg-card px-6 data-[state=open]:bg-muted/30"
              >
                <AccordionTrigger className="text-left font-medium text-card-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-12 lg:pb-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="rounded-xl bg-secondary p-6 lg:p-8 text-center">
            <h2 className="text-lg font-semibold text-foreground">
              ¿Tienes otra pregunta?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Escríbenos por WhatsApp y te respondemos en minutos. Estamos para ayudarte a planificar tu viaje ideal.
            </p>
            <a
              href={WALINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Enviar pregunta por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <WhatsAppCTA />
    </>
  )
}
