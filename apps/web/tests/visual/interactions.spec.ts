import { expect, test } from '@playwright/test';
import { COMPILE_DURATION_MS } from '../../src/features/case-studies/caseStudiesSlice';
import { gotoPortfolio, openCaseStudy } from './helpers';

/** Every behaviour the conversion brief requires preserved. */
test.describe('engineering runtime', () => {
  test('renders the four operating-model stages with arrows between them', async ({ page }) => {
    await gotoPortfolio(page);

    await expect(page.locator('.runtime-flow article')).toHaveCount(4);
    await expect(page.locator('.runtime-flow article h3')).toHaveText([
      'UNDERSTAND',
      'ARCHITECT',
      'SHIP',
      'MEASURE',
    ]);
    // Three separators for four stages.
    await expect(page.locator('.runtime-flow > i')).toHaveCount(3);
    await expect(page.locator('.runtime-command')).toContainText('portfolio execute');
    await expect(page.locator('.runtime-log')).toContainText('measurable performance');
  });

  test('the IDE workspace is gone', async ({ page }) => {
    await gotoPortfolio(page);
    for (const selector of ['.workspace', '.sidebar', '.tabs', '.output', '.resultbox']) {
      await expect(page.locator(selector)).toHaveCount(0);
    }
  });
});

test.describe('project cards', () => {
  test('list every project with its type, command and technologies', async ({ page }) => {
    await gotoPortfolio(page);
    const cards = page.locator('.cases.three .case');

    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0)).toContainText('PACKAGE / KNOWLEDGE SYSTEM');
    await expect(cards.nth(0).locator('.command')).toContainText('portfolio open cachiva');
    await expect(cards.nth(0).locator('footer')).toContainText('React · Node · Prisma');
  });

  test('live demo, API doc and source links are functional', async ({ page }) => {
    await gotoPortfolio(page);
    const cards = page.locator('.cases.three .case');

    await expect(cards.nth(0).locator('.project-actions a').first()).toHaveAttribute(
      'href',
      'https://cachiva.vercel.app/',
    );
    await expect(cards.nth(0).locator('.project-actions a').nth(1)).toHaveAttribute(
      'href',
      'https://cachiva-backend.vercel.app/',
    );
    await expect(cards.nth(1).locator('.project-actions a').nth(1)).toHaveAttribute(
      'href',
      'https://github.com/vcdas123/learn-mf',
    );

    for (const link of await page.locator('.project-actions a').all()) {
      await expect(link).toHaveAttribute('href', /^https:\/\//);
    }
  });

  test('each card offers a case-study trigger', async ({ page }) => {
    await gotoPortfolio(page);
    await expect(page.locator('.project-actions button')).toHaveCount(3);
  });
});

test.describe('case study dialog', () => {
  test('opens as a modal without scrolling the page', async ({ page }) => {
    await gotoPortfolio(page);
    await page.locator('.project-actions button').first().scrollIntoViewIfNeeded();
    const before = await page.evaluate(() => window.scrollY);

    await page.locator('.project-actions button').first().click();

    // A native modal dialog traps focus and makes the rest of the page inert.
    await expect(page.locator('.case-dialog')).toBeVisible();
    expect(
      await page.evaluate(() => document.querySelector('.case-dialog')?.matches(':modal')),
    ).toBe(true);
    expect(await page.evaluate(() => window.scrollY)).toBe(before);
  });

  test('shows the compile state before the document', async ({ page }) => {
    await gotoPortfolio(page);
    await page.locator('.project-actions button').first().click();

    await expect(page.locator('.cs-loader')).toBeVisible();
    await expect(page.locator('.md-doc')).toBeVisible({ timeout: 15_000 });
  });

  test('renders the study as a numbered Markdown source view', async ({ page }) => {
    await gotoPortfolio(page);
    await openCaseStudy(page);

    await expect(page.locator('.md-line-h1')).toHaveCount(1);
    await expect(page.locator('.md-line-h2')).toHaveCount(7);
    await expect(page.locator('.md-line-bullet').first()).toBeVisible();
    await expect(page.locator('.md-line-flow .flow-node')).toHaveCount(5);
    await expect(page.locator('.md-gutter').first()).toHaveText('1');
  });

  test('closing during compilation cancels the pending transition', async ({ page }) => {
    await gotoPortfolio(page);
    await page.locator('.project-actions button').first().click();
    await expect(page.locator('.cs-loader')).toBeVisible();

    // Close inside the compile window, then wait past it: the document must never
    // appear, i.e. the pending timer was cancelled rather than deferred.
    await page.locator('.case-dialog-close').click();
    await page.waitForTimeout(COMPILE_DURATION_MS + 500);

    await expect(page.locator('.md-doc')).toHaveCount(0);
    expect(
      await page.evaluate(
        () => document.querySelector<HTMLDialogElement>('.case-dialog')?.open ?? false,
      ),
    ).toBe(false);
  });

  test('Escape closes the dialog', async ({ page }) => {
    await gotoPortfolio(page);
    await openCaseStudy(page);

    await page.keyboard.press('Escape');
    await expect(page.locator('.case-dialog')).toBeHidden();
  });

  test('the close button dismisses it', async ({ page }) => {
    await gotoPortfolio(page);
    await openCaseStudy(page);

    await page.locator('.case-dialog-close').click();
    await expect(page.locator('.case-dialog')).toBeHidden();
  });

  test('a project route deep-links straight to its case study', async ({ page }) => {
    await gotoPortfolio(page, '/projects/myhistory');

    await expect(page.locator('.case-dialog')).toBeVisible();
    await expect(page.locator('.md-doc')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('.md-line-h1')).toContainText('MyHistory');
  });
});

