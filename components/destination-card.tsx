import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface DestinationCardProps {
  name: string
  slug: string
  country: string
  priceRange: string
  image: string
  description: string
}

export function DestinationCard({
  name,
  slug,
  country,
  priceRange,
  image,
  description,
}: DestinationCardProps) {
  return (
    <Link
      href={`/destinos/${slug}`}
      className="group block overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={`Viajar a ${name} desde Guatemala`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            {country}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
          Viajar a {name} desde Guatemala
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-primary">{priceRange}</span>
          <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
            Ver guía <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
