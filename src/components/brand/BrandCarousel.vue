<template>
  <div class="brand-carousel" ref="brandCarousel">
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

    <!-- Navigation controls -->
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

    <!-- Pagination indicators (hidden but kept for accessibility) -->
    <div class="brand-pagination" style="display: none;">
      <button
        v-for="index in 3"
        :key="index - 1"
        @click="goToSlide(index - 1)"
        :class="['pagination-dot', { active: currentSlide === index - 1 }]"
        :aria-label="'Go to slide ' + index"
      ></button>
    </div>
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
  overflow: hidden;
  margin-bottom: 2rem;
}

.brand-carousel-track {
  display: flex;
  transition: transform 0.8s ease;
  width: 100%;
}

.brand-slide {
  flex: 0 0 100%;
  width: 100%;
  opacity: 1;
  transition: opacity 0.3s ease;
  background-image: url('@/assets/images/brand_bg.svg');
  background-size: cover;
  background-position: center;
  padding: 2rem;
  border-radius: 8px;
  min-height: 542px; /* Set a fixed height to match the design */

  &.active {
    opacity: 1;
  }
}

.brand-title {
  color: white;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
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
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: white;
    text-transform: uppercase;
  }

  &__description {
    font-size: 0.95rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.9);
  }
}

.brand-navigation {
  position: absolute;
  bottom: 30%; /* Position lower in the slide */
  left: 50%;
  transform: translate(-50%, 50%); /* Center both horizontally and vertically */
  display: flex;
  gap: 0.5rem;
  z-index: 10;

  .nav-button {
    background: transparent;
    border: 2px solid white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0 10px; /* Add some spacing between buttons */

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .arrow-icon {
      width: 25px;
      height: 25px;
    }
  }
}

.brand-pagination {
  display: flex;
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
