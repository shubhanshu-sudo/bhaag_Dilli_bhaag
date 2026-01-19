import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Register - Bhaag Dilli Bhaag 2026',
    description: 'Register for Bhaag Dilli Bhaag 2026. Choose from 2K Fun Run, 5K Fitness Run, or 10K Endurance Run. Registrations now open!',
    keywords: 'register, running event, marathon registration, Delhi marathon, 2K 5K 10K registration',
};

export default function RegisterPage() {
    const categories = [
        {
            distance: "2 KM",
            title: "Fun Run",
            status: "Registrations Open",
            inclusions: [
                "Event T-Shirt",
                "Finisher Medal",
                "Refreshments",
                "E-Certificate"
            ],
            price: "₹499",
            bookingUrl: "https://bookingsite.com/2k"
        },
        {
            distance: "5 KM",
            title: "Fitness Run",
            status: "Registrations Open",
            inclusions: [
                "Event T-Shirt",
                "Finisher Medal",
                "Timed Bib",
                "Refreshments",
                "E-Certificate"
            ],
            price: "₹699",
            bookingUrl: "https://bookingsite.com/5k",
            featured: true
        },
        {
            distance: "10 KM",
            title: "Endurance Run",
            status: "Registrations Open",
            inclusions: [
                "Premium Event T-Shirt",
                "Finisher Medal",
                "Timed Bib",
                "Refreshments & Energy Gels",
                "E-Certificate"
            ],
            price: "₹999",
            bookingUrl: "https://bookingsite.com/10k"
        }
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {/* Hero Header */}
                <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-800 to-blue-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=2074')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 text-center text-white">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            Bhaag Dilli Bhaag 2026
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 font-light">
                            2K · 5K · 10K | 1st March 2026 | Japanese Park, Rohini
                        </p>
                    </div>
                </section>

                {/* Category Selection */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Choose Your <span className="text-blue-800">Challenge</span>
                            </h2>
                            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                                Select your race category and secure your spot today
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col h-full bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${category.featured ? 'ring-4 ring-blue-800 lg:scale-105 z-10' : 'border border-gray-100'
                                        }`}
                                >
                                    {/* Header */}
                                    <div className={`${category.featured ? 'bg-blue-800' : 'bg-white border-b border-gray-100'} p-8 text-center relative`}>
                                        {category.featured && (
                                            <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 text-[10px] font-bold px-3 py-1 rounded-full tracking-wider shadow-sm uppercase">
                                                Most Popular
                                            </div>
                                        )}
                                        <div className={`text-6xl font-black mb-1 ${category.featured ? 'text-white' : 'text-blue-900'}`}>{category.distance}</div>
                                        <div className={`text-xl font-bold uppercase tracking-wide mb-3 ${category.featured ? 'text-blue-100' : 'text-gray-500'}`}>{category.title}</div>

                                        <div className={`inline-block text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider ${category.featured ? 'bg-blue-700 text-white' : 'bg-green-100 text-green-700'}`}>
                                            {category.status}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        {/* Inclusions */}
                                        <div className="mb-8 flex-grow">
                                            <h4 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wide opacity-80">Included in Ticket:</h4>
                                            <ul className="space-y-4">
                                                {category.inclusions.map((item, idx) => (
                                                    <li key={idx} className="flex items-start text-sm">
                                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${category.featured ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
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
                                                <div className="text-5xl font-black text-gray-900 tracking-tight">{category.price}</div>
                                                <div className="text-gray-400 text-xs font-medium uppercase tracking-wide mt-2">Registration Fee</div>
                                            </div>

                                            {/* CTA Button */}
                                            <a href={category.bookingUrl} target="_blank" rel="noopener noreferrer" className="block">
                                                <button className={`w-full ${category.featured
                                                    ? 'bg-blue-900 hover:bg-blue-800 text-white shadow-blue-900/30'
                                                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                                                    } font-bold text-lg py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2`}>
                                                    BOOK SLOT
                                                    <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Important Info */}
                        <div className="mt-20 max-w-4xl mx-auto">
                            <div className="bg-white rounded-3xl shadow-lg p-10">
                                <h3 className="font-bold text-gray-900 mb-6 text-2xl text-center">Important Information</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Registration Deadline</h4>
                                            <p className="text-gray-600 text-sm font-light">25th February 2026 or until slots fill up</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Age Requirement</h4>
                                            <p className="text-gray-600 text-sm font-light">Minimum 12 years for all categories</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">T-Shirt Size</h4>
                                            <p className="text-gray-600 text-sm font-light">Select your size during registration</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Social Impact</h4>
                                            <p className="text-gray-600 text-sm font-light">Proceeds support Freedom Through Education</p>
                                        </div>
                                    </div>
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
