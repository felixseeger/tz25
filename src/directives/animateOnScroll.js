import gsap from '../utils/gsap';

/**
 * Vue directive to animate elements when they enter the viewport
 * Usage: v-animate-on-scroll="{ animation: 'fade-up', delay: 0.2 }"
 */
export const animateOnScroll = {
  mounted(el, binding) {
    // Default options
    const defaultOptions = {
      animation: 'fade-up',  // Animation type: fade-up, fade-down, fade-left, fade-right, scale, fade
      delay: 0,              // Delay before animation starts (in seconds)
      duration: 0.8,         // Animation duration (in seconds)
      distance: 50,          // Distance for translate animations (in pixels)
      stagger: 0.1,          // Stagger delay for child elements (in seconds)
      ease: 'power3.out',    // Easing function
      threshold: 0.2,        // Intersection threshold (0-1)
      once: true,            // Whether to run the animation only once
      staggerChildren: false, // Whether to stagger child elements
      childSelector: '.animate-item', // Selector for child elements to stagger
      rootMargin: '0px 0px -10% 0px' // Root margin for intersection observer
    };

    // Merge default options with provided options
    const options = { ...defaultOptions, ...(binding.value || {}) };

    // Set initial state based on animation type
    const setInitialState = (element) => {
      gsap.set(element, { autoAlpha: 0 });

      switch (options.animation) {
        case 'fade-up':
          gsap.set(element, { y: options.distance });
          break;
        case 'fade-down':
          gsap.set(element, { y: -options.distance });
          break;
        case 'fade-left':
          gsap.set(element, { x: options.distance });
          break;
        case 'fade-right':
          gsap.set(element, { x: -options.distance });
          break;
        case 'scale':
          gsap.set(element, { scale: 0.8 });
          break;
        // For 'fade', we only need the autoAlpha set above
      }
    };

    // Animate the element
    const animateElement = (element) => {
      const animationProps = { 
        autoAlpha: 1, 
        duration: options.duration,
        delay: options.delay,
        ease: options.ease,
        overwrite: 'auto'
      };

      switch (options.animation) {
        case 'fade-up':
          animationProps.y = 0;
          break;
        case 'fade-down':
          animationProps.y = 0;
          break;
        case 'fade-left':
          animationProps.x = 0;
          break;
        case 'fade-right':
          animationProps.x = 0;
          break;
        case 'scale':
          animationProps.scale = 1;
          break;
        // For 'fade', we only need the autoAlpha set above
      }

      // If staggering child elements
      if (options.staggerChildren) {
        const children = element.querySelectorAll(options.childSelector);
        if (children.length > 0) {
          // Set initial state for children
          children.forEach(child => setInitialState(child));
          
          // Animate parent first
          gsap.to(element, { autoAlpha: 1, duration: options.duration, delay: options.delay });
          
          // Then animate children with stagger
          gsap.to(children, {
            ...animationProps,
            delay: options.delay + 0.2, // Add a small delay after parent animation
            stagger: options.stagger
          });
        } else {
          // No children found, just animate the element
          gsap.to(element, animationProps);
        }
      } else {
        // No staggering, just animate the element
        gsap.to(element, animationProps);
      }
    };

    // Set initial state
    setInitialState(el);

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is in view, animate it
          animateElement(el);
          
          // If animation should only run once, disconnect the observer
          if (options.once) {
            observer.disconnect();
          }
        } else if (!options.once) {
          // If element is not in view and animation should run multiple times,
          // reset to initial state
          setInitialState(el);
        }
      });
    }, {
      threshold: options.threshold,
      rootMargin: options.rootMargin
    });

    // Start observing the element
    observer.observe(el);

    // Store the observer on the element for cleanup
    el._animateObserver = observer;
  },
  
  // Clean up when directive is unmounted
  unmounted(el) {
    if (el._animateObserver) {
      el._animateObserver.disconnect();
    }
  }
};
