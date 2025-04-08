import React from 'react';
import { motion } from 'framer-motion';

export interface SlideUpWrapperProps {
  children: React.ReactNode;
  sectionId: string;
  slideUpWrapperClassName?: string;
}

const SlideUpWrapper = ({ children, sectionId, slideUpWrapperClassName }: SlideUpWrapperProps) => {
  return (
    <motion.div
      id={sectionId}
      className={'pt-10 pb-10'}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
      viewport={{ amount: 0.4, once: true }}
    >
      {children}
    </motion.div>
  );
};

export default SlideUpWrapper;
