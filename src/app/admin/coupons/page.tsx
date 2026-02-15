'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authUtils } from '@/utils/auth';
import { API_ENDPOINTS } from '@/config/api';
import { useToast } from '@/contexts/ToastContext';
import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface Coupon {
    _id: string;
    code: string;
    discountValue: number;
    isActive: boolean;
    usageCount: number;
    maxUsage: number | null;
    expiresAt: string | null;
    createdAt: string;
}

export default function AdminCouponsPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState<string | null>(null);
    const [isAddingMode, setIsAddingMode] = useState(false);
    const [isEditingMode, setIsEditingMode] = useState(false);
    const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
    const [newCoupon, setNewCoupon] = useState({
        code: '',
        discountValue: 10,
        maxUsage: '' as string | number,
        expiresAt: '',
        isActive: true
    });

    useEffect(() => {
        // Check authentication
        if (!authUtils.isAuthenticated()) {
            router.push('/admin/login');
            return;
        }

        fetchCoupons();
    }, [router]);

    const fetchCoupons = async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(API_ENDPOINTS.ADMIN.COUPONS, {
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
                setCoupons(data.data || []);
            } else {
                setError(data.message || 'Failed to fetch coupons');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Network error. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateCoupon = async (e: React.FormEvent) => {
        e.preventDefault();

        const code = newCoupon.code.trim().toUpperCase();

        // Validation
        if (code.length < 5 || code.length > 12) {
            showToast('error', 'Coupon code must be between 5 and 12 characters');
            return;
        }

        const codeRegex = /^[A-Z0-9]+$/;
        if (!codeRegex.test(code)) {
            showToast('error', 'Coupon code can only contain uppercase letters and numbers');
            return;
        }

        setIsSubmitting('creating');

        try {
            const response = await fetch(API_ENDPOINTS.ADMIN.COUPONS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...authUtils.getAuthHeader()
                },
                body: JSON.stringify({
                    ...newCoupon,
                    code: code
                })
            });

            const data = await response.json();

            if (data.success) {
                showToast('success', 'Coupon created successfully');
                setIsAddingMode(false);
                setNewCoupon({ code: '', discountValue: 10, maxUsage: '', expiresAt: '', isActive: true });
                fetchCoupons(); // Refresh list
            } else {
                showToast('error', data.message || 'Failed to create coupon');
            }
        } catch (err) {
            console.error('Create error:', err);
            showToast('error', 'Network error. Failed to create coupon.');
        } finally {
            setIsSubmitting(null);
        }
    };

    const handleUpdateCoupon = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCoupon) return;

        const code = newCoupon.code.trim().toUpperCase();

        // Validation
        if (code.length < 5 || code.length > 12) {
            showToast('error', 'Coupon code must be between 5 and 12 characters');
            return;
        }

        const codeRegex = /^[A-Z0-9]+$/;
        if (!codeRegex.test(code)) {
            showToast('error', 'Coupon code can only contain uppercase letters and numbers');
            return;
        }

        setIsSubmitting('updating');

        try {
            const response = await fetch(API_ENDPOINTS.ADMIN.UPDATE_COUPON(editingCoupon._id), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...authUtils.getAuthHeader()
                },
                body: JSON.stringify({
                    ...newCoupon,
                    code: code
                })
            });

            const data = await response.json();

            if (data.success) {
                showToast('success', 'Coupon updated successfully');
                setIsEditingMode(false);
                setEditingCoupon(null);
                setNewCoupon({ code: '', discountValue: 10, maxUsage: '', expiresAt: '', isActive: true });
                fetchCoupons(); // Refresh list
            } else {
                showToast('error', data.message || 'Failed to update coupon');
            }
        } catch (err) {
            console.error('Update error:', err);
            showToast('error', 'Network error. Failed to update coupon.');
        } finally {
            setIsSubmitting(null);
        }
    };

    const openEditModal = (coupon: Coupon) => {
        setEditingCoupon(coupon);
        setNewCoupon({
            code: coupon.code,
            discountValue: coupon.discountValue,
            maxUsage: coupon.maxUsage || '',
            expiresAt: coupon.expiresAt ? new Date(coupon.expiresAt).toISOString().split('T')[0] : '',
            isActive: coupon.isActive
        });
        setIsEditingMode(true);
    };

    const handleDeleteCoupon = async (id: string) => {
        setIsSubmitting(id);
        try {
            const response = await fetch(`${API_ENDPOINTS.ADMIN.COUPONS}/${id}`, {
                method: 'DELETE',
                headers: {
                    ...authUtils.getAuthHeader()
                }
            });

            const data = await response.json();

            if (data.success) {
                showToast('success', 'Coupon deleted successfully');
                setCoupons(prev => prev.filter(c => c._id !== id));
                setCouponToDelete(null);
            } else {
                showToast('error', data.message || 'Failed to delete coupon');
            }
        } catch (err) {
            console.error('Delete error:', err);
            showToast('error', 'Network error. Failed to delete coupon.');
        } finally {
            setIsSubmitting(null);
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        setIsSubmitting(id);
        try {
            const response = await fetch(API_ENDPOINTS.ADMIN.TOGGLE_COUPON_STATUS(id), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...authUtils.getAuthHeader()
                },
                body: JSON.stringify({ isActive: !currentStatus })
            });

            const data = await response.json();

            if (data.success) {
                // Update state in real-time
                setCoupons(prevCoupons =>
                    prevCoupons.map(coupon =>
                        coupon._id === id ? { ...coupon, isActive: !currentStatus } : coupon
                    )
                );
                showToast('success', `Coupon ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
            } else {
                showToast('error', data.message || 'Failed to update status');
            }
        } catch (err) {
            console.error('Toggle error:', err);
            showToast('error', 'Network error. Failed to update status.');
        } finally {
            setIsSubmitting(null);
        }
    };

    const handleLogout = () => {
        authUtils.logout();
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
                                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    Registrations
                                </Link>
                                <Link
                                    href="/admin/coupons"
                                    className="px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600"
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
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Manage Coupons</h2>
                    <button
                        onClick={() => setIsAddingMode(true)}
                        className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-6 py-2.5 rounded-lg shadow-lg transition-all flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Coupon
                    </button>
                </div>

                {/* Add/Edit Coupon Modal */}
                {(isAddingMode || isEditingMode) && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                            <div className="bg-blue-900 px-6 py-4">
                                <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                                    {isEditingMode ? 'Edit Coupon' : 'Create New Coupon'}
                                </h3>
                            </div>
                            <form onSubmit={isEditingMode ? handleUpdateCoupon : handleCreateCoupon} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Coupon Code</label>
                                    <input
                                        type="text"
                                        required
                                        minLength={5}
                                        maxLength={12}
                                        placeholder="MIN 5 CHRS, MAX 12, ONLY A-Z, 0-9"
                                        value={newCoupon.code}
                                        onChange={(e) => {
                                            const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                                            setNewCoupon({ ...newCoupon, code: val });
                                        }}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm placeholder:text-gray-400"
                                    />
                                    <p className="mt-1.5 text-[10px] text-gray-400 font-medium">
                                        5-12 chars. Numbers and Uppercase letters only. No spaces.
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Discount Value (%)</label>
                                    <select
                                        value={newCoupon.discountValue}
                                        onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: Number(e.target.value) })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value={10}>10% OFF</option>
                                        <option value={20}>20% OFF</option>
                                        <option value={25}>25% OFF</option>
                                        <option value={30}>30% OFF</option>
                                        <option value={40}>40% OFF</option>
                                        <option value={50}>50% OFF</option>
                                        <option value={60}>60% OFF</option>
                                        <option value={70}>70% OFF</option>
                                        <option value={80}>80% OFF</option>
                                        <option value={90}>90% OFF</option>
                                        <option value={100}>100% OFF</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Max Usage Limit (Optional)</label>
                                    <input
                                        type="number"
                                        placeholder="No limit if empty"
                                        value={newCoupon.maxUsage}
                                        onChange={(e) => setNewCoupon({ ...newCoupon, maxUsage: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                        min={1}
                                    />
                                    <p className="mt-1 text-[10px] text-gray-400">Total number of times this coupon can be used.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Expiry Date (Optional)</label>
                                    <input
                                        type="date"
                                        value={newCoupon.expiresAt}
                                        onChange={(e) => setNewCoupon({ ...newCoupon, expiresAt: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    <p className="mt-1 text-[10px] text-gray-400">Coupon will automatically expire after this date.</p>
                                </div>
                                <div className="flex items-center gap-3 py-2">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={newCoupon.isActive}
                                        onChange={(e) => setNewCoupon({ ...newCoupon, isActive: e.target.checked })}
                                        className="w-5 h-5 text-blue-600 rounded"
                                    />
                                    <label htmlFor="isActive" className="text-sm font-bold text-gray-700">Set as Active</label>
                                </div>
                                <div className="flex gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsAddingMode(false);
                                            setIsEditingMode(false);
                                            setEditingCoupon(null);
                                            setNewCoupon({ code: '', discountValue: 10, maxUsage: '', expiresAt: '', isActive: true });
                                        }}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting === 'creating' || isSubmitting === 'updating'}
                                        className="flex-1 px-4 py-2 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 disabled:opacity-50 transition-all shadow-md"
                                    >
                                        {isSubmitting === 'creating' ? 'Creating...' : isSubmitting === 'updating' ? 'Updating...' : isEditingMode ? 'Update Coupon' : 'Create Coupon'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {couponToDelete && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                            <div className="bg-red-600 px-6 py-4">
                                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Delete Coupon?</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 font-medium text-center mb-6">
                                    Are you sure you want to delete <span className="font-mono font-black text-red-600">{couponToDelete.code}</span>? This action cannot be undone.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setCouponToDelete(null)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Keep It
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCoupon(couponToDelete._id)}
                                        disabled={isSubmitting === couponToDelete._id}
                                        className="flex-1 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:opacity-50 transition-all shadow-md flex items-center justify-center"
                                    >
                                        {isSubmitting === couponToDelete._id ? (
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                        ) : 'Yes, Delete'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Coupons Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
                        <h3 className="text-lg font-bold text-gray-900">All Coupons</h3>
                        <span className="text-sm text-gray-500">{coupons.length} total</span>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
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
                    ) : coupons.length === 0 ? (
                        <div className="p-12 text-center">
                            <p className="text-gray-500">No coupons found.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Coupon Code
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Discount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Expiry
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Usage Count
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {coupons.map((coupon) => (
                                        <tr key={coupon._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-black text-blue-900 font-mono bg-blue-50 px-2 py-1 rounded inline-block">
                                                    {coupon.code}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className={`text-sm font-bold ${coupon.discountValue === 100 ? 'text-green-600' : 'text-gray-900'}`}>
                                                    {coupon.discountValue}% OFF
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {coupon.isActive ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">
                                                    {coupon.expiresAt ? (
                                                        new Date(coupon.expiresAt).toLocaleDateString('en-IN', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })
                                                    ) : (
                                                        <span className="text-gray-300 italic text-xs">No Expiry</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">
                                                    {coupon.usageCount}
                                                    {coupon.maxUsage ? (
                                                        <span className="text-gray-400 ml-1">
                                                            / {coupon.maxUsage}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-300 ml-1 text-[10px] italic">
                                                            (no limit)
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleToggleStatus(coupon._id, coupon.isActive)}
                                                        disabled={isSubmitting === coupon._id}
                                                        title={coupon.isActive ? 'Deactivate' : 'Activate'}
                                                        className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${coupon.isActive
                                                            ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                                                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                                                            } disabled:opacity-50`}
                                                    >
                                                        {isSubmitting === coupon._id ? (
                                                            <svg className="animate-spin h-3.5 w-3.5 mr-1.5" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                            </svg>
                                                        ) : null}
                                                        {coupon.isActive ? 'Deactivate' : 'Activate'}
                                                    </button>
                                                    <button
                                                        onClick={() => openEditModal(coupon)}
                                                        className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
                                                        title="Edit Coupon"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => setCouponToDelete(coupon)}
                                                        disabled={isSubmitting === coupon._id || coupon.usageCount > 0}
                                                        title={coupon.usageCount > 0 ? "Cannot delete used coupon" : "Delete Coupon"}
                                                        className={`p-1.5 rounded-lg transition-all ${coupon.usageCount > 0
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                                                            }`}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
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
