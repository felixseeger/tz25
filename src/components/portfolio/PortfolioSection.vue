<template>
  <section class="portfolio-section">
    <div class="container">
      <div class="portfolio-header">
        <div class="portfolio-titles">
          <h2 class="portfolio-subtitle">UNSERE PROJEKTE –</h2>
          <h2 class="portfolio-title">ERFOLGSGESCHICHTEN</h2>
        </div>
        <p class="portfolio-description">
          So, jetzt haben wir uns Ihnen ausführlich vorgestellt. Noch etwas vergessen? Natürlich, das Schönste zum Schluss: die Arbeit für unsere Kunden aus den unterschiedlichsten Branchen. Denn das ist es, wofür wir Tag für Tag mit Herz und Hand unser Bestes geben.
        </p>
      </div>

      <!-- Filter buttons using client logos -->
      <div class="portfolio-filter-container">
        <div class="portfolio-filter">
          <button
            class="filter-button"
            :class="{ 'active': activeFilter === 'all' }"
            @click="setFilter('all')"
          >
            Alle
          </button>
          <button
            class="filter-button"
            :class="{ 'active': activeFilter === 'automotive' }"
            @click="setFilter('automotive')"
          >
            <LazyImage
              src="../../assets/images/client-logos/bridgestone-logo.svg"
              alt="Automotive"
              width="100%"
              height="100%"
            />
          </button>
          <button
            class="filter-button"
            :class="{ 'active': activeFilter === 'retail' }"
            @click="setFilter('retail')"
          >
            <div class="placeholder-logo">Retail</div>
          </button>
          <button
            class="filter-button"
            :class="{ 'active': activeFilter === 'b2b' }"
            @click="setFilter('b2b')"
          >
            <div class="placeholder-logo">B2B</div>
          </button>
          <button
            class="filter-button"
            :class="{ 'active': activeFilter === 'fmcg' }"
            @click="setFilter('fmcg')"
          >
            <div class="placeholder-logo">FMCG</div>
          </button>
          <button
            class="filter-button"
            :class="{ 'active': activeFilter === 'other' }"
            @click="setFilter('other')"
          >
            <div class="placeholder-logo">Other</div>
          </button>
        </div>
      </div>

      <!-- Portfolio Showcase Carousel -->
      <div class="portfolio-showcase-container">
        <div class="portfolio-carousel" ref="portfolioCarousel">
          <div class="portfolio-carousel-track" ref="portfolioTrack" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <!-- Portfolio items with filtering -->
            <div
              v-for="(slide, slideIndex) in filteredSlides"
              :key="slideIndex"
              class="portfolio-slide"
              :class="{ 'active': currentSlide === slideIndex }"
            >
              <!-- First row -->
              <div class="portfolio-row">
                <div
                  v-for="(item, itemIndex) in slide.items.slice(0, 2)"
                  :key="`${slideIndex}-${itemIndex}`"
                  class="portfolio-item"
                >
                  <LazyImage
                    :src="item.image"
                    :alt="item.title"
                    class="portfolio-image"
                    aspect-ratio="16/9"
                    placeholder-color="#444444"
                  />
                  <div class="portfolio-item-overlay">
                    <h3 class="portfolio-item-title">{{ item.title }}</h3>
                    <p class="portfolio-item-category">{{ item.category }}</p>
                  </div>
                </div>
              </div>

              <!-- Second row -->
              <div class="portfolio-row" v-if="slide.items.length > 2">
                <div
                  v-for="(item, itemIndex) in slide.items.slice(2, 4)"
                  :key="`${slideIndex}-${itemIndex+2}`"
                  class="portfolio-item"
                >
                  <LazyImage
                    :src="item.image"
                    :alt="item.title"
                    class="portfolio-image"
                    aspect-ratio="16/9"
                    placeholder-color="#444444"
                  />
                  <div class="portfolio-item-overlay">
                    <h3 class="portfolio-item-title">{{ item.title }}</h3>
                    <p class="portfolio-item-category">{{ item.category }}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Navigation controls -->
          <div class="portfolio-navigation">
            <HorizontalNavigation @prev="prevPortfolioSlide" @next="nextPortfolioSlide" class="dark" />
          </div>

          <!-- Pagination indicators -->
          <div class="portfolio-pagination">
            <button
              v-for="(_, index) in 3"
              :key="index"
              @click="goToSlide(index)"
              :class="['pagination-dot', { active: currentSlide === index }]"
              :aria-label="`Go to slide ${index + 1}`"
            ></button>
          </div>
        </div>
      </div>


    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { HorizontalNavigation } from './../base';
