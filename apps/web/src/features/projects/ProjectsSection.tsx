import { motion } from 'framer-motion';
import type { Project } from '@portfolio/contracts';
import { useEntrance } from '../../components/motion/useEntrance';
import { ProjectCard } from './ProjectCard';

interface ProjectsSectionProps {
  projects: Project[];
  onOpenCaseStudy: (slug: string) => void;
}

export const ProjectsSection = ({ projects, onOpenCaseStudy }: ProjectsSectionProps) => {
  const headEntrance = useEntrance();

  return (
    <section className="section" id="projects">
      <motion.header className="section-head" {...headEntrance}>
        <small>01 / EXECUTABLE WORK</small>
        <h2>Selected programs</h2>
      </motion.header>

      <div className="cases three">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            onOpenCaseStudy={onOpenCaseStudy}
          />
        ))}
      </div>
    </section>
  );
};
