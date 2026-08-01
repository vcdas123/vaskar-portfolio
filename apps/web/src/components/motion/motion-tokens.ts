import type { Transition } from 'framer-motion';

/**
 * Shared motion vocabulary.
 *
 * Every animation in the app is an *entrance* or a *hover* — each one resolves to
 * `opacity: 1` and no transform. The settled page is therefore pixel-identical to
 * the reference; motion only changes how it arrives.
 */

/** Terminal-appropriate easing: quick out, long settle. No overshoot. */
export const EASE_TERMINAL = [0.22, 1, 0.36, 1] as const;

export const ENTRANCE_TRANSITION: Transition = {
  duration: 0.5,
  ease: EASE_TERMINAL,
};

export const FAST_TRANSITION: Transition = {
  duration: 0.28,
  ease: EASE_TERMINAL,
};

/** Default rise distance for entering blocks, in pixels. */
export const ENTRANCE_RISE = 16;

/** Per-item delay for staggered grids and lists, in seconds. */
export const STAGGER_STEP = 0.06;

/** How much of an element must be visible before its entrance runs. */
export const VIEWPORT_AMOUNT = 0.15;
