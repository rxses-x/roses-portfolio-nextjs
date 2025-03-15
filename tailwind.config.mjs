/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path based on your project structure
  ],
  darkMode: "class",
  theme: {
    screens: {
      'mob': '375px',
      'tablet': '768px',
      'laptop': '1024px',
      'desktop': '1280px',
      'laptopl': '1440px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, rgb(99, 54, 91) 0%, rgba(17, 17, 76, 0.8) 100%)',
      },
      keyframes: {
        modalEntry: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.95) translateY(10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1) translateY(0)'
          }
        }
      },
      animation: {
        modalEntry: 'modalEntry 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }
    },
  },
  plugins: [],
};

export default config;