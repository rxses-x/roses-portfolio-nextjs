import dynamic from 'next/dynamic'
import Head from 'next/head';
import Cursor from '@/components/Cursor';
import data from '@/data/portfolio';
import { useRef } from 'react';
import GradientCircles from '@/components/GradientCircles';
import Header from '@/components/Header';
import TagLinesSection from '@/components/TagLinesSection';
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
            <div className='container mx-auto mb-10'>
                <Header handleScroll={handleScroll} />
                <div className='laptop:mt-20 mt-10'>
                    <TagLinesSection data={data.headerTagsLine} />
                </div>
            </div>

        </div>
    )
}

// Export a dynamically loaded version of the component
export default dynamic(() => Promise.resolve(Home), {
    ssr: false // This ensures the component is only rendered on client-side
})