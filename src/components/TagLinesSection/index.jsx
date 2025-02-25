import { useRef } from 'react';

const TagLinesSection = ({ data }) => {
    const textRefs = useRef([useRef(), useRef(), useRef(), useRef()]);
    return (
        <section className='mt-5'>
            <h1
                ref={textRefs.current[0]}
                className='text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5'
            >
                "Hello 👋"
            </h1>
            {data.map((tagLines, index) => (
                <h2
                    key={index}
                    ref={textRefs.current[index]}
                    className='text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5'
                >
                    {tagLines}
                </h2>
            ))}
        </section>
    )
}

export default TagLinesSection;