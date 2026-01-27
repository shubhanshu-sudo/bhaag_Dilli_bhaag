/**
 * Razorpay Integration Utility
 * 
 * This utility handles Razorpay checkout integration with proper TypeScript types
 * and security best practices.
 */

import { API_ENDPOINTS } from '@/config/api';

// Razorpay types
interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayResponse) => void;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    theme?: {
        color?: string;
    };
    modal?: {
        ondismiss?: () => void;
    };
}

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

interface CreateOrderResponse {
    success: boolean;
    orderId: string;
    amount: number;
    baseAmount: number;      // Registration fee (what merchant receives)
    gatewayFee: number;      // Payment gateway charges  
    chargedAmount: number;   // Total charged to user
    currency: string;
    receipt: string;
    raceCategory: string;
    message?: string;
}

interface VerifyPaymentResponse {
    success: boolean;
    message: string;
    registrationId: string;
    paymentStatus: string;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

/**
 * Load Razorpay script dynamically
 */
export const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
        // Check if script is already loaded
        if (window.Razorpay) {
            resolve(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

/**
 * Create Razorpay order on backend
 * 
 * @param raceCategory - Race category (2KM, 5KM, 10KM)
 * @param registrationId - Registration ID to link payment
 * @returns Order details from backend
 */
export const createRazorpayOrder = async (
    raceCategory: string,
    registrationId: string
): Promise<CreateOrderResponse> => {
    const response = await fetch(API_ENDPOINTS.PAYMENT.CREATE_ORDER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            raceCategory,
            registrationId // CRITICAL: Send registrationId to store in order notes
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to create payment order');
    }

    return data;
};

/**
 * Verify payment on backend
 * 
 * @param paymentData - Payment response from Razorpay
 * @param registrationId - Registration ID
 * @returns Verification response
 */
export const verifyRazorpayPayment = async (
    paymentData: RazorpayResponse,
    registrationId: string
): Promise<VerifyPaymentResponse> => {
    const response = await fetch(API_ENDPOINTS.PAYMENT.VERIFY_PAYMENT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            razorpay_order_id: paymentData.razorpay_order_id,
            razorpay_payment_id: paymentData.razorpay_payment_id,
            razorpay_signature: paymentData.razorpay_signature,
            registrationId,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Payment verification failed');
    }

    return data;
};

/**
 * Open Razorpay checkout
 * 
 * @param options - Razorpay checkout options
 */
export const openRazorpayCheckout = (options: RazorpayOptions): void => {
    if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded');
    }

    const razorpay = new window.Razorpay(options);
    razorpay.open();
};

/**
 * Complete payment flow
 * 
 * This is the main function to handle the entire payment flow:
 * 1. Load Razorpay script
 * 2. Create order on backend (with registrationId in notes)
 * 3. Open Razorpay checkout
 * 4. Verify payment on backend
 * 
 * @param params - Payment parameters
 * @returns Promise that resolves when payment is complete
 */
export const initiateRazorpayPayment = async (params: {
    raceCategory: string;
    registrationId: string;
    amount: number;
    userDetails: {
        name: string;
        email: string;
        phone: string;
    };
    onOrderCreated?: () => void;
    onSuccess: (verificationResponse: VerifyPaymentResponse) => void;
    onFailure: (error: Error) => void;
    onDismiss?: () => void;
}): Promise<void> => {
    try {
        // Step 1: Load Razorpay script
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            throw new Error('Failed to load Razorpay SDK. Please check your internet connection.');
        }

        // Step 2: Create order on backend with registrationId
        const orderData = await createRazorpayOrder(
            params.raceCategory,
            params.registrationId // Pass registrationId to store in order notes
        );

        // Notify that order is created (transition to 'processing' state)
        if (params.onOrderCreated) {
            params.onOrderCreated();
        }

        // Step 3: Get Razorpay key from environment
        const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        if (!razorpayKey) {
            throw new Error('Razorpay key not configured');
        }

        // Step 4: Open Razorpay checkout
        // Note: Backend returns chargedAmount which already includes gateway fee
        const options: RazorpayOptions = {
            key: razorpayKey,
            amount: orderData.chargedAmount * 100, // Convert to paise (chargedAmount includes gateway fee)
            currency: orderData.currency,
            name: 'Bhaag Dilli Bhaag 2026',
            description: `${params.raceCategory} Race Registration`,
            order_id: orderData.orderId,
            handler: async (response: RazorpayResponse) => {
                try {
                    // Step 5: Verify payment on backend
                    const verificationResponse = await verifyRazorpayPayment(
                        response,
                        params.registrationId
                    );
                    params.onSuccess(verificationResponse);
                } catch (error) {
                    params.onFailure(
                        error instanceof Error ? error : new Error('Payment verification failed')
                    );
                }
            },
            prefill: {
                name: params.userDetails.name,
                email: params.userDetails.email,
                contact: params.userDetails.phone,
            },
            theme: {
                color: '#1e3a8a', // Blue-900 to match the theme
            },
            modal: {
                ondismiss: () => {
                    if (params.onDismiss) {
                        params.onDismiss();
                    }
                },
            },
        };

        openRazorpayCheckout(options);
    } catch (error) {
        params.onFailure(
            error instanceof Error ? error : new Error('Failed to initiate payment')
        );
    }
};
