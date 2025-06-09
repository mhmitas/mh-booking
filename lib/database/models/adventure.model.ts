import { models, Schema, model } from "mongoose";

const AdventureSchema = new Schema({
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Type',
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [String],
    images: [String],
    price: {
        amount: { type: Number, required: true },
        currency: { type: String, default: 'USD' },
        unit: { type: String, default: 'per_person' }
    },
    duration: {
        type: String,
        required: true
    },
    availableDates: [String], // ISO Date strings
    timeSlots: [String], // e.g., '08:00', '14:00'
    location: {
        name: { type: String },
        region: { type: String },
        coordinates: {
            type: [Number], // [longitude, latitude]
            index: '2dsphere'
        }
    },
    difficulty: {
        type: String, // optional: 'beginner', 'intermediate', etc.
        default: 'beginner'
    },
    maxCapacity: {
        type: Number // optional max number of participants per session
    },
    language: {
        type: String, // optional e.g., 'English'
        default: 'English'
    },
    moreInfo: {
        type: String
    }
}, { timestamps: true });

export const Adventure = models.Adventure || model('Adventure', AdventureSchema);