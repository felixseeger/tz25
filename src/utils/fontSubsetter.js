/**
 * Font Subsetter Utility
 * 
 * This utility helps generate CSS for font subsets containing only the characters
 * needed for critical text. This is useful for reducing the initial font size
 * and improving performance.
 * 
 * Note: The actual font subsetting would be done using tools like fonttools or glyphhanger
 * during the build process. This utility just generates the CSS for the subsetted fonts.
 */

// Critical text that should be displayed immediately
const CRITICAL_TEXT = {
  'hero-heading': 'TAKTZEIT',
  'hero-subheading': 'Kreativagentur',
  'nav-items': 'Home Services Portfolio Team Kontakt',
};

/**
 * Get unique characters from critical text
 * @returns {Set<string>} - Set of unique characters
 */
export const getUniqueCharacters = () => {
  const allText = Object.values(CRITICAL_TEXT).join('');
  return new Set(allText.split(''));
};

/**
 * Generate CSS for font subsets
 * @returns {string} - CSS for font subsets
 */
export const generateFontSubsetCSS = () => {
  const uniqueChars = getUniqueCharacters();
  const charRange = Array.from(uniqueChars).join('');
  
  return `
/* Font subsets for critical text (${uniqueChars.size} characters) */
/* Characters: ${charRange} */

@font-face {
  font-family: 'Gotham Narrow Subset';
  src: url('/fonts/subsets/gotham-narrow-subset.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  unicode-range: U+${Array.from(uniqueChars)
    .map(char => char.charCodeAt(0).toString(16).padStart(4, '0'))
    .join(', U+')};
}

@font-face {
  font-family: 'Greycliff CF Subset';
  src: url('/fonts/subsets/greycliff-cf-subset.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+${Array.from(uniqueChars)
    .map(char => char.charCodeAt(0).toString(16).padStart(4, '0'))
    .join(', U+')};
}
  `;
};

/**
 * Generate font loading HTML
 * @returns {string} - HTML for font loading
 */
export const generateFontLoadingHTML = () => {
  return `
<!-- Preload critical font subsets -->
<link rel="preload" href="/fonts/subsets/gotham-narrow-subset.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/subsets/greycliff-cf-subset.woff2" as="font" type="font/woff2" crossorigin>

<!-- Preconnect to font CDN (if using) -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Font loading CSS -->
<style>
  /* Initially hide text to prevent FOUT */
  .fonts-loading {
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
  }
  
  /* Show text when fonts are loaded */
  .fonts-loaded .fonts-loading {
    opacity: 1;
  }
  
  /* Apply font subsets to critical elements */
  .hero-heading {
    font-family: 'Gotham Narrow Subset', 'Gotham Narrow', sans-serif;
  }
  
  .hero-subheading {
    font-family: 'Greycliff CF Subset', 'Greycliff CF', sans-serif;
  }
</style>
  `;
};

/**
 * Generate font loading script
 * @returns {string} - JavaScript for font loading
 */
export const generateFontLoadingScript = () => {
  return `
<script>
  // Mark document as loading fonts
  document.documentElement.classList.add('fonts-loading');
  
  // Font loading detection
  if ('fonts' in document) {
    Promise.all([
      document.fonts.load('700 1em "Gotham Narrow"'),
      document.fonts.load('400 1em "Greycliff CF"')
    ]).then(() => {
      document.documentElement.classList.remove('fonts-loading');
      document.documentElement.classList.add('fonts-loaded');
    }).catch(() => {
      // Fallback if font loading fails
      document.documentElement.classList.remove('fonts-loading');
    });
  } else {
    // Fallback for browsers without font loading API
    document.documentElement.classList.remove('fonts-loading');
  }
</script>
  `;
};
