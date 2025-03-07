import gsap, { Power3 } from "gsap";

const Animation = ({ target, from, to }) => {
    return gsap.fromTo(target, {
        opacity: 0, ...from
    }, {
        opacity: 1, ...to, stagger: 0.2, ease: Power3.easeOut
    });
}

export default Animation;