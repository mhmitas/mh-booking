import React from 'react'
import SubCategoryComponent from "./SubCategoryComponent";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <div className="my-40">
      <SubCategoryComponent categorySlug={slug} />
    </div>
  )
}

export default page