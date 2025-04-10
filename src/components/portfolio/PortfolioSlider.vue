<template>
  <div class="portfolio-carousel" ref="portfolioCarousel">
    <div
      class="portfolio-carousel-track"
      ref="portfolioTrack"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <!-- Generate slides dynamically based on grouped items -->
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="portfolio-slide"
        :class="{ 'active': currentSlide === index }"
      >
        <!-- First row -->
        <div class="portfolio-row">
          <!-- Title card (first position in first slide) -->
          <div
            v-if="index === 0 && selectedClient"
            class="portfolio-device title-card"
          >
            <div class="title-card-content">
              <img
                v-if="selectedClient.logo"
                :src="selectedClient.logo"
                :alt="selectedClient.name"
                class="title-card-logo"
              />
              <h3 class="title-card-heading">{{ selectedClient.name }}</h3>
              <p class="title-card-subheading">Portfolio</p>
            </div>
          </div>

          <!-- Regular portfolio items -->
          <div
            v-else-if="slide.row1[0] && !slide.row1[0].isEmpty"
            class="portfolio-device"
          >
            <img
              :src="slide.row1[0].image"
              :alt="slide.row1[0].title"
              class="portfolio-image"
            />
          </div>

          <!-- Second item in first row -->
          <div
            v-if="slide.row1[1]"
            class="portfolio-device"
            :class="{ 'empty': slide.row1[1].isEmpty }"
          >
            <img
              v-if="!slide.row1[1].isEmpty"
              :src="slide.row1[1].image"
              :alt="slide.row1[1].title"
              class="portfolio-image"
            />
          </div>
        </div>

        <!-- Space between rows -->

        <!-- Second row -->
        <div class="portfolio-row">
          <div
            v-for="item in slide.row2"
            :key="item.id"
            class="portfolio-device"
            :class="{ 'empty': item.isEmpty }"
          >
            <img
              v-if="!item.isEmpty"
              :src="item.image"
              :alt="item.title"
              class="portfolio-image"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation controls -->
    <div class="portfolio-navigation">
      <button
        class="nav-button prev"
        @click="prevSlide"
        :disabled="isTransitioning || slides.length <= 1"
        aria-label="Previous slide"
      >
        <img src="../../assets/images/arrow_left.svg" alt="Previous" class="arrow-icon" />
      </button>
      <button
        class="nav-button next"
        @click="nextSlide"
        :disabled="isTransitioning || slides.length <= 1"
        aria-label="Next slide"
      >
        <img src="../../assets/images/arrow_right.svg" alt="Next" class="arrow-icon" />
      </button>
    </div>

    <!-- Bottom pagination indicators (hidden, now moved to top) -->
    <!-- <div v-if="slides.length > 1" class="portfolio-pagination">
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        :class="['pagination-dot', { active: currentSlide === index }]"
        :aria-label="'Go to slide ' + (index + 1)"
      ></button>
    </div> -->
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'PortfolioSlider',
  props: {
    slides: {
      type: Array,
      required: true
    },
    selectedClient: {
      type: Object,
      default: null
    },
    externalCurrentSlide: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:currentSlide'],
  setup(props, { emit }) {
    const currentSlide = ref(props.externalCurrentSlide || 0);
    const isTransitioning = ref(false);
    const portfolioCarousel = ref(null);
    const portfolioTrack = ref(null);

    // Reset to first slide when slides change (e.g., when filter changes)
    watch(() => props.slides, () => {
      // Reset to first slide with a small delay to allow for fade out
      setTimeout(() => {
        currentSlide.value = 0;
        emit('update:currentSlide', 0);
      }, 300);
    });

    // Watch for changes in the external current slide
    watch(() => props.externalCurrentSlide, (newValue) => {
      if (newValue !== currentSlide.value && !isTransitioning.value) {
        goToSlide(newValue);
      }
    });

    // Navigation methods
    const prevSlide = () => {
      if (isTransitioning.value || props.slides.length <= 1) return;
      isTransitioning.value = true;

      // Fade out current slide first
      setTimeout(() => {
        // Then change the slide
        const newSlideIndex = (currentSlide.value - 1 + props.slides.length) % props.slides.length;
        currentSlide.value = newSlideIndex;
        emit('update:currentSlide', newSlideIndex);

        // Reset transition state after animation completes
        setTimeout(() => {
          isTransitioning.value = false;
        }, 800);
      }, 300);
    };

    const nextSlide = () => {
      if (isTransitioning.value || props.slides.length <= 1) return;
      isTransitioning.value = true;

      // Fade out current slide first
      setTimeout(() => {
        // Then change the slide
        const newSlideIndex = (currentSlide.value + 1) % props.slides.length;
        currentSlide.value = newSlideIndex;
        emit('update:currentSlide', newSlideIndex);

        // Reset transition state after animation completes
        setTimeout(() => {
          isTransitioning.value = false;
        }, 800);
      }, 300);
    };

    const goToSlide = (index) => {
      if (isTransitioning.value || currentSlide.value === index || props.slides.length <= 1) return;
      isTransitioning.value = true;

      // Fade out current slide first
      setTimeout(() => {
        // Then change the slide
        currentSlide.value = index;
        emit('update:currentSlide', index);

        // Reset transition state after animation completes
        setTimeout(() => {
          isTransitioning.value = false;
        }, 800);
      }, 300);
    };

    return {
      currentSlide,
      isTransitioning,
      portfolioCarousel,
      portfolioTrack,
      prevSlide,
      nextSlide,
      goToSlide
    };
  }
}
</script>

<style lang="scss" scoped>
/* Styles moved to src/assets/scss/components/_portfolio-slider.scss */
</style>
