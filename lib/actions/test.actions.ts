"use server"

import { Adventure } from "../database/models/adventure.model"
import { Type } from "../database/models/category.model"
import { connectDB } from "../database/mongoose"

export async function test() {
    // run()
}

async function run() {
    try {
        await connectDB()

        const doc = {
            type: "6847049323ce54b476d163a6",
            category: "6846f59fd1b150fa3cf984be",
            slug: "half-day-guided-hike",
            title: "Half-Day Guided Hike",
            description: "This comprehensive half-day guided hike immerses guests in the full spectrum of Blackberry Mountain’s natural beauty. The program combines invigorating climbs to scenic ridge overlooks, tranquil walks through lush hollows, and interpretive stops to discover the mountain’s rich biodiversity and enchanting art installations. Led by knowledgeable guides, the experience is designed for a variety of fitness levels, with opportunities for both challenge and reflection.",
            tags: ["outdoors", "nature", "sunset", "photography", "beginner"],
            images: ["/images/hike1.jpg", "/images/hike2.jpg"],
            price: {
                "amount": 45,
                "currency": "USD",
                "unit": "per person"
            },
            duration: "1–2 hours",
            availableDates: ["2025-06-12", "2025-06-14", "2025-06-15"],
            location: {
                "name": "Kebler Ridge Trail",
                "region": "West Mountain",
                "coordinates": [-105.1234, 38.5678]
            },
            info: `
                ## Half-Day Guided Hike Program at Blackberry Mountain

                **Program Title:**  
                Blackberry Mountain Half-Day Explorer: Ridge Tops, Hollows & Hidden Art

                ---

                ### **Program Overview**

                This comprehensive half-day guided hike immerses guests in the full spectrum of Blackberry Mountain’s natural beauty. The program combines invigorating climbs to scenic ridge overlooks, tranquil walks through lush hollows, and interpretive stops to discover the mountain’s rich biodiversity and enchanting art installations. Led by knowledgeable guides, the experience is designed for a variety of fitness levels, with opportunities for both challenge and reflection.

                **Duration:** 4–5 hours  
                **Distance:** 4–6 miles (customizable for group ability)  
                **Difficulty:** Moderate (options to adjust for group needs)

                ---

                ### **Sample Itinerary**

                **9:00 AM – Welcome & Orientation**
                - Meet at the Hub Trailhead.
                - Introduction to guides, safety briefing, and overview of the hike.
                - Distribution of radios, water, and trail maps.

                **9:15 AM – Ascent to Cat’s Paw Ridge**
                - Begin hike on Roaring Branch Trail, transitioning to Cat’s Paw Trail.
                - Interpretive stops to discuss geology, mountain formation, and local flora.
                - Opportunity to spot wildlife such as deer, wild turkeys, and songbirds.

                **10:00 AM – Cat’s Paw Overlook**
                - Arrive at the main scenic overlook for panoramic views.
                - Group photo and time to enjoy the landscape.
                - Discussion about mountain ecology and conservation.

                **10:30 AM – Art in Nature**
                - Continue along the ridge to discover the “Leo the Enlightened” art installation or similar features.
                - Reflection on the intersection of art and wilderness.

                **11:00 AM – Descent into the Hollows**
                - Transition from ridge top to lower-mountain trails, such as the Double Branch Nature Trail.
                - Explore cool, damp creek bottoms and diverse plant life, including ferns, wildflowers, and mushrooms.
                - Discussion of the importance of riparian habitats and water conservation.

                **12:00 PM – Nature Immersion & Mindfulness Break**
                - Pause at a tranquil creek or glade for a guided mindfulness or nature journaling session.
                - Light snack provided (fruit, trail mix, energy bars).

                **12:30 PM – Return Loop & Final Interpretive Stops**
                - Complete the loop back toward the Hub, taking in any additional scenic viewpoints or hidden gems.
                - Q&A with guides about local history, wildlife, and ongoing conservation efforts.

                **1:00 PM – Program Conclusion**
                - Return to Hub Trailhead.
                - Closing remarks, feedback, and recommendations for further exploration or activities on Blackberry Mountain.

                ---

                ### **Program Features & Inclusions**

                - **Professional, Local Guides:** Experienced, knowledgeable, and certified in first aid and outdoor safety.
                - **Interpretive Education:** In-depth information on geology, ecology, flora, fauna, and cultural history.
                - **Safety & Comfort:** Radios for communication, group pacing, and regular check-ins.
                - **Nature & Art Integration:** Stops at natural and artistic highlights for a holistic experience.
                - **Snacks & Hydration:** Light refreshments provided; guests encouraged to bring water bottles.
                - **Gear Recommendations:** Sturdy hiking shoes, weather-appropriate clothing, sun protection, and small backpack.
                - **Emergency Preparedness:** Guides carry first aid kits and emergency communication devices.

                ---

                ### **Why Choose This Program?**

                - **Comprehensive Experience:** Covers ridge tops, hollows, and unique art installations for a well-rounded adventure.
                - **Flexible & Inclusive:** Route and pace can be adjusted to suit group abilities and interests.
                - **Educational & Memorable:** Gain a deeper understanding of Blackberry Mountain’s natural and cultural treasures.

                ---

                **Note:**  
                This program is designed to maximize guest enjoyment and safety, with flexibility for weather, group size, and fitness levels. Alternative routes or activities may be offered in case of inclement conditions.

                ---

                **Summary Table**

                | Time       | Activity                                   | Highlights                           |
                |------------|--------------------------------------------|--------------------------------------|
                | 9:00 AM    | Welcome & Orientation                      | Safety, overview, gear check         |
                | 9:15 AM    | Ascent to Cat’s Paw Ridge                  | Geology, flora, wildlife             |
                | 10:00 AM   | Cat’s Paw Overlook                         | Panoramic views, group photo         |
                | 10:30 AM   | Art in Nature                              | Art installation, reflection         |
                | 11:00 AM   | Descent into the Hollows                   | Creek, ferns, mushrooms              |
                | 12:00 PM   | Nature Immersion & Mindfulness Break       | Mindfulness, snack                   |
                | 12:30 PM   | Return Loop & Final Interpretive Stops     | Additional viewpoints, Q&A           |
                | 1:00 PM    | Program Conclusion                         | Closing, feedback                    |

                ---

                This half-day guided hike provides a rich, engaging, and safe exploration of Blackberry Mountain’s most captivating features, ensuring guests leave with lasting memories and a deeper appreciation for the natural world.
            `
        }

        const result = await Adventure.create(doc)
        console.log(result)

    } catch (error: any) {
        console.error(error)
    }
}