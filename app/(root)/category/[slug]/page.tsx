import React from "react";
import { fetchTypesByCategorySlug } from "@/lib/actions/adventure.actions";
import TypeComponent from "./TypeComponent";
import { IType } from "@/lib/types/data_model_types";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const types = await fetchTypesByCategorySlug({ slug });

  return (
    <div className="my-40">
      <div className="grid grid-cols-3 gap-10 custom-container !max-w-7xl">
        {[...types].map((item: { _id: string; type: IType }) => (
          <TypeComponent key={item.type._id.toString()} type={item.type} />
        ))}
      </div>
    </div>
  );
};

export default page;
