import React from "react";
import { CompanyExperience, EXPERIENCE_DATA } from "./data";
import { ScrollArea } from "../ui/scroll-area";

const Experience = () => {
  return (
    <div className="flex flex-col gap-[30px] text-center xl:text-left">
      <h3 className="text-4xl font-bold">{EXPERIENCE_DATA?.title}</h3>
      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
        {EXPERIENCE_DATA?.desc}
      </p>
      <ScrollArea className="lg:h-[400px] h-full">
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
          {EXPERIENCE_DATA?.companies?.map(
            (company: CompanyExperience, idx: number) => {
              return (
                <li
                  key={idx}
                  className="bg-[#232329] h-[200px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start
                  lg:justify-start gap-1"
                >
                  <span className="text-accent">{company?.duration}</span>
                  <h3 className="text-xl max-w-[250px] text-center lg:text-left mb-6">
                    {company?.position}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                    <p className="text-white/60 text-sm">{company?.name}</p>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default Experience;
