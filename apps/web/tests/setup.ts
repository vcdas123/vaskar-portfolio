import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// jsdom implements neither matchMedia nor scrollTo, both of which the app reads.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(window, 'scrollTo', { writable: true, value: vi.fn() });

/**
 * jsdom ships neither observer. Framer Motion's `whileInView` needs
 * IntersectionObserver, and its layout animations touch ResizeObserver.
 *
 * The intersection stub reports nothing as visible, which is the honest default
 * for a layout-less environment: entrance animations simply never fire, so these
 * tests assert content and behaviour rather than animation frames.
 */
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

class MockResizeObserver implements ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
vi.stubGlobal('ResizeObserver', MockResizeObserver);

afterEach(() => {
  cleanup();
});
