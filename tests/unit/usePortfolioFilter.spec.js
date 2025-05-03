import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePortfolioFilter } from '../../src/composables/usePortfolioFilter';

// Mock the Vue imports
vi.mock('vue', () => ({
  ref: vi.fn((val) => ({
    value: val,
  })),
  computed: vi.fn((fn) => ({
    value: fn(),
  })),
  watchEffect: vi.fn((fn) => fn()),
  onMounted: vi.fn((fn) => fn()),
}));

// Mock the data imports
vi.mock('../../src/data/clients', () => ({
  clients: [
    { id: 'client1', name: 'Client 1', logo: 'logo1.png', active: false },
    { id: 'client2', name: 'Client 2', logo: 'logo2.png', active: false },
    { id: 'client3', name: 'Client 3', logo: 'logo3.png', active: false },
  ],
}));

vi.mock('../../src/data/portfolioItems', () => ({
  portfolioItems: [
    { id: 'item1', clientId: 'client1', title: 'Item 1', description: 'Description 1', category: 'Category 1', image: 'image1.jpg' },
    { id: 'item2', clientId: 'client1', title: 'Item 2', description: 'Description 2', category: 'Category 2', image: 'image2.jpg' },
    { id: 'item3', clientId: 'client2', title: 'Item 3', description: 'Description 3', category: 'Category 1', image: 'image3.jpg' },
    { id: 'item4', clientId: 'client2', title: 'Item 4', description: 'Description 4', category: 'Category 2', image: 'image4.jpg' },
    { id: 'item5', clientId: 'client3', title: 'Item 5', description: 'Description 5', category: 'Category 1', image: 'image5.jpg' },
    { id: 'item6', clientId: 'client3', title: 'Item 6', description: 'Description 6', category: 'Category 2', image: 'image6.jpg' },
    { id: 'item7', clientId: 'client1', title: 'Item 7', description: 'Description 7', category: 'Category 3', image: 'image7.jpg' },
    { id: 'item8', clientId: 'client2', title: 'Item 8', description: 'Description 8', category: 'Category 3', image: 'image8.jpg' },
    { id: 'item9', clientId: 'client3', title: 'Item 9', description: 'Description 9', category: 'Category 3', image: 'image9.jpg' },
  ],
}));

