<template>
  <div class="cookie-button" :class="{ 'is-hidden': shouldHideButton, 'banner-closed': !isCookieBannerVisible }">
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
    const isCookieSettingsOpen = ref(false);
    const isCookieBannerVisible = ref(true); // Initially assume cookie banner is visible
    const hasUserInteractedWithCookies = ref(false); // Track if user has interacted with cookies

    // Compute whether the button should be hidden
    const shouldHideButton = computed(() => {
      // Hide when in contact or footer section (either by active section or by visibility event)
      // Also hide when cookie settings are open
      // Also hide when cookie banner is visible
      // Also hide when user hasn't interacted with cookies yet
      const shouldHide =
        activeSection.value === 'contact' ||
        activeSection.value === 'footer' ||
        isContactSectionVisible.value ||
        isFooterSectionVisible.value ||
        isCookieSettingsOpen.value ||
        isCookieBannerVisible.value ||
        !hasUserInteractedWithCookies.value;

      // Log for debugging
      console.log('Cookie button should hide:', shouldHide,
        'Active section:', activeSection.value,
        'Contact visible:', isContactSectionVisible.value,
        'Footer visible:', isFooterSectionVisible.value,
        'Cookie settings open:', isCookieSettingsOpen.value,
        'Cookie banner visible:', isCookieBannerVisible.value,
        'User interacted with cookies:', hasUserInteractedWithCookies.value);

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

    // Handle cookie settings opened event
    const handleCookieSettingsOpened = () => {
      isCookieSettingsOpen.value = true;
    };

    // Handle cookie settings closed event
    const handleCookieSettingsClosed = () => {
      isCookieSettingsOpen.value = false;
    };

    // Handle cookie banner closed event
    const handleCookieBannerClosed = () => {
      isCookieBannerVisible.value = false;
      hasUserInteractedWithCookies.value = true;
    };

    // Handle cookie banner opened event
    const handleCookieBannerOpened = () => {
      isCookieBannerVisible.value = true;
    };

    onMounted(() => {
      // Listen for the contact section visibility event
      document.addEventListener('contact-section-visible', handleContactSectionVisible);

      // Listen for the footer section visibility event
      document.addEventListener('footer-section-visible', handleFooterSectionVisible);

      // Listen for cookie settings events
      document.addEventListener('cookie-settings-opened', handleCookieSettingsOpened);
      document.addEventListener('cookie-settings-closed', handleCookieSettingsClosed);

      // Listen for cookie banner events
      document.addEventListener('cookie-banner-closed', handleCookieBannerClosed);
      document.addEventListener('cookie-banner-opened', handleCookieBannerOpened);

      // Check if cookie consent has already been given
      const consent = localStorage.getItem('cookieConsent');
      if (consent) {
        // User has already interacted with cookies
        hasUserInteractedWithCookies.value = true;
        isCookieBannerVisible.value = false;
      }
    });

    onUnmounted(() => {
      // Clean up event listeners
      document.removeEventListener('contact-section-visible', handleContactSectionVisible);
      document.removeEventListener('footer-section-visible', handleFooterSectionVisible);
      document.removeEventListener('cookie-settings-opened', handleCookieSettingsOpened);
      document.removeEventListener('cookie-settings-closed', handleCookieSettingsClosed);
      document.removeEventListener('cookie-banner-closed', handleCookieBannerClosed);
      document.removeEventListener('cookie-banner-opened', handleCookieBannerOpened);
    });

    return {
      openCookieManager,
      shouldHideButton,
      isCookieBannerVisible
    };
  }
}
</script>
