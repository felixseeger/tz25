<template>
  <section class="team-grid-section">
    <div class="section-container">
      <div class="team-header">
        <h2 class="team-title">MOVE TOGETHER –</h2>
        <h2 class="team-subtitle">DAS TEAM TAKTZEIT</h2>
        <p class="team-description">
          Ehent ut eos nonsequi torehent fugia cus, conseque minci rat molum fugitatem velectur, ellenis reratiur? Quiant id est rest porempo resecte ent.
        </p>
      </div>
    </div>

    <div class="team-slider" ref="teamSlider">
      <div class="team-slider-track" ref="sliderTrack" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <!-- Slide 1: Two team members -->
        <div class="team-slider-slide">
          <div class="team-grid">
            <div class="team-grid-item team-grid-item--image">
              <img src="../../assets/images/team-members/team-tobi.jpg" alt="Team Member" class="team-grid-image" />
            </div>
            <div class="team-grid-item team-grid-item--quote">
              <div class="quote">
                <span class="quote-mark">"</span>
                <p class="quote-text">Utam acerios nobitae quatqui cuptius illatnibus dolet, odia dit etusandanto quo dolectem. Itatis et volupti</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 2: Two team members -->
        <div class="team-slider-slide">
          <div class="team-grid">
            <div class="team-grid-item team-grid-item--image">
              <img src="../../assets/images/team-members/team-kirsten.jpg" alt="Team Member" class="team-grid-image" />
            </div>
            <div class="team-grid-item team-grid-item--quote">
              <div class="quote">
                <span class="quote-mark">"</span>
                <p class="quote-text">Utam acerios nobitae quatqui cuptius illatnibus dolet, odia dit etusandanto quo dolectem. Itatis et volupti</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 3: Two team members -->
        <div class="team-slider-slide">
          <div class="team-grid">
            <div class="team-grid-item team-grid-item--image">
              <img src="../../assets/images/team-members/team-jan.jpg" alt="Team Member" class="team-grid-image" />
            </div>
            <div class="team-grid-item team-grid-item--quote">
              <div class="quote">
                <span class="quote-mark">"</span>
                <p class="quote-text">Utam acerios nobitae quatqui cuptius illatnibus dolet, odia dit etusandanto quo dolectem. Itatis et volupti</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 4: Two team members -->
        <div class="team-slider-slide">
          <div class="team-grid">
            <div class="team-grid-item team-grid-item--image">
              <img src="../../assets/images/team-members/team-melissa.jpg" alt="Team Member" class="team-grid-image" />
            </div>
            <div class="team-grid-item team-grid-item--quote">
              <div class="quote">
                <span class="quote-mark">"</span>
                <p class="quote-text">Utam acerios nobitae quatqui cuptius illatnibus dolet, odia dit etusandanto quo dolectem. Itatis et volupti</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Dots -->
      <div class="team-slider-dots">
        <button
          v-for="(_, index) in 4"
          :key="index"
          class="team-slider-dot"
          :class="{ 'active': currentSlide === index }"
          @click="goToSlide(index)"
          aria-label="Go to slide"
        ></button>
      </div>

      <!-- Navigation Arrows -->
      <button class="team-slider-arrow team-slider-arrow--prev" @click="prevSlide" aria-label="Previous slide">
        <img src="../../assets/images/arrow_left.svg" alt="Previous" />
      </button>
      <button class="team-slider-arrow team-slider-arrow--next" @click="nextSlide" aria-label="Next slide">
        <img src="../../assets/images/arrow_right.svg" alt="Next" />
      </button>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'TeamGridSection',
  setup() {
    const teamSlider = ref(null);
    const sliderTrack = ref(null);
    const currentSlide = ref(0);
    const totalSlides = 4;
    const touchStartX = ref(0);
    const touchEndX = ref(0);
    const autoplayInterval = ref(null);
    const autoplayDelay = 5000; // 5 seconds

    // Go to specific slide
    const goToSlide = (index) => {
      currentSlide.value = index;
      resetAutoplay();
    };

    // Go to next slide
    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % totalSlides;
      resetAutoplay();
    };

    // Go to previous slide
    const prevSlide = () => {
      currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides;
      resetAutoplay();
    };

    // Handle touch start
    const handleTouchStart = (e) => {
      touchStartX.value = e.touches[0].clientX;
    };

    // Handle touch end
    const handleTouchEnd = (e) => {
      touchEndX.value = e.changedTouches[0].clientX;
      handleSwipe();
    };

    // Handle swipe
    const handleSwipe = () => {
      const swipeThreshold = 50; // Minimum distance to register as swipe
      const swipeDistance = touchEndX.value - touchStartX.value;

      if (swipeDistance > swipeThreshold) {
        // Swiped right, go to previous slide
        prevSlide();
      } else if (swipeDistance < -swipeThreshold) {
        // Swiped left, go to next slide
        nextSlide();
      }
    };

    // Start autoplay
    const startAutoplay = () => {
      autoplayInterval.value = setInterval(() => {
        nextSlide();
      }, autoplayDelay);
    };

    // Reset autoplay
    const resetAutoplay = () => {
      if (autoplayInterval.value) {
        clearInterval(autoplayInterval.value);
        startAutoplay();
      }
    };

    // Set up event listeners and initialize
    onMounted(() => {
      if (teamSlider.value) {
        teamSlider.value.addEventListener('touchstart', handleTouchStart, { passive: true });
        teamSlider.value.addEventListener('touchend', handleTouchEnd, { passive: true });
      }

      // Start autoplay
      startAutoplay();
    });

    // Clean up event listeners and intervals
    onUnmounted(() => {
      if (teamSlider.value) {
        teamSlider.value.removeEventListener('touchstart', handleTouchStart);
        teamSlider.value.removeEventListener('touchend', handleTouchEnd);
      }

      // Clear autoplay interval
      if (autoplayInterval.value) {
        clearInterval(autoplayInterval.value);
      }
    });

    return {
      teamSlider,
      sliderTrack,
      currentSlide,
      goToSlide,
      nextSlide,
      prevSlide
    };
  }
}
</script>

