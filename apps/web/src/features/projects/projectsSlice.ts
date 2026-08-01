import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/** The slug the explorer, tabs and output pane are all synchronised on. */
export interface ProjectsState {
  selectedSlug: string | null;
}

const initialState: ProjectsState = {
  selectedSlug: null,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    projectSelected(state, action: PayloadAction<string>) {
      state.selectedSlug = action.payload;
    },
    /** Applied once the payload arrives so the first project is pre-selected. */
    defaultProjectResolved(state, action: PayloadAction<string>) {
      if (state.selectedSlug === null) {
        state.selectedSlug = action.payload;
      }
    },
  },
  selectors: {
    selectSelectedSlug: (state) => state.selectedSlug,
  },
});

export const { projectSelected, defaultProjectResolved } = projectsSlice.actions;
export const { selectSelectedSlug } = projectsSlice.selectors;
