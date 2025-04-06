<template>
  <div class="staggered-container" :style="containerStyle">
    <transition-group
      :name="transitionName"
      tag="div"
      :class="['staggered-items', wrapperClass]"
      :style="wrapperStyle"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <slot></slot>
    </transition-group>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'StaggeredAnimation',
  props: {
    // Animation type
    type: {
      type: String,
      default: 'fade-up',
      validator: (value) => ['fade', 'fade-up', 'fade-down', 'fade-left', 'fade-right', 'scale'].includes(value)
    },
    // Stagger delay between items (in ms)
    stagger: {
      type: Number,
      default: 50
    },
    // Base duration for each animation (in ms)
    duration: {
      type: Number,
      default: 600
    },
    // Easing function
    easing: {
      type: String,
      default: 'cubic-bezier(0.16, 1, 0.3, 1)'
    },
    // Distance to move (for translate animations)
    distance: {
      type: Number,
      default: 30
    },
    // Direction of animation (for grid layouts)
    direction: {
      type: String,
      default: 'forward', // 'forward', 'reverse', 'top-down', 'bottom-up'
      validator: (value) => ['forward', 'reverse', 'top-down', 'bottom-up'].includes(value)
    },
    // Additional class for the wrapper
    wrapperClass: {
      type: String,
      default: ''
    },
    // Additional style for the wrapper
    wrapperStyle: {
      type: Object,
      default: () => ({})
    },
    // Additional style for the container
    containerStyle: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // Compute the transition name based on the type
    const transitionName = computed(() => {
      return `stagger-${props.type}`;
    });

    // Before enter hook
    const beforeEnter = (el) => {
      el.style.opacity = '0';
      el.style.transition = `opacity ${props.duration}ms ${props.easing}, transform ${props.duration}ms ${props.easing}`;
      
      // Set initial transform based on animation type
      switch (props.type) {
        case 'fade-up':
          el.style.transform = `translateY(${props.distance}px)`;
          break;
        case 'fade-down':
          el.style.transform = `translateY(-${props.distance}px)`;
          break;
        case 'fade-left':
          el.style.transform = `translateX(${props.distance}px)`;
          break;
        case 'fade-right':
          el.style.transform = `translateX(-${props.distance}px)`;
          break;
        case 'scale':
          el.style.transform = `scale(0.9)`;
          break;
        default:
          // Just fade
          break;
      }
    };

    // Enter hook
    const enter = (el, done) => {
      // Get the index of the element
      const index = Array.from(el.parentNode.children).indexOf(el);
      
      // Calculate delay based on direction
      let delay;
      switch (props.direction) {
        case 'reverse':
          // Reverse order (right to left, bottom to top)
          delay = (el.parentNode.children.length - index - 1) * props.stagger;
          break;
        case 'top-down':
          // Top to bottom (for grid layouts)
          const row = Math.floor(index / 3); // Assuming 3 columns
          delay = row * props.stagger;
          break;
        case 'bottom-up':
          // Bottom to top (for grid layouts)
          const totalRows = Math.ceil(el.parentNode.children.length / 3); // Assuming 3 columns
          const rowReverse = totalRows - Math.floor(index / 3) - 1; // Assuming 3 columns
          delay = rowReverse * props.stagger;
          break;
        default:
          // Forward order (left to right, top to bottom)
          delay = index * props.stagger;
          break;
      }
      
      // Apply the delay
      el.style.transitionDelay = `${delay}ms`;
      
      // Force a reflow
      void el.offsetWidth;
      
      // Apply the final state
      el.style.opacity = '1';
      el.style.transform = 'none';
      
      // Call done after the transition completes
      setTimeout(done, props.duration + delay);
    };

    // Leave hook
    const leave = (el, done) => {
      // Get the index of the element
      const index = Array.from(el.parentNode.children).indexOf(el);
      
      // Calculate delay based on direction (reverse for leave)
      let delay;
      switch (props.direction) {
        case 'reverse':
          delay = index * props.stagger;
          break;
        case 'top-down':
          const totalRows = Math.ceil(el.parentNode.children.length / 3); // Assuming 3 columns
          const rowReverse = totalRows - Math.floor(index / 3) - 1; // Assuming 3 columns
          delay = rowReverse * props.stagger;
          break;
        case 'bottom-up':
          const row = Math.floor(index / 3); // Assuming 3 columns
          delay = row * props.stagger;
          break;
        default:
          delay = (el.parentNode.children.length - index - 1) * props.stagger;
          break;
      }
      
      // Apply the delay
      el.style.transitionDelay = `${delay}ms`;
      
      // Force a reflow
      void el.offsetWidth;
      
      // Apply the initial state (reverse of enter)
      el.style.opacity = '0';
      
      // Set transform based on animation type
      switch (props.type) {
        case 'fade-up':
          el.style.transform = `translateY(${props.distance}px)`;
          break;
        case 'fade-down':
          el.style.transform = `translateY(-${props.distance}px)`;
          break;
        case 'fade-left':
          el.style.transform = `translateX(${props.distance}px)`;
          break;
        case 'fade-right':
          el.style.transform = `translateX(-${props.distance}px)`;
          break;
        case 'scale':
          el.style.transform = `scale(0.9)`;
          break;
        default:
          // Just fade
          break;
      }
      
      // Call done after the transition completes
      setTimeout(done, props.duration + delay);
    };

    return {
      transitionName,
      beforeEnter,
      enter,
      leave
    };
  }
};
</script>

<style lang="scss" scoped>
.staggered-container {
  position: relative;
  width: 100%;
}

.staggered-items {
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

// Base transition styles
.stagger-fade-enter-active,
.stagger-fade-leave-active,
.stagger-fade-up-enter-active,
.stagger-fade-up-leave-active,
.stagger-fade-down-enter-active,
.stagger-fade-down-leave-active,
.stagger-fade-left-enter-active,
.stagger-fade-left-leave-active,
.stagger-fade-right-enter-active,
.stagger-fade-right-leave-active,
.stagger-scale-enter-active,
.stagger-scale-leave-active {
  will-change: opacity, transform;
}
</style>
