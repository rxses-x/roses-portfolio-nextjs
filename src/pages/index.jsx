import dynamic from 'next/dynamic';
import Head from 'next/head';
import Cursor from '@/components/Cursor';
import data from '@/data/portfolio';
import { useRef } from 'react';
import GradientCircles from '@/components/GradientCircles';
import Header from '@/components/Header';
import TagLinesSection from '@/components/TagLinesSection';
import Socials from '@/components/Socials';
import Works from '@/components/Works';
import About from '@/components/About';
import Footer from '@/components/Footer';

function Home() {
    const aboutRef = useRef();
    const workRef = useRef();
    const contactRef = useRef();
    
    const sectionRefs = {
        about: aboutRef,
        work: workRef,
        contact: contactRef
    };

    const handleScroll = (section) => {
        if (!sectionRefs[section]) return;
        window.scrollTo({
            top: sectionRefs[section].current.offsetTop,
            left: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div
            className={`relative ${data.showCursor && 'cursor-none'}`}
        >
            {data.showCursor && <Cursor />}
            <Head>
                <title>{data.name}</title>
                <meta name="description" content={data.description} />
            </Head>
            <GradientCircles />
            <div className='container mx-auto mb-10 px-4 mob:px-6 tablet:px-8 laptop:px-10 laptopl:px-12'>
                <Header
                    handleScroll={handleScroll} />
                <div className='laptop:mt-20 mt-10'>
                    <TagLinesSection
                        data={data.headerTagsLine}
                    />
                </div>
                <Socials
                    className="mt-5 laptop:mt-5"
                    data={data.socials}
                />
                <Works
                    data={data}
                    ref={workRef}
                />
                <About
                    ref={aboutRef}
                    data={data}
                />
                <Footer
                    ref={contactRef}
                    data={data}
                />
            </div>
        </div>
    );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });