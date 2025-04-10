/**
 * Simple in-memory rate limiter for form submissions
 * 
 * This utility helps prevent spam by limiting the number of form submissions
 * from the same IP address within a given time period.
 * 
 * Note: In a production environment, you would typically use a more robust
 * solution like Redis for rate limiting, especially in a distributed system.
 */

// Store for tracking submission attempts
// Format: { ip: { count: number, firstAttempt: timestamp } }
const submissionTracker = {};

// Configuration
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
const MAX_SUBMISSIONS_PER_WINDOW = 5; // Maximum submissions per hour

/**
 * Check if a submission should be rate limited
 * @param {string} ip - The IP address of the submitter
 * @returns {Object} - Object with isLimited boolean and resetTime timestamp
 */
export function checkRateLimit(ip) {
  const now = Date.now();
  
  // Initialize tracking for this IP if it doesn't exist
  if (!submissionTracker[ip]) {
    submissionTracker[ip] = {
      count: 0,
      firstAttempt: now
    };
  }
  
  // Get the tracking data for this IP
  const tracking = submissionTracker[ip];
  
  // Reset if the window has expired
  if (now - tracking.firstAttempt > RATE_LIMIT_WINDOW) {
    tracking.count = 0;
    tracking.firstAttempt = now;
  }
  
  // Check if the rate limit has been exceeded
  const isLimited = tracking.count >= MAX_SUBMISSIONS_PER_WINDOW;
  
  // Calculate when the rate limit will reset
  const resetTime = tracking.firstAttempt + RATE_LIMIT_WINDOW;
  
  return {
    isLimited,
    resetTime,
    remainingSubmissions: Math.max(0, MAX_SUBMISSIONS_PER_WINDOW - tracking.count)
  };
}

/**
 * Increment the submission count for an IP address
 * @param {string} ip - The IP address of the submitter
 */
export function incrementSubmissionCount(ip) {
  if (!submissionTracker[ip]) {
    submissionTracker[ip] = {
      count: 0,
      firstAttempt: Date.now()
    };
  }
  
  submissionTracker[ip].count++;
}

/**
 * Get a formatted message for rate limit errors
 * @param {string} ip - The IP address of the submitter
 * @returns {string} - Formatted error message
 */
export function getRateLimitMessage(ip) {
  const { resetTime, remainingSubmissions } = checkRateLimit(ip);
  
  // Format the reset time
  const resetDate = new Date(resetTime);
  const formattedResetTime = resetDate.toLocaleTimeString();
  
  if (remainingSubmissions > 0) {
    return `Sie haben noch ${remainingSubmissions} Einreichungen übrig. Bitte versuchen Sie es später erneut, wenn Sie das Limit erreicht haben.`;
  } else {
    return `Sie haben das Limit für Formulareinreichungen erreicht. Bitte versuchen Sie es nach ${formattedResetTime} erneut.`;
  }
}

/**
 * Clear rate limit data for testing purposes
 */
export function clearRateLimitData() {
  Object.keys(submissionTracker).forEach(key => {
    delete submissionTracker[key];
  });
}
