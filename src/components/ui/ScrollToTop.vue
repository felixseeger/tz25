<template>
  <div class="scroll-to-top" :class="{ 'visible': isVisible }">
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
    const { scrollToTop } = useScrollTo()

    const checkScroll = () => {
      isVisible.value = window.pageYOffset > props.visibilityHeight
    }

    onMounted(() => {
      window.addEventListener('scroll', checkScroll)
      checkScroll() // Check initial scroll position
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', checkScroll)
    })

    return {
      isVisible,
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
