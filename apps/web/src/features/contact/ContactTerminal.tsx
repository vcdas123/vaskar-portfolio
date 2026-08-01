import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONTACT_STEPS, contactRequestSchema } from '@portfolio/contracts';
import { FAST_TRANSITION } from '../../components/motion/motion-tokens';
import { RestartIcon, SubmitIcon } from '../../components/ui/icons';
import { useSubmitContactMutation } from '../../services/portfolioApi';
import { toApiError } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppStore';
import {
  answerRecorded,
  selectAnswers,
  selectCanRestart,
  selectCurrentStep,
  selectIsFormVisible,
  selectLog,
  selectPhase,
  selectStepIndex,
  sessionRestarted,
  submissionFailed,
  submissionStarted,
  submissionSucceeded,
} from './contactSlice';

interface ContactTerminalProps {
  note: string;
}

/**
 * The questionnaire terminal: one question at a time, answers appended to the log.
 *
 * The draft answer is deliberately local state — only committed answers and
 * session progress belong in Redux. Focus is moved with `preventScroll` and never
 * on first render, so loading the page cannot pull the viewport to this section.
 */
export const ContactTerminal = ({ note }: ContactTerminalProps) => {
  const dispatch = useAppDispatch();
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldFocusRef = useRef(false);

  const log = useAppSelector(selectLog);
  const phase = useAppSelector(selectPhase);
  const stepIndex = useAppSelector(selectStepIndex);
  const answers = useAppSelector(selectAnswers);
  const canRestart = useAppSelector(selectCanRestart);
  const isFormVisible = useAppSelector(selectIsFormVisible);
  const step = useAppSelector(selectCurrentStep);

  const [submitContact] = useSubmitContactMutation();

  // Focus follows a user action only; the flag is never set during mount.
  useEffect(() => {
    if (shouldFocusRef.current) {
      shouldFocusRef.current = false;
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [stepIndex, phase]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const value = draft.trim();
    if (!value || !step || phase === 'submitting') {
      return;
    }

    dispatch(answerRecorded({ key: step.key, value }));
    setDraft('');

    const isFinalStep = stepIndex === CONTACT_STEPS.length - 1;
    if (!isFinalStep) {
      shouldFocusRef.current = true;
      return;
    }

    const candidate = { ...answers, [step.key]: value };
    const parsed = contactRequestSchema.safeParse(candidate);
    if (!parsed.success) {
      dispatch(submissionFailed(parsed.error.issues[0]?.message ?? 'payload failed validation'));
      return;
    }

    dispatch(submissionStarted());
    try {
      await submitContact(parsed.data).unwrap();
      dispatch(submissionSucceeded());
    } catch (error) {
      dispatch(submissionFailed(toApiError(error).message));
    }
  };

  const handleRestart = (): void => {
    shouldFocusRef.current = true;
    setDraft('');
    dispatch(sessionRestarted());
  };

  return (
    <div className="contact-terminal">
      <div className="ct-bar">
        <span>contact-session.sh</span>
        <span>LOCAL MODE ●</span>
      </div>

      <div className="ct-body">
        {/* Each answer types itself into the log; entries never leave, so only
            the enter transition is defined. */}
        <div className="ct-log" role="log" aria-live="polite">
          <AnimatePresence initial={false}>
            {log.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={FAST_TRANSITION}
              >
                <b>[{entry.tag}]</b> {entry.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <form className={isFormVisible ? 'ct-form' : 'ct-form is-hidden'} onSubmit={handleSubmit}>
          <div className="ct-prompt">
            <label htmlFor="contactInput">{step?.prompt ?? CONTACT_STEPS[0].prompt}</label>
            <input
              ref={inputRef}
              className="ct-input"
              id="contactInput"
              name={step?.key ?? 'name'}
              autoComplete="off"
              required
              disabled={phase === 'submitting'}
              placeholder={step?.placeholder ?? CONTACT_STEPS[0].placeholder}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
            <button className="ct-submit" type="submit" disabled={phase === 'submitting'}>
              <SubmitIcon />
              ENTER
            </button>
          </div>
        </form>

        <button
          className={canRestart ? 'ct-restart is-visible' : 'ct-restart'}
          type="button"
          onClick={handleRestart}
        >
          <RestartIcon />
          RESTART SESSION
        </button>

        {note ? <div className="ct-note">{note}</div> : null}
      </div>
    </div>
  );
};
