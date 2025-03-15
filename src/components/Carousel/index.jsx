import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const Carousel = ({ images, projectName }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState(new Set());
    const [isPaused, setIsPaused] = useState(false);

    // Ensure images is always an array
    const imageArray = Array.isArray(images) ? images : [];

    const goToNext = useCallback(() => {
        if (imageArray.length <= 1) return;
        setCurrentIndex(prev => (prev + 1) % imageArray.length);
    }, [imageArray.length]);

    const goToPrev = useCallback(() => {
        if (imageArray.length <= 1) return;
        setCurrentIndex(prev => (prev - 1 + imageArray.length) % imageArray.length);
    }, [imageArray.length]);

    const resumeAutoPlay = useCallback(() => {
        setIsPaused(false);
    }, []);

    // Reset states when images prop changes
    useEffect(() => {
        setCurrentIndex(0);
        setImageError(false);
        setIsLoading(true);
        setLoadedImages(new Set());
        setIsPaused(false);
    }, [images]);

    // Auto-play functionality
    useEffect(() => {
        if (imageArray.length <= 1 || isPaused) return;

        const timer = setInterval(goToNext, 5000);
        return () => clearInterval(timer);
    }, [isPaused, imageArray.length, goToNext]);

    // Add keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            setIsPaused(true);
            if (e.key === 'ArrowLeft') {
                goToPrev();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToNext, goToPrev]);

    const handleImageLoad = () => {
        setIsLoading(false);
        setLoadedImages(prev => new Set([...prev, imageArray[currentIndex]]));
    };

    const handleUserInteraction = () => {
        setIsPaused(true);
    };

    if (!imageArray || imageArray.length === 0 || imageError) {
        return (
            <div className={`w-full h-full flex items-center justify-center ${
                isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
                <span>No image available</span>
            </div>
        );
    }

    return (
        <div 
            className="relative w-full h-full group overflow-hidden rounded-lg"
            onMouseEnter={handleUserInteraction}
            onMouseLeave={resumeAutoPlay}
            onTouchStart={handleUserInteraction}
            onTouchEnd={resumeAutoPlay}
        >
            {/* Loading indicator */}
            {isLoading && !loadedImages.has(imageArray[currentIndex]) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-20">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                </div>
            )}

            {/* Main image */}
            <div className="relative w-full h-full">
                <Image
                    src={imageArray[currentIndex]}
                    alt={`${projectName} - Image ${currentIndex + 1}`}
                    className={`object-contain transition-all duration-500 ease-in-out transform ${
                        isLoading && !loadedImages.has(imageArray[currentIndex]) 
                            ? 'opacity-0 scale-95' 
                            : 'opacity-100 scale-100'
                    }`}
                    fill
                    quality={100}
                    priority
                    onError={() => setImageError(true)}
                    onLoad={handleImageLoad}
                />
            </div>

            {/* Navigation arrows */}
            {imageArray.length > 1 && (
                <>
                    <button
                        onClick={() => {
                            handleUserInteraction();
                            goToPrev();
                        }}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full 
                            ${isDark ? 'bg-[#2d2d2d]/80' : 'bg-white/80'} 
                            opacity-0 group-hover:opacity-100 hover:opacity-100 
                            transition-all duration-300 ease-in-out
                            hover:scale-110 active:scale-95
                            shadow-lg backdrop-blur-sm z-30
                            ${isDark ? 'hover:bg-[#2d2d2d]' : 'hover:bg-white'}`}
                        aria-label="Previous image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDark ? 'text-white' : 'text-gray-800'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => {
                            handleUserInteraction();
                            goToNext();
                        }}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full 
                            ${isDark ? 'bg-[#2d2d2d]/80' : 'bg-white/80'} 
                            opacity-0 group-hover:opacity-100 hover:opacity-100 
                            transition-all duration-300 ease-in-out
                            hover:scale-110 active:scale-95
                            shadow-lg backdrop-blur-sm z-30
                            ${isDark ? 'hover:bg-[#2d2d2d]' : 'hover:bg-white'}`}
                        aria-label="Next image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDark ? 'text-white' : 'text-gray-800'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Dots navigation */}
            {imageArray.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-30 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm">
                    {imageArray.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentIndex(index);
                                resumeAutoPlay();
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 
                                ${index === currentIndex 
                                    ? 'w-4 bg-white' 
                                    : 'bg-white/50 hover:bg-white/75'
                                }`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Image counter */}
            {imageArray.length > 1 && (
                <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm 
                    ${isDark ? 'bg-[#2d2d2d]/80' : 'bg-white/80'} 
                    backdrop-blur-sm shadow-lg z-30
                    transition-all duration-300 ease-in-out
                    ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {currentIndex + 1} / {imageArray.length}
                </div>
            )}
        </div>
    );
};

export default Carousel; 