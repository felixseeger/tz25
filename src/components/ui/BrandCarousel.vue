<template>
  <div class="brand-carousel">
    <div class="carousel-container" ref="carouselContainer">
      <div
        class="carousel-slide"
        v-for="(slide, index) in slides"
        :key="index"
        :class="{ 'active': currentSlide === index }"
        :style="{ transform: `translateX(${100 * (index - currentSlide)}%)` }"
      >
        <div class="slide-content" :style="{ backgroundColor: slide.bgColor }">
          <img src="@/assets/images/brand_bg.svg" alt="Background" class="slide-background" />

          <div class="brand-grid">
            <div
              class="brand-item"
              v-for="(item, itemIndex) in slide.items"
              :key="`${index}-${itemIndex}`"
            >
              <h3 class="brand-item__title">{{ item.title }}</h3>
              <p class="brand-item__description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-controls">
      <button class="carousel-control prev" @click="prevSlide" aria-label="Previous slide">
        <img src="@/assets/images/arrow_left.svg" alt="Previous" />
      </button>
      <button class="carousel-control next" @click="nextSlide" aria-label="Next slide">
        <img src="@/assets/images/arrow_right.svg" alt="Next" />
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'BrandCarousel',
  props: {
    slides: {
      type: Array,
      required: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    autoplaySpeed: {
      type: Number,
      default: 5000
    }
  },
  setup(props, { emit }) {
    const currentSlide = ref(0);
    const carouselContainer = ref(null);
    let autoplayInterval = null;

    // Emit the initial slide title when component is mounted
    onMounted(() => {
      emit('slide-changed', props.slides[currentSlide.value].title);
    });

    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % props.slides.length;
      emit('slide-changed', props.slides[currentSlide.value].title);
    };

    const prevSlide = () => {
      currentSlide.value = (currentSlide.value - 1 + props.slides.length) % props.slides.length;
      emit('slide-changed', props.slides[currentSlide.value].title);
    };

    const startAutoplay = () => {
      if (props.autoplay && !autoplayInterval) {
        autoplayInterval = setInterval(() => {
          nextSlide();
        }, props.autoplaySpeed);
      }
    };

    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    };

    onMounted(() => {
      startAutoplay();

      // Add touch event listeners for mobile swipe
      if (carouselContainer.value) {
        let startX = 0;
        let endX = 0;

        const handleTouchStart = (e) => {
          startX = e.touches[0].clientX;
          stopAutoplay();
        };

        const handleTouchMove = (e) => {
          endX = e.touches[0].clientX;
        };

        const handleTouchEnd = () => {
          const threshold = 50; // Minimum distance to be considered a swipe
          const diff = startX - endX;

          if (Math.abs(diff) > threshold) {
            if (diff > 0) {
              nextSlide(); // Swipe left, go to next slide
            } else {
              prevSlide(); // Swipe right, go to previous slide
            }
          }

          startAutoplay();
        };

        carouselContainer.value.addEventListener('touchstart', handleTouchStart);
        carouselContainer.value.addEventListener('touchmove', handleTouchMove);
        carouselContainer.value.addEventListener('touchend', handleTouchEnd);
      }
    });

    onBeforeUnmount(() => {
      stopAutoplay();
    });

    return {
      currentSlide,
      carouselContainer,
      nextSlide,
      prevSlide
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.brand-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.slide-content {
  width: 100%;
  height: 100%;
  padding: 3rem 2rem;
  color: #fff;
  position: relative;
  overflow: hidden;
}

.slide-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.8;
}

.slide-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: left;
  font-family: $font-headline;
  position: relative;
  z-index: 1;
}

.brand-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.brand-item {
  text-align: left;

  &__title {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-align: left;
  }

  &__description {
    font-size: 0.9rem;
    line-height: 1.4;
    text-align: left;
  }
}

.carousel-controls {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 100;
}

.carousel-control {
  background: rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, background 0.2s ease;
  z-index: 100;

  img {
    width: 24px;
    height: 24px;
    filter: invert(1);
  }

  &:hover {
    transform: scale(1.1);
    background: rgba(0, 0, 0, 0.5);
  }

  &:focus {
    outline: none;
  }
}
</style>
