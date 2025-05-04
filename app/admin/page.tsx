'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AboutSection from './components/AboutSection';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';


export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('about');
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={() => router.push('/')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    View Site
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex border-b overflow-x-auto">
                    <button
                        className={`px-6 py-3 font-medium ${activeTab === 'about' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => setActiveTab('about')}
                    >
                        About
                    </button>
                    <button
                        className={`px-6 py-3 font-medium ${activeTab === 'hero' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => setActiveTab('hero')}
                    >
                        Hero
                    </button>
                    <button
                        className={`px-6 py-3 font-medium ${activeTab === 'skills' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => setActiveTab('skills')}
                    >
                        Skills
                    </button>
                    <button
                        className={`px-6 py-3 font-medium ${activeTab === 'experience' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => setActiveTab('experience')}
                    >
                        Experience
                    </button>
                    <button
                        className={`px-6 py-3 font-medium ${activeTab === 'projects' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        Projects
                    </button>
                    <button
                        className={`px-6 py-3 font-medium ${activeTab === 'education' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => setActiveTab('education')}
                    >
                        Education
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'about' && <AboutSection />}
                    {activeTab === 'hero' && <HeroSection />}
                    {activeTab === 'skills' && <SkillsSection />}
                    {activeTab === 'experience' && <ExperienceSection />}
                    {activeTab === 'projects' && <ProjectsSection />}
                    {activeTab === 'education' && <EducationSection />}
                </div>
            </div>
        </div>
    );
}