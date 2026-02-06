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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Single Source of Truth for Payments
    const [paymentSummary, setPaymentSummary] = useState<{
        baseAmount: number;
        discountAmount: number;
        discountedAmount: number;
        gatewayCharges: number;
        finalPayableAmount: number;
        couponCode: string | null;
        discountPercent?: number;
    } | null>(null);

    // Coupon UI states
    const [couponCode, setCouponCode] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [couponError, setCouponError] = useState('');

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
                        setPaymentSummary(breakdownData.paymentSummary);

                        // RESTORE PERSISTED COUPON
                        if (parsedData.appliedCoupon) {
                            setCouponCode(parsedData.appliedCoupon);
                            // Auto-trigger validation to ensure it's still valid and get amounts
                            try {
                                const vResponse = await fetch(API_ENDPOINTS.VALIDATE_COUPON, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        couponCode: parsedData.appliedCoupon,
                                        raceCategory: parsedData.race
                                    }),
                                });
                                const vData = await vResponse.json();
                                if (vData.valid) {
                                    setPaymentSummary(vData.paymentSummary);
                                } else {
                                    // If no longer valid, clean up storage
                                    const currentData = JSON.parse(localStorage.getItem('registrationData') || '{}');
                                    delete currentData.appliedCoupon;
                                    localStorage.setItem('registrationData', JSON.stringify(currentData));
                                }
                            } catch (vErr) {
                                console.error('Failed to restore coupon:', vErr);
                            }
                        }
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

    // Source of Truth Verification Log
    useEffect(() => {
        if (paymentSummary) {
            console.log(`💰 [FRONTEND SOURCE OF TRUTH] UI Amount: ₹${paymentSummary.finalPayableAmount} (Base: ₹${paymentSummary.baseAmount}, Disc: ₹${paymentSummary.discountAmount}, Fee: ₹${paymentSummary.gatewayCharges})`);
        }
    }, [paymentSummary]);

    const handleApplyCoupon = async () => {
        if (!couponCode || !registrationData) return;

        setIsValidating(true);
        setCouponError('');

        try {
            const response = await fetch(API_ENDPOINTS.VALIDATE_COUPON, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    couponCode: couponCode.trim(),
                    raceCategory: registrationData.race
                }),
            });

            const data = await response.json();

            if (data.valid) {
                setPaymentSummary(data.paymentSummary);
                showToast('success', 'Coupon applied successfully!');

                // Update local storage with applied coupon for registration persistence
                const currentData = JSON.parse(localStorage.getItem('registrationData') || '{}');
                localStorage.setItem('registrationData', JSON.stringify({
                    ...currentData,
                    appliedCoupon: data.paymentSummary.couponCode
                }));
            } else {
                // EXPLICITLY clear any previous states on failure
                setCouponError(data.message || 'Invalid coupon code');

                // Re-fetch clean breakdown
                const response = await fetch(API_ENDPOINTS.PAYMENT.PRICE_BREAKDOWN(registrationData.race));
                const breakdownData = await response.json();
                if (breakdownData.success) {
                    setPaymentSummary(breakdownData.paymentSummary);
                }

                // Remove from local storage
                const currentData = JSON.parse(localStorage.getItem('registrationData') || '{}');
                delete currentData.appliedCoupon;
                localStorage.setItem('registrationData', JSON.stringify(currentData));

                showToast('error', data.message || 'Invalid coupon code');
            }
        } catch (err) {
            console.error('Coupon validation error:', err);
            setCouponError('Failed to validate coupon');
            showToast('error', 'Network error. Please try again.');
        } finally {
            setIsValidating(false);
        }
    };

    const handleRemoveCoupon = async () => {
        if (!registrationData) return;

        setIsLoading(true);
        try {
            // Re-fetch base price breakdown
            const response = await fetch(API_ENDPOINTS.PAYMENT.PRICE_BREAKDOWN(registrationData.race));
            const breakdownData = await response.json();

            if (breakdownData.success) {
                setPaymentSummary(breakdownData.paymentSummary);
                setCouponCode('');
                setCouponError('');

                // Remove from local storage
                const currentData = JSON.parse(localStorage.getItem('registrationData') || '{}');
                delete currentData.appliedCoupon;
                localStorage.setItem('registrationData', JSON.stringify(currentData));

                showToast('success', 'Coupon removed');
            }
        } catch (err) {
            console.error('Error removing coupon:', err);
            showToast('error', 'Failed to remove coupon');
        } finally {
            setIsLoading(false);
        }
    };

    const handleProceedToPayment = () => {
        if (!paymentSummary) {
            showToast('error', 'Payment summary not loaded. Please refresh.');
            return;
        }

        // Navigate to payment page with coupon if applied
        const couponParam = paymentSummary.couponCode ? `&coupon=${paymentSummary.couponCode}` : '';
        router.push(`/register/payment?rid=${registrationId}${couponParam}`);
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
                        {paymentSummary && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                                    Payment Breakdown
                                </h3>

                                {/* Registration Fee */}
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-gray-700 font-medium">Registration Fee</span>
                                    <span className="text-gray-900 font-bold">₹{paymentSummary.baseAmount}</span>
                                </div>

                                {/* Apply Coupon Section */}
                                <div className="py-4 border-y border-gray-50">
                                    {!paymentSummary.couponCode ? (
                                        <div className="space-y-3">
                                            <div className="flex gap-2">
                                                <div className="flex-grow relative">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Coupon Code"
                                                        value={couponCode}
                                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold uppercase placeholder:normal-case focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                        disabled={isValidating}
                                                    />
                                                </div>
                                                <button
                                                    onClick={handleApplyCoupon}
                                                    disabled={!couponCode || isValidating}
                                                    className="bg-blue-900 hover:bg-blue-800 text-white text-sm font-bold px-6 py-2 rounded-lg disabled:opacity-50 transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
                                                >
                                                    {isValidating ? (
                                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                        </svg>
                                                    ) : 'Apply'}
                                                </button>
                                            </div>
                                            {couponError && (
                                                <p className="text-xs font-bold text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {couponError}
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-xl animate-in zoom-in-95 duration-300">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-green-900 uppercase">{paymentSummary.couponCode} Applied!</p>
                                                    <p className="text-[10px] font-bold text-green-700 tracking-tight">You saved ₹{paymentSummary.discountAmount} ({paymentSummary.discountPercent}% OFF)</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleRemoveCoupon}
                                                className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors px-2 py-1"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Discount Row (Visible only if coupon applied) */}
                                {paymentSummary.couponCode && (
                                    <div className="flex items-center justify-between py-2 animate-in fade-in slide-in-from-right-2">
                                        <span className="text-green-600 font-bold flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                            </svg>
                                            Discount ({paymentSummary.couponCode} • {paymentSummary.discountPercent}%)
                                        </span>
                                        <span className="text-green-600 font-black">- ₹{paymentSummary.discountAmount}</span>
                                    </div>
                                )}

                                {/* Gateway Charges */}
                                <div className="flex items-center justify-between py-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-700 font-medium">Payment Gateway Charges</span>
                                    </div>
                                    <span className="text-gray-900 font-bold">₹{paymentSummary.gatewayCharges}</span>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-dashed border-gray-200 my-2"></div>

                                {/* Total */}
                                <div className="flex items-center justify-between py-3 bg-gradient-to-r from-blue-50 to-white rounded-xl px-4 -mx-2">
                                    <span className="text-gray-900 font-bold text-lg">Total Payable</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl sm:text-4xl font-black text-blue-900">
                                            ₹{paymentSummary.finalPayableAmount}
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
                                    Payment gateway charges are passed on transparently.
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
                        Pay ₹{paymentSummary?.finalPayableAmount || '...'}
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
