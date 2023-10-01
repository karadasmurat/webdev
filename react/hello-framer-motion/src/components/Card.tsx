import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  //   face: number;
  //   children: string | JSX.Element | JSX.Element[];
  children: ReactNode;
}
export default function Card({ children }: CardProps) {
  const variants = {
    offScreenY: { y: "-100vh" }, // y position based on a percentage of viewport height
  };

  return (
    <div className="slide-card-wrapper">
      {/* <AnimatePresence> */}
      <motion.div
        key={Math.random()}
        className="slide-card"
        variants={variants}
        initial="offScreenY" // Initial position (off-screen)
        animate={{ y: 0 }} // Target position (on-screen)
        //   exit={{ x: "100vh" }}
        //   transition={{ duration: 1, type: "spring", stiffness: 100 }}
      >
        {children}
      </motion.div>
      {/* </AnimatePresence> */}
    </div>
  );
}
