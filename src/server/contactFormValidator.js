/**
 * Server-side validation for contact form submissions
 * This would be used in a Node.js environment or serverless function
 */

// Regular expressions for validation (same as client-side for consistency)
const REGEX = {
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  TEXT: /^[a-zA-ZäöüÄÖÜß0-9\s.,!?()-_]*$/,
  COMPANY: /^[a-zA-ZäöüÄÖÜß0-9\s.,&()-_]*$/,
  SUBJECT: /^[a-zA-ZäöüÄÖÜß0-9\s.,!?()-_]*$/,
  MESSAGE: /^[a-zA-ZäöüÄÖÜß0-9\s.,!?@#$%&*()-_:;'"]*$/,
};

// Maximum lengths for fields
const MAX_LENGTHS = {
  NAME: 100,
  EMAIL: 100,
  COMPANY: 100,
  SUBJECT: 200,
  MESSAGE: 2000,
};

/**
 * Validates the contact form data
 * @param {Object} formData - The form data to validate
 * @returns {Object} - Object with isValid boolean and errors object
 */
function validateContactForm(formData) {
  const errors = {};
  
  // Validate required fields
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name is required';
  } else if (formData.name.length > MAX_LENGTHS.NAME) {
    errors.name = `Name must be less than ${MAX_LENGTHS.NAME} characters`;
  } else if (!REGEX.TEXT.test(formData.name)) {
    errors.name = 'Name contains invalid characters';
  }
  
  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (formData.email.length > MAX_LENGTHS.EMAIL) {
    errors.email = `Email must be less than ${MAX_LENGTHS.EMAIL} characters`;
  } else if (!REGEX.EMAIL.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!formData.betreff || formData.betreff.trim() === '') {
    errors.betreff = 'Subject is required';
  } else if (formData.betreff.length > MAX_LENGTHS.SUBJECT) {
    errors.betreff = `Subject must be less than ${MAX_LENGTHS.SUBJECT} characters`;
  } else if (!REGEX.SUBJECT.test(formData.betreff)) {
    errors.betreff = 'Subject contains invalid characters';
  }
  
  // Validate optional fields if they're not empty
  if (formData.firma && formData.firma.trim() !== '') {
    if (formData.firma.length > MAX_LENGTHS.COMPANY) {
      errors.firma = `Company name must be less than ${MAX_LENGTHS.COMPANY} characters`;
    } else if (!REGEX.COMPANY.test(formData.firma)) {
      errors.firma = 'Company name contains invalid characters';
    }
  }
  
  if (formData.anmerkungen && formData.anmerkungen.trim() !== '') {
    if (formData.anmerkungen.length > MAX_LENGTHS.MESSAGE) {
      errors.anmerkungen = `Message must be less than ${MAX_LENGTHS.MESSAGE} characters`;
    } else if (!REGEX.MESSAGE.test(formData.anmerkungen)) {
      errors.anmerkungen = 'Message contains invalid characters';
    }
  }
  
  // Check for CSRF token
  if (!formData.csrfToken) {
    errors.csrfToken = 'CSRF token is missing';
  }
  
  // Check for honeypot field (if implemented)
  if (formData.honeypot && formData.honeypot.trim() !== '') {
    errors.honeypot = 'Bot detected';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Sanitizes the contact form data
 * @param {Object} formData - The form data to sanitize
 * @returns {Object} - The sanitized form data
 */
function sanitizeContactForm(formData) {
  const sanitizedData = {};
  
  // Function to sanitize a string
  const sanitizeString = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };
  
  // Sanitize each field
  sanitizedData.name = sanitizeString(formData.name);
  sanitizedData.email = sanitizeString(formData.email);
  sanitizedData.firma = sanitizeString(formData.firma);
  sanitizedData.betreff = sanitizeString(formData.betreff);
  sanitizedData.anmerkungen = sanitizeString(formData.anmerkungen);
  sanitizedData.csrfToken = formData.csrfToken; // Don't sanitize the token
  
  return sanitizedData;
}

/**
 * Middleware for validating and sanitizing contact form submissions
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
function contactFormMiddleware(req, res, next) {
  // Only process POST requests to the contact form endpoint
  if (req.method !== 'POST' || req.path !== '/api/contact') {
    return next();
  }
  
  // Validate the form data
  const validation = validateContactForm(req.body);
  
  // If validation fails, return error response
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      errors: validation.errors
    });
  }
  
  // Sanitize the form data
  const sanitizedData = sanitizeContactForm(req.body);
  
  // Replace the request body with the sanitized data
  req.body = sanitizedData;
  
  // Continue to the next middleware
  next();
}

module.exports = {
  validateContactForm,
  sanitizeContactForm,
  contactFormMiddleware
};
