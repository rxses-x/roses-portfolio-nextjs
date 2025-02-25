import dynamic from 'next/dynamic'
import Head from 'next/head';
import data from '../data/portfolio.json';
import { useRef } from 'react';

function Home() {
    const aboutRef = useRef();
    const workRef = useRef();

    return (
        <div className="relative cursor-none">
            <Head>
                <title>{`${data.name} Portfolio`}</title>
                <meta name="description" content={ data.description } />
            </Head>
        </div>
    )
}

// Export a dynamically loaded version of the component
export default dynamic(() => Promise.resolve(Home), {
    ssr: false // This ensures the component is only rendered on client-side
})