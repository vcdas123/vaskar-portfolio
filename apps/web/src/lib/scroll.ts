/**
 * Scroll ownership.
 *
 * The browser must not restore a previous scroll offset, and a fresh load or
 * reload must start at the top — never at the contact section. An explicit hash
 * is the one case where the browser's own anchor behaviour is respected.
 */
export const takeOverScrollRestoration = (): void => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
};

export const scrollToTopUnlessHashed = (): void => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
};
