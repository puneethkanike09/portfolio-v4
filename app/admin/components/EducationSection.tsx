'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface EducationItem {
    icon: string;
    degree: string;
    institution: string;
    year: string;
    description: string;
}

interface EducationData {
    sectionTitle: string;
    sectionDescription: string;
    education: EducationItem[];
}

export default function EducationSection() {
    const [educationData, setEducationData] = useState<EducationData>({
        sectionTitle: '',
        sectionDescription: '',
        education: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { theme } = useTheme();

    useEffect(() => {
        const fetchEducationData = async () => {
            try {
                const response = await fetch('/api/education');
                if (response.ok) {
                    const data = await response.json();
                    setEducationData(data);
                }
            } catch (error) {
                console.error('Failed to fetch education data:', error);
            }
        };

        fetchEducationData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEducationData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEducationChange = (index: number, field: keyof EducationItem, value: string) => {
        const updatedEducation = [...educationData.education];
        updatedEducation[index] = {
            ...updatedEducation[index],
            [field]: value
        };
        setEducationData(prev => ({
            ...prev,
            education: updatedEducation
        }));
    };

    const addEducation = () => {
        setEducationData(prev => ({
            ...prev,
            education: [...prev.education, {
                icon: 'GraduationCap',
                degree: '',
                institution: '',
                year: '',
                description: ''
            }]
        }));
    };

    const removeEducation = (index: number) => {
        const updatedEducation = [...educationData.education];
        updatedEducation.splice(index, 1);
        setEducationData(prev => ({
            ...prev,
            education: updatedEducation
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/education', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(educationData),
            });

            if (response.ok) {
                setMessage('Education section updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Failed to update education section.');
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
                <label className={labelClasses} htmlFor="sectionTitle">
                    Section Title
                </label>
                <input
                    type="text"
                    id="sectionTitle"
                    name="sectionTitle"
                    value={educationData.sectionTitle}
                    onChange={handleInputChange}
                    className={inputClasses}
                    required
                />
            </div>

            <div className="mb-4">
                <label className={labelClasses} htmlFor="sectionDescription">
                    Section Description
                </label>
                <textarea
                    id="sectionDescription"
                    name="sectionDescription"
                    value={educationData.sectionDescription}
                    onChange={handleInputChange}
                    className={`${inputClasses} h-32`}
                    required
                />
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <label className={labelClasses}>Education</label>
                    <button
                        type="button"
                        onClick={addEducation}
                        className={buttonClasses}
                    >
                        Add Education
                    </button>
                </div>

                {educationData.education.map((edu, index) => (
                    <div key={index} className={`border ${theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'
                        } p-4 mb-4 rounded`}>
                        <div className="flex justify-between mb-2">
                            <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                Education #{index + 1}
                            </h4>
                            <button
                                type="button"
                                onClick={() => removeEducation(index)}
                                className={`${theme === 'dark'
                                    ? 'text-red-400 hover:text-red-300'
                                    : 'text-red-600 hover:text-red-800'
                                    }`}
                            >
                                Remove
                            </button>
                        </div>

                        <div className="mb-2">
                            <label className={labelClasses}>
                                Icon
                            </label>
                            <select
                                value={edu.icon}
                                onChange={(e) => handleEducationChange(index, 'icon', e.target.value)}
                                className={inputClasses}
                            >
                                <option value="GraduationCap">GraduationCap</option>
                                <option value="Award">Award</option>
                                <option value="BookOpen">BookOpen</option>
                            </select>
                        </div>

                        <div className="mb-2">
                            <label className={labelClasses}>
                                Degree
                            </label>
                            <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                className={inputClasses}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className={labelClasses}>
                                Institution
                            </label>
                            <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                className={inputClasses}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className={labelClasses}>
                                Year
                            </label>
                            <input
                                type="text"
                                value={edu.year}
                                onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                                className={inputClasses}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className={labelClasses}>
                                Description
                            </label>
                            <textarea
                                value={edu.description}
                                onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                                className={`${inputClasses} h-24`}
                                required
                            />
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