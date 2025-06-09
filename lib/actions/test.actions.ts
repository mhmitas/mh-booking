"use server"

import { Category } from "../database/models/category.model"
import { connectDB } from "../database/mongoose"

export async function test() {
    // run()
}

async function run() {
    try {
        await connectDB()

        const doc = {
            name: "Stay",
            slug: "stay",
            title: "Awake to a New Masterpiece Every Morning",
            description: "We are so pleased to welcome you to Blackberry Mountain. As always, the wellbeing of our guests and our team is our top priority. If you have any questions or concerns, please let our team know. Thank you and enjoy your stay."
        }
        const result = await Category.create(doc)
        console.log(result)

    } catch (error: any) {
        console.error(error)
    }
}