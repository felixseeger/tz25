
import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test('PortfolioTest_2025-05-03', async ({ page, context }) => {
  
    // Navigate to URL
    await page.goto('http://localhost:5173/#portfolio');

    // Click element
    await page.click('.filter-button.client-filter');
});