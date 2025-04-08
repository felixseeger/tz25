<template>
  <div id="app">
    <!-- Skip to content link for accessibility -->
    <a href="#main-content" class="skip-to-content">Skip to main content</a>

    <!-- Keyboard focus indicator -->
    <div class="keyboard-focus-indicator" :class="{ 'visible': showKeyboardFocusIndicator }">
      Keyboard navigation active
    </div>
    <!-- Scroll progress indicator at the top of the page -->
    <ScrollIndicator position="top" height="4px" :z-index="1001" />

    <!-- Page loading animation -->
    <PageLoader ref="pageLoader" :show-text="true" text="Loading..." />

    <AppLayout>
      <router-view v-slot="{ Component, route }">
        <transition
          :name="transitionName"
          mode="out-in"
          @after-leave="handleTransitionComplete"
          @before-enter="handleBeforeEnter"
          @after-enter="handleAfterEnter"
        >
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </AppLayout>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { AppLayout } from './components/layout';
import { ScrollIndicator } from './components/ui';
import { PageLoader } from './components/ui';
import { useScrollTo } from './composables/useScrollTo';
import { usePageTransition } from './composables/usePageTransition';
import { useKeyboardNavigation } from './composables/useKeyboardNavigation';

export default defineComponent({
  name: 'App',
  components: {
    AppLayout,
    ScrollIndicator,
    PageLoader
  },
  setup(props, { expose }) {
    // Use the scrollTo composable
    const { scrollToSection } = useScrollTo();

    // Use the page transition composable
    const {
      isLoading,
      isTransitioning,
      transitionName,
      onTransitionComplete
    } = usePageTransition();

    // Use the keyboard navigation composable
    const { showKeyboardFocusIndicator } = useKeyboardNavigation();

    // Animation states
    const pageAnimating = ref(false);

    // Reference to the page loader component
    const pageLoader = ref(null);

    // Hide the page loader after a short delay (in case it's stuck)
    setTimeout(() => {
      if (pageLoader.value && pageLoader.value.hideLoader) {
        pageLoader.value.hideLoader();
      }
    }, 1000);

    /**
     * Handle before enter transition event
     * This is called before the enter transition starts
     */
    const handleBeforeEnter = () => {
      console.log('Before enter transition');
      pageAnimating.value = true;
    };

    /**
     * Handle after enter transition event
     * This is called after the enter transition completes
     */
    const handleAfterEnter = () => {
      console.log('After enter transition');
      pageAnimating.value = false;
    };

    /**
     * Handle transition complete event
     * This is called after the leave transition is complete
     */
    const handleTransitionComplete = () => {
      console.log('Transition complete');
      onTransitionComplete();

      // Check if there's a hash in the URL and scroll to it
      if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        console.log(`Found hash #${sectionId}, scrolling to it...`);

        // Small delay to ensure the new page is fully rendered
        setTimeout(() => {
          scrollToSection(sectionId, {
            offset: 80, // Account for fixed header
            onComplete: () => {
              console.log(`Scrolled to #${sectionId} successfully`);
            },
            onError: (error) => {
              console.warn(`Error scrolling to #${sectionId}:`, error.message);
            }
          });
        }, 100);
      }
    };

    // Expose the pageLoader ref
    expose({ pageLoader });

    return {
      isLoading,
      isTransitioning,
      transitionName,
      pageAnimating,
      pageLoader,
      showKeyboardFocusIndicator,
      handleBeforeEnter,
      handleAfterEnter,
      handleTransitionComplete
    };
  }
});
</script>

<style lang="scss">
@import './assets/scss/main.scss';

#app {
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Ensure body and html are also full width */
:root, html, body {
  width: 100vw;
  max-width: 100vw;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

/* Fix for sections */
section {
  width: 100vw;
  max-width: 100vw;
  position: relative;
}

.container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
}
</style>