// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Feature Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto('http://localhost:5179/');
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('Portfolio slider with custom arrow SVGs', async ({ page }) => {
    // Scroll to the portfolio section
    await page.evaluate(() => {
      document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
    });

    // Wait for the portfolio section to be visible
    await page.waitForSelector('#portfolio', { state: 'visible' });

    // Take a screenshot of the portfolio section
    await page.screenshot({ path: 'test-results/portfolio-section-with-arrows.png', fullPage: false });
  });

  test('Portfolio images', async ({ page }) => {
    // Scroll to the portfolio section
    await page.evaluate(() => {
      document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
    });

    // Wait for the portfolio section to be visible
    await page.waitForSelector('#portfolio', { state: 'visible' });

    // Take a screenshot of the portfolio section
    await page.screenshot({ path: 'test-results/portfolio-images.png', fullPage: false });
  });

  test('Scrolling between sections', async ({ page }) => {
    // Scroll to the top of the page
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });

    // Wait for the scroll to complete
    await page.waitForTimeout(500);

    // Take a screenshot at the top of the page
    await page.screenshot({ path: 'test-results/top-of-page.png', fullPage: false });

    // Scroll to the contact section
    await page.evaluate(() => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    // Wait for the scroll to complete
    await page.waitForTimeout(1000);

    // Take a screenshot at the contact section
    await page.screenshot({ path: 'test-results/contact-section-scrolled.png', fullPage: false });
  });

  test('Page transitions', async ({ page }) => {
    // Take a screenshot of the home page
    await page.screenshot({ path: 'test-results/home-page.png', fullPage: false });
  });

  test('Client logo filters positioning', async ({ page }) => {
    // Scroll to the portfolio section
    await page.evaluate(() => {
      document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
    });

    // Wait for the portfolio section to be visible
    await page.waitForSelector('#portfolio', { state: 'visible' });

    // Check if the client logo filters are present
    const clientLogoFilters = page.locator('.client-logos-container');

    await expect(clientLogoFilters).toBeVisible();

    // Check if the client logo filters have the correct position
    const position = await clientLogoFilters.evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        position: style.position,
        zIndex: style.zIndex
      };
    });

    expect(position.position).toBe('absolute');
    expect(parseInt(position.zIndex)).toBeGreaterThan(0);
  });

  test('Contact form alignment', async ({ page }) => {
    // Scroll to the contact section
    await page.evaluate(() => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    // Wait for the contact section to be visible
    await page.waitForSelector('#contact', { state: 'visible' });

    // Check if the contact heading is aligned to the left
    const contactHeading = page.locator('.contact-heading');
    const headingAlignment = await contactHeading.evaluate(el => {
      return window.getComputedStyle(el).textAlign;
    });

    expect(headingAlignment).toBe('left');

    // Check if the input fields are aligned to the left
    const inputField = page.locator('.form-group input').first();
    const inputAlignment = await inputField.evaluate(el => {
      return window.getComputedStyle(el).textAlign;
    });

    expect(inputAlignment).toBe('left');
  });
});
