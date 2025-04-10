<template>
  <div class="portfolio-grid-container" role="region" aria-label="Portfolio projects">
    <!-- Filter section -->
    <div class="portfolio-filters" role="group" aria-label="Portfolio filters">
      <!-- Client filters
      <div class="filter-group client-filters" role="group" aria-label="Client filters">
        <button
          class="filter-button"
          :class="{ 'active': !selectedClientId }"
          @click="resetFilter"
          aria-label="Show all clients"
          :aria-pressed="!selectedClientId"
          tabindex="0"
        >
          All Clients
        </button>
        <button
          v-for="client in clientsList"
          :key="client.id"
          class="filter-button client-filter"
          :class="{ 'active': selectedClientId === client.id }"
          @click="selectClient(client.id)"
          :aria-label="`Filter by ${client.name}`"
          :aria-pressed="selectedClientId === client.id"
          tabindex="0"
        >
          {{ client.name }}
        </button>
      </div> -->

      <!-- Category filters -->
      <div class="filter-group category-filters" role="group" aria-label="Category filters">
        <button
          class="filter-button"
          :class="{ 'active': !selectedCategory }"
          @click="resetCategoryFilter"
          aria-label="Show all categories"
          :aria-pressed="!selectedCategory"
          tabindex="0"
        >
          All Categories
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          class="filter-button category-filter"
          :class="{ 'active': selectedCategory === category.id }"
          @click="selectCategory(category.id)"
          :aria-label="`Filter by ${category.name} category`"
          :aria-pressed="selectedCategory === category.id"
          tabindex="0"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <!-- Portfolio grid -->
    <div class="portfolio-grid" role="list" aria-label="Portfolio projects">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="portfolio-item"
        role="listitem"
        :aria-label="`${item.title} by ${getClientName(item.clientId)}`"
      >
        <div class="portfolio-item-inner">
          <img
            :src="item.image"
            :alt="`${item.title} - ${item.description}`"
            class="portfolio-item-image"
          >
          <div class="portfolio-item-overlay">
            <h3 class="portfolio-item-title">{{ item.title }}</h3>
            <p class="portfolio-item-description">{{ item.description }}</p>
            <div class="portfolio-item-client">
              <img
                v-if="getClientLogo(item.clientId)"
                :src="getClientLogo(item.clientId)"
                :alt="`${getClientName(item.clientId)} logo`"
                class="portfolio-item-client-logo"
                aria-hidden="true"
              >
              <span class="portfolio-item-category">{{ getCategoryName(item.category) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state when no items match the filters -->
      <div v-if="filteredItems.length === 0" class="portfolio-empty-state" role="alert" aria-live="polite">
        <p>No portfolio items match the selected filters.</p>
        <button
          class="filter-button reset-button"
          @click="resetAllFilters"
          aria-label="Reset all filters"
          tabindex="0"
        >
          Reset Filters
        </button>
      </div>

      <!-- Pagination controls -->
      <div v-if="totalPages > 1" class="portfolio-pagination" role="navigation" aria-label="Portfolio pagination">
        <button
          class="pagination-button prev"
          :disabled="currentPage === 1"
          @click="goToPreviousPage"
          aria-label="Go to previous page"
        >
          <span aria-hidden="true">←</span>
        </button>

        <div class="pagination-pages">
          <button
            v-for="page in totalPages"
            :key="page"
            class="pagination-page"
            :class="{ 'active': currentPage === page }"
            @click="goToPage(page)"
            :aria-label="`Go to page ${page}`"
            :aria-current="currentPage === page ? 'page' : null"
          >
            {{ page }}
          </button>
        </div>

        <button
          class="pagination-button next"
          :disabled="currentPage === totalPages"
          @click="goToNextPage"
          aria-label="Go to next page"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { clients, clientsMap } from '../../data/clients';
import { portfolioItems } from '../../data/portfolioItems';

// Define categories
const categoriesList = [
  { id: 'digital', name: 'Digital' },
  { id: 'print', name: 'Print' },
  { id: 'branding', name: 'Branding' },
  { id: 'web', name: 'Web' },
  { id: 'social', name: 'Social Media' },
  { id: 'strategy', name: 'Strategy' },
  { id: 'experiential', name: 'Experiential' },
  { id: 'integrated', name: 'Integrated' },
  { id: 'b2b', name: 'B2B' },
  { id: 'corporate', name: 'Corporate' },
  { id: 'product', name: 'Product' }
];

// Create a map of categories by ID
const categoriesMap = categoriesList.reduce((map, category) => {
  map[category.id] = category;
  return map;
}, {});

export default {
  name: 'PortfolioGrid',
  setup() {
    // State
    const selectedClientId = ref(null);
    const selectedCategory = ref(null);
    const clientsList = ref([...clients]);

    // Computed properties
    const categories = computed(() => {
      // If a client is selected, only show categories that have items for that client
      if (selectedClientId.value) {
        const clientItems = portfolioItems.filter(item => item.clientId === selectedClientId.value);
        const clientCategories = [...new Set(clientItems.map(item => item.category))];
        return categoriesList.filter(category => clientCategories.includes(category.id));
      }

      // Otherwise show all categories
      return categoriesList;
    });

    // Pagination state
    const currentPage = ref(1);
    const itemsPerPage = 8; // 2 rows of 4 items

    // Filtered items without pagination
    const allFilteredItems = computed(() => {
      let items = [...portfolioItems];

      // Filter by client if selected
      if (selectedClientId.value) {
        items = items.filter(item => item.clientId === selectedClientId.value);
      }

      // Filter by category if selected
      if (selectedCategory.value) {
        items = items.filter(item => item.category === selectedCategory.value);
      }

      return items;
    });

    // Total number of pages
    const totalPages = computed(() => {
      return Math.ceil(allFilteredItems.value.length / itemsPerPage);
    });

    // Current page items
    const filteredItems = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      return allFilteredItems.value.slice(startIndex, startIndex + itemsPerPage);
    });

    // Methods
    const selectClient = (clientId) => {
      // If clicking the already selected client, deselect it
      if (selectedClientId.value === clientId) {
        selectedClientId.value = null;
      } else {
        selectedClientId.value = clientId;
        // Reset category filter when changing clients
        selectedCategory.value = null;
      }
    };

    const selectCategory = (categoryId) => {
      // If clicking the already selected category, deselect it
      if (selectedCategory.value === categoryId) {
        selectedCategory.value = null;
      } else {
        selectedCategory.value = categoryId;
      }
    };

    const resetFilter = () => {
      selectedClientId.value = null;
    };

    const resetCategoryFilter = () => {
      selectedCategory.value = null;
    };

    const resetAllFilters = () => {
      selectedClientId.value = null;
      selectedCategory.value = null;
    };

    const getClientLogo = (clientId) => {
      return clientsMap[clientId]?.logo || null;
    };

    const getClientName = (clientId) => {
      return clientsMap[clientId]?.name || 'Unknown Client';
    };

    const getCategoryName = (categoryId) => {
      return categoriesMap[categoryId]?.name || categoryId;
    };

    // Pagination methods
    const goToPage = (page) => {
      currentPage.value = page;
      // Scroll to top of grid when changing pages
      const gridElement = document.querySelector('.portfolio-grid');
      if (gridElement) {
        gridElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const goToNextPage = () => {
      if (currentPage.value < totalPages.value) {
        goToPage(currentPage.value + 1);
      }
    };

    const goToPreviousPage = () => {
      if (currentPage.value > 1) {
        goToPage(currentPage.value - 1);
      }
    };

    // Reset pagination when filters change
    const resetPagination = () => {
      currentPage.value = 1;
    };

    // Update selectClient to reset pagination
    const selectClientWithPagination = (clientId) => {
      selectClient(clientId);
      resetPagination();
    };

    // Update selectCategory to reset pagination
    const selectCategoryWithPagination = (categoryId) => {
      selectCategory(categoryId);
      resetPagination();
    };

    // Update reset methods to reset pagination
    const resetFilterWithPagination = () => {
      resetFilter();
      resetPagination();
    };

    const resetCategoryFilterWithPagination = () => {
      resetCategoryFilter();
      resetPagination();
    };

    const resetAllFiltersWithPagination = () => {
      resetAllFilters();
      resetPagination();
    };

    // Log initial state for debugging
    onMounted(() => {
      console.log('Portfolio Grid mounted with', portfolioItems.length, 'items');
    });

    return {
      selectedClientId,
      selectedCategory,
      clientsList,
      categories,
      filteredItems,
      currentPage,
      totalPages,
      selectClient: selectClientWithPagination,
      selectCategory: selectCategoryWithPagination,
      resetFilter: resetFilterWithPagination,
      resetCategoryFilter: resetCategoryFilterWithPagination,
      resetAllFilters: resetAllFiltersWithPagination,
      goToPage,
      goToNextPage,
      goToPreviousPage,
      getClientLogo,
      getClientName,
      getCategoryName
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.portfolio-grid-container {
  width: 100%;
  max-width: 1920px;
  margin: 140px auto;
  padding: 0 2rem;
}

.portfolio-filters {
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    gap: 1rem;
  }
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: $breakpoint-md) {
    overflow-x: auto;
    padding-bottom: 0.5rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Edge */
    }
  }
}

.filter-button {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #e0e0e0;
  }

  &.active {
    background-color: $primary-color;
    color: white;
  }
}

.reset-button {
  margin-top: 1rem;
  background-color: $primary-color;
  color: white;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1800px;
  margin: 0 auto;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.portfolio-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

    .portfolio-item-overlay {
      opacity: 1;
    }
  }
}

