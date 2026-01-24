import Image from 'next/image';

export default function Benefits() {
    const benefits = [
        {
            icon: "/Icon Medal.psd.png",
            title: "Finisher Medal",
            description: "A medal to mark your achievement"
        },
        {
            icon: "/Icon Guddybag.png",
            title: "Goodie Bag",
            description: "Curated with care, just like the run itself"
        },
        {
            icon: "/Icon Hydration support 2.png",
            title: "Hydration Support",
            description: "Hydration points on route"
        },
        {
            icon: "/Icon Medical support 2.png",
            title: "Medical Support",
            description: "First aid and ambulance support"
        },
        {
            icon: "/Icon Tshirt size 2.png",
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

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="group flex flex-col items-center text-center p-4 sm:p-6 hover:bg-blue-50 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            {/* Icon Container */}
                            <div className="relative w-16 h-16 sm:w-24 sm:h-24 mb-3 sm:mb-4 flex items-center justify-center bg-white rounded-2xl shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                <div className="relative w-10 h-10 sm:w-16 sm:h-16">
                                    <Image
                                        src={benefit.icon}
                                        alt={benefit.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-1">
                                <h4 className="font-bold text-gray-900 text-xs sm:text-lg mb-1 sm:mb-2 group-hover:text-blue-900 transition-colors leading-tight">
                                    {benefit.title}
                                </h4>
                                <p className="text-gray-500 font-light text-[10px] sm:text-sm leading-tight sm:leading-relaxed px-1">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
