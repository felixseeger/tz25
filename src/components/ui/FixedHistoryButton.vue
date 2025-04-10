<template>
  <div class="fixed-history-button-container" :class="{ 'is-visible': isHistorySectionVisible }" :style="{ visibility: isHistorySectionVisible ? 'visible' : 'hidden', opacity: isHistorySectionVisible ? 1 : 0 }">
    <button @click="openTimeline" class="fixed-history-button">
      <img src="../../assets/images/history-btn.svg" alt="Unsere Geschichte" class="fixed-history-button__image">
    </button>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'FixedHistoryButton',
  setup() {
    const isHistorySectionVisible = ref(false);
    let observer = null;

    // Function to check if history section is in view
    const setupIntersectionObserver = () => {
      // Wait for DOM to be fully loaded
      setTimeout(() => {
        const historySection = document.getElementById('history');
        console.log('History section element found:', !!historySection);

        if (historySection && 'IntersectionObserver' in window) {
          observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              isHistorySectionVisible.value = entry.isIntersecting;
              console.log('History section visible:', isHistorySectionVisible.value);
            });
          }, {
            threshold: 0.01, // Show button when at least 1% of history section is visible
            rootMargin: '0px' // No margin
          });

          observer.observe(historySection);
          console.log('Observer set up for history section');
        } else {
          console.error('History section not found or IntersectionObserver not supported');
        }
      }, 500); // Short delay to ensure DOM is ready
    };

    // Function to handle history section visibility event
    const handleHistorySectionVisible = (event) => {
      if (event && event.detail) {
        isHistorySectionVisible.value = event.detail.visible;
        console.log('History section visibility event received:', isHistorySectionVisible.value);
      }
    };

    // Setup observer when component is mounted
    onMounted(() => {
      setupIntersectionObserver();

      // Also listen for custom events from the HistorySection component
      document.addEventListener('history-section-visible', handleHistorySectionVisible);
    });

    // Clean up observer when component is unmounted
    onUnmounted(() => {
      if (observer) {
        observer.disconnect();
      }

      // Remove event listener
      document.removeEventListener('history-section-visible', handleHistorySectionVisible);
    });

    // Method to open timeline
    const openTimeline = () => {
      // Emit an event to be handled by the parent component
      // Using context.emit since we're in the setup function
      if (isHistorySectionVisible.value) {
        // Only emit if we're on the history section
        const historySection = document.getElementById('history');
        if (historySection) {
          const event = new CustomEvent('open-timeline');
          historySection.dispatchEvent(event);
        }
      }
    };

    return {
      isHistorySectionVisible,
      openTimeline
    };
  }
}
</script>

<style lang="scss" scoped>
.fixed-history-button-container {
  position: fixed;
  right: 2rem;
  top: 50%; /* Center vertically */
  transform: translateY(-50%);
  z-index: 9000; /* Higher z-index to ensure it's above other elements */
  display: block;
  visibility: hidden; /* Hidden by default */
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  pointer-events: auto; /* Ensure it's clickable */
  padding-left: 50px; /* Add padding to fix it to the right side */

  &.is-visible {
    visibility: visible !important; /* Show when history section is visible */
    opacity: 1 !important;

    .fixed-history-button__image {
      animation: moveInFromRight 0.8s ease-out 0.5s both; /* Animation with 0.5s delay */
    }
  }
}

.fixed-history-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &__image {
    width: 200px;
    height: auto;
    display: block;
    /* Animation will be applied when the button is visible */
    transform: translateX(0); /* Default position */
    transition: transform 0.3s ease;
  }
}

@media (max-width: 992px) {
  .fixed-history-button-container {
    right: 1rem;
  }

  .fixed-history-button__image {
    width: 150px;
  }
}

@media (max-width: 768px) {
  .fixed-history-button-container {
    right: 1rem;
    top: 50%; /* Keep centered vertically */
    transform: translateY(-50%);
    z-index: 9000; /* Ensure consistent z-index on mobile */
    padding-left: 30px; /* Reduced padding for mobile */

    &.is-visible {
      visibility: visible !important;
      opacity: 1 !important;

      .fixed-history-button__image {
        animation: moveInFromRight 0.8s ease-out 0.5s both; /* Animation with 0.5s delay */
      }
    }
  }

  .fixed-history-button__image {
    width: 120px;
  }
}

/* Animation keyframes */
@keyframes moveInFromRight {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }

  80% {
    transform: translateX(-10px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
