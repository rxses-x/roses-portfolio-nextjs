import { useRef, useEffect } from 'react';
import Animation from '@/animation';

const TagLinesSection = ({ data }) => {
    const textRefs = useRef([]);

    useEffect(() => {
        textRefs.current.forEach((ref, index) => {
            if (ref) {
                setTimeout(() => {
                    Animation({
                        target: ref,
                        from: {
                            opacity: 0,
                            y: 40,
                            x: -10,
                            transform: "scale(0.95) skew(10deg)"
                        },
                        to: {
                            opacity: 1,
                            y: 0,
                            x: 0,
                            transform: "scale(1)",
                            duration: 0.8,
                            ease: "power3.out"
                        }
                    });
                }, index * 400); // 400ms delay between each animation
            }
        });

        return () => {
            // Cleanup timeouts if component unmounts
            textRefs.current.forEach((_, index) => {
                clearTimeout(index * 400);
            });
        };
    }, []);

    return (
        <section className='mt-5'>
            <h1
                ref={el => textRefs.current[0] = el}
                className='opacity-0 text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5'
            >
                "Hello 👋"
            </h1>
            {data.map((tagLines, index) => (
                <h2
                    key={index + 1}
                    ref={el => textRefs.current[index + 1] = el}
                    className='opacity-0 text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5'
                >
                    {tagLines}
                </h2>
            ))}
        </section>
    )
}

export default TagLinesSection;