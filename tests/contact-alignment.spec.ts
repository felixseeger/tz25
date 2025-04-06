import { test, expect } from '@playwright/test';

// Test suite for contact form alignment
test.describe('Contact Form Alignment', () => {
  // Setup for each test
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:5179/');

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Scroll to the contact section
    await page.evaluate(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Wait for the scroll animation to complete
    await page.waitForTimeout(1000);
  });

  // Test the contact form headline alignment
  test('Contact form headline is left-aligned', async ({ page }) => {
    // Check if the contact section is visible
    const contactSection = await page.locator('section.contact-section');
    await expect(contactSection).toBeVisible();

    // Check if the contact headline is visible
    const contactHeadline = await page.locator('.contact-section .contact-heading');
    await expect(contactHeadline).toBeVisible();

    // Get the bounding box of the headline
    const headlineBox = await contactHeadline.boundingBox();

    // Get the bounding box of the contact section
    const sectionBox = await contactSection.boundingBox();

    if (headlineBox && sectionBox) {
      // Check if the headline is left-aligned (within a reasonable margin)
      // We consider it left-aligned if it's within 100px of the left edge of the section
      // or if it's aligned with the form fields
      const leftMargin = headlineBox.x - sectionBox.x;
      expect(leftMargin).toBeLessThan(100);
    }

    // Take a screenshot for visual verification
    await page.screenshot({ path: 'test-results/contact-headline-alignment.png', fullPage: false });
  });

  // Test the contact form input fields alignment
  test('Contact form input fields are left-aligned', async ({ page }) => {
    // Check if the contact form is visible
    const contactForm = await page.locator('form.contact-form');
    await expect(contactForm).toBeVisible();

    // Get all input fields
    const inputFields = await page.locator('.contact-form input, .contact-form textarea');
    const count = await inputFields.count();
    expect(count).toBeGreaterThan(0);

    // Get the bounding boxes of all input fields
    const inputBoxes = [];
    for (let i = 0; i < count; i++) {
      const input = inputFields.nth(i);
      const box = await input.boundingBox();
      if (box) {
        inputBoxes.push(box);
      }
    }

    // Check if all input fields have the same left alignment (within a small margin)
    if (inputBoxes.length > 1) {
      const firstInputLeft = inputBoxes[0].x;
      for (let i = 1; i < inputBoxes.length; i++) {
        // We're checking if the fields are roughly aligned vertically, not exactly aligned
        // This is because the form has a grid layout with two columns
        const isInSameColumn = Math.abs(inputBoxes[i].x - firstInputLeft) < 10 || Math.abs(inputBoxes[i].x - firstInputLeft) > 350;
        expect(isInSameColumn).toBeTruthy();
      }
    }

    // Take a screenshot for visual verification
    await page.screenshot({ path: 'test-results/contact-inputs-alignment.png', fullPage: false });
  });

  // Test the contact form headline and input fields alignment
  test('Contact form headline and input fields have the same left alignment', async ({ page }) => {
    // Get the contact headline
    const contactHeadline = await page.locator('.contact-section .contact-heading');
    const headlineBox = await contactHeadline.boundingBox();

    // Get the first input field
    const nameInput = await page.locator('input[name="name"]');
    const nameInputBox = await nameInput.boundingBox();

    if (headlineBox && nameInputBox) {
      // Check if the headline and input field have the same left alignment (within a small margin)
      expect(Math.abs(headlineBox.x - nameInputBox.x)).toBeLessThan(20);
    }

    // Take a screenshot for visual verification
    await page.screenshot({ path: 'test-results/contact-headline-input-alignment.png', fullPage: false });
  });
});
