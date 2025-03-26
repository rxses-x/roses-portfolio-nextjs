import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import Carousel from '@/components/Carousel';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectName: string;
    tags: string;
    details: {
        imageSrc?: string[];
        description?: string;
        languages?: string[];
        url?: string;
        urlSrc?: string;
        [key: string]: any;
    };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, projectName, tags, details }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEsc);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Get the project details
    const projectDetails = details || {};

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-all duration-300"
            onClick={onClose}
        >
            <div 
                className={`relative max-w-4xl w-full rounded-lg overflow-hidden shadow-xl ${
                    isDark ? 'bg-[#1a1a1a]' : 'bg-white'
                } p-4 animate-modalEntry transform-gpu`}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className={`absolute top-4 right-4 z-20 p-2 rounded-full ${
                        isDark ? 'bg-[#2d2d2d] text-white' : 'bg-gray-100 text-gray-800'
                    } hover:opacity-80 transition-opacity`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="relative w-full h-[50vh]">
                    <Carousel 
                        images={projectDetails.imageSrc || []} 
                        projectName={projectName} 
                    />
                </div>

                <div className="mt-6">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-2xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {projectName}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                            isDark 
                                ? 'bg-[#2d2d2d] text-gray-300' 
                                : 'bg-gray-100 text-gray-600'
                        }`}>
                            {tags}
                        </span>
                    </div>
                    <div className={`mt-2 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {projectDetails.description && (
                            <p>{projectDetails.description}</p>
                        )}
                        {projectDetails.languages && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {projectDetails.languages.map((language, index) => (
                                    <span
                                        key={index}
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            isDark 
                                                ? 'bg-[#2d2d2d] text-gray-300' 
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        {language}
                                    </span>
                                ))}
                            </div>
                        )}
                        {projectDetails.url && (
                            <div className="block mt-2 text-base">
                                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                    View live{' '}
                                </span>
                                <a 
                                    href={projectDetails.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`hover:underline ${
                                        isDark ? 'text-blue-400' : 'text-blue-600'
                                    }`}
                                >
                                    {projectDetails.url}
                                </a>
                            </div>
                        )}
                        {projectDetails.urlSrc && (
                            <div className="block mt-2 text-base">
                                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                    Source code{' '}
                                </span>
                                <a 
                                    href={projectDetails.urlSrc}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`hover:underline ${
                                        isDark ? 'text-blue-400' : 'text-blue-600'
                                    }`}
                                >
                                    {projectDetails.urlSrc}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal; 