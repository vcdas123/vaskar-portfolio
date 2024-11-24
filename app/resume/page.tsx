"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import {
  ABOUT_DATA,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  SKILLS_DATA,
} from "@/components/resume/data";
import Experience from "@/components/resume/Experience";
import Education from "@/components/resume/Education";
import Skills from "@/components/resume/Skills";
import AboutMe from "@/components/resume/AboutMe";
import { Fragment } from "react";

const DATA = [EXPERIENCE_DATA, EDUCATION_DATA, SKILLS_DATA, ABOUT_DATA];
const tabContents = [<Experience />, <Education />, <Skills />, <AboutMe />];

const Resume = () => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 2.4,
            duration: 0.4,
            ease: "easeIn",
          },
        }}
        className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
      >
        <div className="container mx-auto">
          <Tabs
            defaultValue={DATA?.[0]?.title}
            className="flex flex-col xl:flex-row gap-[60px]"
          >
            <TabsList className="flex h-full flex-col w-full max-w-[380px] mx-auto xl:mx-0">
              {DATA?.map((item: any) => {
                return (
                  <TabsTrigger key={item?.title} value={item?.title}>
                    {item?.title}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <div className="min-h-[70vh] w-full">
              {DATA?.map((item: any, idx: number) => {
                return (
                  <TabsContent
                    value={item?.title}
                    key={item?.title}
                    className="mt-0 min-h-[480px]"
                  >
                    {tabContents[idx]}
                  </TabsContent>
                );
              })}
            </div>
          </Tabs>
        </div>
      </motion.div>
    </section>
  );
};

export default Resume;
