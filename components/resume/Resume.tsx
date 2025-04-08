'use client';
import { useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '@/components/resume/data';
import Experience from '@/components/resume/Experience';
import Education from '@/components/resume/Education';
import Skills from '@/components/resume/Skills';
import AboutMe from '@/components/resume/AboutMe';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import { FaAddressCard } from 'react-icons/fa';

const Resume = () => {
  const tabContents = useMemo(() => {
    return [<Experience key={0} />, <Education key={1} />, <Skills key={2} />, <AboutMe key={3} />];
  }, []);

  return (
    <SectionWrapper
      sectionId="resume"
      icon={<FaAddressCard />}
      title="Resume"
      description="Comprehensive overview of my professional journey, technical skills, educational background, and personal insights as a developer."
    >
      <Tabs defaultValue={RESUME_DATA?.[0]?.title} className="flex flex-col xl:flex-row gap-[60px]">
        <TabsList className="flex h-full xl:flex-col w-full max-w-[380px] mx-auto xl:mx-0">
          {RESUME_DATA?.map((item: any) => {
            return (
              <TabsTrigger key={item?.title} value={item?.title}>
                {item?.title}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <div className="min-h-[70vh] w-full">
          {RESUME_DATA?.map((item: any, idx: number) => {
            return (
              <TabsContent value={item?.title} key={item?.title} className="mt-0 min-h-[480px] w-full h-full">
                {tabContents[idx]}
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </SectionWrapper>
  );
};

export default Resume;
