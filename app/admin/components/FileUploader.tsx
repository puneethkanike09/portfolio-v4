'use client';

import React, { useRef, useState } from 'react';

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
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
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

    return (
        <div className="w-full">
            <div className="flex items-center space-x-4">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isUploading}
                >
                    {isUploading ? 'Uploading...' : label}
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={handleUpload}
                />
                {currentValue && (
                    <span className="text-sm text-gray-500 truncate max-w-xs">
                        {currentValue.split('/').pop()}
                    </span>
                )}
            </div>

            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}

            {currentValue && currentValue.match(/\.(jpeg|jpg|gif|png)$/) && (
                <div className="mt-2">
                    <img
                        src={currentValue}
                        alt="Preview"
                        className="h-24 w-auto object-cover rounded"
                    />
                </div>
            )}
        </div>
    );
}