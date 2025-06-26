import { IExperience } from "@/lib/types/data_model_types";
import { models, Schema, model } from "mongoose";

const ExperienceSchema = new Schema<IExperience>(
  {
    type: {
      type: Schema.Types.ObjectId,
      ref: "Type",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [String],
    images: [String],
    price: {
      amount: { type: Number },
      currency: { type: String, default: "USD" },
      unit: { type: String, default: "per_person" },
    },
    duration: {
      type: String,
    },
    availableDates: [String], // ISO Date strings
    timeSlots: [String], // e.g., '08:00', '14:00'
    location: {
      name: { type: String },
      region: { type: String },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: "2dsphere",
      },
    },
    difficulty: {
      type: String, // optional: 'beginner', 'intermediate', etc.
      default: "beginner",
    },
    maxCapacity: {
      type: Number, // optional max number of participants per session
    },
    language: {
      type: String, // optional e.g., 'English'
      default: "English",
    },
    info: {
      type: String, // all the information as a comperehensive guide
      required: true,
    },
  },
  { timestamps: true }
);

export const Experience =
  models.Experience || model("Experience", ExperienceSchema);
