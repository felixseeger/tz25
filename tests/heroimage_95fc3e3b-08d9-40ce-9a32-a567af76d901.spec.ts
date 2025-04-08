
import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test('HeroImage_2025-04-08', async ({ page, context }) => {
  
    // Navigate to URL
    await page.goto('http://localhost:5173/');

    // Take screenshot
    await page.screenshot({ path: 'hero-section.png' });

    // Take screenshot
    await page.screenshot({ path: 'full-page.png', { fullPage: true } });
});