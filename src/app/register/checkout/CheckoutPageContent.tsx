'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_ENDPOINTS } from '@/config/api';
import { useToast } from '@/contexts/ToastContext';

interface PriceBreakdown {
    registrationFee: number;
    gatewayCharges: number;
    totalPayable: number;
    feePercentage: number;
}

interface RegistrationData {
    fullName: string;
    email: string;
    phone: string;
    race: string;
    raceTitle: string;
    raceDistance: string;
    amount: number;
}

export default function CheckoutPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { showToast } = useToast();

    const [registrationId, setRegistrationId] = useState('');
    const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
    const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get registration ID from URL or localStorage
                const rid = searchParams.get('rid') || localStorage.getItem('registrationId') || '';
                const data = localStorage.getItem('registrationData');

                if (!rid) {
                    showToast('error', 'No registration found. Please register first.');
                    router.push('/register');
                    return;
                }

                setRegistrationId(rid);

                if (data) {
                    const parsedData = JSON.parse(data);
                    setRegistrationData(parsedData);

                    // Fetch price breakdown from backend
                    const response = await fetch(API_ENDPOINTS.PAYMENT.PRICE_BREAKDOWN(parsedData.race));
                    const breakdownData = await response.json();

                    if (breakdownData.success) {
                        setPriceBreakdown(breakdownData.breakdown);
                    } else {
                        throw new Error(breakdownData.message || 'Failed to fetch price breakdown');
                    }
                } else {
                    throw new Error('Registration data not found');
                }
            } catch (err) {
                console.error('Error loading checkout:', err);
                setError(err instanceof Error ? err.message : 'Failed to load checkout');
                showToast('error', 'Failed to load checkout. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [searchParams, router, showToast]);

    const handleProceedToPayment = () => {
        // Navigate to payment page
        router.push(`/register/payment?rid=${registrationId}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 animate-pulse">
                            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-gray-600 font-medium">Loading checkout...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <Navbar />
                <main className="flex-grow flex items-center justify-center px-4">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Checkout</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <Link href="/register">
                            <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-xl transition-all">
                                Go Back to Register
                            </button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-32 md:py-36">
                <div className="max-w-xl mx-auto">

                    {/* Step Indicator */}
                    <div className="text-center mb-8 animate-fade-in">
                        <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                            Step 2 of 2
                        </div>
                    </div>

                    {/* Checkout Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl sm:text-3xl font-black text-blue-900 mb-2">
                            Review & Pay
                        </h1>
                        <p className="text-gray-600">
                            Please review the payment details before proceeding
                        </p>
                    </div>

                    {/* Order Summary Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6 border border-gray-100">

                        {/* Race Details */}
                        {registrationData && (
                            <div className="mb-6 pb-6 border-b border-gray-100">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                                    Order Summary
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg font-bold text-gray-900">
                                            {registrationData.raceDistance} - {registrationData.raceTitle}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Bhaag Dilli Bhaag 2026
                                        </p>
                                    </div>
                                    <div className="bg-blue-50 px-3 py-1 rounded-full">
                                        <span className="text-sm font-bold text-blue-700">
                                            {registrationData.race}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Price Breakdown */}
                        {priceBreakdown && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                                    Payment Breakdown
                                </h3>

                                {/* Registration Fee */}
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-gray-700 font-medium">Registration Fee</span>
                                    <span className="text-gray-900 font-bold">₹{priceBreakdown.registrationFee}</span>
                                </div>

                                {/* Gateway Charges */}
                                <div className="flex items-center justify-between py-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-700 font-medium">Payment Gateway Charges</span>
                                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                            ~{priceBreakdown.feePercentage.toFixed(2)}%
                                        </span>
                                    </div>
                                    <span className="text-gray-900 font-bold">₹{priceBreakdown.gatewayCharges}</span>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-dashed border-gray-200 my-2"></div>

                                {/* Total */}
                                <div className="flex items-center justify-between py-3 bg-gradient-to-r from-blue-50 to-white rounded-xl px-4 -mx-2">
                                    <span className="text-gray-900 font-bold text-lg">Total Payable</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl sm:text-4xl font-black text-blue-900">
                                            ₹{priceBreakdown.totalPayable}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Transparency Note */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold text-gray-700">No hidden charges.</span>{' '}
                                    Payment gateway charges are passed on transparently. Your registration fee of ₹{priceBreakdown?.registrationFee} goes directly towards the event.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Participant Info Summary */}
                    {registrationData && (
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                                    Participant Details
                                </h3>
                                <Link
                                    href={`/register/details?race=${registrationData.race}`}
                                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                                >
                                    Edit
                                </Link>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Name</span>
                                    <span className="text-gray-900 font-medium">{registrationData.fullName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Email</span>
                                    <span className="text-gray-900 font-medium truncate ml-4">{registrationData.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Phone</span>
                                    <span className="text-gray-900 font-medium">{registrationData.phone}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pay Button */}
                    <button
                        id="proceed-to-payment-btn"
                        onClick={handleProceedToPayment}
                        className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Pay ₹{priceBreakdown?.totalPayable}
                    </button>

                    {/* Security Badge */}
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Secured by Razorpay • 256-bit SSL Encryption
                    </div>

                    {/* Back Link */}
                    <div className="mt-6 text-center">
                        <Link
                            href={`/register/details?race=${registrationData?.race || '5KM'}`}
                            className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors inline-flex items-center gap-1"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Registration Form
                        </Link>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
