import { useEffect } from 'react';

/** Syncs the document title with the seeded site settings. */
export const useDocumentTitle = (title: string | undefined): void => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
};
