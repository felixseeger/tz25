/**
 * Content Security Policy Configuration
 * 
 * This file defines the Content Security Policy (CSP) for the application.
 * CSP helps prevent cross-site scripting (XSS) and other code injection attacks
 * by controlling which resources can be loaded and executed.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
 */

/**
 * Generate CSP directives based on environment
 * @param {string} env - The environment ('development' or 'production')
 * @returns {Object} - Object with CSP directives
 */
export const generateCSPDirectives = (env = 'production') => {
  // Base CSP directives for all environments
  const directives = {
    // Default fallback - deny everything not explicitly allowed
    'default-src': ["'self'"],
    
    // Scripts - allow self, inline scripts with nonces, and specific external sources
    'script-src': [
      "'self'",
      "'unsafe-inline'", // For Vue's inline scripts (consider using nonces in production)
      "https://cdn.emailjs.com", // EmailJS
    ],
    
    // Styles - allow self and inline styles
    'style-src': [
      "'self'",
      "'unsafe-inline'" // For Vue's style binding
    ],
    
    // Fonts - allow self and data URIs
    'font-src': [
      "'self'",
      "data:"
    ],
    
    // Images - allow self, data URIs, and blob URLs
    'img-src': [
      "'self'",
      "data:",
      "blob:"
    ],
    
    // Media - allow self
    'media-src': ["'self'"],
    
    // Connect - allow self and specific external APIs
    'connect-src': [
      "'self'",
      "https://api.emailjs.com" // EmailJS API
    ],
    
    // Object - deny all
    'object-src': ["'none'"],
    
    // Frame - deny all
    'frame-src': ["'none'"],
    
    // Worker - allow self
    'worker-src': ["'self'"],
    
    // Manifest - allow self
    'manifest-src': ["'self'"],
    
    // Form action - allow self
    'form-action': ["'self'"],
    
    // Base URI - restrict to self
    'base-uri': ["'self'"],
    
    // Frame ancestors - restrict to self (prevents clickjacking)
    'frame-ancestors': ["'self'"],
    
    // Upgrade insecure requests
    'upgrade-insecure-requests': [],
    
    // Block all mixed content
    'block-all-mixed-content': []
  };
  
  // Add environment-specific directives
  if (env === 'development') {
    // Allow eval in development for hot module replacement
    directives['script-src'].push("'unsafe-eval'");
    
    // Allow WebSocket connections for HMR
    directives['connect-src'].push("ws:");
    
    // Allow inline styles for development tools
    directives['style-src'].push("'unsafe-inline'");
  } else {
    // Add Google Analytics in production if needed
    // directives['connect-src'].push("https://www.google-analytics.com");
    // directives['script-src'].push("https://www.googletagmanager.com");
  }
  
  return directives;
};

/**
 * Convert CSP directives object to CSP header string
 * @param {Object} directives - CSP directives object
 * @returns {string} - CSP header string
 */
export const formatCSPHeader = (directives) => {
  return Object.entries(directives)
    .map(([key, values]) => {
      if (values.length === 0) {
        return key;
      }
      return `${key} ${values.join(' ')}`;
    })
    .join('; ');
};

/**
 * Generate meta tag for CSP
 * @param {string} env - The environment ('development' or 'production')
 * @returns {string} - HTML meta tag with CSP
 */
export const generateCSPMetaTag = (env = 'production') => {
  const directives = generateCSPDirectives(env);
  const cspContent = formatCSPHeader(directives);
  
  return `<meta http-equiv="Content-Security-Policy" content="${cspContent}">`;
};

/**
 * Generate CSP header for server
 * @param {string} env - The environment ('development' or 'production')
 * @returns {Object} - Object with CSP header
 */
export const generateCSPHeader = (env = 'production') => {
  const directives = generateCSPDirectives(env);
  const cspContent = formatCSPHeader(directives);
  
  return {
    'Content-Security-Policy': cspContent
  };
};
