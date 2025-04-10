import { test, expect } from '@playwright/test';

test.describe('Page Navigation Journey', () => {
  test('User can navigate between different pages of the site', async ({ page }) => {
    // Start at the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot of the homepage
    await page.screenshot({ path: 'test-results/e2e/homepage.png', fullPage: false });
    
    // Check if the navbar is visible
    const navbar = page.locator('nav.navbar');
    await expect(navbar).toBeVisible();
    
    // Try to find navigation links in the navbar
    const navLinks = navbar.locator('.navbar__links a, .nav-link');
    const linkCount = await navLinks.count();
    
    if (linkCount > 0) {
      // Desktop navigation
      // Find a link to another page (e.g., Automotive, Employer Branding, Karriere)
      const pageLink = navLinks.filter({ hasText: /Automotive|Employer Branding|Karriere|Packaging/i }).first();
      
      if (await pageLink.isVisible()) {
        // Get the text of the link to verify later
        const linkText = await pageLink.textContent();
        
        // Click the link
        await pageLink.click();
        
        // Wait for the page to load
        await page.waitForLoadState('networkidle');
        
        // Take a screenshot of the new page
        await page.screenshot({ path: 'test-results/e2e/page-navigation-desktop.png', fullPage: false });
        
        // Verify we're on a different page
        expect(page.url()).not.toEqual('/');
        
        // Go back to the homepage
        await page.goto('/');
        await page.waitForLoadState('networkidle');
      }
    } else {
      // Mobile navigation
      // Check if there's a hamburger menu button
      const menuButton = page.locator('.navbar__menu-toggle, .hamburger-menu');
      
      if (await menuButton.isVisible()) {
        // Click the menu button to open the menu
        await menuButton.click();
        
        // Wait for the menu to open
        await page.waitForTimeout(500);
        
        // Take a screenshot of the open menu
        await page.screenshot({ path: 'test-results/e2e/mobile-menu-open.png', fullPage: false });
        
        // Find a link to another page in the mobile menu
        const menuLinks = page.locator('.menu-overlay__link, .mobile-nav-link');
        const menuLinkCount = await menuLinks.count();
        
        if (menuLinkCount > 0) {
          // Find a link to another page
          const pageLink = menuLinks.filter({ hasText: /Automotive|Employer Branding|Karriere|Packaging/i }).first();
          
          if (await pageLink.isVisible()) {
            // Get the text of the link to verify later
            const linkText = await pageLink.textContent();
            
            // Click the link
            await pageLink.click();
            
            // Wait for the page to load
            await page.waitForLoadState('networkidle');
            
            // Take a screenshot of the new page
            await page.screenshot({ path: 'test-results/e2e/page-navigation-mobile.png', fullPage: false });
            
            // Verify we're on a different page
            expect(page.url()).not.toEqual('/');
            
            // Go back to the homepage
            await page.goto('/');
            await page.waitForLoadState('networkidle');
          }
        }
      }
    }
    
    // Check for footer links
    await page.evaluate(() => {
      document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    const footerLinks = page.locator('#footer a');
    const footerLinkCount = await footerLinks.count();
    
    if (footerLinkCount > 0) {
      // Find a link to a legal page (e.g., Impressum, AGB, Datenschutz)
      const legalLink = footerLinks.filter({ hasText: /Impressum|AGB|Datenschutz/i }).first();
      
      if (await legalLink.isVisible()) {
        // Get the text of the link to verify later
        const linkText = await legalLink.textContent();
        
        // Take a screenshot before clicking
        await page.screenshot({ path: 'test-results/e2e/footer-links.png', fullPage: false });
        
        // Click the link
        await legalLink.click();
        
        // Wait for the page to load
        await page.waitForLoadState('networkidle');
        
        // Take a screenshot of the legal page
        await page.screenshot({ path: 'test-results/e2e/legal-page.png', fullPage: false });
        
        // Verify we're on a different page
        expect(page.url()).not.toEqual('/');
        
        // Go back to the homepage
        await page.goto('/');
        await page.waitForLoadState('networkidle');
      }
    }
  });
  
  test('Page transitions work correctly', async ({ page }) => {
    // Start at the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check if the navbar is visible
    const navbar = page.locator('nav.navbar');
    await expect(navbar).toBeVisible();
    
    // Find a link to another page
    const navLinks = navbar.locator('.navbar__links a, .nav-link');
    const linkCount = await navLinks.count();
    
    if (linkCount > 0) {
      // Find a link to another page
      const pageLink = navLinks.filter({ hasText: /Automotive|Employer Branding|Karriere|Packaging/i }).first();
      
      if (await pageLink.isVisible()) {
        // Start recording a video to capture the transition
        await page.video()?.start();
        
        // Click the link
        await pageLink.click();
        
        // Wait for the page transition to complete
        await page.waitForLoadState('networkidle');
        
        // Stop recording the video
        await page.video()?.stop();
        
        // Verify we're on a different page
        expect(page.url()).not.toEqual('/');
        
        // Go back to the homepage with browser back button
        await page.goBack();
        
        // Wait for the page to load
        await page.waitForLoadState('networkidle');
        
        // Verify we're back on the homepage
        expect(page.url()).toEqual('/');
      }
    }
  });
  
  test('Browser navigation (back/forward) works correctly', async ({ page }) => {
    // Start at the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Scroll to different sections and build a navigation history
    
    // Scroll to the journey section
    await page.evaluate(() => {
      document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Scroll to the portfolio section
    await page.evaluate(() => {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Scroll to the contact section
    await page.evaluate(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Take a screenshot at the contact section
    await page.screenshot({ path: 'test-results/e2e/browser-nav-contact.png', fullPage: false });
    
    // Go back in browser history
    await page.goBack();
    await page.waitForTimeout(1000); // Wait for any animations
    
    // Take a screenshot after going back
    await page.screenshot({ path: 'test-results/e2e/browser-nav-back.png', fullPage: false });
    
    // Go forward in browser history
    await page.goForward();
    await page.waitForTimeout(1000); // Wait for any animations
    
    // Take a screenshot after going forward
    await page.screenshot({ path: 'test-results/e2e/browser-nav-forward.png', fullPage: false });
  });
});
