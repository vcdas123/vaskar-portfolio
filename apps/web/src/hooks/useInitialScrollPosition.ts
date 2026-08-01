import { useEffect } from 'react';
import { scrollToTopUnlessHashed, takeOverScrollRestoration } from '../lib/scroll';

/**
 * Keeps first paint and back/forward restores pinned to the top of the document.
 * `pageshow` also covers Safari's back-forward cache, where React never remounts.
 */
export const useInitialScrollPosition = (): void => {
  useEffect(() => {
    takeOverScrollRestoration();
    scrollToTopUnlessHashed();

    const handlePageShow = (): void => scrollToTopUnlessHashed();
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);
};
