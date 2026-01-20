'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const [registrationId, setRegistrationId] = useState('');
    const [registrationData, setRegistrationData] = useState<any>(null);

    useEffect(() => {
        // Get registration ID from URL parameter 'rid' or localStorage
        const rid = searchParams.get('rid') || localStorage.getItem('registrationId') || '';
        const data = localStorage.getItem('registrationData');

        setRegistrationId(rid);
        if (data) {
            try {
                setRegistrationData(JSON.parse(data));
            } catch (e) {
                console.error('Failed to parse registration data:', e);
            }
        }
    }, [searchParams]);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Success Message */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black text-blue-900 mb-3">
                            Registration Successful!
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Your registration has been submitted successfully.
                        </p>
                    </div>

                    {/* Registration Details Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Registration Details
                        </h2>

                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">Registration ID:</span>
                                <span className="font-semibold text-gray-900 text-sm break-all">{registrationId}</span>
                            </div>

                            {registrationData && (
                                <>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Name:</span>
                                        <span className="font-semibold text-gray-900">{registrationData.fullName}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Email:</span>
                                        <span className="font-semibold text-gray-900 text-sm">{registrationData.email}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Race:</span>
                                        <span className="font-semibold text-blue-900">{registrationData.raceDistance} - {registrationData.raceTitle}</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-gray-600">Amount:</span>
                                        <span className="font-bold text-2xl text-blue-900">₹{registrationData.amount}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Payment Coming Soon */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8 text-center mb-6">
                        <div className="text-4xl mb-4">💳</div>
                        <h3 className="text-xl font-bold text-blue-900 mb-2">
                            Payment Integration Coming Soon
                        </h3>
                        <p className="text-gray-700 mb-4">
                            Payment gateway integration will be available in Phase 2.
                            <br />
                            Your registration has been saved with status: <span className="font-semibold text-yellow-600">Pending Payment</span>
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/" className="flex-1">
                            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-xl transition-all">
                                Back to Home
                            </button>
                        </Link>
                        <Link href="/register" className="flex-1">
                            <button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all">
                                Register Another
                            </button>
                        </Link>
                    </div>

                    {/* Info Box */}
                    <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3">📧 What's Next?</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>You will receive a confirmation email shortly</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Payment link will be sent once payment gateway is integrated</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Keep your Registration ID safe for future reference</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
