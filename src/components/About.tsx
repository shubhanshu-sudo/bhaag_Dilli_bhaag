export default function About() {
    return (
        <section id="about" className="bg-white py-12 sm:py-16 lg:py-24 relative overflow-hidden">
            {/* Background texture matching reference if possible - kept clean white for now */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

                    {/* Left: Image/Collage */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] transform rotate-1 hover:rotate-0 transition-all duration-500">
                            {/* Using local image from public folder */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: "url('/about-image.png')"
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-blue-900/10"></div>
                        </div>
                        {/* Decorative element behind */}
                        <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-blue-100 rounded-3xl -z-10 hidden sm:block"></div>
                    </div>

                    {/* Right: Content */}
                    <div className="order-1 lg:order-2">

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 mb-6 sm:mb-8 leading-tight">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Bhaag Dilli Bhaag</span>
                        </h2>

                        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-600 font-light leading-relaxed">
                            <p>
                                Bhaag Dilli Bhaag was born from a simple belief that when people come together with intention, real change begins.
                            </p>
                            <p>
                                This marathon brings runners, families, and communities together for a shared purpose. What starts as a race becomes a story of hope, effort, and collective responsibility toward a better future for underprivileged children.
                            </p>
                            <p>
                                Organized by Round Table India 313, Bhaag Dilli Bhaag supports the larger vision of <span className="font-semibold text-blue-800">Freedom Through Education</span>. The initiative focuses on building schools and strengthening classroom infrastructure, helping create safe and supportive spaces where children can learn, grow, and dream beyond their circumstances.
                            </p>
                            <p className="font-medium text-gray-700 italic">
                                This run is not about how fast you finish.<br />
                                It is about why you start.
                            </p>
                        </div>

                        <div className="mt-8 sm:mt-10">
                            <button className="text-blue-700 font-bold hover:text-blue-900 flex items-center gap-2 transition-colors">
                                Learn More
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
