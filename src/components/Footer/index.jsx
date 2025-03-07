import React, { useState, useEffect, useRef } from 'react';
import Button from '../Button';
import Socials from '../Socials';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import dataPortfolio from '@/data/portfolio.json';

const Footer = ({ data }) => {
    data = data && data.length > 0 ? data : dataPortfolio;
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const textareaRef = useRef(null);
    const { theme } = useTheme();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        setIsEmailValid(validateEmail(email));
    }, [email]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Email submitted:', email);
        console.log('Message:', message);
        setEmail('');
        setMessage('');
    };

    const handleReset = () => {
        setEmail('');
        setMessage('');
    };

    return (
        <>
            <footer className='mt-5 laptop:mt-40 p-2 laptop:p-0'>
                <div>
                    <h2 className='text-2xl text-bold'>Contact.</h2>
                    <div className="mt-10">
                        <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold">
                            LET&apos;S WORK
                        </h1>
                        <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold">
                            TOGETHER
                        </h1>
                        <form className="mt-8 flex flex-col gap-4 items-start">
                            <div className="w-full tablet:w-96">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="px-4 py-2 text-lg border-2 rounded-lg focus:outline-none w-full border-gray-300"
                                    required
                                />
                                {email && (
                                    <p className={`text-red-500 text-sm mt-1 ${!isEmailValid ? 'block' : 'hidden'}`}>Please enter a valid email address</p>
                                )}
                                <textarea
                                    ref={textareaRef}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter your message"
                                    className="mt-4 px-4 py-2 text-lg border-2 rounded-lg focus:outline-none w-full border-gray-300 min-h-[100px] overflow-hidden"
                                    required
                                />
                                
                                <div className={`flex gap-4 mt-4 transition-all duration-300 ease-in-out ${email && isEmailValid && message ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                                    <Button onClick={handleReset} type="primary" className="!bg-red-500 transition-colors !hover:bg-red-600">Cancel</Button>
                                    <Button onClick={handleSubmit} type="primary">Send email</Button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-10">
                            <Socials data={data.socials} />
                        </div>
                    </div>
                </div>
                <div className="mt-2 laptop:mt-10 tablet:flex tablet:justify-center tablet:items-center tablet:w-full">
                    <div className="text-sm text-bold p-2 tablet:p-0 flex flex-col items-center">
                        <h2>
                            Made With ❤ by{" "}
                            <Link href="https://github.com/rxses-x" className="underline underline-offset-1">
                                Roses x
                            </Link>
                        </h2>
                        <Link href="https://nextjs.org" className="mt-2 inline-flex items-center">
                            <span className='mr-2'>
                                Developped with{" "}
                            </span>
                            <Image
                                aria-hidden
                                src="/next.svg"
                                alt="Next.js Logo"
                                width={80}
                                height={40}
                                priority
                                className={theme === 'dark' ? 'invert' : ''}
                            />
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;