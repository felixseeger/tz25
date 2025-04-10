<template>
  <section id="portfolio" class="portfolio-section">
    <div class="container">
      <div class="portfolio-header">
        <h2 class="portfolio-title">Our Portfolio</h2>
        <p class="portfolio-subtitle">Explore our work by client</p>
      </div>

      <div class="portfolio-showcase-container">
        <!-- Dynamic portfolio slider with v-model for current slide -->
        <PortfolioSlider
          :slides="groupedSlides"
          :selectedClient="selectedClient"
          :external-current-slide="currentSlide"
          @update:current-slide="currentSlide = $event"
        />

        <!-- Client logo filters -->
        <ClientLogoFilters
          :clientsList="clientsList"
          :selectedClientId="selectedClientId"
          @select-client="selectClient"
          @reset-filter="resetFilter"
          class="client-logos-overlay"
        />

        <!-- Pagination indicators at top right -->
        <div v-if="groupedSlides.length > 1" class="top-pagination">
          <button
            v-for="(_, index) in groupedSlides"
            :key="index"
            @click="goToSlide(index)"
            :class="['pagination-dot', { active: currentSlide === index }]"
            :aria-label="'Go to slide ' + (index + 1)"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, ref } from 'vue';
import ClientLogoFilters from './ClientLogoFilters.vue';
import PortfolioSlider from './PortfolioSlider.vue';
import { usePortfolioFilter } from '../../composables/usePortfolioFilter';

export default {
  name: 'PortfolioSectionFiltered',
  components: {
    ClientLogoFilters,
    PortfolioSlider
  },
  setup() {
    // Use our portfolio filter composable
    const {
      selectedClientId,
      selectedClient,
      clientsList,
      filteredItems,
      groupedSlides,
      selectClient,
      resetFilter
    } = usePortfolioFilter();

    // Add currentSlide state for pagination
    const currentSlide = ref(0);

    // Function to navigate to a specific slide
    const goToSlide = (index) => {
      currentSlide.value = index;
      // You might want to emit an event to the PortfolioSlider component
      // or use a shared state management solution for more complex scenarios
    };

    // Log the initial state for debugging
    onMounted(() => {
      console.log('Initial portfolio items:', filteredItems.value.length);
      console.log('Initial grouped slides:', groupedSlides.value.length);
    });

    return {
      selectedClientId,
      selectedClient,
      clientsList,
      filteredItems,
      groupedSlides,
      selectClient,
      resetFilter,
      currentSlide,
      goToSlide
    };
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.portfolio-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center; /* Center horizontally */
  padding: 0rem 0;
  overflow: visible;
  background-color: #f2f2f2;
  width: 100%;
}

.container {
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  position: relative;
}

.portfolio-header {
  text-align: center;
  margin-bottom: 3rem;
}

.portfolio-title {
  font-size: 3rem;
  font-weight: 700;

}

.portfolio-subtitle {
  font-size: 1.2rem;
  color: #666;
}

.portfolio-showcase-container {
  position: relative;
  overflow: visible;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.client-logos-overlay {
  /* This class is applied to the ClientLogoFilters component */
  position: absolute;
  top: 38.5%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  z-index: 100;
  pointer-events: auto;
}

.top-pagination {
  position: absolute;
  top: 30%;
  right: 2rem;
  display: flex;
  gap: 0.5rem;
  z-index: 110;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  .pagination-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &.active {
      background-color: #333;
      transform: scale(1.2);
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  @media (max-width: 768px) {
    right: 1.5rem;
    padding: 0.4rem 0.8rem;

    .pagination-dot {
      width: 10px;
      height: 10px;
    }
  }

  @media (max-width: 576px) {
    right: 1rem;
    padding: 0.3rem 0.6rem;

    .pagination-dot {
      width: 8px;
      height: 8px;
    }
  }
}
</style>
