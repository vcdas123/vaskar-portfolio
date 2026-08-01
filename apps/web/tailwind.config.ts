import type { Config } from 'tailwindcss';
import { breakpointPx, colors, layout, radii } from './src/styles/tokens';

/**
 * Tailwind consumes semantic aliases that point at the `--portfolio-*` custom
 * properties emitted by `tokens.css`. Raw colour values are never repeated here —
 * the key names are read from the token module so an alias cannot be forgotten.
 */
const colorAliases = Object.fromEntries(
  Object.keys(colors).map((token) => [token, `var(--portfolio-${token})`]),
) as Record<keyof typeof colors, string>;

const spacingAliases = Object.fromEntries(
  Object.keys(layout).map((token) => [token, `var(--portfolio-${token})`]),
);

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],

  // The reference stylesheet carries its own reset; Tailwind's preflight would
  // strip UA heading weights and list markers the reference relies on.
  corePlugins: { preflight: false },

  theme: {
    extend: {
      colors: {
        ...colorAliases,
        // Semantic aliases named in the styling brief.
        app: 'var(--portfolio-background)',
        main: 'var(--portfolio-text)',
        'border-terminal': 'var(--portfolio-border)',
      },
      backgroundColor: {
        app: 'var(--portfolio-background)',
        surface: 'var(--portfolio-surface)',
      },
      textColor: {
        main: 'var(--portfolio-text)',
        muted: 'var(--portfolio-muted)',
      },
      borderColor: {
        terminal: 'var(--portfolio-border)',
      },
      fontFamily: {
        body: ['var(--portfolio-font-body)'],
        mono: ['var(--portfolio-font-mono)'],
      },
      spacing: spacingAliases,
      maxWidth: {
        shell: 'var(--portfolio-shell-max)',
      },
      borderRadius: Object.fromEntries(
        Object.keys(radii).map((token) => [
          token.replace('radius-', ''),
          `var(--portfolio-${token})`,
        ]),
      ),
      screens: {
        // Mirrors the reference `max-width` queries.
        'terminal-md': { max: `${breakpointPx.md}px` },
        'terminal-sm': { max: `${breakpointPx.sm}px` },
      },
    },
  },

  plugins: [],
} satisfies Config;
