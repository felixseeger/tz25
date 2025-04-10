import { test, expect } from '@playwright/test';

test.describe('Portfolio Exploration Journey', () => {
  test('User can explore portfolio items with filtering', async ({ page }) => {
    // Start at the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Scroll to the portfolio section
    await page.evaluate(() => {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Verify we're at the portfolio section
    const portfolioSection = page.locator('#portfolio');
    await expect(portfolioSection).toBeVisible();
    
    // Take a screenshot of the initial portfolio view
    await page.screenshot({ path: 'test-results/e2e/portfolio-initial.png', fullPage: false });
    
    // Check if client logo filters are visible
    const clientLogoFilters = page.locator('.client-logos-container');
    
    if (await clientLogoFilters.isVisible()) {
      // Get all client logos (excluding the "All" filter)
      const clientLogos = page.locator('.client-logo:not(:has-text("All"))');
      const logoCount = await clientLogos.count();
      
      if (logoCount > 0) {
        // Click on the first client logo
        await clientLogos.first().click();
        
        // Wait for the filter to apply
        await page.waitForTimeout(500);
        
        // Take a screenshot after filtering
        await page.screenshot({ path: 'test-results/e2e/portfolio-filtered.png', fullPage: false });
        
        // Click the "All" filter to reset
        const allFilter = page.locator('.client-logo:has-text("All")');
        if (await allFilter.isVisible()) {
          await allFilter.click();
          
          // Wait for the filter to reset
          await page.waitForTimeout(500);
          
          // Take a screenshot after resetting the filter
          await page.screenshot({ path: 'test-results/e2e/portfolio-reset.png', fullPage: false });
        }
      }
    }
    
    // Check if there are portfolio items
    const portfolioItems = page.locator('.portfolio-item, .portfolio-slide');
    const itemCount = await portfolioItems.count();
    
    if (itemCount > 0) {
      // Click on the first portfolio item
      await portfolioItems.first().click();
      
      // Wait for any modal or detail view to appear
      await page.waitForTimeout(1000);
      
      // Take a screenshot of the detail view
      await page.screenshot({ path: 'test-results/e2e/portfolio-detail.png', fullPage: false });
      
      // Check if there's a close button for the detail view
      const closeButton = page.locator('.close-button, .modal-close');
      
      if (await closeButton.isVisible()) {
        // Close the detail view
        await closeButton.click();
        
        // Wait for the detail view to close
        await page.waitForTimeout(500);
        
        // Take a screenshot after closing the detail view
        await page.screenshot({ path: 'test-results/e2e/portfolio-after-close.png', fullPage: false });
      }
    }
    
    // Check if there's pagination
    const pagination = page.locator('.pagination-wrapper, .top-pagination');
    
    if (await pagination.isVisible()) {
      // Check if there are multiple pages
      const paginationButtons = page.locator('.pagination-page, .pagination-dot');
      const pageCount = await paginationButtons.count();
      
      if (pageCount > 1) {
        // Click on the second page
        await paginationButtons.nth(1).click();
        
        // Wait for the page to change
        await page.waitForTimeout(500);
        
        // Take a screenshot of the second page
        await page.screenshot({ path: 'test-results/e2e/portfolio-page-2.png', fullPage: false });
        
        // Go back to the first page
        await paginationButtons.first().click();
        
        // Wait for the page to change
        await page.waitForTimeout(500);
        
        // Take a screenshot of the first page
        await page.screenshot({ path: 'test-results/e2e/portfolio-page-1.png', fullPage: false });
      }
    }
    
    // Check if there are category filters
    const categoryFilters = page.locator('.filter-button.category-filter');
    const filterCount = await categoryFilters.count();
    
    if (filterCount > 0) {
      // Click on the first category filter
      await categoryFilters.first().click();
      
      // Wait for the filter to apply
      await page.waitForTimeout(500);
      
      // Take a screenshot after category filtering
      await page.screenshot({ path: 'test-results/e2e/portfolio-category-filtered.png', fullPage: false });
      
      // Click the "All Categories" button to reset
      const allCategoriesButton = page.locator('.filter-button:not(.category-filter)');
      
      if (await allCategoriesButton.isVisible()) {
        await allCategoriesButton.click();
        
        // Wait for the filter to reset
        await page.waitForTimeout(500);
        
        // Take a screenshot after resetting the category filter
        await page.screenshot({ path: 'test-results/e2e/portfolio-category-reset.png', fullPage: false });
      }
    }
  });
  
  test('User can interact with portfolio slider', async ({ page }) => {
    // Start at the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Scroll to the portfolio section
    await page.evaluate(() => {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Check if there's a portfolio slider
    const portfolioSlider = page.locator('.portfolio-slider');
    
    if (await portfolioSlider.isVisible()) {
      // Take a screenshot of the initial slider state
      await page.screenshot({ path: 'test-results/e2e/slider-initial.png', fullPage: false });
      
      // Check if there are navigation arrows
      const nextArrow = page.locator('.slider-arrow-right, .slider-next');
      
      if (await nextArrow.isVisible()) {
        // Click the next arrow
        await nextArrow.click();
        
        // Wait for the slide transition
        await page.waitForTimeout(500);
        
        // Take a screenshot after moving to the next slide
        await page.screenshot({ path: 'test-results/e2e/slider-next.png', fullPage: false });
        
        // Check if there's a previous arrow
        const prevArrow = page.locator('.slider-arrow-left, .slider-prev');
        
        if (await prevArrow.isVisible()) {
          // Click the previous arrow
          await prevArrow.click();
          
          // Wait for the slide transition
          await page.waitForTimeout(500);
          
          // Take a screenshot after moving back to the previous slide
          await page.screenshot({ path: 'test-results/e2e/slider-prev.png', fullPage: false });
        }
      }
      
      // Check if there are slide indicators/dots
      const slideIndicators = page.locator('.slider-indicator, .slider-dot');
      const indicatorCount = await slideIndicators.count();
      
      if (indicatorCount > 1) {
        // Click on the second indicator
        await slideIndicators.nth(1).click();
        
        // Wait for the slide transition
        await page.waitForTimeout(500);
        
        // Take a screenshot after clicking the indicator
        await page.screenshot({ path: 'test-results/e2e/slider-indicator.png', fullPage: false });
      }
    }
  });
});
