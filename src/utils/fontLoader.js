/**
 * Font Loader Utility
 * Provides utilities for preloading and managing fonts
 */

// List of critical fonts to preload
const CRITICAL_FONTS = [
  {
    family: 'Gotham Narrow',
    weight: 400,
    style: 'normal',
    url: '/src/assets/fonts/gotham-narrow/gothamnarrow-book-webfont.woff2'
  },
  {
    family: 'Gotham Narrow',
    weight: 700,
    style: 'normal',
    url: '/src/assets/fonts/gotham-narrow/gothamnarrow-bold-webfont.woff2'
  },
  {
    family: 'Greycliff CF',
    weight: 400,
    style: 'normal',
    url: '/src/assets/fonts/greycliff-cf/greycliffcf-light-webfont.woff2'
  }
];

/**
 * Preload a single font
 * @param {Object} font - Font configuration
 * @returns {Promise} - Promise that resolves when the font is loaded
 */
const preloadFont = (font) => {
  return new Promise((resolve, reject) => {
    // Create a new FontFace object
    const fontFace = new FontFace(
      font.family,
      `url(${font.url})`,
      {
        weight: font.weight,
        style: font.style
      }
    );

    // Load the font
    fontFace.load()
      .then((loadedFace) => {
        // Add the loaded font to the document fonts
        document.fonts.add(loadedFace);
        resolve(loadedFace);
      })
      .catch((error) => {
        console.error(`Failed to load font: ${font.family}`, error);
        reject(error);
      });
  });
};

/**
 * Preload critical fonts
 * @returns {Promise} - Promise that resolves when all critical fonts are loaded
 */
export const preloadCriticalFonts = () => {
  // Check if the Font Loading API is supported
  if (!('FontFace' in window)) {
    console.warn('Font Loading API is not supported in this browser');
    return Promise.resolve();
  }

  // Preload all critical fonts
  return Promise.all(CRITICAL_FONTS.map(preloadFont));
};

/**
 * Add font preload links to the document head
 * This is an alternative approach for browsers that don't support the Font Loading API
 */
export const addFontPreloadLinks = () => {
  CRITICAL_FONTS.forEach((font) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font.url;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    
    document.head.appendChild(link);
  });
};

/**
 * Initialize font loading
 * This function should be called as early as possible in the application lifecycle
 */
export const initFontLoading = () => {
  // Add preload links for all browsers
  addFontPreloadLinks();
  
  // Use the Font Loading API if available
  preloadCriticalFonts()
    .then(() => {
      console.log('Critical fonts loaded successfully');
      // Add a class to the document to indicate that fonts are loaded
      document.documentElement.classList.add('fonts-loaded');
    })
    .catch((error) => {
      console.error('Failed to preload critical fonts:', error);
    });
};
