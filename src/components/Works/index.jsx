import { forwardRef } from "react";
import WorkCards from "@/components/WorkCards";

const Works = forwardRef(({ data }, ref) => {
    return (
        <section ref={ref} className="mt-10 laptop:mt-30">
            <h2 className="text-2xl text-bold">Works.</h2>

            <div className="mt-5 mb-10 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
                {data.projects.filter(project => project.visible).map((project) => (
                    <WorkCards
                        key={project.id}
                        name={project.title}
                        tags={project.tags}
                        logo={project.logo}
                        details={project.details}
                    />
                ))}
            </div>
        </section>
    )
})

Works.displayName = 'Works';

export default Works;