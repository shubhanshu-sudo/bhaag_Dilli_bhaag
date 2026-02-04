import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col lg:flex-row lg:items-center bg-white overflow-hidden lg:pt-32">

            {/* 
                ZONE 2: IMAGE CANVAS 
                Mobile: Positioned relatively at the top with fixed height.
                Desktop: Absolutely positioned on the right covering 60% width.
            */}
            <div className="relative lg:absolute top-0 right-0 w-full lg:w-[60%] h-[50vh] sm:h-[55vh] lg:h-full z-0 flex-shrink-0">
                <img
                    src="/Gemini_Generated_Image_1i8c2u1i8c2u1i8c.webp"
                    alt="Bhaag Dilli Bhaag Running Event - Marathon Finish Line"
                    className="w-full h-full object-cover object-[center_35%] lg:object-center"
                />
                {/* Desktop Gradients */}
                <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
                <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-50"></div>

                {/* Mobile Gradient: Soft fade transition to the content card */}
                <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-60"></div>
            </div>

            {/* 
                ZONE 1: CONTENT COLUMN 
                Mobile: Acts as a card-style container that slides up over the image.
                Desktop: Remains the left-side content column.
            */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 h-full pointer-events-none">
                <div className="flex flex-col lg:flex-row lg:items-center min-h-full lg:min-h-[85vh]">

                    {/* 
                        CONTENT BLOCK
                        Mobile: Card-style styling with -mt, white bg, and shadow.
                        Desktop: Transparent bg, no shadow, specific width.
                    */}
                    <div className="
                        relative 
                        -mt-14 sm:-mt-20 lg:mt-0 
                        w-full lg:w-[60%] xl:w-[45%] 
                        bg-white lg:bg-transparent 
                        rounded-t-[2.5rem] sm:rounded-t-[3.5rem] lg:rounded-none 
                        px-6 sm:px-12 lg:px-0 
                        py-12 sm:py-20 lg:py-8 
                        shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.1)] lg:shadow-none
                        pointer-events-auto
                    ">
                        {/* Mobile Floating Logo Overlay */}
                        <div className="lg:hidden absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full shadow-2xl border-4 border-white flex items-center justify-center z-20">
                            <div className="relative w-14 h-14">
                                <Image
                                    src="/Untitled-1-01.webp"
                                    alt="Bhaag Dilli Bhaag Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div className="max-w-xl flex flex-col justify-center">

                            {/* Headline - Responsive sizing: 28px-32px on mobile, original large sizes on desktop */}
                            <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 mb-5 sm:mb-8 leading-[1.1] tracking-tight italic">
                                Bhaag Dilli Bhaag <br />
                                <span className="text-blue-900 text-2xl sm:text-4xl md:text-5xl block mt-1 sm:mt-2">Running Event</span>
                            </h1>

                            <p className="text-sm sm:text-base text-gray-600 mb-8 sm:mb-10 font-normal leading-relaxed max-w-[95%] sm:max-w-none">
                                Every step you take helps build classrooms and open doors for underprivileged children.
                            </p>

                            {/* Date & Venue Info Block - Compact and scannable for mobile */}
                            <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-10 text-gray-800 font-semibold text-sm sm:text-lg border-l-4 border-blue-900 pl-4 sm:pl-6">
                                <div className="flex items-center gap-3">
                                    <span className="uppercase tracking-wider text-[10px] sm:text-sm text-gray-400 w-12 sm:w-16 flex-shrink-0">Date</span>
                                    <span className="text-gray-900">1st March 2026</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="uppercase tracking-wider text-[10px] sm:text-sm text-gray-400 w-12 sm:w-16 flex-shrink-0">Venue</span>
                                    <span className="text-gray-900"> Metro Walk, Sector-10, Rohini</span>
                                </div>
                            </div>

                            {/* CTA Button - Full width on mobile for accessibility */}
                            <Link href="/register" className="w-full sm:w-auto">
                                <button className="
                                    w-full sm:w-auto
                                    bg-[#FFF8E7] hover:bg-[#ffeebb] 
                                    text-yellow-700 
                                    font-bold text-base sm:text-xl 
                                    px-8 sm:px-12 
                                    py-4 sm:py-5 
                                    rounded-full 
                                    shadow-lg border border-yellow-200 
                                    transition-all hover:-translate-y-1 hover:shadow-xl
                                ">
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
