import { motion } from 'framer-motion';
import type { Project } from '@portfolio/contracts';
import { staggerDelay, useEntrance } from '../../components/motion/useEntrance';
import { useHoverLift } from '../../components/motion/useHoverLift';
import { ExternalIcon } from '../../components/ui/icons';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenCaseStudy: (slug: string) => void;
}

/**
 * One card in the `Selected programs` grid. Link labels are uppercased for
 * display while the technology list keeps its dataset casing — both match the
 * reference's runtime renderer.
 */
export const ProjectCard = ({ project, index, onOpenCaseStudy }: ProjectCardProps) => {
  const entrance = useEntrance({ delay: staggerDelay(index) });
  const hover = useHoverLift();

  return (
    <motion.article
      className="case"
      {...entrance}
      whileHover={hover.whileHover}
      // The entrance transition owns `transition`; hover reuses its easing.
    >
      <div>
        <span className="head">PACKAGE / {project.type.toUpperCase()}</span>
        <h3>{project.title}</h3>
        <p>{project.cardDescription}</p>
        <div className="command">{project.command}</div>

        <div className="project-actions">
          {project.links.map((link) => (
            <a
              key={link.url}
              className={link.primary ? 'primary' : undefined}
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {link.label.toUpperCase()}
              <ExternalIcon />
            </a>
          ))}

          {/* The case study is now reached from the card rather than from a
              workspace pane; it opens in a modal dialog. */}
          <button type="button" onClick={() => onOpenCaseStudy(project.slug)}>
            CASE STUDY
            <ExternalIcon />
          </button>
        </div>
      </div>

      <footer>
        <span>{project.tech.join(' · ')}</span>
        <span>EXIT 0 ✓</span>
      </footer>
    </motion.article>
  );
};
