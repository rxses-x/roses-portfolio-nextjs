import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { generateRandomGradient } from '../../utils/backgroundUtils';

const ProjectLogo = ({ name, logoSrc }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [logoError, setLogoError] = useState(false);
    
    // Get first letter of each word for fallback
    const initials = name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();

    // Generate random gradient using the utility function
    const randomGradient = useMemo(() => generateRandomGradient(isDark), [name, isDark]);

    // Validate logo source
    const isValidLogoSrc = logoSrc && typeof logoSrc === 'string' && logoSrc.trim() !== '';

    return (
        <div 
            className="w-full h-full flex items-center justify-center"
            style={randomGradient}
        >
            {isValidLogoSrc && !logoError ? (
                <div className="relative w-3/4 h-3/4">
                    <Image
                        src={logoSrc}
                        alt={`${name} logo`}
                        fill
                        className={`object-contain transition-all duration-300 ${
                            isDark 
                                ? 'brightness-0 invert' 
                                : 'brightness-0'
                        }`}
                        priority
                        onError={() => {
                            console.warn(`Logo not found for ${name}: ${logoSrc}`);
                            setLogoError(true);
                        }}
                    />
                </div>
            ) : (
                <span className={`text-6xl font-bold ${
                    isDark ? 'text-white' : 'text-black'
                }`}>
                    {initials}
                </span>
            )}
        </div>
    );
};

export default ProjectLogo; 