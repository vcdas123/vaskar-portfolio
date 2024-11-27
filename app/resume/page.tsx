'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '@/components/resume/data';
import Experience from '@/components/resume/Experience';
import Education from '@/components/resume/Education';
import Skills from '@/components/resume/Skills';
import AboutMe from '@/components/resume/AboutMe';
import { useMemo } from 'react';

const Resume = () => {
  const tabContents = useMemo(() => {
    return [<Experience key={0} />, <Education key={1} />, <Skills key={2} />, <AboutMe key={3} />];
  }, []);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 2,
            duration: 0.4,
            ease: 'easeIn',
          },
        }}
        className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
      >
        <div className="container mx-auto">
          <Tabs defaultValue={RESUME_DATA?.[0]?.title} className="flex flex-col xl:flex-row gap-[60px]">
            <TabsList className="flex h-full flex-col w-full max-w-[380px] mx-auto xl:mx-0">
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
        </div>
      </motion.div>
    </section>
  );
};

export default Resume;
