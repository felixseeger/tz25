// Service worker registration is disabled due to fetch errors
console.log('Service worker registration is disabled');

// Function to unregister any existing service workers
function unregisterAllServiceWorkers() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then(registrations => {
        for (const registration of registrations) {
          registration.unregister()
            .then(success => {
              if (success) {
                console.log('Service worker unregistered successfully');
              } else {
                console.log('Service worker unregistration failed');
              }
            })
            .catch(error => {
              console.error('Error unregistering service worker:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error getting service worker registrations:', error);
      });
  }
}

// Automatically unregister service workers on page load
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Unregister any existing service workers
    unregisterAllServiceWorkers();
  });
}

// Expose the function globally
window.unregisterAllServiceWorkers = unregisterAllServiceWorkers;
