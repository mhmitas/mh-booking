"use server";

import { Experience } from "../database/models/adventure.model";
import { Category, Type } from "../database/models/category.model";
import { connectDB } from "../database/mongoose";
import { IType } from "../types/data_model_types";

export const fetchCategories = async () => {
  try {
    await connectDB();

    const categories = await Category.find({});

    return JSON.parse(JSON.stringify(categories));
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch categories");
  }
};

export async function fetchCategoryBySlug({ slug }: { slug: string }) {
  try {
    await connectDB();
    const category = await Category.findOne({ slug });
    return JSON.parse(JSON.stringify(category));
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch category by slug");
  }
}

type returnProps = {
  _id: string;
  type: IType;
};

export async function fetchTypesByCategorySlug({
  slug,
}: {
  slug: string;
}): Promise<returnProps[]> {
  try {
    await connectDB();

    const category = await Category.aggregate([
      { $match: { slug } },
      { $project: { _id: 1 } },
      {
        $lookup: {
          from: "types",
          localField: "_id",
          foreignField: "category",
          as: "type",
        },
      },
      { $unwind: "$type" },
      {
        $project: {
          "type._id": 1,
          "type.name": 1,
          "type.slug": 1,
          "type.thumbnail": 1,
        },
      },
    ]);

    return JSON.parse(JSON.stringify(category));
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch programs by category");
  }
}

export async function fetchTypeBySlug({ slug }: { slug: string }) {
  try {
    await connectDB();
    const type = await Type.findOne({ slug }).select(
      "name slug thumbnail intro"
    );
    return JSON.parse(JSON.stringify(type));
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch type by slug");
  }
}

export async function fetchAdventuresByTypeSlug({ slug }: { slug: string }) {
  try {
    await connectDB();
    const adventures = await Type.aggregate([
      { $match: { slug } },
      { $project: { _id: 1 } },
      {
        $lookup: {
          from: "experiences",
          localField: "_id",
          foreignField: "type",
          as: "experience",
        },
      },
      { $unwind: "$experience" },
      {
        $project: {
          "experience._id": 1,
          "experience.title": 1,
          "experience.slug": 1,
          "experience.description": 1,
        },
      },
    ]);
    return JSON.parse(JSON.stringify(adventures));
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch adventures by type slug");
  }
}

export async function fetchAdventureBySlug({ slug }: { slug: string }) {
  try {
    await connectDB();
    const adventure = await Experience.findOne({ slug });
    return adventure;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch adventure by slug");
  }
}
