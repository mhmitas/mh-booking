import { fetchAdventuresByTypeSlug } from "@/lib/actions/adventure.actions";
import { IAdventure } from "@/lib/types/data_model_types";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from 'react'

const TypesPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params; // adventure

    const adventures = await fetchAdventuresByTypeSlug({ slug })

    return (
        <main className="my-20">
            <div className="custom-container space-y-10 grid grid-cols-3 gap-10">
                {adventures.map((item: { _id: string, adventure: IAdventure }) => (
                    <div
                        className={cn(
                            "relative flex flex-col h-full rounded-lg border bg-card shadow-sm transition-all duration-300 hover:shadow-md",
                        )}
                    >
                        <div className="flex flex-col justify-between h-full p-5 sm:p-6 lg:p-8">
                            <div className="space-y-4">
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">{item.adventure.title}</h3>

                                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-4">
                                    {item.adventure.description}
                                </p>
                            </div>

                            <div className="pt-6 mt-auto">
                                <Link
                                    href={`/adventure/${item.adventure.slug}`} className="">
                                    <button
                                        className="inline-flex items-center gap-2 text-foreground font-medium text-sm sm:text-base hover:gap-3 transition-all duration-300 group-hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary text-start cursor-pointer"
                                        aria-label={`Explore ${item.adventure.title}`}
                                    >
                                        <span>Explore {item.adventure.title.toLowerCase()}</span>
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Optional hover effect overlay */}
                        <div className="absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-primary/20 pointer-events-none" />
                    </div>
                ))}
            </div>
        </main>
    )
}

export default TypesPage