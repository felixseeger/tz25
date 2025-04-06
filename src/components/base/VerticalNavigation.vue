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
    background: transparent;
    color: #333;
    width: 50px;
    height: 50px;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(#333, 0);
      transition: background-color 0.3s ease;
      z-index: 0;
    }

    &:hover {
      transform: scale(1.1);
   
      

      &::before {
        
      }

      .vertical-nav__arrow {
        transform: scale(1.2);
        
      }
    }
  }

  &__arrow {
    width: 24px;
    height: 24px;
    filter: brightness(0); /* Make the SVG black */
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;

    &--up {
      
      /* transform: rotate(-90deg);  Rotate left arrow to point up */
    }

    &--down {
      /* transform: rotate(90deg); /* Rotate right arrow to point down */
    }
  }

  /* Light theme variant */
  &.light {
    .vertical-nav__prev,
    .vertical-nav__next {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

      &:hover {
        background-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        transform: scale(1.1);

        .vertical-nav__arrow {
          transform: scale(1.2);
        }
      }
    }

    .vertical-nav__arrow {
      filter: brightness(0) invert(0); /* Make the SVG white */

      &--up {
       /* transform: rotate(-90deg); /* Rotate left arrow to point up */
      }

      &--down {
       /* transform: rotate(90deg); /* Rotate right arrow to point down */
      }
    }
  }
}
</style>
