import React, { forwardRef, Ref } from 'react';
import Resume from '../Resume';

interface AboutData {
    about: string;
    showResume?: boolean;
    resumeData?: any;
}

interface AboutProps {
    className?: string;
    data: AboutData;
}

const About = forwardRef<HTMLElement, AboutProps>(({ className, data }, ref) => {
    return (
        <section ref={ref} className={className}>
            <div className="mb-20">
                <h2 className="text-2xl text-bold">About.</h2>
                <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
                    {data.about}
                </p>
            </div>
            {data.showResume && <Resume data={data} />}
        </section>
    );
});

About.displayName = 'About';
export default About; 