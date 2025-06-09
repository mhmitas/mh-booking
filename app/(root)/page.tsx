import ServiceCard from "@/components/shared/service-card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import React from 'react'

const Page = async () => {

    return (
        <main className="mb-8 flex-1">
            {/* Hero Section */}
            <section className="relative h-[80vh] w-full">
                <Image
                    src="/images/placeholder.svg"
                    alt="Scenic landscape view"
                    fill
                    priority
                    className="object-cover"
                    unoptimized
                />
                <div className="absolute inset-0 bg-background/80" />
                <div className="custom-container relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        Experience Extraordinary Journeys
                    </h1>
                    <p className="mt-6 max-w-lg text-lg text-muted-foreground">
                        Discover our curated collection of premium services designed to create unforgettable memories.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="h-12 px-8">
                            Explore Services
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-12 px-8 border-muted bg-background text-foreground hover:bg-muted"
                        >
                            View Packages
                        </Button>
                    </div>
                </div>
            </section>

            {/* Services Introduction */}
            <section className="py-16 md:py-24">
                <div className="custom-container">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Premium Services</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            We offer a diverse range of experiences tailored to your preferences and desires. From luxurious
                            accommodations to thrilling adventures, we have something for everyone.
                        </p>
                    </div>

                    {/* Service Categories */}
                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <ServiceCard
                            id="stay"
                            title="STAY"
                            description="Luxurious accommodations ranging from boutique hotels to private villas, ensuring comfort and relaxation."
                            imageSrc="/images/placeholder.svg"
                            imageAlt="Luxury accommodation"
                        />
                        <ServiceCard
                            id="adventure"
                            title="ADVENTURE"
                            description="Thrilling experiences from hiking and water sports to safari tours and extreme activities for the adrenaline seekers."
                            imageSrc="/images/placeholder.svg"
                            imageAlt="Adventure activities"
                        />
                        <ServiceCard
                            id="culinary"
                            title="CULINARY"
                            description="Gastronomic journeys featuring local cuisines, cooking classes, wine tastings, and exclusive dining experiences."
                            imageSrc="/images/placeholder.svg"
                            imageAlt="Culinary experience"
                        />
                        <ServiceCard
                            id="wellness"
                            title="WELLNESS"
                            description="Rejuvenating spa treatments, yoga retreats, meditation sessions, and holistic health programs."
                            imageSrc="/images/placeholder.svg"
                            imageAlt="Wellness retreat"
                        />
                        <ServiceCard
                            id="holidays"
                            title="HOLIDAYS"
                            description="Special holiday packages for Christmas, New Year, Valentine's Day, and other festive occasions."
                            imageSrc="/images/placeholder.svg"
                            imageAlt="Holiday celebration"
                        />
                        <ServiceCard
                            id="seasons"
                            title="SEASONS"
                            description="Seasonal experiences like cherry blossom tours in spring, beach getaways in summer, and ski trips in winter."
                            imageSrc="/images/placeholder.svg"
                            imageAlt="Seasonal activity"
                        />
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-muted py-16">
                <div className="custom-container">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Begin Your Journey?</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Let us help you create the perfect experience tailored to your preferences. Our expert team is ready to
                            assist you every step of the way.
                        </p>
                        <div className="mt-10">
                            <Button size="lg" className="h-12 px-8">
                                Contact Us Today
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 md:py-24">
                <div className="custom-container">
                    <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">What Our Clients Say</h2>
                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-card p-6 shadow-sm cursor-default">
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-full bg-muted" />
                                    <div>
                                        <p className="font-medium">Client Name</p>
                                        <p className="text-sm text-muted-foreground">
                                            Service: {["STAY", "ADVENTURE", "CULINARY"][i - 1]}
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-4 text-muted-foreground">
                                    "The experience was absolutely incredible. The attention to detail and personalized service exceeded
                                    all my expectations. I can't wait to book my next journey!"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>

    )
}

export default Page