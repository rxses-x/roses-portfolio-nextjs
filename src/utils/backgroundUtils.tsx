// Predefined color palette for visually pleasing combinations
export const colors = [
    'rose', 'orange', 'amber', 'yellow',
    'lime', 'green', 'emerald', 'teal',
    'cyan', 'sky', 'blue', 'indigo',
    'violet', 'purple', 'fuchsia', 'pink'
] as const;

export type ColorName = typeof colors[number];

// Color mapping for RGB values
export const colorToRGB: Record<ColorName, [string, string]> = {
    rose: ['255,99,132', '255,71,87'],
    orange: ['255,159,64', '255,127,80'],
    amber: ['255,193,7', '255,179,0'],
    yellow: ['255,235,59', '255,221,0'],
    lime: ['205,220,57', '192,202,51'],
    green: ['76,175,80', '67,160,71'],
    emerald: ['46,204,113', '39,174,96'],
    teal: ['0,150,136', '0,121,107'],
    cyan: ['0,188,212', '0,151,167'],
    sky: ['3,169,244', '2,136,209'],
    blue: ['33,150,243', '25,118,210'],
    indigo: ['63,81,181', '48,63,159'],
    violet: ['156,39,176', '142,36,170'],
    purple: ['103,58,183', '81,45,168'],
    fuchsia: ['233,30,99', '216,27,96'],
    pink: ['233,30,99', '216,27,96']
};

interface GradientStyle {
    background: string;
}

/**
 * Generates a random gradient style based on the color palette
 * @param {boolean} isDark - Whether dark mode is enabled
 * @returns {Object} Style object containing the gradient background
 */
export const generateRandomGradient = (isDark: boolean): GradientStyle => {
    const getRandomColor = (): ColorName => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };
    
    const color1 = getRandomColor();
    let color2 = getRandomColor();
    // Ensure we don't get the same color twice
    while (color2 === color1) {
        color2 = getRandomColor();
    }

    const rgb1 = colorToRGB[color1][0];
    const rgb2 = colorToRGB[color2][1];
    
    return {
        background: isDark 
            ? `linear-gradient(135deg, rgba(${rgb1},0.4), rgba(${rgb2},0.5))`
            : `linear-gradient(135deg, rgba(${rgb1},0.3), rgba(${rgb2},0.4))`
    };
}; 