import { LazyImage } from './../ui';

export default {
  name: 'PortfolioSection',
  components: {
    HorizontalNavigation,
    LazyImage
  },
  setup() {
    const portfolioCarousel = ref(null);
    const portfolioTrack = ref(null);
    const currentSlide = ref(0);
    const activeFilter = ref('all');

    // Portfolio carousel variables
    let isPortfolioDragging = false;
    let portfolioStartX = 0;
    let portfolioStartTranslate = 0;
    let portfolioCurrentTranslate = 0;
    let isTransitioning = false;
    const portfolioDragThreshold = 50; // Minimum drag distance to trigger slide change

    // Portfolio data with categories
    const portfolioData = ref([
      {
        items: [
          {
            title: 'Automotive Project 1',
            category: 'Automotive',
            image: '../../assets/images/portfolio-item-placeholder.jpg',
            filter: 'automotive'
          },
          {
            title: 'Retail Campaign',
            category: 'Retail',
            image: '../../assets/images/portfolio-item-placeholder.jpg',
            filter: 'retail'
          },
          {
            title: 'B2B Solution',
            category: 'Business',
            image: '../../assets/images/portfolio-item-placeholder.jpg',
            filter: 'b2b'
          },
          {
            title: 'FMCG Packaging',
            category: 'Consumer Goods',
            image: '../../assets/images/portfolio-item-placeholder.jpg',
            filter: 'fmcg'
          }
        ]
      },
      {
        items: [
          {
            title: 'Automotive Project 2',
            category: 'Automotive',
            image: '../../assets/images/portfolio-item-placeholder.jpg',
            filter: 'automotive'
          },
          {
            title: 'Retail Store Design',
            category: 'Retail',
            image: '../../assets/images/portfolio-item-placeholder.jpg',
            filter: 'retail'
          },
          {
            title: 'B2B Platform',
            category: 'Business',
            image: '../../assets/images/portfolio-item-placeholder.jpg',
            filter: 'b2b'
          },
          {
            title: 'Other Project',
            category: 'Miscellaneous',
            image: '../../assets/images/portfolio-item-placeholder.jpg',
            filter: 'other'
          }
        ]
      },
      {
        items: [
          {
            title: 'Automotive Project 3',
            category: 'Automotive',
            image: '../../assets/images/portfolio-item-placeholder.jpg',
            filter: 'automotive'
          },
          {
            title: 'FMCG Campaign',
            category: 'Consumer Goods',
            image: '../../assets/images/portfolio-item-placeholder.jpg',
            filter: 'fmcg'
          },
          {
            title: 'B2B Marketing',
            category: 'Business',
            image: '../../assets/images/portfolio-item-placeholder.jpg',
            filter: 'b2b'
          },
          {
            title: 'Other Service',
            category: 'Miscellaneous',
            image: '../../assets/images/portfolio-item-placeholder.jpg',
            filter: 'other'
          }
        ]
      }
    ]);

    // Filter functionality
    const setFilter = (filter) => {
      activeFilter.value = filter;
      // Reset to first slide when filter changes
      currentSlide.value = 0;
      console.log(`Filter set to: ${filter}`);
    };

    // Computed property for filtered slides
    const filteredSlides = computed(() => {
      if (activeFilter.value === 'all') {
        return portfolioData.value;
      }

      // Create new slides with filtered items
      return portfolioData.value.map(slide => {
        // Filter items based on the active filter
        const filteredItems = slide.items.filter(item => item.filter === activeFilter.value);

        // Return a new slide object with only the filtered items
        return {
          items: filteredItems
        };
      }).filter(slide => slide.items.length > 0); // Only include slides that have items after filtering
    });

    // Computed property for total slides count
    const totalSlides = computed(() => {
      return filteredSlides.value.length;
    });

    // Initialize portfolio carousel
    onMounted(() => {
      // Add event listeners for portfolio carousel drag
      if (portfolioCarousel.value) {
        portfolioCarousel.value.addEventListener('mousedown', startPortfolioDrag);
        portfolioCarousel.value.addEventListener('touchstart', startPortfolioDrag);
      }

      // Set initial filter to 'all'
      activeFilter.value = 'all';

      console.log('Portfolio section mounted, slides:', filteredSlides.value.length);
    });

    onUnmounted(() => {
      // Remove portfolio carousel event listeners
      if (portfolioCarousel.value) {
        portfolioCarousel.value.removeEventListener('mousedown', startPortfolioDrag);
        portfolioCarousel.value.removeEventListener('touchstart', startPortfolioDrag);
      }

      // Remove any lingering document events
      document.removeEventListener('mousemove', portfolioDrag);
      document.removeEventListener('mouseup', endPortfolioDrag);
      document.removeEventListener('touchmove', portfolioDrag);
      document.removeEventListener('touchend', endPortfolioDrag);
    });

    // Portfolio carousel methods
    const prevPortfolioSlide = () => {
      if (isTransitioning) return;
      isTransitioning = true;

      // Fade out current slide first
      setTimeout(() => {
        // Then change the slide
        currentSlide.value = (currentSlide.value - 1 + totalSlides.value) % totalSlides.value;

        // Reset transition state after animation completes
        setTimeout(() => {
          isTransitioning = false;
        }, 800); // Match this with your CSS transition duration for opacity
      }, 300); // Half the fade-out time
    };

    const nextPortfolioSlide = () => {
      if (isTransitioning) return;
      isTransitioning = true;

      // Fade out current slide first
      setTimeout(() => {
        // Then change the slide
        currentSlide.value = (currentSlide.value + 1) % totalSlides.value;

        // Reset transition state after animation completes
        setTimeout(() => {
          isTransitioning = false;
        }, 800); // Match this with your CSS transition duration for opacity
      }, 300); // Half the fade-out time
    };

    const goToSlide = (index) => {
      if (isTransitioning || currentSlide.value === index) return;
      isTransitioning = true;

      // Fade out current slide first
      setTimeout(() => {
        // Then change the slide
        currentSlide.value = index;

        // Reset transition state after animation completes
        setTimeout(() => {
          isTransitioning = false;
        }, 800); // Match this with your CSS transition duration for opacity
      }, 300); // Half the fade-out time
    };

    // Portfolio touch/drag functionality
    const startPortfolioDrag = (event) => {
      if (isTransitioning) return;

      isPortfolioDragging = true;

      // Get the starting position (handle both mouse and touch events)
      const clientX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
      portfolioStartX = clientX;
      portfolioStartTranslate = currentSlide.value * -100; // In percentage
      portfolioCurrentTranslate = portfolioStartTranslate;

      // Add event listeners for drag and end drag events
      if (event.type.includes('mouse')) {
        document.addEventListener('mousemove', portfolioDrag);
        document.addEventListener('mouseup', endPortfolioDrag);
      } else {
        document.addEventListener('touchmove', portfolioDrag);
        document.addEventListener('touchend', endPortfolioDrag);
      }

      // Prevent default to avoid text selection during drag
      event.preventDefault();
    };

    const portfolioDrag = (event) => {
      if (!isPortfolioDragging) return;

      // Get current position
      const clientX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
      const deltaX = clientX - portfolioStartX;

      // Calculate how much to translate (as a percentage of carousel width)
      const carouselWidth = portfolioCarousel.value ? portfolioCarousel.value.offsetWidth : 1;
      const percentageDelta = (deltaX / carouselWidth) * 100;

      // Update current translate position
      portfolioCurrentTranslate = portfolioStartTranslate + percentageDelta;

      // Apply the translation (with limits to prevent excessive dragging)
      const minTranslate = -(totalSlides.value - 1) * 100;
      const maxTranslate = 0;
      const limitedTranslate = Math.max(Math.min(portfolioCurrentTranslate, maxTranslate), minTranslate);

      // Apply the transform
      if (portfolioTrack.value) {
        portfolioTrack.value.style.transform = `translateX(${limitedTranslate}%)`;
        portfolioTrack.value.style.transition = 'none';
      }
    };

    const endPortfolioDrag = () => {
      if (!isPortfolioDragging) return;
      isPortfolioDragging = false;

      // Remove event listeners
      document.removeEventListener('mousemove', portfolioDrag);
      document.removeEventListener('mouseup', endPortfolioDrag);
      document.removeEventListener('touchmove', portfolioDrag);
      document.removeEventListener('touchend', endPortfolioDrag);

      // Calculate the drag distance as a percentage
      const dragDistance = portfolioCurrentTranslate - portfolioStartTranslate;

      // Determine if we should change slides based on drag distance
      if (Math.abs(dragDistance) > (portfolioDragThreshold / portfolioCarousel.value.offsetWidth) * 100) {
        // If dragged far enough, move to next/previous slide
        if (dragDistance > 0) {
          prevPortfolioSlide();
        } else {
          nextPortfolioSlide();
        }
      } else {
        // If not dragged far enough, snap back to current slide
        if (portfolioTrack.value) {
          portfolioTrack.value.style.transform = `translateX(-${currentSlide.value * 100}%)`;
          portfolioTrack.value.style.transition = 'transform 0.3s ease-out';
        }
      }
    };

    // Initialize portfolio carousel
    onMounted(() => {
      // Add event listeners for portfolio carousel drag
      if (portfolioCarousel.value) {
        portfolioCarousel.value.addEventListener('mousedown', startPortfolioDrag);
        portfolioCarousel.value.addEventListener('touchstart', startPortfolioDrag);
      }
    });

    // Portfolio is now fully implemented with filtering and navigation

    return {
      portfolioCarousel,
      portfolioTrack,
      currentSlide,
      activeFilter,
      filteredSlides,
      totalSlides,
      setFilter,
      prevPortfolioSlide,
      nextPortfolioSlide,
      goToSlide
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.portfolio-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 6rem 0;
  overflow: hidden;
  background-color: #f2f2f2;

  .container {

    width: 100%;
    margin: 0 auto;
    padding: 0rem;
    position: relative;
  }
}

.portfolio-header {
  max-width: 950px;
  margin-bottom: 4rem;
  text-align: left;
}

.portfolio-titles {
  margin-bottom: 1.5rem;
}

.portfolio-subtitle {
  font-size: 2.2rem;
  font-family: $font-headline;
  font-weight: 300;
  color: #333;
  margin-bottom: 0.5rem;
  line-height: 1.1;
  letter-spacing: 0.02em;

  @media (max-width: $breakpoint-md) {
    font-size: 1.8rem;
  }
}

.portfolio-title {
  font-size: 2.8rem;
  font-family: $font-headline;
  font-weight: 700;
  color: #555;
  margin-bottom: 1rem;
  line-height: 1.1;

  @media (max-width: $breakpoint-md) {
    font-size: 2.2rem;
  }
}

.portfolio-description {
  font-size: 1.125rem;
  font-family: $font-primary;
  color: #555;
  line-height: 1.5;
  max-width: 800px;
}

/* Client logos styles moved to src/assets/scss/components/_portfolio-section.scss */

.portfolio-showcase {
  position: relative;
  width: 100%;
  padding: 2rem 0;
}

.portfolio-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
  }
}

.portfolio-device {

  position: relative;
  height: 600px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  .portfolio-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: $breakpoint-md) {
    flex: 0 0 100%;
    margin-bottom: 2rem;
    height: 300px;
  }
}

/* Navigation styles moved to HorizontalNavigation component */
</style>
