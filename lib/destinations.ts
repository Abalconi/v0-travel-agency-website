export interface Destination {
  name: string
  slug: string
  country: string
  priceRange: string
  image: string
  shortDescription: string
  directAnswer: string
  visaRequired: boolean
  visaInfo: string
  bestSeason: string
  recommendedDays: string
  includes: string[]
  sections: {
    title: string
    content: string
  }[]
}

export const destinations: Destination[] = [
  {
    name: "Cartagena",
    slug: "cartagena",
    country: "Colombia",
    priceRange: "USD 750 - 1,400",
    image: "/images/cartagena.jpg",
    shortDescription: "Ciudad histórica con playas del Caribe, arquitectura colonial y una vibrante vida cultural.",
    directAnswer: "Viajar a Cartagena desde Guatemala cuesta en promedio entre USD 750 y USD 1,400, dependiendo de la temporada, duración del viaje y tipo de hotel.",
    visaRequired: false,
    visaInfo: "Los ciudadanos guatemaltecos no necesitan visa para ingresar a Colombia por turismo.",
    bestSeason: "Enero a marzo ofrece clima seco y alta demanda. Septiembre tiene precios más bajos.",
    recommendedDays: "Entre 4 y 6 días.",
    includes: [
      "Vuelo ida y vuelta",
      "Hotel en zona histórica o Bocagrande",
      "Traslados aeropuerto – hotel",
      "Asesoría personalizada",
      "Seguro de viaje disponible como opcional"
    ],
    sections: [
      {
        title: "¿Qué incluye normalmente un viaje a Cartagena?",
        content: "Un paquete típico a Cartagena incluye vuelo ida y vuelta desde Guatemala, hospedaje en hoteles de la zona histórica o Bocagrande, traslados aeropuerto-hotel, y asesoría personalizada durante la planificación. El seguro de viaje está disponible como opcional para mayor tranquilidad."
      },
      {
        title: "¿Necesito visa para viajar a Cartagena?",
        content: "Los ciudadanos guatemaltecos no necesitan visa para ingresar a Colombia por turismo. Solo necesitas pasaporte vigente con al menos 6 meses de validez y demostrar solvencia económica para tu estadía."
      },
      {
        title: "Mejor época para viajar a Cartagena",
        content: "La mejor época para visitar Cartagena es de enero a marzo, cuando el clima es seco y las temperaturas son agradables. Sin embargo, esta es también la temporada alta con mayor demanda. Si buscas precios más accesibles, septiembre ofrece tarifas más bajas con clima aceptable."
      },
      {
        title: "¿Cuántos días se recomiendan?",
        content: "Se recomienda entre 4 y 6 días para conocer Cartagena adecuadamente. Este tiempo permite explorar la ciudad amurallada, visitar las islas del Rosario, disfrutar de la gastronomía local y tener tiempo para relajarse en la playa."
      },
      {
        title: "¿Viajar con agencia o por cuenta propia?",
        content: "Viajar con agencia permite optimizar tiempos, evitar errores logísticos y contar con apoyo ante imprevistos. Una agencia puede negociar mejores tarifas en hoteles y vuelos, además de ofrecer asesoría sobre las mejores zonas para hospedarse y actividades recomendadas."
      }
    ]
  },
  {
    name: "Medellín",
    slug: "medellin",
    country: "Colombia",
    priceRange: "USD 700 - 1,300",
    image: "/images/medellin.jpg",
    shortDescription: "La ciudad de la eterna primavera, conocida por su clima perfecto e innovación urbana.",
    directAnswer: "Viajar a Medellín desde Guatemala cuesta en promedio entre USD 700 y USD 1,300, dependiendo de la temporada, duración del viaje y tipo de hotel.",
    visaRequired: false,
    visaInfo: "Los ciudadanos guatemaltecos no necesitan visa para ingresar a Colombia por turismo.",
    bestSeason: "Todo el año gracias a su clima primaveral constante. Diciembre y enero tienen más eventos.",
    recommendedDays: "Entre 4 y 6 días.",
    includes: [
      "Vuelo ida y vuelta",
      "Hotel en El Poblado o Laureles",
      "Traslados aeropuerto – hotel",
      "Asesoría personalizada",
      "Seguro de viaje disponible como opcional"
    ],
    sections: [
      {
        title: "¿Es seguro viajar a Medellín?",
        content: "Medellín ha experimentado una transformación significativa en las últimas décadas. Hoy es considerada una ciudad segura para turistas, especialmente en zonas como El Poblado, Laureles y el centro renovado. Como en cualquier ciudad grande, se recomienda tomar precauciones básicas y evitar zonas alejadas de las áreas turísticas."
      },
      {
        title: "¿Necesito visa para viajar a Medellín?",
        content: "Los ciudadanos guatemaltecos no necesitan visa para ingresar a Colombia por turismo. Solo necesitas pasaporte vigente con al menos 6 meses de validez."
      },
      {
        title: "Mejores barrios para hospedarse",
        content: "El Poblado es la zona más popular entre turistas por su seguridad, restaurantes y vida nocturna. Laureles ofrece una experiencia más local y auténtica con excelentes opciones gastronómicas. Envigado es ideal para quienes buscan tranquilidad cerca de la ciudad."
      },
      {
        title: "Clima y mejor época para visitar",
        content: "Medellín es conocida como la 'ciudad de la eterna primavera' por su clima templado todo el año, con temperaturas entre 18°C y 28°C. Cualquier época es buena para visitar, aunque diciembre y enero ofrecen más eventos culturales y festividades."
      },
      {
        title: "¿Cuántos días se recomiendan?",
        content: "Entre 4 y 6 días permiten conocer los principales atractivos: el centro histórico, el Metro y Metrocable, la Comuna 13, el Parque Arví, y disfrutar de la gastronomía y vida nocturna de El Poblado."
      }
    ]
  },
  {
    name: "Ciudad de México",
    slug: "ciudad-de-mexico",
    country: "México",
    priceRange: "USD 600 - 1,200",
    image: "/images/cdmx.jpg",
    shortDescription: "Capital histórica y cultural con gastronomía excepcional, museos de clase mundial y arquitectura impresionante.",
    directAnswer: "Viajar a Ciudad de México desde Guatemala cuesta en promedio entre USD 600 y USD 1,200, dependiendo de la temporada, duración del viaje y tipo de hotel.",
    visaRequired: false,
    visaInfo: "Los ciudadanos guatemaltecos no necesitan visa para ingresar a México por turismo. Solo requieren pasaporte vigente.",
    bestSeason: "Marzo a mayo ofrece clima agradable. Noviembre tiene festividades únicas como Día de Muertos.",
    recommendedDays: "Entre 5 y 7 días.",
    includes: [
      "Vuelo ida y vuelta",
      "Hotel en Condesa, Roma o Centro Histórico",
      "Traslados aeropuerto – hotel",
      "Asesoría personalizada",
      "Seguro de viaje disponible como opcional"
    ],
    sections: [
      {
        title: "Requisitos migratorios para guatemaltecos",
        content: "Los ciudadanos guatemaltecos no necesitan visa para ingresar a México por turismo hasta por 180 días. Solo se requiere pasaporte vigente con al menos 6 meses de validez y llenar el formulario de migración al llegar."
      },
      {
        title: "¿Cuánto tiempo se recomienda?",
        content: "Se recomiendan entre 5 y 7 días para conocer los principales atractivos de la Ciudad de México: el Centro Histórico, Coyoacán, el Museo de Antropología, las pirámides de Teotihuacán, y disfrutar de la gastronomía local."
      },
      {
        title: "Mejores zonas para hospedarse",
        content: "La Condesa y Roma Norte son ideales por sus parques, restaurantes y ambiente bohemio. El Centro Histórico ofrece acceso directo a los principales sitios turísticos. Polanco es perfecto para quienes buscan lujo y compras de alta gama."
      },
      {
        title: "¿Viajar con agencia o por cuenta propia?",
        content: "Aunque México es accesible para viajeros independientes, una agencia puede optimizar tu itinerario, conseguir mejores precios en hoteles y vuelos, y organizar tours a sitios como Teotihuacán o Xochimilco sin preocupaciones logísticas."
      },
      {
        title: "Mejor época para visitar",
        content: "Marzo a mayo ofrece clima templado y seco. Noviembre es especial por las celebraciones de Día de Muertos. Evita la temporada de lluvias intensas de junio a septiembre si prefieres actividades al aire libre."
      }
    ]
  },
  {
    name: "Punta Cana",
    slug: "punta-cana",
    country: "República Dominicana",
    priceRange: "USD 900 - 1,800",
    image: "/images/punta-cana.jpg",
    shortDescription: "Playas paradisíacas con resorts todo incluido, ideales para descanso y diversión.",
    directAnswer: "Viajar a Punta Cana desde Guatemala cuesta en promedio entre USD 900 y USD 1,800 en modalidad todo incluido, dependiendo de la temporada, duración del viaje y categoría del resort.",
    visaRequired: false,
    visaInfo: "Los ciudadanos guatemaltecos no necesitan visa para ingresar a República Dominicana por turismo.",
    bestSeason: "Diciembre a abril ofrece el mejor clima. Mayo y junio tienen precios más accesibles.",
    recommendedDays: "Entre 5 y 7 días.",
    includes: [
      "Vuelo ida y vuelta",
      "Resort todo incluido",
      "Traslados aeropuerto – hotel",
      "Asesoría personalizada",
      "Seguro de viaje disponible como opcional"
    ],
    sections: [
      {
        title: "¿Qué significa todo incluido?",
        content: "Los resorts todo incluido en Punta Cana ofrecen alojamiento, todas las comidas en múltiples restaurantes, bebidas ilimitadas (incluyendo alcohol), actividades recreativas, entretenimiento nocturno y acceso a playas privadas. Algunos incluyen deportes acuáticos y spa."
      },
      {
        title: "Mejor temporada para viajar",
        content: "La temporada alta va de diciembre a abril, con clima seco y temperaturas perfectas. Mayo y junio ofrecen precios más accesibles antes de la temporada de huracanes. Septiembre y octubre tienen el mayor riesgo de tormentas."
      },
      {
        title: "¿Para parejas o familias?",
        content: "Punta Cana tiene opciones para todos. Existen resorts solo para adultos ideales para parejas y lunas de miel, así como resorts familiares con clubes para niños, parques acuáticos y actividades para todas las edades."
      },
      {
        title: "¿Necesito visa para viajar?",
        content: "Los ciudadanos guatemaltecos no necesitan visa para ingresar a República Dominicana por turismo. Solo requieren pasaporte vigente y una tarjeta de turista que generalmente está incluida en el boleto aéreo."
      },
      {
        title: "Comparativa por temporada",
        content: "Temporada alta (dic-abr): USD 1,200-1,800, clima seco, mayor demanda. Temporada media (may-jun): USD 900-1,300, clima variable, buenos precios. Temporada baja (jul-nov): USD 800-1,200, riesgo de lluvias, ofertas especiales."
      }
    ]
  },
  {
    name: "Bahamas",
    slug: "bahamas",
    country: "Bahamas",
    priceRange: "USD 1,200 - 2,500",
    image: "/images/bahamas.jpg",
    shortDescription: "Archipiélago paradisíaco con aguas cristalinas, playas de arena blanca y lujo caribeño.",
    directAnswer: "Viajar a Bahamas desde Guatemala cuesta en promedio entre USD 1,200 y USD 2,500, dependiendo de la temporada, duración del viaje, isla elegida y tipo de alojamiento.",
    visaRequired: true,
    visaInfo: "Los ciudadanos guatemaltecos necesitan visa para ingresar a Bahamas. Se puede solicitar en la embajada o consulado correspondiente.",
    bestSeason: "Diciembre a abril ofrece el mejor clima. Junio a noviembre es temporada de huracanes.",
    recommendedDays: "Entre 5 y 8 días.",
    includes: [
      "Vuelo ida y vuelta",
      "Hotel o resort seleccionado",
      "Traslados aeropuerto – hotel",
      "Asesoría personalizada",
      "Seguro de viaje recomendado"
    ],
    sections: [
      {
        title: "Requisitos de visa para guatemaltecos",
        content: "Los ciudadanos guatemaltecos necesitan visa para ingresar a Bahamas. El proceso incluye presentar pasaporte vigente, formulario de solicitud, fotografías, prueba de alojamiento, itinerario de vuelos y demostración de solvencia económica. El trámite puede tomar 2-3 semanas."
      },
      {
        title: "Mejores islas para visitar",
        content: "Nassau y Paradise Island son ideales para primera visita, con fácil acceso y variedad de actividades. Exuma ofrece los famosos cerdos nadadores y cayos vírgenes. Harbour Island tiene las icónicas playas de arena rosa. Andros es perfecta para buceo y naturaleza."
      },
      {
        title: "¿Hotel o crucero?",
        content: "Los hoteles ofrecen más tiempo en cada isla y experiencias personalizadas. Los cruceros permiten conocer varias islas en menos tiempo pero con menos profundidad. Para una experiencia auténtica de Bahamas, recomendamos hospedarte en las islas."
      },
      {
        title: "Seguridad y temporadas",
        content: "Bahamas es generalmente seguro para turistas. La temporada alta (dic-abr) tiene clima perfecto pero precios elevados. La temporada de huracanes (jun-nov) ofrece descuentos pero mayor riesgo de tormentas. Se recomienda contratar seguro de viaje."
      },
      {
        title: "¿Cuántos días se recomiendan?",
        content: "Entre 5 y 8 días permiten disfrutar de las playas, hacer excursiones a cayos cercanos, practicar snorkel o buceo, y conocer la cultura local sin prisas."
      }
    ]
  },
  {
    name: "Río de Janeiro",
    slug: "rio-de-janeiro",
    country: "Brasil",
    priceRange: "USD 1,100 - 2,000",
    image: "/images/rio.jpg",
    shortDescription: "La ciudad maravillosa con playas icónicas, el Cristo Redentor y una vibrante cultura brasileña.",
    directAnswer: "Viajar a Río de Janeiro desde Guatemala cuesta en promedio entre USD 1,100 y USD 2,000, dependiendo de temporada y hotel.",
    visaRequired: false,
    visaInfo: "Los ciudadanos guatemaltecos no necesitan visa para ingresar a Brasil por turismo hasta por 90 días.",
    bestSeason: "Diciembre a marzo es verano brasileño. Abril a junio tiene clima agradable y menos turistas.",
    recommendedDays: "Entre 5 y 7 días.",
    includes: [
      "Vuelo ida y vuelta",
      "Hotel en Copacabana, Ipanema o Leblon",
      "Traslados aeropuerto – hotel",
      "Asesoría personalizada",
      "Seguro de viaje disponible como opcional"
    ],
    sections: [
      {
        title: "¿Necesito visa para viajar a Brasil?",
        content: "Los ciudadanos guatemaltecos no necesitan visa para ingresar a Brasil por turismo hasta por 90 días. Solo se requiere pasaporte vigente con al menos 6 meses de validez."
      },
      {
        title: "Seguridad y zonas recomendadas",
        content: "Río tiene zonas muy seguras para turistas como Copacabana, Ipanema, Leblon, Barra da Tijuca y el Centro Histórico durante el día. Se recomienda evitar favelas sin guía autorizado, no ostentar objetos de valor y usar taxis o apps de transporte por la noche."
      },
      {
        title: "Mejor época para viajar",
        content: "Diciembre a marzo es verano brasileño con temperaturas altas y ambiente festivo (incluye Carnaval en febrero). Abril a junio ofrece clima agradable, menos turistas y precios más accesibles. El Carnaval atrae multitudes pero es una experiencia única."
      },
      {
        title: "¿Cuántos días se recomiendan?",
        content: "Entre 5 y 7 días permiten visitar el Cristo Redentor, el Pan de Azúcar, las playas de Copacabana e Ipanema, el barrio de Santa Teresa, y disfrutar de la gastronomía y vida nocturna carioca."
      },
      {
        title: "¿Viajar con agencia o por cuenta propia?",
        content: "Una agencia puede ayudar a planificar un itinerario seguro, recomendar las mejores zonas para hospedarse, organizar tours a los principales atractivos y ofrecer apoyo ante cualquier imprevisto durante el viaje."
      }
    ]
  }
]

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug)
}

export function getAllDestinationSlugs(): string[] {
  return destinations.map((d) => d.slug)
}
