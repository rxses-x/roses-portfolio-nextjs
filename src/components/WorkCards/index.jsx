import React, { useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import ProjectLogo from '../ProjectLogo';
import Modal from '../Modal';

<<<<<<< Updated upstream
const WorkCard = ({ img, name, description, onClick, languages = [] }) => {
=======
const WorkCard = ({ name, description, logo, details}) => {
>>>>>>> Stashed changes
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
<<<<<<< Updated upstream
        <div
            className={`group overflow-hidden rounded-lg laptop:p-4 first:ml-0 link ${
                isDark ? 'hover:bg-[#1a1a1a]' : 'hover:bg-gray-50'
            } transition-all duration-300`}
            onClick={onClick}
        >
            <div className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-48 mob:h-48 tablet:h-[300px] laptop:h-[600px]">
                <Image
                    alt={name}
                    className="h-full w-full hover:scale-110 transition-all ease-out duration-300"
                    src={img}
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                />
                {languages && languages.length > 0 && (
                    <div className="absolute top-2 right-2 grid grid-cols-1 gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        {languages.map((lang, index) => (
                            <span
                                key={index}
                                className={`px-3 py-1 text-sm rounded-full backdrop-blur-md transition-all duration-300 ${
                                    isDark 
                                        ? 'bg-black/70 text-white hover:bg-black/80' 
                                        : 'bg-white/70 text-gray-900 hover:bg-white/80'
                                }`}
                            >
                                {lang}
                            </span>
                        ))}
                    </div>
                )}
=======
        <>
            <div
                className={`overflow-hidden rounded-lg laptop:p-4 first:ml-0 link ${
                    isDark ? 'hover:bg-[#1a1a1a]' : 'hover:bg-gray-50'
                } transition-all duration-300 cursor-pointer`}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 aspect-square w-full">
                    <ProjectLogo name={name} logoSrc={logo} />
                </div>
                <h2 className={`mt-5 text-3xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {name}
                </h2>
                <h2 className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {description}
                </h2>
>>>>>>> Stashed changes
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                details={details}
                projectName={name}
                description={description}
            />
        </>
    );
};

export default WorkCard;