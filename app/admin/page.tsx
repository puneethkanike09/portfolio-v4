'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    User,
    Home,
    Info,
    Code,
    Briefcase,
    FolderOpen,
    GraduationCap,
    KeyRound,
    Bell,
    Search,
    Settings,
    LogOut,
    Menu,
    X,
    Sun,
    Moon,
    Mail,
} from 'lucide-react';

import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import FooterSection from './components/FooterSection';
import PasswordSection from './components/PasswordSection';
import ContactSection from './components/ContactSection';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('hero');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
            });
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const renderSection = () => {
        switch (activeTab) {
            case 'hero':
                return <HeroSection />;
            case 'about':
                return <AboutSection />;
            case 'skills':
                return <SkillsSection />;
            case 'projects':
                return <ProjectsSection />;
            case 'experience':
                return <ExperienceSection />;
            case 'education':
                return <EducationSection />;
            case 'footer':
                return <FooterSection />;
            case 'password':
                return <PasswordSection />;
            case 'contact':
                return <ContactSection />;
            default:
                return <HeroSection />;
        }
    };

    const getTabIcon = (tab: string) => {
        switch (tab) {
            case 'hero':
                return <Home size={20} />;
            case 'about':
                return <Info size={20} />;
            case 'skills':
                return <Code size={20} />;
            case 'projects':
                return <FolderOpen size={20} />;
            case 'experience':
                return <Briefcase size={20} />;
            case 'education':
                return <GraduationCap size={20} />;
            case 'password':
                return <KeyRound size={20} />;
            case 'contact':
                return <Mail size={20} />;
            default:
                return <Home size={20} />;
        }
    };

    return (
        <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-20'} ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-800'} text-white transition-all duration-300 ease-in-out flex flex-col`}>
                <div className="p-4 flex items-center justify-between">
                    {sidebarOpen && <h2 className="text-xl font-bold">Portfolio Admin</h2>}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`p-1 rounded-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}
                    >
                        <Menu size={20} />
                    </button>
                </div>
                <div className="mt-6 flex-1">
                    {['hero', 'about', 'skills', 'experience', 'education', 'projects', 'contact', 'footer', 'password',].map((tab) => (
                        <button
                            key={tab}
                            className={`flex items-center w-full py-3 px-4 ${activeTab === tab
                                ? theme === 'dark' ? 'bg-gray-700' : 'bg-blue-700'
                                : theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            <span className="mr-3">{getTabIcon(tab)}</span>
                            {sidebarOpen && (
                                <span className="capitalize">{tab}</span>
                            )}
                        </button>
                    ))}
                    <button
                        className={`flex items-center w-full py-3 px-4 ${theme === 'dark' ? 'hover:bg-gray-700 border-t border-gray-700' : 'hover:bg-blue-700 border-t border-blue-700'}`}
                        onClick={handleLogout}
                    >
                        <span className="mr-3"><LogOut size={20} /></span>
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top navbar */}
                <header className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-blue-800 text-gray-800'} shadow-sm z-10`}>
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                        </div>
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </header>

                {/* Content area */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-6xl mx-auto">
                        {/* Page header */}
                        <div className="mb-6">
                            <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} capitalize flex items-center`}>
                                {getTabIcon(activeTab)}
                                <span className="ml-2">{activeTab} Section</span>
                            </h2>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Manage your portfolio {activeTab} content here</p>
                        </div>

                        {/* Component container */}
                        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
                            {renderSection()}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className={`${theme === 'dark' ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t'} p-4`}>
                    <div className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Made with 💙 by Puneeth
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default function AdminPage() {
    return (
        <ThemeProvider>
            <AdminDashboard />
        </ThemeProvider>
    );
}