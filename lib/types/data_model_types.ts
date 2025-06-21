import { Types } from "mongoose";

export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  createdAt: Date;
}

export interface IType {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  category: Types.ObjectId;
  thumbnail: string;
  description: string;
  gallery: string[];
}

export interface IExperience {
  _id: Types.ObjectId;
  type: Types.ObjectId; // ObjectId as string
  category: Types.ObjectId; // ObjectId as string
  slug: string;
  title: string;
  description: string;
  tags?: string[];
  images?: string[];
  price: {
    amount: number;
    currency?: string;
    unit?: string;
  };
  duration: string;
  availableDates?: string[]; // ISO Date strings
  timeSlots?: string[];
  location?: {
    name?: string;
    region?: string;
    coordinates?: [number, number]; // [longitude, latitude]
  };
  difficulty?: string;
  maxCapacity?: number;
  language?: string;
  info?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
