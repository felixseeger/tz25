<template>
  <transition
    :name="name"
    :mode="mode"
    :appear="appear"
    :duration="duration"
    v-bind="$attrs"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'PageTransitionAnimation',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: 'fade'
    },
    mode: {
      type: String,
      default: 'out-in'
    },
    appear: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, Object],
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
// Import transitions from the global styles
@import '../assets/scss/components/_page-transitions.scss';

// Additional transition types can be added here
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  @extend .page-transition-base;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
