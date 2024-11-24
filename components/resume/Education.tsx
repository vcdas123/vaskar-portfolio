import React from "react";
import { EDUCATION_DATA, EducationData, EducationInstitute } from "./data";
import { ScrollArea } from "../ui/scroll-area";

const Education = () => {
  return (
    <div className="flex flex-col gap-[30px] text-center xl:text-left">
      <h3 className="text-4xl font-bold">{EDUCATION_DATA?.title}</h3>
      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
        {EDUCATION_DATA?.desc}
      </p>
      <ScrollArea className="lg:h-[400px] h-full">
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
          {EDUCATION_DATA?.institutes?.map(
            (education: EducationInstitute, idx: number) => {
              return (
                <li
                  key={idx}
                  className="bg-[#232329] h-[200px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start
                  lg:justify-start gap-1"
                >
                  <span className="text-accent">{education?.duration}</span>
                  <h3 className="text-lg max-w-[250px] text-center lg:text-left mb-6">
                    {education?.degree}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                    <p className="text-white/60 text-sm">
                      {education?.institute}
                    </p>
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

export default Education;
