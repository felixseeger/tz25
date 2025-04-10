/**
 * Content Security Policy Middleware
 * 
 * This middleware adds Content Security Policy headers to HTTP responses.
 * It can be used with Express.js or similar server frameworks.
 */

const { generateCSPHeader } = require('../../utils/cspConfig');

/**
 * Middleware function to add CSP headers to responses
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function cspMiddleware(req, res, next) {
  // Get environment from NODE_ENV or default to production
  const env = process.env.NODE_ENV || 'production';
  
  // Generate CSP header
  const cspHeader = generateCSPHeader(env);
  
  // Add CSP header to response
  res.set(cspHeader);
  
  // Add other security headers
  
  // X-Content-Type-Options prevents MIME type sniffing
  res.set('X-Content-Type-Options', 'nosniff');
  
  // X-Frame-Options prevents clickjacking
  res.set('X-Frame-Options', 'SAMEORIGIN');
  
  // X-XSS-Protection enables the browser's XSS filter
  res.set('X-XSS-Protection', '1; mode=block');
  
  // Referrer-Policy controls how much referrer information is sent
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions-Policy controls which browser features can be used
  res.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Continue to the next middleware
  next();
}

module.exports = cspMiddleware;
