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
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    background-color: transparent;
    border: 1px solid white;

    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
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
      border: 1px solid rgba(#333, 0.5);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

      &:hover {
        background-color: rgba(#333, 0.05);
      }
    }

    .horizontal-nav__arrow {
      filter: brightness(0.3); /* Make the SVG dark gray */

      &:hover {
        filter: brightness(0); /* Make the SVG black on hover */
      }
    }
  }

  /* Light theme variant with more visibility */
  &.light {
    .horizontal-nav__prev,
    .horizontal-nav__next {
      background-color: rgba(255, 255, 255, 0.8);
      border: 2px solid #4D4D4D;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

      &:hover {
        background-color: white;
        transform: translateY(-2px);
      }
    }

    .horizontal-nav__arrow {
      filter: brightness(0); /* Make the SVG black */
    }
  }
}
</style>
