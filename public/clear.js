// Script to clear caches and unregister service workers

// Clear all caches
function clearAllCaches() {
  if ('caches' in window) {
    caches.keys()
      .then(cacheNames => {
        console.log('Found caches:', cacheNames);
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log('Deleting cache:', cacheName);
            return caches.delete(cacheName)
              .then(success => {
                if (success) {
                  console.log(`Cache ${cacheName} deleted successfully`);
                } else {
                  console.log(`Failed to delete cache ${cacheName}`);
                }
              });
          })
        );
      })
      .then(() => {
        console.log('All caches cleared');
      })
      .catch(error => {
        console.error('Error clearing caches:', error);
      });
  } else {
    console.log('Cache API not available in this browser');
  }
}

// Unregister all service workers
function unregisterAllServiceWorkers() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then(registrations => {
        if (registrations.length === 0) {
          console.log('No service workers to unregister');
          return;
        }
        
        console.log(`Unregistering ${registrations.length} service workers...`);
        return Promise.all(
          registrations.map(registration => {
            return registration.unregister()
              .then(success => {
                if (success) {
                  console.log(`Service worker ${registration.scope} unregistered successfully`);
                } else {
                  console.log(`Failed to unregister service worker ${registration.scope}`);
                }
              });
          })
        );
      })
      .then(() => {
        console.log('All service workers unregistered');
      })
      .catch(error => {
        console.error('Error unregistering service workers:', error);
      });
  } else {
    console.log('Service Worker API not available in this browser');
  }
}

// Clear everything
function clearEverything() {
  clearAllCaches();
  unregisterAllServiceWorkers();
  console.log('Clearing complete. You may need to refresh the page.');
}

// Expose functions globally
window.clearAllCaches = clearAllCaches;
window.unregisterAllServiceWorkers = unregisterAllServiceWorkers;
window.clearEverything = clearEverything;

// Run automatically
window.addEventListener('load', () => {
  // Delay to ensure page loads first
  setTimeout(() => {
    clearEverything();
  }, 1000);
});

console.log('Cache clearing and service worker unregistration script loaded');
console.log('To manually clear everything, run window.clearEverything() in the console');
