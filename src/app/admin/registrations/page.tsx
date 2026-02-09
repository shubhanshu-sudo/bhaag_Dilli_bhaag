'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authUtils } from '@/utils/auth';
import { API_ENDPOINTS } from '@/config/api';
import Link from 'next/link';

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
    step: string;
    createdAt: string;
}

interface Stats {
    total: number;
    pending: number;
    paid: number;
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
    const [isExporting, setIsExporting] = useState(false);
    const [error, setError] = useState('');

    // Filters and pagination state
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [raceFilter, setRaceFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [limit, setLimit] = useState(20);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1); // Reset to first page on search
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        // Check authentication
        if (!authUtils.isAuthenticated()) {
            router.push('/admin/login');
            return;
        }

        fetchRegistrations();
    }, [router, debouncedSearch, statusFilter, raceFilter, currentPage, limit]);

    const fetchRegistrations = async () => {
        setIsLoading(true);
        setError('');

        try {
            // Build query parameters
            const params = new URLSearchParams();
            if (debouncedSearch) params.append('search', debouncedSearch);
            if (statusFilter) params.append('status', statusFilter);
            if (raceFilter) params.append('race', raceFilter);
            params.append('page', currentPage.toString());
            params.append('limit', limit.toString());

            const url = `${API_ENDPOINTS.ADMIN.REGISTRATIONS}?${params.toString()}`;

            const response = await fetch(url, {
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
                setRegistrations(data.data || []);
                setStats(data.stats || null);
                setTotalPages(data.totalPages || 1);
                setTotalRecords(data.totalRecords || 0);
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
        if (statusLower === 'paid') {
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

    const getStepBadge = (step: string) => {
        switch (step) {
            case 'email_captured':
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500 uppercase">
                        Lead Only
                    </span>
                );
            case 'form_completed':
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
                        Form Filed
                    </span>
                );
            case 'completed':
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800 uppercase">
                        Finished
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-400 uppercase">
                        {step || 'Started'}
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
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[race] || 'bg-gray-100 text-gray-800'}`}>
                {race}
            </span>
        );
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleExportCSV = async () => {
        setIsExporting(true);
        try {
            // Build query parameters
            const params = new URLSearchParams();
            if (debouncedSearch) params.append('search', debouncedSearch);
            if (statusFilter) params.append('status', statusFilter);
            if (raceFilter) params.append('race', raceFilter);
            params.append('limit', '1000000'); // Fetch all for export

            const url = `${API_ENDPOINTS.ADMIN.REGISTRATIONS}?${params.toString()}`;

            const response = await fetch(url, {
                headers: {
                    ...authUtils.getAuthHeader()
                }
            });

            if (!response.ok) throw new Error('Export failed');

            const result = await response.json();

            if (!result.success || !result.data) {
                throw new Error(result.message || 'Failed to fetch data for export');
            }

            const data = result.data;
            if (data.length === 0) {
                alert('No data available to export');
                return;
            }

            // CSV Generation
            const headers = ['Name', 'Email', 'Phone', 'Race Category', 'Amount', 'Payment Status', 'Progress', 'Date & Time'];

            const csvContent = [
                headers.join(','),
                ...data.map((row: Registration) => {
                    const date = new Date(row.createdAt).toLocaleString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                    });

                    const escape = (text: string | number) => {
                        const str = String(text || '');
                        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                            return `"${str.replace(/"/g, '""')}"`;
                        }
                        return str;
                    };

                    const progress = row.step === 'completed' ? 'Finished' :
                        row.step === 'form_completed' ? 'Form Filled' :
                            'Pending';

                    return [
                        escape(row.name),
                        escape(row.email),
                        escape(row.phone),
                        escape(row.race),
                        escape(row.amount),
                        escape(row.paymentStatus),
                        escape(progress),
                        escape(date)
                    ].join(',');
                })
            ].join('\n');

            // Download Logic
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const urlObj = URL.createObjectURL(blob);
            link.setAttribute('href', urlObj);

            // Filename generation
            let filename = 'bhaag-dilli-bhaag';
            if (statusFilter) filename += `-${statusFilter.toLowerCase()}`;
            if (raceFilter) filename += `-${raceFilter.toLowerCase()}`;

            // Per user rules: filters applied? -> name-paid-10km-registrations.csv
            // Else -> name-registrations-date.csv
            // Just merging logic to be consistent: always add -registrations
            if (statusFilter || raceFilter) {
                filename += '-registrations';
            } else {
                filename += '-registrations';
                const today = new Date();
                const day = String(today.getDate()).padStart(2, '0');
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const year = today.getFullYear();
                filename += `-${day}-${month}-${year}`;
            }

            filename += '.csv';

            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(urlObj);

        } catch (err) {
            console.error('Export error:', err);
            alert('Failed to export CSV. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                                <p className="text-sm text-gray-600">Bhaag Dilli Bhaag 2026</p>
                            </div>
                            <nav className="hidden md:flex items-center gap-4">
                                <Link
                                    href="/admin/registrations"
                                    className="px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600"
                                >
                                    Registrations
                                </Link>
                                <Link
                                    href="/admin/coupons"
                                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    Coupons
                                </Link>
                            </nav>
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
                            <div className="text-3xl font-bold text-green-600">{stats.paid}</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="text-sm font-medium text-gray-600 mb-1">Failed</div>
                            <div className="text-3xl font-bold text-red-600">{stats.failed}</div>
                        </div>
                    </div>
                )}

                {/* Filters and Search */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by name, email, phone, or ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {searchQuery !== debouncedSearch && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <svg className="animate-spin h-4 w-4 text-gray-400" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>

                        {/* Race Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Race Category</label>
                            <select
                                value={raceFilter}
                                onChange={(e) => {
                                    setRaceFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Races</option>
                                <option value="2KM">2 KM</option>
                                <option value="5KM">5 KM</option>
                                <option value="10KM">10 KM</option>
                            </select>
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    {(debouncedSearch || statusFilter || raceFilter) && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {debouncedSearch && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                    Search: {debouncedSearch}
                                    <button onClick={() => setSearchQuery('')} className="ml-2 hover:text-blue-900">×</button>
                                </span>
                            )}
                            {statusFilter && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                    Status: {statusFilter}
                                    <button onClick={() => setStatusFilter('')} className="ml-2 hover:text-blue-900">×</button>
                                </span>
                            )}
                            {raceFilter && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                    Race: {raceFilter}
                                    <button onClick={() => setRaceFilter('')} className="ml-2 hover:text-blue-900">×</button>
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Registrations Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Registrations</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Showing {registrations.length} of {totalRecords} registrations
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleExportCSV}
                                disabled={isExporting || totalRecords === 0}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isExporting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Exporting...
                                    </>
                                ) : (
                                    <>
                                        <svg className="mr-2 -ml-1 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Export CSV
                                    </>
                                )}
                            </button>
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600 hidden sm:inline">Rows:</label>
                                <select
                                    value={limit}
                                    onChange={(e) => {
                                        setLimit(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>
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
                            {(debouncedSearch || statusFilter || raceFilter) && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setStatusFilter('');
                                        setRaceFilter('');
                                    }}
                                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50 sticky top-0">
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
                                                Progress
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {registrations.map((registration) => (
                                            <tr
                                                key={registration._id}
                                                onClick={() => router.push(`/admin/registrations/${registration._id}`)}
                                                className="hover:bg-gray-50 cursor-pointer transition-colors"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {registration.name || (
                                                            <span className="text-gray-400 italic font-normal">Incomplete / Lead</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-600">{registration.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-600">{registration.phone}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getRaceBadge(registration.race)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-gray-900">Rs. {registration.amount}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(registration.paymentStatus)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStepBadge(registration.step)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-600">{formatDate(registration.createdAt)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            router.push(`/admin/registrations/${registration._id}`);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-800"
                                                        title="View Details"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                    <div className="text-sm text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main >
        </div >
    );
}
