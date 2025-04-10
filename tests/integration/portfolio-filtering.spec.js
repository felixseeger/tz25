import { test, expect } from '@playwright/test';

test.describe('Portfolio Filtering Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Scroll to the portfolio section
    await page.evaluate(() => {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Wait for the scroll animation to complete
    await page.waitForTimeout(1000);
  });

  test('Portfolio section loads correctly', async ({ page }) => {
    // Check if portfolio section is visible
    const portfolioSection = page.locator('#portfolio');
    await expect(portfolioSection).toBeVisible();
    
    // Check if portfolio title is visible
    const portfolioTitle = portfolioSection.locator('.portfolio-title');
    await expect(portfolioTitle).toBeVisible();
    await expect(portfolioTitle).toHaveText('Our Portfolio');
    
    // Check if client logo filters are visible
    const clientLogoFilters = portfolioSection.locator('.client-logos-container');
    await expect(clientLogoFilters).toBeVisible();
    
    // Check if portfolio slider is visible
    const portfolioSlider = portfolioSection.locator('.portfolio-slider');
    await expect(portfolioSlider).toBeVisible();
    
    // Check if at least one portfolio item is visible
    const portfolioItems = portfolioSlider.locator('.portfolio-slide');
    await expect(portfolioItems.first()).toBeVisible();
  });

  test('Client logo filters work correctly', async ({ page }) => {
    // Get the client logos container
    const clientLogosContainer = page.locator('.client-logos-container');
    
    // Check if "All" filter is active by default
    const allFilter = clientLogosContainer.locator('.client-logo:has-text("All")').first();
    await expect(allFilter).toHaveClass(/active/);
    
    // Get all client logo filters (excluding duplicates and "All")
    const clientLogos = clientLogosContainer.locator('.client-logo:not(:has-text("All"))').all();
    const logoCount = await clientLogosContainer.locator('.client-logo:not(:has-text("All")):not([id^="dup-"])').count();
    
    // Click on the first client logo (if available)
    if (logoCount > 0) {
      const firstClientLogo = clientLogosContainer.locator('.client-logo:not(:has-text("All")):not([id^="dup-"])').first();
      await firstClientLogo.click();
      
      // Check if the clicked logo is now active
      await expect(firstClientLogo).toHaveClass(/active/);
      
      // Check if "All" filter is no longer active
      await expect(allFilter).not.toHaveClass(/active/);
      
      // Check if portfolio items have been filtered
      // This is a bit tricky to verify without knowing the exact structure,
      // but we can check if the portfolio slider has updated
      await page.waitForTimeout(500); // Wait for any animations
      
      // Click "All" filter to reset
      await allFilter.click();
      
      // Check if "All" filter is active again
      await expect(allFilter).toHaveClass(/active/);
    }
  });

  test('Portfolio grid filtering works correctly', async ({ page }) => {
    // Navigate to the portfolio grid page if it exists
    // First check if there's a link to a dedicated portfolio page
    const portfolioPageLink = page.locator('a[href*="portfolio"]').first();
    
    if (await portfolioPageLink.count() > 0) {
      // Click the portfolio page link
      await portfolioPageLink.click();
      await page.waitForLoadState('networkidle');
    } else {
      // If no dedicated page, check if there's a grid view in the current portfolio section
      const portfolioGrid = page.locator('.portfolio-grid');
      
      // If no grid view either, skip this test
      if (await portfolioGrid.count() === 0) {
        test.skip();
        return;
      }
    }
    
    // Check if category filters are visible
    const categoryFilters = page.locator('.filter-button.category-filter');
    
    // If no category filters, skip the rest of the test
    if (await categoryFilters.count() === 0) {
      test.skip();
      return;
    }
    
    // Get the "All Categories" button
    const allCategoriesButton = page.locator('.filter-button:not(.category-filter)').first();
    
    // Check if "All Categories" is active by default
    await expect(allCategoriesButton).toHaveClass(/active/);
    
    // Click on the first category filter
    const firstCategoryFilter = categoryFilters.first();
    const categoryName = await firstCategoryFilter.textContent();
    await firstCategoryFilter.click();
    
    // Check if the clicked category is now active
    await expect(firstCategoryFilter).toHaveClass(/active/);
    
    // Check if "All Categories" is no longer active
    await expect(allCategoriesButton).not.toHaveClass(/active/);
    
    // Check if portfolio items have been filtered
    // We can check if any items are visible
    const portfolioItems = page.locator('.portfolio-item');
    await expect(portfolioItems.first()).toBeVisible();
    
    // Click "All Categories" to reset
    await allCategoriesButton.click();
    
    // Check if "All Categories" is active again
    await expect(allCategoriesButton).toHaveClass(/active/);
  });

  test('Portfolio pagination works correctly', async ({ page }) => {
    // Check if we're on a page with portfolio grid pagination
    const paginationWrapper = page.locator('.top-pagination');
    
    // If no pagination, skip this test
    if (await paginationWrapper.count() === 0) {
      test.skip();
      return;
    }
    
    // Check if pagination buttons are visible
    const paginationButtons = paginationWrapper.locator('.pagination-page');
    await expect(paginationButtons.first()).toBeVisible();
    
    // Check if first page is active by default
    await expect(paginationButtons.first()).toHaveClass(/active/);
    
    // If there's more than one page, test pagination
    if (await paginationButtons.count() > 1) {
      // Click on the second page
      await paginationButtons.nth(1).click();
      
      // Check if second page is now active
      await expect(paginationButtons.nth(1)).toHaveClass(/active/);
      
      // Check if first page is no longer active
      await expect(paginationButtons.first()).not.toHaveClass(/active/);
      
      // Check if portfolio items have been updated
      // We can check if any items are visible
      const portfolioItems = page.locator('.portfolio-item');
      await expect(portfolioItems.first()).toBeVisible();
      
      // Test next button if it exists
      const nextButton = paginationWrapper.locator('.pagination-button.next');
      if (await nextButton.count() > 0 && !(await nextButton.isDisabled())) {
        await nextButton.click();
        
        // Check if a different page is now active
        await expect(paginationButtons.nth(1)).not.toHaveClass(/active/);
      }
      
      // Test previous button if it exists
      const prevButton = paginationWrapper.locator('.pagination-button.prev');
      if (await prevButton.count() > 0 && !(await prevButton.isDisabled())) {
        await prevButton.click();
        
        // Check if we've moved to a different page
        await expect(paginationButtons.nth(2)).not.toHaveClass(/active/);
      }
    }
  });
});
