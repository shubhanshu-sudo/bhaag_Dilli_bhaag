'use client';

import { useState } from 'react';
import EmailModal from './EmailModal';

export default function RaceCategories() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRace, setSelectedRace] = useState('5KM');

    const categories = [
        {
            distance: "2 KM",
            raceKey: "2KM",
            title: "Fun Run",
            description: "A joyful, untimed run for families and first-time runners. Run together, smile together, and be part of a community that moves for education and hope.",
            age: "10 years and above"
        },
        {
            distance: "5 KM",
            raceKey: "5KM",
            title: "Fitness Run",
            description: "A timed run for those ready to challenge themselves while running for a meaningful cause. Push your limits and support Table 311's  Freedom Through Education mission.",
            age: "10 years and above"
        },
        {
            distance: "10 KM",
            raceKey: "10KM",
            title: "Endurance Run",
            description: "A professionally timed run for experienced runners who believe in discipline, strength, and purpose. Test your endurance while standing for a future built on education.",
            age: "15 years and above"
        }
    ];

    const handleRegisterClick = (raceKey: string) => {
        setSelectedRace(raceKey);
        setIsModalOpen(true);
    };

    return (
        <>
            <section className="bg-blue-50/50 py-12 sm:py-16 lg:py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 italic tracking-tight">
                            Race Categories
                        </h2>
                        <div className="h-1 w-20 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-12 relative z-10">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="
                                    flex flex-col group h-full
                                    bg-white md:bg-transparent 
                                    p-6 md:p-0 
                                    rounded-2xl md:rounded-none 
                                    shadow-sm md:shadow-none 
                                    border border-blue-50 md:border-0
                                "
                            >
                                {/* Category Header */}
                                <div className="mb-4 md:mb-6 pb-4 md:pb-6 border-b border-blue-100 md:border-blue-200">
                                    <h3 className="text-3xl sm:text-5xl font-black text-blue-700 mb-1 md:mb-2 group-hover:text-blue-600 transition-colors">
                                        {category.distance}
                                    </h3>
                                    <h4 className="text-sm sm:text-xl font-bold text-gray-900 uppercase tracking-widest text-yellow-600">
                                        {category.title}
                                    </h4>
                                </div>

                                {/* Content */}
                                <p className="text-gray-600 leading-relaxed mb-6 font-light text-sm sm:text-base line-clamp-3 md:line-clamp-none">
                                    {category.description}
                                </p>

                                <div className="mt-auto">
                                    <p className="text-[10px] sm:text-sm font-semibold text-blue-900 bg-blue-50 md:bg-blue-100/50 inline-block px-3 py-1 rounded-full mb-6">
                                        Eligibility: {category.age}
                                    </p>
                                    <div className="block">
                                        <button
                                            onClick={() => handleRegisterClick(category.raceKey)}
                                            className="
                                                flex items-center justify-center md:justify-start gap-2 
                                                w-full md:w-auto
                                                bg-blue-700 md:bg-transparent
                                                text-white md:text-blue-700 
                                                font-bold 
                                                py-3.5 md:py-0
                                                rounded-xl md:rounded-none
                                                shadow-md md:shadow-none
                                                hover:bg-blue-800 md:hover:bg-transparent
                                                hover:text-white md:hover:text-blue-900
                                                transition-all duration-300 
                                                cursor-pointer 
                                                md:group-hover:translate-x-1
                                            "
                                        >
                                            Register Now
                                            <svg className="w-5 h-5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <EmailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                raceKey={selectedRace}
            />
        </>
    );
}
