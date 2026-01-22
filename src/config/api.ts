/**
 * API Configuration
 * 
 * Centralized configuration for all API endpoints.
 * Uses environment variables to support different environments (local, staging, production).
 */

/**
 * Get the base API URL from environment variables
 * Falls back to localhost for development if not set
 */
const getApiBaseUrl = (): string => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiUrl) {
        console.warn(
            'NEXT_PUBLIC_API_BASE_URL is not defined. Using default localhost URL. ' +
            'Please set this environment variable for production.'
        );
        return 'http://localhost:5000';
    }

    return apiUrl;
};

/**
 * API Base URL - Use this for all API calls
 */
export const API_BASE_URL = getApiBaseUrl();

/**
 * API Endpoints
 * All API endpoints are defined here for easy maintenance
 */
export const API_ENDPOINTS = {
    // Public endpoints
    REGISTER: `${API_BASE_URL}/api/register`,

    // Payment endpoints
    PAYMENT: {
        CREATE_ORDER: `${API_BASE_URL}/api/payments/create-order`,
        VERIFY_PAYMENT: `${API_BASE_URL}/api/payments/verify-payment`,
        CHECK_STATUS: `${API_BASE_URL}/api/payments/status`,
    },

    // Admin endpoints
    ADMIN: {
        LOGIN: `${API_BASE_URL}/api/admin/login`,
        REGISTRATIONS: `${API_BASE_URL}/api/admin/registrations`,
    },
} as const;

/**
 * Utility function to build API URLs with query parameters
 */
export const buildApiUrl = (endpoint: string, params?: Record<string, string | number>): string => {
    if (!params) return endpoint;

    const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
        }, {} as Record<string, string>)
    ).toString();

    return `${endpoint}?${queryString}`;
};

/**
 * Check if API is configured correctly
 */
export const isApiConfigured = (): boolean => {
    return !!process.env.NEXT_PUBLIC_API_BASE_URL;
};
