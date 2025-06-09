"use client"

import type React from "react"
import Link from "next/link"
import { IListing } from "@/lib/types/data_model_types"
import Poster from "../Poster"
import { calculateAverageRating } from "@/lib/utils"
import { FaStar } from "react-icons/fa"

interface PropertyCardProps {
    listing: IListing
}

export function PropertyCard({ listing }: PropertyCardProps) {
    console.log({ price: listing.price })
    console.log({ _id: listing._id })
    return (
        <div className="border-0 shadow-none group cursor-pointer">
            <div className="p-0">
                <Link href={`/property/details/${listing._id}`}>
                    <div className="relative">
                        {/* Image Carousel */}
                        <div className="relative overflow-hidden rounded-lg aspect-square">
                            <Poster poster={listing.images.picture_url} title={listing.name} />
                        </div>
                    </div>
                    {/* Property Details */}
                    <div className="pt-1.5 space-y-0.5">
                        <div className="">
                            <h3 className="font-medium truncate">{listing.name}</h3>
                        </div>
                        <div className="flex text-xs font-medium gap-x-2 flex-wrap items-center">
                            <div className="text-muted-foreground">
                                <span>$</span>
                                <span>{listing.price?.$numberDecimal.toString()}</span>
                                <span>Per Night</span>
                            </div>
                            <div className="ml-1 text-muted-foreground flex items-center gap-1">
                                <FaStar />
                                <span>{calculateAverageRating(listing.review_scores)}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div >
    )
}