'use client';

import { useToast } from '@/contexts/ToastContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ToastDemoPage() {
    const { showToast } = useToast();

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-black text-blue-900 mb-4">
                            Toast Notification System
                        </h1>
                        <p className="text-lg text-gray-600">
                            Click the buttons below to test different notification types
                        </p>
                    </div>

                    {/* Demo Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Success Toast */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Success</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Use for successful operations and confirmations
                            </p>
                            <button
                                onClick={() => showToast('success', 'Registration submitted successfully!')}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                            >
                                Show Success Toast
                            </button>
                        </div>

                        {/* Error Toast */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Error</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Use for failed operations and validation errors
                            </p>
                            <button
                                onClick={() => showToast('error', 'This email is already registered')}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                            >
                                Show Error Toast
                            </button>
                        </div>

                        {/* Warning Toast */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Warning</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Use for cautionary messages and important notices
                            </p>
                            <button
                                onClick={() => showToast('warning', 'Please review your information before submitting')}
                                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                            >
                                Show Warning Toast
                            </button>
                        </div>

                        {/* Info Toast */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Info</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Use for general information and helpful tips
                            </p>
                            <button
                                onClick={() => showToast('info', 'Event registration closes on January 31st')}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                            >
                                Show Info Toast
                            </button>
                        </div>
                    </div>

                    {/* Advanced Examples */}
                    <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Examples</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={() => showToast('success', 'This toast will auto-dismiss in 3 seconds', 3000)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-colors"
                            >
                                Custom Duration (3s)
                            </button>
                            <button
                                onClick={() => showToast('info', 'This toast stays until you close it', 0)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-colors"
                            >
                                No Auto-Dismiss
                            </button>
                            <button
                                onClick={() => {
                                    showToast('success', 'First notification');
                                    setTimeout(() => showToast('info', 'Second notification'), 500);
                                    setTimeout(() => showToast('warning', 'Third notification'), 1000);
                                }}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-colors"
                            >
                                Multiple Toasts
                            </button>
                            <button
                                onClick={() => showToast('error', 'This is a very long error message that demonstrates how the toast handles longer text content gracefully without breaking the layout')}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-colors"
                            >
                                Long Message
                            </button>
                        </div>
                    </div>

                    {/* Code Example */}
                    <div className="mt-12 bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-700">
                        <h2 className="text-2xl font-bold text-white mb-4">Usage Example</h2>
                        <pre className="text-green-400 text-sm overflow-x-auto">
                            {`import { useToast } from '@/contexts/ToastContext';

function MyComponent() {
    const { showToast } = useToast();

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/register');
            const data = await response.json();
            
            if (data.success) {
                showToast('success', 'Registration successful!');
            } else {
                showToast('error', data.message);
            }
        } catch (error) {
            showToast('error', 'Network error occurred');
        }
    };

    return <button onClick={handleSubmit}>Submit</button>;
}`}
                        </pre>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
