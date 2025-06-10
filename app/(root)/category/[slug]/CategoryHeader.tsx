import { Button } from "@/components/ui/button";
import { ICategory } from "@/lib/types/data_model_types";
import React from 'react'

const CategoryHeader = async ({ category }: { category: ICategory }) => {

    return (
        <main>
            <header className="grid grid-cols-2 min-h-[calc(100vh-64px)]">

                <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">{category.title}</h2>
                        <p className="text-base md:text-lg leading-relaxed mb-8 max-w-3xl mx-auto opacity-90">
                            {category.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg">
                                Start Your Adventure
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
                    <img className="object-cover h-full" src={category.thumbnail || "/images/placeholder.svg"} alt="" />
                </div>
            </header>
        </main>
    )
}

export default CategoryHeader