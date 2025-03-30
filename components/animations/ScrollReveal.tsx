import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure this only runs on the client side
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

import { ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    scrollContainerRef?: React.RefObject<HTMLElement>;
    enableBlur?: boolean;
    baseOpacity?: number;
    baseRotation?: number;
    blurStrength?: number;
    containerClassName?: string;
    textClassName?: string;
    rotationEnd?: string;
    wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    scrollContainerRef,
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    containerClassName = "",
    textClassName = "",
    rotationEnd = "bottom bottom",
    wordAnimationEnd = "bottom bottom"
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const splitText = useMemo(() => {
        const text = typeof children === 'string' ? children : '';
        return text.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word; // Preserve spaces
            return (
                <span className="inline-block word" key={index}>
                    {word}
                </span>
            );
        });
    }, [children]);

    useEffect(() => {
        // Safety check for client-side execution
        if (typeof window === 'undefined') return;

        const el = containerRef.current;
        if (!el) return;

        // Use window as default scroller
        const scroller = window;

        // Create a small delay to ensure DOM is fully ready
        const timer = setTimeout(() => {
            // Rotation animation
            gsap.fromTo(
                el,
                { transformOrigin: '0% 50%', rotate: baseRotation },
                {
                    ease: 'none',
                    rotate: 0,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: rotationEnd,
                        scrub: true,
                    },
                }
            );

            // Target all spans with the 'word' class
            const wordElements = el.querySelectorAll('.word');
            if (wordElements.length === 0) {
                console.warn('No elements with class "word" found.');
                return;
            }

            // Opacity animation
            gsap.fromTo(
                wordElements,
                { opacity: baseOpacity, willChange: 'opacity' },
                {
                    ease: 'none',
                    opacity: 1,
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom-=20%',
                        end: wordAnimationEnd,
                        scrub: true,
                    },
                }
            );

            // Blur animation
            if (enableBlur) {
                gsap.fromTo(
                    wordElements,
                    { filter: `blur(${blurStrength}px)`, willChange: 'filter' },
                    {
                        ease: 'none',
                        filter: 'blur(0px)',
                        stagger: 0.05,
                        scrollTrigger: {
                            trigger: el,
                            start: 'top bottom-=20%',
                            end: wordAnimationEnd,
                            scrub: true,
                        },
                    }
                );
            }
        }, 100);

        // Cleanup
        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === el) {
                    trigger.kill();
                }
            });
        };
    }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

    return (
        <h2 ref={containerRef} className={`relative my-5  ${containerClassName}`}>
            <p className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-bold ${textClassName}`}>
                {splitText}
            </p>
        </h2>
    );
};

export default ScrollReveal;