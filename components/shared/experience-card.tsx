import { ExperienceCardParams } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const ExperienceCard = ({ item }: { item: ExperienceCardParams }) => {
  return (
    <div
      key={item.experience._id.toString()}
      className={cn(
        "relative flex flex-col h-full rounded-lg border bg-card shadow-sm transition-all duration-300 hover:shadow-md"
      )}
    >
      <div className="flex flex-col justify-between h-full p-5 sm:p-6 lg:p-8">
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
            {item.experience.title}
          </h3>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-3">
            {item.experience.description}
          </p>
        </div>

        <div className="mt-auto pt-3">
          <Link
            href={`/experience-details/${item.experience.slug}`}
            className=""
          >
            <button
              className="inline-flex items-center gap-2 text-foreground font-medium text-sm hover:gap-3 transition-all duration-300 group-hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary text-start cursor-pointer w-full hover:text-primary"
              aria-label={`Explore ${item.experience.title}`}
            >
              <span>Read More</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>

      {/* Optional hover effect overlay */}
      <div className="absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-primary/20 pointer-events-none" />
    </div>
  );
};

export default ExperienceCard;