// Mock window.location
const mockLocation = {
  hash: '#portfolio',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

// Mock window.history
window.history = {
  replaceState: vi.fn(),
};

describe('usePortfolioFilter', () => {
  let portfolioFilter;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Reset location hash
    mockLocation.hash = '#portfolio';
    
    // Initialize the composable
    portfolioFilter = usePortfolioFilter();
  });

  it('should initialize with all items and no selected client', () => {
    expect(portfolioFilter.selectedClientId.value).toBeNull();
    expect(portfolioFilter.selectedClient.value).toBeNull();
    expect(portfolioFilter.clientsList.value.length).toBe(3);
    expect(portfolioFilter.filteredItems.value.length).toBe(9);
    expect(portfolioFilter.currentPage.value).toBe(1);
  });

  it('should filter items when a client is selected', () => {
    // Select client1
    portfolioFilter.selectClient('client1');
    
    // Check that client1 is selected
    expect(portfolioFilter.selectedClientId.value).toBe('client1');
    expect(portfolioFilter.selectedClient.value).not.toBeNull();
    expect(portfolioFilter.selectedClient.value.id).toBe('client1');
    
    // Check that only client1 items are in the filtered list
    expect(portfolioFilter.filteredItems.value.length).toBe(3);
    expect(portfolioFilter.filteredItems.value.every(item => item.clientId === 'client1')).toBe(true);
    
    // Check that pagination is reset
    expect(portfolioFilter.currentPage.value).toBe(1);
  });

  it('should reset filter when the same client is selected again', () => {
    // First select client1
    portfolioFilter.selectClient('client1');
    expect(portfolioFilter.selectedClientId.value).toBe('client1');
    
    // Then select client1 again
    portfolioFilter.selectClient('client1');
    
    // Check that filter is reset
    expect(portfolioFilter.selectedClientId.value).toBeNull();
    expect(portfolioFilter.selectedClient.value).toBeNull();
    expect(portfolioFilter.filteredItems.value.length).toBe(9);
  });

  it('should reset filter when resetFilter is called', () => {
    // First select client1
    portfolioFilter.selectClient('client1');
    expect(portfolioFilter.selectedClientId.value).toBe('client1');
    
    // Then reset filter
    portfolioFilter.resetFilter();
    
    // Check that filter is reset
    expect(portfolioFilter.selectedClientId.value).toBeNull();
    expect(portfolioFilter.selectedClient.value).toBeNull();
    expect(portfolioFilter.filteredItems.value.length).toBe(9);
    expect(portfolioFilter.currentPage.value).toBe(1);
  });

  it('should paginate items correctly', () => {
    // Set itemsPerPage to a smaller value for testing
    const originalItemsPerPage = portfolioFilter.itemsPerPage;
    portfolioFilter.itemsPerPage = 3;
    
    // Check initial pagination
    expect(portfolioFilter.totalPages.value).toBe(3);
    expect(portfolioFilter.paginatedItems.value.length).toBe(3);
    
    // Go to page 2
    portfolioFilter.goToPage(2);
    expect(portfolioFilter.currentPage.value).toBe(2);
    expect(portfolioFilter.paginatedItems.value.length).toBe(3);
    
    // Go to page 3
    portfolioFilter.goToPage(3);
    expect(portfolioFilter.currentPage.value).toBe(3);
    expect(portfolioFilter.paginatedItems.value.length).toBe(3);
    
    // Try to go to an invalid page
    portfolioFilter.goToPage(4);
    expect(portfolioFilter.currentPage.value).toBe(3); // Should stay on page 3
    
    // Reset itemsPerPage
    portfolioFilter.itemsPerPage = originalItemsPerPage;
  });

  it('should generate correct URL hash for filter state', () => {
    // No filter, page 1
    expect(portfolioFilter.getFilterHash()).toBe('#portfolio');
    
    // Select client1
    portfolioFilter.selectClient('client1');
    expect(portfolioFilter.getFilterHash()).toBe('#portfolio?client=client1');
    
    // Go to page 2
    portfolioFilter.goToPage(2);
    expect(portfolioFilter.getFilterHash()).toBe('#portfolio?client=client1&page=2');
    
    // Reset filter but stay on page 2
    portfolioFilter.selectedClientId.value = null;
    portfolioFilter.selectedClient.value = null;
    expect(portfolioFilter.getFilterHash()).toBe('#portfolio?page=2');
    
    // Reset to page 1
    portfolioFilter.currentPage.value = 1;
    expect(portfolioFilter.getFilterHash()).toBe('#portfolio');
  });

  it('should apply filter from URL hash', () => {
    // Set URL hash to client2, page 2
    mockLocation.hash = '#portfolio?client=client2&page=2';
    
    // Call applyFilterFromUrl
    portfolioFilter.applyFilterFromUrl();
    
    // Check that filter is applied
    expect(portfolioFilter.selectedClientId.value).toBe('client2');
    expect(portfolioFilter.selectedClient.value).not.toBeNull();
    expect(portfolioFilter.selectedClient.value.id).toBe('client2');
    
    // Check that page is set (this happens after a timeout in the real implementation)
    // We'll simulate the timeout effect
    const setTimeoutMock = vi.fn();
    global.setTimeout = setTimeoutMock;
    
    portfolioFilter.applyFilterFromUrl();
    
    // Get the callback function
    const timeoutCallback = setTimeoutMock.mock.calls[0][0];
    
    // Call the callback function
    timeoutCallback();
    
    // Check that page is set
    expect(portfolioFilter.currentPage.value).toBe(2);
  });
});
