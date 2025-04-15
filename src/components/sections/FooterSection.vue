<template>
    <footer id="footer" class="footer">
      <div class="footer__container section-container">
        <div class="footer__content">

        </div>

        <div class="footer__cart-icon">
          <img src="../../assets/images/cart.svg" alt="Shopping Cart" class="cart-icon">
        </div>

        <div class="footer__bottom">
          <!-- Legal Column -->
          <div class="footer__column footer__column--legal">
            <ul class="footer__links">
              <li><router-link to="/impressum">Impressum</router-link></li>
              <li><router-link to="/agb">AGB</router-link></li>
              <li><router-link to="/datenschutz">Datenschutz</router-link></li>
              <li><router-link to="/karriere">Karriere</router-link></li>
              <li><button class="footer__cookie-button" @click="openCookieSettings">Cookie-Einstellungen</button></li>
            </ul>
          </div>
          <!-- <div class="footer__copyright">
            <p>&copy; {{ currentYear }} TAKTZEIT GMBH. ALLE RECHTE VORBEHALTEN.</p>
          </div> -->

        </div>

      </div>
    </footer>
  </template>

  <script>
  import { useScrollTo } from '../../composables/useScrollTo';

  export default {
    name: 'FooterSection',
    components: {},
    setup() {
      const { scrollToTop } = useScrollTo();

      // Function to open cookie settings
      const openCookieSettings = () => {
        // Create and dispatch a custom event that the CookieBanner will listen for
        const event = new CustomEvent('open-cookie-settings');
        document.dispatchEvent(event);
        console.log('Cookie settings button clicked from footer');
      };

      return {
        currentYear: new Date().getFullYear(),
        scrollToTop,
        openCookieSettings
      };
    }
  }
  </script>

