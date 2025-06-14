import { fetchAdventureBySlug } from "@/lib/actions/adventure.actions"
import React from 'react'
import { markdownToHtml } from "@/lib/utils"

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = await params

    const adventure = await fetchAdventureBySlug({ slug })
    const html = await markdownToHtml(adventure.info || '')
    return (
        <main className="prose dark:prose-invert custom-container my-20 !max-w-5xl">
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </main>
    )
}

export default page