// Auth utility for admin panel
const TOKEN_KEY = 'admin_token';

export const authUtils = {
    // Get token from localStorage
    getToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(TOKEN_KEY);
    },

    // Set token in localStorage
    setToken: (token: string): void => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(TOKEN_KEY, token);
    },

    // Remove token and logout
    logout: (): void => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = '/admin/login';
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return !!authUtils.getToken();
    },

    // Get authorization header
    getAuthHeader: (): { Authorization: string } | {} => {
        const token = authUtils.getToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    }
};
