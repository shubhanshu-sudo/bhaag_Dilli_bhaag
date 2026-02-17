'use client';

export default function RaceExpo() {
    return (
        <section id="race-expo" className="relative py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black italic text-blue-900 tracking-tight uppercase mb-4">
                        Race Expo Day <br className="hidden sm:block" />
                        <span className="text-blue-600">Regulations & Information</span>
                    </h2>
                    <div className="h-1.5 w-24 bg-yellow-500 mx-auto rounded-full shadow-lg"></div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {/* Date */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow group">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Date</h3>
                        <p className="text-blue-900 font-medium">28th February 2026<br /><span className="text-gray-500 text-sm font-normal">(Saturday)</span></p>
                    </div>

                    {/* Time */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow group">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Time</h3>
                        <p className="text-blue-900 font-medium">11:00 AM to 6:00 PM</p>
                    </div>

                    {/* Venue */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1 group">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Venue</h3>
                        <p className="text-blue-900 font-medium text-sm leading-relaxed">
                            Decathlon, Metro Walk, Rammurti Passi Marg, Swarn Jayanti Park, Sector 10, Rohini, New Delhi – 110085
                        </p>
                    </div>

                    {/* Parking */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow group">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Parking</h3>
                        <p className="text-blue-900 font-medium">Metro Walk Parking Zone</p>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Regulations */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-50 relative overflow-hidden flex flex-col h-full hover:transform hover:scale-[1.01] transition-all duration-300">
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                        <h3 className="text-2xl font-black italic text-blue-900 mb-6 flex items-center gap-3">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">1</span>
                            Regulations for All Participants
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Entry to the race venue will strictly be permitted only to participants carrying their official bibs.",
                                "Goodie bags will NOT be distributed on the event day (1st March 2026).",
                                "All participants must collect their kits and goodie bags during the Race Expo only.",
                                "Participants for all race categories are requested to arrive at the venue with sufficient time to Manage parking, access the Zumba and stretching zones, stay hydrated and prepared for race day, and kindly follow all instructions provided by the event volunteers and staff."
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-4 items-start text-gray-700 leading-relaxed">
                                    <svg className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Parking Guidelines */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-50 relative overflow-hidden flex flex-col h-full hover:transform hover:scale-[1.01] transition-all duration-300">
                        <div className="absolute top-0 left-0 w-2 h-full bg-yellow-500"></div>
                        <h3 className="text-2xl font-black italic text-blue-900 mb-6 flex items-center gap-3">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-sm font-bold">2</span>
                            Parking Guidelines
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Free parking will be available exclusively for bib holders at the Metro Walk Parking Zone.",
                                "Parking outside the designated area will be entirely at the vehicle owner’s risk.",
                                "The organiser and Metro Walk management will not be responsible for any loss, damage, or theft of vehicles or belongings."
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-4 items-start text-gray-700 leading-relaxed">
                                    <svg className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
}
