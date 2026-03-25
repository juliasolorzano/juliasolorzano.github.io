import { test, expect } from '@playwright/test';

test.describe('Accessibility - English homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('skip link exists and targets #content', async ({ page }) => {
    const skip = page.locator('a.skipnav');
    await expect(skip).toHaveAttribute('href', '#content');
    await expect(skip).toHaveText('Skip to main content');
  });

  test('html lang is set to en', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('en');
  });

  test('main landmark exists', async ({ page }) => {
    await expect(page.locator('main#content')).toBeVisible();
  });

  test('navigation has aria-label', async ({ page }) => {
    await expect(page.locator('nav[aria-label="Main Navigation"]')).toBeVisible();
  });

  test('theme toggle has aria-label and aria-pressed', async ({ page }) => {
    const toggle = page.locator('.sidebar button.theme-toggle');
    await expect(toggle).toHaveAttribute('aria-label', 'Toggle dark mode');
    const pressed = await toggle.getAttribute('aria-pressed');
    expect(['true', 'false']).toContain(pressed);
  });

  test('external links have rel="noopener"', async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel');
      expect(rel).toContain('noopener');
    }
  });
});

test.describe('Accessibility - Spanish homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/es/');
  });

  test('html lang is set to es', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('es');
  });

  test('skip link text is in Spanish', async ({ page }) => {
    const skip = page.locator('a.skipnav');
    await expect(skip).toHaveText('Ir al contenido principal');
  });

  test('nav links are in Spanish', async ({ page }) => {
    const navItems = page.locator('nav.sidebar__nav ul li a');
    const texts = await navItems.allTextContents();
    expect(texts).toEqual(['Acerca de mí', 'Trabajo', 'Escritos', 'Currículum', 'Ahora']);
  });

  test('hreflang tags are present', async ({ page }) => {
    await expect(page.locator('head link[hreflang="en"]')).toHaveCount(1);
    await expect(page.locator('head link[hreflang="es"]')).toHaveCount(1);
  });
});

test.describe('Component rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('sidebar has 5 nav links with correct text', async ({ page }) => {
    const navItems = page.locator('nav.sidebar__nav ul li a');
    await expect(navItems).toHaveCount(5);
    const texts = await navItems.allTextContents();
    expect(texts).toEqual(['About Me', 'Work', 'Writing', 'Resume', 'Now']);
  });

  test('footer renders', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });

  test('language switcher renders on English page', async ({ page }) => {
    const switcher = page.locator('a.lang-switch');
    await expect(switcher.first()).toHaveText('ES');
  });

  test('mobile menu button has correct ARIA attributes', async ({ page }) => {
    const menuBtn = page.locator('button.menu-btn');
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(menuBtn).toHaveAttribute('aria-controls', 'sidebar');
  });
});

test.describe('TTS player on blog post', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/2026/03/10/part-1-changing-the-frameworks/');
  });

  test('TTS player region exists with correct role and aria-label', async ({ page }) => {
    const player = page.locator('.tts-player');
    await expect(player).toHaveAttribute('role', 'region');
    await expect(player).toHaveAttribute('aria-label');
  });

  test('play button exists with aria-label', async ({ page }) => {
    const playBtn = page.locator('.tts-player__play');
    await expect(playBtn).toHaveAttribute('aria-label');
  });

  test('progress bar has correct ARIA attributes', async ({ page }) => {
    const progressBar = page.locator('.tts-player__progress-bar');
    await expect(progressBar).toHaveAttribute('role', 'progressbar');
    await expect(progressBar).toHaveAttribute('aria-valuenow');
    await expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    await expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  test('screen reader status region exists', async ({ page }) => {
    const srStatus = page.locator('.tts-player__sr-status.sr-only');
    await expect(srStatus).toHaveAttribute('aria-live', 'polite');
  });
});

test.describe('Dark mode CSS variables', () => {
  test('CSS variables change when data-theme is toggled', async ({ page }) => {
    await page.goto('/');

    // Light theme values
    const lightBg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
    );
    expect(lightBg).toBe('#f0ede2');

    // Switch to dark theme
    await page.evaluate(() =>
      document.documentElement.setAttribute('data-theme', 'dark')
    );

    const darkBg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
    );
    expect(darkBg).toBe('#1c1b1a');

    const darkText = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim()
    );
    expect(darkText).toBe('#e8e4dc');
  });
});
