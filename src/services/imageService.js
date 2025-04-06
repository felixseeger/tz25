/**
 * Image Service - Utilities for image optimization and management
 */

/**
 * Get the appropriate image size based on the viewport width
 * @param {Object} options - Options for determining image size
 * @param {number} options.baseWidth - Base width of the image
 * @param {number} options.maxWidth - Maximum width of the image
 * @param {number} options.viewportWidth - Current viewport width
 * @param {number} options.density - Device pixel density (default: 1)
 * @returns {number} - The calculated image width
 */
export const getResponsiveImageSize = ({ baseWidth, maxWidth, viewportWidth, density = 1 }) => {
  // Calculate the appropriate image width based on viewport and device density
  const calculatedWidth = Math.min(baseWidth, viewportWidth * 0.8) * density;
  
  // Ensure we don't exceed the maximum width
  return Math.min(calculatedWidth, maxWidth);
};

/**
 * Generate a srcset attribute for responsive images
 * @param {Object} options - Options for generating srcset
 * @param {string} options.basePath - Base path of the image without extension
 * @param {string} options.extension - Image file extension (e.g., 'jpg', 'png')
 * @param {Array<number>} options.widths - Array of image widths to include in srcset
 * @returns {string} - The srcset attribute value
 */
export const generateSrcset = ({ basePath, extension, widths }) => {
  return widths
    .map(width => `${basePath}-${width}w.${extension} ${width}w`)
    .join(', ');
};

/**
 * Generate a sizes attribute for responsive images
 * @param {Object} options - Options for generating sizes
 * @param {Array<Object>} options.breakpoints - Array of breakpoint objects with min, max, and size properties
 * @returns {string} - The sizes attribute value
 */
export const generateSizes = ({ breakpoints }) => {
  const sizeQueries = breakpoints.map(bp => {
    if (bp.min && bp.max) {
      return `(min-width: ${bp.min}px) and (max-width: ${bp.max}px) ${bp.size}`;
    } else if (bp.min) {
      return `(min-width: ${bp.min}px) ${bp.size}`;
    } else if (bp.max) {
      return `(max-width: ${bp.max}px) ${bp.size}`;
    }
    return bp.size;
  });
  
  return sizeQueries.join(', ');
};

/**
 * Check if the Intersection Observer API is supported
 * @returns {boolean} - Whether Intersection Observer is supported
 */
export const isIntersectionObserverSupported = () => {
  return 'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype;
};

/**
 * Preload critical images
 * @param {Array<string>} imagePaths - Array of image paths to preload
 * @returns {Promise<Array>} - Promise that resolves when all images are preloaded
 */
export const preloadImages = (imagePaths) => {
  return Promise.all(
    imagePaths.map(path => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ path, status: 'loaded' });
        img.onerror = () => reject({ path, status: 'error' });
        img.src = path;
      });
    })
  );
};

/**
 * Get image dimensions
 * @param {string} src - Image source URL
 * @returns {Promise<Object>} - Promise that resolves with image width and height
 */
export const getImageDimensions = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        aspectRatio: img.width / img.height
      });
    };
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`));
    };
    img.src = src;
  });
};

/**
 * Check if WebP format is supported by the browser
 * @returns {Promise<boolean>} - Promise that resolves with whether WebP is supported
 */
export const isWebPSupported = async () => {
  if (!self.createImageBitmap) return false;
  
  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  
  return createImageBitmap(blob).then(() => true, () => false);
};

/**
 * Get the optimal image format based on browser support
 * @returns {Promise<string>} - Promise that resolves with the optimal format ('webp', 'jpg', etc.)
 */
export const getOptimalImageFormat = async () => {
  const webpSupported = await isWebPSupported();
  return webpSupported ? 'webp' : 'jpg';
};

/**
 * Generate a placeholder color from an image
 * @param {string} src - Image source URL
 * @returns {Promise<string>} - Promise that resolves with a CSS color value
 */
export const generatePlaceholderColor = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      // Create a canvas to analyze the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size to 1x1 to get average color
      canvas.width = 1;
      canvas.height = 1;
      
      // Draw the image resized to 1x1
      ctx.drawImage(img, 0, 0, 1, 1);
      
      // Get the pixel data
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      
      // Return the color as a hex string
      resolve(`#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`);
    };
    
    img.onerror = () => {
      // Return a default color on error
      resolve('#f0f0f0');
    };
    
    img.src = src;
  });
};
