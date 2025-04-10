import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('Homepage visual regression test', async ({ page }) => {
    // Take a screenshot of the entire page
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      // Mask dynamic elements that might change between runs
      mask: [
        page.locator('.cookie-banner'),
        page.locator('.date-time'),
        page.locator('.animation-container')
      ]
    });
  });

  test('Hero section visual regression test', async ({ page }) => {
    // Check if hero section is visible
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();
    
    // Take a screenshot of the hero section
    await expect(heroSection).toHaveScreenshot('hero-section.png', {
      // Mask dynamic elements that might change between runs
      mask: [
        heroSection.locator('.animation-container'),
        heroSection.locator('video')
      ]
    });
  });

  test('Journey section visual regression test', async ({ page }) => {
    // Scroll to the journey section
    await page.evaluate(() => {
      document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Check if journey section is visible
    const journeySection = page.locator('#journey');
    await expect(journeySection).toBeVisible();
    
    // Take a screenshot of the journey section
    await expect(journeySection).toHaveScreenshot('journey-section.png');
  });

  test('Portfolio section visual regression test', async ({ page }) => {
    // Scroll to the portfolio section
    await page.evaluate(() => {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Check if portfolio section is visible
    const portfolioSection = page.locator('#portfolio');
    await expect(portfolioSection).toBeVisible();
    
    // Take a screenshot of the portfolio section
    await expect(portfolioSection).toHaveScreenshot('portfolio-section.png', {
      // Mask dynamic elements that might change between runs
      mask: [
        portfolioSection.locator('.portfolio-slider'),
        portfolioSection.locator('.client-logos-container')
      ]
    });
  });

  test('Contact section visual regression test', async ({ page }) => {
    // Scroll to the contact section
    await page.evaluate(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Check if contact section is visible
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    
    // Take a screenshot of the contact section
    await expect(contactSection).toHaveScreenshot('contact-section.png');
  });

  test('Footer section visual regression test', async ({ page }) => {
    // Scroll to the footer section
    await page.evaluate(() => {
      document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Check if footer section is visible
    const footerSection = page.locator('#footer');
    await expect(footerSection).toBeVisible();
    
    // Take a screenshot of the footer section
    await expect(footerSection).toHaveScreenshot('footer-section.png');
  });

  test('Mobile menu visual regression test', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Wait for the page to adjust to the new viewport size
    await page.waitForTimeout(1000);
    
    // Check if hamburger menu button is visible
    const menuButton = page.locator('.navbar__menu-toggle, .hamburger-menu');
    
    if (await menuButton.isVisible()) {
      // Click the menu button to open the menu
      await menuButton.click();
      
      // Wait for the menu to open
      await page.waitForTimeout(500);
      
      // Take a screenshot of the open menu
      await expect(page).toHaveScreenshot('mobile-menu-open.png');
      
      // Close the menu
      const closeButton = page.locator('.menu-overlay__close, .close-button');
      
      if (await closeButton.isVisible()) {
        await closeButton.click();
        
        // Wait for the menu to close
        await page.waitForTimeout(500);
        
        // Take a screenshot after closing the menu
        await expect(page).toHaveScreenshot('mobile-menu-closed.png');
      }
    }
  });

  test('Responsive design visual regression tests', async ({ page }) => {
    // Test different viewport sizes
    const viewportSizes = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1280, height: 800, name: 'laptop' },
      { width: 1920, height: 1080, name: 'desktop' }
    ];
    
    for (const viewport of viewportSizes) {
      // Set viewport size
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      // Wait for the page to adjust to the new viewport size
      await page.waitForTimeout(1000);
      
      // Take a screenshot of the hero section
      await page.evaluate(() => {
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1000);
      
      await expect(page).toHaveScreenshot(`hero-section-${viewport.name}.png`, {
        mask: [
          page.locator('video'),
          page.locator('.animation-container')
        ]
      });
      
      // Take a screenshot of the portfolio section
      await page.evaluate(() => {
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1000);
      
      await expect(page).toHaveScreenshot(`portfolio-section-${viewport.name}.png`, {
        mask: [
          page.locator('.portfolio-slider'),
          page.locator('.client-logos-container')
        ]
      });
      
      // Take a screenshot of the contact section
      await page.evaluate(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1000);
      
      await expect(page).toHaveScreenshot(`contact-section-${viewport.name}.png`);
    }
  });
});
