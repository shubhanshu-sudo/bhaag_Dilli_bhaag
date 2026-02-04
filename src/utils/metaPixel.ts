// Meta Pixel Event Tracking Utility
// Use this to track custom events throughout your application

declare global {
    interface Window {
        fbq: any;
    }
}

export const trackEvent = (eventName: string, data?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventName, data);
    }
};

// Predefined event tracking functions for common actions

export const trackPageView = () => {
    trackEvent('PageView');
};

export const trackRegistrationStart = (raceType: string) => {
    trackEvent('InitiateCheckout', {
        content_name: `${raceType} Registration Started`,
        content_category: 'race_registration',
    });
};

export const trackRegistrationComplete = (raceType: string, amount: number) => {
    trackEvent('CompleteRegistration', {
        value: amount,
        currency: 'INR',
        content_name: `${raceType} Registration`,
        content_category: 'race_registration',
    });
};

export const trackPaymentSuccess = (raceType: string, amount: number, orderId: string) => {
    trackEvent('Purchase', {
        value: amount,
        currency: 'INR',
        content_type: 'product',
        content_ids: [orderId],
        content_name: `${raceType} Race`,
    });
};

export const trackAddToCart = (raceType: string, amount: number) => {
    trackEvent('AddToCart', {
        content_name: `${raceType} Race`,
        value: amount,
        currency: 'INR',
    });
};

export const trackLead = (email: string) => {
    trackEvent('Lead', {
        content_name: 'Email Submission',
        content_category: 'lead_generation',
    });
};

export const trackViewContent = (contentName: string) => {
    trackEvent('ViewContent', {
        content_name: contentName,
    });
};

export const trackSearch = (searchTerm: string) => {
    trackEvent('Search', {
        search_string: searchTerm,
    });
};
