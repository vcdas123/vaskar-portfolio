import type { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Provider as ReduxProvider } from 'react-redux';
import { MotionProvider } from '../components/motion/MotionProvider';
import { theme } from '../styles/theme';
import { store as defaultStore, type AppStore } from './store';

interface AppProvidersProps {
  children: ReactNode;
  /** Tests inject a fresh store so state never leaks between cases. */
  store?: AppStore;
}

/**
 * Mantine is mounted as the theme authority only.
 *
 * Its global reset (`@mantine/core/styles.css`) is deliberately not imported:
 * that reset strips heading weights, paragraph margins and list markers the
 * reference stylesheet inherits from UA defaults, which would change the
 * reference design. `MantineProvider` still publishes the typed theme and its
 * CSS variables, which is what the styling contract asks Mantine to own.
 */
export const AppProviders = ({ children, store = defaultStore }: AppProvidersProps) => (
  <ReduxProvider store={store}>
    <MantineProvider theme={theme} defaultColorScheme="dark" cssVariablesSelector=":root">
      <MotionProvider>{children}</MotionProvider>
    </MantineProvider>
  </ReduxProvider>
);
