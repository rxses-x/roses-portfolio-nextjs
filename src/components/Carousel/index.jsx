import React, { useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

// Memoized navigation arrow component
const NavigationArrow = memo(({ direction, onClick, isDark }) => (
    <button
        onClick={onClick}
        className={`absolute ${direction === 'left' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 p-4 rounded-full 
            ${isDark ? 'bg-[#2d2d2d]/80' : 'bg-white/80'} 
            opacity-0 group-hover:opacity-100 hover:opacity-100 
            transition-all duration-300 ease-in-out
            hover:scale-110 active:scale-95
            shadow-lg backdrop-blur-sm z-30
            ${isDark ? 'hover:bg-[#2d2d2d]' : 'hover:bg-white'}`}
        aria-label={`${direction === 'left' ? 'Previous' : 'Next'} image`}
    >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDark ? 'text-white' : 'text-gray-800'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={direction === 'left' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
        </svg>
    </button>
));

// Memoized dot navigation component
const DotNavigation = memo(({ currentIndex, totalImages, onDotClick, isDark }) => (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-30 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm">
        {Array.from({ length: totalImages }, (_, index) => (
            <button
                key={index}
                onClick={() => onDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 
                    ${index === currentIndex 
                        ? 'w-4 bg-white' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                aria-label={`Go to image ${index + 1}`}
            />
        ))}
    </div>
));

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

    const handleUserInteraction = useCallback(() => {
        setIsPaused(true);
    }, []);

    const resumeAutoPlay = useCallback(() => {
        setIsPaused(false);
    }, []);

    const handleImageLoad = useCallback(() => {
        setIsLoading(false);
        setLoadedImages(prev => new Set([...prev, imageArray[currentIndex]]));
    }, [imageArray, currentIndex]);

    const handleDotClick = useCallback((index) => {
        setCurrentIndex(index);
        resumeAutoPlay();
    }, [resumeAutoPlay]);

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

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                setIsPaused(true);
                e.key === 'ArrowLeft' ? goToPrev() : goToNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToNext, goToPrev]);

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
                    <NavigationArrow 
                        direction="left" 
                        onClick={() => { handleUserInteraction(); goToPrev(); }} 
                        isDark={isDark} 
                    />
                    <NavigationArrow 
                        direction="right" 
                        onClick={() => { handleUserInteraction(); goToNext(); }} 
                        isDark={isDark} 
                    />
                </>
            )}

            {/* Dots navigation */}
            {imageArray.length > 1 && (
                <DotNavigation 
                    currentIndex={currentIndex}
                    totalImages={imageArray.length}
                    onDotClick={handleDotClick}
                    isDark={isDark}
                />
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

export default memo(Carousel); 