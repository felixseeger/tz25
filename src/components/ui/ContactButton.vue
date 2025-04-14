<template>
  <div class="contact-button" :class="{ 'is-hidden': shouldHideButton }">
    <a
      href="#contact"
      class="contact-button__link"
      @click.prevent="scrollToContact"
      aria-label="Scroll to contact section"
      tabindex="0"
      role="button"
    >
      <img src="../../assets/images/contact.svg" alt="" class="contact-button__image" aria-hidden="true" />
    </a>
  </div>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useScrollTo } from '../../composables/useScrollTo';
import { useActiveSection } from '../../composables/useActiveSection';

export default {
  name: 'ContactButton',
  setup() {
    const { scrollToSection } = useScrollTo();
    const { activeSection } = useActiveSection();
    const isContactSectionVisible = ref(false);
    const isHistorySectionVisible = ref(false);

    // Create a ref to store the observer
    const historyObserver = ref(null);

    // Set up an intersection observer for the history section
    onMounted(() => {
      // Wait for DOM to be fully loaded
      setTimeout(() => {
        const historySection = document.getElementById('history');
        console.log('History section element:', historySection);

        if (historySection) {
          historyObserver.value = new IntersectionObserver(
            (entries) => {
              entries.forEach(entry => {
                isHistorySectionVisible.value = entry.isIntersecting;
                console.log('History section visible:', isHistorySectionVisible.value);

                // If the history section is intersecting, make sure the button is hidden
                if (entry.isIntersecting) {
                  // Force update the computed property
                  isHistorySectionVisible.value = true;
                }
              });
            },
            {
              threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5], // Multiple thresholds for better detection
              rootMargin: '0px 0px 0px 0px' // Expand the detection area
            }
          );

          historyObserver.value.observe(historySection);
        } else {
          console.log('History section not found in the DOM yet, will retry on scroll');
          // Don't show error, just set a flag to check again later
          isHistorySectionVisible.value = false;
        }
      }, 500); // Short delay to ensure DOM is ready
    });

    // Hide button on history and contact sections or when scrolling to contact section
    const shouldHideButton = computed(() => {
      // Debug logs
      console.log('Active section:', activeSection.value);
      console.log('History visible:', isHistorySectionVisible.value);
      console.log('Contact visible:', isContactSectionVisible.value);

      // Hide when in contact section or history section
      const inContactSection = activeSection.value === 'contact';
      const inHistorySection = activeSection.value === 'history' || isHistorySectionVisible.value;

      // For debugging purposes, log the current state
      console.log('Should hide button:', inContactSection || inHistorySection);

      // Hide when in contact section or history section
      return inContactSection || inHistorySection;
    });

    const scrollToContact = () => {
      scrollToSection('contact', { offset: 80 }); // 80px offset to account for the navbar height
    };

    // Handle the custom event from ContactSection
    const handleContactSectionVisible = (event) => {
      isContactSectionVisible.value = event.detail.visible;
    };

    // Handle the custom event from HistorySection
    const handleHistorySectionVisible = (event) => {
      isHistorySectionVisible.value = event.detail.visible;
      console.log('History section visibility event received:', event.detail.visible);
    };

    // Force re-evaluation of shouldHideButton on scroll
    const handleScroll = () => {
      // This will trigger a re-evaluation of the computed property
      // by checking if the history section is in the viewport
      const historySection = document.getElementById('history');

      // Check if active section is 'history' regardless of DOM element
      if (activeSection.value === 'history') {
        isHistorySectionVisible.value = true;
        return;
      }

      // Check URL hash
      if (window.location.hash === '#history') {
        isHistorySectionVisible.value = true;
        return;
      }

      if (historySection) {
        const rect = historySection.getBoundingClientRect();

        // More aggressive check - consider visible even if just partially in viewport
        // The history section is considered visible if any part of it is in the viewport
        isHistorySectionVisible.value = (
          rect.top <= window.innerHeight &&
          rect.bottom >= 0
        );

        // If we're very close to the history section, consider it visible
        // Increased threshold to 500px for better detection
        if (Math.abs(rect.top) < 500 || Math.abs(rect.bottom - window.innerHeight) < 500) {
          isHistorySectionVisible.value = true;
        }

        // Check if we're scrolling through the history section
        // This ensures the button stays hidden while scrolling through the section
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          isHistorySectionVisible.value = true;
        }

        // These checks are now done before checking for the DOM element
      }
    };

    onMounted(() => {
      // Listen for the contact section visibility event
      document.addEventListener('contact-section-visible', handleContactSectionVisible);

      // Listen for the history section visibility event
      document.addEventListener('history-section-visible', handleHistorySectionVisible);

      // Add scroll event listener
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Initial check
      handleScroll();
    });

    onUnmounted(() => {
      // Clean up event listeners
      document.removeEventListener('contact-section-visible', handleContactSectionVisible);
      document.removeEventListener('history-section-visible', handleHistorySectionVisible);
      window.removeEventListener('scroll', handleScroll);

      // Clean up the intersection observer
      if (historyObserver.value) {
        historyObserver.value.disconnect();
      }
    });

    return {
      scrollToContact,
      shouldHideButton,
      isHistorySectionVisible
    };
  }
}
</script>

<!-- Styles moved to src/assets/scss/components/_contact-button.scss -->