<template>
  <div class="cookie-manager">
    <button @click="openSettings" class="cookie-manager__button">
      Cookie-Einstellungen
    </button>

    <!-- Cookie Settings Modal -->
    <div v-if="showSettings" class="cookie-manager__modal">
      <div class="cookie-manager__modal-content">
        <div class="cookie-manager__modal-header">
          <h2 class="cookie-manager__title">Cookie-Einstellungen</h2>
          <button @click="closeSettings" class="cookie-manager__close" aria-label="Schließen">
            &times;
          </button>
        </div>

        <div class="cookie-manager__modal-body">
          <div class="cookie-manager__settings-section">
            <div class="cookie-manager__settings-item">
              <div class="cookie-manager__settings-info">
                <h3 class="cookie-manager__settings-title">Notwendige Cookies</h3>
                <p class="cookie-manager__settings-description">
                  Diese Cookies sind für das Funktionieren der Website unerlässlich und können nicht deaktiviert werden.
                </p>
              </div>
              <div class="cookie-manager__toggle cookie-manager__toggle--disabled">
                <span class="cookie-manager__toggle-slider"></span>
              </div>
            </div>

            <div class="cookie-manager__settings-item">
              <div class="cookie-manager__settings-info">
                <h3 class="cookie-manager__settings-title">Funktionale Cookies</h3>
                <p class="cookie-manager__settings-description">
                  Diese Cookies ermöglichen erweiterte Funktionen und Personalisierung.
                </p>
              </div>
              <div
                class="cookie-manager__toggle"
                :class="{ 'cookie-manager__toggle--active': cookieSettings.functional }"
                @click="toggleCookieSetting('functional')"
              >
                <span class="cookie-manager__toggle-slider"></span>
              </div>
            </div>

            <div class="cookie-manager__settings-item">
              <div class="cookie-manager__settings-info">
                <h3 class="cookie-manager__settings-title">Analytische Cookies</h3>
                <p class="cookie-manager__settings-description">
                  Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.
                </p>
              </div>
              <div
                class="cookie-manager__toggle"
                :class="{ 'cookie-manager__toggle--active': cookieSettings.analytics }"
                @click="toggleCookieSetting('analytics')"
              >
                <span class="cookie-manager__toggle-slider"></span>
              </div>
            </div>

            <div class="cookie-manager__settings-item">
              <div class="cookie-manager__settings-info">
                <h3 class="cookie-manager__settings-title">Marketing Cookies</h3>
                <p class="cookie-manager__settings-description">
                  Diese Cookies werden verwendet, um Werbung relevanter für Sie zu gestalten.
                </p>
              </div>
              <div
                class="cookie-manager__toggle"
                :class="{ 'cookie-manager__toggle--active': cookieSettings.marketing }"
                @click="toggleCookieSetting('marketing')"
              >
                <span class="cookie-manager__toggle-slider"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="cookie-manager__modal-footer">
          <button @click="saveCookieSettings" class="cookie-manager__button cookie-manager__button--save">
            Einstellungen speichern
          </button>
          <button @click="acceptAllCookies" class="cookie-manager__button cookie-manager__button--accept">
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Backdrop -->
    <div v-if="showSettings" class="cookie-manager__backdrop" @click="closeSettings"></div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { applyCookieSettings } from '../../services/cookieService';

export default {
  name: 'CookieManager',
  setup() {
    const showSettings = ref(false);
    const cookieSettings = reactive({
      necessary: true, // Always true and cannot be changed
      functional: false,
      analytics: false,
      marketing: false
    });

    // Load saved cookie settings
    const loadCookieSettings = () => {
      const consent = localStorage.getItem('cookieConsent');
      if (consent) {
        try {
          const savedSettings = JSON.parse(consent);
          Object.assign(cookieSettings, savedSettings);
        } catch (e) {
          console.error('Error parsing cookie consent:', e);
        }
      }
    };

    // Save cookie settings
    const saveCookieSettings = () => {
      localStorage.setItem('cookieConsent', JSON.stringify(cookieSettings));
      applyCookieSettings(cookieSettings);
      showSettings.value = false;
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

    // Open settings modal
    const openSettings = () => {
      loadCookieSettings(); // Reload settings before showing modal
      showSettings.value = true;
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };

    // Close settings modal
    const closeSettings = () => {
      showSettings.value = false;
      document.body.style.overflow = ''; // Restore scrolling
    };

    onMounted(() => {
      loadCookieSettings();

      // Add event listener for the custom event from CookieButton
      document.addEventListener('open-cookie-settings', openSettings);
    });

    onBeforeUnmount(() => {
      // Clean up event listener
      document.removeEventListener('open-cookie-settings', openSettings);
    });

    return {
      showSettings,
      cookieSettings,
      saveCookieSettings,
      acceptAllCookies,
      toggleCookieSetting,
      openSettings,
      closeSettings
    };
  }
}
</script>

<!-- Styles moved to _cookie-manager.scss -->
<style lang="scss" scoped>
// No inline styles needed - using global styles from _cookie-manager.scss
</style>
