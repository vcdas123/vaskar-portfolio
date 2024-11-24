import React from "react";
import { ABOUT_DATA, AboutInfo } from "./data";
import { ScrollArea } from "../ui/scroll-area";

const AboutMe = () => {
  return (
    <div className="flex flex-col gap-[30px] text-center xl:text-left">
      <h3 className="text-4xl font-bold">{ABOUT_DATA?.title}</h3>
      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
        {ABOUT_DATA?.desc}
      </p>

      <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 mx-auto xl:mx-0">
        {ABOUT_DATA?.info?.map((aboutItem: AboutInfo, idx: number) => {
          return (
            <li key={idx}>
              <span className="text-white/60">{aboutItem?.label}</span>
              <div className="text-xl">{aboutItem?.value}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AboutMe;
