<template>
  <div
    class="section-scroll-indicator"
    :class="{ 'is-visible': isVisible }"
    @click="scrollToNextSection"
    aria-label="Scroll to next section"
  >
    <div class="section-scroll-indicator__icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
      </svg>
    </div>
    <div class="section-scroll-indicator__text">Scroll</div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useNavigation } from '../../composables/useNavigation';

export default {
  name: 'SectionScrollIndicator',
  props: {
    // Sections where the indicator should be visible
    visibleSections: {
      type: Array,
      default: () => ['hero', 'journey', 'history', 'services', 'brand']
    },
    // Z-index for the indicator
    zIndex: {
      type: Number,
      default: 900
    }
  },
  setup(props) {
    const isVisible = ref(false);
    const currentSection = ref(null);
    const { navigateToHomeSection } = useNavigation();

    // Define the section order for navigation based on the actual order in HomeView
    const sectionOrder = ['hero', 'journey', 'testimonials', 'history', 'team', 'services', 'brand', 'portfolio', 'contact', 'footer'];

    // Determine the next section based on current section
    const nextSection = computed(() => {
      if (!currentSection.value) return null;

      const currentIndex = sectionOrder.indexOf(currentSection.value);
      if (currentIndex === -1 || currentIndex === sectionOrder.length - 1) return null;

      return sectionOrder[currentIndex + 1];
    });

    // Check which section is currently in view
    const checkVisibleSection = () => {
      // Initialize foundSection at the top level of the function
      let foundSection = null;

      try {
        // Get all sections - use a more comprehensive selector to find all possible sections
        const sections = document.querySelectorAll('section[id], div[id].section, div.home > *[id], div#app > div > *[id], [class*="section"][id]');

        if (sections.length === 0) {
          console.warn('No sections found with comprehensive selector');
          return; // Exit early if no sections found
        }

        console.log('Found sections:', sections.length);

        // Get the current scroll position
        const scrollPosition = window.scrollY + window.innerHeight / 3; // Use 1/3 of viewport height for better detection

        // Find the section that is currently in view
        let minDistance = Infinity;

        // First pass: check if we're directly inside a section
        for (const section of sections) {
          if (section.id && sectionOrder.includes(section.id)) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              foundSection = section.id;
              break; // Exit the loop early if we found a direct match
            }
          }
        }

        // Second pass: if no direct match, find the closest section
        if (!foundSection) {
          for (const section of sections) {
            if (section.id && sectionOrder.includes(section.id)) {
              const sectionTop = section.offsetTop;
              const sectionMiddle = sectionTop + (section.offsetHeight / 2);
              const distance = Math.abs(scrollPosition - sectionMiddle);

              if (distance < minDistance) {
                minDistance = distance;
                foundSection = section.id;
              }
            }
          }
        }

        // If we still don't have a section, default to the first visible section
        if (!foundSection && sections.length > 0) {
          for (const sectionId of sectionOrder) {
            if (document.getElementById(sectionId)) {
              foundSection = sectionId;
              break;
            }
          }
        }
      } catch (error) {
        console.error('Error in checkVisibleSection:', error);
      }

      // Update current section - now foundSection is always defined, even if it's null
      currentSection.value = foundSection;

      // Always show the indicator if we're in one of the visible sections
      // and not in the last section (contact or footer)
      isVisible.value = foundSection &&
                       props.visibleSections.includes(foundSection) &&
                       foundSection !== 'contact' &&
                       foundSection !== 'footer';
    };

    // Scroll to the next section
    const scrollToNextSection = () => {
      try {
        // Check if we have a valid next section
        if (nextSection.value) {
          console.log(`Scrolling from ${currentSection.value || 'unknown'} to ${nextSection.value}`);
          navigateToHomeSection(nextSection.value, { scrollDelay: 300 });
          return;
        }

        // Fallback 1: Try to find the current section's index and navigate to the next one
        if (currentSection.value) {
          const currentIndex = sectionOrder.indexOf(currentSection.value);

          // If we found the current section and it's not the last one
          if (currentIndex !== -1 && currentIndex < sectionOrder.length - 1) {
            const fallbackNextSection = sectionOrder[currentIndex + 1];
            console.log(`Fallback 1: Scrolling to ${fallbackNextSection}`);
            navigateToHomeSection(fallbackNextSection, { scrollDelay: 300 });
            return;
          }
        }

        // Fallback 2: Find the first visible section and go to the next one
        for (let i = 0; i < sectionOrder.length - 1; i++) {
          const sectionId = sectionOrder[i];
          const section = document.getElementById(sectionId);

          if (section) {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

            if (isVisible) {
              const nextSectionId = sectionOrder[i + 1];
              console.log(`Fallback 2: Visible section ${sectionId}, scrolling to ${nextSectionId}`);
              navigateToHomeSection(nextSectionId, { scrollDelay: 300 });
              return;
            }
          }
        }

        // Fallback 3: Just go to the journey section (first section after hero)
        console.log('Fallback 3: Scrolling to journey section');
        navigateToHomeSection('journey', { scrollDelay: 300 });
      } catch (error) {
        console.error('Error in scrollToNextSection:', error);
        // Ultimate fallback - just go to journey section
        try {
          navigateToHomeSection('journey', { scrollDelay: 300 });
        } catch (e) {
          console.error('Failed to navigate to journey section:', e);
        }
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', checkVisibleSection);
      checkVisibleSection(); // Check initial position
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', checkVisibleSection);
    });

    return {
      isVisible,
      currentSection,
      nextSection,
      scrollToNextSection
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.section-scroll-indicator {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: v-bind(zIndex);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, visibility 0.5s ease, transform 0.5s ease;

  &.is-visible {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }

  &__icon {
    width: 40px;
    height: 40px;
    border: 2px solid white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
    animation: bounce 2s infinite;
    background-color: rgba(0, 0, 0, 0.2);

    svg {
      width: 24px;
      height: 24px;
      fill: white;
    }
  }

  &__text {
    color: white;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }

  &:hover {
    .section-scroll-indicator__text {
      opacity: 1;
    }
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Media queries for responsive design */
@media (max-width: $breakpoint-md) {
  .section-scroll-indicator {
    bottom: 30px;

    &__icon {
      width: 36px;
      height: 36px;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    &__text {
      font-size: 0.7rem;
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .section-scroll-indicator {
    bottom: 20px;

    &__icon {
      width: 32px;
      height: 32px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>
