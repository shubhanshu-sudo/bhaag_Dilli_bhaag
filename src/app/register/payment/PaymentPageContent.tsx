'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { initiateRazorpayPayment } from '@/utils/razorpay';
import { useToast } from '@/contexts/ToastContext';
import { API_ENDPOINTS } from '@/config/api';

type PaymentStatus = 'loading' | 'ready' | 'processing' | 'verifying' | 'paid' | 'failed';

export function PaymentPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { showToast } = useToast();

    const [registrationId, setRegistrationId] = useState('');
    const [registrationData, setRegistrationData] = useState<any>(null);
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('loading');
    const [errorMessage, setErrorMessage] = useState('');
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Poll payment status
    const checkPaymentStatus = async (regId: string) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.PAYMENT.CHECK_STATUS}/${regId}`);
            const data = await response.json();

            if (data.success) {
                if (data.paymentStatus === 'paid') {
                    // Payment confirmed by webhook - ONLY source of truth
                    if (pollingIntervalRef.current) {
                        clearInterval(pollingIntervalRef.current);
                        pollingIntervalRef.current = null;
                    }
                    setPaymentStatus('paid');
                    showToast('success', 'Payment confirmed! Your registration is complete.');

                    // Clear localStorage
                    localStorage.removeItem('registrationData');
                    localStorage.removeItem('registrationId');
                } else if (data.paymentStatus === 'failed') {
                    // Payment failed
                    if (pollingIntervalRef.current) {
                        clearInterval(pollingIntervalRef.current);
                        pollingIntervalRef.current = null;
                    }
                    setPaymentStatus('failed');
                    setErrorMessage('Payment verification failed');
                    showToast('error', 'Payment failed. Please try again.');
                }
                // If status is 'pending', keep polling (do nothing)
            }
        } catch (error) {
            console.error('Error checking payment status:', error);
            // Don't stop polling on network errors
        }
    };

    // Start polling for payment confirmation
    const startPolling = (regId: string) => {
        // Check immediately
        checkPaymentStatus(regId);

        // Poll every 3 seconds indefinitely until webhook confirms
        // NO TIMEOUT - keep polling until DB shows 'paid' or 'failed'
        pollingIntervalRef.current = setInterval(() => {
            checkPaymentStatus(regId);
        }, 3000); // Poll every 3 seconds
    };

    // Cleanup polling on unmount
    useEffect(() => {
        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // Get registration ID from URL parameter 'rid' or localStorage
        const rid = searchParams.get('rid') || localStorage.getItem('registrationId') || '';
        const data = localStorage.getItem('registrationData');

        if (!rid) {
            showToast('error', 'No registration found. Please register first.');
            router.push('/register');
            return;
        }

        setRegistrationId(rid);

        if (data) {
            try {
                const parsedData = JSON.parse(data);
                setRegistrationData(parsedData);
                setPaymentStatus('ready');
            } catch (e) {
                console.error('Failed to parse registration data:', e);
                setPaymentStatus('failed');
                setErrorMessage('Failed to load registration data');
            }
        } else {
            setPaymentStatus('failed');
            setErrorMessage('Registration data not found');
        }
    }, [searchParams, router, showToast]);

    const handlePayment = async () => {
        if (!registrationData || !registrationId) {
            showToast('error', 'Missing registration information');
            return;
        }

        setPaymentStatus('processing');

        await initiateRazorpayPayment({
            raceCategory: registrationData.race,
            registrationId: registrationId,
            amount: registrationData.amount,
            userDetails: {
                name: registrationData.fullName,
                email: registrationData.email,
                phone: registrationData.phone,
            },
            onSuccess: (verificationResponse) => {
                // Signature verified, now wait for webhook
                setPaymentStatus('verifying');
                showToast('success', 'Payment verified! Awaiting confirmation...');

                // Start polling for webhook confirmation
                startPolling(registrationId);
            },
            onFailure: (error) => {
                setPaymentStatus('failed');
                setErrorMessage(error.message);
                showToast('error', `Payment failed: ${error.message}`);
            },
            onDismiss: () => {
                if (paymentStatus === 'processing') {
                    setPaymentStatus('ready');
                    showToast('info', 'Payment cancelled. You can try again.');
                }
            },
        });
    };

    // Auto-initiate payment when ready
    useEffect(() => {
        if (paymentStatus === 'ready' && registrationData) {
            // Small delay to ensure UI is ready
            const timer = setTimeout(() => {
                handlePayment();
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [paymentStatus, registrationData]);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <Navbar />

            {/* Main content with proper top spacing to clear navbar */}
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-28">
                <div className="max-w-3xl mx-auto">
                    {/* Loading State */}
                    {paymentStatus === 'loading' && (
                        <div className="text-center py-12 sm:py-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full mb-4 sm:mb-6 animate-pulse">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 px-4">
                                Preparing Payment...
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600 px-4">
                                Please wait while we set up your payment
                            </p>
                        </div>
                    )}

                    {/* Processing State */}
                    {paymentStatus === 'processing' && (
                        <div className="text-center py-12 sm:py-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full mb-4 sm:mb-6 animate-pulse">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-blue-900 mb-2 sm:mb-3 px-4">
                                Processing Payment...
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 mb-2 px-4">
                                Please complete the payment in the Razorpay window
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 px-4">
                                Do not close this page
                            </p>
                        </div>
                    )}

                    {/* Verifying State */}
                    {paymentStatus === 'verifying' && (
                        <div className="text-center py-12 sm:py-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full mb-4 sm:mb-6 animate-pulse">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-blue-900 mb-3 sm:mb-4 px-4">
                                Confirming Payment...
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 mb-2 px-4">
                                Please wait while we confirm your payment with the payment gateway
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 mb-2 px-4">
                                This usually takes 5-10 seconds
                            </p>
                            <p className="text-xs text-gray-400 px-4">
                                Please do not close this page
                            </p>
                        </div>
                    )}

                    {/* Success State (webhook confirmed) */}
                    {paymentStatus === 'paid' && (
                        <>
                            {/* Success Header - with top padding to clear navbar */}
                            <div className="text-center mb-6 sm:mb-10 pt-4 sm:pt-8 px-4">
                                <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full mb-4 sm:mb-6 shadow-lg">
                                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-900 mb-3 sm:mb-4">
                                    Payment Successful!
                                </h1>
                                <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-md mx-auto">
                                    Your registration is confirmed. See you at the race!
                                </p>
                            </div>

                            {/* Registration Details Card */}
                            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 border border-gray-100">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                        Registration Details
                                    </h2>
                                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 text-green-700 rounded-full self-start sm:self-auto">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-xs sm:text-sm font-bold">Confirmed</span>
                                    </div>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    {/* Registration ID */}
                                    <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-100">
                                        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                                            Registration ID
                                        </div>
                                        <div className="font-mono text-xs sm:text-sm font-bold text-blue-900 break-all">
                                            {registrationId}
                                        </div>
                                    </div>

                                    {registrationData && (
                                        <>
                                            {/* Name */}
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 py-3 sm:py-4 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium text-xs sm:text-sm">Name</span>
                                                <span className="font-bold text-gray-900 text-base sm:text-lg">{registrationData.fullName}</span>
                                            </div>

                                            {/* Email */}
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 py-3 sm:py-4 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium text-xs sm:text-sm">Email</span>
                                                <span className="font-semibold text-gray-900 text-xs sm:text-sm break-all">{registrationData.email}</span>
                                            </div>

                                            {/* Race Category */}
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 py-3 sm:py-4 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium text-xs sm:text-sm">Race Category</span>
                                                <span className="font-bold text-blue-900 text-base sm:text-lg">
                                                    {registrationData.raceDistance} - {registrationData.raceTitle}
                                                </span>
                                            </div>

                                            {/* Amount Paid */}
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 sm:py-4 bg-gradient-to-r from-blue-50 to-transparent rounded-xl px-3 sm:px-4 -mx-3 sm:-mx-4">
                                                <span className="text-gray-600 font-medium text-xs sm:text-sm">Amount Paid</span>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="font-black text-3xl sm:text-4xl text-blue-900">₹{registrationData.amount}</span>
                                                    <span className="text-gray-500 text-xs sm:text-sm">.00</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Expandable Payment Details */}
                                <details className="mt-4 sm:mt-6 group">
                                    <summary className="cursor-pointer list-none flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                                        <span className="text-xs sm:text-sm font-semibold text-gray-700">View Payment Details</span>
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 rounded-xl space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                        <div className="flex justify-between items-center gap-2">
                                            <span className="text-gray-600">Razorpay Payment ID:</span>
                                            <span className="font-mono text-xs text-gray-900 break-all">pay_xxxxx</span>
                                        </div>
                                        <div className="flex justify-between items-center gap-2">
                                            <span className="text-gray-600">Razorpay Order ID:</span>
                                            <span className="font-mono text-xs text-gray-900 break-all">order_xxxxx</span>
                                        </div>
                                        <div className="flex justify-between items-center gap-2">
                                            <span className="text-gray-600">Payment Date:</span>
                                            <span className="text-gray-900">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </details>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4 sm:px-0">
                                <Link href="/" className="flex-1">
                                    <button className="w-full bg-blue-900 hover:bg-blue-800 text-white text-sm sm:text-base font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                                        Back to Home
                                    </button>
                                </Link>
                                <button
                                    onClick={() => window.print()}
                                    className="flex-1 bg-white hover:bg-gray-50 text-blue-900 text-sm sm:text-base font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-blue-900 shadow-md hover:shadow-lg transition-all"
                                >
                                    Print Receipt
                                </button>
                            </div>

                            {/* What's Next Section */}
                            <div className="mt-6 sm:mt-8 bg-blue-50 rounded-2xl p-4 sm:p-6 border border-blue-100">
                                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4">
                                    📧 What's Next?
                                </h3>
                                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
                                    <li className="flex items-start gap-2 sm:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>A confirmation email with your invoice has been sent to your registered email address</span>
                                    </li>
                                    <li className="flex items-start gap-2 sm:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>You will receive race kit collection details closer to the event date</span>
                                    </li>
                                    <li className="flex items-start gap-2 sm:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Keep your Registration ID safe for future reference</span>
                                    </li>
                                    <li className="flex items-start gap-2 sm:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Check your email regularly for event updates and important announcements</span>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}

                    {/* Failed State */}
                    {paymentStatus === 'failed' && (
                        <div className="text-center py-12 sm:py-20 px-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full mb-4 sm:mb-6">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-red-900 mb-3 sm:mb-4">
                                Payment Failed
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">
                                {errorMessage || 'Something went wrong with your payment. Please try again.'}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
                                <Link href="/register" className="flex-1">
                                    <button className="w-full bg-blue-900 hover:bg-blue-800 text-white text-sm sm:text-base font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all">
                                        Try Again
                                    </button>
                                </Link>
                                <Link href="/" className="flex-1">
                                    <button className="w-full bg-white hover:bg-gray-50 text-blue-900 text-sm sm:text-base font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-blue-900 shadow-md hover:shadow-lg transition-all">
                                        Back to Home
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
