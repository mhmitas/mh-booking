import React from 'react'
import CategoryHeader from "./CategoryHeader";
import { fetchCategoryBySlug } from "@/lib/actions/adventure.actions";

const Layout = async ({ children, params }: { children: React.ReactNode, params: Promise<{ slug: string }> }) => {
    const { slug } = await params; // adventure
    const category = await fetchCategoryBySlug({ slug })
    return (
        <div>
            <CategoryHeader category={category} />
            {children}
        </div>
    )
}

export default Layout