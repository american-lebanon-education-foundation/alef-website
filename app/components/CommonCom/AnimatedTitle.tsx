"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);


interface AnimatedTitleProps {
    text: string;
    className?: string;
    as?: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function AnimatedTitle({ text, className = "", as = "div" }: AnimatedTitleProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isArabic = /[\u0600-\u06FF]/.test(text);

    useGSAP(() => {
        const setup = () => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                const targets = containerRef.current?.querySelectorAll(".animated-char, .animated-word");
                if (!targets || targets.length === 0) return;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    }
                });

                tl.fromTo(targets,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        stagger: isArabic ? 0.1 : 0.02,
                        duration: 1.5,
                        ease: "power2.out"
                    }
                );

                tl.to(targets, {
                    opacity: 0.2,
                    duration: 0.03,
                    stagger: {
                        amount: 0.2,
                        from: "random",
                        repeat: 3,
                        yoyo: true
                    },
                    ease: "power3.inOut"
                }, "-=1.2");
            });
        };

        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            (window as Window & typeof globalThis & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(setup);
        } else {
            setTimeout(setup, 100);
        }
    }, { scope: containerRef, dependencies: [text] });

    const words = text.split(" ");

    // Filter incompatible classes for Arabic
    let finalClassName = className;
    if (isArabic) {
        finalClassName = finalClassName
            .replace(/\bfont-bebas\b/g, '')
            .replace(/\btracking-[a-z]+\b/g, '')
            .replace(/\buppercase\b/g, '');
    }

    const Component = as;

    return (
        <Component ref={containerRef} className={finalClassName} aria-label={text} dir={isArabic ? "rtl" : "ltr"}>
            {words.map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap">
                    {isArabic ? (
                        <span className="animated-word inline-block">
                            {word}
                        </span>
                    ) : (
                        word.split("").map((char, cIdx) => (
                            <span
                                key={cIdx}
                                className="animated-char inline-block"
                            >
                                {char}
                            </span>
                        ))
                    )}
                    {wIdx < words.length - 1 && <span>&nbsp;</span>}
                </span>
            ))}
        </Component>
    );
}