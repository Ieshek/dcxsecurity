import React, { useEffect, useRef, useState } from "react";
import { useInView, motion, useMotionValue, animate } from "framer-motion";

export const AnimatedCounter = ({ value, suffix = "", duration = 1.6 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
      onComplete: () => setDisplay(value),
    });
    return () => controls.stop();
  }, [inView, value, duration, motionVal]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
