'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface SkillItem {
    iconType: string;
    title: string;
    description: string;
}

interface SkillsData {
    sectionTitle: string;
    sectionDescription: string;
    skills: SkillItem[];
}

export default function SkillsSection() {
    const [skillsData, setSkillsData] = useState<SkillsData>({
        sectionTitle: '',
        sectionDescription: '',
        skills: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { theme } = useTheme();

    useEffect(() => {
        const fetchSkillsData = async () => {
            try {
                const response = await fetch('/api/skills');
                if (response.ok) {
                    const data = await response.json();
                    setSkillsData(data);
                }
            } catch (error) {
                console.error('Failed to fetch skills data:', error);
            }
        };

        fetchSkillsData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSkillsData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSkillChange = (index: number, field: keyof SkillItem, value: string) => {
        const updatedSkills = [...skillsData.skills];
        updatedSkills[index] = {
            ...updatedSkills[index],
            [field]: value
        };
        setSkillsData(prev => ({
            ...prev,
            skills: updatedSkills
        }));
    };

    const addSkill = () => {
        setSkillsData(prev => ({
            ...prev,
            skills: [...prev.skills, { iconType: 'Code', title: '', description: '' }]
        }));
    };

    const removeSkill = (index: number) => {
        const updatedSkills = [...skillsData.skills];
        updatedSkills.splice(index, 1);
        setSkillsData(prev => ({
            ...prev,
            skills: updatedSkills
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/skills', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(skillsData),
            });

            if (response.ok) {
                setMessage('Skills section updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Failed to update skills section.');
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
                <label className={labelClasses} htmlFor="sectionTitle">
                    Section Title
                </label>
                <input
                    type="text"
                    id="sectionTitle"
                    name="sectionTitle"
                    value={skillsData.sectionTitle}
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
                    value={skillsData.sectionDescription}
                    onChange={handleInputChange}
                    className={`${inputClasses} h-32`}
                    required
                />
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <label className={labelClasses}>Skills</label>
                    <button
                        type="button"
                        onClick={addSkill}
                        className={`${theme === 'dark'
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-blue-500 hover:bg-blue-600'
                            } text-white font-bold py-1 px-3 rounded text-sm`}
                    >
                        Add Skill
                    </button>
                </div>

                {skillsData.skills.map((skill, index) => (
                    <div key={index} className={`border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                        } p-4 mb-4 rounded`}>
                        <div className="flex justify-between mb-2">
                            <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                Skill #{index + 1}
                            </h4>
                            <button
                                type="button"
                                onClick={() => removeSkill(index)}
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
                                Icon Type
                            </label>
                            <select
                                value={skill.iconType}
                                onChange={(e) => handleSkillChange(index, 'iconType', e.target.value)}
                                className={inputClasses}
                            >
                                <option value="Code">Code</option>
                                <option value="Globe">Globe</option>
                                <option value="Layers">Layers</option>
                                <option value="Terminal">Terminal</option>
                                <option value="FileCode">FileCode</option>
                                <option value="Monitor">Monitor</option>
                                <option value="Database">Database</option>
                                <option value="Palette">Palette</option>
                            </select>
                        </div>

                        <div className="mb-2">
                            <label className={labelClasses}>
                                Title
                            </label>
                            <input
                                type="text"
                                value={skill.title}
                                onChange={(e) => handleSkillChange(index, 'title', e.target.value)}
                                className={inputClasses}
                                required
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>
                                Description
                            </label>
                            <textarea
                                value={skill.description}
                                onChange={(e) => handleSkillChange(index, 'description', e.target.value)}
                                className={inputClasses}
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