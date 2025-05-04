'use client';

import React, { useState, useEffect } from 'react';

interface ExperienceItem {
    period: string;
    title: string;
    company: string;
    description: string;
    tags: string[];
}

interface ExperienceData {
    sectionTitle: string;
    sectionDescription: string;
    experiences: ExperienceItem[];
}

export default function ExperienceSection() {
    const [experienceData, setExperienceData] = useState<ExperienceData>({
        sectionTitle: '',
        sectionDescription: '',
        experiences: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchExperienceData = async () => {
            try {
                const response = await fetch('/api/experience');
                if (response.ok) {
                    const data = await response.json();
                    setExperienceData(data);
                }
            } catch (error) {
                console.error('Failed to fetch experience data:', error);
            }
        };

        fetchExperienceData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setExperienceData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleExperienceChange = (index: number, field: keyof ExperienceItem, value: string) => {
        const updatedExperiences = [...experienceData.experiences];
        updatedExperiences[index] = {
            ...updatedExperiences[index],
            [field]: value
        };
        setExperienceData(prev => ({
            ...prev,
            experiences: updatedExperiences
        }));
    };

    const handleTagChange = (experienceIndex: number, tagIndex: number, value: string) => {
        const updatedExperiences = [...experienceData.experiences];
        const updatedTags = [...updatedExperiences[experienceIndex].tags];
        updatedTags[tagIndex] = value;
        updatedExperiences[experienceIndex] = {
            ...updatedExperiences[experienceIndex],
            tags: updatedTags
        };
        setExperienceData(prev => ({
            ...prev,
            experiences: updatedExperiences
        }));
    };

    const addTag = (experienceIndex: number) => {
        const updatedExperiences = [...experienceData.experiences];
        updatedExperiences[experienceIndex] = {
            ...updatedExperiences[experienceIndex],
            tags: [...updatedExperiences[experienceIndex].tags, '']
        };
        setExperienceData(prev => ({
            ...prev,
            experiences: updatedExperiences
        }));
    };

    const removeTag = (experienceIndex: number, tagIndex: number) => {
        const updatedExperiences = [...experienceData.experiences];
        const updatedTags = [...updatedExperiences[experienceIndex].tags];
        updatedTags.splice(tagIndex, 1);
        updatedExperiences[experienceIndex] = {
            ...updatedExperiences[experienceIndex],
            tags: updatedTags
        };
        setExperienceData(prev => ({
            ...prev,
            experiences: updatedExperiences
        }));
    };

    const addExperience = () => {
        setExperienceData(prev => ({
            ...prev,
            experiences: [...prev.experiences, {
                period: '',
                title: '',
                company: '',
                description: '',
                tags: []
            }]
        }));
    };

    const removeExperience = (index: number) => {
        const updatedExperiences = [...experienceData.experiences];
        updatedExperiences.splice(index, 1);
        setExperienceData(prev => ({
            ...prev,
            experiences: updatedExperiences
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/experience', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(experienceData),
            });

            if (response.ok) {
                setMessage('Experience section updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Failed to update experience section.');
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
                    value={experienceData.sectionTitle}
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
                    value={experienceData.sectionDescription}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                    required
                />
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-gray-700 text-sm font-bold">Experiences</label>
                    <button
                        type="button"
                        onClick={addExperience}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                    >
                        Add Experience
                    </button>
                </div>

                {experienceData.experiences.map((experience, index) => (
                    <div key={index} className="border p-4 mb-4 rounded">
                        <div className="flex justify-between mb-2">
                            <h4 className="font-bold">Experience #{index + 1}</h4>
                            <button
                                type="button"
                                onClick={() => removeExperience(index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove
                            </button>
                        </div>

                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Period
                            </label>
                            <input
                                type="text"
                                value={experience.period}
                                onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                value={experience.title}
                                onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Company
                            </label>
                            <input
                                type="text"
                                value={experience.company}
                                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Description
                            </label>
                            <textarea
                                value={experience.description}
                                onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-gray-700 text-sm font-bold">
                                    Tags
                                </label>
                                <button
                                    type="button"
                                    onClick={() => addTag(index)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                                >
                                    Add Tag
                                </button>
                            </div>
                            {experience.tags.map((tag, tagIndex) => (
                                <div key={tagIndex} className="flex items-center mb-1">
                                    <input
                                        type="text"
                                        value={tag}
                                        onChange={(e) => handleTagChange(index, tagIndex, e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index, tagIndex)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
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