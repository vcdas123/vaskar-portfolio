import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CONTACT_STEPS, type ContactRequest } from '@portfolio/contracts';

export type ContactPhase = 'collecting' | 'submitting' | 'succeeded' | 'failed';

export interface ContactLogEntry {
  id: number;
  tag: string;
  text: string;
}

export interface ContactState {
  stepIndex: number;
  answers: Partial<ContactRequest>;
  log: ContactLogEntry[];
  phase: ContactPhase;
  /** Monotonic id source — keeps log keys stable without indexing by position. */
  nextLogId: number;
}

const bootLog = (startId: number): ContactLogEntry[] => [
  { id: startId, tag: 'boot', text: 'secure contact session initialized' },
  { id: startId + 1, tag: 'info', text: 'answers are collected one step at a time' },
];

const createInitialState = (): ContactState => ({
  stepIndex: 0,
  answers: {},
  log: bootLog(0),
  phase: 'collecting',
  nextLogId: 2,
});

export const contactSlice = createSlice({
  name: 'contact',
  initialState: createInitialState(),
  reducers: {
    answerRecorded(state, action: PayloadAction<{ key: keyof ContactRequest; value: string }>) {
      const { key, value } = action.payload;
      state.answers[key] = value;
      state.log.push({ id: state.nextLogId++, tag: 'saved', text: `${key}: ${value}` });
      state.stepIndex += 1;
    },
    submissionStarted(state) {
      state.phase = 'submitting';
      state.log.push({ id: state.nextLogId++, tag: 'send', text: 'POST /api/contact' });
    },
    submissionSucceeded(state) {
      state.phase = 'succeeded';
      state.log.push({
        id: state.nextLogId++,
        tag: 'success',
        text: 'payload compiled and submitted ✓',
      });
    },
    submissionFailed(state, action: PayloadAction<string>) {
      state.phase = 'failed';
      state.log.push({ id: state.nextLogId++, tag: 'error', text: action.payload });
      state.log.push({
        id: state.nextLogId++,
        tag: 'info',
        text: 'press ↻ RESTART SESSION to try again',
      });
    },
    /** Clears the session in place — never a page reload. */
    sessionRestarted() {
      return createInitialState();
    },
  },
  selectors: {
    selectStepIndex: (state) => state.stepIndex,
    selectLog: (state) => state.log,
    selectPhase: (state) => state.phase,
    selectAnswers: (state) => state.answers,
    /** Restart is offered as soon as the first answer is stored. */
    selectCanRestart: (state) => state.stepIndex > 0,
    selectIsFormVisible: (state) => state.phase === 'collecting' || state.phase === 'submitting',
    selectCurrentStep: (state) => CONTACT_STEPS[state.stepIndex] ?? null,
  },
});

export const {
  answerRecorded,
  submissionStarted,
  submissionSucceeded,
  submissionFailed,
  sessionRestarted,
} = contactSlice.actions;

export const {
  selectStepIndex,
  selectLog,
  selectPhase,
  selectAnswers,
  selectCanRestart,
  selectIsFormVisible,
  selectCurrentStep,
} = contactSlice.selectors;
