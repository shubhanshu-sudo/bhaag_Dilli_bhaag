'use client';

import React from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'warning' | 'danger' | 'info';
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'info'
}: ConfirmModalProps) {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'warning':
            case 'danger':
                return (
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
                        <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
                        <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </div>
                );
        }
    };

    const getConfirmButtonStyles = () => {
        switch (type) {
            case 'warning':
            case 'danger':
                return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
            default:
                return 'bg-blue-900 hover:bg-blue-800 focus:ring-blue-500';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
            <div
                className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl relative border border-blue-100 transform transition-all scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative top bar */}
                <div className={`absolute top-0 left-0 w-full h-2 ${type === 'danger' ? 'bg-red-500' : 'bg-gradient-to-r from-blue-600 via-blue-900 to-blue-600'}`}></div>

                <div className="p-8 text-center">
                    {getIcon()}

                    <h3 className="text-2xl font-black text-gray-900 mb-2 italic tracking-tight uppercase">
                        {title}
                    </h3>

                    <p className="text-gray-600 mb-8 font-medium text-sm leading-relaxed px-2">
                        {message}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all"
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`flex-1 px-4 py-3 text-white font-bold rounded-2xl shadow-lg transition-all transform active:scale-95 ${getConfirmButtonStyles()}`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
            {/* Close modal if clicked outside */}
            <div className="absolute inset-0 -z-10" onClick={onClose}></div>
        </div>
    );
}
