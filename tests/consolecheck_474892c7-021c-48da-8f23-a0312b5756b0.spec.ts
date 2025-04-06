
import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test('ConsoleCheck_2025-04-06', async ({ page, context }) => {
  
    // Navigate to URL
    await page.goto('http://localhost:5179/');

    // Take screenshot
    await page.screenshot({ path: 'current-state.png', { fullPage: true } });
});