import React from "react";
import SlideUpWrapper, {
  SlideUpWrapperProps,
} from "../SlideUpWrapper/SlideUpWrapper";

interface SectionWrapperProps extends SlideUpWrapperProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SectionWrapper = ({
  sectionId,
  children,
  description,
  icon,
  title,
}: SectionWrapperProps) => {
  return (
    <SlideUpWrapper sectionId={sectionId}>
      <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
        <div className="container mx-auto">
          <h1
            className={`h1 capitalize transition-all flex items-center gap-1  hover:text-accent-hover hover:border-accent-hover font-medium text-accent border-b-2 pb-2 border-accent cursor-pointer`}
          >
            {icon}
            {title}
          </h1>
          <p className="mb-9 text-white/80">{description}</p>
          <br />
          {children}
        </div>
      </section>
    </SlideUpWrapper>
  );
};

export default SectionWrapper;
