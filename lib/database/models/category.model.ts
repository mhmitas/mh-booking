// Mongoose schema for categories and types (category.js)
import { ICategory, IType } from "@/lib/types/data_model_types";
import { models, Schema, model } from 'mongoose';

// Category schema
const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ['Adventure', 'Stay', 'Culinary', 'Wellness', 'Holidays', 'Seasons']
    },
    title: { type: String, required: true, maxLength: 100, minLength: 30 },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    thumbnail: { type: String }, // URL to thumbnail image
    createdAt: { type: Date, default: Date.now }
});

// Type schema (e.g., 'hiking', 'biking', etc.)
const TypeSchema = new Schema<IType>({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ["Hiking", "Biking", "Art studio", "Arbor adventure", "Climbing", "Fly fishing", "Lake life", "Lexus off-road", "Trail running", "Smoky mountain sports club", "Paddle sports", "Horseback riding", "Family adventure"]
    },
    slug: { type: String, required: true, unique: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    thumbnail: { type: String }, // URL to thumbnail image
    intro: { type: String }, // Short introduction or caption
    gallery: [String] // Array of image URLs
}, { timestamps: true });

export const Category = models.Category || model('Category', CategorySchema);
export const Type = models.Type || model('Type', TypeSchema);