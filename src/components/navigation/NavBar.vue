<template>
  <nav class="navbar" :class="{ 'navbar--open': menuOpen, 'navbar--scrolled': isScrolled }">
    <div class="navbar__container">
      <div class="navbar__logo">
        <router-link to="/" @click="closeMenu">
          <img src="../../assets/images/logo.svg" alt="TAKTZEIT Logo" />
        </router-link>
      </div>
      <div class="navbar__links">
        <div class="navbar__social">
          <a href="https://www.facebook.com/TAKTZEIT/" class="navbar__social-link" target="_blank" rel="noopener noreferrer">
            <img src="../../assets/images/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/taktzeit/" class="navbar__social-link" target="_blank" rel="noopener noreferrer">
            <img src="../../assets/images/instagram.svg" alt="Instagram" />
          </a>
          <a href="https://www.linkedin.com/company/taktzeit-gmbh---marketing-kommunikation/" class="navbar__social-link" target="_blank" rel="noopener noreferrer">
            <img src="../../assets/images/linkedin.svg" alt="LinkedIn" />
          </a>
        </div>
        <button
          class="navbar__toggle"
          @click="toggleMenu"
          :class="{ 'navbar__toggle--active': menuOpen }"
          aria-label="Toggle menu"
        >
          <template v-if="!menuOpen">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H21" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
              <path d="M3 12H21" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
              <path d="M3 18H21" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </template>
          <template v-else>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6L18 18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </template>
        </button>
      </div>
    </div>

    <!-- Menu Overlay -->
    <div class="menu-overlay" :class="{ 'is-active': menuOpen }">
      <div class="menu-overlay__content">
        <!-- Top bar with logo and close button -->
        <div class="menu-overlay__top-bar">
          <!-- Logo at the top left -->
          <div class="menu-overlay__logo">
            <router-link to="/" @click="closeMenu">
              <img src="../../assets/images/logo.svg" alt="TAKTZEIT Logo" />
            </router-link>
          </div>

          <!-- Close button at the top right -->
          <button
            class="menu-overlay__close-button"
            @click="closeMenu"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6L18 18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <nav class="menu-overlay__nav">
          <!-- Column 1: Main Sections -->
          <div class="menu-overlay__column">
            <h3 class="menu-overlay__column-title">NAVIGATION</h3>
            <div class="menu-overlay__section">
              <a href="#hero" class="menu-overlay__link" @click.prevent="navigateToSection('hero')" :class="{ 'active': isActiveSection('hero') }">STARTSEITE</a>
              <a href="#journey" class="menu-overlay__link" @click.prevent="navigateToSection('journey')" :class="{ 'active': isActiveSection('journey') }">ÜBER UNS</a>
              <a href="#testimonials" class="menu-overlay__link" @click.prevent="navigateToSection('testimonials')" :class="{ 'active': isActiveSection('testimonials') }">KUNDEN</a>
              <a href="#team" class="menu-overlay__link" @click.prevent="navigateToSection('team')" :class="{ 'active': isActiveSection('team') }">TEAM TAKTZEIT</a>
              <a href="#services" class="menu-overlay__link" @click.prevent="navigateToSection('services')" :class="{ 'active': isActiveSection('services') }">LEISTUNGEN</a>
              <a href="#history" class="menu-overlay__link" @click.prevent="navigateToSection('history')" :class="{ 'active': isActiveSection('history') }">GESCHICHTE</a>
              <a href="#portfolio" class="menu-overlay__link" @click.prevent="navigateToSection('portfolio')" :class="{ 'active': isActiveSection('portfolio') }">PORTFOLIO</a>
              <a href="#brand" class="menu-overlay__link" @click.prevent="navigateToSection('brand')" :class="{ 'active': isActiveSection('brand') }">MARKE & DESIGN</a>
              <a href="#contact" class="menu-overlay__link" @click.prevent="navigateToSection('contact')" :class="{ 'active': isActiveSection('contact') }">KONTAKT</a>
            </div>
          </div>

          <!-- Column 2: Separate Pages -->
          <div class="menu-overlay__column">
            <h3 class="menu-overlay__column-title">BRANCHEN</h3>
            <div class="menu-overlay__section">
              <router-link to="/karriere" class="menu-overlay__link" @click="closeMenu">KARRIERE</router-link>
              <router-link to="/employer-branding" class="menu-overlay__link" @click="closeMenu">
                EMPLOYER BRANDING <span class="new-tag">NEW</span>
              </router-link>
              <router-link to="/packaging" class="menu-overlay__link" @click="closeMenu">
                PACKAGING <span class="new-tag">NEW</span>
              </router-link>
              <router-link to="/automotive" class="menu-overlay__link" @click="closeMenu">
                AUTOMOTIVE <span class="new-tag">NEW</span>
              </router-link>
            </div>
          </div>

          <!-- Column 3: Legal Links and Social Media -->
          <div class="menu-overlay__column">
            <h3 class="menu-overlay__column-title">RECHTLICHES</h3>
            <div class="menu-overlay__section">
              <router-link to="/impressum" class="menu-overlay__link" @click="closeMenu">IMPRESSUM</router-link>
              <router-link to="/agb" class="menu-overlay__link" @click="closeMenu">AGB</router-link>
              <router-link to="/datenschutz" class="menu-overlay__link" @click="closeMenu">DATENSCHUTZ</router-link>
              <button class="menu-overlay__link menu-overlay__cookie-button" @click="openCookieSettings">COOKIE-EINSTELLUNGEN</button>
            </div>

            <!-- Social Media Icons -->
            <div class="menu-overlay__section menu-overlay__section--social">
              <h3 class="menu-overlay__column-title">SOCIAL MEDIA</h3>
              <div class="menu-overlay__social">
                <a href="https://www.facebook.com/taktzeit" target="_blank" rel="noopener" class="menu-overlay__social-link">
                  <img src="@/assets/images/facebook.svg" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/taktzeit" target="_blank" rel="noopener" class="menu-overlay__social-link">
                  <img src="@/assets/images/instagram.svg" alt="Instagram" />
                </a>
                <a href="https://www.linkedin.com/company/taktzeit" target="_blank" rel="noopener" class="menu-overlay__social-link">
                  <img src="@/assets/images/linkedin.svg" alt="LinkedIn" />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useNavigation } from '../../composables/useNavigation'
