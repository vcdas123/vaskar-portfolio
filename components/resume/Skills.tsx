import React from "react";
import { Skill, SKILLS_DATA } from "./data";
import { ScrollArea } from "../ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Skills = () => {
  return (
    <div className="flex flex-col gap-[30px] text-center xl:text-left">
      <h3 className="text-4xl font-bold">{SKILLS_DATA?.title}</h3>
      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
        {SKILLS_DATA?.desc}
      </p>
      <ScrollArea className="lg:h-[400px] h-full">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
          {SKILLS_DATA?.skills?.map((skill: Skill, idx: number) => {
            return (
              <li
                key={idx}
                className="bg-[#232329] h-[130px] py-6 px-10 rounded-xl flex justify-center items-center"
              >
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="group">
                      <div className="text-6xl group-hover:text-accent transition-all duration-300">
                        {skill?.icon}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{skill?.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default Skills;
