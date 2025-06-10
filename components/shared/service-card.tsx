import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { ICategory } from "@/lib/database/models/category.model"
import Link from "next/link"

interface ServiceCardProps {
    category: ICategory
}

export default function ServiceCard({ category }: ServiceCardProps) {
    return (
        <section id={category._id.toString()} className="group relative cursor-default">
            <Link href={`/category/${category.slug}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                        src={"/images/placeholder.svg"}
                        alt={category.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                        priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8">
                        <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">{category.name}</h3>
                            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 max-w-md line-clamp-4">{category.description}</p>

                            {/* Call to Action */}
                            <button className="inline-flex items-center gap-2 text-foreground font-medium text-sm md:text-base hover:gap-3 transition-all duration-300 group-hover:text-muted-foreground">
                                <span>Explore {category.name.toLowerCase()}</span>
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </section>
    )
}
