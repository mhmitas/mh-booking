import { fetchSubCategoriesByCategorySlug } from "@/lib/actions/adventure.actions"
import { IType } from "@/lib/types/data_model_types"
import React from 'react'
import TypeComponent from "./TypeComponent"

const SubCategoryComponent = async ({ categorySlug }: { categorySlug: string }) => {

    const category = await fetchSubCategoriesByCategorySlug({ slug: categorySlug })
    console.log(category.types)

    return (
        <div className="space-y-20">
            {category.types.map((program: IType) => (
                <TypeComponent key={program._id.toString()} type={program} />
            ))}
        </div>
    )
}

export default SubCategoryComponent