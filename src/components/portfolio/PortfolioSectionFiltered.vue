<template>
  <section id="portfolio" class="portfolio-section">
    <div class="container">
      <div class="portfolio-header">
        <h2 class="portfolio-title">Our Portfolio</h2>
        <p class="portfolio-subtitle">Explore our work by client</p>
      </div>

      <div class="portfolio-showcase-container">
        <!-- Dynamic portfolio slider -->
        <PortfolioSlider
          :slides="groupedSlides"
          :selectedClient="selectedClient"
        />

        <!-- Client logo filters as absolute overlay -->
        <ClientLogoFilters
          :clientsList="clientsList"
          :selectedClientId="selectedClientId"
          @select-client="selectClient"
          @reset-filter="resetFilter"
          class="client-logos-overlay"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue';
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
      resetFilter
    };
  }
}
</script>

<style lang="scss" scoped>
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
</style>