.portfolio-item-inner {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 66.67%; /* 3:2 aspect ratio */
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.portfolio-item-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portfolio-item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  @media (max-width: $breakpoint-md) {
    opacity: 1;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), transparent);
    justify-content: flex-end;
  }
}

.portfolio-item-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.portfolio-item-description {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  opacity: 0.9;

  @media (max-width: $breakpoint-md) {
    display: none;
  }
}

.portfolio-item-client {
  display: flex;
  align-items: center;
  margin-top: auto;

  .portfolio-item-client-logo {
    height: 30px;
    width: auto;
    max-width: 80px;
    margin-right: 0.75rem;
    object-fit: contain;
    background-color: white;
    padding: 0.25rem;
    border-radius: 4px;
  }

  .portfolio-item-category {
    font-size: 0.8rem;
    opacity: 0.8;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }
}

.portfolio-empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 8px;

  p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: #666;
  }
}

/* Pagination styles */
.portfolio-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 0.5rem;
}

.pagination-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
  color: $primary-color;

  &:hover:not(:disabled) {
    background-color: #f5f5f5;
    border-color: #ccc;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.prev, &.next {
    font-weight: bold;
  }
}

.pagination-pages {
  display: flex;
  gap: 0.25rem;
}

.pagination-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: #f5f5f5;
  }

  &.active {
    background-color: $primary-color;
    color: white;
    border-color: $primary-color;
    font-weight: bold;
  }
}
</style>
