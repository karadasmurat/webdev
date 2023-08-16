import { motion } from "framer-motion";

export default function HelloVariants() {
  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  };

  return (
    <motion.div
      className="box"
      initial="hidden"
      animate="visible"
      variants={variants}
    />
  );
}
