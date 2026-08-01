/**
 * The single source of truth for every design value in the application.
 *
 * `theme.ts` builds the Mantine theme from this module, and `tokens.css` is
 * generated from it (`npm run tokens`) so the same values reach plain CSS and
 * Tailwind as `--portfolio-*` custom properties. A unit test asserts the
 * generated file is in sync, so the two can never drift.
 */

/** Palette declared by `site.theme.colors` in the seed dataset. */
export const coreColors = {
  background: '#050607',
  surface: '#090c0e',
  text: '#e8ebe4',
  primary: '#b7ff55',
  secondary: '#68ddff',
  warning: '#ff835c',
  muted: '#778078',
  /**
   * Dimmed from the dataset's `#252b28`. Every panel, section divider, grid rule
   * and card in the design is outlined, so at the original value the borders
   * competed with the content for attention. This is the single place to tune it.
   */
  border: '#1a1e1c',
} as const;

/**
 * Shades the reference stylesheet uses for individual surfaces and copy tiers.
 * Naming is by role so no component ever needs a raw hex value.
 */
export const derivedColors = {
  'primary-hover': '#d6ff9c',
  'text-hero': '#9fa79f',
  'text-desc': '#929c94',
  'text-prose': '#abb3ac',
  'text-script': '#a2aaa3',
  'text-log': '#909991',
  'text-card': '#8d968e',
  'text-tree': '#8d968f',
  'text-skill': '#a4aca5',
  'text-line-no': '#3f4943',
  'surface-card': '#080b0c',
  'surface-command': '#0d1210',
  'surface-tab': '#0d1113',
  'surface-tab-active': '#111715',
  'surface-tree-active': '#172019',
  'surface-track': '#1f2522',
  'surface-dot': '#39403c',
  /* Dimmed alongside `border`, keeping the same step up on card hover. */
  'border-card-hover': '#414c46',
} as const;

export const colors = { ...coreColors, ...derivedColors } as const;

export const fonts = {
  body: 'Inter, sans-serif',
  mono: "'DM Mono', monospace",
} as const;

/**
 * Corner radii. The reference design is entirely square; these soften every
 * bordered surface and control by one consistent step. `radius-sm` is for inline
 * controls and chips, `radius-md` for panels, cards and consoles.
 */
export const radii = {
  'radius-sm': '4px',
  'radius-md': '8px',
  'radius-pill': '999px',
} as const;

/** Layout rails shared by the shell and every 2-column section head. */
export const layout = {
  'shell-max': '1500px',
  /**
   * Per-side page margin. Fluid rather than stepped: tight on phones so content
   * keeps its width, generous on large screens so the page is not edge-to-edge.
   * 320px -> 14px, 768px -> 35px, 1440px -> 65px, 1920px+ -> 80px.
   * Replaces the reference's fixed 48 / 34 / 22px gutters.
   */
  'app-margin': 'clamp(14px, 4.5vw, 80px)',
  'shell-gutter': '48px',
  'shell-gutter-md': '34px',
  'shell-gutter-sm': '22px',
  rail: '250px',
  'rail-md': '170px',
} as const;

/**
 * The reference stylesheet is written with `max-width` queries at these two
 * widths. CSS `@media` cannot read custom properties, so the numbers are
 * duplicated as literals inside the stylesheets — these constants are the
 * canonical definition that the Mantine theme and Playwright tests share.
 */
export const breakpointPx = {
  /** Tablet and below. */
  md: 1000,
  /** Phone and below — also the width at which "SYSTEM ONLINE" is hidden. */
  sm: 600,
} as const;

/** Mantine expects `em` breakpoints (min-width based). */
export const mantineBreakpoints = {
  xs: '20em', // 320px
  sm: `${breakpointPx.sm / 16}em`, // 37.5em / 600px
  md: `${breakpointPx.md / 16}em`, // 62.5em / 1000px
  lg: '75em', // 1200px
  xl: '93.75em', // 1500px
} as const;

/** Builds the `:root` custom-property block written to `tokens.css`. */
export const buildTokensCss = (): string => {
  const entries: string[] = [];

  entries.push('  /* Core palette — seeded from site.theme.colors */');
  for (const [name, value] of Object.entries(coreColors)) {
    entries.push(`  --portfolio-${name}: ${value};`);
  }

  entries.push('');
  entries.push('  /* Role-named surface and copy shades */');
  for (const [name, value] of Object.entries(derivedColors)) {
    entries.push(`  --portfolio-${name}: ${value};`);
  }

  entries.push('');
  entries.push('  /* Typography */');
  entries.push(`  --portfolio-font-body: ${fonts.body};`);
  entries.push(`  --portfolio-font-mono: ${fonts.mono};`);

  entries.push('');
  entries.push('  /* Corner radii */');
  for (const [name, value] of Object.entries(radii)) {
    entries.push(`  --portfolio-${name}: ${value};`);
  }

  entries.push('');
  entries.push('  /* Layout rails */');
  for (const [name, value] of Object.entries(layout)) {
    entries.push(`  --portfolio-${name}: ${value};`);
  }

  return [
    '/* GENERATED FILE — edit src/styles/tokens.ts and run `npm run tokens`. */',
    ':root {',
    ...entries,
    '}',
    '',
  ].join('\n');
};