import { useActiveSection } from '../../composables/useActiveSection'

export default {
  name: 'NavBar',
  setup() {
    // State
    const menuOpen = ref(false)
    const scrollPosition = ref(0)
    const isScrolled = ref(false)
    const scrollThreshold = 50

    // Composables
    const { navigateToHomeSection } = useNavigation()
    const { activeSection, isActiveSection } = useActiveSection({
      rootMargin: '-30% 0px',
      defaultSection: 'hero'
    })

    // Methods
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value

      if (menuOpen.value) {
        // Store current scroll position
        scrollPosition.value = window.pageYOffset
        document.body.classList.add('menu-open')
        // Dispatch event for menu open
        document.dispatchEvent(new CustomEvent('menu-overlay-state-changed', { detail: { isOpen: true } }))
      } else {
        document.body.classList.remove('menu-open')
        // Restore scroll position
        window.scrollTo(0, scrollPosition.value)
        // Dispatch event for menu close
        document.dispatchEvent(new CustomEvent('menu-overlay-state-changed', { detail: { isOpen: false } }))
      }
    }

    const closeMenu = () => {
      if (menuOpen.value) {
        menuOpen.value = false
        document.body.classList.remove('menu-open')
        // Dispatch event for menu close
        document.dispatchEvent(new CustomEvent('menu-overlay-state-changed', { detail: { isOpen: false } }))
      }
    }

    const handleResize = () => {
      // Close menu on large screens if window is resized
      if (window.innerWidth >= 992 && menuOpen.value) {
        closeMenu()
      }
    }

    const handleKeydown = (event) => {
      // Close menu on ESC key
      if (event.key === 'Escape' && menuOpen.value) {
        closeMenu()
      }
    }

    const handleScroll = () => {
      // Add scrolled class when page is scrolled down
      isScrolled.value = window.scrollY > scrollThreshold
    }

    const navigateToSection = (sectionId) => {
      navigateToHomeSection(sectionId, { closeMenu })
    }

    // Function to open cookie settings
    const openCookieSettings = () => {
      // Create and dispatch a custom event that the CookieBanner will listen for
      const event = new CustomEvent('open-cookie-settings');
      document.dispatchEvent(event);
      console.log('Cookie settings button clicked from menu');
      closeMenu();
    }

    // Lifecycle hooks
    onMounted(() => {
      window.addEventListener('resize', handleResize)
      window.addEventListener('keydown', handleKeydown)
      window.addEventListener('scroll', handleScroll)
      handleResize()
      handleScroll()
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      menuOpen,
      isScrolled,
      activeSection,
      isActiveSection,
      toggleMenu,
      closeMenu,
      navigateToSection,
      openCookieSettings
    }
  }
}
</script>

<!-- Styles moved to _navbar.scss -->
<style lang="scss" scoped>
// No inline styles needed - using global styles from _navbar.scss
</style>