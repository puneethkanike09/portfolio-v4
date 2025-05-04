'use client';

import React, { useState, useEffect } from 'react';

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

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sectionTitle">
                    Section Title
                </label>
                <input
                    type="text"
                    id="sectionTitle"
                    name="sectionTitle"
                    value={educationData.sectionTitle}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sectionDescription">
                    Section Description
                </label>
                <textarea
                    id="sectionDescription"
                    name="sectionDescription"
                    value={educationData.sectionDescription}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                    required
                />
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-gray-700 text-sm font-bold">Education</label>
                    <button
                        type="button"
                        onClick={addEducation}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                    >
                        Add Education
                    </button>
                </div>

                {educationData.education.map((edu, index) => (
                    <div key={index} className="border p-4 mb-4 rounded">
                        <div className="flex justify-between mb-2">
                            <h4 className="font-bold">Education #{index + 1}</h4>
                            <button
                                type="button"
                                onClick={() => removeEducation(index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove
                            </button>
                        </div>

                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Icon
                            </label>
                            <select
                                value={edu.icon}
                                onChange={(e) => handleEducationChange(index, 'icon', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="GraduationCap">GraduationCap</option>
                                <option value="Award">Award</option>
                                <option value="BookOpen">BookOpen</option>
                            </select>
                        </div>

                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Degree
                            </label>
                            <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Institution
                            </label>
                            <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Year
                            </label>
                            <input
                                type="text"
                                value={edu.year}
                                onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Description
                            </label>
                            <textarea
                                value={edu.description}
                                onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                                required
                            />
                        </div>
                    </div>
                ))}
            </div>

            {message && (
                <div className={`mb-4 p-3 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}