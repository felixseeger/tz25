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
              });
            },
            { threshold: 0.05 } // Trigger when just 5% of the section is visible for better sensitivity
          );

          historyObserver.value.observe(historySection);
        } else {
          console.error('History section not found in the DOM');
        }
      }, 500); // Short delay to ensure DOM is ready
    });

    // Hide button on history and contact sections or when scrolling to contact section
    const shouldHideButton = computed(() => {
      // Debug logs
      console.log('Active section:', activeSection.value);
      console.log('History visible:', isHistorySectionVisible.value);
      console.log('Contact visible:', isContactSectionVisible.value);

      // Hide when in contact section
      const inContactSection = activeSection.value === 'contact';

      // For debugging purposes, log the current state
      console.log('Should hide button:', inContactSection);

      // Only hide when in contact section
      return inContactSection;
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
      if (historySection) {
        const rect = historySection.getBoundingClientRect();
        // More aggressive check - consider visible even if just partially in viewport
        isHistorySectionVisible.value = (
          rect.top <= window.innerHeight &&
          rect.bottom >= 0
        );

        // If we're very close to the history section, consider it visible
        if (Math.abs(rect.top) < 300 || Math.abs(rect.bottom - window.innerHeight) < 300) {
          isHistorySectionVisible.value = true;
        }

        // Also check if the URL hash is #history
        if (window.location.hash === '#history') {
          isHistorySectionVisible.value = true;
        }
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