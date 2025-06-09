import { IHost } from "@/lib/types/data_model_types";
import { model, models, Schema } from "mongoose";

const hostSchema = new Schema<IHost>({
    host_name: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
    original_host_id: { type: String, required: true, unique: true },
    host_location: { type: String, required: true },
    host_is_superhost: { type: Boolean, required: true, default: false },
    host_identity_verified: { type: Boolean, required: true, default: false },
    host_has_profile_pic: { type: Boolean, required: true, default: false },
    host_response_rate: { type: Number, default: 0 },
    host_listings_count: { type: Number, default: 0 },
    // Optional fields
    host_neighbourhood: { type: String },
    host_url: { type: String },
    host_about: { type: String },
    host_thumbnail_url: { type: String },
    host_picture_url: { type: String },
    host_response_time: { type: String, enum: ['within an hour', 'within a few hours', 'within a day', 'a few days or more', 'N/A'], default: 'N/A' },
    host_total_listings_count: { type: Number },
    host_verifications: { type: [String], default: [] }
}, {
    timestamps: true
});

// Export the model
export const Host = models.Host || model<IHost>('Host', hostSchema);