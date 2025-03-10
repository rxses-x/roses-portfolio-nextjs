import { forwardRef } from "react";
import WorkCards from "../WorkCards";

const Works = forwardRef(({ data }, ref) => {
    return (
        <section ref={ref} className="mt-10 laptop:mt-30">
            <h2 className="text-2xl text-bold">Works.</h2>

            <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
                {data.projects.map((project) => (
                    <WorkCards
                        key={project.id}
                        img={project.imageSrc}
                        name={project.title}
                        description={project.description}
                        onClick={project.url ? () => window.open(project.url): null}
                    />
                ))}
            </div>
        </section>
    )
})

export default Works;