test.describe('scroll behaviour', () => {
  test('a fresh load starts at the top and does not focus the contact form', async ({ page }) => {
    await gotoPortfolio(page);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    expect(await page.evaluate(() => document.activeElement?.id)).not.toBe('contactInput');
  });

  test('reloading a project route does not jump to the contact section', async ({ page }) => {
    await gotoPortfolio(page, '/projects/myhistory');
    await page.reload({ waitUntil: 'load' });
    await page.waitForSelector('main.shell');
    await page.waitForTimeout(500);

    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    expect(await page.evaluate(() => document.activeElement?.id)).not.toBe('contactInput');
  });

  test('scroll position is not restored across navigation', async ({ page }) => {
    await gotoPortfolio(page);
    expect(await page.evaluate(() => history.scrollRestoration)).toBe('manual');

    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.reload({ waitUntil: 'load' });
    await page.waitForSelector('main.shell');
    await page.waitForTimeout(500);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });
});

test.describe('contact questionnaire', () => {
  test('asks for name, purpose and message one at a time, then submits', async ({ page }) => {
    await gotoPortfolio(page);

    const prompt = page.locator('.ct-prompt label');
    const input = page.locator('#contactInput');
    const restart = page.locator('.ct-restart');

    await expect(prompt).toHaveText('name ❯');
    await expect(restart).not.toHaveClass(/is-visible/);

    await input.fill('Playwright Tester');
    await page.click('.ct-submit');

    await expect(prompt).toHaveText('purpose ❯');
    await expect(restart).toHaveClass(/is-visible/);
    await expect(page.locator('.ct-log')).toContainText('name: Playwright Tester');

    await input.fill('Hiring');
    await page.click('.ct-submit');
    await expect(prompt).toHaveText('message ❯');

    await input.fill('Submitted from the interaction suite.');
    await page.click('.ct-submit');

    await expect(page.locator('.ct-log')).toContainText('payload compiled and submitted', {
      timeout: 15_000,
    });
    await expect(page.locator('.ct-form')).toHaveClass(/is-hidden/);
  });

  test('empty input does not advance the session', async ({ page }) => {
    await gotoPortfolio(page);
    await page.locator('#contactInput').fill('   ');
    await page.click('.ct-submit');
    await expect(page.locator('.ct-prompt label')).toHaveText('name ❯');
  });

  test('restart clears the session without reloading', async ({ page }) => {
    await gotoPortfolio(page);
    await page.evaluate(() => {
      (window as unknown as { __stayed: boolean }).__stayed = true;
    });

    await page.locator('#contactInput').fill('Someone');
    await page.click('.ct-submit');
    await expect(page.locator('.ct-log')).toContainText('name: Someone');

    await page.click('.ct-restart');

    await expect(page.locator('.ct-prompt label')).toHaveText('name ❯');
    await expect(page.locator('.ct-log')).not.toContainText('name: Someone');
    await expect(page.locator('.ct-restart')).not.toHaveClass(/is-visible/);
    expect(await page.evaluate(() => (window as unknown as { __stayed?: boolean }).__stayed)).toBe(
      true,
    );
  });

  test('reports a failure in the terminal log when the API rejects the payload', async ({
    page,
  }) => {
    await page.route('**/api/contact', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          ok: false,
          error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' },
        }),
      }),
    );
    await gotoPortfolio(page);

    for (const value of ['Tester', 'Hiring', 'Message body']) {
      await page.locator('#contactInput').fill(value);
      await page.click('.ct-submit');
    }

    await expect(page.locator('.ct-log')).toContainText('Something went wrong');
    await expect(page.locator('.ct-log')).toContainText('RESTART SESSION');
  });
});

test.describe('recoverable load failure', () => {
  test('shows a terminal error with a retry that recovers', async ({ page }) => {
    let attempts = 0;
    await page.route('**/api/portfolio', async (route) => {
      attempts += 1;
      if (attempts === 1) {
        await route.fulfill({
          status: 503,
          contentType: 'application/json',
          body: JSON.stringify({
            ok: false,
            error: { code: 'INTERNAL_ERROR', message: 'Portfolio content is unavailable' },
          }),
        });
        return;
      }
      await route.fallback();
    });

    await page.goto('/', { waitUntil: 'load' });
    await expect(page.locator('.boot-console[role="alert"]')).toBeVisible();
    await expect(page.locator('.boot-console')).toContainText('Portfolio content is unavailable');

    await page.click('.boot-retry');
    await expect(page.locator('main.shell')).toBeVisible({ timeout: 20_000 });
  });
});
