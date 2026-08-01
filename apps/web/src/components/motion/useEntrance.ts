import { useReducedMotion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import { ENTRANCE_RISE, ENTRANCE_TRANSITION, STAGGER_STEP, VIEWPORT_AMOUNT } from './motion-tokens';

interface EntranceOptions {
  /** Rise distance in pixels; `0` gives a pure fade. */
  rise?: number;
  /** Delay in seconds — usually `index * STAGGER_STEP`. */
  delay?: number;
  /** Play immediately on mount instead of waiting for the viewport. */
  immediate?: boolean;
}

/**
 * Returns the Framer props for a block that fades and rises into place the first
 * time it scrolls into view.
 *
 * When the visitor prefers reduced motion this returns an empty object: no
 * `initial`, no `animate`, nothing to settle — the element renders in its final
 * state on the first paint. That is also what the Playwright parity suite runs
 * under, so the screenshot comparison measures the reference layout rather than
 * an animation frame.
 */
export const useEntrance = ({
  rise = ENTRANCE_RISE,
  delay = 0,
  immediate = false,
}: EntranceOptions = {}): MotionProps => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return {};
  }

  const transition = { ...ENTRANCE_TRANSITION, delay };
  const from = { opacity: 0, y: rise };
  const to = { opacity: 1, y: 0 };

  if (immediate) {
    return { initial: from, animate: to, transition };
  }

  return {
    initial: from,
    whileInView: to,
    viewport: { once: true, amount: VIEWPORT_AMOUNT },
    transition,
  };
};

/** Convenience wrapper for staggered collections. */
export const staggerDelay = (index: number, step = STAGGER_STEP): number => index * step;
