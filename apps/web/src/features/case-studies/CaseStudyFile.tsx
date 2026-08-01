import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '@portfolio/contracts';
import { useGetCaseStudyQuery } from '../../services/portfolioApi';
import { toApiError } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppStore';
import { useEntrance } from '../../components/motion/useEntrance';
import { ENTRANCE_TRANSITION } from '../../components/motion/motion-tokens';
import {
  COMPILE_DURATION_MS,
  caseStudyClosed,
  caseStudyCompiled,
  selectCompileState,
} from './caseStudiesSlice';
import { CaseStudyLoader } from './CaseStudyLoader';
import { CaseStudyDocument } from './CaseStudyDocument';

interface CaseStudyFileProps {
  project: Project;
}

/**
 * The `case-study.md` file rendered inside the workspace pane.
 *
 * This component owns the compile timer. Closing the file (or selecting another
 * project) unmounts it, and the cleanup clears the pending timeout — so a
 * cancelled compilation can never resolve into an open document. The reducer also
 * ignores `caseStudyCompiled` unless the state is still `compiling`, which keeps
 * the invariant even if the two ever race.
 */
export const CaseStudyFile = ({ project }: CaseStudyFileProps) => {
  const dispatch = useAppDispatch();
  const compileState = useAppSelector(selectCompileState);
  const { data: study, isError, error, refetch } = useGetCaseStudyQuery(project.slug);
  const paneEntrance = useEntrance({ immediate: true, rise: 8 });

  useEffect(() => {
    if (compileState !== 'compiling') {
      return undefined;
    }
    const timer = window.setTimeout(() => dispatch(caseStudyCompiled()), COMPILE_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [compileState, dispatch, project.slug]);

  const close = () => dispatch(caseStudyClosed());

  if (isError) {
    const apiError = toApiError(error);
    return (
      <div className="case-file open">
        <div className="cs-loader" role="alert">
          <div className="cs-loader-command">$ portfolio run {project.slug} --case-study</div>
          <div>
            <span className="boot-fail">[error]</span> {apiError.message}
          </div>
          <button type="button" className="boot-retry" onClick={() => void refetch()}>
            ↻ RETRY COMPILE
          </button>
          <button type="button" className="cs-close" onClick={close}>
            ← BACK TO {project.file.toUpperCase()}
          </button>
        </div>
      </div>
    );
  }

  // The document appears only once the timer has elapsed *and* the payload has
  // arrived, so a slow network extends the compile state instead of flashing.
  const isReady = compileState === 'ready' && study !== undefined;

  return (
    <motion.div className="case-file open" {...paneEntrance}>
      {/* Cross-fade compile → compiled. `mode="wait"` prevents the two states
          from overlapping and briefly doubling the pane height. */}
      <AnimatePresence mode="wait" initial={false}>
        {isReady ? (
          <motion.div
            key="document"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={ENTRANCE_TRANSITION}
          >
            <CaseStudyDocument project={project} study={study} onClose={close} />
          </motion.div>
        ) : (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={ENTRANCE_TRANSITION}
          >
            <CaseStudyLoader slug={project.slug} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
