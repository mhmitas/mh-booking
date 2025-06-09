import { Types } from "mongoose";

export interface IReview {
    _id: Types.ObjectId;
    comments: string;
    listing_id: Types.ObjectId;
    date: Date;
    reviewer_name: string;
    original_id: string;
    reviewer_id: string;
    host_id: Types.ObjectId;
}

export interface IHost {
    _id: Types.ObjectId;
    host_name: string;
    original_host_id: string;
    host_location: string;
    host_is_superhost: boolean;
    host_identity_verified: boolean;
    host_has_profile_pic: boolean;
    host_response_rate?: number;
    host_listings_count?: number;
    host_neighbourhood?: string;
    host_url?: string;
    host_about?: string;
    host_thumbnail_url?: string;
    host_picture_url?: string;
    host_response_time?: string;
    host_total_listings_count?: number;
    host_verifications?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}


interface IImages {
    thumbnail_url: string;
    medium_url: string;
    picture_url: string;
    xl_picture_url: string;
}

interface ILocation {
    type: 'Point';
    coordinates: [number, number];  // [lng, lat]
    is_location_exact: boolean;
}

interface IAddress {
    street: string;
    suburb: string;
    government_area: string;
    market: string;
    country: string;
    country_code: string;
    location: ILocation;
}

interface IReviewScores {
    review_scores_accuracy: number;
    review_scores_cleanliness: number;
    review_scores_checkin: number;
    review_scores_communication: number;
    review_scores_location: number;
    review_scores_value: number;
    review_scores_rating: number; // 0–100, represents 0.0 to 5.0 stars
}

export interface IListing {
    _id: Types.ObjectId;
    host_id: Types.ObjectId;
    listing_url: string;
    name: string;
    summary: string;
    space: string;
    description: string;
    neighborhood_overview: string;
    notes: string;
    transit: string;
    access: string;
    interaction: string;
    house_rules: string;
    property_type: string;
    room_type: string;
    bed_type: string;
    minimum_nights: number;               // stored as string in Mongo, but semantically a number
    maximum_nights: number;
    cancellation_policy: string;
    last_scraped: Date;
    calendar_last_scraped: Date;
    first_review: Date;
    last_review: Date;
    accommodates: number;
    bedrooms: number;
    beds: number;
    number_of_reviews: number;
    bathrooms: Types.Decimal128;     // e.g. "1.5"
    amenities: string[];
    price: { $numberDecimal: string };     // e.g. "40.00"
    extra_people: Types.Decimal128;     // e.g. "0.00"
    guests_included: Types.Decimal128;     // e.g. "1"
    images: IImages;
    address: IAddress;
    review_scores: IReviewScores;
}
