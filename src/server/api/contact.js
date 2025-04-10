/**
 * Contact form API endpoint
 * 
 * This is a simple example of how to implement server-side validation
 * for the contact form. In a real application, this would be implemented
 * as a serverless function or as part of a Node.js backend.
 */

const { validateContactForm, sanitizeContactForm } = require('../contactFormValidator');

/**
 * Handler for contact form submissions
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.handler = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
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
  
  try {
    // In a real application, you would send the email here
    // For this example, we'll just simulate a successful response
    
    // Simulate a delay to mimic sending an email
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return error response
    return res.status(500).json({
      success: false,
      message: 'Error sending email'
    });
  }
};
