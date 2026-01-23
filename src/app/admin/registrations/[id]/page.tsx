'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { authUtils } from '@/utils/auth';
import { API_ENDPOINTS } from '@/config/api';

interface Registration {
    _id: string;
    name: string;
    email: string;
    phone: string;
    race: string;
    tshirtSize: string;
    amount: number;
    paymentStatus: string;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    paymentDate?: string;
    createdAt: string;
    updatedAt: string;
}

export default function RegistrationDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [registration, setRegistration] = useState<Registration | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [copiedField, setCopiedField] = useState('');

    useEffect(() => {
        if (!authUtils.isAuthenticated()) {
            router.push('/admin/login');
            return;
        }

        if (id) {
            fetchRegistration();
        }
    }, [id, router]);

    const fetchRegistration = async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_ENDPOINTS.ADMIN.REGISTRATIONS}/${id}`, {
                headers: {
                    ...authUtils.getAuthHeader()
                }
            });

            if (response.status === 401) {
                authUtils.logout();
                return;
            }

            const data = await response.json();

            if (data.success) {
                setRegistration(data.data);
            } else {
                setError(data.message || 'Failed to fetch registration');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Network error. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text: string, fieldName: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(''), 2000);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const getStatusBadge = (status: string) => {
        const statusLower = status.toLowerCase();
        if (statusLower === 'paid') {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    ✓ Paid
                </span>
            );
        } else if (statusLower === 'failed') {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    ✗ Failed
                </span>
            );
        } else {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    ⏳ Pending
                </span>
            );
        }
    };

    const getRaceBadge = (race: string) => {
        const colors: Record<string, string> = {
            '2KM': 'bg-blue-100 text-blue-800',
            '5KM': 'bg-purple-100 text-purple-800',
            '10KM': 'bg-indigo-100 text-indigo-800'
        };
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors[race] || 'bg-gray-100 text-gray-800'}`}>
                {race}
            </span>
        );
    };

    const InfoRow = ({ label, value, copyable = false }: { label: string; value: string; copyable?: boolean }) => (
        <div className="py-4 border-b border-gray-200 last:border-0">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <dt className="text-sm font-medium text-gray-500 mb-1">{label}</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{value}</dd>
                </div>
                {copyable && (
                    <button
                        onClick={() => copyToClipboard(value, label)}
                        className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy to clipboard"
                    >
                        {copiedField === label ? (
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            </div>
        );
    }

    if (error || !registration) {
        return (
            <div className="min-h-screen bg-gray-50">
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <button
                            onClick={() => router.push('/admin/registrations')}
                            className="flex items-center text-gray-600 hover:text-gray-900"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Registrations
                        </button>
                    </div>
                </header>
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
                        <p className="text-sm text-red-600">{error || 'Registration not found'}</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => router.push('/admin/registrations')}
                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Registrations
                        </button>
                        <div className="text-sm text-gray-600">
                            Registration Details
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Title Section */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{registration.name}</h1>
                    <div className="flex items-center gap-3">
                        {getStatusBadge(registration.paymentStatus)}
                        {getRaceBadge(registration.race)}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Registration Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Registration Information
                        </h2>
                        <dl>
                            <InfoRow label="Registration ID" value={registration._id} copyable />
                            <InfoRow label="Full Name" value={registration.name} />
                            <InfoRow label="Email" value={registration.email} copyable />
                            <InfoRow label="Phone Number" value={registration.phone} copyable />
                            <InfoRow label="Race Category" value={registration.race} />
                            <InfoRow label="T-Shirt Size" value={registration.tshirtSize} />
                            <InfoRow label="Registration Date" value={formatDate(registration.createdAt)} />
                        </dl>
                    </div>

                    {/* Payment Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            Payment Information
                        </h2>
                        <dl>
                            <div className="py-4 border-b border-gray-200">
                                <dt className="text-sm font-medium text-gray-500 mb-1">Payment Status</dt>
                                <dd className="text-sm">{getStatusBadge(registration.paymentStatus)}</dd>
                            </div>
                            <div className="py-4 border-b border-gray-200">
                                <dt className="text-sm font-medium text-gray-500 mb-1">Amount Paid</dt>
                                <dd className="text-2xl font-bold text-gray-900">Rs. {registration.amount}</dd>
                            </div>
                            <InfoRow
                                label="Razorpay Order ID"
                                value={registration.razorpayOrderId || 'N/A'}
                                copyable={!!registration.razorpayOrderId}
                            />
                            <InfoRow
                                label="Razorpay Payment ID"
                                value={registration.razorpayPaymentId || 'N/A'}
                                copyable={!!registration.razorpayPaymentId}
                            />
                            <InfoRow
                                label="Payment Date & Time"
                                value={registration.paymentDate ? formatDate(registration.paymentDate) : 'N/A'}
                            />
                        </dl>
                    </div>

                    {/* System Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            System Information
                        </h2>
                        <dl className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                            <InfoRow label="Created At" value={formatDate(registration.createdAt)} />
                            <InfoRow label="Last Updated" value={formatDate(registration.updatedAt)} />
                            <InfoRow label="Payment Source" value="Razorpay" />
                        </dl>
                    </div>
                </div>
            </main>
        </div>
    );
}
