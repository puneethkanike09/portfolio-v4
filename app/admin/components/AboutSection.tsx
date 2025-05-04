'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface AboutData {
    name: string;
    description: string;
    location: string;
    email: string;
    experience: string;
    imageUrl: string;
}

export default function AboutSection() {
    const [aboutData, setAboutData] = useState<AboutData>({
        name: '',
        description: '',
        location: '',
        email: '',
        experience: '',
        imageUrl: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await fetch('/api/about');
                if (response.ok) {
                    const data = await response.json();
                    setAboutData(data);
                }
            } catch (error) {
                console.error('Failed to fetch about data:', error);
            }
        };

        fetchAboutData();
    }, []);

    const handleAboutInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAboutData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setAboutData(prev => ({
                    ...prev,
                    imageUrl: data.url
                }));
                setMessage('Image uploaded successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Failed to upload image.');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setMessage('An error occurred while uploading.');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleAboutSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/about', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aboutData),
            });

            if (response.ok) {
                setMessage('About section updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Failed to update about section.');
            }
        } catch (error) {
            setMessage('An error occurred while updating.');
        } finally {
            setIsLoading(false);
        }
    };

    const inputClasses = `shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'dark'
        ? 'bg-gray-700 border-gray-600 text-white'
        : 'bg-white border-gray-300 text-gray-700'
        } leading-tight focus:outline-none focus:shadow-outline`;

    const labelClasses = `block ${theme === 'dark' ? 'text-white' : 'text-gray-700'
        } text-sm font-bold mb-2`;

    return (
        <form onSubmit={handleAboutSubmit}>
            <div className="mb-4">
                <label className={labelClasses} htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={aboutData.name}
                    onChange={handleAboutInputChange}
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
                    value={aboutData.description}
                    onChange={handleAboutInputChange}
                    className={`${inputClasses} h-32`}
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className={labelClasses} htmlFor="location">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={aboutData.location}
                        onChange={handleAboutInputChange}
                        className={inputClasses}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className={labelClasses} htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={aboutData.email}
                        onChange={handleAboutInputChange}
                        className={inputClasses}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className={labelClasses} htmlFor="experience">
                        Experience
                    </label>
                    <input
                        type="text"
                        id="experience"
                        name="experience"
                        value={aboutData.experience}
                        onChange={handleAboutInputChange}
                        className={inputClasses}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className={labelClasses} htmlFor="imageUpload">
                        Profile Image
                    </label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={aboutData.imageUrl}
                            onChange={handleAboutInputChange}
                            className={inputClasses}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className={`${theme === 'dark'
                                ? 'bg-gray-600 hover:bg-gray-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                } font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                            disabled={uploadingImage}
                        >
                            {uploadingImage ? 'Uploading...' : 'Upload'}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </div>
                    {aboutData.imageUrl && (
                        <div className="mt-2">
                            <img
                                src={aboutData.imageUrl}
                                alt="Preview"
                                className="h-24 w-auto object-cover rounded"
                            />
                        </div>
                    )}
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