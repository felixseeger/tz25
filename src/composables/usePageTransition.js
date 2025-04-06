import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

/**
 * Composable for managing page transitions and loading states
 * @returns {Object} - Page transition state and methods
 */
export function usePageTransition() {
  const isLoading = ref(false);
  const isTransitioning = ref(false);
  const transitionName = ref('fade');
  const router = useRouter();

  // Track navigation events
  let removeBeforeEach = null;
  let removeAfterEach = null;

  onMounted(() => {
    // Before each route change
    removeBeforeEach = router.beforeEach((to, from, next) => {
      // Don't show loader for initial page load
      if (from.name !== null) {
        isLoading.value = true;
        isTransitioning.value = true;
      }

      // Determine transition based on route depth
      if (to.path === from.path) {
        // Same path, likely a query change
        transitionName.value = 'fade';
      } else if (to.path === '/') {
        // Going to home
        transitionName.value = 'fade';
      } else if (from.path === '/') {
        // Coming from home
        transitionName.value = 'slide-up';
      } else {
        // Default transition
        transitionName.value = 'slide';
      }

      next();
    });

    // After each route change
    removeAfterEach = router.afterEach(() => {
      // Small delay to ensure components have time to load
      setTimeout(() => {
        isLoading.value = false;
      }, 300);

      // Ensure the transition state is reset after a reasonable timeout
      // This prevents the UI from getting stuck in a transitioning state
      setTimeout(() => {
        isTransitioning.value = false;
      }, 1000);
    });
  });

  onBeforeUnmount(() => {
    // Clean up router guards
    if (removeBeforeEach) removeBeforeEach();
    if (removeAfterEach) removeAfterEach();
  });

  /**
   * Called when a transition completes
   */
  const onTransitionComplete = () => {
    isTransitioning.value = false;

    // Check if there's a hash in the URL and scroll to it
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return {
    isLoading,
    isTransitioning,
    transitionName,
    onTransitionComplete
  };
}
