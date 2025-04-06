<template>
  <div class="scroll-indicator" :class="{ 'is-visible': isVisible }">
    <div class="scroll-indicator__progress" :style="{ width: `${scrollProgress}%` }"></div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'ScrollIndicator',
  props: {
    height: {
      type: String,
      default: '4px'
    },
    color: {
      type: String,
      default: '#D8292F' // Primary color
    },
    backgroundColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.1)'
    },
    showAfter: {
      type: Number,
      default: 100 // Show after scrolling 100px
    },
    zIndex: {
      type: Number,
      default: 1000
    },
    position: {
      type: String,
      default: 'top', // 'top' or 'bottom'
      validator: (value) => ['top', 'bottom'].includes(value)
    }
  },
  setup(props) {
    const scrollProgress = ref(0);
    const isVisible = ref(false);

    const calculateScrollProgress = () => {
      // Calculate how far the user has scrolled
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      // Calculate the total scrollable area
      const scrollableHeight = documentHeight - windowHeight;
      
      // Calculate the scroll progress as a percentage
      if (scrollableHeight > 0) {
        scrollProgress.value = (scrollTop / scrollableHeight) * 100;
      } else {
        scrollProgress.value = 0;
      }
      
      // Determine if the indicator should be visible
      isVisible.value = scrollTop > props.showAfter;
    };

    onMounted(() => {
      window.addEventListener('scroll', calculateScrollProgress);
      calculateScrollProgress(); // Calculate initial progress
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', calculateScrollProgress);
    });

    return {
      scrollProgress,
      isVisible
    };
  }
};
</script>

<style lang="scss" scoped>
.scroll-indicator {
  position: fixed;
  left: 0;
  width: 100%;
  height: v-bind(height);
  background-color: v-bind(backgroundColor);
  z-index: v-bind(zIndex);
  opacity: 0;
  transition: opacity 0.3s ease;
  
  &.is-visible {
    opacity: 1;
  }
  
  &__progress {
    height: 100%;
    background-color: v-bind(color);
    width: 0;
    transition: width 0.1s ease-out;
  }
}

.scroll-indicator[position="top"] {
  top: 0;
}

.scroll-indicator[position="bottom"] {
  bottom: 0;
}
</style>
