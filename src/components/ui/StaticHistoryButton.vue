<template>
  <div class="static-history-button-container" :class="{ 'is-visible': isHistorySectionVisible, 'timeline-open': isTimelineOpen }">
    <button
      @click="openTimeline"
      @keydown.enter="openTimeline"
      @keydown.space="openTimeline"
      class="static-history-button"
      :class="{ 'timeline-open': isTimelineOpen }"
      aria-label="Open history timeline"
      tabindex="0"
      role="button"
    >
      <div class="static-history-button__content">
        <span class="static-history-button__arrow">←</span>
        <span class="static-history-button__text">UNSERE<br>GESCHICHTE</span>
      </div>
    </button>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'StaticHistoryButton',
  setup() {
    const isTimelineOpen = ref(false);
    const isHistorySectionVisible = ref(false);

    // Handle timeline open/close events
    const handleTimelineOpen = () => {
      isTimelineOpen.value = true;
    };

    const handleTimelineClose = () => {
      isTimelineOpen.value = false;
    };

    // Handle history section visibility events
    const handleHistorySectionVisible = (event) => {
      isHistorySectionVisible.value = event.detail?.visible || false;
      console.log('History button: History section visibility changed to', isHistorySectionVisible.value);
    };

    // Setup event listeners when component is mounted
    onMounted(() => {
      // Listen for timeline open/close events
      document.addEventListener('timeline-opened', handleTimelineOpen);
      document.addEventListener('timeline-closed', handleTimelineClose);

      // Listen for history section visibility events
      document.addEventListener('history-section-visible', handleHistorySectionVisible);

      // Initial check for history section visibility
      const historySection = document.getElementById('history');
      if (historySection) {
        // Create an intersection observer to detect when history section is visible
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                isHistorySectionVisible.value = true;
                console.log('History button: History section is now visible');
              } else {
                isHistorySectionVisible.value = false;
                console.log('History button: History section is now hidden');
              }
            });
          },
          { threshold: 0.1 } // 10% of the section needs to be visible
        );

        observer.observe(historySection);
      }
    });

    // Clean up event listeners when component is unmounted
    onUnmounted(() => {
      // Remove event listeners
      document.removeEventListener('timeline-opened', handleTimelineOpen);
      document.removeEventListener('timeline-closed', handleTimelineClose);
      document.removeEventListener('history-section-visible', handleHistorySectionVisible);
    });

    // Method to open timeline
    const openTimeline = () => {
      const historySection = document.getElementById('history');
      if (historySection) {
        const event = new CustomEvent('open-timeline');
        historySection.dispatchEvent(event);
      }
    };

    return {
      isTimelineOpen,
      isHistorySectionVisible,
      openTimeline
    };
  }
}
</script>

<style lang="scss" scoped>
.static-history-button-container {
  position: fixed;
  right: -20px; /* Start slightly off-screen */
  top: 50%;
  transform: translateY(-50%);
  z-index: 9000; /* Very high z-index to ensure visibility */
  display: block;
  visibility: hidden; /* Hidden by default */
  opacity: 0;
  pointer-events: none; /* Not clickable when hidden */
  transition: opacity 0.5s ease, visibility 0.5s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), right 0.5s ease;

  &.is-visible {
    visibility: visible; /* Show when history section is visible */
    opacity: 1;
    right: 0; /* Slide in from the right */
    pointer-events: auto; /* Make clickable when visible */
  }

  &.timeline-open {
    right: -300px; /* Move far out to the right when timeline is open */
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.3s ease, visibility 0.3s ease 0.3s, right 0.5s ease, transform 0.5s ease;
  }
}

.static-history-button {
  background-color: #3B80FF;
  border: none;
  cursor: pointer;
  padding: 1rem;
  transition: all 0.3s ease;
  outline: none; /* Remove default outline */
  border-radius: 8px 0 0 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 160px;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 3px solid #4d90fe;
    outline-offset: 3px;
    box-shadow: 0 0 0 3px rgba(77, 144, 254, 0.5);
  }

  &.timeline-open {
    transform: translateX(100px); /* Move to the right when timeline is open */
    opacity: 0;
    pointer-events: none; /* Prevent interaction when hidden */
  }

  &__content {
    display: flex;
    align-items: center;
    color: white;
  }

  &__arrow {
    font-size: 1.5rem;
    margin-right: 0.75rem;
  }

  &__text {
    font-family: 'Gotham Narrow', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    text-align: left;
    line-height: 1.2;
    text-transform: uppercase;
  }
}

@media (max-width: 992px) {
  .static-history-button-container {
    right: 0;
  }

  .static-history-button__image {
    width: 150px;
  }
}

@media (max-width: 768px) {
  .static-history-button-container {
    right: 0;
    top: auto;
    bottom: 15%;
    transform: none;
    z-index: 1100; /* Ensure it's above other mobile elements */
  }

  .static-history-button {
    width: 140px;
    padding: 0.75rem;
  }
}

/* Extra small devices */
@media (max-width: 576px) {
  .static-history-button-container {
    right: 0;
    bottom: 10%;
    transform: none;
  }

  .static-history-button {
    width: 130px;
    padding: 0.75rem;

    &__arrow {
      font-size: 1.25rem;
      margin-right: 0.5rem;
    }

    &__text {
      font-size: 0.9rem;
    }
  }
}
</style>
