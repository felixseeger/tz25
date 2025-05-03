<template>
  <section id="portfolio" class="portfolio-section-filtered">
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
/* Styles moved to _portfolio-section-filtered.scss */
</style>
