import { test, expect } from '@playwright/test';

test.describe('Complete Site Navigation Journey', () => {
  test('User can navigate through all main sections of the site', async ({ page }) => {
    // Start at the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Verify we're at the hero section
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();
    
    // Take a screenshot of the hero section
    await page.screenshot({ path: 'test-results/e2e/01-hero-section.png', fullPage: false });
    
    // Scroll to the journey section
    await page.evaluate(() => {
      document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Verify we're at the journey section
    const journeySection = page.locator('#journey');
    await expect(journeySection).toBeVisible();
    
    // Take a screenshot of the journey section
    await page.screenshot({ path: 'test-results/e2e/02-journey-section.png', fullPage: false });
    
    // Scroll to the testimonials section
    await page.evaluate(() => {
      document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Verify we're at the testimonials section
    const testimonialsSection = page.locator('#testimonials');
    await expect(testimonialsSection).toBeVisible();
    
    // Take a screenshot of the testimonials section
    await page.screenshot({ path: 'test-results/e2e/03-testimonials-section.png', fullPage: false });
    
    // Scroll to the history section
    await page.evaluate(() => {
      document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Verify we're at the history section
    const historySection = page.locator('#history');
    await expect(historySection).toBeVisible();
    
    // Take a screenshot of the history section
    await page.screenshot({ path: 'test-results/e2e/04-history-section.png', fullPage: false });
    
    // Scroll to the team section
    await page.evaluate(() => {
      document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Verify we're at the team section
    const teamSection = page.locator('#team');
    await expect(teamSection).toBeVisible();
    
    // Take a screenshot of the team section
    await page.screenshot({ path: 'test-results/e2e/05-team-section.png', fullPage: false });
    
    // Scroll to the services section
    await page.evaluate(() => {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Verify we're at the services section
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeVisible();
    
    // Take a screenshot of the services section
    await page.screenshot({ path: 'test-results/e2e/06-services-section.png', fullPage: false });
    
    // Scroll to the brand section
    await page.evaluate(() => {
      document.getElementById('brand')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Verify we're at the brand section
    const brandSection = page.locator('#brand');
    await expect(brandSection).toBeVisible();
    
    // Take a screenshot of the brand section
    await page.screenshot({ path: 'test-results/e2e/07-brand-section.png', fullPage: false });
    
    // Scroll to the portfolio section
    await page.evaluate(() => {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Verify we're at the portfolio section
    const portfolioSection = page.locator('#portfolio');
    await expect(portfolioSection).toBeVisible();
    
    // Take a screenshot of the portfolio section
    await page.screenshot({ path: 'test-results/e2e/08-portfolio-section.png', fullPage: false });
    
    // Scroll to the contact section
    await page.evaluate(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Verify we're at the contact section
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    
    // Take a screenshot of the contact section
    await page.screenshot({ path: 'test-results/e2e/09-contact-section.png', fullPage: false });
    
    // Scroll to the footer section
    await page.evaluate(() => {
      document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Verify we're at the footer section
    const footerSection = page.locator('#footer');
    await expect(footerSection).toBeVisible();
    
    // Take a screenshot of the footer section
    await page.screenshot({ path: 'test-results/e2e/10-footer-section.png', fullPage: false });
    
    // Test the scroll-to-top button
    const scrollToTopButton = page.locator('.scroll-to-top');
    if (await scrollToTopButton.isVisible()) {
      await scrollToTopButton.click();
      await page.waitForTimeout(1000); // Wait for scroll animation
      
      // Verify we're back at the top
      const scrollPosition = await page.evaluate(() => window.scrollY);
      expect(scrollPosition).toBeLessThan(100);
      
      // Take a screenshot of the top of the page
      await page.screenshot({ path: 'test-results/e2e/11-back-to-top.png', fullPage: false });
    }
  });
  
  test('User can navigate using section scroll indicators', async ({ page }) => {
    // Start at the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check if section scroll indicator is visible
    const scrollIndicator = page.locator('.section-scroll-indicator');
    
    // If the scroll indicator is visible, use it to navigate
    if (await scrollIndicator.isVisible()) {
      // Take a screenshot before clicking
      await page.screenshot({ path: 'test-results/e2e/scroll-indicator-before.png', fullPage: false });
      
      // Click the scroll indicator
      await scrollIndicator.click();
      
      // Wait for the scroll animation to complete
      await page.waitForTimeout(1000);
      
      // Take a screenshot after clicking
      await page.screenshot({ path: 'test-results/e2e/scroll-indicator-after.png', fullPage: false });
      
      // Verify we've scrolled to the next section
      const scrollPosition = await page.evaluate(() => window.scrollY);
      expect(scrollPosition).toBeGreaterThan(100);
    }
  });
  
  test('User can navigate using the contact button', async ({ page }) => {
    // Start at the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check if contact button is visible
    const contactButton = page.locator('.contact-button');
    
    // If the contact button is visible, use it to navigate
    if (await contactButton.isVisible()) {
      // Take a screenshot before clicking
      await page.screenshot({ path: 'test-results/e2e/contact-button-before.png', fullPage: false });
      
      // Click the contact button
      await contactButton.click();
      
      // Wait for the scroll animation to complete
      await page.waitForTimeout(1000);
      
      // Take a screenshot after clicking
      await page.screenshot({ path: 'test-results/e2e/contact-button-after.png', fullPage: false });
      
      // Verify we've scrolled to the contact section
      const contactSection = page.locator('#contact');
      await expect(contactSection).toBeInViewport();
    }
  });
});
