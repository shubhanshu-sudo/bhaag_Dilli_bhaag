'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmailModal from '@/components/EmailModal';
import { RACE_CONFIG } from '@/config/raceConfig';

export default function RegisterPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRace, setSelectedRace] = useState('5KM');

    // Use centralized race config
    const categories = [
        {
            ...RACE_CONFIG['2KM'],
            status: "Registrations Open",
            raceKey: '2KM'
        },
        {
            ...RACE_CONFIG['5KM'],
            status: "Registrations Open",
            raceKey: '5KM'
        },
        {
            ...RACE_CONFIG['10KM'],
            status: "Registrations Open",
            raceKey: '10KM'
        }
    ];

    const handleRegisterClick = (raceKey: string) => {
        setSelectedRace(raceKey);
        setIsModalOpen(true);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {/* Hero Header */}
                <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-br from-blue-800 to-blue-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute inset-0" style={{
                            backgroundImage: "url('/167272977411.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                            Bhaag Dilli Bhaag 2026
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 font-light">
                            2K · 5K · 10K | 1st March 2026 | Japanese Park, Rohini
                        </p>
                    </div>
                </section>

                {/* Category Selection */}
                <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                                Where Your Run Becomes Hope
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto px-4">
                                Choose your distance and move forward with purpose.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className={`group flex flex-col h-full bg-white rounded-3xl overflow-hidden transition-all duration-500 ease-in-out ${category.featured
                                        ? 'ring-4 ring-blue-800 lg:scale-105 shadow-2xl hover:shadow-blue-800/30 hover:-translate-y-2 z-10'
                                        : 'border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300'
                                        }`}
                                >
                                    {/* Header */}
                                    <div className={`${category.featured ? 'bg-blue-800' : 'bg-white border-b border-gray-100'} p-6 sm:p-8 text-center relative transition-all duration-300`}>
                                        {category.featured && (
                                            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-yellow-400 text-blue-900 text-[10px] font-bold px-2 sm:px-3 py-1 rounded-full tracking-wider shadow-md uppercase transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                                                Most Popular
                                            </div>
                                        )}
                                        <div className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-1 transition-all duration-300 group-hover:scale-105 ${category.featured ? 'text-white' : 'text-blue-900'}`}>{category.distance}</div>
                                        <div className={`text-lg sm:text-xl font-bold uppercase tracking-wide mb-3 ${category.featured ? 'text-blue-100' : 'text-gray-500'}`}>{category.title}</div>

                                        <div className={`inline-block text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300 ${category.featured ? 'bg-blue-700 text-white group-hover:bg-blue-600' : 'bg-green-100 text-green-700 group-hover:bg-green-200'}`}>
                                            {category.status}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 sm:p-8 flex flex-col flex-grow">
                                        {/* Inclusions */}
                                        <div className="mb-6 sm:mb-8 flex-grow">
                                            <h4 className="font-bold text-gray-900 mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-wide opacity-80">Included in Ticket:</h4>
                                            <ul className="space-y-3 sm:space-y-4">
                                                {category.includes.slice(0, 5).map((item, idx) => (
                                                    <li key={idx} className="flex items-start text-sm transition-all duration-200 group-hover:translate-x-1">
                                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0 transition-all duration-300 ${category.featured ? 'bg-blue-100 text-blue-700 group-hover:bg-blue-200' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-gray-700 font-medium">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Price Section - Pushed to Bottom */}
                                        <div className="mt-auto">
                                            <div className="mb-6 text-center pt-6 border-t border-gray-100">
                                                <div className={`text-4xl sm:text-5xl font-black tracking-tight transition-all duration-300 ${category.featured ? 'text-blue-900 group-hover:text-blue-800' : 'text-gray-900 group-hover:text-blue-900'}`}>₹{category.price}</div>
                                                <div className="text-gray-400 text-xs font-medium uppercase tracking-wide mt-2">Registration Fee</div>
                                            </div>

                                            {/* CTA Button - Trigger Modal instead of direct Link */}
                                            <button
                                                onClick={() => handleRegisterClick(category.raceKey)}
                                                className={`w-full ${category.featured
                                                    ? 'bg-blue-900 hover:bg-blue-800 text-white shadow-blue-900/30 hover:shadow-blue-800/50'
                                                    : 'bg-gray-900 hover:bg-blue-900 text-white shadow-gray-900/30 hover:shadow-blue-900/50'
                                                    } font-bold text-lg py-4 px-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group/btn cursor-pointer`}>
                                                BOOK SLOT
                                                <svg className="w-5 h-5 opacity-70 transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                            </button>

                                            {/* Micro Copy */}
                                            <p className="text-center text-sm text-gray-600 mt-4 italic font-light">
                                                Every step you take helps move education forward.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Important Info */}
                        <div className="mt-12 sm:mt-16 lg:mt-20 max-w-4xl mx-auto">
                            <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-10 lg:p-12">
                                <h3 className="font-bold text-gray-900 mb-10 text-2xl sm:text-3xl text-center">Important Information</h3>
                                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 sm:gap-y-12">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-14 h-14 sm:w-20 lg:w-24 sm:h-20 lg:h-24 mr-4 sm:mr-6 lg:mr-8 relative hover:rotate-6 transition-transform duration-300">
                                            <Image
                                                src="/Icon Registration Deadline.png"
                                                alt="Registration Deadline"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-base sm:text-lg lg:text-xl mb-0.5 sm:mb-1">Registration Deadline</h4>
                                            <p className="text-gray-600 text-[13px] sm:text-sm lg:text-base font-light leading-tight sm:leading-snug">Registrations open until 25th Feb 2026 or until slots fill.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-14 h-14 sm:w-20 lg:w-24 sm:h-20 lg:h-24 mr-4 sm:mr-6 lg:mr-8 relative hover:rotate-6 transition-transform duration-300">
                                            <Image
                                                src="/Icon Age Requirement.png"
                                                alt="Age Eligibility"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-base sm:text-lg lg:text-xl mb-0.5 sm:mb-1">Age Eligibility</h4>
                                            <p className="text-gray-600 text-[13px] sm:text-sm lg:text-base font-light leading-tight sm:leading-snug">Participants must meet the minimum age criteria for each category.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-14 h-14 sm:w-20 lg:w-24 sm:h-20 lg:h-24 mr-4 sm:mr-6 lg:mr-8 relative hover:rotate-6 transition-transform duration-300">
                                            <Image
                                                src="/Icon Tshirt size 2.png"
                                                alt="T-Shirt Size"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-base sm:text-lg lg:text-xl mb-0.5 sm:mb-1">T-Shirt Size</h4>
                                            <p className="text-gray-600 text-[13px] sm:text-sm lg:text-base font-light leading-tight sm:leading-snug">Select your preferred size during the registration process.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-14 h-14 sm:w-20 lg:w-24 sm:h-20 lg:h-24 mr-4 sm:mr-6 lg:mr-8 relative hover:rotate-6 transition-transform duration-300">
                                            <Image
                                                src="/Icon RaceDayPhotos.png"
                                                alt="Why This Run Matters"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-base sm:text-lg lg:text-xl mb-0.5 sm:mb-1">Why This Run Matters</h4>
                                            <p className="text-gray-600 text-[13px] sm:text-sm lg:text-base font-light leading-tight sm:leading-snug">Your run directly supports Freedom Through Education projects.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <EmailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                raceKey={selectedRace}
            />
        </>
    );
}
