import { onMounted, onBeforeUnmount } from 'vue';
import gsap from '../utils/gsap';

/**
 * Composable for using GSAP animations in Vue components
 * @returns {Object} GSAP instance and utility functions
 */
export function useGsap() {
  // Store animations that need to be killed on component unmount
  const animations = [];

  /**
   * Create a GSAP animation and automatically add it to the cleanup list
   * @param {Object} target - The element(s) to animate
   * @param {Object} vars - The animation variables
   * @returns {Object} The GSAP animation instance
   */
  const animate = (target, vars) => {
    const animation = gsap.to(target, vars);
    animations.push(animation);
    return animation;
  };

  /**
   * Create a GSAP timeline and automatically add it to the cleanup list
   * @param {Object} vars - The timeline variables
   * @returns {Object} The GSAP timeline instance
   */
  const createTimeline = (vars) => {
    const timeline = gsap.timeline(vars);
    animations.push(timeline);
    return timeline;
  };

  /**
   * Create a GSAP ScrollTrigger and automatically add it to the cleanup list
   * @param {Object} config - The ScrollTrigger configuration
   * @returns {Object} The ScrollTrigger instance
   */
  const createScrollTrigger = (config) => {
    const scrollTrigger = ScrollTrigger.create(config);
    animations.push(scrollTrigger);
    return scrollTrigger;
  };

  // Clean up animations when component is unmounted
  onBeforeUnmount(() => {
    animations.forEach(animation => {
      if (animation.kill) {
        animation.kill();
      }
    });
  });

  return {
    gsap,
    animate,
    createTimeline,
    createScrollTrigger,
    ScrollTrigger: gsap.ScrollTrigger
  };
}
