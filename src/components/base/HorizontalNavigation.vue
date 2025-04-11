<template>
  <div class="horizontal-nav">
    <button class="horizontal-nav__prev" @click="$emit('prev')" aria-label="Previous">
      <img src="../../assets/images/arrow_left.svg" alt="Previous" class="horizontal-nav__arrow">
    </button>
    <button class="horizontal-nav__next" @click="$emit('next')" aria-label="Next">
      <img src="../../assets/images/arrow_right.svg" alt="Next" class="horizontal-nav__arrow">
    </button>
  </div>
</template>

<script>
export default {
  name: 'HorizontalNavigation',
  emits: ['prev', 'next']
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.horizontal-nav {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  position: relative;
  z-index: 10;
  width: 100%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;

  &__prev,
  &__next {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: transparent;
    border: 1px solid white;

    &:hover {
      transform: translateY(-2px);
      border-color: rgba(255, 255, 255, 0.8);
    }

    &:active {
      transform: translateY(0);
    }
  }

  &__arrow {
    width: 20px;
    height: 20px;
    filter: brightness(0) invert(1); /* Make the SVG white */
    transition: transform 0.3s ease;
  }

  /* Dark theme variant */
  &.dark {
    .horizontal-nav__prev,
    .horizontal-nav__next {
      background: transparent;
      border: 1px solid rgba(#333, 0.8);

      &:hover {
        border-color: rgba(#333, 1);
      }
    }

    .horizontal-nav__arrow {
      filter: brightness(0.3); /* Make the SVG dark gray */

      &:hover {
        filter: brightness(0); /* Make the SVG black on hover */
      }
    }
  }
}
</style>
