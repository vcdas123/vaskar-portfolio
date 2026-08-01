import { Navigate, Route, Routes } from 'react-router-dom';
import { PortfolioPage } from '../features/portfolio/PortfolioPage';

/**
 * Routes render the same single-page document; `/projects/:slug` is a deep link
 * that pre-selects a workspace file. No route scrolls on entry — the shared
 * scroll policy pins every load to the top of the page.
 */
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PortfolioPage />} />
    <Route path="/projects/:slug" element={<PortfolioPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
