<template>
  <section id="portfolio" class="portfolio-section-filtered">
    <div class="container">
      <div class="portfolio-header">
        <h2 class="portfolio-title">Our Portfolio</h2>
        <p class="portfolio-subtitle">Explore our work by client</p>
      </div>

      <div class="portfolio-showcase-container">
        <!-- Loading overlay -->
        <div v-if="isLoading" class="portfolio-loading-overlay">
          <div class="portfolio-loading-spinner"></div>
        </div>

        <!-- Portfolio grid with pagination -->
        <div class="portfolio-grid-wrapper">
          <div class="portfolio-grid">
            <div
              v-for="item in paginatedItems"
              :key="item.id"
              class="portfolio-item"
              :class="{ 'fade-in': !isLoading }"
            >
              <div class="portfolio-item-inner">
                <img
                  :src="item.image"
                  :alt="`${item.title} - ${item.description}`"
                  class="portfolio-item-image"
                  loading="lazy"
                >
                <div class="portfolio-item-overlay">
                  <div class="portfolio-item-content">
                    <h3 class="portfolio-item-title">{{ item.title }}</h3>
                    <p class="portfolio-item-description">{{ item.description }}</p>
                    <div class="portfolio-item-category">{{ item.category }}</div>
                    <button
                      class="portfolio-item-link"
                      @click="openProjectModal(item)"
                      aria-label="View project details"
                    >
                      View Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination component - only show when needed -->
          <div v-if="filteredItems.length > itemsPerPage" class="portfolio-pagination">
            <button
              class="pagination-button pagination-prev"
              @click="handlePageChange(currentPage - 1)"
              :disabled="currentPage === 1"
              aria-label="Previous page"
              tabindex="0"
            >
              <img src="../../assets/images/arrow_left.svg" alt="Previous" class="pagination-arrow" />
            </button>

            <div class="pagination-info">
              <span class="pagination-current">{{ currentPage }}</span>
              <span class="pagination-separator">/</span>
              <span class="pagination-total">{{ totalPages }}</span>
            </div>

            <button
              class="pagination-button pagination-next"
              @click="handlePageChange(currentPage + 1)"
              :disabled="currentPage === totalPages"
              aria-label="Next page"
              tabindex="0"
            >
              <img src="../../assets/images/arrow_right.svg" alt="Next" class="pagination-arrow" />
            </button>
          </div>
        </div>

        <!-- Empty state when no items match the filter -->
        <div v-if="filteredItems.length === 0" class="portfolio-empty-state">
          <p>No portfolio items match the selected filter.</p>
          <button
            class="reset-filter-button"
            @click="handleResetFilter"
            tabindex="0"
          >
            Reset Filter
          </button>
        </div>

        <!-- Client logo filters as absolute overlay -->
        <ClientLogoFilters
          :clientsList="clientsList"
          :selectedClientId="selectedClientId"
          @select-client="handleClientSelect"
          @reset-filter="handleResetFilter"
          class="client-logos-overlay"
        />
      </div>
    </div>

    <!-- Project Modal -->
    <ProjectModal
      v-if="selectedProject"
      :show="showModal"
      :project="selectedProject"
      @close="closeProjectModal"
    />
  </section>
</template>

<script>
import { onMounted, ref } from 'vue';
import ClientLogoFilters from './ClientLogoFilters.vue';
import PortfolioSlider from './PortfolioSlider.vue';
import ProjectModal from './ProjectModal.vue';
import { usePortfolioFilter } from '../../composables/usePortfolioFilter';

export default {
  name: 'PortfolioSectionFiltered',
  components: {
    ClientLogoFilters,
    PortfolioSlider,
    ProjectModal
  },
  setup() {
    // Use our portfolio filter composable
    const {
      selectedClientId,
      selectedClient,
      clientsList,
      filteredItems,
      paginatedItems,
      currentPage,
      totalPages,
      isLoading,
      itemsPerPage,
      groupedSlides,
      selectClient,
      resetFilter,
      goToPage,
      getFilterHash,
      applyFilterFromUrl
    } = usePortfolioFilter();

    // Handle client selection with URL update
    const handleClientSelect = (clientId) => {
      selectClient(clientId);
      updateUrlHash();
    };

    // Handle reset filter with URL update
    const handleResetFilter = () => {
      resetFilter();
      updateUrlHash();
    };

    // Handle page change with URL update
    const handlePageChange = (page) => {
      goToPage(page);
      updateUrlHash();
    };

    // Update URL hash based on current filter state
    const updateUrlHash = () => {
      const newHash = getFilterHash();

      // Only update if hash has changed to avoid unnecessary history entries
      if (window.location.hash !== newHash) {
        // Use history.replaceState to update URL without adding to history
        window.history.replaceState(null, '', newHash);
      }
    };

    // Watch for hash changes to update filter state
    const handleHashChange = () => {
      applyFilterFromUrl();
    };

    // Initialize and set up event listeners
    onMounted(() => {
      console.log('Initial portfolio items:', filteredItems.value.length);
      console.log('Items per page:', itemsPerPage);

      // Apply filter from URL on initial load
      applyFilterFromUrl();

      // Listen for hash changes
      window.addEventListener('hashchange', handleHashChange);

      // Add keyboard event listeners for pagination
      window.addEventListener('keydown', handleKeyboardNavigation);
    });

    // Handle keyboard navigation for pagination
    const handleKeyboardNavigation = (event) => {
      // Only handle keyboard events when portfolio section is in view
      const portfolioSection = document.getElementById('portfolio');
      if (!portfolioSection) return;

      const rect = portfolioSection.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      if (!isInView) return;

      // Handle left/right arrow keys for pagination
      if (event.key === 'ArrowLeft' && currentPage.value > 1) {
        handlePageChange(currentPage.value - 1);
      } else if (event.key === 'ArrowRight' && currentPage.value < totalPages.value) {
        handlePageChange(currentPage.value + 1);
      }
    };

    // Modal state
    const showModal = ref(false);
    const selectedProject = ref(null);

    // Open project modal
    const openProjectModal = (project) => {
      selectedProject.value = project;
      showModal.value = true;

      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    };

    // Close project modal
    const closeProjectModal = () => {
      showModal.value = false;

      // Restore body scrolling
      document.body.style.overflow = '';

      // Set selectedProject to null after animation completes
      setTimeout(() => {
        selectedProject.value = null;
      }, 300);
    };

    return {
      selectedClientId,
      selectedClient,
      clientsList,
      filteredItems,
      paginatedItems,
      currentPage,
      totalPages,
      isLoading,
      itemsPerPage,
      groupedSlides,
      selectClient,
      resetFilter,
      goToPage,
      handleClientSelect,
      handleResetFilter,
      handlePageChange,
      // Modal
      showModal,
      selectedProject,
      openProjectModal,
      closeProjectModal
    };
  }
}
</script>

<style lang="scss" scoped>
/* Styles moved to _portfolio-section-filtered.scss */
</style>
