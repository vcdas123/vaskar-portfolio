import { expect, test } from '@playwright/test';
import { VIEWPORTS, WEB_BASE_URL } from '../../playwright.config';
import { PROBES, measure, openAt, referencePageUrl } from './measure';

/**
 * Layout parity with the supplied reference HTML at all five required viewports.
 *
 * Both pages are loaded side by side and their computed layout is compared probe
 * by probe (see `measure.ts`): grid tracks, flex direction, clamped type sizes,
 * paddings, and the elements each breakpoint hides.
 *
 * Colour, border and control-metric changes were requested deliberately and do not
 * affect these values — `enhancements.spec.ts` covers those. What this suite
 * guarantees is that the responsive *structure* of the conversion still matches the
 * reference exactly, at every breakpoint.
 */
for (const viewport of VIEWPORTS) {
  test(`layout matches the reference at ${viewport.name} (${viewport.width}×${viewport.height})`, async ({
    browser,
  }) => {
    const referencePage = await openAt(browser, referencePageUrl(), viewport);
    const appPage = await openAt(browser, WEB_BASE_URL, {
      ...viewport,
      readySelector: '.workspace .tree li.indent.active',
    });

    try {
      const referenceLayout = await measure(referencePage);
      const appLayout = await measure(appPage);

      // Guard against a probe silently measuring nothing on either side.
      const missing = Object.keys(PROBES).filter(
        (name) => referenceLayout[name] === 'MISSING' || appLayout[name] === 'MISSING',
      );
      expect(missing, 'every probe must resolve on both pages').toEqual([]);

      expect(appLayout).toEqual(referenceLayout);
    } finally {
      await referencePage.close();
      await appPage.close();
    }
  });
}
