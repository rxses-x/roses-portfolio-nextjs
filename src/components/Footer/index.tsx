import React, { useState, useEffect, useRef, forwardRef, ForwardedRef } from 'react';
import Button from '../Button';
import Socials from '../Socials';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import dataPortfolio from '../../data/portfolio.json';
import emailjs from '@emailjs/browser';

interface FooterProps {
  data: {
    socials: {
      name: string;
      url: string;
    }[];
    [key: string]: any;
  };
}

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  message: HTMLTextAreaElement;
}

interface EmailForm extends HTMLFormElement {
  readonly elements: FormElements;
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(({ data }, ref) => {
    const finalData = data || dataPortfolio;
    const { theme } = useTheme();
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const isDark = theme === 'dark';

    const validateEmail = (email: string): boolean => {
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

    const handleReset = () => {
        setEmail('');
        setMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEmailValid || !message) return;

        setLoading(true);
        try {
            if (!formRef.current) return;

            await emailjs.sendForm(
                'service_qb2io0d', // Replace with your EmailJS service ID
                'template_pyou358', // Replace with your EmailJS template ID
                formRef.current,
                'thD0X2R84C1ur4HXa' // Replace with your EmailJS public key
            );

            handleReset();
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <footer className='mt-5 laptop:mt-40 p-2 laptop:p-0' ref={ref}>
                <div>
                    <h2 className='text-2xl text-bold'>Contact.</h2>
                    <div className="mt-10">
                        <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold">
                            LET&apos;S WORK
                        </h1>
                        <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold">
                            TOGETHER
                        </h1>
                        <form ref={formRef} className="mt-8 flex flex-col gap-4 items-start">
                            <div className="w-full tablet:w-96">
                                <input
                                    type="email"
                                    name="email"
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
                                    name="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter your message"
                                    className="mt-4 px-4 py-2 text-lg border-2 rounded-lg focus:outline-none w-full border-gray-300 min-h-[100px] overflow-hidden"
                                    required
                                />
                                
                                <div className={`flex gap-4 mt-4 transition-all duration-300 ease-in-out ${email && isEmailValid && message ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                                    <Button onClick={handleReset} type="primary">Cancel</Button>
                                    <Button onClick={handleSubmit} type="primary">{loading ? 'Sending...' : 'Send email'}</Button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-10">
                            <Socials className="socials-footer" data={finalData.socials} />
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
                        <Link href="https://nextjs.org" className="mt-2 flex items-center gap-2">
                            <span>
                                Developped with
                            </span>
                            <Image
                                aria-hidden
                                src="/next.svg"
                                alt="Next.js Logo"
                                width={80}
                                height={40}
                                priority
                                className={`${isDark ? 'invert' : ''}`}
                            />
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    )
});

Footer.displayName = 'Footer';

export default Footer;