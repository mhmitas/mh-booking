"use server"

import { connectDB } from "../database/mongoose"
import { Listing } from "../database/models/listings.model"

export async function fetchListings({
    limit = 12
}: {
    limit?: number
}) {
    try {
        await connectDB()

        const listings = await Listing.find({}).limit(limit)

        console.log({ listings: listings[0] })

        return JSON.parse(JSON.stringify(listings))
    } catch (error: any) {
        console.error(error)
        throw new Error(error?.message || "Failed to fetch movies")
    }
}