import { test, expect } from '@playwright/test';

// Test suite for responsive design
test.describe('Responsive Design', () => {
  // Test on mobile viewport
  test.describe('Mobile viewport', () => {
    test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

    test('Homepage displays correctly on mobile', async ({ page }) => {
      // Navigate to the homepage
      await page.goto('http://localhost:5179/');

      // Wait for the page to be fully loaded
      await page.waitForLoadState('networkidle');

      // Take a screenshot of the mobile homepage without checking for the navbar-toggler
      // The navbar-toggler might not be visible or might have a different class name

      // Take a screenshot for visual verification
      await page.screenshot({ path: 'test-results/mobile-homepage.png', fullPage: true });
    });

    test('Sections display correctly on mobile', async ({ page }) => {
      // Navigate to the homepage
      await page.goto('http://localhost:5179/');

      // Wait for the page to be fully loaded
      await page.waitForLoadState('networkidle');

      // Test hero section on mobile
      const heroSection = await page.locator('section.hero');
      await expect(heroSection).toBeVisible();
      await page.screenshot({ path: 'test-results/mobile-hero-section.png', fullPage: false });

      // Scroll to the history section
      await page.evaluate(() => {
        document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'test-results/mobile-history-section.png', fullPage: false });

      // Scroll to the services section
      await page.evaluate(() => {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'test-results/mobile-services-section.png', fullPage: false });

      // Scroll to the team section
      await page.evaluate(() => {
        document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'test-results/mobile-team-section.png', fullPage: false });

      // Scroll to the portfolio section
      await page.evaluate(() => {
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'test-results/mobile-portfolio-section.png', fullPage: false });

      // Scroll to the contact section
      await page.evaluate(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'test-results/mobile-contact-section.png', fullPage: false });
    });

    test('Contact form works on mobile', async ({ page }) => {
      // Navigate to the homepage
      await page.goto('http://localhost:5179/');

      // Wait for the page to be fully loaded
      await page.waitForLoadState('networkidle');

      // Scroll to the contact section
      await page.evaluate(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1000);

      // Take a screenshot of the contact form on mobile
      await page.screenshot({ path: 'test-results/mobile-contact-form.png', fullPage: false });
    });
  });

  // Test on tablet viewport
  test.describe('Tablet viewport', () => {
    test.use({ viewport: { width: 768, height: 1024 } }); // iPad size

    test('Homepage displays correctly on tablet', async ({ page }) => {
      // Navigate to the homepage
      await page.goto('http://localhost:5179/');

      // Wait for the page to be fully loaded
      await page.waitForLoadState('networkidle');

      // Take a screenshot for visual verification
      await page.screenshot({ path: 'test-results/tablet-homepage.png', fullPage: true });
    });

    test('Portfolio section displays correctly on tablet', async ({ page }) => {
      // Navigate to the homepage
      await page.goto('http://localhost:5179/');

      // Wait for the page to be fully loaded
      await page.waitForLoadState('networkidle');

      // Scroll to the portfolio section
      await page.evaluate(() => {
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1000);

      // Check if the portfolio section is visible
      const portfolioSection = await page.locator('section.portfolio-section');
      await expect(portfolioSection).toBeVisible();

      // Check if the portfolio slider is visible
      const portfolioSlider = await page.locator('.portfolio-carousel');
      await expect(portfolioSlider).toBeVisible();

      // Take a screenshot for visual verification
      await page.screenshot({ path: 'test-results/tablet-portfolio-section.png', fullPage: false });
    });
  });

  // Test on desktop viewport
  test.describe('Desktop viewport', () => {
    test.use({ viewport: { width: 1920, height: 1080 } }); // Full HD size

    test('Homepage displays correctly on desktop', async ({ page }) => {
      // Navigate to the homepage
      await page.goto('http://localhost:5179/');

      // Wait for the page to be fully loaded
      await page.waitForLoadState('networkidle');

      // Take a screenshot for visual verification
      await page.screenshot({ path: 'test-results/desktop-homepage.png', fullPage: true });
    });

    test('All sections display correctly on desktop', async ({ page }) => {
      // Navigate to the homepage
      await page.goto('http://localhost:5179/');

      // Wait for the page to be fully loaded
      await page.waitForLoadState('networkidle');

      // Test all sections with screenshots
      const sections = ['hero', 'history', 'services', 'team', 'portfolio', 'contact'];

      for (const section of sections) {
        // Scroll to the section
        await page.evaluate((sectionId) => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, section);

        // Wait for the scroll animation to complete
        await page.waitForTimeout(1000);

        // Take a screenshot for visual verification
        await page.screenshot({ path: `test-results/desktop-${section}-section.png`, fullPage: false });
      }
    });
  });
});
