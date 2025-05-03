
import { test, expect } from '@playwright/test';

test('Portfolio filter functionality', async ({ page }) => {
  // Set a longer timeout for this test
  test.setTimeout(120000);

  // Navigate to the portfolio section
  await page.goto('http://localhost:5173/#portfolio');

  // Wait for the portfolio section to be visible and fully loaded
  await page.waitForSelector('#portfolio', { state: 'visible', timeout: 30000 });
  await page.waitForSelector('.portfolio-item', { state: 'visible', timeout: 30000 });

  // Make sure we scroll to the portfolio section to ensure it's in view
  await page.evaluate(() => {
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Wait a moment for any animations to complete
  await page.waitForTimeout(1000);

  // Verify initial state - all portfolio items should be visible
  const initialItems = await page.$$('.portfolio-item');
  console.log(`Initial portfolio items count: ${initialItems.length}`);
  expect(initialItems.length).toBeGreaterThan(0);

  // Get the initial client names for comparison later
  const initialClientNames = await page.evaluate(() => {
    const items = document.querySelectorAll('.portfolio-item');
    return Array.from(items).map(item => {
      const clientLogo = item.querySelector('.portfolio-item-client-logo');
      return clientLogo ? clientLogo.alt : 'Unknown';
    });
  });
  console.log('Initial client names:', initialClientNames);

  // Test filtering by Bridgestone
  console.log('Clicking Bridgestone filter button');
  await page.evaluate(() => {
    const bridgestoneButton = Array.from(document.querySelectorAll('.filter-button'))
      .find(button => button.getAttribute('aria-label') === 'Filter by Bridgestone');
    if (bridgestoneButton) {
      console.log('Found Bridgestone button, clicking it');
      bridgestoneButton.click();
    } else {
      console.log('Bridgestone button not found');
    }
  });

  // Wait for the filter to be applied
  await page.waitForTimeout(1000);

  // Verify that only Bridgestone items are displayed
  const bridgestoneItems = await page.$$('.portfolio-item');
  console.log(`Bridgestone filtered items count: ${bridgestoneItems.length}`);
  expect(bridgestoneItems.length).toBeGreaterThan(0);

  // Check that all visible items are from Bridgestone
  const bridgestoneClientNames = await page.evaluate(() => {
    const items = document.querySelectorAll('.portfolio-item');
    return Array.from(items).map(item => {
      const clientLogo = item.querySelector('.portfolio-item-client-logo');
      return clientLogo ? clientLogo.alt : 'Unknown';
    });
  });
  console.log('Bridgestone filtered client names:', bridgestoneClientNames);

  const allBridgestone = bridgestoneClientNames.every(name => name.includes('Bridgestone'));
  expect(allBridgestone).toBe(true);

  // Verify that the Bridgestone filter button is marked as active
  const bridgestoneActive = await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll('.filter-button'))
      .find(button => button.getAttribute('aria-label') === 'Filter by Bridgestone');
    return button ? button.getAttribute('aria-pressed') === 'true' : false;
  });
  console.log(`Bridgestone filter active: ${bridgestoneActive}`);
  expect(bridgestoneActive).toBe(true);

  // Test filtering by Panasonic
  console.log('Clicking Panasonic filter button');
  await page.evaluate(() => {
    const panasonicButton = Array.from(document.querySelectorAll('.filter-button'))
      .find(button => button.getAttribute('aria-label') === 'Filter by Panasonic');
    if (panasonicButton) {
      console.log('Found Panasonic button, clicking it');
      panasonicButton.click();
    } else {
      console.log('Panasonic button not found');
    }
  });

  // Wait for the filter to be applied
  await page.waitForTimeout(1000);

  // Verify that only Panasonic items are displayed
  const panasonicItems = await page.$$('.portfolio-item');
  console.log(`Panasonic filtered items count: ${panasonicItems.length}`);
  expect(panasonicItems.length).toBeGreaterThan(0);

  // Check that all visible items are from Panasonic
  const panasonicClientNames = await page.evaluate(() => {
    const items = document.querySelectorAll('.portfolio-item');
    return Array.from(items).map(item => {
      const clientLogo = item.querySelector('.portfolio-item-client-logo');
      return clientLogo ? clientLogo.alt : 'Unknown';
    });
  });
  console.log('Panasonic filtered client names:', panasonicClientNames);

  const allPanasonic = panasonicClientNames.every(name => name.includes('Panasonic'));
  expect(allPanasonic).toBe(true);

  // Verify that the Panasonic filter button is marked as active
  const panasonicActive = await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll('.filter-button'))
      .find(button => button.getAttribute('aria-label') === 'Filter by Panasonic');
    return button ? button.getAttribute('aria-pressed') === 'true' : false;
  });
  console.log(`Panasonic filter active: ${panasonicActive}`);
  expect(panasonicActive).toBe(true);

  // Test deselecting the filter by clicking it again
  console.log('Clicking Panasonic filter button again to deselect');
  await page.evaluate(() => {
    const panasonicButton = Array.from(document.querySelectorAll('.filter-button'))
      .find(button => button.getAttribute('aria-label') === 'Filter by Panasonic');
    if (panasonicButton) {
      console.log('Found Panasonic button, clicking it again');
      panasonicButton.click();
    } else {
      console.log('Panasonic button not found');
    }
  });

  // Wait for the filter to be reset
  await page.waitForTimeout(1000);

  // Verify that no filter is active
  const noActiveFilter = await page.evaluate(() => {
    const activeFilter = document.querySelector('.filter-button[aria-pressed="true"]');
    console.log('Active filter:', activeFilter ? activeFilter.getAttribute('aria-label') : 'None');
    return !activeFilter;
  });
  console.log(`No active filter: ${noActiveFilter}`);
  expect(noActiveFilter).toBe(true);

  // Verify that more items are displayed (should be more than when filtered)
  const finalItems = await page.$$('.portfolio-item');
  console.log(`Final items count: ${finalItems.length}`);
  expect(finalItems.length).toBeGreaterThan(0);

  // Get the final client names to verify diversity
  const finalClientNames = await page.evaluate(() => {
    const items = document.querySelectorAll('.portfolio-item');
    return Array.from(items).map(item => {
      const clientLogo = item.querySelector('.portfolio-item-client-logo');
      return clientLogo ? clientLogo.alt : 'Unknown';
    });
  });
  console.log('Final client names:', finalClientNames);

  // Verify that we have a diverse set of clients (not just one client)
  const uniqueClients = new Set(finalClientNames.map(name => name.split(' ')[0]));
  console.log(`Unique clients count: ${uniqueClients.size}`);
  expect(uniqueClients.size).toBeGreaterThan(1);
});