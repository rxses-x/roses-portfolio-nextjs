// // @ts-nocheck
// import React, { useEffect, useState } from "react";
// import CustomCursor from 'custom-cursor-react';
// import 'custom-cursor-react/dist/index.css';
// import { useTheme } from 'next-themes';

// const Cursor = () => {
//     const { theme } = useTheme();
//     const [ mounted, setMounted ] = useState(false);
//     const [ isVisible, setIsVisible ] = useState(true);
//     const isDark = theme === 'dark'

//     useEffect(() => {
//         setMounted(true);
        
//         // Add cursor class to all interactive elements
//         const interactiveElements = document.querySelectorAll('input, button, textarea, select, a, [role="button"]');
//         interactiveElements.forEach(el => {
//             el.classList.add('link');
//         });

//         // Handle visibility change
//         const handleVisibilityChange = () => {
//             setIsVisible(document.visibilityState === 'visible');
//         };

//         // Handle mouse move to ensure cursor stays visible
//         const handleMouseMove = () => {
//             setIsVisible(true);
//         };

//         document.addEventListener('visibilitychange', handleVisibilityChange);
//         document.addEventListener('mousemove', handleMouseMove);
//     }, []);

//     const getTheme = () => {
//         return isDark ? '#fff' : '#000';
//     }

//     if (!mounted) return null;

//     return (
//         <>
//             <CustomCursor
//                 targets={['.link']}
//                 customClass="custom-cursor"
//                 dimensions={30}
//                 fill={ getTheme() }
//                 smoothness={{
//                     movement: 0.2,
//                     scale: 0.1,
//                     opacity: 0.2,
//                 }}
//                 targetOpacity={0.5}
//                 targetScale={2}
//                 opacity={1}
//             />
//         </>
//     )
// }

// export default Cursor;