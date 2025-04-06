/**
 * Cookie Service
 * Handles setting and getting cookies based on user consent
 */

// Set a cookie with the given name, value, and expiration days
export const setCookie = (name, value, days = 365) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

// Get a cookie by name
export const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Delete a cookie by name
export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
};

// Apply cookie settings based on user consent
export const applyCookieSettings = (settings) => {
  // Always set necessary cookies
  setCookie('necessary_cookies_accepted', 'true');
  
  // Set or delete other cookies based on settings
  if (settings.functional) {
    setCookie('functional_cookies_accepted', 'true');
    // Here you would initialize any functional cookies your site uses
  } else {
    deleteCookie('functional_cookies_accepted');
    // Here you would delete any functional cookies your site uses
  }
  
  if (settings.analytics) {
    setCookie('analytics_cookies_accepted', 'true');
    // Here you would initialize analytics (like Google Analytics)
    initializeAnalytics();
  } else {
    deleteCookie('analytics_cookies_accepted');
    // Here you would disable analytics
    disableAnalytics();
  }
  
  if (settings.marketing) {
    setCookie('marketing_cookies_accepted', 'true');
    // Here you would initialize marketing cookies (like ad tracking)
    initializeMarketing();
  } else {
    deleteCookie('marketing_cookies_accepted');
    // Here you would disable marketing cookies
    disableMarketing();
  }
};

// Example function to initialize analytics
const initializeAnalytics = () => {
  // This is where you would initialize Google Analytics or similar services
  console.log('Analytics initialized');
  
  // Example Google Analytics initialization (commented out)
  /*
  if (typeof window.gtag === 'undefined') {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID';
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'YOUR-GA-ID');
  }
  */
};

// Example function to disable analytics
const disableAnalytics = () => {
  // This is where you would disable Google Analytics or similar services
  console.log('Analytics disabled');
  
  // Example Google Analytics disabling (commented out)
  /*
  if (typeof window.gtag !== 'undefined') {
    window.gtag('consent', 'update', {
      'analytics_storage': 'denied'
    });
  }
  */
};

// Example function to initialize marketing cookies
const initializeMarketing = () => {
  // This is where you would initialize marketing/advertising cookies
  console.log('Marketing cookies initialized');
};

// Example function to disable marketing cookies
const disableMarketing = () => {
  // This is where you would disable marketing/advertising cookies
  console.log('Marketing cookies disabled');
};
