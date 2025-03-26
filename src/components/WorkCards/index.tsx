import React, { useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import ProjectLogo from '../ProjectLogo';
import Modal from '../Modal';

interface WorkCardProps {
    name: string;
    tags: string;
    logo: string | null;
    details: {
        imageSrc?: string[];
        tags?: string;
        languages?: string[];
        url?: string;
        urlSrc?: string;
        [key: string]: any;
    };
}

const WorkCard: React.FC<WorkCardProps> = ({ name, tags, logo, details }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log("WorkCard", name, tags, logo, details);

    return (
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
                    {tags}
                </h2>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                tags={tags}
                details={details}
                projectName={name}
            />
        </>
    );
};

export default WorkCard;