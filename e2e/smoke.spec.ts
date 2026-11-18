import { expect, test } from '@playwright/test';

// ── Page load smoke tests ─────────────────────────────────────────────────────

test('homepage loads with author name in title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Albert Einstein/);
  await expect(page.locator('main')).toBeVisible();
});

test('blog listing page loads', async ({ page }) => {
  await page.goto('/blog/');
  await expect(page.locator('main')).toBeVisible();
  await expect(page).toHaveTitle(/blog/i);
});

test('publications page loads', async ({ page }) => {
  await page.goto('/publications/');
  await expect(page.locator('main')).toBeVisible();
  await expect(page).toHaveTitle(/publications/i);
});

test('projects page loads', async ({ page }) => {
  await page.goto('/projects/');
  await expect(page.locator('main')).toBeVisible();
  await expect(page).toHaveTitle(/projects/i);
});

test('cv page loads', async ({ page }) => {
  await page.goto('/cv/');
  await expect(page.locator('main')).toBeVisible();
  await expect(page).toHaveTitle(/cv/i);
});

// ── Dark mode ─────────────────────────────────────────────────────────────────

test('dark mode preference persists after navigation', async ({ page }) => {
  await page.goto('/');

  // Set dark mode via localStorage (simulates user toggling to dark)
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  });

  // Navigate away and back — theme should be restored by the inline script
  await page.goto('/blog/');
  const theme = await page.locator('html').getAttribute('data-theme');
  expect(theme).toBe('dark');
});

test('light mode preference persists after navigation', async ({ page }) => {
  await page.goto('/');

  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
  });

  await page.goto('/publications/');
  const theme = await page.locator('html').getAttribute('data-theme');
  expect(theme).toBe('light');
});

// ── Navigation ────────────────────────────────────────────────────────────────

test('navbar links are present on homepage', async ({ page }) => {
  await page.goto('/');
  const nav = page.locator('nav');
  await expect(nav).toBeVisible();
});

test('404 page returns not-found response', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist/');
  expect(response?.status()).toBe(404);
});
