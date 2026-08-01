import type { Page } from '@playwright/test';

/** Waits until the portfolio payload has rendered and webfonts have settled. */
export const gotoPortfolio = async (page: Page, path = '/'): Promise<void> => {
  await page.goto(path, { waitUntil: 'load' });
  await page.waitForSelector('main.shell', { timeout: 20_000 });
  // The cards are the last data-driven block to render.
  await page.waitForSelector('.cases.three .case', { timeout: 20_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
};

/** Opens the first project's case study and waits for the compiled document. */
export const openCaseStudy = async (page: Page): Promise<void> => {
  await page.locator('.project-actions button').first().click();
  await page.waitForSelector('.md-doc', { timeout: 20_000 });
  await page.waitForTimeout(400);
};
