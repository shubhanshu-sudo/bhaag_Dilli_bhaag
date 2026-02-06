'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { initiateRazorpayPayment } from '@/utils/razorpay';
import { useToast } from '@/contexts/ToastContext';
import { API_ENDPOINTS } from '@/config/api';

type PaymentStatus = 'pending' | 'paid' | 'failed' | 'checking';

interface RetryPaymentContentProps {
    registrationId: string;
}

export function RetryPaymentContent({ registrationId }: RetryPaymentContentProps) {
    const router = useRouter();
    const { showToast } = useToast();
    const [status, setStatus] = useState<PaymentStatus>('checking');
    const [registrationData, setRegistrationData] = useState<any>(null);
    const [isRetrying, setIsRetrying] = useState(false);

    // Check payment status on load
    useEffect(() => {
        const fetchStatusAndData = async () => {
            try {
                // Fetch both status and registration data in parallel
                const [statusRes, regRes] = await Promise.all([
                    fetch(`${API_ENDPOINTS.PAYMENT.CHECK_STATUS}/${registrationId}`),
                    fetch(`${API_ENDPOINTS.REGISTER}/${registrationId}`)
                ]);

                if (!statusRes.ok || !regRes.ok) {
                    throw new Error('Failed to fetch data from server');
                }

                const [statusData, regData] = await Promise.all([
                    statusRes.json(),
                    regRes.json()
                ]);

                // Check for already paid status
                if (statusData.success && statusData.paymentStatus === 'paid') {
                    showToast('success', 'Payment already confirmed!');
                    router.push(`/register/payment?rid=${registrationId}`);
                    return;
                }

                if (regData.success) {
                    setRegistrationData(regData.data);
                } else {
                    showToast('error', 'Registration details not found.');
                    router.push('/register');
                    return;
                }

                // Final state update to remove loader
                setStatus(statusData.paymentStatus || 'pending');

            } catch (error) {
                console.error('Error fetching retry data:', error);
                setStatus('failed');
                showToast('error', 'Failed to load retry session. Please check your connection.');
            }
        };

        if (registrationId) {
            fetchStatusAndData();
        }
    }, [registrationId, router, showToast]);

    const handleRetry = async () => {
        if (!registrationData) return;

        setIsRetrying(true);

        await initiateRazorpayPayment({
            raceCategory: registrationData.race,
            registrationId: registrationId,
            couponCode: registrationData.couponCode, // Pass existing coupon if any
            userDetails: {
                name: registrationData.name, // Note: backend returns 'name'
                email: registrationData.email,
                phone: registrationData.phone,
            },
            onOrderCreated: () => {
                // Redirect back to payment page which handles the processing/verifying states
                router.push(`/register/payment?rid=${registrationId}`);
            },
            onSuccess: () => {
                router.push(`/register/payment?rid=${registrationId}`);
            },
            onFailure: (error) => {
                setIsRetrying(false);
                showToast('error', `Payment failed: ${error.message}`);
                setStatus('failed');
            },
            onDismiss: () => {
                setIsRetrying(false);
                setStatus('pending');
                showToast('info', 'Payment not completed. You can safely retry.');
            },
        });
    };

    if (status === 'checking') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium animate-pulse">Checking status...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-20 sm:py-28 animate-in fade-in duration-700">
                <div className="max-w-xl mx-auto text-center">

                    {/* Status Badge */}
                    <div className="mb-6 animate-in slide-in-from-top-2 duration-500">
                        <div className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                            Action Required
                        </div>
                    </div>

                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-lg transform transition-transform hover:scale-110 ${status === 'failed' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                        {status === 'failed' ? (
                            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-black text-blue-900 mb-4 tracking-tight">
                        {status === 'failed' ? 'Payment Failed' : 'Payment Interrupted'}
                    </h1>

                    <p className="text-gray-600 mb-10 leading-relaxed max-w-md mx-auto text-lg px-4">
                        {status === 'failed'
                            ? "Your last payment attempt was unsuccessful. You can retry now to secure your slot before they fill up!"
                            : "It looks like your payment session was interrupted. No worries, your registration data is safe—you can retry below."}
                    </p>

                    {registrationData && (
                        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-10 border border-blue-50 text-left relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>

                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-50 pb-2">Registration Summary</h3>

                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between items-center group/item">
                                    <span className="text-gray-500 font-medium">Participant</span>
                                    <span className="text-blue-900 font-bold bg-blue-50 px-3 py-1 rounded-lg">{registrationData.name}</span>
                                </div>
                                <div className="flex justify-between items-center group/item">
                                    <span className="text-gray-500 font-medium">Race Category</span>
                                    <span className="text-blue-900 font-bold">{registrationData.race}</span>
                                </div>
                                <div className="flex justify-between items-center pt-6 mt-2 border-t border-gray-100">
                                    <span className="text-gray-800 font-black text-lg">Total Payable</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-blue-900">₹{registrationData.amount}</span>
                                        <span className="text-gray-400 font-bold text-sm">.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch px-4">
                        <button
                            onClick={handleRetry}
                            disabled={isRetrying}
                            className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-12 py-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
                        >
                            {isRetrying ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Re-opening...
                                </>
                            ) : (
                                <>
                                    <span>Retry Payment</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                        <Link href="/" className="flex">
                            <button className="flex-1 min-w-[160px] bg-white hover:bg-gray-50 text-gray-700 font-bold px-8 py-4 rounded-2xl border-2 border-gray-100 hover:border-gray-300 transition-all shadow-sm hover:shadow-md">
                                Cancel & Exit
                            </button>
                        </Link>
                    </div>

                    <div className="mt-12 p-6 bg-blue-50/30 rounded-2xl border border-blue-50/50 mx-4">
                        <p className="text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2">
                            <span className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.9L10 9.103l7.834-4.203A2 2 0 0016 3H4a2 2 0 00-1.834 1.9zM18 6.834V14a2 2 0 01-2 2H4a2 2 0 01-2-2V6.834l8 4.303 8-4.303z" clipRule="evenodd" />
                                </svg>
                                Need help? Reach out at
                            </span>
                            <span className="font-bold text-blue-600">support@bhagdelhibhag.com</span>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
