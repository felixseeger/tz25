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
  gap: 3rem;
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
    border: none; /* Removed border */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: transparent;
    /* Add focus styles for accessibility */
    outline: none;
    position: relative;
    z-index: 20;

    &:hover {
      transform: scale(1.1);
    }

    &:focus {
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
    }

    @media (max-width: $breakpoint-md) {
      width: 50px;
      height: 50px;
      transform: scale(1.5); /* Scale up more on medium screens */
    }

    @media (max-width: $breakpoint-sm) {
      width: 60px;
      height: 60px;
      transform: scale(1.8); /* Scale up significantly on small screens */

      &:hover {
        transform: scale(2);
      }
    }
  }

  &__arrow {
    width: 30px;
    height: 30px;
    filter: brightness(0) invert(1); /* Make the SVG white */
    transition: all 0.3s ease;

    @media (max-width: $breakpoint-md) {
      width: 35px;
      height: 35px;
    }

    @media (max-width: $breakpoint-sm) {
      width: 40px;
      height: 40px;
    }
  }

  @media (max-width: $breakpoint-md) {
    gap: 3rem;
  }

  @media (max-width: $breakpoint-sm) {
    gap: 4rem;
  }

  /* Dark theme variant */
  &.dark {
    .horizontal-nav__prev,
    .horizontal-nav__next {
      background-color: rgba(255, 255, 255, 0.8);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

      &:hover {
        background-color: $primary-color;

        .horizontal-nav__arrow {
          filter: brightness(0) invert(1); /* Make the SVG white on hover */
        }
      }

      &:focus {
        box-shadow: 0 0 0 3px rgba($primary-color, 0.5);
      }

      @media (max-width: $breakpoint-md) {
        background-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }

      @media (max-width: $breakpoint-sm) {
        background-color: rgba(255, 255, 255, 0.7);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }
    }

    .horizontal-nav__arrow {
      filter: brightness(0); /* Make the SVG black */

      @media (max-width: $breakpoint-md) {
        filter: brightness(0); /* Keep the SVG black for better visibility */
      }

      @media (max-width: $breakpoint-sm) {
        filter: brightness(0); /* Keep the SVG black for better visibility */
      }
    }
  }
}
</style>
