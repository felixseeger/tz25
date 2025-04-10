<template>
  <div class="cookie-button" :class="{ 'is-hidden': shouldHideButton }">
    <button
      class="cookie-button__btn"
      @click="openCookieManager"
      aria-label="Open cookie settings"
      tabindex="0"
    >
      <img src="../../assets/images/cookies.svg" alt="" class="cookie-button__icon" aria-hidden="true" />
    </button>
  </div>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useActiveSection } from '../../composables/useActiveSection';

export default {
  name: 'CookieButton',
  setup() {
    // Use the active section composable to track the current section
    const { activeSection } = useActiveSection();
    const isContactSectionVisible = ref(false);
    const isFooterSectionVisible = ref(false);

    // Compute whether the button should be hidden
    const shouldHideButton = computed(() => {
      // Hide when in contact or footer section (either by active section or by visibility event)
      const shouldHide =
        activeSection.value === 'contact' ||
        activeSection.value === 'footer' ||
        isContactSectionVisible.value ||
        isFooterSectionVisible.value;

      // Log for debugging
      console.log('Cookie button should hide:', shouldHide,
        'Active section:', activeSection.value,
        'Contact visible:', isContactSectionVisible.value,
        'Footer visible:', isFooterSectionVisible.value);

      return shouldHide;
    });

    // Create a method to open the cookie manager
    const openCookieManager = () => {
      // Create and dispatch a custom event that the CookieBanner will listen for
      const event = new CustomEvent('open-cookie-settings');
      document.dispatchEvent(event);

      // Log for debugging
      console.log('Cookie settings button clicked, event dispatched');
    };

    // Handle the custom event from ContactSection
    const handleContactSectionVisible = (event) => {
      isContactSectionVisible.value = event.detail.visible;
    };

    // Handle the custom event from FooterSection
    const handleFooterSectionVisible = (event) => {
      isFooterSectionVisible.value = event.detail.visible;
    };

    onMounted(() => {
      // Listen for the contact section visibility event
      document.addEventListener('contact-section-visible', handleContactSectionVisible);

      // Listen for the footer section visibility event
      document.addEventListener('footer-section-visible', handleFooterSectionVisible);
    });

    onUnmounted(() => {
      // Clean up event listeners
      document.removeEventListener('contact-section-visible', handleContactSectionVisible);
      document.removeEventListener('footer-section-visible', handleFooterSectionVisible);
    });

    return {
      openCookieManager,
      shouldHideButton
    };
  }
}
</script>