<style lang="scss" scoped>
.team-grid-section {
  background-color: #D9D9D9;
  padding: 3rem 0 4rem 0;
  width: 100%;
  position: relative;
}

.team-header {
  margin-bottom: 2rem;
  padding: 0 1.5rem;

  .team-title {
    font-size: 1.1rem;
    font-weight: 400;
    color: #4D4D4D;
    margin-bottom: 0.2rem;
    text-transform: uppercase;
  }

  .team-subtitle {
    font-size: 1.8rem;
    font-weight: 700;
    color: #4D4D4D;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  .team-description {
    font-size: 0.9rem;
    line-height: 1.4;
    color: #4D4D4D;
  }
}

// Slider styles
.team-slider {
  position: relative;
  width: 100%;
  overflow: hidden;

  &-track {
    display: flex;
    transition: transform 0.5s ease;
    width: 100%;
  }

  &-slide {
    flex: 0 0 100%;
    width: 100%;
  }

  // Navigation dots
  &-dots {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin: 2rem 0 1rem;
  }

  &-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(77, 77, 77, 0.3);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background-color: #4D4D4D;
      transform: scale(1.2);
    }
  }

  // Navigation arrows
  &-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-50%) scale(1.1);
    }

    &:active {
      transform: translateY(-50%) scale(0.95);
    }

    &:focus {
      outline: none;
    }

    img {
      width: 24px;
      height: 24px;
      filter: brightness(0) invert(0.3);
    }

    &--prev {
      left: 10px;
    }

    &--next {
      right: 10px;
    }
  }
}

// Grid styles
.team-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  width: 100%;
  margin: 0;
  padding: 0;
}

.team-grid-item {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;

  &--image {
    aspect-ratio: 1/1;
    overflow: hidden;

    .team-grid-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &--quote {
    background-color: #E6E6E6;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1;

    .quote {
      padding: 1.5rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;

      .quote-mark {
        font-size: 4rem;
        line-height: 1;
        color: #4D4D4D;
        display: block;
        margin-bottom: 0.5rem;
        font-family: Georgia, serif;
        opacity: 0.7;
      }

      .quote-text {
        font-size: 0.85rem;
        line-height: 1.4;
        color: #4D4D4D;
        margin: 0;
        max-width: 90%;
      }
    }
  }
}

@media (max-width: 480px) {
  .team-header {
    padding: 0 1rem;

    .team-title {
      font-size: 1rem;
    }

    .team-subtitle {
      font-size: 1.5rem;
    }

    .team-description {
      font-size: 0.85rem;
    }
  }

  .team-grid-item {
    &--quote {
      .quote {
        padding: 1rem;

        .quote-mark {
          font-size: 3rem;
        }

        .quote-text {
          font-size: 0.8rem;
        }
      }
    }
  }

  .team-slider {
    &-arrow {
      width: 60px;
      height: 60px;

      img {
        width: 35px;
        height: 35px;
        filter: brightness(0) invert(0.7);
      }

      &--prev {
        left: 0;
      }

      &--next {
        right: 0;
      }
    }

    &-dots {
      margin-bottom: 2rem;
    }
  }
}

@media (min-width: 768px) {
  .team-grid-section {
    display: none;
  }
}
</style>
