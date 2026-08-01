import { ScanOverlay } from '../components/layout/ScanOverlay';
import { useInitialScrollPosition } from '../hooks/useInitialScrollPosition';
import { AppRoutes } from './router';

export const App = () => {
  useInitialScrollPosition();

  return (
    <>
      <ScanOverlay />
      <AppRoutes />
    </>
  );
};
