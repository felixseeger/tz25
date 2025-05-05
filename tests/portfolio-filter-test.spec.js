import { test, expect } from '@playwright/test';

test.describe('Portfolio Filter Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:5174/');
    
    // Scroll to the portfolio section
    await page.evaluate(() => {
      document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Wait for the portfolio section to be visible
    await page.waitForSelector('.portfolio-section-filtered', { state: 'visible' });
    
    // Wait for portfolio items to load
    await page.waitForSelector('.portfolio-item', { state: 'visible' });
    
    // Wait a moment for any animations to complete
    await page.waitForTimeout(1000);
  });

  test('should display all portfolio items by default', async ({ page }) => {
    // Check that portfolio items are displayed
    const portfolioItems = await page.$$('.portfolio-item');
    console.log(`Initial portfolio items count: ${portfolioItems.length}`);
    expect(portfolioItems.length).toBeGreaterThan(0);
    
    // Check that no client filter is active
    const activeClientFilter = await page.$('.client-filter.active');
    expect(activeClientFilter).toBeNull();
  });

  test('should filter items when a client is selected', async ({ page }) => {
    // Get initial count of portfolio items
    const initialItems = await page.$$('.portfolio-item');
    const initialCount = initialItems.length;
    console.log(`Initial portfolio items count: ${initialCount}`);
    
    // Find and click on a client filter button (e.g., Bridgestone)
    const clientFilters = await page.$$('.client-filter');
    console.log(`Found ${clientFilters.length} client filters`);
    
    if (clientFilters.length > 0) {
      // Click the first client filter
      await clientFilters[0].click();
      
      // Wait for the filter to be applied
      await page.waitForTimeout(1000);
      
      // Check that the client filter is now active
      const activeClientFilter = await page.$('.client-filter.active');
      expect(activeClientFilter).not.toBeNull();
      
      // Get filtered count of portfolio items
      const filteredItems = await page.$$('.portfolio-item');
      const filteredCount = filteredItems.length;
      console.log(`Filtered portfolio items count: ${filteredCount}`);
      
      // The filtered count should be different from the initial count
      // We can't know exactly how many items will be displayed, but it should be different
      expect(filteredCount).not.toEqual(initialCount);
    } else {
      console.log('No client filters found, skipping test');
    }
  });

  test('should reset filter when active client is clicked again', async ({ page }) => {
    // Find and click on a client filter button
    const clientFilters = await page.$$('.client-filter');
    
    if (clientFilters.length > 0) {
      // Click the first client filter to select it
      await clientFilters[0].click();
      
      // Wait for the filter to be applied
      await page.waitForTimeout(1000);
      
      // Find the active filter
      const activeClientFilter = await page.$('.client-filter.active');
      expect(activeClientFilter).not.toBeNull();
      
      // Click the active filter again to deselect it
      await activeClientFilter.click();
      
      // Wait for the filter to be reset
      await page.waitForTimeout(1000);
      
      // Check that no client filter is active
      const newActiveClientFilter = await page.$('.client-filter.active');
      expect(newActiveClientFilter).toBeNull();
    } else {
      console.log('No client filters found, skipping test');
    }
  });

  test('should navigate between pages using pagination if available', async ({ page }) => {
    // Check if pagination exists
    const paginationExists = await page.$('.portfolio-pagination');
    
    if (paginationExists) {
      // Get initial page number
      const initialPage = await page.textContent('.pagination-current');
      console.log(`Initial page: ${initialPage}`);
      
      // Check if next button exists and is enabled
      const nextButton = await page.$('.pagination-next:not([disabled])');
      
      if (nextButton) {
        // Click next button
        await nextButton.click();
        
        // Wait for page change
        await page.waitForTimeout(500);
        
        // Check that page number has changed
        const newPage = await page.textContent('.pagination-current');
        console.log(`New page: ${newPage}`);
        expect(newPage).not.toBe(initialPage);
        
        // Check that previous button is now enabled
        const prevButton = await page.$('.pagination-prev:not([disabled])');
        expect(prevButton).not.toBeNull();
        
        // Click previous button
        await prevButton.click();
        
        // Wait for page change
        await page.waitForTimeout(500);
        
        // Check that page number has changed back
        const finalPage = await page.textContent('.pagination-current');
        console.log(`Final page: ${finalPage}`);
        expect(finalPage).toBe(initialPage);
      } else {
        console.log('Next button not found or disabled, skipping pagination test');
      }
    } else {
      console.log('Pagination not found, skipping test');
    }
  });

  test('should update URL when filter or page changes', async ({ page }) => {
    // Initial URL should not have query parameters
    const initialUrl = page.url();
    console.log(`Initial URL: ${initialUrl}`);
    expect(initialUrl).not.toContain('?client=');
    
    // Find and click on a client filter button
    const clientFilters = await page.$$('.client-filter');
    
    if (clientFilters.length > 0) {
      // Click the first client filter
      await clientFilters[0].click();
      
      // Wait for the filter to be applied
      await page.waitForTimeout(1000);
      
      // URL should now contain client parameter
      const filteredUrl = page.url();
      console.log(`Filtered URL: ${filteredUrl}`);
      expect(filteredUrl).toContain('client=');
      
      // Check if pagination exists and next button is enabled
      const nextButton = await page.$('.pagination-next:not([disabled])');
      
      if (nextButton) {
        // Click next button
        await nextButton.click();
        
        // Wait for page change
        await page.waitForTimeout(500);
        
        // URL should now contain page parameter
        const pagedUrl = page.url();
        console.log(`Paged URL: ${pagedUrl}`);
        expect(pagedUrl).toContain('page=');
      }
      
      // Find the active filter
      const activeClientFilter = await page.$('.client-filter.active');
      
      if (activeClientFilter) {
        // Click the active filter again to deselect it
        await activeClientFilter.click();
        
        // Wait for the filter to be reset
        await page.waitForTimeout(1000);
        
        // URL should no longer contain client parameter
        const resetUrl = page.url();
        console.log(`Reset URL: ${resetUrl}`);
        expect(resetUrl).not.toContain('client=');
      }
    } else {
      console.log('No client filters found, skipping test');
    }
  });
});
