import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Privacy Policy | Bhaag Dilli Bhaag 2026',
    description: 'Privacy Policy for Bhaag Dilli Bhaag 2026. Learn how we handle your personal information and data during the marathon registration and event.',
    alternates: {
        canonical: 'https://www.bhaagdillibhaag.in/privacy-policy',
    },
    openGraph: {
        title: 'Privacy Policy | Bhaag Dilli Bhaag 2026',
        description: 'Your privacy matters to us. Read how we protect your data.',
        url: 'https://www.bhaagdillibhaag.in/privacy-policy',
    },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.bhaagdillibhaag.in"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Privacy Policy",
            "item": "https://www.bhaagdillibhaag.in/privacy-policy"
        }
    ]
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Hero Header */}
                <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }}></div>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <div className="inline-block mb-4 px-4 py-2 bg-blue-700/50 rounded-full backdrop-blur-sm">
                            <p className="text-blue-100 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                                Legal
                            </p>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg font-light max-w-2xl mx-auto">
                            How we protect and use your personal information
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-12 sm:py-16 lg:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 border border-gray-100">
                            {/* Introduction */}
                            <div className="mb-8 p-5 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                    We respect your privacy and are committed to protecting your personal information.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {/* Information We Collect */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            1
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Information We Collect</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        We may collect basic personal details such as name, contact information, age, emergency contact details, and event-related photographs or videos.
                                    </p>
                                </div>

                                {/* How We Use Your Information */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            2
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">How We Use Your Information</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        Your information is used only for event administration, participant communication, safety management, race results, certificates, and awareness activities related to the event.
                                    </p>
                                </div>

                                {/* Data Sharing */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            3
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Data Sharing</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        We do not sell or trade participant data. Information may be shared only with authorized partners for event operations or when required by law.
                                    </p>
                                </div>

                                {/* Data Protection */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            4
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Data Protection</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        Reasonable security measures are in place to protect your data. While we strive to safeguard all information, complete security cannot be guaranteed.
                                    </p>
                                </div>

                                {/* Consent */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            5
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Consent</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        By registering for the event, you consent to the collection and use of your information as outlined in this policy.
                                    </p>
                                </div>

                                {/* Policy Updates */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            6
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Policy Updates</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        This Privacy Policy may be updated from time to time. Any changes will be reflected on the website.
                                    </p>
                                </div>
                            </div>

                            {/* Contact Section */}
                            <div className="mt-12 p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border-l-4 border-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">Contact Us</h3>
                                        <p className="text-gray-700 text-sm sm:text-base mb-3">
                                            For any questions related to Privacy Policy, please write to us.
                                        </p>
                                        <a
                                            href="mailto:info@bhaagdillibhaag.in"
                                            className="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base transition-colors"
                                        >
                                            info@bhaagdillibhaag.in
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
