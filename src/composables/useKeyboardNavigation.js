import { ref, onMounted, onBeforeUnmount } from 'vue';

/**
 * Composable for detecting keyboard navigation
 * Shows an indicator when the user starts using keyboard navigation
 * @returns {Object} - Keyboard navigation state and methods
 */
export function useKeyboardNavigation() {
  const showKeyboardFocusIndicator = ref(false);
  let usingKeyboard = false;
  let keyboardIndicatorTimeout = null;

  /**
   * Handle keyboard navigation detection
   * @param {KeyboardEvent} event - The keyboard event
   */
  const handleKeyDown = (event) => {
    // Only track Tab key for keyboard navigation
    if (event.key === 'Tab') {
      if (!usingKeyboard) {
        usingKeyboard = true;
        document.body.classList.add('keyboard-navigation');
        showKeyboardFocusIndicator.value = true;
        
        // Hide the indicator after 3 seconds
        if (keyboardIndicatorTimeout) {
          clearTimeout(keyboardIndicatorTimeout);
        }
        
        keyboardIndicatorTimeout = setTimeout(() => {
          showKeyboardFocusIndicator.value = false;
        }, 3000);
      }
    }
  };
  
  /**
   * Handle mouse detection
   * Switch back to mouse navigation mode
   */
  const handleMouseDown = () => {
    usingKeyboard = false;
    document.body.classList.remove('keyboard-navigation');
  };
  
  // Set up event listeners
  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
  });
  
  // Clean up event listeners
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('mousedown', handleMouseDown);
    
    if (keyboardIndicatorTimeout) {
      clearTimeout(keyboardIndicatorTimeout);
    }
  });

  return {
    showKeyboardFocusIndicator
  };
}
