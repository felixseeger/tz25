import { test, expect } from '@playwright/test';

test.describe('Contact Form Submission Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Scroll to the contact section
    await page.evaluate(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Wait for the scroll animation to complete
    await page.waitForTimeout(1000);
  });

  test('Contact section loads correctly', async ({ page }) => {
    // Check if contact section is visible
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    
    // Check if contact form is visible
    const contactForm = contactSection.locator('.contact-form');
    await expect(contactForm).toBeVisible();
    
    // Check if form fields are visible
    const nameInput = contactForm.locator('#name');
    await expect(nameInput).toBeVisible();
    
    const emailInput = contactForm.locator('#email');
    await expect(emailInput).toBeVisible();
    
    const subjectInput = contactForm.locator('#betreff');
    await expect(subjectInput).toBeVisible();
    
    const messageInput = contactForm.locator('#anmerkungen');
    await expect(messageInput).toBeVisible();
    
    // Check if submit button is visible
    const submitButton = contactForm.locator('.submit-image-btn');
    await expect(submitButton).toBeVisible();
  });

  test('Form validation works correctly', async ({ page }) => {
    // Get the contact form
    const contactForm = page.locator('.contact-form');
    
    // Try to submit the empty form
    const submitButton = contactForm.locator('.submit-image-btn');
    await submitButton.click();
    
    // Check if validation errors are shown
    // Wait a moment for validation to complete
    await page.waitForTimeout(500);
    
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
    
    // Name field should no longer have an error
    await expect(page.locator('.form-group:has(#name)')).not.toHaveClass(/has-error/);
    
    // But email and subject should still have errors
    await expect(emailError).toBeVisible();
    await expect(subjectError).toBeVisible();
    
    // Fill in an invalid email
    await page.locator('#email').fill('invalid-email');
    
    // Try to submit again
    await submitButton.click();
    await page.waitForTimeout(500);
    
    // Email field should still have an error due to invalid format
    await expect(emailError).toBeVisible();
    
    // Fill in a valid email
    await page.locator('#email').fill('test@example.com');
    
    // Try to submit again
    await submitButton.click();
    await page.waitForTimeout(500);
    
    // Email field should no longer have an error
    await expect(page.locator('.form-group:has(#email)')).not.toHaveClass(/has-error/);
    
    // But subject should still have an error
    await expect(subjectError).toBeVisible();
  });

  test('Form submission flow works correctly', async ({ page }) => {
    // Mock the EmailJS send function to prevent actual email sending
    await page.addInitScript(() => {
      window.emailjs = {
        send: () => Promise.resolve({ status: 200, text: 'OK' })
      };
    });
    
    // Get the contact form
    const contactForm = page.locator('.contact-form');
    
    // Fill in all required fields
    await page.locator('#name').fill('Test User');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#firma').fill('Test Company');
    await page.locator('#betreff').fill('Test Subject');
    await page.locator('#anmerkungen').fill('This is a test message.');
    
    // Submit the form
    const submitButton = contactForm.locator('.submit-image-btn');
    
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
    
    // Check for success message
    // Note: This might need adjustment based on how your form handles success
    const successMessage = page.locator('.success-message');
    
    // Wait for success message to appear (with a timeout)
    try {
      await expect(successMessage).toBeVisible({ timeout: 5000 });
    } catch (e) {
      // If no success message appears, check if form was reset
      // This is an alternative way to verify submission worked
      const nameInput = page.locator('#name');
      const nameValue = await nameInput.inputValue();
      
      // Either the success message should be visible or the form should be reset
      expect(nameValue === '' || await successMessage.isVisible()).toBeTruthy();
    }
  });

  test('Form field interactions work correctly', async ({ page }) => {
    // Test focus and blur events on form fields
    
    // Name field
    const nameInput = page.locator('#name');
    
    // Check initial state
    await expect(page.locator('.form-group:has(#name)')).not.toHaveClass(/has-value/);
    
    // Focus the field
    await nameInput.focus();
    
    // Check if label is shown/positioned correctly on focus
    await expect(page.locator('.form-group:has(#name)')).toHaveClass(/has-value/);
    
    // Enter a value
    await nameInput.fill('Test User');
    
    // Blur the field
    await nameInput.blur();
    
    // Check if label remains visible after blur with value
    await expect(page.locator('.form-group:has(#name)')).toHaveClass(/has-value/);
    
    // Clear the field
    await nameInput.fill('');
    await nameInput.blur();
    
    // Check if label is hidden after blur with empty value
    await expect(page.locator('.form-group:has(#name)')).not.toHaveClass(/has-value/);
    
    // Test the same for email field
    const emailInput = page.locator('#email');
    await emailInput.focus();
    await expect(page.locator('.form-group:has(#email)')).toHaveClass(/has-value/);
    await emailInput.fill('test@example.com');
    await emailInput.blur();
    await expect(page.locator('.form-group:has(#email)')).toHaveClass(/has-value/);
  });
});
