import { describe, expect, it } from 'vitest';
import {
  caseStudiesSlice,
  caseStudyClosed,
  caseStudyCompiled,
  caseStudyOpened,
} from '../../src/features/case-studies/caseStudiesSlice';
import {
  answerRecorded,
  contactSlice,
  sessionRestarted,
  submissionFailed,
  submissionStarted,
  submissionSucceeded,
} from '../../src/features/contact/contactSlice';
import {
  defaultProjectResolved,
  projectSelected,
  projectsSlice,
} from '../../src/features/projects/projectsSlice';

const reduceAll = <TState, TAction>(
  reducer: (state: TState | undefined, action: TAction) => TState,
  actions: TAction[],
): TState =>
  actions.reduce<TState | undefined>(
    (state, action) => reducer(state, action),
    undefined,
  ) as TState;

describe('projectsSlice', () => {
  const { reducer } = projectsSlice;

  it('starts with nothing selected until the payload arrives', () => {
    expect(reducer(undefined, { type: '@@init' }).selectedSlug).toBeNull();
  });

  it('adopts the first project as the default', () => {
    const state = reduceAll(reducer, [defaultProjectResolved('cachiva')]);
    expect(state.selectedSlug).toBe('cachiva');
  });

  it('does not let the default override an explicit selection', () => {
    const state = reduceAll(reducer, [
      projectSelected('myhistory'),
      defaultProjectResolved('cachiva'),
    ]);
    expect(state.selectedSlug).toBe('myhistory');
  });
});

describe('caseStudiesSlice', () => {
  const { reducer } = caseStudiesSlice;

  it('opens into the compiling state', () => {
    const state = reduceAll(reducer, [caseStudyOpened('cachiva')]);
    expect(state).toMatchObject({ openSlug: 'cachiva', compileState: 'compiling' });
  });

  it('resolves to ready once compilation completes', () => {
    const state = reduceAll(reducer, [caseStudyOpened('cachiva'), caseStudyCompiled()]);
    expect(state.compileState).toBe('ready');
  });

  it('ignores a compile that resolves after the file was closed', () => {
    // The safety net behind the cancelled timer: a late action cannot reopen the
    // file, even if the timeout and the close ever race.
    const state = reduceAll(reducer, [
      caseStudyOpened('cachiva'),
      caseStudyClosed(),
      caseStudyCompiled(),
    ]);
    expect(state).toMatchObject({ openSlug: null, compileState: 'closed' });
  });

  it('restarts the compile sequence when re-run', () => {
    const state = reduceAll(reducer, [
      caseStudyOpened('cachiva'),
      caseStudyCompiled(),
      caseStudyOpened('cachiva'),
    ]);
    expect(state.compileState).toBe('compiling');
  });
});

describe('contactSlice', () => {
  const { reducer } = contactSlice;
  const initial = reducer(undefined, { type: '@@init' });

  it('opens with the two boot log lines and no restart offered', () => {
    expect(initial.log).toHaveLength(2);
    expect(initial.log[0]?.tag).toBe('boot');
    expect(initial.stepIndex).toBe(0);
    expect(contactSlice.selectors.selectCanRestart({ contact: initial })).toBe(false);
  });

  it('records answers in order and advances one step at a time', () => {
    const state = reduceAll(reducer, [
      answerRecorded({ key: 'name', value: 'Vaskar' }),
      answerRecorded({ key: 'purpose', value: 'Hiring' }),
    ]);

    expect(state.stepIndex).toBe(2);
    expect(state.answers).toEqual({ name: 'Vaskar', purpose: 'Hiring' });
    expect(state.log.at(-1)?.text).toBe('purpose: Hiring');
    expect(contactSlice.selectors.selectCurrentStep({ contact: state })?.key).toBe('message');
  });

  it('offers restart as soon as the first answer is stored', () => {
    const state = reduceAll(reducer, [answerRecorded({ key: 'name', value: 'Vaskar' })]);
    expect(contactSlice.selectors.selectCanRestart({ contact: state })).toBe(true);
  });

  it('logs success and hides the form', () => {
    const state = reduceAll(reducer, [
      answerRecorded({ key: 'name', value: 'Vaskar' }),
      submissionStarted(),
      submissionSucceeded(),
    ]);

    expect(state.phase).toBe('succeeded');
    expect(state.log.at(-1)?.tag).toBe('success');
    expect(contactSlice.selectors.selectIsFormVisible({ contact: state })).toBe(false);
  });

  it('logs a failure with recovery guidance', () => {
    const state = reduceAll(reducer, [
      answerRecorded({ key: 'name', value: 'Vaskar' }),
      submissionStarted(),
      submissionFailed('Something went wrong'),
    ]);

    expect(state.phase).toBe('failed');
    expect(state.log.some((entry) => entry.text === 'Something went wrong')).toBe(true);
    expect(state.log.at(-1)?.text).toMatch(/RESTART SESSION/);
  });

  it('restart clears the session back to its initial state', () => {
    const state = reduceAll(reducer, [
      answerRecorded({ key: 'name', value: 'Vaskar' }),
      submissionStarted(),
      submissionSucceeded(),
      sessionRestarted(),
    ]);

    expect(state).toEqual(initial);
  });

  it('gives every log entry a unique key', () => {
    const state = reduceAll(reducer, [
      answerRecorded({ key: 'name', value: 'A' }),
      answerRecorded({ key: 'purpose', value: 'B' }),
      answerRecorded({ key: 'message', value: 'C' }),
      submissionStarted(),
      submissionSucceeded(),
    ]);

    const ids = state.log.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
