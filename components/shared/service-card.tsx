import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ICategory } from "@/lib/types/data_model_types";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  category: ICategory;
}

export default function ServiceCard({ category }: ServiceCardProps) {
  return (
    <section
      id={category._id.toString()}
      className="group relative cursor-default"
    >
      <Link href={`/category/${category.slug}`}>
        <div
          className={cn(
            "group relative flex flex-col h-full rounded-lg border bg-card shadow-sm transition-all duration-300 hover:shadow-md"
          )}
        >
          <div className="flex flex-col justify-between h-full p-5 sm:p-6 lg:p-8">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                {category.name}
              </h3>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-4">
                {category.description}
              </p>
            </div>

            <div className="pt-6 mt-auto">
              <button
                className="inline-flex items-center gap-2 text-foreground font-medium text-sm sm:text-base hover:gap-3 transition-all duration-300 group-hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary text-start"
                aria-label={`Explore ${category.title}`}
              >
                <span>Explore {category.name.toLowerCase()} Options</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Optional hover effect overlay */}
          <div className="absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-primary/20 pointer-events-none" />
        </div>
      </Link>
    </section>
  );
}

// <div className="relative aspect-[4/3] w-full overflow-hidden">
//     <Image
//         src={"/images/placeholder.svg"}
//         alt={category.name}
//         fill
//         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         className="object-cover transition-all duration-700 group-hover:scale-110"
//         priority={false}
//     />
//     <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

//     {/* Content Overlay */}
//     <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8">
//         <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px]">
//             <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">{category.name}</h3>
//             <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 max-w-md line-clamp-4">{category.description}</p>

//             {/* Call to Action */}
//             <button className="inline-flex items-center gap-2 text-foreground font-medium text-sm md:text-base hover:gap-3 transition-all duration-300 group-hover:text-muted-foreground">
//                 <span>Explore {category.name.toLowerCase()}</span>
//                 <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//             </button>
//         </div>
//     </div>
// </div>
