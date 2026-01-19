export default function About() {
    return (
        <section id="about" className="bg-white py-24 relative overflow-hidden">
            {/* Background texture matching reference if possible - kept clean white for now */}

            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Image/Collage */}
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] transform rotate-1 hover:rotate-0 transition-all duration-500">
                            {/* Using the specific About image from prompt guidelines if available, else a relevant running crowd shot */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: "url('https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=2070')"
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-blue-900/10"></div>
                        </div>
                        {/* Decorative element behind */}
                        <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-blue-100 rounded-3xl -z-10"></div>
                    </div>

                    {/* Right: Content */}
                    <div>
                        <h4 className="text-blue-600 font-bold uppercase tracking-wider mb-2 text-sm">Organized by Round Table India</h4>
                        <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-8 leading-tight">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Bhaag Dilli Bhaag</span>
                        </h2>

                        <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                            <p>
                                Bhaag Dilli Bhaag is North Delhi&apos;s premier purpose-driven marathon, bringing together runners of all levels to celebrate fitness, community, and social impact.
                            </p>
                            <p>
                                Our mission is simple: <span className="font-semibold text-blue-800">Adopt · Adapt · Improve</span>. We aim to create a world-class running experience that not only challenges your physical limits but also contributes to a greater cause.
                            </p>
                            <p>
                                Every stride you take supports the <span className="font-semibold text-blue-800">Freedom Through Education</span> initiative, empowering underprivileged children with access to quality education. Join us in making a tangible difference, one step at a time.
                            </p>
                        </div>

                        <div className="mt-10">
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
