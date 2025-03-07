import React, { useState } from 'react';
import Image from 'next/image';

const WorkCard = ({ img, name, description, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="overflow-hidden rounded-lg laptop:p-4 first:ml-0 link"
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
                ></Image>
            </div>
            <h2 className="mt-5 text-3xl font-medium">
                {name ? name : "Project Name"}
            </h2>
            <h2 className="text-xl opacity-50">
                {description ? description : "Description"}
            </h2>
        </div>
    )
}

export default WorkCard;