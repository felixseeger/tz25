<template>
  <div class="cookie-button" :class="{ 'is-hidden': shouldHideButton }">
    <button class="cookie-button__btn" @click="openCookieManager">
      <img src="../../assets/images/cookies.svg" alt="Cookie Settings" class="cookie-button__icon" />
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

    // Compute whether the button should be hidden
    const shouldHideButton = computed(() => {
      return activeSection.value === 'contact' ||
             activeSection.value === 'footer' ||
             isContactSectionVisible.value;
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

    onMounted(() => {
      // Listen for the contact section visibility event
      document.addEventListener('contact-section-visible', handleContactSectionVisible);
    });

    onUnmounted(() => {
      // Clean up event listener
      document.removeEventListener('contact-section-visible', handleContactSectionVisible);
    });

    return {
      openCookieManager,
      shouldHideButton
    };
  }
}
</script>
