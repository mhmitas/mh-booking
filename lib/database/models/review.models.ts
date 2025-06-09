import { Schema, model, models } from 'mongoose';
import { IReview } from "@/lib/types/data_model_types";

const reviewSchema = new Schema<IReview>({
    comments: {
        type: String,
        required: true,
        trim: true,
        minlength: 10, // Minimum review length
        maxlength: 2000 // Maximum review length
    },
    listing_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Listing' // Reference to listing collection if exists
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    reviewer_name: {
        type: String,
        required: true,
        trim: true
    },
    original_id: {
        type: String,
        required: true,
        unique: true
    },
    reviewer_id: {
        type: String,
        required: true
    },
    host_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Host' // Reference to host collection
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt
    versionKey: false
});

export const Review = models.Review || model<IReview>('Review', reviewSchema);