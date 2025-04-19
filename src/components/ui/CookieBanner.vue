<template>
  <transition name="cookie-banner">
    <div v-if="showBanner" class="cookie-banner" :class="{ 'settings-open': showSettings }">
      <!-- Initial Banner -->
      <div v-if="!showSettings" class="cookie-banner__initial">
        <div class="cookie-banner__content">
          <h2 class="cookie-banner__title">Cookie-Einstellungen</h2>
          <p class="cookie-banner__text">
            Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
            Einige sind notwendig für den Betrieb der Seite, während andere uns helfen,
            diese Website und Ihre Erfahrung zu verbessern.
          </p>
        </div>
        <div class="cookie-banner__actions">
          <button @click="acceptAllCookies" class="cookie-banner__button cookie-banner__button--accept">
            Alle akzeptieren
          </button>
          <button @click="openSettings" class="cookie-banner__button cookie-banner__button--settings">
            Einstellungen
          </button>
        </div>
      </div>

      <!-- Detailed Settings -->
      <div v-else class="cookie-banner__settings">
        <div class="cookie-banner__settings-header">
          <h2 class="cookie-banner__title">Cookie-Einstellungen</h2>
          <button @click="closeSettings" class="cookie-banner__close" aria-label="Schließen">
            &times;
          </button>
        </div>

        <div class="cookie-banner__settings-content">
          <div class="cookie-banner__settings-section">
            <div class="cookie-banner__settings-item">
              <div class="cookie-banner__settings-info">
                <h3 class="cookie-banner__settings-title">Notwendige Cookies</h3>
                <p class="cookie-banner__settings-description">
                  Diese Cookies sind für das Funktionieren der Website unerlässlich und können nicht deaktiviert werden.
                </p>
              </div>
              <div class="cookie-banner__toggle cookie-banner__toggle--disabled">
                <span class="cookie-banner__toggle-slider"></span>
              </div>
            </div>

            <div class="cookie-banner__settings-item">
              <div class="cookie-banner__settings-info">
                <h3 class="cookie-banner__settings-title">Funktionale Cookies</h3>
                <p class="cookie-banner__settings-description">
                  Diese Cookies ermöglichen erweiterte Funktionen und Personalisierung.
                </p>
              </div>
              <div
                class="cookie-banner__toggle"
                :class="{ 'cookie-banner__toggle--active': cookieSettings.functional }"
                @click="toggleCookieSetting('functional')"
              >
                <span class="cookie-banner__toggle-slider"></span>
              </div>
            </div>

            <div class="cookie-banner__settings-item">
              <div class="cookie-banner__settings-info">
                <h3 class="cookie-banner__settings-title">Analytische Cookies</h3>
                <p class="cookie-banner__settings-description">
                  Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.
                </p>
              </div>
              <div
                class="cookie-banner__toggle"
                :class="{ 'cookie-banner__toggle--active': cookieSettings.analytics }"
                @click="toggleCookieSetting('analytics')"
              >
                <span class="cookie-banner__toggle-slider"></span>
              </div>
            </div>

            <div class="cookie-banner__settings-item">
              <div class="cookie-banner__settings-info">
                <h3 class="cookie-banner__settings-title">Marketing Cookies</h3>
                <p class="cookie-banner__settings-description">
                  Diese Cookies werden verwendet, um Werbung relevanter für Sie zu gestalten.
                </p>
              </div>
              <div
                class="cookie-banner__toggle"
                :class="{ 'cookie-banner__toggle--active': cookieSettings.marketing }"
                @click="toggleCookieSetting('marketing')"
              >
                <span class="cookie-banner__toggle-slider"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="cookie-banner__settings-footer">
          <button @click="saveCookieSettings" class="cookie-banner__button cookie-banner__button--save">
            Einstellungen speichern
          </button>
          <button @click="acceptAllCookies" class="cookie-banner__button cookie-banner__button--accept">
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

export default {
  name: 'CookieBanner',
  emits: ['cookies-set'],
  setup(props, { emit }) {
    const showBanner = ref(false);
    const showSettings = ref(false);
    const cookieSettings = reactive({
      necessary: true, // Always true and cannot be changed
      functional: false,
      analytics: false,
      marketing: false
    });

    // Function to emit banner visibility change event
    const emitBannerVisibilityChange = (isVisible) => {
      document.dispatchEvent(new CustomEvent('cookie-banner-visibility-changed', {
        detail: { isVisible }
      }));
      console.log('Cookie banner visibility changed:', isVisible);
    };

    // Check if cookie consent has already been given
    const checkCookieConsent = () => {
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        showBanner.value = true;
        emitBannerVisibilityChange(true);
      } else {
        try {
          const savedSettings = JSON.parse(consent);
          Object.assign(cookieSettings, savedSettings);
          emit('cookies-set', cookieSettings);
        } catch (e) {
          console.error('Error parsing cookie consent:', e);
          showBanner.value = true;
          emitBannerVisibilityChange(true);
        }
      }
    };

    // Save cookie settings to localStorage
    const saveCookieSettings = () => {
      localStorage.setItem('cookieConsent', JSON.stringify(cookieSettings));
      showBanner.value = false;
      showSettings.value = false;
      emit('cookies-set', cookieSettings);
      emitBannerVisibilityChange(false);
    };

    // Accept all cookies
    const acceptAllCookies = () => {
      cookieSettings.functional = true;
      cookieSettings.analytics = true;
      cookieSettings.marketing = true;
      saveCookieSettings();
    };

    // Toggle individual cookie settings
    const toggleCookieSetting = (type) => {
      if (type !== 'necessary') { // Necessary cookies cannot be toggled
        cookieSettings[type] = !cookieSettings[type];
      }
    };

    // Open detailed settings
    const openSettings = () => {
      showSettings.value = true;
    };

    // Close detailed settings
    const closeSettings = () => {
      showSettings.value = false;
    };

    // Reset cookie consent (for testing)
    const resetCookieConsent = () => {
      localStorage.removeItem('cookieConsent');
      cookieSettings.functional = false;
      cookieSettings.analytics = false;
      cookieSettings.marketing = false;
      showBanner.value = true;
      showSettings.value = false;
    };

    // Listen for the open-cookie-settings event
    const handleOpenCookieSettings = () => {
      showBanner.value = true;
      showSettings.value = true;
      emitBannerVisibilityChange(true);
    };

    onMounted(() => {
      checkCookieConsent();

      // Add event listener for the open-cookie-settings event
      document.addEventListener('open-cookie-settings', handleOpenCookieSettings);
    });

    // Clean up event listener when component is unmounted
    onUnmounted(() => {
      document.removeEventListener('open-cookie-settings', handleOpenCookieSettings);
    });

    return {
      showBanner,
      showSettings,
      cookieSettings,
      saveCookieSettings,
      acceptAllCookies,
      toggleCookieSetting,
      openSettings,
      closeSettings,
      resetCookieConsent
    };
  }
}
</script>

<!-- Styles moved to _cookie-banner.scss -->
<style lang="scss" scoped>
// No inline styles needed - using global styles from _cookie-banner.scss
</style>
