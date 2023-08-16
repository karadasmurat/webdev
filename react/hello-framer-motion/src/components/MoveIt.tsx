import { motion } from "framer-motion";

export default function MoveIt() {
  return (
    <>
      {/* <motion.div animate={{ x: 100 }}>Text in a motion div!</motion.div> */}

      <motion.div
        className="box"
        initial={{ opacity: 0.1, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      />

      <motion.div
        className="box"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        I have some content here
      </motion.div>

      <motion.div
        className="box"
        whileHover={{
          opacity: 0,
        }}
      >
        Hover over me!
      </motion.div>
    </>
  );
}
