import { IType } from "@/lib/types/data_model_types"
import React from 'react'

const TypeComponent = ({ type }: { type: IType }) => {
    return (
        <section className="bg-card py-8">
            <div className="custom-container !max-w-7xl grid grid-cols-2 gap-8">
                <div>
                    <h2 className="text-3xl font-bold mb-4">{type.name}</h2>
                    <p className="text-muted-foreground line-clamp-8">{type.intro} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora facilis ex facere commodi quo fugiat quasi ducimus sapiente cupiditate, delectus, ea sunt magni illo. Nihil qui repellendus quia commodi amet.</p>
                </div>
                <div className="aspect-video overflow-hidden rounded">
                    <img className="w-full object-cover" src={type.thumbnail || "/images/placeholder.svg"} alt={type.name} />
                </div>
            </div>
        </section>
    )
}

export default TypeComponent