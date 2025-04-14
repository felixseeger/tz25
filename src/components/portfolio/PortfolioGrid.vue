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

    const filteredItems = computed(() => {
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
      selectClient,
      selectCategory,
      resetFilter,
      resetCategoryFilter,
      resetAllFilters,
      getClientLogo,
      getClientName,
      getCategoryName
    };
  }
};
</script>

<style lang="scss" scoped>
// Styles moved to src/assets/scss/components/_portfolio-grid.scss
</style>
