export interface Listing {
    id: string
    title: string
    location: string
    host: string
    dates: string
    price: number
    rating: number
    reviewCount: number
    images: {
        thumbnail_url: string,
        medium_url: string,
        picture_url: string,
        xl_picture_url: string
    }
    isSuperhost: boolean
    isGuestFavorite: boolean
    category: string
    amenities?: string[]
    description?: string
    maxGuests?: number
    bedrooms?: number
    bathrooms?: number
    coordinates?: {
        lat: number
        lng: number
    }
}

export interface ListingFilters {
    priceRange?: [number, number]
    propertyType?: string[]
    amenities?: string[]
    instantBook?: boolean
    superhost?: boolean
    rating?: number
}