'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ContactData {
    rotatingTexts: string[];
    formActionUrl: string;
}

export default function ContactSection() {
    const [contactData, setContactData] = useState<ContactData>({
        rotatingTexts: ['Hiring', 'Web Development'],
        formActionUrl: 'https://formspree.io/f/mwpejavr',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { theme } = useTheme();

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const response = await fetch('/api/contact');
                if (response.ok) {
                    const data = await response.json();
                    setContactData(data);
                }
            } catch (error) {
                console.error('Failed to fetch contact data:', error);
            }
        };

        fetchContactData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContactData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRotatingTextsChange = (index: number, value: string) => {
        setContactData(prev => {
            const newRotatingTexts = [...prev.rotatingTexts];
            newRotatingTexts[index] = value;
            return { ...prev, rotatingTexts: newRotatingTexts };
        });
    };

    const addRotatingText = () => {
        setContactData(prev => ({
            ...prev,
            rotatingTexts: [...prev.rotatingTexts, ''],
        }));
    };

    const removeRotatingText = (index: number) => {
        setContactData(prev => ({
            ...prev,
            rotatingTexts: prev.rotatingTexts.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            });

            if (response.ok) {
                setMessage('Contact section updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Failed to update contact section.');
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
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className={labelClasses} htmlFor="formActionUrl">
                    Form Action URL
                </label>
                <input
                    type="text"
                    id="formActionUrl"
                    name="formActionUrl"
                    value={contactData.formActionUrl}
                    onChange={handleInputChange}
                    className={inputClasses}
                    required
                />
            </div>

            <div className="mb-4">
                <label className={labelClasses}>Rotating Texts</label>
                {contactData.rotatingTexts.map((text, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => handleRotatingTextsChange(index, e.target.value)}
                            className={inputClasses}
                            placeholder={`Rotating Text ${index + 1}`}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => removeRotatingText(index)}
                            className="text-red-500 hover:text-red-700"
                            disabled={contactData.rotatingTexts.length <= 1}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addRotatingText}
                    className="text-blue-500 hover:text-blue-700 mt-2"
                >
                    Add Rotating Text
                </button>
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