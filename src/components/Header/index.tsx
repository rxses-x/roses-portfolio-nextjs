// "use client";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
    handleScroll: (section: string) => void;
    data: {
        name: string;
        darkMode?: boolean;
    };
}

const Header: React.FC<HeaderProps> = ({ handleScroll, data }) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const isDark = theme === 'dark';

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!data) return null;
    if (!mounted) return null;

    return (
        <>
            {mounted && (
                <>
                    <Popover className="block tablet:hidden mt-5 p-2 transition-all duration-300 ease-out">
                        {({ open }) => (
                            <>
                                <div className="flex items-center justify-between">
                                    <Link href="/" className="font-medium link">
                                        {data.name}
                                    </Link>

                                    <div className="flex items-center">
                                        {data.darkMode && (
                                            <Button
                                                onClick={() =>
                                                    setTheme(isDark ? "light" : "dark")
                                                }
                                            >
                                                <Image
                                                    className="h-6 w-6"
                                                    src={`/images/${isDark ? "moon.svg" : "sun.svg"}`}
                                                    alt={isDark ? "Dark mode" : "Light mode"}
                                                    width={24}
                                                    height={24}
                                                    unoptimized
                                                />
                                            </Button>
                                        )}
                                        <PopoverButton>
                                            <Image
                                                className="h-5 w-5"
                                                src={`/images/${!open
                                                    ? isDark
                                                        ? "menu-white.svg"
                                                        : "menu.svg"
                                                    : theme === "light"
                                                        ? "cancel.svg"
                                                        : "cancel-white.svg"}`}
                                                alt="Menu"
                                                width={20}
                                                height={20}
                                                unoptimized
                                            />
                                        </PopoverButton>
                                    </div>
                                </div>
                                <PopoverPanel
                                    className={`flex z-10 w-full p-4 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'} shadow-md rounded-md transition-all duration-300 ease-out`}>
                                    <div className="grid grid-cols-1 gap-4">
                                        {['Work', 'About', 'Contact'].map((label, index) => (
                                            label && (
                                                <Button
                                                    key={index}
                                                    onClick={() => handleScroll(label.toLowerCase())}
                                                >
                                                    {label}
                                                </Button>
                                            )
                                        ))}
                                    </div>
                                </PopoverPanel>
                            </>
                        )}
                    </Popover>
                    <div
                        className={`mt-10 hidden flex flex-row items-center justify-between sticky ${theme === 'light' && 'bg-white'} dark:text-white top-0 z-10 tablet:flex tablet:pl-2`}
                    >
                        <Link href="/" className="font-medium link">
                            {data.name}
                        </Link>
                        <div className="flex">
                            {['Work', 'About', 'Contact'].map((label, index) => (
                                label && (
                                    <Button
                                        key={index}
                                        onClick={() => handleScroll(label.toLowerCase())}
                                    >
                                        {label}
                                    </Button>
                                )
                            ))}
                            {mounted && theme && data.darkMode && (
                                <Button
                                    onClick={() =>
                                        setTheme(isDark ? "light" : "dark")
                                    }
                                >
                                    <Image
                                        className="h-6 w-6"
                                        src={`/images/${isDark ? "moon.svg" : "sun.svg"}`}
                                        alt={isDark ? "Dark mode" : "Light mode"}
                                        width={24}
                                        height={24}
                                        unoptimized
                                    />
                                </Button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Header; 