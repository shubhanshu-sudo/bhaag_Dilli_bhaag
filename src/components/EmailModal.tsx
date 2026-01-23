'use client';

import { useState } from 'react';
import { API_ENDPOINTS } from '@/config/api';
import { useToast } from '@/contexts/ToastContext';
import { useRouter } from 'next/navigation';

interface EmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    raceKey: string;
}

export default function EmailModal({ isOpen, onClose, raceKey }: EmailModalProps) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();
    const router = useRouter();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const emailTrimmed = email.trim().toLowerCase();

        if (!emailTrimmed) {
            showToast('error', 'Please enter your email address');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailTrimmed)) {
            showToast('error', 'Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(API_ENDPOINTS.CHECK_EMAIL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailTrimmed, race: raceKey })
            });

            const data = await response.json();

            if (data.success) {
                if (data.alreadyPaid) {
                    showToast('info', 'You are already registered for this race category!');
                    onClose();
                    return;
                }

                // Store registration ID if available
                if (data.registrationId) {
                    localStorage.setItem('pendingRegistrationId', data.registrationId);
                }

                // Store info about whether it exists
                localStorage.setItem('registrationExists', String(data.exists));

                // Store prefill data - merge backend data with current input as fallback
                const prefill = data.data ? {
                    ...data.data,
                    email: data.data.email || emailTrimmed,
                    race: data.data.race || raceKey
                } : {
                    email: emailTrimmed,
                    race: raceKey
                };
                localStorage.setItem('prefillData', JSON.stringify(prefill));

                // Redirect to details page
                router.push(`/register/details?race=${raceKey}`);
                onClose();
            } else {
                showToast('error', data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Email check error:', error);
            showToast('error', 'Failed to connect to server. Please check your internet.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
            <div
                className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl relative border border-blue-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative element */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-blue-900 to-blue-600"></div>

                <div className="p-8 sm:p-10">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                            <h3 className="text-2xl sm:text-3xl font-black text-blue-900 italic tracking-tight">
                                Book Your Slot
                            </h3>
                            <div className="h-1 w-12 bg-yellow-500 mt-1 rounded-full"></div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90 group"
                            aria-label="Close"
                        >
                            <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-gray-600 mb-8 font-light text-base leading-relaxed">
                        Enter your email to continue. We'll check if you have an existing registration to save you time.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email-popup" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                                    </svg>
                                </div>
                                <input
                                    id="email-popup"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-gray-900 font-medium placeholder:text-gray-400"
                                    placeholder="your.email@example.com"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3 border border-blue-100 mb-2">
                            <div className="bg-blue-100 p-1.5 rounded-lg text-blue-700">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-xs text-blue-800/80 leading-snug">
                                Joining for <span className="font-bold">{raceKey}</span>. Your progress is saved automatically if you leave.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-blue-900 hover:bg-blue-800 text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-blue-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Continue
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Close modal if clicked outside */}
            <div className="absolute inset-0 -z-10" onClick={onClose}></div>
        </div>
    );
}
