/**
 * Form validation and sanitization utilities
 */

// Regular expressions for validation
const REGEX = {
  // Email regex that follows RFC 5322 standard
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  // Only allow letters, numbers, spaces, and basic punctuation
  TEXT: /^[a-zA-ZäöüÄÖÜß0-9\s.,!?()-_]*$/,
  // Only allow letters, numbers, spaces, and basic punctuation for company names
  COMPANY: /^[a-zA-ZäöüÄÖÜß0-9\s.,&()-_]*$/,
  // Only allow letters, numbers, spaces, and basic punctuation for subject
  SUBJECT: /^[a-zA-ZäöüÄÖÜß0-9\s.,!?()-_]*$/,
  // More permissive for message content
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
 * Validates a form field
 * @param {string} field - The field name
 * @param {string} value - The field value
 * @param {boolean} required - Whether the field is required
 * @returns {string} - Error message or empty string if valid
 */
export function validateField(field, value, required = false) {
  // Check if required field is empty
  if (required && (!value || value.trim() === '')) {
    return 'Dieses Feld ist erforderlich';
  }

  // If field is not required and empty, it's valid
  if (!required && (!value || value.trim() === '')) {
    return '';
  }

  // Validate field based on type
  switch (field) {
    case 'name':
      if (value.length > MAX_LENGTHS.NAME) {
        return `Der Name darf maximal ${MAX_LENGTHS.NAME} Zeichen lang sein`;
      }
      if (!REGEX.TEXT.test(value)) {
        return 'Der Name enthält ungültige Zeichen';
      }
      break;
    
    case 'email':
      if (value.length > MAX_LENGTHS.EMAIL) {
        return `Die E-Mail-Adresse darf maximal ${MAX_LENGTHS.EMAIL} Zeichen lang sein`;
      }
      if (!REGEX.EMAIL.test(value)) {
        return 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
      }
      break;
    
    case 'firma':
      if (value.length > MAX_LENGTHS.COMPANY) {
        return `Der Firmenname darf maximal ${MAX_LENGTHS.COMPANY} Zeichen lang sein`;
      }
      if (!REGEX.COMPANY.test(value)) {
        return 'Der Firmenname enthält ungültige Zeichen';
      }
      break;
    
    case 'betreff':
      if (value.length > MAX_LENGTHS.SUBJECT) {
        return `Der Betreff darf maximal ${MAX_LENGTHS.SUBJECT} Zeichen lang sein`;
      }
      if (!REGEX.SUBJECT.test(value)) {
        return 'Der Betreff enthält ungültige Zeichen';
      }
      break;
    
    case 'anmerkungen':
      if (value.length > MAX_LENGTHS.MESSAGE) {
        return `Die Nachricht darf maximal ${MAX_LENGTHS.MESSAGE} Zeichen lang sein`;
      }
      if (!REGEX.MESSAGE.test(value)) {
        return 'Die Nachricht enthält ungültige Zeichen';
      }
      break;
    
    default:
      break;
  }

  return '';
}

/**
 * Sanitizes a string to prevent XSS attacks
 * @param {string} value - The string to sanitize
 * @returns {string} - The sanitized string
 */
export function sanitizeInput(value) {
  if (!value) return '';
  
  // Convert to string if not already
  const str = String(value);
  
  // Replace HTML special characters with their entity equivalents
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Validates an entire form
 * @param {Object} formData - The form data
 * @param {Object} requiredFields - Object with field names as keys and boolean values indicating if required
 * @returns {Object} - Object with field names as keys and error messages as values
 */
export function validateForm(formData, requiredFields) {
  const errors = {};
  
  // Validate each field
  Object.keys(formData).forEach(field => {
    const isRequired = requiredFields[field] || false;
    const error = validateField(field, formData[field], isRequired);
    if (error) {
      errors[field] = error;
    }
  });
  
  return errors;
}

/**
 * Sanitizes all form data
 * @param {Object} formData - The form data
 * @returns {Object} - The sanitized form data
 */
export function sanitizeForm(formData) {
  const sanitizedData = {};
  
  // Sanitize each field
  Object.keys(formData).forEach(field => {
    sanitizedData[field] = sanitizeInput(formData[field]);
  });
  
  return sanitizedData;
}

/**
 * Checks if a form has any errors
 * @param {Object} errors - The errors object
 * @returns {boolean} - True if the form has errors, false otherwise
 */
export function hasErrors(errors) {
  return Object.values(errors).some(error => error !== '');
}

/**
 * Creates a CSRF token
 * @returns {string} - The CSRF token
 */
export function generateCSRFToken() {
  // Generate a random string
  const randomString = Math.random().toString(36).substring(2, 15) + 
                       Math.random().toString(36).substring(2, 15);
  
  // Store it in session storage
  sessionStorage.setItem('csrfToken', randomString);
  
  return randomString;
}

/**
 * Validates a CSRF token
 * @param {string} token - The token to validate
 * @returns {boolean} - True if the token is valid, false otherwise
 */
export function validateCSRFToken(token) {
  const storedToken = sessionStorage.getItem('csrfToken');
  return token === storedToken;
}
