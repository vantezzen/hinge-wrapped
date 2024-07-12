import React from "react";
import { motion } from "framer-motion";

function SlideContainer({
  children,
  bg = "bg-brand-light",
}: {
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <motion.div
      className={`${bg} p-12 m-8 rounded-xl w-full max-w-[80vw] h-[80vh] mx-auto flex justify-center items-center flex-col gap-6 relative`}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  );
}

export default SlideContainer;
