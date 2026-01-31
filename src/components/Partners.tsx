import Link from 'next/link';
import Image from 'next/image';

export default function Partners() {
    const sponsors = [
        { id: 9, path: "/image_9/image_9_1_5x.webp", type: "Official Sponsor" },
        { id: 10, path: "/image_10/image_10_1_5x.webp", type: "Strategic Partner" },
        { id: 11, path: "/image_11/image_11_1_5x.webp", type: "Silver Sponsor" },
        { id: 12, path: "/image_12/image_12_1_5x.webp", type: "Official Partner" },
        { id: 13, path: "/image_13/image_13_1_5x.webp", type: "Associate Sponsor" },
        { id: 14, path: "/image_14/image_14_1_5x.webp", type: "Event Partner" },
        { id: 15, path: "/image_15/image_15_1_5x.webp", type: "Corporate Sponsor" },
        { id: 18, path: "/image_18/image_18_1_5x.webp", type: "Community Partner" },
        { id: 20, path: "/whatsapp_image_2025_12_05_at_13_42_19_22066bac_1/whatsapp_image_2025_12_05_at_13_42_19_22066bac_1_1_5x.webp", type: "Principal Sponsor" },
        { id: 21, path: "/Unified-Sports-green-logo-png-1-Custom.png.webp", type: "Official Partner" },
        { id: 22, path: "/Frame 3.png", type: "Official Partner" },
    ];

    return (
        <section className="py-20 sm:py-28 lg:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-16 lg:mb-20">
                    <div className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase mb-4 sm:mb-6">
                        Support Network
                    </div>
                    <h2 className="text-3xl sm:text-6xl lg:text-7xl font-black text-indigo-950 italic tracking-tighter mb-4 sm:mb-8 leading-[1.1] sm:leading-[0.9]">
                        Our Partners & <br className="sm:hidden" /> <span className="text-blue-600">Sponsors</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-gray-500 text-sm sm:text-xl font-light leading-relaxed">
                        Proudly supported by visionary brands committed to changing lives through education.
                    </p>
                </div>

                {/* Partners Grid - Compact 2-column on mobile, 4-column on desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
                    {sponsors.map((partner) => (
                        <div
                            key={partner.id}
                            className="group relative flex flex-col items-center justify-center p-4 sm:p-8 bg-white rounded-2xl sm:rounded-[2.5rem] border border-gray-100 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(30,58,138,0.15)] hover:-translate-y-2 sm:hover:-translate-y-3 cursor-pointer overflow-hidden"
                        >
                            {/* Animated Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            {/* Image Container - Reduced height for compact display */}
                            <div className="relative w-full h-10 sm:h-auto sm:aspect-[3/2] flex items-center justify-center z-10">
                                <Image
                                    src={partner.path}
                                    alt={`Partner ${partner.id}`}
                                    fill
                                    className="object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                                    sizes="(max-width: 640px) 150px, 400px"
                                />
                            </div>

                            {/* Label - Subtle on mobile */}
                            <div className="mt-4 sm:mt-8 text-center z-10 relative">
                                <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 group-hover:text-blue-600 transition-colors duration-500">
                                    {partner.type}
                                </div>
                                <div className="hidden sm:block mt-2 h-0.5 w-0 group-hover:w-full bg-blue-400 mx-auto transition-all duration-500 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Pre-Footer Card */}
            <div className="px-4 sm:px-6 mt-20 sm:mt-32">
                <div className="max-w-5xl mx-auto">
                    <div className="relative bg-indigo-950 rounded-[2.5rem] sm:rounded-[4rem] p-10 sm:p-16 lg:p-24 text-center shadow-3xl overflow-hidden group">
                        {/* More Dynamic Animated Decorative Elements */}
                        <div className="absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/30 rounded-full blur-[100px] sm:blur-[120px] group-hover:scale-125 transition-transform duration-1000"></div>
                        <div className="absolute -bottom-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500/30 rounded-full blur-[100px] sm:blur-[120px] group-hover:scale-125 transition-transform duration-1000"></div>

                        <div className="relative z-10">
                            <h2 className="text-[32px] sm:text-5xl lg:text-7xl font-black text-white mb-6 sm:mb-8 leading-[1.1] sm:leading-none italic tracking-tighter">
                                Be Part of Something<br />That <span className="text-blue-400">Matters</span>
                            </h2>
                            <p className="text-indigo-100 text-base lg:text-xl mb-10 sm:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                                Join a community of runners who believe that effort, when shared, can create change. When you run Bhaag Dilli Bhaag, you run with purpose.
                            </p>

                            <Link href="/register" className="inline-block relative group/btn w-full sm:w-auto">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-25 group-hover/btn:opacity-100 transition duration-700"></div>
                                <button className="relative w-full sm:w-auto bg-white text-indigo-950 font-black text-xs sm:text-base uppercase tracking-[0.2em] px-10 sm:px-14 py-5 sm:py-6 rounded-2xl shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-4 mx-auto">
                                    Register Now
                                    <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
