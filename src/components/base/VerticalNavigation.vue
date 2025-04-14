<template>
  <div class="vertical-nav">
    <button class="vertical-nav__prev" @click="$emit('prev')" aria-label="Previous">
      <img src="../../assets/images/arrow_up.svg" alt="Previous" class="vertical-nav__arrow vertical-nav__arrow--up">
    </button>
    <button class="vertical-nav__next" @click="$emit('next')" aria-label="Next">
      <img src="../../assets/images/arrow_down.svg" alt="Next" class="vertical-nav__arrow vertical-nav__arrow--down">
    </button>
  </div>
</template>

<script>
export default {
  name: 'VerticalNavigation',
  emits: ['prev', 'next']
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.vertical-nav {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;

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
    position: relative;

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
    .vertical-nav__prev,
    .vertical-nav__next {
      border: 2px solid #333;
      background-color: rgba(255, 255, 255, 0.2);

      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }

    .vertical-nav__arrow {
      filter: brightness(0); /* Make the SVG black */
    }
  }
}
</style>
