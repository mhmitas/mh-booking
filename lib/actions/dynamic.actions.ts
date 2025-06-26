"use server";
import { revalidatePath } from "next/cache";
import { connectDB } from "../database/mongoose";
import { Experience } from "../database/models/adventure.model";
import { ExperienceFormValues } from "../constants";
import { Category, Type } from "../database/models/category.model";

export const createExperience = async (data: ExperienceFormValues) => {
  try {
    await connectDB();

    const experience = new Experience({
      ...data,
      images: data.images || [],
    });

    await experience.save();
    revalidatePath("/experiences"); // Update your path
    return { success: true, message: "Experience created successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create experience" };
  }
};

export const getCategoriesAndTypes = async () => {
  try {
    await connectDB();
    const categories = await Category.find({}).select("name");
    const types = await Type.find({}).select("name");
    return JSON.parse(JSON.stringify({ categories, types }));
  } catch (error) {
    console.error(error);
    return { categories: [], types: [] };
  }
};
