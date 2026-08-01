import { expect, test } from '@playwright/test';
import { COMPILE_DURATION_MS } from '../../src/features/case-studies/caseStudiesSlice';
import { gotoPortfolio, openCaseStudy } from './helpers';

/** Every behaviour the conversion brief requires preserved. */
test.describe('project explorer', () => {
  test('contains only the three project files', async ({ page }) => {
    await gotoPortfolio(page);
    const files = page.locator('.tree li.indent');
    await expect(files).toHaveCount(3);
    await expect(files).toHaveText([/cachiva\.ts/, /discovery-hub\.ts/, /myhistory\.ts/]);
  });

  test('selecting a project updates tab, description, architecture, log, metric and outcome', async ({
    page,
  }) => {
    await gotoPortfolio(page);
    await expect(page.locator('.code-title')).toContainText('Cachiva');

    await page.click('.tree li.indent:nth-child(4) .tree-button');

    await expect(page.locator('.code-title')).toContainText('MyHistory');
    await expect(page.locator('.tab.active')).toHaveText(/myhistory\.ts/);
    await expect(page.locator('.desc')).toContainText('local-first private records archive');
    await expect(page.locator('.script')).toContainText('React + Mantine');
    await expect(page.locator('.log')).toContainText('file catalog indexed');
    await expect(page.locator('.resultbox b')).toHaveText('3');
    await expect(page.locator('.resultbox span')).toHaveText('CONNECTED RECORD VIEWS');
    await expect(page.locator('.tree li.indent.active')).toHaveText(/myhistory\.ts/);
  });

  test('project selection is keyboard operable', async ({ page }) => {
    await gotoPortfolio(page);
    const target = page.locator('.tree li.indent:nth-child(3) .tree-button');
    await target.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.code-title')).toContainText('Discovery Hub');
  });
});

test.describe('case study', () => {
  test('opens case-study.md in the workspace without scrolling the page', async ({ page }) => {
    await gotoPortfolio(page);
    // Bring the button into view first, then confirm the click itself does not move us.
    await page.locator('button.run').scrollIntoViewIfNeeded();
    const before = await page.evaluate(() => window.scrollY);

    await page.click('button.run');
    await expect(page.locator('.case-file.open')).toBeVisible();
    await expect(page.locator('.tabs .case-tab')).toHaveText(/case-study\.md/);
    await expect(page.locator('.output')).toHaveClass(/hidden/);

    await expect(page.locator('button.cs-close')).toBeVisible();
    expect(await page.evaluate(() => window.scrollY)).toBe(before);
  });

  test('shows the compile state before the document', async ({ page }) => {
    await gotoPortfolio(page);
    await page.click('button.run');
    await expect(page.locator('.cs-loader')).toBeVisible();
    await expect(page.locator('button.run')).toHaveText(/COMPILING CASE STUDY/);
    await expect(page.locator('.md-doc')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('button.run')).toHaveText(/CASE STUDY OPEN/);
  });

  test('closing during compilation cancels the pending transition', async ({ page }) => {
    await gotoPortfolio(page);
    await page.click('button.run');
    await expect(page.locator('.cs-loader')).toBeVisible();

    // Close well inside the compile window, then wait past it: the document must
    // never appear, i.e. the pending timer was cancelled rather than deferred.
    await page.click('.tabs .case-tab');
    await page.waitForTimeout(COMPILE_DURATION_MS + 500);

    await expect(page.locator('.case-file')).toHaveCount(0);
    await expect(page.locator('.md-doc')).toHaveCount(0);
    await expect(page.locator('.output')).not.toHaveClass(/hidden/);
    await expect(page.locator('button.run')).toHaveText(/RUN CASE STUDY/);
  });

  test('selecting another project dismisses an open case study', async ({ page }) => {
    await gotoPortfolio(page);
    await openCaseStudy(page);
    await page.click('.tree li.indent:nth-child(3) .tree-button');

    await expect(page.locator('.case-file')).toHaveCount(0);
    await expect(page.locator('.tabs .case-tab')).toHaveCount(0);
    await expect(page.locator('.code-title')).toContainText('Discovery Hub');
  });

  test('renders the study as a numbered Markdown source view', async ({ page }) => {
    await gotoPortfolio(page);
    await openCaseStudy(page);

    await expect(page.locator('.md-line-h1')).toHaveCount(1);
    await expect(page.locator('.md-line-h2')).toHaveCount(7);
    await expect(page.locator('.md-line-bullet').first()).toBeVisible();
    await expect(page.locator('.md-line-flow .flow-node')).toHaveCount(5);
    // The gutter numbers the source lines from 1.
    await expect(page.locator('.md-gutter').first()).toHaveText('1');
  });
});

test.describe('project links', () => {
  test('live demo, API docs and source links are functional', async ({ page }) => {
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
});

test.describe('scroll behaviour', () => {
  test('a fresh load starts at the top and does not focus the contact form', async ({ page }) => {
    await gotoPortfolio(page);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    expect(await page.evaluate(() => document.activeElement?.id)).not.toBe('contactInput');
  });

  test('reloading a project route does not jump to the contact section', async ({ page }) => {
    await gotoPortfolio(page, '/projects/myhistory');
    await expect(page.locator('.code-title')).toContainText('MyHistory');

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
    // Restart is offered only after the first answer.
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
    // No reload happened, so the sentinel survives.
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
