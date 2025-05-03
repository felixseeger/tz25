import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PortfolioSectionFiltered from '../../src/components/portfolio/PortfolioSectionFiltered.vue';

// Mock the composable
vi.mock('../../src/composables/usePortfolioFilter', () => ({
  usePortfolioFilter: () => ({
    selectedClientId: { value: null },
    selectedClient: { value: null },
    clientsList: { 
      value: [
        { id: 'client1', name: 'Client 1', logo: 'logo1.png', active: false },
        { id: 'client2', name: 'Client 2', logo: 'logo2.png', active: false },
      ] 
    },
    filteredItems: { 
      value: [
        { id: 'item1', clientId: 'client1', title: 'Item 1', description: 'Description 1', category: 'Category 1', image: 'image1.jpg' },
        { id: 'item2', clientId: 'client1', title: 'Item 2', description: 'Description 2', category: 'Category 2', image: 'image2.jpg' },
        { id: 'item3', clientId: 'client2', title: 'Item 3', description: 'Description 3', category: 'Category 1', image: 'image3.jpg' },
        { id: 'item4', clientId: 'client2', title: 'Item 4', description: 'Description 4', category: 'Category 2', image: 'image4.jpg' },
        { id: 'item5', clientId: 'client1', title: 'Item 5', description: 'Description 5', category: 'Category 1', image: 'image5.jpg' },
        { id: 'item6', clientId: 'client2', title: 'Item 6', description: 'Description 6', category: 'Category 2', image: 'image6.jpg' },
        { id: 'item7', clientId: 'client1', title: 'Item 7', description: 'Description 7', category: 'Category 3', image: 'image7.jpg' },
      ]
    },
    paginatedItems: { 
      value: [
        { id: 'item1', clientId: 'client1', title: 'Item 1', description: 'Description 1', category: 'Category 1', image: 'image1.jpg' },
        { id: 'item2', clientId: 'client1', title: 'Item 2', description: 'Description 2', category: 'Category 2', image: 'image2.jpg' },
        { id: 'item3', clientId: 'client2', title: 'Item 3', description: 'Description 3', category: 'Category 1', image: 'image3.jpg' },
        { id: 'item4', clientId: 'client2', title: 'Item 4', description: 'Description 4', category: 'Category 2', image: 'image4.jpg' },
        { id: 'item5', clientId: 'client1', title: 'Item 5', description: 'Description 5', category: 'Category 1', image: 'image5.jpg' },
        { id: 'item6', clientId: 'client2', title: 'Item 6', description: 'Description 6', category: 'Category 2', image: 'image6.jpg' },
      ]
    },
    currentPage: { value: 1 },
    totalPages: { value: 2 },
    isLoading: { value: false },
    itemsPerPage: 6,
    groupedSlides: { value: [] },
    selectClient: vi.fn(),
    resetFilter: vi.fn(),
    goToPage: vi.fn(),
    getFilterHash: vi.fn(() => '#portfolio'),
    applyFilterFromUrl: vi.fn(),
  }),
}));

// Mock child components
vi.mock('../../src/components/portfolio/ClientLogoFilters.vue', () => ({
  default: {
    name: 'ClientLogoFilters',
    template: '<div class="client-logos-mock"></div>',
    props: ['clientsList', 'selectedClientId'],
  },
}));

vi.mock('../../src/components/portfolio/PortfolioSlider.vue', () => ({
  default: {
    name: 'PortfolioSlider',
    template: '<div class="portfolio-slider-mock"></div>',
    props: ['slides', 'selectedClient'],
  },
}));

// Mock window.location and window.history
const mockLocation = {
  hash: '#portfolio',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

window.history = {
  replaceState: vi.fn(),
};

// Mock window.addEventListener
window.addEventListener = vi.fn();

describe('PortfolioSectionFiltered', () => {
  let wrapper;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mount the component
    wrapper = mount(PortfolioSectionFiltered);
  });

  it('should render correctly', () => {
    expect(wrapper.find('.portfolio-section-filtered').exists()).toBe(true);
    expect(wrapper.find('.portfolio-title').text()).toBe('Our Portfolio');
    expect(wrapper.find('.portfolio-subtitle').text()).toBe('Explore our work by client');
    expect(wrapper.find('.portfolio-grid').exists()).toBe(true);
    expect(wrapper.find('.client-logos-mock').exists()).toBe(true);
  });

  it('should render portfolio items', () => {
    const portfolioItems = wrapper.findAll('.portfolio-item');
    expect(portfolioItems.length).toBe(6); // 6 items per page
    
    // Check first item content
    const firstItem = portfolioItems[0];
    expect(firstItem.find('.portfolio-item-title').text()).toBe('Item 1');
    expect(firstItem.find('.portfolio-item-description').text()).toBe('Description 1');
    expect(firstItem.find('.portfolio-item-category').text()).toBe('Category 1');
    expect(firstItem.find('img').attributes('src')).toBe('image1.jpg');
    expect(firstItem.find('img').attributes('alt')).toBe('Item 1 - Description 1');
  });

  it('should render pagination when there are more items than itemsPerPage', () => {
    expect(wrapper.find('.portfolio-pagination').exists()).toBe(true);
    expect(wrapper.find('.pagination-current').text()).toBe('1');
    expect(wrapper.find('.pagination-total').text()).toBe('2');
    
    // Previous button should be disabled on first page
    const prevButton = wrapper.find('.pagination-prev');
    expect(prevButton.attributes('disabled')).toBeDefined();
    
    // Next button should be enabled
    const nextButton = wrapper.find('.pagination-next');
    expect(nextButton.attributes('disabled')).toBeUndefined();
  });

  it('should call handlePageChange when pagination buttons are clicked', async () => {
    // Click next button
    await wrapper.find('.pagination-next').trigger('click');
    
    // Check that goToPage was called with page 2
    const { goToPage } = wrapper.vm.usePortfolioFilter();
    expect(goToPage).toHaveBeenCalledWith(2);
    
    // Mock current page as 2
    wrapper.vm.currentPage = { value: 2 };
    wrapper.vm.totalPages = { value: 2 };
    
    // Force re-render
    await wrapper.vm.$nextTick();
    
    // Click previous button
    await wrapper.find('.pagination-prev').trigger('click');
    
    // Check that goToPage was called with page 1
    expect(goToPage).toHaveBeenCalledWith(1);
  });

  it('should set up event listeners on mount', () => {
    // Check that event listeners were added
    expect(window.addEventListener).toHaveBeenCalledWith('hashchange', expect.any(Function));
    expect(window.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    
    // Check that applyFilterFromUrl was called
    const { applyFilterFromUrl } = wrapper.vm.usePortfolioFilter();
    expect(applyFilterFromUrl).toHaveBeenCalled();
  });
});
