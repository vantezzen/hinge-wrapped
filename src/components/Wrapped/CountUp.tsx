import {
  motion,
  animate,
  useMotionValue,
  useInView,
  useTransform,
} from "framer-motion";
import React, { useEffect } from "react";

function CountUp({ end }: { end: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (!inView) return;

    count.set(0);
    const controls = animate(count, end, {
      duration: 0.7,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [count, end, inView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default CountUp;
