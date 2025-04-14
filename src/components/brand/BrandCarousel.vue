<template>
  <div class="brand-carousel" ref="brandCarousel">
    <!-- Carousel Track with Slides -->
    <div
      class="brand-carousel-track"
      ref="brandTrack"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <!-- Slide 1: STRATEGIE & KONZEPT -->
      <div
        class="brand-slide"
        :class="{ 'active': currentSlide === 0 }"
      >
        <div class="brand-grid-triangle"></div>
        <h2 class="brand-title">STRATEGIE & KONZEPT</h2>
        <div class="brand-grid">
          <div class="brand-item">
            <h3 class="brand-item__title">Sales Marketing Strategien</h3>
            <p class="brand-item__description">Mit der richtigen Strategie mehr Verkaufen</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">Trade & Shopper Marketing</h3>
            <p class="brand-item__description">Mit profunder Kenntnis von Handel und Shopper zum Erfolg</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">POS Marketing</h3>
            <p class="brand-item__description">Da punkten, wo die Kaufentscheidung fällt</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">Sales Promotions</h3>
            <p class="brand-item__description">Abverkaufs-Power, die auch auf die Marke einzahlt</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">Verkaufsförderung</h3>
            <p class="brand-item__description">Die Kaufentscheidung zu Ihren Gunsten pushen</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">Go-to-market Strategien</h3>
            <p class="brand-item__description">Treue Kunden sind die besten – und rentabelsten</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">Channel-Strategien</h3>
            <p class="brand-item__description">Die richtigen Vertriebs- und Kommunikations-Kanäle nutzen</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">E-Commerce</h3>
            <p class="brand-item__description">Damit Ihnen mehr Kunden ins Netz gehen</p>
          </div>
        </div>
      </div>

      <!-- Slide 2: DIGITALE LÖSUNGEN -->
      <div
        class="brand-slide"
        :class="{ 'active': currentSlide === 1 }"
      >
        <div class="brand-grid-triangle"></div>
        <h2 class="brand-title">DIGITALE LÖSUNGEN</h2>
        <div class="brand-grid">
          <div class="brand-item">
            <h3 class="brand-item__title">Websites</h3>
            <p class="brand-item__description">Für Ihren glanzvollen Auftritt im Netz</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">Apps</h3>
            <p class="brand-item__description">Für optimale Anwendungslösungen für jedes Endgerät</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">Social Media</h3>
            <p class="brand-item__description">Für guten Content und ergebnisstarke Kampagnen</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">Webhosting</h3>
            <p class="brand-item__description">Für den sicheren Webspace Ihrer individuellen Anforderungen</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">Domain-Service</h3>
            <p class="brand-item__description">Für Ihre Wunschdomain im World Wide Web</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">Onlineshops / Plattformen</h3>
            <p class="brand-item__description">Für erfolgreiches Verkaufen im Internet</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">Film / Video / TV</h3>
            <p class="brand-item__description">Für bewegte Bilder, die Bewegung in Ihr Business bringen</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">Audio & Sounddesign</h3>
            <p class="brand-item__description">Für den perfekten Sound Ihrer Marke</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">SEO & SEA</h3>
            <p class="brand-item__description">Für Werbung, die auch dem Algorithmus schmeckt</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">Digitale Transformation</h3>
            <p class="brand-item__description">Für Ihren Weg von Analog nach Digital</p>
          </div>
        </div>
      </div>

      <!-- Slide 3: MARKE & DESIGN -->
      <div
        class="brand-slide"
        :class="{ 'active': currentSlide === 2 }"
      >
        <div class="brand-grid-triangle"></div>
        <h2 class="brand-title">MARKE & DESIGN</h2>
        <div class="brand-grid">
          <div class="brand-item">
            <h3 class="brand-item__title">COOPERATE IDENTITY</h3>
            <p class="brand-item__description">Wir geben Ihrer Marke ein klares Profil</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">PACKAGING DESIGN</h3>
            <p class="brand-item__description">Für eine Verpackung, die zum Zugreifen verführt</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">DESIGN TEMPLATES</h3>
            <p class="brand-item__description">Für vielfältige Design-Vorlagen im Baukasten-System</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">COOPERATE DESIGN</h3>
            <p class="brand-item__description">Für einen stimmigen Look</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">STYLEGUIDES</h3>
            <p class="brand-item__description">Damit alles perfekt zusammenpasst</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">DESIGN CLEARING</h3>
            <p class="brand-item__description">Das Beauty make over für Ihr bestehendes Design</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">POSITIONIERUNGEN</h3>
            <p class="brand-item__description">Für ein klares Statement zu Ihrem Markenversprechen</p>
          </div>

          <div class="brand-item">
            <h3 class="brand-item__title">COMMUNICATION GUIDELINES</h3>
            <p class="brand-item__description">Für eine einheitliche Sprache in Ihrer Markenkommunikation</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination indicators (hidden but kept for accessibility) -->
    <div class="brand-pagination">
      <button
        v-for="index in 3"
        :key="index - 1"
        @click="goToSlide(index - 1)"
        :class="['pagination-dot', { active: currentSlide === index - 1 }]"
        :aria-label="'Go to slide ' + index"
      ></button>
    </div>

  </div>
  <!-- Navigation controls (moved outside the carousel track) -->
  <div class="brand-navigation">
    <button
      class="nav-button prev"
      @click="prevSlide"
      :disabled="isTransitioning"
      aria-label="Previous slide"
    >
      <img src="@/assets/images/arrow_left.svg" alt="Previous" class="arrow-icon" />
    </button>
    <button
      class="nav-button next"
      @click="nextSlide"
      :disabled="isTransitioning"
      aria-label="Next slide"
    >
      <img src="@/assets/images/arrow_right.svg" alt="Next" class="arrow-icon" />
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'BrandCarousel',
  setup() {
    const currentSlide = ref(0);
    const isTransitioning = ref(false);
    const brandCarousel = ref(null);
    const brandTrack = ref(null);

    // Navigation methods
    const prevSlide = () => {
      if (isTransitioning.value) return;
      isTransitioning.value = true;

      // Fade out current slide first
      setTimeout(() => {
        // Then change the slide
        currentSlide.value = (currentSlide.value - 1 + 3) % 3;

        // Reset transition state after animation completes
        setTimeout(() => {
          isTransitioning.value = false;
        }, 800);
      }, 300);
    };

    const nextSlide = () => {
      if (isTransitioning.value) return;
      isTransitioning.value = true;

      // Fade out current slide first
      setTimeout(() => {
        // Then change the slide
        currentSlide.value = (currentSlide.value + 1) % 3;

        // Reset transition state after animation completes
        setTimeout(() => {
          isTransitioning.value = false;
        }, 800);
      }, 300);
    };

    const goToSlide = (index) => {
      if (isTransitioning.value || currentSlide.value === index) return;
      isTransitioning.value = true;

      // Fade out current slide first
      setTimeout(() => {
        // Then change the slide
        currentSlide.value = index;

        // Reset transition state after animation completes
        setTimeout(() => {
          isTransitioning.value = false;
        }, 800);
      }, 300);
    };

    return {
      currentSlide,
      isTransitioning,
      brandCarousel,
      brandTrack,
      prevSlide,
      nextSlide,
      goToSlide
    };
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.brand-carousel {
  position: relative;
  width: 100%;
  height: 75vh;
  overflow: hidden; /* Changed from hidden to visible */
  margin-bottom: 2rem;
  padding-top: 70px; /* Add padding to create space for the title */
}

.brand-carousel-track {
  display: flex;
  transition: transform 0.8s ease;
  width: 100%;
}

.brand-slide {
  flex: 0 0 100%;
  width: 100%;
  height: auto;
  opacity: 1;
  transition: opacity 0.3s ease;
  background-image: url('@/assets/images/brand_bg.svg');
  background-size: cover;
  background-position: center;
  position: relative;
  min-height: 502px; /* Set a fixed height to match the design */
  padding: 6rem 2rem 2rem; /* Increased top padding for the title */
  overflow: visible; /* Ensure content isn't clipped */
  margin-top: 70px; /* Add margin to create space for the title */

  &.active {
    opacity: 1;
  }
}

.brand-title {
  color: white;
  margin-bottom: 2rem;
  text-align: left;
  margin-top: -140px; /* Position title 70px up from its original position */
  padding-top: 0; /* Remove padding */
  font-size: 2.5rem; /* Increase font size for better visibility */
  font-weight: 700; /* Make the title bold */
  text-transform: uppercase; /* Match the uppercase style of other headings */
  position: absolute; /* Use absolute positioning */
  top: 70px; /* Position from the top */
  left: 2rem; /* Align with the left padding */
  z-index: 5; /* Ensure it's above other elements */
  display: block; /* Ensure it's displayed as a block element */
  opacity: 1; /* Ensure it's fully visible */
  visibility: visible; /* Ensure it's visible */
  width: calc(100% - 4rem); /* Set width to prevent overflow */

  @media (max-width: 768px) {
    font-size: 2rem;
    top: 50px; /* Adjust top position for mobile */
    margin-top: -100px; /* Adjust margin for mobile */
  }
}

.brand-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 90%; /* Reduce width to match design */
  margin: 0 auto; /* Center the grid */

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
}

.brand-item {
  text-align: left;
  transition: transform 0.3s ease;
  padding: 1rem;

  &:hover {
    transform: translateY(-5px);
  }

  &__title {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: white;
    text-transform: uppercase;
    text-align: center;
  }

  &__description {
    font-size: 1.2rem;
    line-height: 1.5;
    text-align: center;
    color: rgba(255, 255, 255, 0.9);
  }
}

/* Navigation styles moved to _brand-section.scss */

.brand-grid-triangle {
  position: absolute;
  top: 0;
  left: 0;
  width: 63px; /* Match the SVG dimensions */
  height: 58px;
  z-index: 3;
  pointer-events: none; /* Allow clicks to pass through */
  background-image: url('@/assets/images/brand_tria.svg');
  background-repeat: no-repeat;
  background-size: contain;
}

.brand-pagination {
  display: none; /* Moved from inline style */
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;

  .pagination-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background-color: white;
      transform: scale(1.2);
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
