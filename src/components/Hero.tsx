import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-20 sm:pt-24 lg:pt-28">

            {/* 
        ZONE 2: RIGHT IMAGE CANVAS 
        Width set to 60% and made larger to blend more naturally.
        Using a soft gradient mask instead of hard cuts.
      */}
            <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[60%] z-0 h-full">
                <img
                    src="/common5.jpg"
                    alt="Bhaag Dilli Bhaag Running Event"
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
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full pointer-events-none">
                <div className="flex items-center min-h-[85vh]">

                    {/* 
                CONTENT BLOCK
                Width: 45%
                Vertically Centered
            */}
                    <div className="w-full lg:w-[60%] xl:w-[45%] py-8 sm:py-12 pointer-events-auto">

                        <div className="max-w-xl flex flex-col justify-center">

                            {/* Headline - Added top margin for separation from Navbar */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 sm:mb-8 mt-8 sm:mt-12 leading-[1.1] tracking-tight italic">
                                Bhaag Dilli Bhaag <br />
                                <span className="text-blue-900 text-3xl sm:text-4xl md:text-5xl block mt-2">Running Event</span>
                            </h1>

                            <p className="text-sm sm:text-base text-gray-600 mb-8 sm:mb-10 font-normal leading-relaxed">
                                Every step you take helps build classrooms and open doors for underprivileged children.
                            </p>

                            {/* Date & Venue Info Block - Aligned & Grouped */}
                            <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-10 text-gray-800 font-semibold text-base sm:text-lg border-l-4 border-blue-900 pl-4 sm:pl-6">
                                <div className="flex items-center gap-3">
                                    <span className="uppercase tracking-wider text-xs sm:text-sm text-gray-500 w-14 sm:w-16">Date</span>
                                    <span className="text-sm sm:text-base md:text-lg">1st March 2026</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="uppercase tracking-wider text-xs sm:text-sm text-gray-500 w-14 sm:w-16">Venue</span>
                                    <span className="text-sm sm:text-base md:text-lg">Japanese Park, Rohini</span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <Link href="/register">
                                <button className="bg-[#FFF8E7] hover:bg-[#ffeebb] text-yellow-700 font-bold text-base sm:text-xl px-6 sm:px-12 py-3 sm:py-5 rounded-full shadow-lg border border-yellow-200 transition-all hover:-translate-y-1 hover:shadow-xl w-full sm:w-auto">
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
