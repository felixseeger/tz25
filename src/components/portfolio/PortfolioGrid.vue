<template>
  <div class="portfolio-grid-container" role="region" aria-label="Portfolio projects">
    <!-- Portfolio grid with filter overlay -->
    <div class="portfolio-grid" role="list" aria-label="Portfolio projects">
      <div
        v-for="item in paginatedItems"
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

    <!-- Pagination - only show when there are more than 6 projects after filtering -->
    <Pagination
      v-if="filteredItems.length > itemsPerPage"
      v-model:currentPage="currentPage"
      :totalPages="totalPages"
    />

    <!-- Filter overlay section - positioned at Y-center of the grid -->
    <div class="portfolio-filters" role="group" aria-label="Portfolio filters">
      <!-- Client logo filters with duplicated content for infinite scrolling -->
      <div class="filter-group client-filters" role="group" aria-label="Client filters">
        <div class="filter-logos-container">
          <!-- First set of logos -->
          <div class="filter-logos-set">
            <button
              v-for="client in clientsList"
              :key="`first-${client.id}`"
              class="filter-button client-filter"
              :class="{ 'active': selectedClientId === client.id }"
              @click="selectClient(client.id)"
              :aria-label="`Filter by ${client.name}`"
              :aria-pressed="selectedClientId === client.id"
              tabindex="0"
            >
              <img
                v-if="getClientLogo(client.id)"
                :src="getClientLogo(client.id)"
                :alt="client.name"
                class="client-logo-img"
              />
              <span v-else>{{ client.name }}</span>
            </button>
          </div>

          <!-- Duplicated set of logos for seamless infinite scrolling -->
          <div class="filter-logos-set">
            <button
              v-for="client in clientsList"
              :key="`second-${client.id}`"
              class="filter-button client-filter"
              :class="{ 'active': selectedClientId === client.id }"
              @click="selectClient(client.id)"
              :aria-label="`Filter by ${client.name}`"
              :aria-pressed="selectedClientId === client.id"
              tabindex="0"
            >
              <img
                v-if="getClientLogo(client.id)"
                :src="getClientLogo(client.id)"
                :alt="client.name"
                class="client-logo-img"
              />
              <span v-else>{{ client.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { clients, clientsMap } from '../../data/clients';
import { portfolioItems } from '../../data/portfolioItems';
import Pagination from '../ui/Pagination.vue';

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
  components: {
    Pagination
  },
  setup() {
    // State
    const selectedClientId = ref(null);
    const selectedCategory = ref(null);
    const clientsList = ref([...clients]);
    const currentPage = ref(1);
    const itemsPerPage = 6; // Number of items to show per page - each client should have at least 6 items

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

      return items;
    });

    // Calculate total pages based on filtered items
    const totalPages = computed(() => {
      return Math.ceil(filteredItems.value.length / itemsPerPage);
    });

    // Get paginated items for current page
    const paginatedItems = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredItems.value.slice(startIndex, endIndex);
    });

    // Methods
    const selectClient = (clientId) => {
      // If clicking the already selected client, deselect it (show all)
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

    // Reset to first page when filters change
    watch([selectedClientId, selectedCategory], () => {
      currentPage.value = 1;
    });

    // Log initial state for debugging
    onMounted(() => {
      console.log('Portfolio Grid mounted with', portfolioItems.length, 'items');

      // Debug: Count projects per client
      const countByClient = {};
      portfolioItems.forEach(item => {
        if (!countByClient[item.clientId]) {
          countByClient[item.clientId] = 0;
        }
        countByClient[item.clientId]++;
      });

      // Log clients with fewer than 6 projects
      const clientsWithFewerThan6 = Object.entries(countByClient)
        .filter(([_, count]) => count < 6)
        .map(([clientId, count]) => ({ clientId, count }));

      console.log('Clients with fewer than 6 projects:', clientsWithFewerThan6);

      // Log clients with no projects
      const clientsWithNoProjects = clients
        .filter(c => !countByClient[c.id])
        .map(c => c.id);

      console.log('Clients with no projects:', clientsWithNoProjects);
    });

    return {
      selectedClientId,
      selectedCategory,
      clientsList,
      categories,
      filteredItems,
      paginatedItems,
      currentPage,
      totalPages,
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
