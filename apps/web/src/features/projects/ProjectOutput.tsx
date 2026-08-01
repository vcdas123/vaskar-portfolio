import type { ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '@portfolio/contracts';
import type { CompileState } from '../case-studies/caseStudiesSlice';
import { FAST_TRANSITION } from '../../components/motion/motion-tokens';
import { RunIcon, SpinnerIcon, CheckIcon } from '../../components/ui/icons';
import { ArchitectureScript } from './ArchitectureScript';
import { BuildLogPanel } from './BuildLogPanel';

interface ProjectOutputProps {
  project: Project;
  compileState: CompileState;
  /** Hidden (not unmounted) while the case-study file occupies the pane. */
  isHidden: boolean;
  onRunCaseStudy: () => void;
}

const RUN_STATES: Record<CompileState, { icon: ReactElement; label: string }> = {
  closed: { icon: <RunIcon />, label: 'RUN CASE STUDY' },
  compiling: { icon: <SpinnerIcon className="icon icon-spin" />, label: 'COMPILING CASE STUDY...' },
  ready: { icon: <CheckIcon />, label: 'CASE STUDY OPEN' },
};

export const ProjectOutput = ({
  project,
  compileState,
  isHidden,
  onRunCaseStudy,
}: ProjectOutputProps) => (
  <div className={isHidden ? 'output hidden' : 'output'}>
    {/* Keyed on the slug so switching files cross-fades the pane instead of
        swapping its text in place. `mode="wait"` keeps the two versions from
        overlapping, which would double the pane height mid-transition. */}
    <AnimatePresence mode="wait" initial={false}>
      <motion.article
        key={project.slug}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={FAST_TRANSITION}
      >
        <div>
          <span className="line-no">01</span>
          {/* Static in the reference: the comment never tracks the selection. */}
          <span className="path">// SELECTED PROJECT / KNOWLEDGE PLATFORM</span>
        </div>

        <h2 className="code-title">
          {project.title}
          <span>.ts</span>
        </h2>

        <p className="desc">{project.description}</p>

        <ArchitectureScript entries={project.architecture} />

        <button
          type="button"
          className="run"
          onClick={onRunCaseStudy}
          aria-expanded={compileState !== 'closed'}
        >
          {RUN_STATES[compileState].icon}
          {RUN_STATES[compileState].label}
        </button>
      </motion.article>
    </AnimatePresence>

    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={project.slug}
        className="output-side-motion"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={FAST_TRANSITION}
      >
        <BuildLogPanel logs={project.logs} metric={project.metric} outcome={project.outcome} />
      </motion.div>
    </AnimatePresence>
  </div>
);
