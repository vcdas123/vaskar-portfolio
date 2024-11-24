import { motion } from "framer-motion";
import React from "react";

const stairAnimation = {
  initial: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
  exit: {
    top: ["100%", "0%"],
  },
};

const reverseIdx: (total: number, idx: number) => number = (total, idx) =>
  total - idx - 1;

const totalStairs = 6;

const Stairs = () => {
  return (
    <>
      {[...Array(totalStairs)]?.map((item: number, idx: number) => {
        return (
          <motion.div
            key={idx}
            variants={stairAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              delay: reverseIdx(totalStairs, idx) * 0.1,
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="h-full w-full bg-white relative"
          />
        );
      })}
    </>
  );
};

export default Stairs;
