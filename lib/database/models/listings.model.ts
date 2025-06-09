import { IListing } from "@/lib/types/data_model_types";
import { model, Schema, models, Types } from "mongoose";

const ImagesSchema = new Schema<IListing['images']>({
    thumbnail_url: { type: String, required: true },
    medium_url: { type: String, required: true },
    picture_url: { type: String, required: true },
    xl_picture_url: { type: String, required: true },
});

const LocationSchema = new Schema<IListing['address']['location']>({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
    },
    coordinates: {
        type: [Number],
        required: true,
    },
    is_location_exact: { type: Boolean, required: true },
});

const AddressSchema = new Schema<IListing['address']>({
    street: { type: String, required: true },
    suburb: { type: String, required: true },
    government_area: { type: String, required: true },
    market: { type: String, required: true },
    country: { type: String, required: true },
    country_code: { type: String, required: true },
    location: { type: LocationSchema, required: true },
});

const ReviewScoresSchema = new Schema({
    review_scores_accuracy: Number,
    review_scores_cleanliness: Number,
    review_scores_checkin: Number,
    review_scores_communication: Number,
    review_scores_location: Number,
    review_scores_value: Number,
    review_scores_rating: Number, // Usually 0–100
},);

const ListingSchema = new Schema<IListing>({
    host_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    listing_url: { type: String, required: true },
    name: { type: String, required: true },
    summary: { type: String, required: true },
    space: { type: String, default: '' },
    description: { type: String, required: true },
    neighborhood_overview: { type: String, default: '' },
    notes: { type: String, default: '' },
    transit: { type: String, default: '' },
    access: { type: String, default: '' },
    interaction: { type: String, default: '' },
    house_rules: { type: String, default: '' },
    property_type: { type: String, required: true },
    room_type: { type: String, required: true },
    bed_type: { type: String, required: true },
    minimum_nights: { type: Number, required: true },
    maximum_nights: { type: Number, required: true },
    cancellation_policy: { type: String, required: true },
    last_scraped: { type: Date, required: true },
    calendar_last_scraped: { type: Date, required: true },
    first_review: { type: Date, required: false },
    last_review: { type: Date, required: false },
    accommodates: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    beds: { type: Number, required: true },
    number_of_reviews: { type: Number, required: true },
    bathrooms: { type: Types.Decimal128, required: true },
    amenities: { type: [String], required: true },
    price: { type: Types.Decimal128, required: true },
    extra_people: { type: Types.Decimal128, required: true },
    guests_included: { type: Types.Decimal128, required: true },
    images: { type: ImagesSchema, required: true },
    address: { type: AddressSchema, required: true },
    review_scores: { type: ReviewScoresSchema, required: true },
});

// Export the model
export const Listing = models.Listing || model<IListing>('Listing', ListingSchema);