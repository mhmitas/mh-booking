import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface ServiceCardProps {
    id: string
    title: string
    description: string
    imageSrc: string
    imageAlt: string
}

export default function ServiceCard({ id, title, description, imageSrc, imageAlt }: ServiceCardProps) {
    return (
        <section id={id} className="group relative cursor-default">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                    src={imageSrc || "/placeholder.svg"}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">{title}</h3>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 max-w-md">{description}</p>

                        {/* Call to Action */}
                        <button className="inline-flex items-center gap-2 text-foreground font-medium text-sm md:text-base hover:gap-3 transition-all duration-300 group-hover:text-muted-foreground">
                            <span>Explore {title.toLowerCase()}</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
