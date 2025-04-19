<template>
  <div class="contact-button" :class="{ 'is-hidden': shouldHideButton }">
    <a
      href="#footer"
      class="contact-button__link"
      @click.prevent="scrollToFooter"
      aria-label="Scroll to footer section"
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

    // Hide button on history, contact, and footer sections
    const shouldHideButton = computed(() => {
      // Debug logs
      console.log('Active section:', activeSection.value);
      console.log('History visible:', isHistorySectionVisible.value);
      console.log('Contact visible:', isContactSectionVisible.value);

      // Hide when in contact section, history section, or footer section
      const inContactSection = activeSection.value === 'contact';
      const inFooterSection = activeSection.value === 'footer';
      const inHistorySection = activeSection.value === 'history' || isHistorySectionVisible.value;

      // For debugging purposes, log the current state
      console.log('Should hide button:', inContactSection || inHistorySection || inFooterSection);

      // Hide when in contact section, history section, or footer section
      return inContactSection || inHistorySection || inFooterSection;
    });

    const scrollToFooter = () => {
      scrollToSection('footer', { offset: 80 }); // 80px offset to account for the navbar height
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
      const contactSection = document.getElementById('contact');
      const footerSection = document.getElementById('footer');

      // Check if active section is 'history', 'contact', or 'footer' regardless of DOM element
      if (activeSection.value === 'history' || activeSection.value === 'contact' || activeSection.value === 'footer') {
        isHistorySectionVisible.value = true;
        return;
      }

      // Check URL hash
      if (window.location.hash === '#history' || window.location.hash === '#contact' || window.location.hash === '#footer') {
        isHistorySectionVisible.value = true;
        return;
      }

      // Check if any of the sections that should hide the button are visible
      const checkSectionVisibility = (section) => {
        if (!section) return false;

        const rect = section.getBoundingClientRect();

        // Consider visible if any part of the section is in the viewport
        const isPartiallyVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

        // Consider visible if we're very close to the section
        const isCloseToSection = Math.abs(rect.top) < 500 || Math.abs(rect.bottom - window.innerHeight) < 500;

        // Consider visible if we're scrolling through the section
        const isScrollingThrough = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;

        return isPartiallyVisible || isCloseToSection || isScrollingThrough;
      };

      // Check history section
      if (historySection && checkSectionVisibility(historySection)) {
        isHistorySectionVisible.value = true;
        return;
      }

      // Check contact section
      if (contactSection && checkSectionVisibility(contactSection)) {
        isHistorySectionVisible.value = true;
        return;
      }

      // Check footer section
      if (footerSection && checkSectionVisibility(footerSection)) {
        isHistorySectionVisible.value = true;
        return;
      }

      // If none of the sections are visible, set to false
      isHistorySectionVisible.value = false;
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
      scrollToFooter,
      shouldHideButton,
      isHistorySectionVisible
    };
  }
}
</script>

<!-- Styles moved to src/assets/scss/components/_contact-button.scss -->