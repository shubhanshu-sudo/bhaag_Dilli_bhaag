'use client';

import { useToast } from '@/contexts/ToastContext';

export default function PromoBanner() {
    const { showToast } = useToast();
    const couponCode = "RTI30";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(couponCode);
        showToast('success', `Coupon ${couponCode} copied!`);
    };

    const scrollToPricing = () => {
        const element = document.getElementById('pricing');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToFooter = () => {
        const element = document.getElementById('footer');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950 py-10 sm:py-16 px-6 sm:px-12 relative overflow-hidden border-y border-white/5">
            {/* Dynamic Abstract Background Elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-yellow-400/5 rounded-full blur-[80px]"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col xl:flex-row items-center justify-between gap-10 lg:gap-16">

                    {/* Primary Offer Section */}
                    <div className="flex-1 text-center xl:text-left space-y-6">
                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-2">
                            <span className="text-2xl animate-pulse">🎉</span>
                            <span className="text-yellow-400 text-xs sm:text-sm font-black uppercase tracking-[0.2em] italic">
                                Limited Time Early Bird Offer
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white italic leading-tight tracking-tighter">
                            GET <span className="text-yellow-400 text-4xl sm:text-6xl lg:text-8xl">30% OFF</span> <br className="hidden sm:block" />
                            ON YOUR REGISTRATION
                        </h2>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center xl:justify-start">
                            <p className="text-blue-100/80 text-base sm:text-xl font-medium"> Use coupon code at checkout:</p>
                            <div className="flex items-center bg-white p-1 rounded-2xl shadow-2xl group transition-transform hover:scale-105">
                                <span className="px-6 py-3 text-blue-900 font-black text-2xl sm:text-3xl tracking-wider select-all">
                                    {couponCode}
                                </span>
                                <button
                                    onClick={copyToClipboard}
                                    className="bg-blue-900 hover:bg-blue-800 text-white p-3 sm:p-4 rounded-xl transition-all shadow-lg flex items-center gap-2"
                                    title="Copy to Clipboard"
                                >
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                    </svg>
                                    <span className="hidden sm:inline font-bold text-xs uppercase tracking-widest px-1">Copy Code</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Info & CTAs */}
                    <div className="flex flex-col gap-8 w-full xl:w-[450px]">
                        {/* Bulk Registration Card */}
                        <div className="relative group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] overflow-hidden transition-all hover:bg-white/10">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
                            </div>

                            <div className="relative z-10 flex items-start gap-4">
                                <div className="p-3 bg-yellow-400 text-blue-900 rounded-2xl shadow-xl">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-black text-lg sm:text-xl uppercase italic tracking-tight mb-2">Bulk Registration?</h3>
                                    <p className="text-blue-100/70 text-sm leading-relaxed mb-6">
                                        Planning to register as a group, school, or corporate team? Contact us for exclusive massive discounts and group goodies.
                                    </p>
                                    <button
                                        onClick={scrollToFooter}
                                        className="text-white font-black text-xs uppercase tracking-[0.2em] pb-1 border-b-2 border-yellow-400 hover:text-yellow-400 transition-colors"
                                    >
                                        Inquire Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main CTA Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={scrollToFooter}
                                className="w-full bg-white/10 hover:bg-white/20 text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em] py-5 px-6 rounded-2xl border border-white/20 transition-all active:scale-95"
                            >
                                Contact Us
                            </button>
                            <button
                                onClick={scrollToPricing}
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-xs sm:text-sm uppercase tracking-[0.2em] py-5 px-6 rounded-2xl shadow-[0_20px_40px_rgba(234,179,8,0.3)] transition-all hover:-translate-y-1 active:scale-95"
                            >
                                Register Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
