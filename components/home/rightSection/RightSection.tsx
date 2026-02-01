"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface RightSectionProps {
  profileImage: string;
  alt?: string;
}

const RightSection = ({ profileImage, alt = "Profile" }: RightSectionProps) => {
  const isLocalImage =
    profileImage.startsWith("/") && !profileImage.startsWith("//");

  return (
    <div className="order-1 xl:order-none mb-8 xl:mb-0">
      <div className="h-full w-full relative flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.3,
              duration: 0.4,
              ease: "easeIn",
            },
          }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.5,
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
            className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] relative"
          >
            {isLocalImage ? (
              <Image
                src={profileImage}
                priority
                quality={100}
                fill
                alt={alt}
                className="object-contain mix-blend-multiply dark:mix-blend-lighten"
              />
            ) : (
              <img
                src={profileImage}
                alt={alt}
                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-lighten"
              />
            )}
          </motion.div>

          <motion.svg
            className="absolute inset-0 w-[300px] h-[300px] xl:w-[506px] xl:h-[506px] pointer-events-none"
            fill="transparent"
            viewBox="0 0 506 506"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="253"
              cy="253"
              r="246"
              stroke="#ff922b"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ strokeDasharray: "24 10 0 0" }}
              animate={{
                strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                rotate: [120, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.svg>
        </motion.div>
      </div>
    </div>
  );
};

export default RightSection;
