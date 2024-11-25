"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import profile1 from "/public/profile/bg-profile.png";

const RightSection = () => {
  return (
    <div className="order-1 xl:order-none mb-8 xl:mb-0">
      <div className="h-full w-full relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 2,
              duration: 0.4,
              ease: "easeIn",
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 2,
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
            className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten absolute"
          >
            <Image
              src={profile1?.src}
              priority
              quality={100}
              fill
              alt="MyProfilePic"
              className="object-contain"
            />
          </motion.div>

          <motion.svg
            className={"w-[300px] xl:w-[506px] h-[300px] xl:h-[506px]"}
            fill={"transparent"}
            viewBox={"0 0 506 506"}
            xmlns={"http://www.w3.org/2000/svg"}
          >
            <motion.circle
              cx={"253"}
              cy={"253"}
              r={"250"}
              stroke={"#e67700"}
              strokeWidth={"5"}
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
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
