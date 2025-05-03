<template>
  <div>
    <div class="section-container">
      <!-- Team Header -->
      <div class="team-header">
        <h2 class="team-title">MOVE TOGETHER –</h2>
        <h2 class="team-subtitle">TEAM TAKTZEIT</h2>
        <p class="team-description">
          Pernatiatium sitasperate patem dologendam reporendes alia cust, te mod quam guidella dolorem et,
          to torio. Ut quam volupta tustrum volorum endestem fugitaspis etur, nimpe. Aliaeriis. As ese omnis-
          sequam acea con estrurit pe maiose periam abore volore everios et ut vellupi cientivello et vellupa
          nisintem arcillo natiatur, omniment quia coriso scipide.
        </p>
      </div>
    </div>

    <div class="mobile-team-slider" tabindex="0" role="region" aria-label="Team members slider">
    <div class="mobile-team-slider__container" ref="sliderContainer">
      <div class="mobile-team-slider__track" ref="sliderTrack" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <!-- Team Member 1 -->
        <div class="mobile-team-slider__slide" role="tabpanel" :aria-hidden="currentSlide !== 0" :aria-labelledby="'team-member-1'">
          <div class="mobile-team-slider__image-container">
            <img src="../../assets/images/team-members/team-tobi.jpg" alt="Team Member - Tobi" class="mobile-team-slider__image" />
          </div>
          <div class="mobile-team-slider__content">
            <h3 id="team-member-1" class="mobile-team-slider__name">Tobi</h3>
            <p class="mobile-team-slider__quote">Utam acerios nobitae quatqui cuptius illatnibus dolest, odia dit etusandan-to quo dolectem.</p>
          </div>
        </div>

        <!-- Team Member 2 -->
        <div class="mobile-team-slider__slide" role="tabpanel" :aria-hidden="currentSlide !== 1" :aria-labelledby="'team-member-2'">
          <div class="mobile-team-slider__image-container">
            <img src="../../assets/images/team-members/team-kirsten.jpg" alt="Team Member - Kirsten" class="mobile-team-slider__image" />
          </div>
          <div class="mobile-team-slider__content">
            <h3 id="team-member-2" class="mobile-team-slider__name">Kirsten</h3>
            <p class="mobile-team-slider__quote">Itatis et voluptiores enihilab ipsum, nus delit rerupta tustrum volorum endestem.</p>
          </div>
        </div>

        <!-- Team Member 3 -->
        <div class="mobile-team-slider__slide" role="tabpanel" :aria-hidden="currentSlide !== 2" :aria-labelledby="'team-member-3'">
          <div class="mobile-team-slider__image-container">
            <img src="../../assets/images/team-members/team-jan.jpg" alt="Team Member - Jan" class="mobile-team-slider__image" />
          </div>
          <div class="mobile-team-slider__content">
            <h3 id="team-member-3" class="mobile-team-slider__name">Jan</h3>
            <p class="mobile-team-slider__quote">Pernatiatium sitasperate patem dologendam reporendes alia cust, te mod quam guidella.</p>
          </div>
        </div>

        <!-- Team Member 4 -->
        <div class="mobile-team-slider__slide" role="tabpanel" :aria-hidden="currentSlide !== 3" :aria-labelledby="'team-member-4'">
          <div class="mobile-team-slider__image-container">
            <img src="../../assets/images/team-members/team-melissa.jpg" alt="Team Member - Melissa" class="mobile-team-slider__image" />
          </div>
          <div class="mobile-team-slider__content">
            <h3 id="team-member-4" class="mobile-team-slider__name">Melissa</h3>
            <p class="mobile-team-slider__quote">Dolorem et, to torio. Ut quam volupta tustrum volorum endestem fugitaspis etur, nimpe.</p>
          </div>
        </div>

        <!-- Team Member 5 -->
        <div class="mobile-team-slider__slide" role="tabpanel" :aria-hidden="currentSlide !== 4" :aria-labelledby="'team-member-5'">
          <div class="mobile-team-slider__image-container">
            <img src="../../assets/images/team-members/team-anh.jpg" alt="Team Member - Anh" class="mobile-team-slider__image" />
          </div>
          <div class="mobile-team-slider__content">
            <h3 id="team-member-5" class="mobile-team-slider__name">Anh</h3>
            <p class="mobile-team-slider__quote">Aliaeriis. As ese omnissequam acea con estrurit pe maiose periam abore volore everios.</p>
          </div>
        </div>

        <!-- Team Member 6 -->
        <div class="mobile-team-slider__slide" role="tabpanel" :aria-hidden="currentSlide !== 5" :aria-labelledby="'team-member-6'">
          <div class="mobile-team-slider__image-container">
            <img src="../../assets/images/team-members/team-rena-omiros.jpg" alt="Team Member - Rena" class="mobile-team-slider__image" />
          </div>
          <div class="mobile-team-slider__content">
            <h3 id="team-member-6" class="mobile-team-slider__name">Rena</h3>
            <p class="mobile-team-slider__quote">Et ut vellupi cientivello et vellupa nisintem arcillo natiatur, omniment quia coriso scipide.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Dots -->
    <div class="mobile-team-slider__dots" role="tablist" aria-label="Team member slides">
      <button
        v-for="(_, index) in 6"
        :key="index"
        class="mobile-team-slider__dot"
        :class="{ 'mobile-team-slider__dot--active': currentSlide === index }"
        @click="goToSlide(index)"
        @keydown.enter="goToSlide(index)"
        @keydown.space="goToSlide(index)"
        role="tab"
        :aria-selected="currentSlide === index"
        :aria-controls="`team-member-${index + 1}`"
        :aria-label="`Go to slide ${index + 1}`"
        tabindex="0"
      ></button>
    </div>

    <!-- Navigation Arrows -->
    <div class="mobile-team-slider__arrows">
      <button
        class="mobile-team-slider__arrow mobile-team-slider__arrow--prev"
        @click="prevSlide"
        @keydown.enter="prevSlide"
        @keydown.space="prevSlide"
        aria-label="Previous slide"
        tabindex="0"
      >
        <img src="../../assets/images/arrow_left.svg" alt="Previous" class="mobile-team-slider__arrow-icon" />
      </button>
      <button
        class="mobile-team-slider__arrow mobile-team-slider__arrow--next"
        @click="nextSlide"
        @keydown.enter="nextSlide"
        @keydown.space="nextSlide"
        aria-label="Next slide"
        tabindex="0"
      >
        <img src="../../assets/images/arrow_right.svg" alt="Next" class="mobile-team-slider__arrow-icon" />
      </button>
    </div>
  </div>
