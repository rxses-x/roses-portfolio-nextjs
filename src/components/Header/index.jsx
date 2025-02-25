// "use client";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
// Local Data
import data from '../../data/portfolio.json';

const Header = ({ handleScroll }) => {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [ mounted, setMounted ] = useState(false);

    const { name, showResume } = data;

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            { mounted && (
                <Popover className="block tablet:hidden mt-5 p-2">
                    {({ open }) => (
                        <>
                            <div className="flex items-center justify-between">
                                <h1
                                    onClick={() => router.push("/")}
                                    className="font-medium cursor-none link"
                                >
                                    {name}
                                </h1>

                                <div className="flex items-center">
                                    {data.darkMode && (
                                        <Button
                                            onClick={() =>
                                                setTheme(theme === "dark" ? "light" : "dark")
                                            }
                                        >
                                            <img
                                                className="h-6"
                                                src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                                            />
                                        </Button>
                                    )}
                                    <PopoverButton>
                                        <img
                                            className="h-5"
                                            src={`/images/${!open
                                                ? theme === "dark"
                                                    ? "menu-white.svg"
                                                    : "menu.svg"
                                                : theme === "light"
                                                    ? "cancel.svg"
                                                    : "cancel-white.svg"}`}
                                        />
                                    </PopoverButton>
                                </div>
                            </div>
                            <PopoverPanel
                                className={`flex z-10 w-full p-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-md rounded-md`}>
                                <div className="grid grid-cols-1 gap-4">
                                    {['Work', 'About', showResume && 'Resume', 'Contact'].map((label, index) => (
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
            )}
        </>
    );
};

export default Header;