import { ref, computed, watchEffect, onMounted } from 'vue';
import { clients } from '../data/clients';
import { portfolioItems } from '../data/portfolioItems';

export function usePortfolioFilter() {
  // Reactive state
  const selectedClientId = ref(null); // null means "All clients"
  const clientsList = ref([...clients]); // Create a reactive copy of clients
  const selectedClient = ref(null); // The currently selected client object
  const currentPage = ref(1); // Current page for pagination
  const isLoading = ref(false); // Loading state for filter changes
  const itemsPerPage = 6; // Number of items to show per page
  const cachedFilteredItems = ref([]); // Cache for filtered items
  const isInitialized = ref(false); // Flag to track initialization

  // Pre-compute client-to-items map for faster filtering
  const clientItemsMap = computed(() => {
    const map = new Map();

    // Add "all items" entry
    map.set(null, portfolioItems);

    // Add entries for each client
    clientsList.value.forEach(client => {
      const items = portfolioItems.filter(item => item.clientId === client.id);
      map.set(client.id, items);
    });

    return map;
  });

  // Optimized filtered items using the map
  const filteredItems = computed(() => {
    return cachedFilteredItems.value;
  });

  // Update cached filtered items when selection changes
  watchEffect(() => {
    if (isInitialized.value) {
      isLoading.value = true;

      // Use setTimeout to ensure the loading state is visible
      setTimeout(() => {
        // Get items from the pre-computed map
        cachedFilteredItems.value = clientItemsMap.value.get(selectedClientId.value) || [];
        isLoading.value = false;
      }, 300);
    }
  });

  // Initialize on mount
  onMounted(() => {
    // Initialize with all items
    cachedFilteredItems.value = portfolioItems;
    isInitialized.value = true;
  });

  // Calculate total pages based on filtered items
  const totalPages = computed(() => {
    return Math.ceil(filteredItems.value.length / itemsPerPage);
  });

  // Get paginated items for current page - with memoization
  const paginatedItems = computed(() => {
    // Ensure current page is valid
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value;
    }

    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.value.slice(startIndex, endIndex);
  });

  // Group items into slides (4 items per slide: 2 rows of 2)
  // This is kept for backward compatibility but not actively used in the new implementation
  const groupedSlides = computed(() => {
    const items = filteredItems.value;
    const slides = [];

    // Group items into sets of 4
    for (let i = 0; i < items.length; i += 4) {
      const slideItems = items.slice(i, i + 4);

      // If we don't have 4 items for the last slide, pad with empty items
      while (slideItems.length < 4) {
        slideItems.push({ id: `empty-${slideItems.length}`, isEmpty: true });
      }

      // Split into 2 rows of 2 items
      const slide = {
        row1: slideItems.slice(0, 2),
        row2: slideItems.slice(2, 4)
      };

      slides.push(slide);
    }

    return slides;
  });

  // Methods
  const selectClient = (clientId) => {
    // Reset pagination to first page whenever filter changes
    currentPage.value = 1;

    // If clicking the already selected client, deselect it (show all)
    if (selectedClientId.value === clientId) {
      selectedClientId.value = null;
      selectedClient.value = null;
    } else {
      selectedClientId.value = clientId;
      // Find the selected client object
      selectedClient.value = clientsList.value.find(client => client.id === clientId) || null;
    }

    // Update active state for all clients
    clientsList.value.forEach(client => {
      client.active = client.id === selectedClientId.value;
    });
  };

  const resetFilter = () => {
    // Reset pagination to first page
    currentPage.value = 1;

    selectedClientId.value = null;
    selectedClient.value = null;
    clientsList.value.forEach(client => {
      client.active = false;
    });
  };

  // Method to change page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  // Get the URL hash for the current filter state
  const getFilterHash = () => {
    const params = new URLSearchParams();

    if (selectedClientId.value) {
      params.set('client', selectedClientId.value);
    }

    if (currentPage.value > 1) {
      params.set('page', currentPage.value.toString());
    }

    const hash = params.toString();
    return hash ? `#portfolio?${hash}` : '#portfolio';
  };

  // Apply filter state from URL
  const applyFilterFromUrl = () => {
    try {
      // Get the URL hash
      const hash = window.location.hash;

      // If no hash or no query params, return
      if (!hash || !hash.includes('?')) {
        return;
      }

      // Extract the query params
      const queryString = hash.split('?')[1];
      const params = new URLSearchParams(queryString);

      // Get client ID and page from params
      const clientId = params.get('client');
      const page = params.get('page');

      // Apply client filter if present
      if (clientId) {
        // Check if client exists
        const clientExists = clientsList.value.some(client => client.id === clientId);

        if (clientExists) {
          selectClient(clientId);
        }
      }

      // Apply page if present
      if (page) {
        const pageNum = parseInt(page, 10);

        if (!isNaN(pageNum) && pageNum > 0) {
          // Wait for filtered items to be updated
          setTimeout(() => {
            if (pageNum <= totalPages.value) {
              currentPage.value = pageNum;
            }
          }, 500);
        }
      }
    } catch (error) {
      console.error('Error applying filter from URL:', error);
    }
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
    getFilterHash,
    applyFilterFromUrl
  };
}
