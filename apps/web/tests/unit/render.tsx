import type { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProviders } from '../../src/app/providers';
import { createStore, type AppStore } from '../../src/app/store';

interface RenderOptions {
  /** Defaults to a fresh store so state never leaks between tests. */
  store?: AppStore;
  route?: string;
}

/**
 * Renders a component inside the real providers the app uses.
 *
 * The return type is inferred so the full set of Testing Library queries comes
 * through unchanged, with `store` added for assertions on dispatched state.
 */
export const renderWithProviders = (
  ui: ReactElement,
  { store = createStore(), route = '/' }: RenderOptions = {},
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <AppProviders store={store}>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </AppProviders>
  );

  return { ...render(ui, { wrapper: Wrapper }), store };
};
