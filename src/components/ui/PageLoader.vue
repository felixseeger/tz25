<template>
  <div class="page-loader" :class="{ 'is-active': isActive }">
    <div class="page-loader__content">
      <div class="page-loader__spinner">
        <div class="spinner-circle"></div>
        <div class="spinner-circle spinner-circle--2"></div>
        <div class="spinner-circle spinner-circle--3"></div>
      </div>
      <div v-if="showText" class="page-loader__text">{{ text }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PageLoader',
  props: {
    text: {
      type: String,
      default: 'Loading...'
    },
    showText: {
      type: Boolean,
      default: true
    },
    minDuration: {
      type: Number,
      default: 400 // Minimum time to show the loader in milliseconds
    },
    delay: {
      type: Number,
      default: 100 // Delay before showing the loader in milliseconds
    }
  },
  setup(props) {
    const router = useRouter();
    const isActive = ref(false);
    const showTimeout = ref(null);
    const hideTimeout = ref(null);
    const startTime = ref(0);

    // Watch for route changes
    watch(
      () => router.currentRoute.value,
      () => {
        // Clear any existing timeouts
        if (showTimeout.value) clearTimeout(showTimeout.value);
        if (hideTimeout.value) clearTimeout(hideTimeout.value);

        // Start loading after a short delay to avoid flashing for quick transitions
        showTimeout.value = setTimeout(() => {
          isActive.value = true;
          startTime.value = Date.now();
        }, props.delay);
      },
      { immediate: true }
    );

    // Listen for the beforeResolve event to hide the loader
    router.beforeResolve((to, from, next) => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime.value;
      const remainingTime = Math.max(0, props.minDuration - elapsedTime);

      // Ensure the loader is shown for at least minDuration
      hideTimeout.value = setTimeout(() => {
        isActive.value = false;
      }, remainingTime);

      next();
    });

    // Method to manually hide the loader
    const hideLoader = () => {
      if (showTimeout.value) clearTimeout(showTimeout.value);
      if (hideTimeout.value) clearTimeout(hideTimeout.value);
      isActive.value = false;
    };

    // Hide the loader initially (in case it's stuck)
    setTimeout(hideLoader, 1000);

    return {
      isActive,
      hideLoader
    };
  }
});
</script>

<style lang="scss" scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  backdrop-filter: blur(5px);

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__spinner {
    position: relative;
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
  }

  &__text {
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 1px;
    margin-top: 1rem;
    text-transform: uppercase;
  }
}

.spinner-circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top-color: #D8292F; // Primary color
  border-radius: 50%;
  animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

  &--2 {
    border-top-color: transparent;
    border-right-color: #D8292F;
    animation-delay: 0.4s;
  }

  &--3 {
    border-top-color: transparent;
    border-bottom-color: #D8292F;
    animation-delay: 0.8s;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
