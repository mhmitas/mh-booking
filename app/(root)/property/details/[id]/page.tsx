import { ArrowLeft, Heart, Share, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { fetchListings } from "@/lib/actions/listing.actions"
import { IListing } from "@/lib/types/data_model_types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PropertyDetailsProps {
    propertyId: string
}

export async function PropertyDetails({ propertyId }: PropertyDetailsProps) {

    const listing: IListing = await fetchListings({});


    if (!listing) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h2>
                <Link href="/">
                    <Button>Return to homepage</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>{listing.name || 'Untitled Listing'}</CardTitle>
                    {listing.summary && <CardDescription>{listing.summary}</CardDescription>}
                </CardHeader>
                {listing.images?.picture_url && (
                    <div className="relative h-64 w-full">
                        <Image
                            src={listing.images.picture_url}
                            alt={listing.name || 'Listing image'}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-b-2xl"
                        />
                    </div>
                )}
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <section>
                            {listing.description && <p className="mb-4">{listing.description}</p>}
                            {listing.space && (
                                <>
                                    <h3 className="text-lg font-semibold">Space</h3>
                                    <p className="mb-4">{listing.space}</p>
                                </>
                            )}
                            {listing.neighborhood_overview && (
                                <>
                                    <h3 className="text-lg font-semibold">Neighborhood Overview</h3>
                                    <p className="mb-4">{listing.neighborhood_overview}</p>
                                </>
                            )}
                        </section>

                        <section>
                            <ul className="space-y-2">
                                {listing.property_type && <li><strong>Property:</strong> {listing.property_type}</li>}
                                {listing.room_type && <li><strong>Room:</strong> {listing.room_type}</li>}
                                {listing.bed_type && <li><strong>Bed:</strong> {listing.bed_type}</li>}
                                {listing.accommodates != null && <li><strong>Accommodates:</strong> {listing.accommodates}</li>}
                                {listing.bedrooms != null && <li><strong>Bedrooms:</strong> {listing.bedrooms}</li>}
                                {listing.beds != null && <li><strong>Beds:</strong> {listing.beds}</li>}
                                {listing.bathrooms != null && <li><strong>Bathrooms:</strong> {listing.bathrooms.toString()}</li>}
                                {listing.minimum_nights != null && <li><strong>Min Nights:</strong> {listing.minimum_nights}</li>}
                                {listing.maximum_nights != null && <li><strong>Max Nights:</strong> {listing.maximum_nights}</li>}
                                {listing.cancellation_policy && <li><strong>Cancellation:</strong> {listing.cancellation_policy}</li>}
                            </ul>
                        </section>
                    </div>

                    {listing.amenities && listing.amenities.length > 0 && (
                        <section className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                            <div className="flex flex-wrap gap-2">
                                {listing.amenities.map((amenity) => (
                                    <Badge key={amenity}>{amenity}</Badge>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Host & Location</h3>
                        <ul className="space-y-1">
                            {listing.host_id && <li><strong>Host ID:</strong> {listing.host_id.toString()}</li>}
                            {listing.address?.street && <li><strong>Address:</strong> {listing.address.street}</li>}
                            {listing.address?.government_area && <li><strong>Area:</strong> {listing.address.government_area}</li>}
                        </ul>
                    </section>

                    <Tabs defaultValue="details" className="mt-6">
                        <TabsList>
                            <TabsTrigger value="details">Details</TabsTrigger>
                            {listing.transit && <TabsTrigger value="transit">Transit</TabsTrigger>}
                            {listing.house_rules && <TabsTrigger value="rules">House Rules</TabsTrigger>}
                        </TabsList>
                        <TabsContent value="details">
                            {/* Already showing description & space above */}
                        </TabsContent>
                        {listing.transit && (
                            <TabsContent value="transit">
                                <p>{listing.transit}</p>
                            </TabsContent>
                        )}
                        {listing.house_rules && (
                            <TabsContent value="rules">
                                <p>{listing.house_rules}</p>
                            </TabsContent>
                        )}
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}