import Link from 'next/link';

export default function RaceCategories() {
    const categories = [
        {
            distance: "2 KM",
            title: "Fun Run",
            description: "A perfect introduction to running for families, kids, and beginners. Join the fun and feel the energy of the community without the pressure of timing.",
            age: "Open to all ages"
        },
        {
            distance: "5 KM",
            title: "Fitness Run",
            description: "Challenge your limits with our popular timed 5K category. Ideal for recreational runners looking to set a personal benchmark in a supportive environment.",
            age: "12 years & above"
        },
        {
            distance: "10 KM",
            title: "Endurance Run",
            description: "The ultimate test of speed and endurance. A professionally timed race on a flat, fast course designed for serious runners aiming for a Personal Best.",
            age: "16 years & above"
        }
    ];

    return (
        <section className="bg-blue-50/50 py-12 sm:py-16 lg:py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 italic tracking-tight">
                        Race Categories
                    </h2>
                    <div className="h-1 w-20 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 text-center md:text-left relative z-10">
                    {categories.map((category, index) => (
                        <div key={index} className="flex flex-col group h-full">
                            {/* Category Header */}
                            <div className="mb-6 pb-6 border-b border-blue-200">
                                <h3 className="text-4xl sm:text-5xl font-black text-blue-700 mb-2 group-hover:text-blue-600 transition-colors">
                                    {category.distance}
                                </h3>
                                <h4 className="text-lg sm:text-xl font-bold text-gray-900 uppercase tracking-wide text-yellow-600">
                                    {category.title}
                                </h4>
                            </div>

                            {/* Content */}
                            <p className="text-gray-600 leading-relaxed mb-6 font-light text-sm sm:text-base">
                                {category.description}
                            </p>

                            <div className="mt-auto">
                                <p className="text-xs sm:text-sm font-semibold text-blue-900 bg-blue-100/50 inline-block px-3 py-1 rounded-full mb-6">
                                    {category.age}
                                </p>
                                <div className="block">
                                    <Link href="/register">
                                        <span className="text-blue-700 font-bold hover:text-blue-900 flex items-center justify-center md:justify-start gap-2 transition-colors cursor-pointer group-hover:translate-x-1 duration-300">
                                            Register Now
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
