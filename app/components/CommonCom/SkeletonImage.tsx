"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div
            className={`animate-shimmer rounded-md ${className}`}
            role="status"
            aria-label="Loading..."
        />
    );
}

export default function SkeletonImage({ className = "", onLoad, alt = "", ...props }: ImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const hasCustomTransition = /\btransition(-[a-z]+)?\b/.test(className);

    return (
        <>
            {isLoading && <Skeleton className={`absolute inset-0 z-10 ${className}`} />}
            <Image
                alt={alt}
                {...props}
                className={`${!hasCustomTransition ? "transition-opacity duration-500" : ""} ${className} ${isLoading ? "opacity-0" : "opacity-100"}`}
                onLoad={(e) => {
                    setIsLoading(false);
                    if (onLoad) onLoad(e);
                }}
            />
        </>
    );
}
