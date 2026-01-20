export default function Route() {
    return (
        <section id="route" className="py-12 sm:py-16 lg:py-24 bg-gray-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    {/* Content Left */}
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 italic tracking-tight mb-4 sm:mb-6">
                            The Route
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed mb-6 sm:mb-8">
                            Experience a perfectly designed course around Japanese Park (Swarn Jayanti Park). The flat terrain and scenic greenery make it the perfect ground for achieving your personal best.
                        </p>

                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-start">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-yellow-600 mr-3 sm:mr-4 border border-gray-100 flex-shrink-0">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-base sm:text-lg">Flat & Fast</h4>
                                    <p className="text-xs sm:text-sm text-gray-500 font-light">Ideal for PBs</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-yellow-600 mr-3 sm:mr-4 border border-gray-100 flex-shrink-0">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-base sm:text-lg">Greenery</h4>
                                    <p className="text-xs sm:text-sm text-gray-500 font-light">Run through nature</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Right */}
                    <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-xl border border-gray-100 transform rotate-2 hover:rotate-0 transition-all duration-500 order-1 md:order-2">
                        <div className="aspect-square bg-blue-50 rounded-2xl flex items-center justify-center overflow-hidden relative">
                            {/* Placeholder for Map - styling matches reference vibe of 'clean card' */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 2px, transparent 2.5px)', backgroundSize: '20px 20px' }}></div>
                            <div className="text-center p-6 sm:p-8 relative z-10">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-sm text-blue-600">
                                    <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                                </div>
                                <h3 className="font-black text-blue-900 text-xl sm:text-2xl mb-1">ROHINI SECTOR 10</h3>
                                <p className="text-gray-500 uppercase tracking-widest text-xs sm:text-sm">Japanese Park</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
