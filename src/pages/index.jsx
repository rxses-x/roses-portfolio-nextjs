"use client";
import dynamic from 'next/dynamic'
import Head from 'next/head';
import Cursor from '../components/Cursor';
import data from '../data/portfolio.json';
import { useRef } from 'react';
import GradientCircles from '../components/GradientCircles';
import Header from '@/components/Header';

function Home() {
    const aboutRef = useRef();
    const workRef = useRef();

    const handleScroll = (section) => {
        console.log('Clicked on', section);
    };

    return (
        <div className={`relative ${data.showCursor && 'cursor-none'}`}>
            {data.showCursor && <Cursor />}
            <Head>
                <title>{data.name}</title>
                <meta name="description" content={data.description} />
            </Head>
            <GradientCircles />
            <Header handleScroll={handleScroll} />
        </div>
    )
}

// Export a dynamically loaded version of the component
export default dynamic(() => Promise.resolve(Home), {
    ssr: false // This ensures the component is only rendered on client-side
})