<template>
  <section class="team-section">
    <div class="section-container">
      <div class="team-header">
        <h2 class="team-title">MOVE TOGETHER –</h2>
        <h2 class="team-subtitle">TEAM TAKTZEIT</h2>
        <p class="team-description">
          Pernatiatium sitasperate patem dologendam reporendes alia cust, te mod quam guidella dolorem et,
          to torio. Ut quam volupta tustrum volorum endestem fugitaspis etur, nimpe. Aliaeriis. As ese omnis-
          sequam acea con estrurit pe maiose periam abore volore everios et ut vellupi cientivello et vellupa
          nisintem arcillo natiatur, omniment quia coriso scipide.
        </p>
      </div>

      <div class="team-carousel" ref="teamCarousel">
        <div class="team-carousel__wrapper" ref="carouselWrapper">
          <!-- First row -->
          <div class="team-carousel__row">
            <!-- Left column with team member -->
            <div class="team-carousel__item team-carousel__item--photo">
              <div class="team-members-photo">
                <img
                  src="../../assets/images/team-members/team-tobi.jpg"
                  alt="Team Member"
                  aspect-ratio="1/1"
                  placeholder-color="#333333"
                />
              </div>
            </div>

            <!-- Middle column with quote -->
            <div class="team-carousel__item team-carousel__item--quote">
              <div class="quote">
                <span class="quote-mark"><img src="../../assets/images/quote.svg" alt="Quote" class="quote-mark-image" /></span>
                <p class="quote-text">Utam acerios nobitae quatqui cuptius illatnibus dolest, odia dit etusandan-to quo dolectem. Itatis et voluptiores enihilab ipsum, nus delit rerupta</p>
              </div>
            </div>

            <!-- Right column with two team members -->
            <div class="team-carousel__item team-carousel__item--double">
              <div class="team-members-photo">
                <img
                  src="../../assets/images/team-members/team-kirsten.jpg"
                  alt="Team Member"
                  aspect-ratio="1/1"
                  placeholder-color="#333333"

                />
              </div>
            </div>
          </div>

          <!-- Second row -->
          <div class="team-carousel__row">
            <!-- Left column with team member -->
            <div class="team-carousel__item team-carousel__item--photo">
              <div class="team-members-photo">
                <img
                  src="../../assets/images/team-members/team-jan.jpg"
                  alt="Team Member"
                  aspect-ratio="1/1"
                  placeholder-color="#333333"
                />
              </div>
            </div>

            <!-- Middle column with team member -->
            <div class="team-carousel__item team-carousel__item--photo">
              <div class="team-members-photo">
                <img
                  src="../../assets/images/team-members/team-melissa.jpg"
                  alt="Team Member"
                  aspect-ratio="1/1"
                  placeholder-color="#333333"
                />
              </div>
            </div>

            <!-- Right column with quote -->
            <div class="team-carousel__item team-carousel__item--quote">
              <div class="quote">
                <span class="quote-mark"><img src="../../assets/images/quote.svg" alt="Quote" class="quote-mark-image" /></span>
                <p class="quote-text">Utam acerios nobitae quatqui cuptius illatnibus dolest, odia dit etusandan-to quo dolectem. Itatis et voluptiores enihilab ipsum, nus delit rerupta</p>
              </div>
            </div>
          </div>

          <!-- Third row -->
          <div class="team-carousel__row">
            <!-- Left column with quote -->
            <div class="team-carousel__item team-carousel__item--quote">
              <div class="quote">
                <span class="quote-mark"><img src="../../assets/images/quote.svg" alt="Quote" class="quote-mark-image" /></span>
                <p class="quote-text">Utam acerios nobitae quatqui cuptius illatnibus dolest, odia dit etusandan-to quo dolectem. Itatis et voluptiores enihilab ipsum, nus delit rerupta</p>
              </div>
            </div>

            <!-- Right column with two team members -->
            <div class="team-carousel__item team-carousel__item--double">
              <div class="team-members-photo team-members-photo--double">
                <img
                  src="../../assets/images/team-members/team-anh.jpg"
                  alt="Team Member"
                  class="left-member"
                  aspect-ratio="1/1"
                  placeholder-color="#333333"
                />
                <img
                  src="../../assets/images/team-members/team-rena-omiros.jpg"
                  alt="Team Member"
                  class="right-member"
                  aspect-ratio="1/1"
                  placeholder-color="#333333"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="team-navigation-container">
        <button class="team-nav-button team-nav-button--prev" @click="scrollLeft">
          <img src="../../assets/images/arrow_left.svg" alt="Previous" class="team-nav-arrow">
        </button>
        <button class="team-nav-button team-nav-button--next" @click="scrollRight">
          <img src="../../assets/images/arrow_right.svg" alt="Next" class="team-nav-arrow">
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { LazyImage } from './../ui';

