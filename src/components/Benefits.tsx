export default function Benefits() {
    const benefits = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            ),
            title: "Finisher Medal",
            description: "A medal to mark your achievement"
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
            ),
            title: "Goodie Bag",
            description: "Curated with care, just like the run itself"
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ),
            title: "Hydration Support",
            description: "Hydration points on route"
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            ),
            title: "Medical Support",
            description: "First aid and ambulance support"
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ),
            title: "Timing Chip (RFID)",
            description: "Accurate RFID timing (10 KM only)"
        }
    ];

    return (
        <section className="py-12 sm:py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 italic tracking-tight mb-4">
                        Together, We Take Responsibility.
                    </h2>
                    <p className="text-gray-600 font-light text-base sm:text-lg mb-2">
                        A collective run inspired by the belief that access to education can change everything.
                    </p>
                    <p className="text-gray-600 font-light text-sm sm:text-base mt-6 mb-8">
                        Every runner is taken care of, from the start line to long after you cross the finish.
                    </p>

                    {/* Event Inclusions Heading */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-10 mb-2">
                        Event Inclusions
                    </h3>
                    <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start p-4 hover:bg-gray-50 rounded-xl transition-colors">
                            <div className="text-blue-600 mr-4 flex-shrink-0 mt-1">
                                {benefit.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1">{benefit.title}</h3>
                                <p className="text-gray-500 font-light text-sm">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
