import { motion, useCycle } from "framer-motion";

export const HelloFramer = () => {
  return (
    <>
      <motion.div animate={{ x: 200 }}>Hi!</motion.div>
      <motion.div className="box" whileHover={{ scale: 1.2 }}>
        Hover!
      </motion.div>
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      />
      <motion.div className="box" animate={{ x: 200, rotate: 180, scale: 1 }} />
      {/* <motion.div
        className="box"
        animate={{ x: [0, 400, 0], rotate: [0, 180, 0] }}
      >
        keyframes
      </motion.div>
      <motion.div
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
