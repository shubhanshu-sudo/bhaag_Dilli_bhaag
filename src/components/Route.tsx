'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const routes = [
    {
        id: '2km',
        label: '2 KM',
        distance: '2.0 Kilometers',
        description: 'Perfect for families and fun runners. A quick loop around the scenic Japanese Park.',
        // Replace with actual route map images when available
        image: '/Marathon.jpg',
        color: '#1e3a8a'
    },
    {
        id: '5km',
        label: '5 KM',
        distance: '5.0 Kilometers',
        description: 'The fitness favorite. Two loops of the park with flat paths to push your pace.',
        image: '/hero-marathon.jpg',
        color: '#1e3a8a'
    },
    {
        id: '10km',
        label: '10 KM',
        distance: '10.0 Kilometers',
        description: 'For serious runners. A rewarding multi-lap course to test your endurance.',
        image: '/167272977411.jpg',
        color: '#1e3a8a'
    }
];

export default function Route() {
    const [activeTab, setActiveTab] = useState(routes[1]); // Default to 5KM
    const [isChanging, setIsChanging] = useState(false);

    const handleTabChange = (route: typeof routes[0]) => {
        if (route.id === activeTab.id) return;
        setIsChanging(true);

        // Brief timeout to allow for smooth fade out/in transition
        setTimeout(() => {
            setActiveTab(route);
            setIsChanging(false);
        }, 300);
    };

    return (
        <section id="route" className="py-12 sm:py-16 lg:py-24 bg-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50 -ml-32 -mb-32"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Content Left */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <div className="inline-block px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-sm font-bold tracking-wide mb-6 w-fit">
                            THE COURSE
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-indigo-950 italic tracking-tight mb-6 leading-[1.1]">
                            The Route
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed mb-6">
                            Set within Japanese Park, Rohini, the course offers a calm, green, and runner-friendly environment. Wide paths and flat terrain make it ideal for both new runners and those chasing personal milestones.
                        </p>
                        <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8 italic border-l-4 border-yellow-400 pl-4">
                            Every step you take here is part of a larger journey beyond the park.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                </div>
                                <h4 className="font-bold text-gray-900 text-lg mb-1">Flat & Fast</h4>
                                <p className="text-sm text-gray-500 font-light leading-snug">Smooth terrain optimized for Personal Bests.</p>
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <h4 className="font-bold text-gray-900 text-lg mb-1">Greenery</h4>
                                <p className="text-sm text-gray-500 font-light leading-snug">Run through the lush landscape of Japanese Park.</p>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Map Right */}
                    <div className="lg:col-span-7 h-full">
                        <div className="bg-white p-2 sm:p-3 rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden h-full flex flex-col">
                            {/* Tabs Navigation */}
                            <div className="p-4 sm:p-6 bg-gray-50 rounded-t-[2.2rem] border-b border-gray-100">
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
                                    {routes.map((route) => (
                                        <button
                                            key={route.id}
                                            onClick={() => handleTabChange(route)}
                                            className={`
                                                relative px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest transition-all duration-300
                                                ${activeTab.id === route.id
                                                    ? 'bg-indigo-950 text-white shadow-xl scale-105'
                                                    : 'bg-white text-gray-400 hover:bg-gray-100 hover:text-indigo-950 shadow-sm'}
                                            `}
                                        >
                                            {route.label}
                                            {activeTab.id === route.id && (
                                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Map Image Container */}
                            <div className="p-4 sm:p-8 flex-grow">
                                <div className={`
                                    relative aspect-[16/10] bg-indigo-50/30 rounded-3xl overflow-hidden border border-gray-100
                                    transition-all duration-500 ease-out shadow-inner
                                    ${isChanging ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}
                                `}>
                                    {/* Subtle Loader */}
                                    {isChanging && (
                                        <div className="absolute inset-0 flex items-center justify-center z-20">
                                            <div className="w-10 h-10 border-4 border-indigo-950/10 border-t-indigo-950 rounded-full animate-spin"></div>
                                        </div>
                                    )}

                                    {/* Map Image */}
                                    <div className="absolute inset-0 z-10">
                                        <Image
                                            src={activeTab.image}
                                            alt={`Route Map for ${activeTab.label}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 800px"
                                        />
                                        {/* Overlay shading for depth */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                    </div>

                                    {/* Distance Badge */}
                                    <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20">
                                        <div className="bg-white/90 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-2xl shadow-2xl border border-white/20">
                                            <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-500 font-black mb-0.5">Total distance</div>
                                            <div className="text-xl sm:text-3xl font-black text-indigo-950 italic leading-none">{activeTab.distance}</div>
                                        </div>
                                    </div>

                                    {/* Description Overlay - Small info box */}
                                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 max-w-[150px] sm:max-w-[200px] hidden sm:block">
                                        <div className="bg-indigo-950/20 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg">
                                            <p className="text-[11px] sm:text-xs text-white font-medium leading-relaxed">
                                                {activeTab.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Polish Labels & Info */}
                                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-indigo-950 shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        </div>
                                        <div>
                                            <div className="text-base sm:text-lg font-black text-indigo-950 uppercase tracking-tighter">Rohini Sector 10</div>
                                            <div className="text-[10px] sm:text-xs text-indigo-600 font-bold uppercase tracking-[0.3em] leading-none">Japanese Park, New Delhi</div>
                                        </div>
                                    </div>

                                    <Link href="/register" className="w-full sm:w-auto">
                                        <button className="w-full sm:w-auto bg-indigo-50 hover:bg-indigo-100 text-indigo-950 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group/btn">
                                            View Detailed PDF
                                            <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
