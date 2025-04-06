import { ref, computed } from 'vue';
import { clients } from '../data/clients';
import { portfolioItems } from '../data/portfolioItems';

export function usePortfolioFilter() {
  // Reactive state
  const selectedClientId = ref(null); // null means "All clients"
  const clientsList = ref([...clients]); // Create a reactive copy of clients
  const selectedClient = ref(null); // The currently selected client object

  // Computed properties
  const filteredItems = computed(() => {
    if (!selectedClientId.value) {
      // If no client is selected, return all items
      return portfolioItems;
    }

    // Filter items by the selected client
    return portfolioItems.filter(item => item.clientId === selectedClientId.value);
  });

  // Group items into slides (4 items per slide: 2 rows of 2)
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
    selectedClientId.value = null;
    selectedClient.value = null;
    clientsList.value.forEach(client => {
      client.active = false;
    });
  };

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
