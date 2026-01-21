import Link from 'next/link';

export default function Partners() {
    const partners = [
        { name: "Round Table India", type: "Organizer" },
        { name: "Partner 1", type: "Hydration" },
        { name: "Partner 2", type: "Medical" },
        { name: "Partner 3", type: "Apparel" },
    ];

    return (
        <section className="py-12 sm:py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 italic tracking-tight mb-4">
                        Our Partners & Sponsors
                    </h2>
                    <div className="h-1 w-16 bg-blue-100 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {partners.map((partner, index) => (
                        <div key={index} className="flex items-center justify-center p-4 sm:p-6 lg:p-8 border border-gray-100 rounded-2xl grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-lg bg-gray-50/50 hover:bg-white cursor-pointer aspect-[3/2]">
                            {/* Placeholder Logo */}
                            <div className="text-center">
                                <div className="font-bold text-gray-300 text-sm sm:text-base lg:text-lg group-hover:text-blue-900">{partner.name}</div>
                                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{partner.type}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Pre-Footer Card */}
            <div className="px-4 sm:px-6 mt-16 sm:mt-20 lg:mt-24 mb-16 sm:mb-20 lg:mb-24">
                <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl sm:rounded-3xl py-12 px-6 sm:py-14 sm:px-10 lg:py-16 lg:px-16 text-center shadow-2xl">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 sm:mb-5 leading-tight">
                            Be Part of Something That Matters
                        </h2>
                        <p className="text-blue-100 text-sm sm:text-base lg:text-lg mb-4 sm:mb-5 max-w-xl mx-auto font-light leading-relaxed">
                            Join a community of runners who believe that effort, when shared, can create change. When you run Bhaag Dilli Bhaag, you run with purpose, compassion, and hope.
                        </p>
                        <p className="text-white text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-lg mx-auto font-medium leading-relaxed italic">
                            Come run for education.<br />
                            Come run for the future.
                        </p>
                        <Link href="/register">
                            <button className="bg-white text-blue-900 font-bold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 w-full max-w-[280px] sm:max-w-xs mx-auto">
                                Register Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
