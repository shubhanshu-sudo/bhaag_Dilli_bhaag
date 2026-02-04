'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function VideoTeaser() {
    const [isPlaying, setIsPlaying] = useState(true); // Auto-play on load
    const videoId = 'zwDwAPOOHkE'; // YouTube video ID
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    const handlePlayClick = () => {
        setIsPlaying(true);
    };

    const handleCloseVideo = () => {
        setIsPlaying(false);
    };

    return (
        <section className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-14 lg:mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-100/80 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full mb-4 sm:mb-6">
                        <svg className="w-5 h-5 text-red-600 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        <span className="text-blue-900 font-bold text-xs sm:text-sm uppercase tracking-wider">Watch Our Story</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4">
                        Experience the <span className="text-blue-900">Energy</span>
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto font-light">
                        Get a glimpse of what makes Bhaag Dilli Bhaag more than just a run
                    </p>
                </div>

                {/* Video Container */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Video Thumbnail with Play Button */}
                    {!isPlaying ? (
                        <div
                            className="relative group cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl"
                            onClick={handlePlayClick}
                        >
                            {/* Thumbnail Image */}
                            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-700">
                                <Image
                                    src={thumbnailUrl}
                                    alt="Bhaag Dilli Bhaag Event Teaser"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 transition-all duration-500"></div>

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        {/* Pulsing Ring */}
                                        <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                                        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>

                                        {/* Play Button Circle */}
                                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                                            <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Info Bar */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                                    <div className="flex items-center gap-3 text-white">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm sm:text-base lg:text-lg">Official Event Teaser</p>
                                            <p className="text-xs sm:text-sm text-white/80">Bhaag Dilli Bhaag 2026</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Click to Play Text */}
                                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                                    <div className="bg-black/50 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
                                        <p className="text-white text-xs sm:text-sm font-medium flex items-center gap-2">
                                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                            Click to Watch
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* YouTube Embed Player */
                        <div className="relative">
                            {/* Close Button - Outside the video container */}
                            <button
                                onClick={handleCloseVideo}
                                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-2xl flex items-center justify-center hover:bg-red-50 transition-all hover:scale-110 z-50 border-2 border-gray-200"
                                aria-label="Close video"
                            >
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Video Container */}
                            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                                <div className="relative aspect-video">
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`}
                                        title="Bhaag Dilli Bhaag Event Teaser"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl -z-10"></div>
                    <div className="absolute -top-4 -right-4 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl -z-10"></div>
                </div>

                {/* Call to Action Below Video */}
                <div className="text-center mt-10 sm:mt-12 lg:mt-16">
                    <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                        Ready to be part of this incredible journey?
                    </p>
                    <a
                        href="/register"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                        <span>Register for the Event</span>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
