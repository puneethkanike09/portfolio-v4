'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface SocialLink {
    platform: string;
    url: string;
    icon: string;
}

interface FooterData {
    socialLinks: SocialLink[];
    copyrightText: string;
}

export default function FooterSection() {
    const [footerData, setFooterData] = useState<FooterData>({
        socialLinks: [],
        copyrightText: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { theme } = useTheme();

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const response = await fetch('/api/footer');
                if (response.ok) {
                    const data = await response.json();
                    setFooterData(data);
                }
            } catch (error) {
                console.error('Failed to fetch footer data:', error);
            }
        };

        fetchFooterData();
    }, []);

    const handleCopyrightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFooterData(prev => ({
            ...prev,
            copyrightText: e.target.value
        }));
    };

    const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
        const updatedLinks = [...footerData.socialLinks];
        updatedLinks[index] = {
            ...updatedLinks[index],
            [field]: value
        };
        setFooterData(prev => ({
            ...prev,
            socialLinks: updatedLinks
        }));
    };

    const addSocialLink = () => {
        setFooterData(prev => ({
            ...prev,
            socialLinks: [...prev.socialLinks, { platform: '', url: '', icon: '' }]
        }));
    };

    const removeSocialLink = (index: number) => {
        const updatedLinks = [...footerData.socialLinks];
        updatedLinks.splice(index, 1);
        setFooterData(prev => ({
            ...prev,
            socialLinks: updatedLinks
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/footer', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(footerData),
            });

            if (response.ok) {
                setMessage('Footer section updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Failed to update footer section.');
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

    const buttonClasses = `${theme === 'dark'
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`;

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className={labelClasses} htmlFor="copyrightText">
                    Copyright Text
                </label>
                <input
                    type="text"
                    id="copyrightText"
                    value={footerData.copyrightText}
                    onChange={handleCopyrightChange}
                    className={inputClasses}
                    placeholder="© 2024 Your Name. All rights reserved."
                    required
                />
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <label className={labelClasses}>Social Links</label>
                    <button
                        type="button"
                        onClick={addSocialLink}
                        className={buttonClasses}
                    >
                        Add Social Link
                    </button>
                </div>

                {footerData.socialLinks.map((link, index) => (
                    <div key={index} className={`border ${theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'
                        } p-4 mb-4 rounded`}>
                        <div className="flex justify-between mb-2">
                            <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                Social Link #{index + 1}
                            </h4>
                            <button
                                type="button"
                                onClick={() => removeSocialLink(index)}
                                className={`${theme === 'dark'
                                        ? 'text-red-400 hover:text-red-300'
                                        : 'text-red-600 hover:text-red-800'
                                    }`}
                            >
                                Remove
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className={labelClasses}>Platform</label>
                                <input
                                    type="text"
                                    value={link.platform}
                                    onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                                    className={inputClasses}
                                    placeholder="Instagram"
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>URL</label>
                                <input
                                    type="url"
                                    value={link.url}
                                    onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                                    className={inputClasses}
                                    placeholder="https://instagram.com/username"
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Icon</label>
                                <select
                                    value={link.icon}
                                    onChange={(e) => handleSocialLinkChange(index, 'icon', e.target.value)}
                                    className={inputClasses}
                                    required
                                >
                                    <option value="">Select an icon</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="LinkedIn">LinkedIn</option>
                                    <option value="GitHub">GitHub</option>
                                    <option value="WhatsApp">WhatsApp</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
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
                    className={buttonClasses}
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}