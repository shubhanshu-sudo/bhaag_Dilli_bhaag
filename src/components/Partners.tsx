export default function Partners() {
    const partners = [
        { name: "Round Table India", type: "Organizer" },
        { name: "Partner 1", type: "Hydration" },
        { name: "Partner 2", type: "Medical" },
        { name: "Partner 3", type: "Apparel" },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-blue-900 italic tracking-tight mb-4">
                        Our Partners & Sponsors
                    </h2>
                    <div className="h-1 w-16 bg-blue-100 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {partners.map((partner, index) => (
                        <div key={index} className="flex items-center justify-center p-8 border border-gray-100 rounded-2xl grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-lg bg-gray-50/50 hover:bg-white cursor-pointer aspect-[3/2]">
                            {/* Placeholder Logo */}
                            <div className="text-center">
                                <div className="font-bold text-gray-300 text-lg group-hover:text-blue-900">{partner.name}</div>
                                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{partner.type}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Pre-Footer Card similar to reference */}
            <div className="max-w-5xl mx-auto px-6 mt-24">
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tight mb-6">
                            Unlock Your Ultimate Race Experience!
                        </h2>
                        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto font-light">
                            Join thousands of runners and make history at North Delhi's biggest running event.
                        </p>
                        <button className="bg-white text-blue-900 font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-white/20 transition-all transform hover:-translate-y-1">
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
