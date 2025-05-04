'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Home,
    Info,
    Code,
    Briefcase,
    FolderOpen,
    GraduationCap,
    KeyRound,
    LogOut,
    Menu,
    Sun,
    Moon,
    Mail,
    X,
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
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();

    // Check if we're on mobile and adjust sidebar accordingly
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        // Check on initial load
        checkScreenSize();

        // Add event listener for window resize
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

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

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        // On mobile, close the sidebar when a tab is selected
        if (isMobile) {
            setSidebarOpen(false);
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

    const getTabIcon = (tab) => {
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

    // Dynamic sidebar classes based on state
    const sidebarClasses = `${sidebarOpen ? 'translate-x-0' : isMobile ? '-translate-x-full' : 'w-20'
        } ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-800'
        } text-white transition-all duration-300 ease-in-out flex flex-col fixed md:relative h-full z-30 ${isMobile ? 'w-64' : sidebarOpen ? 'w-64' : 'w-20'
        }`;

    // Overlay for mobile when sidebar is open
    const overlayClasses = `fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity ${sidebarOpen && isMobile ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`;

    return (
        <div className={`flex flex-col md:flex-row h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            {/* Mobile overlay */}
            <div className={overlayClasses} onClick={toggleSidebar}></div>

            {/* Sidebar */}
            <div className={sidebarClasses}>
                <div className="p-4 flex items-center justify-between">
                    {(sidebarOpen || isMobile) && <h2 className="text-xl font-bold">Portfolio Admin</h2>}
                    <button
                        onClick={toggleSidebar}
                        className={`p-1 rounded-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}
                    >
                        {sidebarOpen && isMobile ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
                <div className="mt-6 flex-1">
                    {['hero', 'about', 'skills', 'experience', 'education', 'projects', 'contact', 'footer', 'password'].map((tab) => (
                        <button
                            key={tab}
                            className={`flex items-center w-full py-3 px-4 ${activeTab === tab
                                ? theme === 'dark' ? 'bg-gray-700' : 'bg-blue-700'
                                : theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'
                                }`}
                            onClick={() => handleTabClick(tab)}
                        >
                            <span className="mr-3">{getTabIcon(tab)}</span>
                            {(sidebarOpen || isMobile) && (
                                <span className="capitalize">{tab}</span>
                            )}
                        </button>
                    ))}
                    <button
                        className={`flex items-center w-full py-3 px-4 ${theme === 'dark' ? 'hover:bg-gray-700 border-t border-gray-700' : 'hover:bg-blue-700 border-t border-blue-700'}`}
                        onClick={handleLogout}
                    >
                        <span className="mr-3"><LogOut size={20} /></span>
                        {(sidebarOpen || isMobile) && <span>Logout</span>}
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top navbar */}
                <header className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-blue-800 text-white'} shadow-sm z-10`}>
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <button
                                onClick={toggleSidebar}
                                className={`md:hidden p-2 rounded-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}
                            >
                                <Menu size={20} />
                            </button>
                            <span className="ml-2 font-semibold md:hidden capitalize">{activeTab}</span>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-700 hover:bg-blue-600'}`}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </header>

                {/* Content area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="max-w-6xl mx-auto">
                        {/* Page header */}
                        <div className="mb-4 md:mb-6">
                            <h2 className={`text-lg md:text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} capitalize flex items-center`}>
                                {getTabIcon(activeTab)}
                                <span className="ml-2">{activeTab} Section</span>
                            </h2>
                            <p className={`text-xs md:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Manage your portfolio {activeTab} content here</p>
                        </div>

                        {/* Component container */}
                        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 md:p-6 rounded-lg shadow-sm`}>
                            {renderSection()}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className={`${theme === 'dark' ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t'} p-3 md:p-4`}>
                    <div className={`text-center text-xs md:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
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