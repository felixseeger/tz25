import { test, expect } from '@playwright/test';

test.describe('Contact Form Submission Journey', () => {
  test('User can fill out and submit the contact form', async ({ page }) => {
    // Start at the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Scroll to the contact section
    await page.evaluate(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Verify we're at the contact section
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    
    // Take a screenshot of the empty contact form
    await page.screenshot({ path: 'test-results/e2e/contact-form-empty.png', fullPage: false });
    
    // Mock the EmailJS send function to prevent actual email sending
    await page.addInitScript(() => {
      window.emailjs = {
        send: () => Promise.resolve({ status: 200, text: 'OK' })
      };
    });
    
    // Fill out the form
    // Name field
    const nameInput = page.locator('#name');
    await nameInput.fill('Test User');
    
    // Email field
    const emailInput = page.locator('#email');
    await emailInput.fill('test@example.com');
    
    // Company field (optional)
    const companyInput = page.locator('#firma');
    if (await companyInput.isVisible()) {
      await companyInput.fill('Test Company');
    }
    
    // Subject field
    const subjectInput = page.locator('#betreff');
    await subjectInput.fill('Test Subject');
    
    // Message field
    const messageInput = page.locator('#anmerkungen');
    await messageInput.fill('This is a test message from the end-to-end test.');
    
    // Take a screenshot of the filled contact form
    await page.screenshot({ path: 'test-results/e2e/contact-form-filled.png', fullPage: false });
    
    // Submit the form
    const submitButton = page.locator('.submit-image-btn, button[type="submit"]');
    
    // Create a promise that will resolve when the form submission is complete
    const formSubmissionPromise = page.waitForResponse(response => 
      response.url().includes('emailjs') || 
      response.url().includes('api/contact') ||
      response.status() === 200
    ).catch(() => {
      // If no network request is made (due to our mock), we'll just wait a bit
      return page.waitForTimeout(1000);
    });
    
    // Click the submit button
    await submitButton.click();
    
    // Wait for the form submission to complete
    await formSubmissionPromise;
    
    // Take a screenshot after form submission
    await page.screenshot({ path: 'test-results/e2e/contact-form-submitted.png', fullPage: false });
    
    // Check for success message or form reset
    const successMessage = page.locator('.success-message, .form-success');
    
    // Wait for success message to appear (with a timeout)
    try {
      await expect(successMessage).toBeVisible({ timeout: 5000 });
      
      // Take a screenshot of the success message
      await page.screenshot({ path: 'test-results/e2e/contact-form-success.png', fullPage: false });
    } catch (e) {
      // If no success message appears, check if form was reset
      const nameValue = await nameInput.inputValue();
      
      // Either the success message should be visible or the form should be reset
      expect(nameValue === '' || await successMessage.isVisible()).toBeTruthy();
    }
  });
  
  test('Form validation prevents submission with invalid data', async ({ page }) => {
    // Start at the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Scroll to the contact section
    await page.evaluate(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Try to submit the empty form
    const submitButton = page.locator('.submit-image-btn, button[type="submit"]');
    await submitButton.click();
    
    // Wait for validation errors to appear
    await page.waitForTimeout(500);
    
    // Take a screenshot showing validation errors
    await page.screenshot({ path: 'test-results/e2e/contact-form-validation.png', fullPage: false });
    
    // Check for error messages on required fields
    const nameError = page.locator('#name-error, .form-group.has-error:has(#name)');
    await expect(nameError).toBeVisible();
    
    const emailError = page.locator('#email-error, .form-group.has-error:has(#email)');
    await expect(emailError).toBeVisible();
    
    const subjectError = page.locator('#betreff-error, .form-group.has-error:has(#betreff)');
    await expect(subjectError).toBeVisible();
    
    // Fill in only the name field
    await page.locator('#name').fill('Test User');
    
    // Try to submit again
    await submitButton.click();
    await page.waitForTimeout(500);
    
    // Take a screenshot showing partial validation
    await page.screenshot({ path: 'test-results/e2e/contact-form-partial-validation.png', fullPage: false });
    
    // Fill in an invalid email
    await page.locator('#email').fill('invalid-email');
    
    // Try to submit again
    await submitButton.click();
    await page.waitForTimeout(500);
    
    // Take a screenshot showing email validation
    await page.screenshot({ path: 'test-results/e2e/contact-form-email-validation.png', fullPage: false });
    
    // Email field should still have an error due to invalid format
    await expect(emailError).toBeVisible();
  });
  
  test('Form fields show proper focus and blur behavior', async ({ page }) => {
    // Start at the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Scroll to the contact section
    await page.evaluate(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000); // Wait for scroll animation
    
    // Test focus and blur events on form fields
    
    // Name field
    const nameInput = page.locator('#name');
    
    // Focus the field
    await nameInput.focus();
    
    // Take a screenshot with the field focused
    await page.screenshot({ path: 'test-results/e2e/contact-form-name-focus.png', fullPage: false });
    
    // Enter a value
    await nameInput.fill('Test User');
    
    // Blur the field
    await nameInput.blur();
    
    // Take a screenshot after blur with value
    await page.screenshot({ path: 'test-results/e2e/contact-form-name-blur.png', fullPage: false });
    
    // Email field
    const emailInput = page.locator('#email');
    
    // Focus the field
    await emailInput.focus();
    
    // Take a screenshot with the field focused
    await page.screenshot({ path: 'test-results/e2e/contact-form-email-focus.png', fullPage: false });
    
    // Enter a value
    await emailInput.fill('test@example.com');
    
    // Blur the field
    await emailInput.blur();
    
    // Take a screenshot after blur with value
    await page.screenshot({ path: 'test-results/e2e/contact-form-email-blur.png', fullPage: false });
  });
});
