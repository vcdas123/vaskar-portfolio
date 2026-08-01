import type { Browser, Page } from '@playwright/test';

/**
 * Layout probes compared between the reference page and the React app.
 *
 * These capture the things the responsive design is actually made of — grid
 * tracks, flex direction, clamped type sizes, and the elements each breakpoint
 * hides — rather than pixels. That keeps the comparison meaningful after the
 * deliberate colour, border and control-metric changes, which alter appearance
 * without altering layout.
 */
export const PROBES = {
  shellWidth: { selector: 'main.shell', prop: 'width' },

  heroColumns: { selector: 'section.hero', prop: 'gridTemplateColumns' },
  heroPaddingTop: { selector: 'section.hero', prop: 'paddingTop' },
  heroHeadingSize: { selector: 'section.hero h1', prop: 'fontSize' },
  heroCopySize: { selector: '.hero-copy > p', prop: 'fontSize' },

  terminalBodySize: { selector: '.terminal-body', prop: 'fontSize' },
  barColumns: { selector: '.bar', prop: 'gridTemplateColumns' },
  pathSize: { selector: '.path', prop: 'fontSize' },

  summaryColumns: { selector: 'section.summary', prop: 'gridTemplateColumns' },
  statPadding: { selector: '.stat', prop: 'padding' },
  statValueSize: { selector: '.stat b', prop: 'fontSize' },

  runtimeHeadDisplay: { selector: '.runtime-head', prop: 'display' },
  runtimeHeadColumns: { selector: '.runtime-head', prop: 'gridTemplateColumns' },
  runtimeHeadingSize: { selector: '.runtime-head h2', prop: 'fontSize' },
  runtimeFlowColumns: { selector: '.runtime-flow', prop: 'gridTemplateColumns' },
  runtimeStagePadding: { selector: '.runtime-flow article', prop: 'padding' },
  runtimeArrowDisplay: { selector: '.runtime-flow > i', prop: 'display' },
  runtimeCommandDirection: { selector: '.runtime-command', prop: 'flexDirection' },

  sectionHeadColumns: { selector: '.section-head', prop: 'gridTemplateColumns' },
  sectionHeadDisplay: { selector: '.section-head', prop: 'display' },
  sectionHeadingSize: { selector: 'section#projects h2', prop: 'fontSize' },
  casesColumns: { selector: '.cases.three', prop: 'gridTemplateColumns' },
  caseMinHeight: { selector: '.case', prop: 'minHeight' },
  casePadding: { selector: '.case', prop: 'padding' },

  skillsHeadDisplay: { selector: '.skills-head', prop: 'display' },
  skillsHeadColumns: { selector: '.skills-head', prop: 'gridTemplateColumns' },
  skillGridColumns: { selector: '.skill-grid', prop: 'gridTemplateColumns' },
  skillTopDirection: { selector: '.skill-top', prop: 'flexDirection' },

  historyDisplay: { selector: 'section.history', prop: 'display' },
  historyColumns: { selector: 'section.history', prop: 'gridTemplateColumns' },
  commitColumns: { selector: '.commit', prop: 'gridTemplateColumns' },
  commitTimeDisplay: { selector: '.commit time', prop: 'display' },

  educationDisplay: { selector: 'section.education', prop: 'display' },
  educationColumns: { selector: 'section.education', prop: 'gridTemplateColumns' },
  degreeColumns: { selector: '.degree', prop: 'gridTemplateColumns' },

  contactHeadingSize: { selector: '.contact h2', prop: 'fontSize' },
  contactLinksColumns: { selector: '.contact-links', prop: 'gridTemplateColumns' },
  contactLinkPadding: { selector: '.contact-links a', prop: 'padding' },
  ctBodyPadding: { selector: '.ct-body', prop: 'padding' },
  ctPromptDirection: { selector: '.ct-prompt', prop: 'flexDirection' },

  footDirection: { selector: '.foot', prop: 'flexDirection' },
  footJustify: { selector: '.foot', prop: 'justifyContent' },
  footTextAlign: { selector: '.foot', prop: 'textAlign' },
  footItemWidth: { selector: '.foot span', prop: 'width' },

  /** 600px and below: the label collapses to 0 but the dot must remain. */
  liveFontSize: { selector: '.live', prop: 'fontSize' },
} as const satisfies Record<string, { selector: string; prop: string }>;

export type Measurements = Record<string, string>;

/** Reads every probe from a loaded page in a single round trip. */
export const measure = async (page: Page): Promise<Measurements> =>
  page.evaluate(
    (probes) => {
      const result: Record<string, string> = {};
      for (const [name, probe] of Object.entries(probes)) {
        const element = document.querySelector(probe.selector);
        if (!element) {
          result[name] = 'MISSING';
          continue;
        }
        const styles = window.getComputedStyle(element);
        result[name] =
          styles.getPropertyValue(probe.prop) || String(Reflect.get(styles, probe.prop));
      }
      return result;
    },
    PROBES as unknown as Record<string, { selector: string; prop: string }>,
  );

interface OpenOptions {
  width: number;
  height: number;
  readySelector?: string;
}

/** Opens a URL at a fixed viewport, waits for fonts, and returns the page. */
export const openAt = async (
  browser: Browser,
  url: string,
  { width, height, readySelector }: OpenOptions,
): Promise<Page> => {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
    colorScheme: 'dark',
    reducedMotion: 'reduce',
  });
  await page.goto(url, { waitUntil: 'load' });
  if (readySelector) {
    await page.waitForSelector(readySelector, { timeout: 20_000 });
  }
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  return page;
};

export const referencePageUrl = (): string => {
  const url = process.env.REFERENCE_PAGE_URL;
  if (!url) {
    throw new Error('REFERENCE_PAGE_URL is unset — global setup did not run');
  }
  return url;
};
