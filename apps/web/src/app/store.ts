import { configureStore, type Middleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from '../services/api';
import { caseStudiesSlice } from '../features/case-studies/caseStudiesSlice';
import { contactSlice } from '../features/contact/contactSlice';

const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  [caseStudiesSlice.reducerPath]: caseStudiesSlice.reducer,
  [contactSlice.reducerPath]: contactSlice.reducer,
};

/**
 * Redux holds only cross-component application state — the open case study, its
 * compile state, and contact-session progress. Transient input text stays local to
 * the field that owns it.
 */
export const createStore = (extraMiddleware: Middleware[] = []) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware, ...extraMiddleware),
  });

export const store = createStore();

setupListeners(store.dispatch);

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
