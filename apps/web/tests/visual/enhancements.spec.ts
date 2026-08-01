import { expect, test } from '@playwright/test';
import { VIEWPORTS } from '../../playwright.config';
import { gotoPortfolio } from './helpers';

/**
 * Covers the responsive rules the brief calls out explicitly, plus the deliberate
 * enhancements that depart from the reference. `layout-parity.spec.ts` verifies
 * everything that must still match the reference; this suite pins down what was
 * changed on purpose, so a regression there fails loudly instead of silently
 * reverting to the reference behaviour.
 */

test.describe('status indicator', () => {
  test('at 600px the SYSTEM ONLINE label collapses but the dot remains', async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 800 });
    await gotoPortfolio(page);

    const live = page.locator('.live');
    // The text stays in the DOM for screen readers; only its rendered size is 0.
    await expect(live).toHaveText('SYSTEM ONLINE');
    expect(await live.evaluate((el) => getComputedStyle(el).fontSize)).toBe('0px');

    const dot = await live.evaluate((el) => {
      const styles = getComputedStyle(el, '::before');
      return { width: styles.width, height: styles.height, background: styles.backgroundColor };
    });
    expect(dot.width).toBe('7px');
    expect(dot.height).toBe('7px');
    expect(dot.background).toBe('rgb(183, 255, 85)');
  });

  test('above 600px the label is visible', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 800 });
    await gotoPortfolio(page);
    expect(await page.locator('.live').evaluate((el) => getComputedStyle(el).fontSize)).not.toBe(
      '0px',
    );
  });
});

test.describe('footer alignment', () => {
  test('desktop items align left, centre and right', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await gotoPortfolio(page);

    const alignments = await page
      .locator('.foot span')
      .evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).textAlign));
    expect(alignments).toEqual(['left', 'center', 'right']);

    const foot = await page.locator('.foot').evaluate((el) => getComputedStyle(el).flexDirection);
    expect(foot).toBe('row');
  });

  test('small screens centre the footer items', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoPortfolio(page);

    const alignments = await page
      .locator('.foot span')
      .evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).textAlign));
    expect(alignments).toEqual(['center', 'center', 'center']);
    expect(await page.locator('.foot').evaluate((el) => getComputedStyle(el).flexDirection)).toBe(
      'column',
    );
  });
});

test.describe('sticky blurred header', () => {
  test('stays pinned with a translucent blurred background', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await gotoPortfolio(page);

    const header = page.locator('header.top');
    const styles = await header.evaluate((el) => {
      const computed = getComputedStyle(el);
      return {
        position: computed.position,
        top: computed.top,
        backdropFilter:
          computed.backdropFilter || computed.getPropertyValue('-webkit-backdrop-filter'),
        background: computed.backgroundColor,
      };
    });

    expect(styles.position).toBe('sticky');
    expect(styles.top).toBe('0px');
    expect(styles.backdropFilter).toContain('blur');
    // Translucent, so page content shows through.
    expect(styles.background).toMatch(/0\.7|\/\s*0\.7/);

    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(300);
    const box = await header.boundingBox();
    expect(box?.y).toBeCloseTo(0, 0);
  });

  test('the brand is a home link set as a wordmark', async ({ page }) => {
    await gotoPortfolio(page);

    const brand = page.locator('a.brand');
    await expect(brand).toHaveAttribute('href', '/');
    await expect(page.locator('.prompt-logo')).toHaveText('~/VD❯');
    await expect(page.locator('.brand-name')).toHaveText('VASKAR');

    // Notably larger than the reference's 10px header type.
    const size = await page
      .locator('.brand-name')
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(size).toBeGreaterThanOrEqual(14);
  });
});

test.describe('deliberate design changes', () => {
  test('borders use the dimmed token', async ({ page }) => {
    await gotoPortfolio(page);
    const border = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--portfolio-border').trim(),
    );
    expect(border).toBe('#1a1e1c');
  });

  test('every control shares one button metric', async ({ page }) => {
    await gotoPortfolio(page);
    const metrics = await page.evaluate(() => {
      const read = (selector: string) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const s = getComputedStyle(el);
        return `${s.fontSize}/${s.fontWeight}`;
      };
      return {
        submit: read('.ct-submit'),
        restart: read('.ct-restart'),
        projectAction: read('.project-actions a'),
        caseStudy: read('.project-actions button'),
      };
    });
    const values = Object.values(metrics);
    expect(values.every((value) => value === '10px/500')).toBe(true);
  });

  test('text selection uses the terminal accent', async ({ page }) => {
    await gotoPortfolio(page);
    // ::selection is not reachable via getComputedStyle; assert the rule is loaded.
    const declared = await page.evaluate(() =>
      Array.from(document.styleSheets)
        .flatMap((sheet) => {
          try {
            return Array.from(sheet.cssRules);
          } catch {
            return [];
          }
        })
        .some((rule) => rule.cssText.includes('::selection') && rule.cssText.includes('primary')),
    );
    expect(declared).toBe(true);
  });

  test('the contact terminal no longer shows the DEMO MODE note', async ({ page }) => {
    await gotoPortfolio(page);
    await expect(page.locator('.ct-note')).toHaveCount(0);
    await expect(page.locator('.contact-terminal')).not.toContainText('DEMO MODE');
  });
});

test.describe('reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } });

  test('non-essential animations are disabled', async ({ page }) => {
    await gotoPortfolio(page);

    const animations = await page.evaluate(() => {
      const name = (selector: string, pseudo?: string) => {
        const el = document.querySelector(selector);
        if (!el) return 'MISSING';
        return getComputedStyle(el, pseudo).animationName;
      };
      return {
        statusDot: name('.live', '::before'),
        caret: name('.cmd .blink'),
        barFill: name('.fill'),
        scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      };
    });

    expect(animations.statusDot).toBe('none');
    expect(animations.caret).toBe('none');
    expect(animations.barFill).toBe('none');
    expect(animations.scrollBehavior).toBe('auto');
  });

  test('entrance animations render settled content on first paint', async ({ page }) => {
    await gotoPortfolio(page);
    // With reduced motion the entrance hooks return no props at all, so nothing
    // is mid-transition: every block is already at full opacity.
    const opacities = await page
      .locator('.hero-copy, .statusbox, .stat, .case')
      .evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).opacity));
    expect(opacities.every((value) => value === '1')).toBe(true);
  });
});

test.describe('responsive workspace', () => {
  for (const viewport of VIEWPORTS) {
    test(`no horizontal overflow at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await gotoPortfolio(page);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});
