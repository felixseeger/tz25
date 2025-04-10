import { test, expect } from '@playwright/test';

test.describe('Navigation Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('Desktop navigation works correctly', async ({ page }) => {
    // Check if navbar is visible
    const navbar = page.locator('nav.navbar');
    await expect(navbar).toBeVisible();
    
    // Check if logo is visible and clickable
    const logo = navbar.locator('.navbar__logo img');
    await expect(logo).toBeVisible();
    
    // Check if main navigation links are visible
    const navLinks = navbar.locator('.navbar__links');
    await expect(navLinks).toBeVisible();
    
    // Scroll to journey section
    await page.evaluate(() => {
      document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Verify URL hash changed
    await expect(page).toHaveURL(/#journey$/);
    
    // Scroll to portfolio section
    await page.evaluate(() => {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Verify URL hash changed
    await expect(page).toHaveURL(/#portfolio$/);
    
    // Scroll to contact section
    await page.evaluate(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Verify URL hash changed
    await expect(page).toHaveURL(/#contact$/);
  });

  test('Mobile menu opens and closes correctly', async ({ page }) => {
    // Resize to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if hamburger menu button is visible
    const menuButton = page.locator('.navbar__menu-toggle');
    await expect(menuButton).toBeVisible();
    
    // Click the menu button to open the menu
    await menuButton.click();
    
    // Check if menu overlay is visible
    const menuOverlay = page.locator('.menu-overlay.is-active');
    await expect(menuOverlay).toBeVisible();
    
    // Check if close button is visible
    const closeButton = menuOverlay.locator('.menu-overlay__close');
    await expect(closeButton).toBeVisible();
    
    // Check if menu links are visible
    const menuLinks = menuOverlay.locator('.menu-overlay__link');
    await expect(menuLinks.first()).toBeVisible();
    
    // Click a menu link (journey section)
    const journeyLink = menuOverlay.locator('.menu-overlay__link:has-text("ÜBER UNS")');
    await journeyLink.click();
    
    // Verify menu closed
    await expect(menuOverlay).not.toBeVisible();
    
    // Verify URL hash changed
    await expect(page).toHaveURL(/#journey$/);
    
    // Open menu again
    await menuButton.click();
    await expect(menuOverlay).toBeVisible();
    
    // Close menu with close button
    await closeButton.click();
    
    // Verify menu closed
    await expect(menuOverlay).not.toBeVisible();
  });

  test('Fixed UI elements work correctly', async ({ page }) => {
    // Check if contact button is visible
    const contactButton = page.locator('.contact-button');
    await expect(contactButton).toBeVisible();
    
    // Check if scroll-to-top button appears after scrolling
    const scrollToTopButton = page.locator('.scroll-to-top');
    await expect(scrollToTopButton).not.toBeVisible(); // Initially not visible
    
    // Scroll down to make scroll-to-top button appear
    await page.evaluate(() => {
      window.scrollTo(0, 500);
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Now the button should be visible
    await expect(scrollToTopButton).toBeVisible();
    
    // Click the contact button
    await contactButton.click();
    
    // Verify URL hash changed to contact section
    await page.waitForTimeout(1000); // Wait for scroll animation
    await expect(page).toHaveURL(/#contact$/);
    
    // Click scroll-to-top button
    await scrollToTopButton.click();
    
    // Verify scrolled back to top
    await page.waitForTimeout(1000); // Wait for scroll animation
    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBeLessThan(100);
  });

  test('Section scroll indicators work correctly', async ({ page }) => {
    // Check if section scroll indicator is visible on hero section
    const scrollIndicator = page.locator('.section-scroll-indicator');
    await expect(scrollIndicator).toBeVisible();
    
    // Click the scroll indicator
    await scrollIndicator.click();
    
    // Verify scrolled to journey section
    await page.waitForTimeout(1000); // Wait for scroll animation
    await expect(page).toHaveURL(/#journey$/);
    
    // Verify scroll indicator is still visible
    await expect(scrollIndicator).toBeVisible();
    
    // Click the scroll indicator again
    await scrollIndicator.click();
    
    // Verify scrolled to next section
    await page.waitForTimeout(1000); // Wait for scroll animation
    // The URL should have changed from #journey
    const currentUrl = page.url();
    expect(currentUrl).not.toContain('#journey');
  });

  test('Page navigation works correctly', async ({ page }) => {
    // Open mobile menu to access page links
    await page.setViewportSize({ width: 375, height: 667 });
    const menuButton = page.locator('.navbar__menu-toggle');
    await menuButton.click();
    
    // Click on Karriere page link
    const karriereLink = page.locator('.menu-overlay__link:has-text("KARRIERE")');
    await karriereLink.click();
    
    // Verify navigation to Karriere page
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/karriere$/);
    
    // Go back to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Open menu again
    await menuButton.click();
    
    // Click on another page link (e.g., Employer Branding)
    const brandingLink = page.locator('.menu-overlay__link:has-text("EMPLOYER BRANDING")');
    await brandingLink.click();
    
    // Verify navigation to Employer Branding page
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/employer-branding$/);
  });
});
