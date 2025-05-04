'use client';

import React, { useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface FileUploaderProps {
    onUploadComplete: (url: string) => void;
    accept?: string;
    label?: string;
    currentValue?: string;
}

export default function FileUploader({
    onUploadComplete,
    accept = "image/*",
    label = "Upload File",
    currentValue
}: FileUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { theme } = useTheme();

    const handleUpload = async (file: File) => {
        if (!file) return;

        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                onUploadComplete(data.url);
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to upload file');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setError('An error occurred during upload');
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) setIsDragging(true);
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (isUploading) return;

        const file = e.dataTransfer.files?.[0];
        if (file) {
            // Check if file type matches accept attribute
            if (accept !== '*' && !file.type.match(accept.replace('*', '.*'))) {
                setError('Invalid file type');
                return;
            }
            handleUpload(file);
        }
    };

    const uploaderClasses = `border-2 border-dashed rounded-lg p-4 transition-colors ${isDragging
        ? 'border-blue-500 bg-blue-50'
        : theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
        } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`;

    const buttonClasses = `bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 ${theme === 'dark'
        ? 'bg-gray-600 hover:bg-gray-700 text-white'
        : ''
        }`;

    const textClasses = `text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
        } text-sm mt-2`;

    const errorClasses = `text-red-500 text-sm mt-1`;

    const imagePreviewClasses = `mt-2 h-24 w-auto object-cover rounded`;

    return (
        <div className="w-full">
            <div
                className={uploaderClasses}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex items-center space-x-4">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={buttonClasses}
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : label}
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={accept}
                        className="hidden"
                        onChange={handleFileInputChange}
                        disabled={isUploading}
                    />
                    {currentValue && (
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                            } truncate max-w-xs`}>
                            {currentValue.split('/').pop()}
                        </span>
                    )}
                </div>

                <p className={textClasses}>
                    {isDragging ? 'Drop file here' : 'or drag and drop file here'}
                </p>
            </div>

            {error && (
                <p className={errorClasses}>{error}</p>
            )}

            {currentValue && currentValue.match(/\.(jpeg|jpg|gif|png)$/) && (
                <div className="mt-2">
                    <img
                        src={currentValue}
                        alt="Preview"
                        className={imagePreviewClasses}
                    />
                </div>
            )}
        </div>
    );
}
