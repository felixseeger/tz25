/**
 * Vite plugin for injecting Content Security Policy
 * 
 * This plugin injects the appropriate Content Security Policy meta tag
 * into the HTML based on the current environment.
 */

import { generateCSPMetaTag } from '../utils/cspConfig';

/**
 * Create a Vite plugin for injecting CSP
 * @param {Object} options - Plugin options
 * @returns {Object} - Vite plugin
 */
export default function vitePluginCSP(options = {}) {
  const { env = process.env.NODE_ENV || 'production' } = options;
  
  return {
    name: 'vite-plugin-csp',
    
    transformIndexHtml(html) {
      // Generate CSP meta tag
      const cspMetaTag = generateCSPMetaTag(env);
      
      // Replace the placeholder CSP meta tag with the generated one
      return html.replace(
        /<meta http-equiv="Content-Security-Policy"[^>]*>/,
        cspMetaTag
      );
    }
  };
}