export default {
  name: 'TeamSection',
  components: {
    LazyImage
  },
  setup() {
    const teamCarousel = ref(null);
    const carouselWrapper = ref(null);
    const currentIndex = ref(0);
    const maxIndex = ref(2); // Number of rows - 1
    const isScrolling = ref(false);

    // Variables for drag functionality
    let isDragging = false;
    let startX = 0;
    let startScrollPosition = 0;
    let dragVelocity = 0;
    let lastDragTime = 0;
    let lastDragX = 0;
    let momentumAnimationId = null;

    // Function to scroll to previous row
    const scrollLeft = () => {
      if (isScrolling.value || !carouselWrapper.value) return;

      if (currentIndex.value > 0) {
        isScrolling.value = true;
        currentIndex.value--;
        updateCarouselPosition();

        // Reset scrolling state after animation completes
        setTimeout(() => {
          isScrolling.value = false;
        }, 500);
      }
    };

    // Function to scroll to next row
    const scrollRight = () => {
      if (isScrolling.value || !carouselWrapper.value) return;

      if (currentIndex.value < maxIndex.value) {
        isScrolling.value = true;
        currentIndex.value++;
        updateCarouselPosition();

        // Reset scrolling state after animation completes
        setTimeout(() => {
          isScrolling.value = false;
        }, 500);
      }
    };

    // Update carousel position based on current index
    const updateCarouselPosition = () => {
      if (!carouselWrapper.value) return;

      // Get all rows
      const rows = carouselWrapper.value.querySelectorAll('.team-carousel__row');
      if (rows.length === 0) return;

      // Calculate the offset based on the current row's position
      const currentRow = rows[currentIndex.value];
      const rowWidth = currentRow.offsetWidth;
      const offset = currentIndex.value * rowWidth;

      // Apply the transform
      carouselWrapper.value.style.transform = `translateX(-${offset}px)`;

      // Log for debugging
      console.log(`Scrolling to row ${currentIndex.value}, offset: ${offset}px, row width: ${rowWidth}px`);
    };

    // Drag functionality
    const startDrag = (e) => {
      // Get the appropriate client X position (touch or mouse)
      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;

      isDragging = true;
      startX = clientX;
      startScrollPosition = currentIndex.value;
      lastDragX = clientX;
      lastDragTime = Date.now();
      dragVelocity = 0;

      // Pause any ongoing animations
      isScrolling.value = true;

      // Stop any ongoing momentum animation
      if (momentumAnimationId) {
        cancelAnimationFrame(momentumAnimationId);
        momentumAnimationId = null;
      }

      // Add event listeners for drag and end events
      if (e.type === 'mousedown') {
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
      } else if (e.type === 'touchstart') {
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', endDrag);
      }
    };

    const drag = (e) => {
      if (!isDragging || !carouselWrapper.value) return;

      // Prevent default to avoid scrolling the page
      if (e.cancelable) e.preventDefault();

      // Get the appropriate client X position (touch or mouse)
      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const deltaX = clientX - startX;

      // Calculate the potential new index based on drag distance
      // We use a threshold to determine when to switch rows
      const rowWidth = carouselWrapper.value.offsetWidth / (maxIndex.value + 1);
      const dragThreshold = rowWidth * 0.2; // 20% of row width

      let newIndex = startScrollPosition;
      if (deltaX > dragThreshold) {
        // Dragging right, decrease index
        newIndex = Math.max(0, startScrollPosition - 1);
      } else if (deltaX < -dragThreshold) {
        // Dragging left, increase index
        newIndex = Math.min(maxIndex.value, startScrollPosition + 1);
      }

      // Only update if the index has changed
      if (newIndex !== currentIndex.value) {
        currentIndex.value = newIndex;
        updateCarouselPosition();
      }

      // Calculate velocity for momentum scrolling
      const now = Date.now();
      const elapsed = now - lastDragTime;

      if (elapsed > 0) {
        dragVelocity = (clientX - lastDragX) / elapsed;
        lastDragX = clientX;
        lastDragTime = now;
      }
    };

    const endDrag = () => {
      if (!isDragging) return;

      isDragging = false;
      isScrolling.value = false;

      // Remove event listeners
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('touchend', endDrag);

      // Apply momentum scrolling if velocity is significant
      if (Math.abs(dragVelocity) > 0.5) {
        // Determine direction based on velocity
        if (dragVelocity > 0) {
          // Scrolling right (negative index direction)
          scrollLeft();
        } else {
          // Scrolling left (positive index direction)
          scrollRight();
        }
      }
    };

    // Set up event listeners and initialize
    onMounted(() => {
      // Wait for DOM to be fully rendered
      setTimeout(() => {
        // Initialize the carousel
        updateCarouselPosition();

        // Add drag event listeners
        if (teamCarousel.value) {
          teamCarousel.value.addEventListener('mousedown', startDrag);
          teamCarousel.value.addEventListener('touchstart', startDrag, { passive: true });

          // Add cursor styles
          teamCarousel.value.style.cursor = 'grab';
        }

        // Add window resize handler to update carousel on resize
        const handleResize = () => {
          updateCarouselPosition();
        };

        window.addEventListener('resize', handleResize);

        // Store the resize handler for cleanup later
        window.teamSectionResizeHandler = handleResize;
      }, 100);

      // Add keyboard navigation
      const handleKeyDown = (event) => {
        if (event.key === 'ArrowLeft') {
          scrollLeft();
        } else if (event.key === 'ArrowRight') {
          scrollRight();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      // Clean up event listeners on unmount
      onUnmounted(() => {
        if (teamCarousel.value) {
          teamCarousel.value.removeEventListener('mousedown', startDrag);
          teamCarousel.value.removeEventListener('touchstart', startDrag);
        }

        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', endDrag);

        window.removeEventListener('keydown', handleKeyDown);

        // Clean up resize handler
        if (window.teamSectionResizeHandler) {
          window.removeEventListener('resize', window.teamSectionResizeHandler);
          delete window.teamSectionResizeHandler;
        }

        if (momentumAnimationId) {
          cancelAnimationFrame(momentumAnimationId);
        }
      });
    });

    return {
      teamCarousel,
      carouselWrapper,
      scrollLeft,
      scrollRight,
      startDrag,
      drag,
      endDrag
    };
  }
};
</script>

<style lang="scss" scoped>
/* Styles moved to src/assets/scss/components/_team-section.scss */
</style>
