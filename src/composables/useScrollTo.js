import { ref } from 'vue'

/**
 * Composable for smooth scrolling to sections
 * @returns {Object} - Methods for scrolling
 */
export function useScrollTo() {
  const isScrolling = ref(false)

  /**
   * Calculate the duration of scroll animation based on distance
   * @param {number} distance - The distance to scroll in pixels
   * @returns {number} - The duration in milliseconds
   */
  function calculateDuration(distance) {
    // Base duration plus additional time based on distance
    // This creates a more natural feel for different scroll distances
    const baseDuration = 300
    const distanceFactor = Math.min(Math.abs(distance) / 1000, 1.5) // Cap at 1.5
    return baseDuration + (distanceFactor * 700) // Max 1000ms
  }

  /**
   * Scroll to a specific section by ID
   * @param {string} sectionId - The ID of the section to scroll to
   * @param {Object} options - Scrolling options
   */
  function scrollToSection(sectionId, options = {}) {
    const defaultOptions = {
      behavior: 'smooth',
      block: 'start',
      offset: 0, // Additional offset from the top
      maxAttempts: 10, // Maximum number of attempts to find the element
      attemptDelay: 100, // Delay between attempts in milliseconds
      onStart: null, // Callback when scrolling starts
      onComplete: null, // Callback when scrolling completes
      onError: null // Callback when scrolling fails
    }

    const scrollOptions = { ...defaultOptions, ...options }

    // Function to attempt scrolling with retry logic
    const attemptScroll = (attemptCount = 0) => {
      const element = document.getElementById(sectionId)

      if (element) {
        isScrolling.value = true
        console.log(`Found element #${sectionId}, scrolling to it...`)

        // Call onStart callback if provided
        if (typeof scrollOptions.onStart === 'function') {
          scrollOptions.onStart()
        }

        // Calculate element position
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - scrollOptions.offset
        const scrollDistance = offsetPosition - window.pageYOffset

        // Calculate scroll duration based on distance
        const duration = calculateDuration(scrollDistance)

        // If we need an offset, we'll use scrollTo instead of scrollIntoView
        if (scrollOptions.offset !== 0 || true) { // Always use scrollTo for consistency
          window.scrollTo({
            top: offsetPosition,
            behavior: scrollOptions.behavior
          })
        } else {
          element.scrollIntoView({
            behavior: scrollOptions.behavior,
            block: scrollOptions.block
          })
        }

        // Reset the scrolling state after animation completes
        setTimeout(() => {
          isScrolling.value = false

          // Call onComplete callback if provided
          if (typeof scrollOptions.onComplete === 'function') {
            scrollOptions.onComplete()
          }
        }, duration + 100) // Add a small buffer to the calculated duration
      } else if (attemptCount < scrollOptions.maxAttempts) {
        // Element not found yet, retry after a delay
        console.log(`Element #${sectionId} not found, retrying... (${attemptCount + 1}/${scrollOptions.maxAttempts})`)
        setTimeout(() => attemptScroll(attemptCount + 1), scrollOptions.attemptDelay)
      } else {
        console.error(`Failed to find element #${sectionId} after ${scrollOptions.maxAttempts} attempts`)

        // Call onError callback if provided
        if (typeof scrollOptions.onError === 'function') {
          scrollOptions.onError(new Error(`Failed to find element #${sectionId}`))
        }
      }
    }

    // Start the first attempt
    attemptScroll()
  }

  /**
   * Scroll to top of the page
   * @param {Object} options - Scrolling options
   */
  function scrollToTop(options = {}) {
    const defaultOptions = {
      behavior: 'smooth',
      onComplete: null
    }

    const scrollOptions = { ...defaultOptions, ...options }
    const scrollDistance = window.pageYOffset
    const duration = calculateDuration(scrollDistance)

    isScrolling.value = true

    window.scrollTo({
      top: 0,
      behavior: scrollOptions.behavior
    })

    // Reset scrolling state after animation completes
    setTimeout(() => {
      isScrolling.value = false

      // Call onComplete callback if provided
      if (typeof scrollOptions.onComplete === 'function') {
        scrollOptions.onComplete()
      }
    }, duration + 100) // Add a small buffer to the calculated duration
  }

  /**
   * Scroll to a specific position on the page
   * @param {number} position - The position to scroll to in pixels
   * @param {Object} options - Scrolling options
   */
  function scrollToPosition(position, options = {}) {
    const defaultOptions = {
      behavior: 'smooth',
      onComplete: null
    }

    const scrollOptions = { ...defaultOptions, ...options }
    const scrollDistance = Math.abs(position - window.pageYOffset)
    const duration = calculateDuration(scrollDistance)

    isScrolling.value = true

    window.scrollTo({
      top: position,
      behavior: scrollOptions.behavior
    })

    // Reset scrolling state after animation completes
    setTimeout(() => {
      isScrolling.value = false

      // Call onComplete callback if provided
      if (typeof scrollOptions.onComplete === 'function') {
        scrollOptions.onComplete()
      }
    }, duration + 100) // Add a small buffer to the calculated duration
  }

  return {
    scrollToSection,
    scrollToTop,
    scrollToPosition,
    isScrolling
  }
}
