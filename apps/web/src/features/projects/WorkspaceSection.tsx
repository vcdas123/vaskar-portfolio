import { motion } from 'framer-motion';
import type { Project } from '@portfolio/contracts';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppStore';
import { useEntrance } from '../../components/motion/useEntrance';
import { CaseStudyFile } from '../case-studies/CaseStudyFile';
import {
  caseStudyClosed,
  caseStudyOpened,
  selectCompileState,
  selectIsCaseStudyOpen,
} from '../case-studies/caseStudiesSlice';
import { projectSelected, selectSelectedSlug } from './projectsSlice';
import { ProjectExplorer } from './ProjectExplorer';
import { ProjectTabs } from './ProjectTabs';
import { ProjectOutput } from './ProjectOutput';

interface WorkspaceSectionProps {
  projects: Project[];
  location: string;
}

/**
 * The IDE-style workspace: explorer, tab strip, and either the project output or
 * the compiled case-study file.
 *
 * Opening a case study never scrolls — the file replaces the pane in place, so the
 * user's position in the document is untouched.
 */
export const WorkspaceSection = ({ projects, location }: WorkspaceSectionProps) => {
  const dispatch = useAppDispatch();
  const selectedSlug = useAppSelector(selectSelectedSlug);
  const isCaseStudyOpen = useAppSelector(selectIsCaseStudyOpen);
  const compileState = useAppSelector(selectCompileState);

  const selected = projects.find((project) => project.slug === selectedSlug) ?? projects[0];
  const entrance = useEntrance({ rise: 12 });

  if (!selected) {
    return null;
  }

  const handleSelect = (slug: string): void => {
    // Selecting a project always dismisses an open case study, as in the reference.
    if (isCaseStudyOpen) {
      dispatch(caseStudyClosed());
    }
    dispatch(projectSelected(slug));
  };

  return (
    <motion.section className="workspace" aria-label="Project workspace" {...entrance}>
      <ProjectExplorer
        projects={projects}
        selectedSlug={selected.slug}
        location={location}
        onSelect={handleSelect}
      />

      <div className="mainpane">
        <ProjectTabs
          projects={projects}
          selectedSlug={selected.slug}
          isCaseStudyOpen={isCaseStudyOpen}
          onSelect={handleSelect}
          onCloseCaseStudy={() => dispatch(caseStudyClosed())}
        />

        <ProjectOutput
          project={selected}
          compileState={compileState}
          isHidden={isCaseStudyOpen}
          onRunCaseStudy={() => dispatch(caseStudyOpened(selected.slug))}
        />

        {isCaseStudyOpen && <CaseStudyFile project={selected} />}
      </div>
    </motion.section>
  );
};
