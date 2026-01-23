'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { initiateRazorpayPayment } from '@/utils/razorpay';
import { useToast } from '@/contexts/ToastContext';
import { API_ENDPOINTS } from '@/config/api';

type PaymentStatus = 'idle' | 'opening_gateway' | 'processing' | 'verifying' | 'success' | 'failed' | 'cancelled';

export function PaymentPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { showToast } = useToast();

    const [registrationId, setRegistrationId] = useState('');
    const [registrationData, setRegistrationData] = useState<any>(null);
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentIds, setPaymentIds] = useState({ paymentId: '', orderId: '' });
    const [isDownloading, setIsDownloading] = useState(false);
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
                    setPaymentStatus('success');
                    setPaymentIds({
                        paymentId: data.razorpayPaymentId || 'N/A',
                        orderId: data.razorpayOrderId || 'N/A'
                    });
                    showToast('success', 'Payment confirmed! Your registration is complete.');

                    // Clear localStorage
                    localStorage.removeItem('registrationData');
                    localStorage.removeItem('registrationId');
                    localStorage.removeItem('prefillData');
                    localStorage.removeItem('registrationExists');
                    localStorage.removeItem('pendingRegistrationId');
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
                setPaymentStatus('idle');
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

        setPaymentStatus('opening_gateway');

        await initiateRazorpayPayment({
            raceCategory: registrationData.race,
            registrationId: registrationId,
            amount: registrationData.amount,
            userDetails: {
                name: registrationData.fullName,
                email: registrationData.email,
                phone: registrationData.phone,
            },
            onOrderCreated: () => {
                setPaymentStatus('processing');
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
                // Handle user closing the modal
                setPaymentStatus('cancelled');
                showToast('info', 'Payment not completed. You can safely retry.');
            },
        });
    };

    // Download Invoice
    const handleDownloadInvoice = async () => {
        if (!registrationId) return;

        setIsDownloading(true);
        try {
            // Use standard browser download by opening the URL in a new tab or using an anchor tag
            const url = API_ENDPOINTS.PAYMENT.DOWNLOAD_INVOICE(registrationId);

            // Create a temporary link and click it to trigger download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice_${registrationId}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast('success', 'Fetching your invoice...');
        } catch (error) {
            console.error('Download error:', error);
            showToast('error', 'Failed to start download. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    // Retry payment from failed state
    const handleRetry = () => {
        setPaymentStatus('idle');
        setErrorMessage('');
    };

    // Safety timeout to prevent stuck loading
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (paymentStatus === 'opening_gateway' || paymentStatus === 'processing') {
            timeout = setTimeout(() => {
                setPaymentStatus('cancelled');
                showToast('error', 'Payment session expired. Please retry.');
            }, 90000); // 90 seconds
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [paymentStatus, registrationId, router, showToast]);

    // Auto-initiate payment when loaded
    useEffect(() => {
        if (paymentStatus === 'idle' && registrationData) {
            // Small delay to ensure UI is ready
            const timer = setTimeout(() => {
                handlePayment();
            }, 800); // Slightly longer delay for better feel

            return () => clearTimeout(timer);
        }
    }, [paymentStatus, registrationData]);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <Navbar />

            {/* Main content with proper top spacing to clear navbar */}
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-28" id="payment-main-content">
                <div className="max-w-3xl mx-auto">

                    {/* Step Indicator */}
                    {(paymentStatus === 'opening_gateway' || paymentStatus === 'processing' || paymentStatus === 'verifying') && (
                        <div className="text-center mb-8 animate-fade-in">
                            <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                Step 2 of 2
                            </div>
                        </div>
                    )}

                    {/* Opening Gateway State */}
                    {paymentStatus === 'opening_gateway' && (
                        <div className="text-center py-12 sm:py-20 animate-in fade-in duration-500">
                            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full mb-4 sm:mb-6 animate-pulse">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 px-4">
                                Preparing Payment...
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600 px-4">
                                Please wait while we set up your secure payment session
                            </p>
                        </div>
                    )}

                    {/* Idle / Cancelled State */}
                    {(paymentStatus === 'idle' || paymentStatus === 'cancelled') && (
                        <div className="text-center py-12 sm:py-20 animate-in fade-in zoom-in-95 duration-500">
                            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full mb-6">
                                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black text-blue-900 mb-4">
                                {paymentStatus === 'cancelled' ? 'Payment Cancelled' : 'Ready to Pay'}
                            </h1>
                            <p className="text-gray-600 mb-8 max-w-md mx-auto px-4">
                                {paymentStatus === 'cancelled'
                                    ? 'Payment not completed. You can safely retry.'
                                    : 'Please click the button below to initiate the secure payment process.'}
                            </p>
                            <button
                                id="initiate-payment-btn"
                                onClick={handlePayment}
                                className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-10 py-4 rounded-full shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-xl active:scale-95"
                            >
                                {paymentStatus === 'cancelled' ? 'Try Again' : 'Pay Now'}
                            </button>
                        </div>
                    )}

                    {/* Processing State */}
                    {paymentStatus === 'processing' && (
                        <div className="text-center py-12 sm:py-20 animate-in fade-in duration-500">
                            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full mb-4 sm:mb-6 animate-pulse">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-blue-900 mb-2 sm:mb-3 px-4">
                                Waiting for confirmation...
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 mb-2 px-4">
                                Waiting for payment confirmation. Please do not close this page.
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 px-4 mt-4">
                                Finalizing your registration
                            </p>
                        </div>
                    )}

                    {/* Verifying State */}
                    {paymentStatus === 'verifying' && (
                        <div className="text-center py-12 sm:py-20 animate-in fade-in duration-500">
                            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full mb-4 sm:mb-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-blue-900 mb-3 sm:mb-4 px-4">
                                Confirming Your Slot...
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 mb-4 px-4">
                                Your payment was successful. We are now finalizing your registration.
                            </p>
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 max-w-sm mx-auto mb-6 shadow-sm">
                                <p className="text-sm text-blue-800 font-medium italic">
                                    "Please stay on this page. Do not refresh or go back."
                                </p>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 px-4">
                                This usually takes 5-10 seconds
                            </p>
                        </div>
                    )}

                    {/* Success State */}
                    {paymentStatus === 'success' && (
                        <div className="animate-in fade-in zoom-in-95 duration-700">
                            {/* Success Header */}
                            <div className="text-center mb-6 sm:mb-10 pt-4 px-4">
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
                            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 opacity-50"></div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6 relative z-10">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                        Registration Details
                                    </h2>
                                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 text-green-700 rounded-full self-start sm:self-auto shadow-sm">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Confirmed</span>
                                    </div>
                                </div>

                                <div className="space-y-3 sm:space-y-4 relative z-10">
                                    {/* Registration ID */}
                                    <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-100 shadow-inner">
                                        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                                            Registration ID
                                        </div>
                                        <div className="font-mono text-xs sm:text-sm font-bold text-blue-900 break-all select-all">
                                            {registrationId}
                                        </div>
                                    </div>

                                    {registrationData && (
                                        <>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="flex flex-col py-2 border-b border-gray-50">
                                                    <span className="text-gray-500 font-medium text-xs">Name</span>
                                                    <span className="font-bold text-gray-900 truncate">{registrationData.fullName}</span>
                                                </div>
                                                <div className="flex flex-col py-2 border-b border-gray-50">
                                                    <span className="text-gray-500 font-medium text-xs">Email</span>
                                                    <span className="font-semibold text-gray-900 truncate">{registrationData.email}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 py-3 border-b border-gray-50">
                                                <span className="text-gray-500 font-medium text-xs sm:text-sm">Race Category</span>
                                                <span className="font-bold text-blue-900 text-sm sm:text-base">
                                                    {registrationData.raceDistance} - {registrationData.raceTitle}
                                                </span>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-4 bg-gradient-to-r from-blue-50 to-white rounded-xl px-4 mt-4 border border-blue-50">
                                                <span className="text-gray-600 font-bold text-sm">Amount Paid</span>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="font-black text-3xl sm:text-4xl text-blue-900">₹{registrationData.amount}</span>
                                                    <span className="text-gray-500 text-xs sm:text-sm font-bold">.00</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <details className="mt-6 group relative z-10">
                                    <summary className="cursor-pointer list-none flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all border border-gray-100 select-none">
                                        <span className="text-xs sm:text-sm font-bold text-gray-700">Show Transaction Details</span>
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <div className="mt-3 p-4 bg-gray-50 rounded-xl space-y-3 text-xs sm:text-sm border border-gray-100 animate-in slide-in-from-top-2 duration-300">
                                        <div className="flex justify-between items-center gap-4">
                                            <span className="text-gray-500">Razorpay Payment ID</span>
                                            <span className="font-mono text-gray-900 break-all select-all font-medium">{paymentIds.paymentId}</span>
                                        </div>
                                        <div className="flex justify-between items-center gap-4">
                                            <span className="text-gray-500">Razorpay Order ID</span>
                                            <span className="font-mono text-gray-900 break-all select-all font-medium">{paymentIds.orderId}</span>
                                        </div>
                                        <div className="flex justify-between items-center gap-4">
                                            <span className="text-gray-500">Payment Date</span>
                                            <span className="text-gray-900 font-medium">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                </details>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Link href="/" className="flex-1">
                                    <button
                                        id="back-home-success-btn"
                                        className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
                                    >
                                        Back to Home
                                    </button>
                                </Link>
                                <button
                                    id="print-receipt-btn"
                                    onClick={handleDownloadInvoice}
                                    disabled={isDownloading}
                                    className="flex-1 bg-white hover:bg-gray-50 text-blue-900 font-bold py-4 rounded-xl border-2 border-blue-900 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isDownloading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Download Invoice
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* What's Next Section */}
                            <div className="bg-blue-50/50 rounded-2xl p-6 sm:p-8 border border-blue-100 flex flex-col gap-4">
                                <h3 className="text-lg font-black text-blue-900 flex items-center gap-2">
                                    <span className="text-2xl">📧</span> What's Next?
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                    {[
                                        'A confirmation email with your official invoice has been dispatched.',
                                        'Race kit (BIB, T-shirt) collection details will be sent via SMS/Email soon.',
                                        'Keep your Registration ID and email handy for race day entry.',
                                        'Check your spam folder if you don’t see our email within 10 minutes.'
                                    ].map((text, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Failed State */}
                    {paymentStatus === 'failed' && (
                        <div className="text-center py-12 sm:py-20 px-4 animate-in fade-in zoom-in-95 duration-500">
                            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full mb-6 shadow-sm">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-red-900 mb-3 sm:mb-4">
                                Payment Failed
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                                {errorMessage || 'We couldn\'t process your payment. This could be due to a technical error or insufficient funds.'}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                                <button
                                    id="retry-payment-failed-btn"
                                    onClick={handleRetry}
                                    className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
                                >
                                    Retry Payment
                                </button>
                                <Link href="/register" className="flex-1">
                                    <button
                                        id="edit-details-failed-btn"
                                        className="w-full bg-white hover:bg-gray-50 text-blue-900 font-bold py-4 rounded-xl border-2 border-blue-900 shadow-md hover:shadow-lg transition-all"
                                    >
                                        Edit Details
                                    </button>
                                </Link>
                                <Link href="/" className="flex-1">
                                    <button
                                        id="back-home-failed-btn"
                                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-xl transition-all"
                                    >
                                        Exit
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
