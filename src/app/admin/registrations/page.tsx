'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authUtils } from '@/utils/auth';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface Registration {
    _id: string;
    name: string;
    email: string;
    phone: string;
    race: string;
    tshirtSize: string;
    amount: number;
    paymentStatus: string;
    createdAt: string;
}

interface Stats {
    total: number;
    pending: number;
    completed: number;
    failed: number;
    byRace: {
        '2KM': number;
        '5KM': number;
        '10KM': number;
    };
}

export default function AdminRegistrationsPage() {
    const router = useRouter();
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Check authentication
        if (!authUtils.isAuthenticated()) {
            router.push('/admin/login');
            return;
        }

        fetchRegistrations();
    }, [router]);

    const fetchRegistrations = async () => {
        setIsLoading(true);
        setError('');

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/admin/registrations`, {
                headers: {
                    ...authUtils.getAuthHeader()
                }
            });

            if (response.status === 401) {
                // Unauthorized - logout and redirect
                authUtils.logout();
                return;
            }

            const data = await response.json();

            if (data.success) {
                setRegistrations(data.data || []);
                setStats(data.stats || null);
            } else {
                setError(data.message || 'Failed to fetch registrations');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Network error. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        authUtils.logout();
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status: string) => {
        const statusLower = status.toLowerCase();
        if (statusLower === 'completed') {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Paid
                </span>
            );
        } else if (statusLower === 'failed') {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Failed
                </span>
            );
        } else {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                </span>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                            <p className="text-sm text-gray-600">Bhaag Dilli Bhaag 2026</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="text-sm font-medium text-gray-600 mb-1">Total Registrations</div>
                            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="text-sm font-medium text-gray-600 mb-1">Pending Payments</div>
                            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="text-sm font-medium text-gray-600 mb-1">Completed</div>
                            <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="text-sm font-medium text-gray-600 mb-1">Failed</div>
                            <div className="text-3xl font-bold text-red-600">{stats.failed}</div>
                        </div>
                    </div>
                )}

                {/* Registrations Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">Registrations</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {registrations.length} total registration{registrations.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        </div>
                    ) : error ? (
                        <div className="p-6">
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        </div>
                    ) : registrations.length === 0 ? (
                        <div className="p-12 text-center">
                            <p className="text-gray-500">No registrations found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Phone
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Race
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {registrations.map((registration) => (
                                        <tr key={registration._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{registration.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">{registration.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">{registration.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {registration.race}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">₹{registration.amount}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(registration.paymentStatus)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">{formatDate(registration.createdAt)}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
