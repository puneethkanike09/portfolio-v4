'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, LogIn, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const router = useRouter();

    // Check for system preferred color scheme
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Add a small delay to ensure cookie is set
                setTimeout(() => {
                    router.push('/admin');
                    router.refresh(); // Force refresh to ensure authentication state is updated
                }, 100);
            } else {
                setError(data.error || 'Invalid password');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'}`}>
            <div className={`w-full max-w-sm sm:max-w-md rounded-xl overflow-hidden shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {/* Header */}
                <div className={`px-6 py-8 ${isDarkMode ? 'bg-blue-700' : 'bg-blue-600'} text-white`}>
                    <div className="flex items-center justify-center mb-2">
                        <div className="bg-white bg-opacity-20 p-3 rounded-full">
                            <Lock size={24} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-center">Portfolio Admin</h1>
                    <p className="text-center text-sm mt-2 text-blue-100">Sign in to manage your portfolio</p>
                </div>

                {/* Form */}
                <div className="px-6 py-8">
                    {error && (
                        <div className={`mb-6 p-3 rounded-lg flex items-center text-sm ${isDarkMode ? 'bg-red-900 bg-opacity-40 text-red-200' : 'bg-red-50 text-red-700'}`}>
                            <AlertCircle size={18} className={`mr-2 ${isDarkMode ? 'text-red-300' : 'text-red-500'}`} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="password">
                                Admin Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`block w-full px-4 py-3 rounded-lg text-sm focus:ring-2 focus:ring-offset-2 ${isDarkMode
                                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:ring-offset-gray-900'
                                        : 'bg-gray-50 border border-gray-300 text-gray-700 focus:ring-blue-500 focus:ring-offset-white'
                                        }`}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium text-white transition-all
                                ${loading
                                    ? (isDarkMode ? 'bg-blue-700 cursor-not-allowed' : 'bg-blue-400 cursor-not-allowed')
                                    : (isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700')
                                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-gray-900' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Logging in...</span>
                                </>
                            ) : (
                                <>
                                    <LogIn size={18} className="mr-2" />
                                    <span>Sign In</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-sm opacity-70">
                Made with 💙 by Puneeth
            </div>
        </div>
    );
}