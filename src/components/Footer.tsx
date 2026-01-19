import Link from 'next/link';

export default function Footer() {
    return (
        <footer id="contact" className="bg-blue-900 text-white relative pt-32 pb-10">
            {/* Wavy Top Edge - SVG Clip Path Simulation */}
            <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none transform -translate-y-[98%]">
                <svg className="relative block w-full h-[80px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff" ></path>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-16 border-b border-blue-800 pb-16">
                    {/* Brand / Logo Area */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                            <div className="text-2xl font-black">bdb</div>
                        </div>
                        <h3 className="font-bold text-xl mb-4 text-white">Bhaag Dilli Bhaag</h3>
                        <p className="text-blue-200 text-sm leading-relaxed font-light">
                            North Dilli's premier marathon event organized by Round Table India.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wider text-sm">Event</h4>
                        <ul className="space-y-3 text-blue-200 font-light text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/#about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/#route" className="hover:text-white transition-colors">Race Route</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wider text-sm">Support</h4>
                        <ul className="space-y-3 text-blue-200 font-light text-sm">
                            <li><Link href="/#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Contact / Social */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wider text-sm">Connect</h4>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="w-10 h-10 bg-blue-800 hover:bg-white hover:text-blue-900 rounded-full flex items-center justify-center transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-blue-800 hover:bg-white hover:text-blue-900 rounded-full flex items-center justify-center transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                        </div>
                        <p className="text-blue-200 text-xs">info@bhaagdillibhaag.com</p>
                    </div>
                </div>

                <div className="text-center pt-8">
                    <p className="text-blue-400 text-xs font-light tracking-wide">
                        © 2026 Bhaag Dilli Bhaag. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
