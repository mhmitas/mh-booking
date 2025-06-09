import { PropertyCard } from "@/components/shared/properties/property-card";
import { fetchListings } from "@/lib/actions/listing.actions";
import { IListing } from "@/lib/types/data_model_types";
import React from 'react'

const Page = async () => {
    const listings: IListing[] = await fetchListings({ limit: 36 });

    return (
        <main className="custom-container my-8">
            <h1 className="text-3xl font-bold mb-6">Listings</h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-6">
                {listings.map((listing: IListing) => (
                    <PropertyCard key={listing._id.toString()} listing={listing} />
                ))}
            </div>
        </main>
    )
}

export default Page