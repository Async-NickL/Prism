"use client";
import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef, memo } from "react";

export const BoxReveal = memo(({
  children,
  width = "fit-content",
  boxColor = "#5046e6",
  duration = 0.5
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const transition = { duration, ease: "easeIn" };

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ ...transition, delay: 0.25 }}>
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={controls}
        transition={transition}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor,
        }} />
    </div>
  );
});

BoxReveal.displayName = "BoxReveal";
