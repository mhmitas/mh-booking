import { IType } from "@/lib/types/data_model_types"
import Image from "next/image"
import Link from "next/link"
import React from 'react'

const TypeComponent = ({ type }: { type: IType }) => {
    return (
        <Link href={`/type/${type.slug}`} className="group">
            <div className="relative">
                <div className="absolute bottom-6 left-6 z-10 bg-white text-black p-4 w-1/2 rounded-xs">
                    <h2 className="text-lg font-semibold">{type.name}</h2>
                    <button className="">Read More</button>
                </div>
                <div className="w-full aspect-[2/3] relative overflow-hidden rounded">
                    <Image
                        src={type.thumbnail || "/images/poster-placeholder.svg"}
                        alt={"Poster isn't found"}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 200px"
                        className="object-cover transition duration-200 w-full rounded scale-105 group-hover:scale-100"
                        placeholder="blur"
                        blurDataURL="/images/poster-placeholder.svg"
                        unoptimized
                    />
                </div>
            </div>
        </Link>
    )
}

export default TypeComponent