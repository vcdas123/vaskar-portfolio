import { motion } from 'framer-motion';
import type { Project } from '@portfolio/contracts';
import { FAST_TRANSITION } from '../../components/motion/motion-tokens';
import { CloseIcon, FileIcon } from '../../components/ui/icons';

interface ProjectTabsProps {
  projects: Project[];
  selectedSlug: string | null;
  /** True while a `case-study.md` file is open, which adds its own tab. */
  isCaseStudyOpen: boolean;
  onSelect: (slug: string) => void;
  onCloseCaseStudy: () => void;
}

/**
 * A single lime rule shared by every tab via `layoutId`, so switching files slides
 * the indicator across instead of cutting to the new tab. It replaces the
 * reference's `border-top-color` on the active tab (see `enhancements.css`), and
 * lands on exactly the same 2px line.
 */
const ActiveTabIndicator = () => (
  <motion.span
    className="tab-indicator"
    layoutId="tab-indicator"
    transition={FAST_TRANSITION}
    aria-hidden="true"
  />
);

export const ProjectTabs = ({
  projects,
  selectedSlug,
  isCaseStudyOpen,
  onSelect,
  onCloseCaseStudy,
}: ProjectTabsProps) => (
  <div className="tabs" role="tablist" aria-label="Open files">
    {projects.map((project) => {
      // While the case study is open it owns the indicator, matching the
      // reference, where `case-study.md` takes the lime tab treatment.
      const isSelected = project.slug === selectedSlug;
      const isActive = isSelected && !isCaseStudyOpen;

      return (
        <button
          key={project.slug}
          type="button"
          role="tab"
          aria-selected={isActive}
          className={isActive ? 'tab active' : 'tab'}
          onClick={() => onSelect(project.slug)}
        >
          {isActive && <ActiveTabIndicator />}
          <FileIcon />
          {project.file}
          <CloseIcon size={12} />
        </button>
      );
    })}

    {/* Appended only while the compiled case study is open; closing it removes
        the tab, matching the reference's dynamically created element. */}
    {isCaseStudyOpen && (
      <button
        type="button"
        role="tab"
        aria-selected
        className="tab case-tab"
        onClick={onCloseCaseStudy}
      >
        <ActiveTabIndicator />
        <FileIcon />
        case-study.md
        <CloseIcon size={12} />
      </button>
    )}
  </div>
);
