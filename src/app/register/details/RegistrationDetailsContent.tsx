'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getRaceConfig, RACE_CONFIG, type RaceKey } from '@/config/raceConfig';

// This component uses useSearchParams and must be wrapped in Suspense
export function RegistrationDetailsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get race details from config
    const [raceDetails, setRaceDetails] = useState(() => {
        const raceParam = searchParams.get('race') || '5KM';
        return getRaceConfig(raceParam);
    });

    const [showAllIncludes, setShowAllIncludes] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        dob: '',
        tshirtSize: '',
        emergencyName: '',
        emergencyPhone: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update race details when URL param changes
    useEffect(() => {
        const raceParam = searchParams.get('race') || '5KM';
        setRaceDetails(getRaceConfig(raceParam));
    }, [searchParams]);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validate form with comprehensive rules
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Full Name Validation
        const nameValue = formData.fullName.trim();
        if (!nameValue) {
            newErrors.fullName = 'Full name is required';
        } else if (nameValue.length < 3) {
            newErrors.fullName = 'Name must be at least 3 characters long';
        } else if (nameValue.length > 50) {
            newErrors.fullName = 'Name cannot exceed 50 characters';
        } else if (!/^[a-zA-Z\s.'-]+$/.test(nameValue)) {
            newErrors.fullName = 'Name can only contain letters, spaces, and common punctuation';
        } else if (!/^[a-zA-Z]/.test(nameValue)) {
            newErrors.fullName = 'Name must start with a letter';
        }

        // Email Validation (RFC 5322 compliant)
        const emailValue = formData.email.trim().toLowerCase();
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailValue) {
            newErrors.email = 'Email address is required';
        } else if (emailValue.length > 100) {
            newErrors.email = 'Email cannot exceed 100 characters';
        } else if (!emailRegex.test(emailValue)) {
            newErrors.email = 'Please enter a valid email address (e.g., name@example.com)';
        }

        // Phone Number Validation (Indian format)
        const phoneValue = formData.phone.trim();
        const phoneRegex = /^[6-9][0-9]{9}$/; // Indian mobile numbers start with 6-9
        if (!phoneValue) {
            newErrors.phone = 'Mobile number is required';
        } else if (!/^[0-9]+$/.test(phoneValue)) {
            newErrors.phone = 'Phone number can only contain digits';
        } else if (phoneValue.length !== 10) {
            newErrors.phone = 'Mobile number must be exactly 10 digits';
        } else if (!phoneRegex.test(phoneValue)) {
            newErrors.phone = 'Please enter a valid Indian mobile number (starting with 6-9)';
        }

        // Gender Validation
        if (!formData.gender) {
            newErrors.gender = 'Please select your gender';
        } else if (!['Male', 'Female', 'Other'].includes(formData.gender)) {
            newErrors.gender = 'Please select a valid gender option';
        }

        // Date of Birth Validation
        if (!formData.dob) {
            newErrors.dob = 'Date of birth is required';
        } else {
            const dob = new Date(formData.dob);
            const today = new Date();
            const age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            const dayDiff = today.getDate() - dob.getDate();

            // Calculate exact age
            let exactAge = age;
            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                exactAge--;
            }

            // Age validation (minimum 12 years, maximum 100 years)
            if (dob > today) {
                newErrors.dob = 'Date of birth cannot be in the future';
            } else if (exactAge < 12) {
                newErrors.dob = 'Participants must be at least 12 years old';
            } else if (exactAge > 100) {
                newErrors.dob = 'Please enter a valid date of birth';
            }
        }

        // T-Shirt Size Validation
        if (!formData.tshirtSize) {
            newErrors.tshirtSize = 'Please select your t-shirt size';
        } else if (!['XS', 'S', 'M', 'L', 'XL', 'XXL'].includes(formData.tshirtSize)) {
            newErrors.tshirtSize = 'Please select a valid t-shirt size';
        }

        // Emergency Contact Name Validation
        const emergencyNameValue = formData.emergencyName.trim();
        if (!emergencyNameValue) {
            newErrors.emergencyName = 'Emergency contact name is required';
        } else if (emergencyNameValue.length < 3) {
            newErrors.emergencyName = 'Contact name must be at least 3 characters long';
        } else if (emergencyNameValue.length > 50) {
            newErrors.emergencyName = 'Contact name cannot exceed 50 characters';
        } else if (!/^[a-zA-Z\s.'-]+$/.test(emergencyNameValue)) {
            newErrors.emergencyName = 'Contact name can only contain letters, spaces, and common punctuation';
        }

        // Emergency Phone Validation
        const emergencyPhoneValue = formData.emergencyPhone.trim();
        const emergencyPhoneRegex = /^[6-9][0-9]{9}$/;
        if (!emergencyPhoneValue) {
            newErrors.emergencyPhone = 'Emergency contact number is required';
        } else if (!/^[0-9]+$/.test(emergencyPhoneValue)) {
            newErrors.emergencyPhone = 'Contact number can only contain digits';
        } else if (emergencyPhoneValue.length !== 10) {
            newErrors.emergencyPhone = 'Contact number must be exactly 10 digits';
        } else if (!emergencyPhoneRegex.test(emergencyPhoneValue)) {
            newErrors.emergencyPhone = 'Please enter a valid Indian mobile number (starting with 6-9)';
        } else if (emergencyPhoneValue === phoneValue) {
            newErrors.emergencyPhone = 'Emergency contact number must be different from your mobile number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                race: raceDetails.raceKey,
                tshirtSize: formData.tshirtSize,
                amount: raceDetails.price,
                // Additional data for future use
                gender: formData.gender,
                dob: formData.dob,
                emergencyName: formData.emergencyName,
                emergencyPhone: formData.emergencyPhone,
                raceTitle: raceDetails.title,
                raceDistance: raceDetails.distance
            };

            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.success) {
                // Store registration data for payment page
                localStorage.setItem('registrationId', data.registrationId);
                localStorage.setItem('registrationData', JSON.stringify({
                    ...formData,
                    race: raceDetails.raceKey,
                    raceTitle: raceDetails.title,
                    raceDistance: raceDetails.distance,
                    amount: raceDetails.price,
                    includes: raceDetails.includes
                }));

                // Redirect to payment page
                router.push(`/register/payment?rid=${data.registrationId}`);
            } else {
                alert(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Failed to submit registration. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get visible includes (first 3 or all)
    const visibleIncludes = showAllIncludes
        ? raceDetails.includes
        : raceDetails.includes.slice(0, 3);

    const hasMoreIncludes = raceDetails.includes.length > 3;

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-12">
                        <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
                            Step 1 of 2
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 mb-3">
                            Participant Details
                        </h1>
                        <p className="text-gray-600 text-base sm:text-lg">
                            Fill in your details to continue with registration
                        </p>
                    </div>

                    {/* Selected Race Summary - Fully Dynamic */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border border-blue-100">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                                    Selected Race
                                </h3>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl sm:text-4xl font-black text-blue-900">
                                        {raceDetails.distance}
                                    </span>
                                    <span className="text-lg sm:text-xl font-bold text-gray-600">
                                        {raceDetails.title}
                                    </span>
                                </div>
                            </div>
                            <Link
                                href="/register"
                                className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                            >
                                Change
                            </Link>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 gap-4">
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 mb-2">Includes:</p>
                                <div className="flex flex-wrap gap-2">
                                    {visibleIncludes.map((item, idx) => (
                                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                            {item}
                                        </span>
                                    ))}
                                    {hasMoreIncludes && !showAllIncludes && (
                                        <button
                                            onClick={() => setShowAllIncludes(true)}
                                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors font-semibold"
                                        >
                                            +{raceDetails.includes.length - 3} more
                                        </button>
                                    )}
                                    {showAllIncludes && hasMoreIncludes && (
                                        <button
                                            onClick={() => setShowAllIncludes(false)}
                                            className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-300 transition-colors"
                                        >
                                            Show less
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Registration Fee</p>
                                <p className="text-2xl sm:text-3xl font-black text-blue-900">
                                    ₹{raceDetails.price}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                            Personal Information
                        </h2>

                        <div className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    minLength={3}
                                    maxLength={50}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your full name"
                                />
                                {errors.fullName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">3-50 characters</p>
                            </div>

                            {/* Email and Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        maxLength={100}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="your.email@example.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Mobile Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        maxLength={10}
                                        pattern="[6-9][0-9]{9}"
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="9876543210"
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">10 digits, starting with 6-9</p>
                                </div>
                            </div>

                            {/* Gender and DOB */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Gender <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.gender ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.gender && (
                                        <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="dob" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Date of Birth <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="dob"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        max={new Date().toISOString().split('T')[0]}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.dob ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.dob && (
                                        <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
                                    )}
                                </div>
                            </div>

                            {/* T-Shirt Size */}
                            <div>
                                <label htmlFor="tshirtSize" className="block text-sm font-semibold text-gray-700 mb-2">
                                    T-Shirt Size <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="tshirtSize"
                                    name="tshirtSize"
                                    value={formData.tshirtSize}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.tshirtSize ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Select Size</option>
                                    <option value="XS">XS - Extra Small</option>
                                    <option value="S">S - Small</option>
                                    <option value="M">M - Medium</option>
                                    <option value="L">L - Large</option>
                                    <option value="XL">XL - Extra Large</option>
                                    <option value="XXL">XXL - Double XL</option>
                                </select>
                                {errors.tshirtSize && (
                                    <p className="mt-1 text-sm text-red-600">{errors.tshirtSize}</p>
                                )}
                            </div>

                            {/* Emergency Contact Section */}
                            <div className="pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Emergency Contact
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="emergencyName" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Contact Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="emergencyName"
                                            name="emergencyName"
                                            value={formData.emergencyName}
                                            onChange={handleChange}
                                            minLength={3}
                                            maxLength={50}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.emergencyName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Emergency contact name"
                                        />
                                        {errors.emergencyName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.emergencyName}</p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">3-50 characters</p>
                                    </div>

                                    <div>
                                        <label htmlFor="emergencyPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Contact Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="emergencyPhone"
                                            name="emergencyPhone"
                                            value={formData.emergencyPhone}
                                            onChange={handleChange}
                                            maxLength={10}
                                            pattern="[6-9][0-9]{9}"
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="9876543210"
                                        />
                                        {errors.emergencyPhone && (
                                            <p className="mt-1 text-sm text-red-600">{errors.emergencyPhone}</p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">10 digits, must be different from your number</p>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-blue-900 hover:bg-blue-800 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Continue to Payment
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-sm text-gray-500 mt-4">
                                    By continuing, you agree to our Terms & Conditions
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}
