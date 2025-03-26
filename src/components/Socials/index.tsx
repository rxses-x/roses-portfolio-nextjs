import React from "react";
import Button from "@/components/Button";

const Socials = ({ className, data }) => {
    return (
        <div className={ `${className} flex flex-wrap mob:flex-nowrap link` }>
            { data.map((social, index) => (
                <Button
                    key={index}
                    onClick={() => window.open(social.url)}
                >
                    { social.name }
                </Button>
            ))}
        </div>
    )
}

export default Socials;