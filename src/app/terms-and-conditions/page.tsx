import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Terms & Conditions | Bhaag Dilli Bhaag 2026',
    description: 'Terms and Conditions for participating in Bhaag Dilli Bhaag 2026 marathon event. Please read the rules and regulations carefully before registering.',
    alternates: {
        canonical: 'https://www.bhaagdillibhaag.in/terms-and-conditions',
    },
    openGraph: {
        title: 'Terms & Conditions | Bhaag Dilli Bhaag 2026',
        description: 'Read the official terms and conditions for Bhaag Dilli Bhaag 2026.',
        url: 'https://www.bhaagdillibhaag.in/terms-and-conditions',
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
            "name": "Terms & Conditions",
            "item": "https://www.bhaagdillibhaag.in/terms-and-conditions"
        }
    ]
};

export default function TermsAndConditionsPage() {
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
                            Terms & Conditions
                        </h1>
                        <p className="text-blue-100 text-base sm:text-lg font-light max-w-2xl mx-auto">
                            Please read these terms carefully before registering
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
                                    By registering for and participating in Bhaag Dilli Bhaag, a charity marathon organised by Delhi Amigos around Table 313, you agree to the following:
                                </p>
                            </div>

                            <div className="space-y-8">
                                {/* Registration */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            1
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Registration</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        Registrations are accepted online only and are subject to availability and confirmation. All information provided must be accurate. The organizers reserve the right to reject or cancel any registration found to be incorrect or incomplete.
                                    </p>
                                </div>

                                {/* Eligibility */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            2
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Eligibility</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        Participants must meet the minimum age criteria for their selected race category. Underage participants must submit valid parental or guardian consent. Age and identity may be verified.
                                    </p>
                                </div>

                                {/* Registration Fees */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            3
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Registration Fees</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        All registration fees are non-refundable, non-transferable, and non-deferrable. In case of non-participation, the fee will not be refunded.
                                    </p>
                                </div>

                                {/* Event Changes */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            4
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Event Changes</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        The organizers reserve the right to modify the event date, venue, route, or schedule due to weather conditions, government guidelines, or safety considerations. No refunds will be issued in case of changes or cancellation.
                                    </p>
                                </div>

                                {/* Bib and Race Kit */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            5
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Bib and Race Kit</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        Race bibs must be collected during the official bib distribution period with valid photo ID and registration confirmation. Bibs are non-transferable. Authorized representatives may collect bibs with proper documentation.
                                    </p>
                                </div>

                                {/* Health and Safety */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            6
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Health and Safety</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        Participants confirm that they are medically fit to participate and understand that running involves physical risk. Medical and safety support will be provided, but participation is at the runner's own risk.
                                    </p>
                                </div>

                                {/* Conduct */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            7
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Conduct</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        Participants must follow all instructions issued by race officials, volunteers, and medical staff. Unsporting or unsafe behavior may result in disqualification.
                                    </p>
                                </div>

                                {/* Timing and Results */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            8
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Timing and Results</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        Timing will be recorded using official timing systems for applicable categories. Results are provisional and subject to verification.
                                    </p>
                                </div>

                                {/* Media Consent */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            9
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Media Consent</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        Participants consent to the use of photographs and videos taken during the event for promotional and communication purposes without compensation.
                                    </p>
                                </div>

                                {/* Liability */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            10
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Liability</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        To the extent permitted under Indian law, the organizers, sponsors, and partners shall not be liable for any injury, loss, damage, or death arising from participation. Liability, if any, shall be limited to the registration fee paid.
                                    </p>
                                </div>

                                {/* Governing Law */}
                                <div className="group hover:bg-gray-50 p-5 rounded-xl transition-all duration-300">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            11
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Governing Law</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pl-2 sm:pl-11 text-sm sm:text-base">
                                        These terms are governed by the laws of India and subject to the jurisdiction of courts in Delhi.
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
                                            For any questions related to Terms and Conditions, please write to us.
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
