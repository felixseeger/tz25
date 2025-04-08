// @ts-check
import { test, expect } from '@playwright/test';

test('Hero image should display correctly', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');

  // Wait for the hero section to load
  await page.waitForSelector('.hero');

  // Check if the hero.svg image is visible
  const heroImage = page.locator('.hero__title-image--base');
  await expect(heroImage).toBeVisible();

  // Take a screenshot of the hero section
  await page.locator('.hero').screenshot({ path: 'hero-section.png' });

  // Check if the SVG contains the text elements
  const svgContent = await page.evaluate(() => {
    const img = document.querySelector('.hero__title-image--base');
    const svgUrl = img.getAttribute('src');
    return fetch(svgUrl)
      .then(response => response.text())
      .then(text => text);
  });

  // Verify the SVG contains the expected text elements
  expect(svgContent).toContain('WEMO');
  expect(svgContent).toContain('VESA');
  expect(svgContent).toContain('LES');

  // Verify the inner shadow filter is applied
  expect(svgContent).toContain('filter id="inner-shadow"');
  expect(svgContent).toContain('feOffset dx="0" dy="6"');
  expect(svgContent).toContain('feGaussianBlur stdDeviation="6"');
  expect(svgContent).toContain('slope="0.25"');
});

test('Testimonials section should have left-aligned text', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');

  // Scroll to the testimonials section
  await page.evaluate(() => {
    const testimonialsSection = document.querySelector('.testimonials');
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView();
    }
  });

  // Wait for the testimonials section to be visible
  await page.waitForSelector('.testimonials-header');

  // Take a screenshot of the testimonials section
  await page.locator('.testimonials').screenshot({ path: 'testimonials-section.png' });

  // Check if the testimonials title is left-aligned
  const titleStyle = await page.evaluate(() => {
    const title = document.querySelector('.testimonials-title');
    return window.getComputedStyle(title).textAlign;
  });
  expect(titleStyle).toBe('left');

  // Check if the testimonials subtitle is left-aligned
  const subtitleStyle = await page.evaluate(() => {
    const subtitle = document.querySelector('.testimonials-subtitle');
    return window.getComputedStyle(subtitle).textAlign;
  });
  expect(subtitleStyle).toBe('left');

  // Check if the testimonial text is left-aligned
  const textStyle = await page.evaluate(() => {
    const text = document.querySelector('.testimonial-text');
    return window.getComputedStyle(text).textAlign;
  });
  expect(textStyle).toBe('left');
});

test('Horizontal navigation should be centered', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');

  // Scroll to a section with horizontal navigation
  await page.evaluate(() => {
    const section = document.querySelector('.testimonials');
    if (section) {
      section.scrollIntoView();
    }
  });

  // Wait for the horizontal navigation to be visible
  await page.waitForSelector('.horizontal-nav');

  // Take a screenshot of the horizontal navigation
  await page.locator('.horizontal-nav').screenshot({ path: 'horizontal-nav.png' });

  // Check if the horizontal navigation is centered
  const navStyle = await page.evaluate(() => {
    const nav = document.querySelector('.horizontal-nav');
    return {
      justifyContent: window.getComputedStyle(nav).justifyContent,
      left: window.getComputedStyle(nav).left,
      right: window.getComputedStyle(nav).right,
      marginLeft: window.getComputedStyle(nav).marginLeft,
      marginRight: window.getComputedStyle(nav).marginRight
    };
  });

  expect(navStyle.justifyContent).toBe('center');
  expect(navStyle.marginLeft).toBe('auto');
  expect(navStyle.marginRight).toBe('auto');
});
