import { test, expect } from '@playwright/test';

test.describe('Portfolio Filter and Pagination', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the portfolio section
    await page.goto('/#portfolio');
    
    // Wait for the portfolio section to be visible
    await page.waitForSelector('.portfolio-section-filtered');
  });

  test('should display all portfolio items by default', async ({ page }) => {
    // Check that portfolio items are displayed
    const portfolioItems = await page.$$('.portfolio-item');
    expect(portfolioItems.length).toBeGreaterThan(0);
    
    // Check that no client is selected
    const activeClientLogo = await page.$('.client-logo.active');
    expect(activeClientLogo).toBeNull();
  });

  test('should filter items when a client is selected', async ({ page }) => {
    // Get initial count of portfolio items
    const initialItems = await page.$$('.portfolio-item');
    const initialCount = initialItems.length;
    
    // Click on the first client logo
    await page.click('.client-logo:nth-child(2)');
    
    // Wait for loading state to disappear
    await page.waitForSelector('.portfolio-loading-overlay', { state: 'hidden' });
    
    // Check that the client logo is now active
    const activeClientLogo = await page.$('.client-logo:nth-child(2).active');
    expect(activeClientLogo).not.toBeNull();
    
    // Get filtered count of portfolio items
    const filteredItems = await page.$$('.portfolio-item');
    
    // The filtered count should be different from the initial count
    // We can't know exactly how many items will be displayed, but it should be different
    expect(filteredItems.length).not.toEqual(initialCount);
  });

  test('should reset filter when active client is clicked again', async ({ page }) => {
    // Click on the first client logo to select it
    await page.click('.client-logo:nth-child(2)');
    
    // Wait for loading state to disappear
    await page.waitForSelector('.portfolio-loading-overlay', { state: 'hidden' });
    
    // Click on the same client logo again to deselect it
    await page.click('.client-logo.active');
    
    // Wait for loading state to disappear
    await page.waitForSelector('.portfolio-loading-overlay', { state: 'hidden' });
    
    // Check that no client is selected
    const activeClientLogo = await page.$('.client-logo.active');
    expect(activeClientLogo).toBeNull();
  });

  test('should navigate between pages using pagination', async ({ page }) => {
    // Check if pagination exists (there might not be enough items to paginate)
    const paginationExists = await page.$('.portfolio-pagination');
    if (!paginationExists) {
      console.log('Skipping pagination test - not enough items to paginate');
      return;
    }
    
    // Get initial page number
    const initialPage = await page.textContent('.pagination-current');
    expect(initialPage).toBe('1');
    
    // Click next button
    await page.click('.pagination-next');
    
    // Check that page number has changed
    const newPage = await page.textContent('.pagination-current');
    expect(newPage).toBe('2');
    
    // Check that previous button is now enabled
    const prevButton = await page.$('.pagination-prev:not([disabled])');
    expect(prevButton).not.toBeNull();
    
    // Click previous button
    await page.click('.pagination-prev');
    
    // Check that page number has changed back
    const finalPage = await page.textContent('.pagination-current');
    expect(finalPage).toBe('1');
    
    // Check that previous button is now disabled
    const disabledPrevButton = await page.$('.pagination-prev[disabled]');
    expect(disabledPrevButton).not.toBeNull();
  });

  test('should update URL when filter or page changes', async ({ page }) => {
    // Initial URL should not have query parameters
    expect(page.url()).not.toContain('?');
    
    // Click on the first client logo
    await page.click('.client-logo:nth-child(2)');
    
    // Wait for loading state to disappear
    await page.waitForSelector('.portfolio-loading-overlay', { state: 'hidden' });
    
    // URL should now contain client parameter
    expect(page.url()).toContain('client=');
    
    // Check if pagination exists
    const paginationExists = await page.$('.portfolio-pagination');
    if (paginationExists) {
      // Click next button
      await page.click('.pagination-next');
      
      // URL should now contain page parameter
      expect(page.url()).toContain('page=2');
      
      // Click previous button
      await page.click('.pagination-prev');
      
      // URL should no longer contain page parameter
      expect(page.url()).not.toContain('page=');
    }
    
    // Click on the active client logo to reset filter
    await page.click('.client-logo.active');
    
    // Wait for loading state to disappear
    await page.waitForSelector('.portfolio-loading-overlay', { state: 'hidden' });
    
    // URL should no longer contain client parameter
    expect(page.url()).not.toContain('client=');
  });

  test('should handle keyboard navigation for pagination', async ({ page }) => {
    // Check if pagination exists
    const paginationExists = await page.$('.portfolio-pagination');
    if (!paginationExists) {
      console.log('Skipping keyboard navigation test - not enough items to paginate');
      return;
    }
    
    // Focus on the portfolio section
    await page.focus('.portfolio-section-filtered');
    
    // Press right arrow key
    await page.keyboard.press('ArrowRight');
    
    // Check that page number has changed
    const newPage = await page.textContent('.pagination-current');
    expect(newPage).toBe('2');
    
    // Press left arrow key
    await page.keyboard.press('ArrowLeft');
    
    // Check that page number has changed back
    const finalPage = await page.textContent('.pagination-current');
    expect(finalPage).toBe('1');
  });
});
