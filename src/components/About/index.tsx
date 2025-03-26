import { forwardRef } from 'react';
import Resume, { ResumeData } from '../Resume';

interface AboutProps {
  className?: string;
  data: {
    about: string;
    showResume: boolean;
    experience: ResumeData['experience'];
    education: ResumeData['education'];
    skills: ResumeData['skills'];
    [key: string]: any;
  };
}

const About = forwardRef<HTMLDivElement, AboutProps>(({ className, data }, ref) => {
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
    )
});

About.displayName = 'About';
export default About;