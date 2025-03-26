import { motion } from 'framer-motion';

const TagLinesSection = ({ data }) => {
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.4
            }
        }
    };

    const item = {
        hidden: {
            opacity: 0,
            y: 40,
            x: -10,
            scale: 0.95,
            skewX: 10
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            skewX: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.section 
            className='mt-5'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={container}
        >
            <motion.h1
                variants={item}
                className='text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5'
            >
                "Hello 👋"
            </motion.h1>
            {data.map((tagLines, index) => (
                <motion.h2
                    key={index + 1}
                    variants={item}
                    className='text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5'
                >
                    {tagLines}
                </motion.h2>
            ))}
        </motion.section>
    )
}

export default TagLinesSection;