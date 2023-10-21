import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useState } from "react";

export const HelloFramer = () => {
  const [isVisible, setVisible] = useState(true);

  const animationStates = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  };

  return (
    <>
      <motion.div animate={{ x: 200 }}>Hi!</motion.div>
      <motion.div
        className="box"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        Hover me!{" "}
      </motion.div>
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      />
      <motion.div
        className="box"
        animate={{ x: 200, rotate: 360, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        x + rotate
      </motion.div>
      <motion.div
        className="box"
        animate={{ x: 100 }}
        transition={{ ease: "easeOut", duration: 1 }}
      />
      <motion.div className="box" animate={{ x: 100 }}>
        Default Transition
      </motion.div>
      <motion.div
        className="box"
        animate={{ x: [0, 200, 100], rotate: [0, 180, 0] }}
      >
        keyframes
      </motion.div>
      <motion.div
        className="box"
        initial="hidden"
        animate="visible"
        variants={animationStates}
        transition={{ type: "spring", stiffness: 400, damping: 3 }}
      >
        variants
      </motion.div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="1"
            className="box"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 100, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            onClick={() => setVisible((prev) => !prev)}
          >
            click to remove
          </motion.div>
        )}
      </AnimatePresence>
      ;
      {/* <motion.div
        className="box"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      /> */}
      <motion.button
        initial={{ opacity: 0.6 }}
        whileHover={{
          scale: 1.2,
          transition: { duration: 1 },
        }}
        whileTap={{ scale: 0.9 }}
        whileInView={{ opacity: 1 }}
      >
        Click Me!
      </motion.button>
    </>
  );
};
