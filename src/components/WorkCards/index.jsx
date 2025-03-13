import React, { useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const WorkCard = ({ img, name, description, onClick }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div
            className={`overflow-hidden rounded-lg laptop:p-4 first:ml-0 link ${
                isDark ? 'hover:bg-[#1a1a1a]' : 'hover:bg-gray-50'
            } transition-all duration-300`}
            onClick={onClick}
        >
            <div
                className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-48 mob:h-48 tablet:h-[300px] laptop:h-[600px]"
            >
                <Image
                    alt={name}
                    className="h-full w-full hover:scale-110 transition-all ease-out duration-300"
                    src={img}
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                ></Image>
            </div>
            <h2 className={`mt-5 text-3xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {name ? name : "Project Name"}
            </h2>
            <h2 className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {description ? description : "Description"}
            </h2>
        </div>
    )
}

export default WorkCard;