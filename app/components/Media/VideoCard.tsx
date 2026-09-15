"use client";

import { useState } from "react";

import { Play, Instagram, Facebook, Video } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { sendGAEvent } from '@next/third-parties/google';
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const getAspectRatio = (type: "video" | "short" | "podcast" | "webinar") => {
    return type === "short" ? "aspect-[9/16]" : "aspect-video";
};

import SkeletonImage, { Skeleton } from "../CommonCom/SkeletonImage";

// ... (keep your existing getEmbedUrl function here) ...
const getEmbedUrl = (url: string, platform?: string) => {
    if (!url) return "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        let id = "";
        if (url.includes("shorts/")) id = url.split("shorts/")[1].split("?")[0];
        else if (url.includes("live/")) id = url.split("live/")[1].split("?")[0];
        else if (url.includes("youtu.be/")) id = url.split("youtu.be/")[1].split("?")[0];
        else if (url.includes("v=")) id = url.split("v=")[1].split("&")[0];
        return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (platform === 'facebook' || url.includes('facebook.com')) {
        if (url.includes('plugins/video.php')) return url;
        const encodedHref = encodeURIComponent(url);
        return `https://www.facebook.com/plugins/video.php?href=${encodedHref}&show_text=false&width=450&height=800&autoplay=true`;
    }
    if (platform === 'instagram' || url.includes('instagram.com')) {
        if (url.includes('/embed')) return url;
        let cleanUrl = url.split('?')[0];
        if (!cleanUrl.endsWith('/')) cleanUrl += '/';
        return `${cleanUrl}embed/`;
    }
    return url;
};

interface VideoCardProps {
    title: string | React.ReactNode;
    videoUrl: string;
    thumbnail?: SanityImageSource;
    publishedAt: string;
    platform?: string;
    type: "video" | "short" | "podcast" | "webinar";
    transcriptUrl?: string;
}

export default function VideoCard({ title, videoUrl, thumbnail, publishedAt, platform, type, transcriptUrl }: VideoCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isIframeLoading, setIsIframeLoading] = useState(true);

    // 1. Try to get Sanity Image
    let posterUrl = thumbnail ? urlFor(thumbnail).url() : null;

    // 2. Fallback: Try to generate YouTube thumbnail if Sanity image is missing
    if (!posterUrl && (videoUrl.includes("youtube") || videoUrl.includes("youtu.be"))) {
        let videoId = "";
        if (videoUrl.includes("shorts/")) videoId = videoUrl.split("shorts/")[1].split("?")[0];
        else if (videoUrl.includes("live/")) videoId = videoUrl.split("live/")[1].split("?")[0];
        else if (videoUrl.includes("youtu.be/")) videoId = videoUrl.split("youtu.be/")[1].split("?")[0];
        else if (videoUrl.includes("v=")) videoId = videoUrl.split("v=")[1].split("&")[0];

        if (videoId) posterUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    // 3. Helper to render a fallback icon if NO image is found
    const getPlatformIcon = () => {
        const p = platform?.toLowerCase() || "";
        if (p.includes("facebook")) return <Facebook className="w-12 h-12 text-white/20" />;
        if (p.includes("instagram")) return <Instagram className="w-12 h-12 text-white/20" />;
        return <Video className="w-12 h-12 text-white/20" />;
    }

    const containerClasses = `bg-blue border border-white/10 rounded-lg overflow-hidden hover:border-red/30 transition-all duration-300 flex flex-col h-full ${type === 'short' ? 'max-w-[320px] mx-auto w-full' : ''}`;

    return (
        <div className={containerClasses}>
            <div className={`relative w-full ${getAspectRatio(type)} overflow-hidden`}>
                {!isPlaying ? (
                    <button
                        onClick={() => {
                            setIsPlaying(true);
                            sendGAEvent('event', 'video_play', {
                                video_title: typeof title === 'string' ? title : 'Untitled',
                                video_type: type,
                                video_platform: platform || 'direct'
                            });
                        }}
                        className="absolute inset-0 w-full h-full group/play cursor-pointer z-10 flex flex-col items-center justify-center"
                        aria-label="Play Video"
                    >
                        {posterUrl ? (
                            <SkeletonImage
                                src={posterUrl}
                                alt={typeof title === 'string' ? title : "Video Thumbnail"}
                                fill
                                className="object-cover opacity-80 group-hover/play:opacity-100 transition-opacity"
                                unoptimized
                            />
                        ) : (
                            // --- CLEAN FALLBACK (No Image Found) ---
                            <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent flex items-center justify-center">
                                {/* Large background icon watermark */}
                                <div className="scale-150 opacity-50">{getPlatformIcon()}</div>
                            </div>
                        )}

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-red/90 rounded-full flex items-center justify-center group-hover/play:scale-110 transition-transform shadow-lg shadow-red/20 backdrop-blur-sm">
                                <Play className="w-5 h-5 text-white fill-white ml-1" />
                            </div>
                        </div>
                    </button>
                ) : (
                    <>
                        {isIframeLoading && <Skeleton className="absolute inset-0 w-full h-full z-20" />}
                        <iframe
                            src={getEmbedUrl(videoUrl, platform)}
                            title={typeof title === 'string' ? title : "Video Player"}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isIframeLoading ? 'opacity-0' : 'opacity-100'}`}
                            onLoad={() => setIsIframeLoading(false)}
                        />
                    </>
                )}
            </div>

            <div className="p-5 flex flex-col grow relative bg-blue">
                <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-linear-to-br from-red to-red/60 border border-white/10 shadow-xs rounded text-[10px] text-white font-oswald tracking-widest uppercase font-bold">
                        {platform || type}
                    </span>
                    <span className="text-[10px] text-white/40 font-oswald uppercase tracking-widest">
                        {new Date(publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                </div>
                <h3 className="text-xl font-bebas text-white leading-tight transition-colors line-clamp-3">
                    {title}
                </h3>
                {transcriptUrl && (
                    <a 
                        href={transcriptUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-6 w-full relative z-20"
                    >
                        <button className="w-full group relative bg-transparent border border-white/70 text-white py-3 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-white isolate cursor-pointer">
                            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                                READ TRANSCRIPT
                            </span>
                            <div className="absolute inset-0 bg-white transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                        </button>
                    </a>
                )}
            </div>
        </div>
    );
}