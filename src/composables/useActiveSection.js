import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for tracking the active section using Intersection Observer
 * @param {Object} options - Configuration options
 * @returns {Object} - Active section state and methods
 */
export function useActiveSection(options = {}) {
  const activeSection = ref('')
  const observers = ref([])

  const defaultOptions = {
    rootMargin: '-40% 0px', // Consider a section active when it's near the middle of the viewport
    threshold: 0,
    sectionSelector: 'section[id], footer[id]', // Default selector for sections and footer
    defaultSection: 'hero' // Default active section
  }

  const config = { ...defaultOptions, ...options }

  /**
   * Initialize the active section
   */
  function initActiveSection() {
    activeSection.value = config.defaultSection
  }

  /**
   * Set up intersection observers for all sections
   */
  function setupObservers() {
    try {
      // Clean up any existing observers
      observers.value.forEach(observer => observer.disconnect())
      observers.value = []

      const sections = document.querySelectorAll(config.sectionSelector)

      if (sections.length === 0) {
        console.warn(`No sections found with selector: ${config.sectionSelector}`)
        return
      }

      const observerOptions = {
        root: null,
        rootMargin: config.rootMargin,
        threshold: config.threshold
      }

      const observerCallback = (entries) => {
        try {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              activeSection.value = entry.target.id
              console.log('Section in view:', entry.target.id) // Debug log

              // Optionally update URL hash for deep linking
              if (options.updateHash) {
                history.replaceState(null, null, `#${entry.target.id}`)
              }
            }
          })
        } catch (error) {
          console.error('Error in observer callback:', error)
        }
      }

      const observer = new IntersectionObserver(observerCallback, observerOptions)

      sections.forEach(section => {
        if (section.id) {
          observer.observe(section)
        } else {
          console.warn('Found a section without an ID attribute')
        }
      })

      observers.value.push(observer)
    } catch (error) {
      console.error('Error setting up observers:', error)
    }
  }

  /**
   * Manually set the active section
   * @param {string} sectionId - The ID of the section to set as active
   */
  function setActiveSection(sectionId) {
    activeSection.value = sectionId
  }

  /**
   * Check if a section is the active one
   * @param {string} sectionId - The ID of the section to check
   * @returns {boolean} - Whether the section is active
   */
  function isActiveSection(sectionId) {
    return activeSection.value === sectionId
  }

  onMounted(() => {
    try {
      initActiveSection()

      // Add a small delay to ensure the DOM is fully rendered
      setTimeout(() => {
        setupObservers()

        // Handle initial hash in URL
        if (window.location.hash) {
          const initialSection = window.location.hash.substring(1)
          const element = document.getElementById(initialSection)
          if (element) {
            setActiveSection(initialSection)
          }
        }
      }, 100) // 100ms delay
    } catch (error) {
      console.error('Error in useActiveSection:', error)
    }
  })

  onUnmounted(() => {
    // Clean up observers
    observers.value.forEach(observer => observer.disconnect())
  })

  return {
    activeSection,
    setActiveSection,
    isActiveSection,
    setupObservers // Exposed in case DOM changes and observers need to be reset
  }
}
