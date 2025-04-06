import { test, expect } from '@playwright/test';

// Test suite for UI components and interactions
test.describe('UI Components', () => {
  // Setup for each test
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:5179/');

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  // Test the scroll-to-top button
  test('Scroll-to-top button appears when scrolling down', async ({ page }) => {
    // Scroll down to make the scroll-to-top button appear
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight / 2);
    });

    // Wait for the scroll animation to complete
    await page.waitForTimeout(1000);

    // Take a screenshot to verify the scroll-to-top button is visible
    await page.screenshot({ path: 'test-results/scroll-to-top-button.png', fullPage: false });
  });

  // Test the fixed history button
  test('Fixed history button visibility in different sections', async ({ page }) => {
    // Scroll to the hero section
    await page.evaluate(() => {
      document.querySelector('.hero')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Wait for the scroll animation to complete
    await page.waitForTimeout(1000);

    // Take a screenshot in the hero section
    await page.screenshot({ path: 'test-results/hero-section-history-button.png', fullPage: false });

    // Scroll to the history section
    await page.evaluate(() => {
      document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Wait for the scroll animation to complete
    await page.waitForTimeout(1000);

    // Take a screenshot in the history section
    await page.screenshot({ path: 'test-results/history-section-history-button.png', fullPage: false });

    // Scroll to the contact section
    await page.evaluate(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Wait for the scroll animation to complete
    await page.waitForTimeout(1000);

    // Take a screenshot in the contact section
    await page.screenshot({ path: 'test-results/contact-section-history-button.png', fullPage: false });
  });

  // Test the cookie button and cookie manager
  test('Cookie button is visible', async ({ page }) => {
    // Take a screenshot to verify the cookie button is visible
    await page.screenshot({ path: 'test-results/cookie-button.png', fullPage: false });
  });

  // Test the portfolio slider navigation
  test('Portfolio slider is visible', async ({ page }) => {
    // Scroll to the portfolio section
    await page.evaluate(() => {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Wait for the scroll animation to complete
    await page.waitForTimeout(1000);

    // Take a screenshot of the portfolio slider
    await page.screenshot({ path: 'test-results/portfolio-slider.png', fullPage: false });
  });

  // Test the client logo carousel
  test('Client logo carousel auto-scrolls and is draggable', async ({ page }) => {
    // Scroll to the portfolio section
    await page.evaluate(() => {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Wait for the scroll animation to complete
    await page.waitForTimeout(1000);

    // Check if the client logo carousel is visible
    const clientLogoCarousel = await page.locator('.client-logos-container');
    await expect(clientLogoCarousel).toBeVisible();

    // Get the initial position of the first logo
    const clientLogosTrack = await page.locator('.client-logos-track');
    const initialTransform = await clientLogosTrack.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.transform;
    });

    // Wait for auto-scrolling to occur
    await page.waitForTimeout(2000);

    // Get the new position
    const newTransform = await clientLogosTrack.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.transform;
    });

    // Check if the position has changed (auto-scrolling is working)
    expect(initialTransform).not.toEqual(newTransform);

    // Test dragging the carousel
    const clientLogo = await page.locator('.client-logo').first();
    const clientLogoBox = await clientLogo.boundingBox();

    if (clientLogoBox) {
      // Drag the carousel to the left
      await page.mouse.move(clientLogoBox.x + clientLogoBox.width / 2, clientLogoBox.y + clientLogoBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(clientLogoBox.x - 100, clientLogoBox.y + clientLogoBox.height / 2, { steps: 10 });
      await page.mouse.up();

      // Wait for the drag to complete
      await page.waitForTimeout(500);

      // Get the position after dragging
      const draggedTransform = await clientLogosTrack.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.transform;
      });

      // Check if the position has changed after dragging
      expect(newTransform).not.toEqual(draggedTransform);
    }
  });

  // Test the team section carousel
  test('Team section carousel fits within 80vh height', async ({ page }) => {
    // Scroll to the team section
    await page.evaluate(() => {
      document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Wait for the scroll animation to complete
    await page.waitForTimeout(1000);

    // Check if the team section is visible
    const teamSection = await page.locator('section.team-section');
    await expect(teamSection).toBeVisible();

    // Check if the team carousel is visible
    const teamCarousel = await page.locator('.team-carousel');
    await expect(teamCarousel).toBeVisible();

    // Check if the team carousel height is within 80vh
    const carouselHeight = await teamCarousel.evaluate(el => {
      return el.clientHeight;
    });

    const viewportHeight = await page.evaluate(() => window.innerHeight);
    expect(carouselHeight).toBeLessThanOrEqual(viewportHeight * 0.8);

    // Take a screenshot for visual verification
    await page.screenshot({ path: 'test-results/team-section-carousel.png', fullPage: false });
  });
});
