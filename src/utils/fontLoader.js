/**
 * Font Loader Utility
 * Provides utilities for preloading and managing fonts
 */

// Font categories for staged loading
const FONT_STAGES = {
  CRITICAL: 'critical',   // Needed for above-the-fold content
  IMPORTANT: 'important', // Needed for content that appears shortly after load
  COMPLETE: 'complete'    // All remaining fonts
};

// Font definitions with metadata
const FONTS = {
  // Gotham Narrow fonts
  'gotham-narrow-regular': {
    family: 'Gotham Narrow',
    weight: 400,
    style: 'normal',
    url: './assets/fonts/gotham-narrow/gothamnarrow-book-webfont.woff2',
    fallback: 'Arial, sans-serif',
    stage: FONT_STAGES.CRITICAL,
    subsetUrl: './assets/fonts/subsets/gotham-narrow-regular-subset.woff2'
  },
  'gotham-narrow-medium': {
    family: 'Gotham Narrow',
    weight: 500,
    style: 'normal',
    url: './assets/fonts/gotham-narrow/gothamnarrow-medium-webfont.woff2',
    fallback: 'Arial, sans-serif',
    stage: FONT_STAGES.IMPORTANT
  },
  'gotham-narrow-bold': {
    family: 'Gotham Narrow',
    weight: 700,
    style: 'normal',
    url: './assets/fonts/gotham-narrow/gothamnarrow-bold-webfont.woff2',
    fallback: 'Arial, sans-serif',
    stage: FONT_STAGES.CRITICAL,
    subsetUrl: './assets/fonts/subsets/gotham-narrow-bold-subset.woff2'
  },
  'gotham-narrow-italic': {
    family: 'Gotham Narrow',
    weight: 400,
    style: 'italic',
    url: './assets/fonts/gotham-narrow/gothamnarrow-bookitalic-webfont.woff2',
    fallback: 'Arial, sans-serif',
    stage: FONT_STAGES.COMPLETE
  },

  // Greycliff CF fonts
  'greycliff-cf-light': {
    family: 'Greycliff CF',
    weight: 400,
    style: 'normal',
    url: './assets/fonts/greycliff-cf/greycliffcf-light-webfont.woff2',
    fallback: 'Helvetica, sans-serif',
    stage: FONT_STAGES.CRITICAL,
    subsetUrl: './assets/fonts/subsets/greycliff-cf-light-subset.woff2'
  },
  'greycliff-cf-medium': {
    family: 'Greycliff CF',
    weight: 500,
    style: 'normal',
    url: './assets/fonts/greycliff-cf/greycliffcf-medium-webfont.woff2',
    fallback: 'Helvetica, sans-serif',
    stage: FONT_STAGES.IMPORTANT
  },
  'greycliff-cf-bold': {
    family: 'Greycliff CF',
    weight: 700,
    style: 'normal',
    url: './assets/fonts/greycliff-cf/greycliffcf-bold-webfont.woff2',
    fallback: 'Helvetica, sans-serif',
    stage: FONT_STAGES.IMPORTANT
  },
  'greycliff-cf-demibold': {
    family: 'Greycliff CF',
    weight: 900,
    style: 'normal',
    url: './assets/fonts/greycliff-cf/greycliffcf-demibold-webfont.woff2',
    fallback: 'Helvetica, sans-serif',
    stage: FONT_STAGES.COMPLETE
  }
};

// Get fonts by stage
const getFontsByStage = (stage) => {
  return Object.values(FONTS).filter(font => font.stage === stage);
};

// Critical fonts that should be loaded immediately
const CRITICAL_FONTS = getFontsByStage(FONT_STAGES.CRITICAL);

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
 * Preload fonts by stage
 * @param {string} stage - Font stage to preload
 * @returns {Promise} - Promise that resolves when all fonts in the stage are loaded
 */
export const preloadFontsByStage = (stage) => {
  // Check if the Font Loading API is supported
  if (!('FontFace' in window)) {
    console.warn('Font Loading API is not supported in this browser');
    return Promise.resolve([]);
  }

  // Get fonts for the specified stage
  const fontsToLoad = getFontsByStage(stage);

  // Preload all fonts in the stage
  return Promise.all(fontsToLoad.map(preloadFont));
};

