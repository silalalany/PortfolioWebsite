"use client";

import { useRef, useEffect, useState } from "react";
import { useSprings, animated, SpringValue } from "@react-spring/web";

interface SplitTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, any>;
  animationTo?: Record<string, any>[];
  onAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  onAnimationComplete,
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);

  const defaultFrom = {
    filter: "blur(10px)",
    opacity: 0,
    transform: direction === "top" ? "translate3d(0,-50px,0)" : "translate3d(0,50px,0)",
  };

  const defaultTo = [
    {
      filter: "blur(5px)",
      opacity: 0.5,
      transform: direction === "top" ? "translate3d(0,5px,0)" : "translate3d(0,-5px,0)",
    },
    { filter: "blur(0px)", opacity: 1, transform: "translate3d(0,0,0)" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // ✅ ใช้ `tension` และ `friction` แทน `easing`
  const config = { tension: 120, friction: 14 };

  const [springs, api] = useSprings(elements.length, (index) => ({
    from: animationFrom || defaultFrom,
    to: animationFrom || defaultFrom,
    delay: index * delay,
    config,
  }));

  useEffect(() => {
    if (inView && api?.start) {
      api.start((index: number) => ({
        to: animationTo || defaultTo,
        delay: index * delay,
        config,
      }));
    }
  }, [inView, api]);

  return (
    <p ref={ref} className={`split-text ${className} flex flex-wrap`}>
      {springs.map((props, index) => (
        <animated.span
          key={index}
          style={Object.assign({}, props)} // ✅ ป้องกัน undefined และ null
          className="inline-block transition-transform will-change-[transform,filter,opacity]"
        >
          {elements[index] === " " ? "\u00A0" : elements[index]}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </animated.span>
      ))}
    </p>
  );
};

export default SplitText;