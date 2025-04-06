<template>
  <div class="app-layout">
    <!-- Header/Navigation -->
    <header class="app-layout__header">
      <NavBar />
    </header>

    <!-- Main Content -->
    <main class="app-layout__content">
      <!-- Default slot for page content -->
      <slot></slot>
    </main>

    <!-- Fixed UI Elements -->
    <div class="app-layout__ui-elements">
      <ContactButton />
      <CookieButton />
      <ScrollToTop />
      <FixedHistoryButton />
    </div>

    <!-- Cookie Banner -->
    <CookieBanner @cookies-set="handleCookieSettings" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { NavBar } from '../navigation';
import {
  ContactButton,
  CookieButton,
  ScrollToTop,
  CookieBanner,
  FixedHistoryButton
} from '../ui';
import { applyCookieSettings } from '../../services/cookieService';

export default defineComponent({
  name: 'AppLayout',
  components: {
    NavBar,
    ContactButton,
    CookieButton,
    ScrollToTop,
    CookieBanner,
    FixedHistoryButton
  },
  setup() {
    /**
     * Handle cookie settings when user makes a choice
     * @param {Object} settings - The cookie settings object
     */
    const handleCookieSettings = (settings) => {
      applyCookieSettings(settings);
      console.log('Cookie settings applied:', settings);
    };

    // Timeline functionality is now handled directly in the FixedHistoryButton component

    return {
      handleCookieSettings
    };
  }
});
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__header {
    position: relative;
    z-index: $z-index-navbar;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: $z-index-content;
  }

  &__ui-elements {
    position: fixed;
    z-index: $z-index-ui-elements;
    pointer-events: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    /* This ensures the UI elements themselves can receive pointer events */
    > * {
      pointer-events: auto;
    }
  }
}
</style>
