import { useRouter, useRoute } from 'vue-router'
import { useScrollTo } from './useScrollTo'

/**
 * Composable for handling navigation between pages and sections
 * @returns {Object} - Navigation methods
 */
export function useNavigation() {
  const router = useRouter()
  const route = useRoute()
  const { scrollToSection } = useScrollTo()

  /**
   * Navigate to a section on the home page
   * If already on home page, just scroll to the section
   * If on another page, navigate to home page and then scroll to section
   *
   * @param {string} sectionId - The ID of the section to navigate to
   * @param {Object} options - Additional options
   */
  const navigateToHomeSection = async (sectionId, options = {}) => {
    const defaultOptions = {
      offset: 80, // Default offset for navbar
      closeMenu: () => {}, // Default empty function for menu closing
      scrollDelay: 300 // Delay before scrolling after navigation
    }

    const navOptions = { ...defaultOptions, ...options }

    // Close menu if provided
    if (navOptions.closeMenu && typeof navOptions.closeMenu === 'function') {
      navOptions.closeMenu()
    }

    // Check if we're already on the home page
    if (route.path === '/') {
      // Just scroll to the section
      console.log(`Already on home page, scrolling to #${sectionId}`)
      scrollToSection(sectionId, {
        offset: navOptions.offset,
        maxAttempts: 5,
        attemptDelay: 100
      })
    } else {
      // Navigate to home page with hash
      console.log(`Navigating to home page with hash #${sectionId}`)
      try {
        await router.push({ path: '/', hash: `#${sectionId}` })

        // Wait for the page to render and then scroll
        // Use a longer delay to account for page transitions
        setTimeout(() => {
          console.log(`Navigation complete, scrolling to #${sectionId}`)
          scrollToSection(sectionId, {
            offset: navOptions.offset,
            maxAttempts: 10,
            attemptDelay: 100
          })
        }, navOptions.scrollDelay)
      } catch (error) {
        console.error('Navigation error:', error)
      }
    }
  }

  /**
   * Navigate to a separate page
   *
   * @param {string} path - The path to navigate to
   * @param {Function} closeMenu - Function to close the menu
   */
  const navigateToPage = (path, closeMenu) => {
    if (closeMenu && typeof closeMenu === 'function') {
      closeMenu()
    }
    router.push(path)
  }

  return {
    navigateToHomeSection,
    navigateToPage
  }
}
