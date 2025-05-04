'use client';

import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import { useTheme } from '@/contexts/ThemeContext';

interface HeroData {
    name: string;
    mainPhrase: string;
    description: string;
    resumeUrl: string;
    blurAmount: number;
    borderColor: string;
    animationDuration: number;
    pauseBetweenAnimations: number;
}

export default function HeroSection() {
    const [heroData, setHeroData] = useState<HeroData>({
        name: '',
        mainPhrase: '',
        description: '',
        resumeUrl: '',
        blurAmount: 5,
        borderColor: 'black',
        animationDuration: 2,
        pauseBetweenAnimations: 1
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { theme } = useTheme();

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await fetch('/api/hero');
                if (response.ok) {
                    const data = await response.json();
                    setHeroData(data);
                }
            } catch (error) {
                console.error('Failed to fetch hero data:', error);
            }
        };

        fetchHeroData();
    }, []);

    const handleHeroInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setHeroData(prev => ({
            ...prev,
            [name]: typeof prev[name as keyof HeroData] === 'number' ? Number(value) : value
        }));
    };

    const handleHeroSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/hero', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(heroData),
            });

            if (response.ok) {
                setMessage('Hero section updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Failed to update hero section.');
            }
        } catch (error) {
            setMessage('An error occurred while updating.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResumeUpload = (url: string) => {
        setHeroData(prev => ({
            ...prev,
            resumeUrl: url
        }));
        setMessage('Resume uploaded successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    const inputClasses = `shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'dark'
        ? 'bg-gray-700 border-gray-600 text-white'
        : 'bg-white border-gray-300 text-gray-700'
        } leading-tight focus:outline-none focus:shadow-outline`;

    const labelClasses = `block ${theme === 'dark' ? 'text-white' : 'text-gray-700'
        } text-sm font-bold mb-2`;

    return (
        <form onSubmit={handleHeroSubmit}>
            <div className="mb-4">
                <label className={labelClasses} htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={heroData.name}
                    onChange={handleHeroInputChange}
                    className={inputClasses}
                    required
                />
            </div>

            <div className="mb-4">
                <label className={labelClasses} htmlFor="mainPhrase">
                    Main Phrase
                </label>
                <input
                    type="text"
                    id="mainPhrase"
                    name="mainPhrase"
                    value={heroData.mainPhrase}
                    onChange={handleHeroInputChange}
                    className={inputClasses}
                    required
                />
            </div>

            <div className="mb-4">
                <label className={labelClasses} htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={heroData.description}
                    onChange={handleHeroInputChange}
                    className={`${inputClasses} h-32`}
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className={labelClasses} htmlFor="resumeUrl">
                        Resume URL
                    </label>
                    <div className="flex flex-col space-y-2">
                        <input
                            type="text"
                            id="resumeUrl"
                            name="resumeUrl"
                            value={heroData.resumeUrl}
                            onChange={handleHeroInputChange}
                            className={inputClasses}
                            required
                        />
                        <FileUploader
                            onUploadComplete={handleResumeUpload}
                            accept=".pdf,.doc,.docx"
                            label="Upload Resume"
                            currentValue={heroData.resumeUrl}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className={labelClasses} htmlFor="borderColor">
                        Border Color
                    </label>
                    <input
                        type="text"
                        id="borderColor"
                        name="borderColor"
                        value={heroData.borderColor}
                        onChange={handleHeroInputChange}
                        className={inputClasses}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className={labelClasses} htmlFor="blurAmount">
                        Blur Amount
                    </label>
                    <input
                        type="number"
                        id="blurAmount"
                        name="blurAmount"
                        value={heroData.blurAmount}
                        onChange={handleHeroInputChange}
                        className={inputClasses}
                        required
                        min="1"
                        max="20"
                    />
                </div>

                <div className="mb-4">
                    <label className={labelClasses} htmlFor="animationDuration">
                        Animation Duration (seconds)
                    </label>
                    <input
                        type="number"
                        id="animationDuration"
                        name="animationDuration"
                        value={heroData.animationDuration}
                        onChange={handleHeroInputChange}
                        className={inputClasses}
                        required
                        min="0.5"
                        max="10"
                        step="0.1"
                    />
                </div>

                <div className="mb-4">
                    <label className={labelClasses} htmlFor="pauseBetweenAnimations">
                        Pause Between Animations (seconds)
                    </label>
                    <input
                        type="number"
                        id="pauseBetweenAnimations"
                        name="pauseBetweenAnimations"
                        value={heroData.pauseBetweenAnimations}
                        onChange={handleHeroInputChange}
                        className={inputClasses}
                        required
                        min="0"
                        max="5"
                        step="0.1"
                    />
                </div>
            </div>

            {message && (
                <div className={`mb-4 p-3 rounded ${message.includes('success')
                    ? theme === 'dark' ? 'bg-green-800 text-green-100' : 'bg-green-100 text-green-700'
                    : theme === 'dark' ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-700'
                    }`}>
                    {message}
                </div>
            )}

            <div className="flex justify-end">
                <button
                    type="submit"
                    className={`${theme === 'dark'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-blue-500 hover:bg-blue-600'
                        } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}