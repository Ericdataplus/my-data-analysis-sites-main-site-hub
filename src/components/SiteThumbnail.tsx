'use client';

import { useState, useEffect, useRef } from 'react';

interface SiteThumbnailProps {
    siteId: string;
    url: string;
    name: string;
    fallbackIcon: string;
    className?: string;
}

export function SiteThumbnail({ siteId, url, name, fallbackIcon, className = '' }: SiteThumbnailProps) {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const imgRef = useRef<HTMLImageElement>(null);

    // Local file first (fastest), fallback to thum.io API
    const localThumbnail = `/thumbnails/${siteId}.webp`;
    const apiThumbnail = `https://image.thum.io/get/width/600/crop/400/${url}`;
    const thumbnailUrl = imageError ? apiThumbnail : localThumbnail;

    // Check if image is already loaded (fixes race condition where img loads before React hydrates)
    useEffect(() => {
        if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
            setIsLoading(false);
        }
    }, [thumbnailUrl]);

    return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-secondary)] ${className}`}>
            {/* Skeleton fallback - always visible behind image */}
            <div className="absolute inset-0 flex items-center justify-center">
                {isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.03)] to-transparent animate-shimmer"
                        style={{ backgroundSize: '200% 100%' }} />
                )}
                <span className="text-5xl opacity-30 group-hover:scale-110 transition-transform duration-300">
                    {fallbackIcon}
                </span>
            </div>

            {/* Thumbnail image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                ref={imgRef}
                src={thumbnailUrl}
                alt={`${name} preview`}
                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    if (!imageError) {
                        setImageError(true);
                    } else {
                        setIsLoading(false);
                    }
                }}
                loading="eager"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] via-transparent to-transparent opacity-80 pointer-events-none" />
        </div>
    );
}