</div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'MobileTeamSlider',
  setup() {
    const sliderContainer = ref(null);
    const sliderTrack = ref(null);
    const currentSlide = ref(0);
    const totalSlides = 6;
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

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    // Set up event listeners and initialize
    onMounted(() => {
      if (sliderContainer.value) {
        sliderContainer.value.addEventListener('touchstart', handleTouchStart, { passive: true });
        sliderContainer.value.addEventListener('touchend', handleTouchEnd, { passive: true });
      }

      // Add keyboard event listener
      window.addEventListener('keydown', handleKeyDown);

      // Start autoplay
      startAutoplay();
    });

    // Clean up event listeners and intervals
    onUnmounted(() => {
      if (sliderContainer.value) {
        sliderContainer.value.removeEventListener('touchstart', handleTouchStart);
        sliderContainer.value.removeEventListener('touchend', handleTouchEnd);
      }

      // Remove keyboard event listener
      window.removeEventListener('keydown', handleKeyDown);

      // Clear autoplay interval
      if (autoplayInterval.value) {
        clearInterval(autoplayInterval.value);
      }
    });

    return {
      sliderContainer,
      sliderTrack,
      currentSlide,
      goToSlide,
      nextSlide,
      prevSlide
    };
  }
};
</script>

<style lang="scss" scoped>
/* Mobile Team Slider Styles will be in a separate SCSS file */
</style>
