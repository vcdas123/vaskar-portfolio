import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildTokensCss, colors, coreColors } from '../../src/styles/tokens';
import { theme } from '../../src/styles/theme';

const tokensCssPath = resolve(import.meta.dirname, '../../src/styles/tokens.css');

describe('design tokens', () => {
  it('tokens.css is in sync with tokens.ts', () => {
    // The generated stylesheet is checked in; this is what stops it drifting from
    // the TypeScript source that the Mantine theme and Tailwind aliases read.
    const onDisk = readFileSync(tokensCssPath, 'utf8');
    expect(onDisk).toBe(buildTokensCss());
  });

  it('exposes every token as a --portfolio-* custom property', () => {
    const css = buildTokensCss();
    for (const token of Object.keys(colors)) {
      expect(css).toContain(`--portfolio-${token}:`);
    }
  });

  it('Mantine theme colours come from the token module, not literals', () => {
    // Mantine is the theme authority, so its palette must be the token palette.
    expect(theme.colors?.primary?.[5]).toBe(coreColors.primary);
    expect(theme.colors?.background?.[0]).toBe(coreColors.background);
    expect(theme.colors?.terminalBorder?.[0]).toBe(coreColors.border);
    expect(theme.white).toBe(coreColors.text);
  });

  it('takes its radius scale from the token module', () => {
    expect(theme.defaultRadius).toBe('md');
    expect(theme.radius?.md).toBe('8px');
  });
});

describe('reference stylesheets', () => {
  const styleFile = (name: string) =>
    readFileSync(resolve(import.meta.dirname, '../../src/styles', name), 'utf8');

  const referenceLayers = [
    'reference/core.css',
    'reference/sections.css',
    'reference/case-study.css',
    'reference/terminal-runtime.css',
    'reference/status.css',
  ];

  it('never hard-codes a hex colour outside the token module', () => {
    // Any colour literal here would be a second source of truth. The scan-line
    // overlay's `#fff` gradient stop is the one documented exception.
    for (const layer of [...referenceLayers, 'enhancements.css', 'header.css', 'app-state.css']) {
      const css = styleFile(layer);
      const literals = (css.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []).filter(
        (literal) => literal.toLowerCase() !== '#fff',
      );
      expect(literals, `${layer} should not contain colour literals`).toEqual([]);
    }
  });

  it('imports the reference layers in their original cascade order', () => {
    const globals = styleFile('globals.css');
    const positions = referenceLayers.map((layer) => globals.indexOf(`./${layer}`));

    expect(positions.every((position) => position > -1)).toBe(true);
    // The reference re-declares `.foot`, `.terminal-body`, `.bar` and `.fill`
    // across blocks; reordering the layers would change which rule wins.
    expect([...positions]).toEqual([...positions].sort((a, b) => a - b));
  });

  it('loads tokens before any layer that consumes them', () => {
    const globals = styleFile('globals.css');
    expect(globals.indexOf('./tokens.css')).toBeLessThan(globals.indexOf('./reference/core.css'));
  });
});
