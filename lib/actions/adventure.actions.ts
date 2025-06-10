"use server"

import { Adventure } from "../database/models/adventure.model"
import { Category } from "../database/models/category.model"
import { connectDB } from "../database/mongoose"
import { IType } from "../types/data_model_types"

export const fetchCategories = async () => {
    try {
        await connectDB()

        const categories = await Category.find({})

        return JSON.parse(JSON.stringify(categories))
    } catch (error: any) {
        throw new Error(error.message || "Failed to fetch categories")
    }
}

export async function fetchCategoryBySlug({ slug }: { slug: string }) {
    try {
        await connectDB()
        const category = await Category.findOne({ slug })
        return JSON.parse(JSON.stringify(category))
    } catch (error: any) {
        throw new Error(error.message || "Failed to fetch category by slug")
    }

}

export async function fetchSubCategoriesByCategorySlug({ slug }: { slug: string }): Promise<{ _id: string, types: IType[] }> {
    try {
        await connectDB()

        const category = await Category.aggregate([
            { $match: { slug: "adventure" } },
            { $project: { _id: 1 } },
            {
                $lookup: {
                    from: "types",
                    localField: "_id",
                    foreignField: "category",
                    as: "types"
                }
            }
        ])

        return JSON.parse(JSON.stringify(category[0]))

    } catch (error: any) {
        throw new Error(error.message || "Failed to fetch programs by category")
    }
}