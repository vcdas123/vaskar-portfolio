"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { FiDownload } from "react-icons/fi";
import Socials from "./socials/Socials";

const LeftSection = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/cv/resume.pdf";
    link.download = "vaskar_resume.pdf";
    link.click();
  };
  return (
    <div className="text-center xl:text-left order-2 xl:order-none h-full">
      <span className="text-xl">Software Developer</span>
      <h1 className="h1">
        Hello I&apos;m <br />
        <span className="text-accent underline underline-offset-8">
          Vaskar <br /> Chandra Das
        </span>
      </h1>
      <p className="max-w-[700px] mb-9 mt-2 text-white/80">
        I enjoy delivering engaging digital solutions and am skilled in using
        multiple programming languages and technologies
      </p>
      <div className="flex flex-col xl:flex-row items-center gap-8">
        <Button
          variant={"outline"}
          size={"lg"}
          className="uppercase flex items-center gap-2 justify-center"
          onClick={handleDownload}
        >
          <span>Resume</span>
          <FiDownload className="text-xl" />
        </Button>
        <div className="mb-8 xl:mb-0">
          <Socials
            containerStyles="flex gap-8"
            iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
