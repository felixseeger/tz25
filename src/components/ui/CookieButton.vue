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
import { useScrollTo } from '../../composables/useScrollTo';

export default {
  name: 'CookieButton',
  setup() {
    // Use the active section composable to track the current section
    const { activeSection } = useActiveSection();
    const { scrollToSection } = useScrollTo();
    const isContactSectionVisible = ref(false);
    const isHistorySectionVisible = ref(false);
    const isMenuOpen = ref(false);
    const isCookieBannerVisible = ref(false);

    // Compute whether the button should be hidden
    const shouldHideButton = computed(() => {
      // Debug logs
      console.log('Cookie button - Active section:', activeSection.value);
      console.log('Cookie button - Contact visible:', isContactSectionVisible.value);
      console.log('Cookie button - Menu open:', isMenuOpen.value);
      console.log('Cookie button - Cookie banner visible:', isCookieBannerVisible.value);

      // Hide when in contact section, footer section, when menu is open, or when cookie banner is visible
      const inContactSection = activeSection.value === 'contact' || isContactSectionVisible.value;
      const inFooterSection = activeSection.value === 'footer';

      // Check if we're near the bottom of the page
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

      // For debugging purposes, log the current state
      console.log('Cookie button should hide:',
        inContactSection || inFooterSection || isMenuOpen.value || isCookieBannerVisible.value || isNearBottom);

      // Hide when in contact section, footer section, when menu is open, when cookie banner is visible, or near bottom
      return inContactSection || inFooterSection || isMenuOpen.value || isCookieBannerVisible.value || isNearBottom;
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

    // Handle the menu overlay state change event
    const handleMenuOverlayStateChanged = (event) => {
      isMenuOpen.value = event.detail.isOpen;
      console.log('Cookie button - Menu overlay state changed:', event.detail.isOpen);
    };

    // Handle the cookie banner visibility change event
    const handleCookieBannerVisibilityChanged = (event) => {
      isCookieBannerVisible.value = event.detail.isVisible;
      console.log('Cookie button - Cookie banner visibility changed:', event.detail.isVisible);
    };

    // Force re-evaluation of shouldHideButton on scroll
    const handleScroll = () => {
      // This will trigger a re-evaluation of the computed property
      const contactSection = document.getElementById('contact');
      const footerSection = document.getElementById('footer');

      // Check if active section is 'contact' or 'footer' regardless of DOM element
      if (activeSection.value === 'contact' || activeSection.value === 'footer') {
        isContactSectionVisible.value = true;
        return;
      }

      // Check URL hash
      if (window.location.hash === '#contact' || window.location.hash === '#footer') {
        isContactSectionVisible.value = true;
        return;
      }

      // Check if any of the sections that should hide the button are visible
      const checkSectionVisibility = (section) => {
        if (!section) return false;

        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Consider visible if any part of the section is in the viewport
        const isPartiallyVisible = rect.top < viewportHeight && rect.bottom > 0;

        // Consider visible if we're approaching the section (within 300px)
        const isApproaching = rect.top > 0 && rect.top < viewportHeight + 300;

        // Consider visible if we're scrolling through the section
        const isScrollingThrough = rect.top <= 0 && rect.bottom >= 0;

        // Consider visible if we're near the bottom of the page
        const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

        return isPartiallyVisible || isApproaching || isScrollingThrough || isNearBottom;
      };

      // Get the total height of the document and the current scroll position
      const totalHeight = document.body.scrollHeight;
      const scrollPosition = window.scrollY + window.innerHeight;
      const scrollPercentage = (scrollPosition / totalHeight) * 100;

      // If we're in the bottom 20% of the page, consider contact/footer visible
      if (scrollPercentage > 80) {
        isContactSectionVisible.value = true;
        return;
      }

      // Check contact section
      if (contactSection && checkSectionVisibility(contactSection)) {
        isContactSectionVisible.value = true;
        return;
      }

      // Check footer section
      if (footerSection && checkSectionVisibility(footerSection)) {
        isContactSectionVisible.value = true;
        return;
      }

      // If none of the sections are visible, set to false
      isContactSectionVisible.value = false;
    };

    onMounted(() => {
      // Listen for the contact section visibility event
      document.addEventListener('contact-section-visible', handleContactSectionVisible);

      // Listen for the menu overlay state change event
      document.addEventListener('menu-overlay-state-changed', handleMenuOverlayStateChanged);

      // Listen for the cookie banner visibility change event
      document.addEventListener('cookie-banner-visibility-changed', handleCookieBannerVisibilityChanged);

      // Add scroll event listener
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Initial check with a small delay to ensure DOM is fully loaded
      setTimeout(() => {
        handleScroll();

        // Force a second check after a longer delay
        setTimeout(handleScroll, 500);
      }, 100);

      // Check if cookie banner is currently visible
      const cookieBanner = document.querySelector('.cookie-banner');
      if (cookieBanner && window.getComputedStyle(cookieBanner).display !== 'none') {
        isCookieBannerVisible.value = true;
      }

      // Check if we're already at the bottom of the page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        isContactSectionVisible.value = true;
      }
    });

    onUnmounted(() => {
      // Clean up event listeners
      document.removeEventListener('contact-section-visible', handleContactSectionVisible);
      document.removeEventListener('menu-overlay-state-changed', handleMenuOverlayStateChanged);
      document.removeEventListener('cookie-banner-visibility-changed', handleCookieBannerVisibilityChanged);
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      openCookieManager,
      shouldHideButton
    };
  }
}
</script>
