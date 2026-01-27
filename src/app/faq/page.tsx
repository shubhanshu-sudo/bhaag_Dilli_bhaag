'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const faqs = [
    {
        question: "What is Bhaag Dilli Bhaag?",
        answer: "Bhaag Dilli Bhaag is a charity marathon organised by Delhi Amigos around Table 313. It brings together runners, families, and communities to support the larger cause of Freedom Through Education and create meaningful social impact through participation."
    },
    {
        question: "When and where will the event take place?",
        answer: "The event will be held in Delhi on the announced race date. The exact venue, reporting time, and route details will be shared with registered participants closer to race day."
    },
    {
        question: "What are the race categories?",
        answer: "Bhaag Dilli Bhaag offers multiple categories to welcome runners of all levels:\n• 2 KM Fun Run\n• 5 KM Timed Run\n• 10 KM Timed Run\n\nEach category is designed to encourage participation, fitness, and purpose."
    },
    {
        question: "How can I register for the event?",
        answer: "Registrations can be completed online through the official registration partner. The registration link is available on this website. Payments can be made using cards, net banking, or supported digital wallets."
    },
    {
        question: "What does my registration include?",
        answer: "Your registration includes:\n• Official race bib with timing chip (for timed categories)\n• Race day dry-fit T-shirt\n• Finisher medal\n• Hydration and medical support on route\n• Post-run breakfast\n• E-certificate\n• Professional race day photos"
    },
    {
        question: "Is there a minimum age to participate?",
        answer: "Yes, age criteria apply for safety reasons:\n• 2 KM Fun Run: Open to all ages\n• 5 KM Run: Minimum age as specified in race guidelines\n• 10 KM Run: Minimum age as specified in race guidelines\n\nParticipants under the required age must submit parental consent."
    },
    {
        question: "Can I register offline?",
        answer: "No. Registrations are accepted online only."
    },
    {
        question: "Can I cancel my registration?",
        answer: "Registrations are non-refundable. If you are unable to participate, you may inform the organizers via email. Your contribution will continue to support the cause."
    },
    {
        question: "Where and when do I collect my race bib?",
        answer: "Race bibs will be distributed at the official Expo scheduled before race day. Details regarding the date, time, and location will be shared with registered runners."
    },
    {
        question: "What documents are required for bib collection?",
        answer: "Participants will need:\n• The confirmation email or QR code received after registration\n• A valid government-issued photo ID\n\nAll details will be communicated before the Expo."
    },
    {
        question: "Can someone else collect my bib for me?",
        answer: "Yes. Bib collection by an authorized person is allowed. The representative must carry:\n• A copy of your confirmation or QR code\n• A signed authorization letter\n• Their valid photo ID"
    },
    {
        question: "Will there be medical support on race day?",
        answer: "Yes. Medical teams, first aid stations, and ambulance support will be available throughout the course to ensure runner safety."
    },
    {
        question: "Will there be hydration facilities during the race?",
        answer: "Yes. Water and hydration stations will be placed at strategic points along the route."
    },
    {
        question: "I am a runner with special needs. How can I participate?",
        answer: "We welcome runners of all abilities. Please reach out to the organizing team via the official support email, and we will do our best to assist you."
    },
    {
        question: "How will I receive race day instructions?",
        answer: "All registered participants will receive a detailed race day email closer to the event, including reporting time, route maps, and important guidelines."
    },
    {
        question: "Where can I find my race results?",
        answer: "Provisional results will be published on the official website within a few hours after the race. Final results will be shared after verification."
    },
    {
        question: "How can I support Bhaag Dilli Bhaag beyond running?",
        answer: "You can support the initiative by volunteering, spreading awareness, or partnering with us. Please write to the official support email for more information."
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Hero Header */}
                <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }}></div>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <div className="inline-block mb-4 px-4 py-2 bg-blue-700/50 rounded-full backdrop-blur-sm">
                            <p className="text-blue-100 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                                Got Questions?
                            </p>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg font-light max-w-2xl mx-auto">
                            Everything you need to know about Bhaag Dilli Bhaag 2026
                        </p>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-12 sm:py-16 lg:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="space-y-3 sm:space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
                                >
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-all duration-300 hover:bg-blue-50/50"
                                    >
                                        <div className="flex items-start gap-3 sm:gap-4 flex-1">
                                            {/* Question Number Badge */}
                                            <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${openIndex === index
                                                ? 'bg-blue-600 text-white scale-110'
                                                : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                                                }`}>
                                                {index + 1}
                                            </div>

                                            {/* Question Text */}
                                            <span className={`font-semibold text-sm sm:text-base lg:text-lg pr-2 transition-colors duration-300 ${openIndex === index
                                                ? 'text-blue-900'
                                                : 'text-gray-900 group-hover:text-blue-800'
                                                }`}>
                                                {faq.question}
                                            </span>
                                        </div>

                                        {/* Chevron Icon */}
                                        <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index
                                            ? 'bg-blue-600 rotate-180'
                                            : 'bg-gray-100 group-hover:bg-blue-100'
                                            }`}>
                                            <svg
                                                className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${openIndex === index
                                                    ? 'text-white'
                                                    : 'text-gray-600 group-hover:text-blue-600'
                                                    }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2.5}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </div>
                                    </button>

                                    {/* Answer Section with Smooth Animation */}
                                    <div
                                        className={`transition-all duration-500 ease-in-out ${openIndex === index
                                            ? 'max-h-[500px] opacity-100'
                                            : 'max-h-0 opacity-0'
                                            } overflow-hidden`}
                                    >
                                        <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-2">
                                            <div className="pl-1 sm:pl-14 pr-2">
                                                <div className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line border-l-2 border-blue-200 pl-4 py-1 sm:py-2">
                                                    {faq.answer}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact Section */}
                        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border-l-4 border-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">
                                        Still have questions?
                                    </h3>
                                    <p className="text-gray-700 mb-4 text-sm sm:text-base">
                                        If you couldn't find the answer you were looking for, feel free to reach out to us. We're here to help!
                                    </p>
                                    <a
                                        href="mailto:info@bhaagdillibhaag.in"
                                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Contact Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
