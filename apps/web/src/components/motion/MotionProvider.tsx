import type { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';

/**
 * `reducedMotion="user"` makes Framer honour the OS setting for transform and
 * layout animations. The entrance hooks below additionally opt out of opacity
 * animation, so a reduced-motion visitor gets the fully settled page with no
 * movement and no fade at all.
 */
export const MotionProvider = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
