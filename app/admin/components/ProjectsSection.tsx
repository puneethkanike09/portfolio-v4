'use client';

import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';

interface ProjectItem {
    id: number;
    title: string;
    category: string;
    image: string;
    images: string[];
    description: string;
    tags: string[];
    websiteUrl: string;
    githubUrl: string;
}

interface ProjectData {
    sectionTitle: string;
    sectionDescription: string;
    projects: ProjectItem[];
}

export default function ProjectsSection() {
    const [projectData, setProjectData] = useState<ProjectData>({
        sectionTitle: '',
        sectionDescription: '',
        projects: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await fetch('/api/projects');
                if (response.ok) {
                    const data = await response.json();
                    setProjectData(data);
                }
            } catch (error) {
                console.error('Failed to fetch project data:', error);
            }
        };

        fetchProjectData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProjectData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProjectChange = (index: number, field: keyof ProjectItem, value: string | string[]) => {
        const updatedProjects = [...projectData.projects];
        updatedProjects[index] = {
            ...updatedProjects[index],
            [field]: value
        };
        setProjectData(prev => ({
            ...prev,
            projects: updatedProjects
        }));
    };

    const handleTagChange = (projectIndex: number, tagIndex: number, value: string) => {
        const updatedProjects = [...projectData.projects];
        const updatedTags = [...updatedProjects[projectIndex].tags];
        updatedTags[tagIndex] = value;
        updatedProjects[projectIndex] = {
            ...updatedProjects[projectIndex],
            tags: updatedTags
        };
        setProjectData(prev => ({
            ...prev,
            projects: updatedProjects
        }));
    };

    const addTag = (projectIndex: number) => {
        const updatedProjects = [...projectData.projects];
        updatedProjects[projectIndex] = {
            ...updatedProjects[projectIndex],
            tags: [...updatedProjects[projectIndex].tags, '']
        };
        setProjectData(prev => ({
            ...prev,
            projects: updatedProjects
        }));
    };

    const removeTag = (projectIndex: number, tagIndex: number) => {
        const updatedProjects = [...projectData.projects];
        const updatedTags = [...updatedProjects[projectIndex].tags];
        updatedTags.splice(tagIndex, 1);
        updatedProjects[projectIndex] = {
            ...updatedProjects[projectIndex],
            tags: updatedTags
        };
        setProjectData(prev => ({
            ...prev,
            projects: updatedProjects
        }));
    };

    const handleImageChange = (projectIndex: number, imageIndex: number, value: string) => {
        const updatedProjects = [...projectData.projects];
        const updatedImages = [...(updatedProjects[projectIndex].images || [])];
        updatedImages[imageIndex] = value;
        updatedProjects[projectIndex] = {
            ...updatedProjects[projectIndex],
            images: updatedImages
        };
        setProjectData(prev => ({
            ...prev,
            projects: updatedProjects
        }));
    };

    const addImage = (projectIndex: number) => {
        const updatedProjects = [...projectData.projects];
        updatedProjects[projectIndex] = {
            ...updatedProjects[projectIndex],
            images: [...(updatedProjects[projectIndex].images || []), '']
        };
        setProjectData(prev => ({
            ...prev,
            projects: updatedProjects
        }));
    };

    const removeImage = (projectIndex: number, imageIndex: number) => {
        const updatedProjects = [...projectData.projects];
        const updatedImages = [...(updatedProjects[projectIndex].images || [])];
        updatedImages.splice(imageIndex, 1);
        updatedProjects[projectIndex] = {
            ...updatedProjects[projectIndex],
            images: updatedImages
        };
        setProjectData(prev => ({
            ...prev,
            projects: updatedProjects
        }));
    };

    const addProject = () => {
        // Find the highest ID and increment by 1
        const nextId = projectData.projects.length > 0
            ? Math.max(...projectData.projects.map(p => p.id)) + 1
            : 1;

        setProjectData(prev => ({
            ...prev,
            projects: [...prev.projects, {
                id: nextId,
                title: '',
                category: 'web',
                image: '',
                images: [],
                description: '',
                tags: [],
                websiteUrl: '',
                githubUrl: ''
            }]
        }));
    };

    const removeProject = (index: number) => {
        const updatedProjects = [...projectData.projects];
        updatedProjects.splice(index, 1);
        setProjectData(prev => ({
            ...prev,
            projects: updatedProjects
        }));
    };

    const handleImageUpload = (url: string, projectIndex: number, field: 'image' | 'images', imageIndex?: number) => {
        if (field === 'image') {
            handleProjectChange(projectIndex, 'image', url);
        } else if (field === 'images' && typeof imageIndex === 'number') {
            handleImageChange(projectIndex, imageIndex, url);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/projects', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (response.ok) {
                setMessage('Projects section updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Failed to update projects section.');
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
                    value={projectData.sectionTitle}
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
                    value={projectData.sectionDescription}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                    required
                />
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-gray-700 text-sm font-bold">Projects</label>
                    <button
                        type="button"
                        onClick={addProject}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                    >
                        Add Project
                    </button>
                </div>

                {projectData.projects.map((project, index) => (
                    <div key={index} className="border p-4 mb-4 rounded">
                        <div className="flex justify-between mb-2">
                            <h4 className="font-bold">Project #{index + 1}</h4>
                            <button
                                type="button"
                                onClick={() => removeProject(index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={project.title}
                                    onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    value={project.category}
                                    onChange={(e) => handleProjectChange(index, 'category', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Description
                            </label>
                            <textarea
                                value={project.description}
                                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Main Image
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={project.image}
                                    onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                <FileUploader
                                    onUploadComplete={(url) => handleImageUpload(url, index, 'image')}
                                    accept="image/*"
                                    label="Upload"
                                    currentValue={project.image}
                                />
                            </div>
                            {project.image && (
                                <div className="mt-2">
                                    <img
                                        src={project.image}
                                        alt="Preview"
                                        className="h-24 w-auto object-cover rounded"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mb-2">
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-gray-700 text-sm font-bold">
                                    Additional Images
                                </label>
                                <button
                                    type="button"
                                    onClick={() => addImage(index)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                                >
                                    Add Image
                                </button>
                            </div>
                            {(project.images || []).map((image, imageIndex) => (
                                <div key={imageIndex} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        value={image}
                                        onChange={(e) => handleImageChange(index, imageIndex, e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                        required
                                    />
                                    <FileUploader
                                        onUploadComplete={(url) => handleImageUpload(url, index, 'images', imageIndex)}
                                        accept="image/*"
                                        label="Upload"
                                        currentValue={image}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index, imageIndex)}
                                        className="text-red-600 hover:text-red-800 text-sm ml-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                    Website URL
                                </label>
                                <input
                                    type="text"
                                    value={project.websiteUrl}
                                    onChange={(e) => handleProjectChange(index, 'websiteUrl', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                    GitHub URL
                                </label>
                                <input
                                    type="text"
                                    value={project.githubUrl}
                                    onChange={(e) => handleProjectChange(index, 'githubUrl', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
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
                            {project.tags.map((tag, tagIndex) => (
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