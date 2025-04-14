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
  margin-top: 2rem;
  position: relative;
  z-index: 10;
  width: 100%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;

  &__prev,
  &__next {
    width: 40px;
    height: 40px;
    border: 2px solid white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: rgba(0, 0, 0, 0.2);

    &:hover {
      transform: scale(1.1);
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  &__arrow {
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(1); /* Make the SVG white */
    transition: all 0.3s ease;
  }

  /* Dark theme variant */
  &.dark {
    .horizontal-nav__prev,
    .horizontal-nav__next {
      border: 2px solid #333;
      background-color: rgba(255, 255, 255, 0.2);

      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }

    .horizontal-nav__arrow {
      filter: brightness(0); /* Make the SVG black */
    }
  }
}
</style>
