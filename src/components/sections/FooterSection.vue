<template>
    <footer id="footer" class="footer">
      <div class="footer__container">
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
  import { ref, onMounted, onUnmounted } from 'vue';

  export default {
    name: 'FooterSection',
    components: {},
    setup() {
      const { scrollToTop } = useScrollTo();
      const observer = ref(null);
      const isVisible = ref(false);

      // Function to open cookie settings
      const openCookieSettings = () => {
        // Create and dispatch a custom event that the CookieBanner will listen for
        const event = new CustomEvent('open-cookie-settings');
        document.dispatchEvent(event);
        console.log('Cookie settings button clicked from footer');
      };

      // Set up intersection observer to detect when the footer is visible
      const setupIntersectionObserver = () => {
        // Create a new Intersection Observer
        observer.value = new IntersectionObserver(
          (entries) => {
            // Check if the section is intersecting (visible)
            if (entries[0].isIntersecting) {
              isVisible.value = true;

              // Dispatch a custom event to notify other components
              const event = new CustomEvent('footer-section-visible', { detail: { visible: true } });
              document.dispatchEvent(event);
              console.log('Footer section visible event dispatched: true');
            } else {
              isVisible.value = false;

              // Dispatch a custom event to notify other components
              const event = new CustomEvent('footer-section-visible', { detail: { visible: false } });
              document.dispatchEvent(event);
              console.log('Footer section visible event dispatched: false');
            }
          },
          {
            // Options for the observer
            threshold: 0.1, // Trigger when just 10% of the section is visible
            rootMargin: '0px' // No margin
          }
        );

        // Start observing the section
        const section = document.getElementById('footer');
        if (section) {
          observer.value.observe(section);
        }
      };

      onMounted(() => {
        // Set up the intersection observer
        setupIntersectionObserver();
      });

      onUnmounted(() => {
        // Clean up observer when component is unmounted
        if (observer.value) {
          observer.value.disconnect();
        }
      });

      return {
        currentYear: new Date().getFullYear(),
        scrollToTop,
        openCookieSettings,
        isVisible
      };
    }
  }
  </script>

