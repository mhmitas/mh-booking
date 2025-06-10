import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from 'react'

const DynamicHeader = async ({ item }: { item: any }) => {
    return (
        <main>
            <header className="min-h-[calc(100vh-64px)] flex flex-col lg:grid lg:grid-cols-2">
                {/* Content Section */}
                <div className="relative z-10 flex items-center justify-center px-4 py-12 lg:px-8 lg:py-16 order-2 lg:order-1">
                    <div className="w-full max-w-2xl mx-auto text-center lg:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6 leading-tight">
                            <span className="line-clamp-3 lg:line-clamp-none">{item?.title || item?.name || "Default Title"}</span>
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 lg:mb-8 opacity-90 line-clamp-4 lg:line-clamp-6">
                            {item?.description || item?.overview || item?.intro || "Default Description"}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start">
                            <Button size="lg" className="w-full sm:w-auto">
                                Start Your Adventure
                            </Button>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-full order-1 lg:order-2">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-background via-background/60 to-transparent z-10"></div>

                    {/* Image Container */}
                    <div className="relative w-full h-full">
                        <Image
                            src={item?.thumbnail || "/placeholder.svg?height=600&width=800"}
                            alt={item?.title || item?.name || "Header image"}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                            unoptimized
                        />
                    </div>
                </div>
            </header>
        </main>
    )
}

export default DynamicHeader