/**
 * Preload critical fonts
 * @returns {Promise} - Promise that resolves when all critical fonts are loaded
 */
export const preloadCriticalFonts = () => {
  return preloadFontsByStage(FONT_STAGES.CRITICAL);
};

/**
 * Preload important fonts
 * @returns {Promise} - Promise that resolves when all important fonts are loaded
 */
export const preloadImportantFonts = () => {
  return preloadFontsByStage(FONT_STAGES.IMPORTANT);
};

/**
 * Preload all remaining fonts
 * @returns {Promise} - Promise that resolves when all remaining fonts are loaded
 */
export const preloadCompleteFonts = () => {
  return preloadFontsByStage(FONT_STAGES.COMPLETE);
};

/**
 * Add font preload links to the document head
 * @param {Array} fonts - Array of font objects to preload
 */
export const addFontPreloadLinks = (fonts = CRITICAL_FONTS) => {
  fonts.forEach((font) => {
    // Prefer subset URL for critical fonts if available
    const url = font.subsetUrl || font.url;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';

    document.head.appendChild(link);
  });
};

/**
 * Generate font-face CSS for subsets
 * @returns {string} - CSS for font subsets
 */
export const generateSubsetCSS = () => {
  const criticalFonts = getFontsByStage(FONT_STAGES.CRITICAL);

  return criticalFonts.filter(font => font.subsetUrl).map(font => `
@font-face {
  font-family: '${font.family} Subset';
  src: url('${font.subsetUrl}') format('woff2');
  font-weight: ${font.weight};
  font-style: ${font.style};
  font-display: swap;
}
  `).join('');
};

/**
 * Apply font loading optimizations
 */
export const applyFontLoadingOptimizations = () => {
  // Add class to indicate font loading state
  document.documentElement.classList.add('fonts-loading');

  // Add inline style for font subsets
  const style = document.createElement('style');
  style.textContent = generateSubsetCSS();
  document.head.appendChild(style);

  // Add font-display: swap to all font-face rules
  const fontDisplayStyle = document.createElement('style');
  fontDisplayStyle.textContent = `
    @font-face {
      font-display: swap !important;
    }
  `;
  document.head.appendChild(fontDisplayStyle);
};

/**
 * Initialize font loading with staged approach
 * This function should be called as early as possible in the application lifecycle
 */
export const initFontLoading = () => {
  // Apply optimizations first
  applyFontLoadingOptimizations();

  // Add preload links for critical fonts
  addFontPreloadLinks(CRITICAL_FONTS);

  // Stage 1: Load critical fonts
  preloadCriticalFonts()
    .then(() => {
      console.log('Critical fonts loaded successfully');
      // Add a class to indicate critical fonts are loaded
      document.documentElement.classList.add('fonts-critical-loaded');

      // Stage 2: Load important fonts after a short delay
      setTimeout(() => {
        preloadImportantFonts()
          .then(() => {
            console.log('Important fonts loaded successfully');
            // Add a class to indicate important fonts are loaded
            document.documentElement.classList.add('fonts-important-loaded');

            // Stage 3: Load remaining fonts after user interaction or idle time
            if ('requestIdleCallback' in window) {
              requestIdleCallback(() => {
                preloadCompleteFonts()
                  .then(() => {
                    console.log('All fonts loaded successfully');
                    // Add a class to indicate all fonts are loaded
                    document.documentElement.classList.add('fonts-loaded');
                    // Remove the loading class
                    document.documentElement.classList.remove('fonts-loading');
                  });
              }, { timeout: 5000 });
            } else {
              // Fallback for browsers without requestIdleCallback
              setTimeout(() => {
                preloadCompleteFonts()
                  .then(() => {
                    console.log('All fonts loaded successfully');
                    document.documentElement.classList.add('fonts-loaded');
                    document.documentElement.classList.remove('fonts-loading');
                  });
              }, 2000);
            }
          });
      }, 500);
    })
    .catch((error) => {
      console.error('Failed to preload critical fonts:', error);
      // Remove the loading class to ensure content is visible even if fonts fail to load
      document.documentElement.classList.remove('fonts-loading');
    });
};
