<template>
  <div class="fixed-history-button-container" :class="{ 'is-visible': true }">
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
      const historySection = document.getElementById('history');

      if (historySection && 'IntersectionObserver' in window) {
        observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            isHistorySectionVisible.value = entry.isIntersecting;
            console.log('History section visible:', isHistorySectionVisible.value);
          });
        }, {
          threshold: 0.2 // Show button when at least 20% of history section is visible
        });

        observer.observe(historySection);
      }
    };

    // Setup observer when component is mounted
    onMounted(() => {
      setupIntersectionObserver();
    });

    // Clean up observer when component is unmounted
    onUnmounted(() => {
      if (observer) {
        observer.disconnect();
      }
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
  right: 0;
  top: 50%; /* Position at the vertical center */
  transform: translateY(-50%);
  z-index: 1000;
  display: block;
  visibility: hidden; /* Hidden by default */
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  padding-left: 0; /* Remove left padding */

  &.is-visible {
    visibility: visible;
    opacity: 1;
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
  }
}

@media (max-width: 992px) {
  .fixed-history-button-container {
    right: 0;
    padding-left: 0;
  }

  .fixed-history-button__image {
    width: 150px;
  }
}

@media (max-width: 768px) {
  .fixed-history-button-container {
    right: 0;
    bottom: auto; /* Keep at vertical center */
    top: 50%;
    transform: translateY(-50%);
    padding-left: 0;

    &.is-visible {
      visibility: visible;
      opacity: 1;
    }
  }

  .fixed-history-button__image {
    width: 120px;
  }
}
</style>
