import { test, expect } from '@playwright/test';

test.describe('Cookie Consent Flow', () => {
  // Clear cookies and localStorage before each test
  test.beforeEach(async ({ context, page }) => {
    // Clear cookies and localStorage to ensure cookie banner appears
    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());
    
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('Cookie banner appears on first visit', async ({ page }) => {
    // Check if cookie banner is visible
    const cookieBanner = page.locator('.cookie-banner');
    await expect(cookieBanner).toBeVisible();
    
    // Check if cookie banner has the correct content
    const bannerTitle = cookieBanner.locator('.cookie-banner__title');
    await expect(bannerTitle).toBeVisible();
    
    // Check if accept and customize buttons are visible
    const acceptButton = cookieBanner.locator('.cookie-banner__button--accept');
    await expect(acceptButton).toBeVisible();
    
    const customizeButton = cookieBanner.locator('.cookie-banner__button--customize');
    await expect(customizeButton).toBeVisible();
  });

  test('Accepting all cookies hides the banner', async ({ page }) => {
    // Get the cookie banner
    const cookieBanner = page.locator('.cookie-banner');
    await expect(cookieBanner).toBeVisible();
    
    // Click the accept button
    const acceptButton = cookieBanner.locator('.cookie-banner__button--accept');
    await acceptButton.click();
    
    // Check if cookie banner is hidden
    await expect(cookieBanner).not.toBeVisible();
    
    // Reload the page to verify banner doesn't reappear
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Banner should still be hidden
    await expect(cookieBanner).not.toBeVisible();
  });

  test('Customizing cookie settings works correctly', async ({ page }) => {
    // Get the cookie banner
    const cookieBanner = page.locator('.cookie-banner');
    await expect(cookieBanner).toBeVisible();
    
    // Click the customize button
    const customizeButton = cookieBanner.locator('.cookie-banner__button--customize');
    await customizeButton.click();
    
    // Check if cookie manager is visible
    const cookieManager = page.locator('.cookie-manager');
    await expect(cookieManager).toBeVisible();
    
    // Check if cookie categories are visible
    const cookieCategories = cookieManager.locator('.cookie-category');
    await expect(cookieCategories.first()).toBeVisible();
    
    // Toggle some cookie categories (if available)
    const toggles = cookieManager.locator('.cookie-toggle input[type="checkbox"]');
    const toggleCount = await toggles.count();
    
    if (toggleCount > 1) {
      // Toggle the second category (usually analytics)
      // First category is often "essential" and can't be toggled
      await toggles.nth(1).click();
    }
    
    // Save preferences
    const saveButton = cookieManager.locator('.cookie-manager__button--save');
    await saveButton.click();
    
    // Check if cookie manager is hidden
    await expect(cookieManager).not.toBeVisible();
    
    // Check if cookie banner is also hidden
    await expect(cookieBanner).not.toBeVisible();
    
    // Reload the page to verify banner doesn't reappear
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Banner should still be hidden
    await expect(cookieBanner).not.toBeVisible();
  });

  test('Cookie button opens cookie manager after consent', async ({ page }) => {
    // First accept cookies to hide the banner
    const cookieBanner = page.locator('.cookie-banner');
    await expect(cookieBanner).toBeVisible();
    
    const acceptButton = cookieBanner.locator('.cookie-banner__button--accept');
    await acceptButton.click();
    
    // Check if cookie banner is hidden
    await expect(cookieBanner).not.toBeVisible();
    
    // Check if cookie button is visible
    const cookieButton = page.locator('.cookie-button');
    await expect(cookieButton).toBeVisible();
    
    // Click the cookie button
    await cookieButton.click();
    
    // Check if cookie manager is visible
    const cookieManager = page.locator('.cookie-manager');
    await expect(cookieManager).toBeVisible();
    
    // Close the cookie manager
    const closeButton = cookieManager.locator('.cookie-manager__close');
    await closeButton.click();
    
    // Check if cookie manager is hidden
    await expect(cookieManager).not.toBeVisible();
  });

  test('Cookie settings persist across page reloads', async ({ page, context }) => {
    // Get the cookie banner
    const cookieBanner = page.locator('.cookie-banner');
    await expect(cookieBanner).toBeVisible();
    
    // Click the customize button
    const customizeButton = cookieBanner.locator('.cookie-banner__button--customize');
    await customizeButton.click();
    
    // Check if cookie manager is visible
    const cookieManager = page.locator('.cookie-manager');
    await expect(cookieManager).toBeVisible();
    
    // Toggle some cookie categories (if available)
    const toggles = cookieManager.locator('.cookie-toggle input[type="checkbox"]');
    const toggleCount = await toggles.count();
    
    if (toggleCount > 1) {
      // Get the initial state of the second toggle
      const initialState = await toggles.nth(1).isChecked();
      
      // Toggle the second category
      await toggles.nth(1).click();
      
      // Save preferences
      const saveButton = cookieManager.locator('.cookie-manager__button--save');
      await saveButton.click();
      
      // Reload the page
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Open cookie manager again
      const cookieButton = page.locator('.cookie-button');
      await cookieButton.click();
      
      // Check if the toggle state persisted
      const newToggles = page.locator('.cookie-manager .cookie-toggle input[type="checkbox"]');
      const newState = await newToggles.nth(1).isChecked();
      
      // The new state should be the opposite of the initial state
      expect(newState).toBe(!initialState);
    }
  });
});
