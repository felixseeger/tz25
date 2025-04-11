<template>
  <div class="scroll-to-top" :class="{ 'visible': isVisible && !isCookieSettingsOpen }">
    <button @click="scrollToTop" class="scroll-to-top__button" aria-label="Scroll to top">
      <img src="../../assets/images/arrow-up.svg" alt="Scroll to top" class="arrow-up-icon">
    </button>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useScrollTo } from '../../composables/useScrollTo'

export default {
  name: 'ScrollToTop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 400
    },
    right: {
      type: String,
      default: '40px'
    },
    bottom: {
      type: String,
      default: '40px'
    },
    zIndex: {
      type: Number,
      default: 99
    }
  },
  setup(props) {
    const isVisible = ref(false)
    const isCookieSettingsOpen = ref(false)
    const { scrollToTop } = useScrollTo()

    const checkScroll = () => {
      isVisible.value = window.pageYOffset > props.visibilityHeight
    }

    // Handle cookie settings opened event
    const handleCookieSettingsOpened = () => {
      isCookieSettingsOpen.value = true
    }

    // Handle cookie settings closed event
    const handleCookieSettingsClosed = () => {
      isCookieSettingsOpen.value = false
    }

    onMounted(() => {
      window.addEventListener('scroll', checkScroll)
      checkScroll() // Check initial scroll position

      // Listen for cookie settings events
      document.addEventListener('cookie-settings-opened', handleCookieSettingsOpened)
      document.addEventListener('cookie-settings-closed', handleCookieSettingsClosed)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', checkScroll)
      document.removeEventListener('cookie-settings-opened', handleCookieSettingsOpened)
      document.removeEventListener('cookie-settings-closed', handleCookieSettingsClosed)
    })

    return {
      isVisible,
      isCookieSettingsOpen,
      scrollToTop
    }
  }
}
</script>

<!-- Styles moved to _scroll-to-top.scss -->
<style lang="scss" scoped>
// Dynamic styles that need to be bound to props
.scroll-to-top {
  right: v-bind(right);
  bottom: v-bind(bottom);
  z-index: v-bind(zIndex);
}
</style>
