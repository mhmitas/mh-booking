'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function Poster({
    poster,
    title,
    className
}: {
    poster: string
    title?: string
    className?: string
}) {
    const [imgSrc, setImgSrc] = useState(poster)
    const [hasTriedFallback, setHasTriedFallback] = useState(false)

    useEffect(() => {
        if (poster) {
            setImgSrc(poster)
            setHasTriedFallback(false)
        }
    }, [poster])

    const handleImageError = async () => {
        if (!hasTriedFallback) {
            setImgSrc('/images/placeholder.svg')
            setHasTriedFallback(true)
        }
    }

    return (
        <Image
            src={imgSrc}
            alt={title || 'Movie poster'}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
            className={cn(className)}
            placeholder="blur"
            blurDataURL="/images/placeholder.svg"
            onError={handleImageError}
            unoptimized
        />
    )
}