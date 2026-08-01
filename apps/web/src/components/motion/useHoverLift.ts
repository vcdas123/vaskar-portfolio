import { useReducedMotion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import { FAST_TRANSITION } from './motion-tokens';

/**
 * A restrained hover response for cards: a 2px rise, no scale.
 *
 * Scaling would resample the card's 1px borders and hairline mono type, which is
 * exactly the kind of softening the terminal design should not have.
 */
export const useHoverLift = (): MotionProps => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return {};
  }

  return {
    whileHover: { y: -2 },
    transition: FAST_TRANSITION,
  };
};
