import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-28">

            {/* 
        ZONE 2: RIGHT IMAGE CANVAS 
        Width set to 60% and made larger to blend more naturally.
        Using a soft gradient mask instead of hard cuts.
      */}
            <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[60%] z-0 h-full">
                <img
                    src="https://images.unsplash.com/photo-1530549387789-4c1017266635"
                    alt="Marathon Runners"
                    className="w-full h-full object-cover object-center"
                />
                {/* 
            Soft, extended gradient mask for natural blending.
            The mask is wider (via-white/70) to ensure text legibility without a hard line.
          */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-50"></div>
            </div>

            {/* 
        ZONE 1: LEFT CONTENT COLUMN 
        Added top padding to clear the navbar visual space.
        Pointer events handling for interaction.
      */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 h-full pointer-events-none">
                <div className="flex items-center min-h-[85vh]">

                    {/* 
                CONTENT BLOCK
                Width: 45%
                Vertically Centered
            */}
                    <div className="w-full md:w-[60%] lg:w-[45%] py-12 pointer-events-auto">

                        <div className="max-w-xl flex flex-col justify-center">

                            {/* Headline - Added top margin for separation from Navbar */}
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-8 mt-12 leading-[1.05] tracking-tight italic">
                                Run with <br />
                                <span className="text-blue-900">North Delhi</span>
                            </h1>

                            {/* Subtext */}
                            <p className="text-lg sm:text-xl text-gray-600 mb-10 font-medium leading-relaxed">
                                Join thousands of runners in the ultimate test of endurance and spirit at Japanese Park.
                            </p>

                            {/* Date & Venue Info Block - Aligned & Grouped */}
                            <div className="flex flex-col gap-4 mb-10 text-gray-800 font-semibold text-lg border-l-4 border-blue-900 pl-6">
                                <div className="flex items-center gap-3">
                                    <span className="uppercase tracking-wider text-sm text-gray-500 w-16">Date</span>
                                    <span>1st March 2026</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="uppercase tracking-wider text-sm text-gray-500 w-16">Venue</span>
                                    <span>Japanese Park, Rohini</span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <Link href="/register">
                                <button className="bg-[#FFF8E7] hover:bg-[#ffeebb] text-yellow-700 font-bold text-xl px-12 py-5 rounded-full shadow-lg border border-yellow-200 transition-all hover:-translate-y-1 hover:shadow-xl w-full sm:w-auto">
                                    Register Now
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
