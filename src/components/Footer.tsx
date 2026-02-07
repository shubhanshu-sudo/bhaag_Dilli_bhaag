import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer id="contact" className="relative pt-16 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 shadow-inner"
                    style={{
                        backgroundImage: "url('/wnc-gallery-8.1.jpeg')"
                    }}
                ></div>
                {/* Darker overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-950/85 to-blue-950/95"></div>
                <div className="absolute inset-0 bg-indigo-950/20"></div>
            </div>

            {/* Wavy Top Edge - SVG Clip Path Simulation */}
            <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none transform -translate-y-[98%] z-10">
                <svg className="relative block w-full h-[80px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff" ></path>
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-4 sm:gap-10 lg:gap-8 xl:gap-12 mb-10 sm:mb-14 lg:mb-16 pb-10 sm:pb-14 lg:pb-16">
                    {/* Brand / Logo Area */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1 text-center sm:text-left">
                        <div className="inline-block bg-white p-1.5 sm:p-2 rounded-xl mb-4 sm:mb-6 mx-auto sm:mx-0 transition-transform hover:scale-105 shadow-md">
                            <Image
                                src="/Untitled-1-01.webp"
                                alt="Bhaag Dilli Bhaag Logo"
                                width={160}
                                height={56}
                                className="object-contain w-32 sm:w-auto h-auto"
                            />
                        </div>
                        <h3 className="font-bold text-base sm:text-xl mb-2 sm:mb-4 text-white">Bhaag Dilli Bhaag</h3>
                        <p className="text-blue-100 text-xs sm:text-sm leading-relaxed font-light px-4 sm:px-0">
                            A purpose driven marathon by Round Table India.
                            Run with heart. &nbsp;
                            <span className="hidden sm:inline">Run for education.</span>
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-left">
                        <h4 className="font-bold text-xs sm:text-lg mb-4 sm:mb-6 text-white uppercase tracking-wider">Event</h4>
                        <ul className="space-y-2 sm:space-y-3 text-blue-100 font-light text-xs sm:text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors hover:underline">Home</Link></li>
                            <li><Link href="/#about" className="hover:text-white transition-colors hover:underline">About Us</Link></li>
                            <li><Link href="/#route" className="hover:text-white transition-colors hover:underline">Race Route</Link></li>
                            <li><Link href="/#partners" className="hover:text-white transition-colors hover:underline">Our Partners</Link></li>
                        </ul>
                    </div>

                    <div className="text-left">
                        <h4 className="font-bold text-xs sm:text-lg mb-4 sm:mb-6 text-white uppercase tracking-wider">Support</h4>
                        <ul className="space-y-2 sm:space-y-3 text-blue-100 font-light text-xs sm:text-sm">
                            <li><Link href="/#contact" className="hover:text-white transition-colors hover:underline">Contact</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors hover:underline">FAQs</Link></li>
                            <li><Link href="/terms-and-conditions" className="hover:text-white transition-colors hover:underline">Terms</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-white transition-colors hover:underline">Privacy</Link></li>
                        </ul>
                    </div>

                    {/* Contact - Unified Sports */}
                    <address className="text-left not-italic">
                        <h4 className="font-bold text-xs sm:text-lg mb-4 sm:mb-6 text-white uppercase tracking-wider">Contact – Unified Sports</h4>
                        <p className="text-white text-xs sm:text-sm font-semibold mb-2">Unified Sports and Events</p>
                        <p className="text-blue-100 text-[10px] sm:text-xs mb-4 leading-relaxed opacity-80">
                            For all event-related and registration queries
                        </p>
                        <div className="space-y-3">
                            <a
                                href="tel:9599218680"
                                className="flex items-center text-blue-100 hover:text-white transition-colors group"
                                aria-label="Call Unified Sports at 9599218680"
                            >
                                <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                </div>
                                <span className="text-xs sm:text-sm font-medium">9599218680</span>
                            </a>
                            <a
                                href="mailto:info@bhaagdillibhaag.in"
                                className="flex items-center text-blue-100 hover:text-white transition-colors group"
                                aria-label="Email Unified Sports at info@bhaagdillibhaag.in"
                            >
                                <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <span className="text-xs sm:text-sm font-medium truncate">info@bhaagdillibhaag.in</span>
                            </a>
                        </div>
                    </address>

                    {/* Connect / Social */}
                    <div className="text-left sm:text-left">
                        <h4 className="font-bold text-xs sm:text-lg mb-4 sm:mb-6 text-white uppercase tracking-wider">Connect</h4>
                        <div className="flex space-x-3 sm:space-x-4 mb-4 sm:mb-6 justify-start">
                            <a
                                href="https://www.instagram.com/bhaagdillibhaag/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 hover:bg-white hover:text-blue-900 rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/30 hover:scale-110 shadow-lg text-white"
                                title="Instagram"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                            <a
                                href="https://www.youtube.com/@BhaagDilliBhaag"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 hover:bg-white hover:text-blue-900 rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/30 hover:scale-110 shadow-lg text-white"
                                title="YouTube"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=61587329426324"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 hover:bg-white hover:text-blue-900 rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/30 hover:scale-110 shadow-lg text-white"
                                title="Facebook"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.791-4.667 4.532-4.667 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                        </div>
                        <p className="text-blue-100 text-[10px] sm:text-xs">Follow us for updates</p>
                    </div>
                </div>

                <div className="text-center pt-6 sm:pt-8 border-t border-white/20 mt-8">
                    <p className="text-blue-100 text-xs font-light leading-relaxed mb-3">
                        Participation is voluntary and subject to the Terms & Conditions and Privacy Policy listed above.
                    </p>
                    <p className="text-white text-xs font-light tracking-wide">
                        © 2026 Bhaag Dilli Bhaag. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
