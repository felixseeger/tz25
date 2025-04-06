/**
 * Vue directive for lazy loading images
 * Usage: v-lazy-load="'path/to/image.jpg'"
 */

export default {
  mounted(el, binding) {
    // Function to load the image
    function loadImage() {
      // Get the image URL from the binding value
      const imageUrl = binding.value;
      
      // Set the image source
      el.src = imageUrl;
      
      // Remove the observer once the image is loaded
      if (observer) {
        observer.disconnect();
      }
    }
    
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
      // Create a new Intersection Observer
      const observer = new IntersectionObserver((entries) => {
        // Check if the element is intersecting with the viewport
        if (entries[0].isIntersecting) {
          loadImage();
          observer.disconnect();
        }
      }, {
        // Options for the observer
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      // Start observing the element
      observer.observe(el);
    } else {
      // Fallback for browsers that don't support Intersection Observer
      loadImage();
    }
  }
};
