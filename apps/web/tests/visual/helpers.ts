import type { Page } from '@playwright/test';

/** Waits until the portfolio payload has rendered and webfonts have settled. */
export const gotoPortfolio = async (page: Page, path = '/'): Promise<void> => {
  await page.goto(path, { waitUntil: 'load' });
  await page.waitForSelector('main.shell', { timeout: 20_000 });
  await page.waitForSelector('.workspace .tree li.indent.active', { timeout: 20_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
};

/** Opens `case-study.md` and waits for the compiled document. */
export const openCaseStudy = async (page: Page): Promise<void> => {
  await page.click('button.run');
  await page.waitForSelector('button.cs-close', { timeout: 20_000 });
  await page.waitForTimeout(400);
};
