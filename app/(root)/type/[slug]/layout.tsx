import DynamicHeader from "@/components/shared/DynamicHeader"
import { fetchTypeBySlug } from "@/lib/actions/adventure.actions"
import React from 'react'

const Layout = async ({ children, params }: { children: React.ReactNode, params: Promise<{ slug: string }> }) => {

    const { slug } = await params; // eg hiking
    const type = await fetchTypeBySlug({ slug: slug })

    return (
        <div>
            <DynamicHeader item={type} />
            {children}
        </div>
    )
}

export default Layout