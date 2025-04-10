import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactButton from '@/components/ui/ContactButton.vue';

// Mock the composables
vi.mock('../../composables/useScrollTo', () => ({
  useScrollTo: () => ({
    scrollToSection: vi.fn()
  })
}));

vi.mock('../../composables/useActiveSection', () => ({
  useActiveSection: () => ({
    activeSection: { value: 'hero' }
  })
}));

describe('ContactButton.vue', () => {
  // Mock IntersectionObserver
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  });

  // Mock getElementById
  const originalGetElementById = document.getElementById;

  beforeEach(() => {
    // Mock window.location.hash
    Object.defineProperty(window, 'location', {
      value: {
        hash: ''
      },
      writable: true
    });

    // Mock IntersectionObserver
    window.IntersectionObserver = mockIntersectionObserver;

    // Mock getElementById
    document.getElementById = vi.fn().mockImplementation((id) => {
      if (id === 'history' || id === 'contact') {
        return {
          getBoundingClientRect: () => ({
            top: 500, // Outside viewport
            bottom: 1500,
            height: 1000
          })
        };
      }
      return null;
    });

    // Mock window.innerHeight
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true
    });

    // Reset mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore original getElementById
    document.getElementById = originalGetElementById;

    // Restore window.location
    Object.defineProperty(window, 'location', {
      value: window.location,
      writable: true
    });
  });

  // Test basic rendering
  it('renders correctly', () => {
    const wrapper = mount(ContactButton);

    expect(wrapper.find('.contact-button').exists()).toBe(true);
    expect(wrapper.find('.contact-button__link').exists()).toBe(true);
    expect(wrapper.find('.contact-button__image').exists()).toBe(true);
  });

  // Test click event
  it('calls scrollToContact when clicked', async () => {
    const wrapper = mount(ContactButton);
    const scrollToSectionSpy = vi.spyOn(wrapper.vm, 'scrollToContact');

    await wrapper.find('.contact-button__link').trigger('click');

    expect(scrollToSectionSpy).toHaveBeenCalled();
  });

  // Test button visibility when in contact section
  it('hides button when in contact section', async () => {
    // Mock activeSection as 'contact'
    vi.mock('../../composables/useActiveSection', () => ({
      useActiveSection: () => ({
        activeSection: { value: 'contact' }
      })
    }), { virtual: true });

    const wrapper = mount(ContactButton);

    expect(wrapper.vm.shouldHideButton).toBe(true);
    expect(wrapper.find('.contact-button').classes()).toContain('is-hidden');
  });

  // Test button visibility when in history section
  it('hides button when in history section', async () => {
    // Mock activeSection as 'history'
    vi.mock('../../composables/useActiveSection', () => ({
      useActiveSection: () => ({
        activeSection: { value: 'history' }
      })
    }), { virtual: true });

    const wrapper = mount(ContactButton);

    expect(wrapper.vm.shouldHideButton).toBe(true);
    expect(wrapper.find('.contact-button').classes()).toContain('is-hidden');
  });

  // Test button visibility based on URL hash
  it('hides button when URL hash is #contact', async () => {
    // Set window.location.hash to #contact
    window.location.hash = '#contact';

    const wrapper = mount(ContactButton);

    expect(wrapper.vm.shouldHideButton).toBe(true);
    expect(wrapper.find('.contact-button').classes()).toContain('is-hidden');
  });

  // Test event listeners
  it('adds and removes event listeners correctly', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const wrapper = mount(ContactButton);

    // Check that event listeners were added
    expect(addEventListenerSpy).toHaveBeenCalledWith('contact-section-visible', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('history-section-visible', expect.any(Function));

    // Unmount component
    wrapper.unmount();

    // Check that event listeners were removed
    expect(removeEventListenerSpy).toHaveBeenCalledWith('contact-section-visible', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('history-section-visible', expect.any(Function));
  });

  // Test IntersectionObserver setup
  it('sets up IntersectionObserver for history section', () => {
    // Setup fake timers
    vi.useFakeTimers();

    const wrapper = mount(ContactButton);

    // Wait for the setTimeout in onMounted to execute
    vi.runAllTimers();

    expect(document.getElementById).toHaveBeenCalledWith('history');
    expect(mockIntersectionObserver).toHaveBeenCalled();

    // Restore real timers
    vi.useRealTimers();
  });

  // Test scroll handler
  it('updates section visibility on scroll', async () => {
    const wrapper = mount(ContactButton);

    // Mock sections to be in viewport
    document.getElementById.mockImplementation((id) => {
      if (id === 'history' || id === 'contact') {
        return {
          getBoundingClientRect: () => ({
            top: 100, // Inside viewport
            bottom: 900,
            height: 800
          })
        };
      }
      return null;
    });

    // Trigger scroll event
    window.dispatchEvent(new Event('scroll'));

    // Wait for the next tick
    await wrapper.vm.$nextTick();

    // Both sections should be considered visible
    expect(wrapper.vm.isHistorySectionVisible).toBe(true);
    expect(wrapper.vm.shouldHideButton).toBe(true);
  });
});
