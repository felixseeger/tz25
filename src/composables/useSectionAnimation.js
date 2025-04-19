import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useGsap } from './useGsap';

/**
 * Composable for creating staggered build-up animations for section content
 * @param {Object} options - Configuration options
 * @returns {Object} - Animation utilities and state
 */
export function useSectionAnimation(options = {}) {
  const { gsap, createTimeline } = useGsap();
  const sectionRef = ref(null);
  const isAnimated = ref(false);
  const animations = ref([]);

  // Default options
  const defaultOptions = {
    triggerStart: 'top 80%',     // When to start the animation (trigger point enters 80% down the viewport)
    triggerEnd: 'bottom 20%',    // When to end the animation (trigger point exits 20% up from bottom of viewport)
    toggleActions: 'play none none reverse', // Play on enter, reverse on exit
    baseDelay: 0.1,              // Base delay before animations start
    staggerDelay: 0.15,          // Delay between staggered elements
    duration: 0.8,               // Animation duration
    distance: 50,                // Distance for translate animations (in pixels)
    ease: 'power3.out',          // Easing function
    debug: false                 // Show ScrollTrigger markers for debugging
  };

  // Merge default options with provided options
  const config = { ...defaultOptions, ...options };

  /**
   * Animate a group of elements with staggered timing
   * @param {String|Element|NodeList} elements - Elements to animate
   * @param {Object} params - Animation parameters
   * @returns {Object} - GSAP timeline
   */
  const animateElements = (elements, params = {}) => {
    if (!elements) return null;
    
    const timeline = gsap.timeline({
      defaults: { 
        duration: config.duration,
        ease: config.ease
      },
      ...params
    });
    
    // Store the timeline for cleanup
    animations.value.push(timeline);
    
    return timeline;
  };

  /**
   * Create a staggered animation for section content
   * @param {Object} sectionElement - The section element reference
   * @param {Object} selectors - Object with CSS selectors for different element groups
   */
  const animateSection = (sectionElement, selectors = {}) => {
    if (!sectionElement) return;
    
    // Create the main timeline with ScrollTrigger
    const mainTimeline = createTimeline({
      scrollTrigger: {
        trigger: sectionElement,
        start: config.triggerStart,
        end: config.triggerEnd,
        toggleActions: config.toggleActions,
        markers: config.debug,
        onEnter: () => { isAnimated.value = true; },
        onLeaveBack: () => { isAnimated.value = false; }
      }
    });
    
    // Default selectors if none provided
    const defaultSelectors = {
      title: '.section-title, h1, h2, .section-heading',
      subtitle: '.section-subtitle, h3',
      text: 'p, .section-text, .section-description',
      buttons: '.btn, button, .cta, .section-cta',
      images: 'img, .image, .section-image',
      cards: '.card, .section-card',
      listItems: 'li, .list-item',
      custom: '.animate-item'
    };
    
    // Merge default selectors with provided selectors
    const elementSelectors = { ...defaultSelectors, ...selectors };
    
    // Initial delay
    let currentDelay = config.baseDelay;
    
    // Animate title elements (first)
    const titleElements = sectionElement.querySelectorAll(elementSelectors.title);
    if (titleElements.length > 0) {
      mainTimeline.from(titleElements, {
        y: config.distance,
        opacity: 0,
        duration: config.duration,
        stagger: config.staggerDelay,
        ease: config.ease
      }, currentDelay);
      currentDelay += 0.2; // Add delay for next group
    }
    
    // Animate subtitle elements
    const subtitleElements = sectionElement.querySelectorAll(elementSelectors.subtitle);
    if (subtitleElements.length > 0) {
      mainTimeline.from(subtitleElements, {
        y: config.distance,
        opacity: 0,
        duration: config.duration,
        stagger: config.staggerDelay,
        ease: config.ease
      }, currentDelay);
      currentDelay += 0.2; // Add delay for next group
    }
    
    // Animate text elements
    const textElements = sectionElement.querySelectorAll(elementSelectors.text);
    if (textElements.length > 0) {
      mainTimeline.from(textElements, {
        y: config.distance,
        opacity: 0,
        duration: config.duration,
        stagger: config.staggerDelay,
        ease: config.ease
      }, currentDelay);
      currentDelay += 0.2; // Add delay for next group
    }
    
    // Animate image elements
    const imageElements = sectionElement.querySelectorAll(elementSelectors.images);
    if (imageElements.length > 0) {
      mainTimeline.from(imageElements, {
        y: config.distance,
        opacity: 0,
        duration: config.duration,
        stagger: config.staggerDelay,
        ease: config.ease
      }, currentDelay);
      currentDelay += 0.2; // Add delay for next group
    }
    
    // Animate card elements
    const cardElements = sectionElement.querySelectorAll(elementSelectors.cards);
    if (cardElements.length > 0) {
      mainTimeline.from(cardElements, {
        y: config.distance,
        opacity: 0,
        duration: config.duration,
        stagger: config.staggerDelay,
        ease: config.ease
      }, currentDelay);
      currentDelay += 0.2; // Add delay for next group
    }
    
    // Animate list items
    const listItemElements = sectionElement.querySelectorAll(elementSelectors.listItems);
    if (listItemElements.length > 0) {
      mainTimeline.from(listItemElements, {
        y: config.distance,
        opacity: 0,
        duration: config.duration,
        stagger: config.staggerDelay,
        ease: config.ease
      }, currentDelay);
      currentDelay += 0.2; // Add delay for next group
    }
    
    // Animate button elements (last)
    const buttonElements = sectionElement.querySelectorAll(elementSelectors.buttons);
    if (buttonElements.length > 0) {
      mainTimeline.from(buttonElements, {
        y: config.distance,
        opacity: 0,
        duration: config.duration,
        stagger: config.staggerDelay,
        ease: config.ease
      }, currentDelay);
      currentDelay += 0.2; // Add delay for next group
    }
    
    // Animate custom elements
    const customElements = sectionElement.querySelectorAll(elementSelectors.custom);
    if (customElements.length > 0) {
      mainTimeline.from(customElements, {
        y: config.distance,
        opacity: 0,
        duration: config.duration,
        stagger: config.staggerDelay,
        ease: config.ease
      }, currentDelay);
    }
    
    // Pause the timeline initially - ScrollTrigger will play it
    mainTimeline.pause();
    
    return mainTimeline;
  };

  /**
   * Initialize animations when component is mounted
   */
  const initAnimations = () => {
    if (sectionRef.value) {
      animateSection(sectionRef.value);
    } else {
      console.warn('Section reference not set for animations');
    }
  };

  // Clean up animations when component is unmounted
  onBeforeUnmount(() => {
    animations.value.forEach(animation => {
      if (animation && animation.kill) {
        animation.kill();
      }
    });
  });

  return {
    sectionRef,
    isAnimated,
    animateElements,
    animateSection,
    initAnimations
  };
}
