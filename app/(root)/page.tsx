import ExperienceCard from "@/components/shared/experience-card";
import ServiceCard from "@/components/shared/service-card";
import { Button } from "@/components/ui/button";
import {
  fetchAdventuresByTypeSlug,
  fetchCategories,
} from "@/lib/actions/adventure.actions";
import { test } from "@/lib/actions/test.actions";
import { ExperienceCardParams } from "@/lib/types";
import { ICategory, IExperience } from "@/lib/types/data_model_types";
import Image from "next/image";
import React from "react";

const Page = async () => {
  const categories = await fetchCategories();

  const hikings = await fetchAdventuresByTypeSlug({ slug: "hiking" });
  const bikings = await fetchAdventuresByTypeSlug({ slug: "biking" });

  return (
    <main className="mb-8 flex-1">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-64px)] w-full">
        <Image
          src="https://res.cloudinary.com/dcengsrzo/image/upload/v1750995765/blackberry_mountain/ge4rfxzxhjoptpxjq5us.png"
          alt="Scenic landscape view"
          fill
          priority
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="custom-container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Experience Extraordinary Journeys
          </h1>
          <p className="mt-6 max-w-lg text-lg text-white">
            Discover our curated collection of premium services designed to
            create unforgettable memories.
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
      <section className="my-16 md:my-24 space-y-10">
        <div className="custom-container">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Hiking Experiences
          </h2>
          {/* Service Categories */}
          <div className="mt-5 md:mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {hikings.map((experience: ExperienceCardParams) => (
              <ExperienceCard
                key={experience._id.toString()}
                item={experience}
              />
            ))}
          </div>
        </div>
        <div className="custom-container">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Biking Experiences
          </h2>
          {/* Service Categories */}
          <div className="mt-5 md:mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {bikings.map((experience: ExperienceCardParams) => (
              <ExperienceCard
                key={experience._id.toString()}
                item={experience}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-card py-16">
        <div className="custom-container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Begin Your Journey?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Let us help you create the perfect experience tailored to your
              preferences. Our expert team is ready to assist you every step of
              the way.
            </p>
            <div className="mt-10">
              <Button variant={"secondary"} size="lg" className="h-12 px-8">
                Contact Us Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="custom-container">
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">
            What Our Clients Say
          </h2>
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
                  "The experience was absolutely incredible. The attention to
                  detail and personalized service exceeded all my expectations.
                  I can't wait to book my next journey!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
