// This script is now deprecated - functionality moved to register-service-worker.js
// It's kept for backward compatibility

// Redirect to the function in register-service-worker.js
window.unregisterServiceWorkers = function() {
  if (window.unregisterAllServiceWorkers) {
    window.unregisterAllServiceWorkers();
  } else {
    console.error('unregisterAllServiceWorkers function not found');
  }
};
