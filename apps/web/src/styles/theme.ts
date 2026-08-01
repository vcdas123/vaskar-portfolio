import { createTheme, type MantineColorsTuple, type MantineThemeOverride } from '@mantine/core';
import { breakpointPx, colors, fonts, mantineBreakpoints, radii } from './tokens';

/**
 * Mantine expects a 10-step tuple per colour. The terminal design uses a single
 * flat value per role, so each step repeats it: Mantine never gets to invent a
 * tint that is not in the reference.
 */
const flatTuple = (value: string): MantineColorsTuple =>
  [
    value,
    value,
    value,
    value,
    value,
    value,
    value,
    value,
    value,
    value,
  ] as unknown as MantineColorsTuple;

export const themeColors = {
  background: flatTuple(colors.background),
  surface: flatTuple(colors.surface),
  text: flatTuple(colors.text),
  primary: flatTuple(colors.primary),
  secondary: flatTuple(colors.secondary),
  warning: flatTuple(colors.warning),
  muted: flatTuple(colors.muted),
  terminalBorder: flatTuple(colors.border),
} as const;

/**
 * The typed Mantine theme. This is the source of truth for colours, typography,
 * spacing, breakpoints and focus behaviour; `tokens.css` mirrors the same values
 * as CSS custom properties, and Tailwind consumes only those aliases.
 */
export const theme: MantineThemeOverride = createTheme({
  colors: themeColors,
  primaryColor: 'primary',
  primaryShade: 5,
  white: colors.text,
  black: colors.background,

  fontFamily: fonts.body,
  fontFamilyMonospace: fonts.mono,
  headings: {
    fontFamily: fonts.body,
    fontWeight: '500',
  },

  defaultRadius: 'md',
  radius: {
    xs: radii['radius-sm'],
    sm: radii['radius-sm'],
    md: radii['radius-md'],
    lg: radii['radius-md'],
    xl: radii['radius-pill'],
  },

  breakpoints: mantineBreakpoints,

  spacing: {
    xs: '8px',
    sm: '14px',
    md: '20px',
    lg: '28px',
    xl: '48px',
  },

  fontSizes: {
    xs: '8px',
    sm: '9px',
    md: '10px',
    lg: '11px',
    xl: '12px',
  },

  // A single visible focus treatment across native and Mantine controls.
  focusRing: 'auto',

  other: {
    breakpointPx,
  },
});
