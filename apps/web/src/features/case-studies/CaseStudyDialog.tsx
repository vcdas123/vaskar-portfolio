import { useEffect, useRef } from 'react';
import type { Project } from '@portfolio/contracts';
import { useGetCaseStudyQuery } from '../../services/portfolioApi';
import { toApiError } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppStore';
import { CloseIcon, RestartIcon } from '../../components/ui/icons';
import {
  COMPILE_DURATION_MS,
  caseStudyClosed,
  caseStudyCompiled,
  selectCompileState,
  selectOpenSlug,
} from './caseStudiesSlice';
import { CaseStudyLoader } from './CaseStudyLoader';
import { CaseStudyDocument } from './CaseStudyDocument';

interface CaseStudyDialogProps {
  projects: Project[];
}

/**
 * The compiled case study, opened from a project card into a native `<dialog>`.
 *
 * `showModal()` is what makes this worth using over a div: the browser traps focus
 * inside the dialog, marks the rest of the page inert, and handles `Esc` — none of
 * which the previous in-page pane provided.
 *
 * This component owns the compile timer. Closing the dialog clears the pending
 * timeout, so a cancelled compilation can never resolve into an open document; the
 * reducer also ignores a late `caseStudyCompiled`, which keeps the invariant even if
 * the two race.
 */
export const CaseStudyDialog = ({ projects }: CaseStudyDialogProps) => {
  const dispatch = useAppDispatch();
  const openSlug = useAppSelector(selectOpenSlug);
  const compileState = useAppSelector(selectCompileState);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const project = projects.find((entry) => entry.slug === openSlug);

  const {
    data: study,
    isError,
    error,
    refetch,
  } = useGetCaseStudyQuery(openSlug ?? '', {
    skip: !openSlug,
  });

  const close = () => dispatch(caseStudyClosed());

  // Drive the native dialog from Redux rather than from imperative call sites, so
  // the DOM state and the store cannot disagree.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (openSlug && !dialog.open) {
      dialog.showModal();
    } else if (!openSlug && dialog.open) {
      dialog.close();
    }
  }, [openSlug]);

  // `Esc` fires `cancel`; route it through the store so state stays consistent.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const handleCancel = (event: Event): void => {
      event.preventDefault();
      close();
    };
    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  });

  useEffect(() => {
    if (compileState !== 'compiling') return undefined;
    const timer = window.setTimeout(() => dispatch(caseStudyCompiled()), COMPILE_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [compileState, dispatch, openSlug]);

  const isReady = compileState === 'ready' && study !== undefined;

  return (
    <dialog className="case-dialog" ref={dialogRef} aria-label="Case study">
      <button type="button" className="case-dialog-close" onClick={close}>
        <CloseIcon size={12} />
        CLOSE
      </button>

      {project ? (
        isError ? (
          <div className="cs-loader" role="alert">
            <div className="cs-loader-command">$ portfolio run {project.slug} --case-study</div>
            <div>
              <span className="boot-fail">[error]</span> {toApiError(error).message}
            </div>
            <button type="button" className="boot-retry" onClick={() => void refetch()}>
              <RestartIcon />
              RETRY COMPILE
            </button>
          </div>
        ) : isReady ? (
          <CaseStudyDocument project={project} study={study} onClose={close} />
        ) : (
          <CaseStudyLoader slug={project.slug} />
        )
      ) : null}
    </dialog>
  );
};
