import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * `compiling` drives the animated loader; the transition to `ready` is owned by a
 * timer in `CaseStudyFile`. Closing the file returns the state to `closed`, which
 * unmounts the timer and cancels the pending transition.
 */
export type CompileState = 'closed' | 'compiling' | 'ready';

export interface CaseStudiesState {
  /** Slug whose `case-study.md` file is open, or `null` when none is. */
  openSlug: string | null;
  compileState: CompileState;
}

const initialState: CaseStudiesState = {
  openSlug: null,
  compileState: 'closed',
};

export const caseStudiesSlice = createSlice({
  name: 'caseStudies',
  initialState,
  reducers: {
    caseStudyOpened(state, action: PayloadAction<string>) {
      state.openSlug = action.payload;
      // Re-running an already open study restarts the compile sequence.
      state.compileState = 'compiling';
    },
    caseStudyCompiled(state) {
      // Guarded: a timer that fires after a close must not reopen the file.
      if (state.compileState === 'compiling') {
        state.compileState = 'ready';
      }
    },
    caseStudyClosed(state) {
      state.openSlug = null;
      state.compileState = 'closed';
    },
  },
  selectors: {
    selectOpenSlug: (state) => state.openSlug,
    selectCompileState: (state) => state.compileState,
    selectIsCaseStudyOpen: (state) => state.openSlug !== null,
  },
});

export const { caseStudyOpened, caseStudyCompiled, caseStudyClosed } = caseStudiesSlice.actions;
export const { selectOpenSlug, selectCompileState, selectIsCaseStudyOpen } =
  caseStudiesSlice.selectors;

/** Matches the reference's 1100ms compile animation. */
export const COMPILE_DURATION_MS = 1100;
