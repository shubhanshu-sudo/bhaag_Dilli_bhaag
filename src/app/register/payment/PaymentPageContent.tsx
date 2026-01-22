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

            <main className="flex-grow container mx-auto px-4 py-12 sm:py-16">
                <div className="max-w-2xl mx-auto">
                    {/* Loading State */}
                    {paymentStatus === 'loading' && (
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mb-4"></div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Loading...
                            </h1>
                        </div>
                    )}

                    {/* Processing State */}
                    {paymentStatus === 'processing' && (
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mb-4"></div>
                            <h1 className="text-2xl sm:text-3xl font-black text-blue-900 mb-3">
                                Processing Payment...
                            </h1>
                            <p className="text-gray-600">
                                Please complete the payment in the Razorpay window
                            </p>
                        </div>
                    )}

                    {/* Verifying State (waiting for webhook) */}
                    {paymentStatus === 'verifying' && (
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 animate-pulse">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black text-blue-900 mb-3">
                                Confirming Payment...
                            </h1>
                            <p className="text-gray-600 text-lg mb-4">
                                Please wait while we confirm your payment with the payment gateway
                            </p>
                            <p className="text-sm text-gray-500 mb-2">
                                This usually takes 5-10 seconds
                            </p>
                            <p className="text-xs text-gray-400">
                                Please do not close this page
                            </p>
                        </div>
                    )}

                    {/* Success State (webhook confirmed) */}
                    {paymentStatus === 'paid' && (
                        <>
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-black text-blue-900 mb-4">
                                    Payment Successful!
                                </h1>
                                <p className="text-gray-600 text-lg">
                                    Your registration is confirmed. See you at the race!
                                </p>
                            </div>

                            {/* Registration Details Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">
                                    Registration Confirmed
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 border-b border-gray-100">
                                        <span className="text-gray-600 font-medium">Registration ID:</span>
                                        <span className="font-semibold text-gray-900 text-sm break-all">{registrationId}</span>
                                    </div>

                                    {registrationData && (
                                        <>
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium">Name:</span>
                                                <span className="font-semibold text-gray-900">{registrationData.fullName}</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium">Email:</span>
                                                <span className="font-semibold text-gray-900 text-sm break-all">{registrationData.email}</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium">Race:</span>
                                                <span className="font-semibold text-blue-900">{registrationData.raceDistance} - {registrationData.raceTitle}</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium">Payment Status:</span>
                                                <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Paid</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3">
                                                <span className="text-gray-600 font-medium">Amount Paid:</span>
                                                <span className="font-bold text-3xl text-blue-900">₹{registrationData.amount}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Link href="/" className="flex-1">
                                    <button className="w-full bg-white hover:bg-gray-50 text-blue-900 font-bold py-3 px-6 rounded-xl border-2 border-blue-900 transition-all">
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
                                        <span>Race kit details will be sent closer to the event date</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Keep your Registration ID safe for future reference</span>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}

                    {/* Failed State */}
                    {paymentStatus === 'failed' && (
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black text-blue-900 mb-3">
                                Payment Failed
                            </h1>
                            <p className="text-gray-600 text-lg mb-6">
                                {errorMessage || 'Something went wrong with your payment'}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => setPaymentStatus('ready')}
                                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl transition-all"
                                >
                                    Try Again
                                </button>
                                <Link href="/register">
                                    <button className="bg-white hover:bg-gray-50 text-blue-900 font-bold py-3 px-8 rounded-xl border-2 border-blue-900 transition-all">
                                        Start Over
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
