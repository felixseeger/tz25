<template>
  <section class="portfolio-section">
    <div class="container">
      <div class="portfolio-header">
        <div class="portfolio-titles">
          <h2 class="portfolio-subtitle">UNSERE PROJEKTE –</h2>
          <h2 class="portfolio-title">ERFOLGSGESCHICHTEN</h2>
        </div>
        <p class="portfolio-description">
          So, jetzt haben wir uns Ihnen ausführlich vorgestellt. Noch etwas vergessen? Natürlich, das Schönste zum Schluss: die Arbeit für unsere Kunden aus den unterschiedlichsten Branchen. Denn das ist es, wofür wir Tag für Tag mit Herz und Hand unser Bestes geben.
        </p>
      </div>

      <!-- Portfolio Showcase Carousel -->
      <div class="portfolio-showcase-container">
        <div class="portfolio-carousel" ref="portfolioCarousel">
          <div class="portfolio-carousel-track" ref="portfolioTrack" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <!-- Slide 1 -->
            <div class="portfolio-slide" :class="{ 'active': currentSlide === 0 }">
              <!-- First row -->
              <div class="portfolio-row">

                  <img src="../../assets/images/portfolio-item-placeholder.jpg" alt="Portfolio Showcase 1" class="portfolio-image" />


                  <img src="../../assets/images/portfolio-item-placeholder.jpg" alt="Portfolio Showcase 2" class="portfolio-image" />

              </div>
              <!-- Second row -->
              <div class="portfolio-row">

                  <img src="../../assets/images/portfolio-item-placeholder.jpg" alt="Portfolio Showcase 3" class="portfolio-image" />


                  <img src="../../assets/images/portfolio-item-placeholder.jpg" alt="Portfolio Showcase 4" class="portfolio-image" />

              </div>
            </div>

          </div>

          <!-- Navigation controls -->
          <div class="portfolio-navigation">
            <HorizontalNavigation @prev="prevPortfolioSlide" @next="nextPortfolioSlide" class="dark" />
          </div>

          <!-- Pagination indicators -->
          <div class="portfolio-pagination">
            <button
              v-for="(_, index) in 3"
              :key="index"
              @click="goToSlide(index)"
              :class="['pagination-dot', { active: currentSlide === index }]"
              :aria-label="`Go to slide ${index + 1}`"
            ></button>
          </div>
        </div>
      </div>

      <!-- Full-width client logos carousel -->
      <div class="client-logos-container">
        <div class="client-logos" ref="clientLogosTrack">
          <div class="client-logos-track" ref="logoTrack">
            <!-- Original set of logos (will be cloned by JavaScript) -->
            <div class="client-logo logo-item"><img src="../../assets/images/client-logos/bridgestone-logo.svg" alt="Bridgestone" /></div>
            <div class="client-logo logo-item"><img src="../../assets/images/client-logos/bridgestone-logo.svg" alt="Bridgestone" /></div>
            <div class="client-logo logo-item"><div class="placeholder-logo">Client 2</div></div>
            <div class="client-logo logo-item"><div class="placeholder-logo">Client 3</div></div>
            <div class="client-logo logo-item"><div class="placeholder-logo">Client 4</div></div>
            <div class="client-logo logo-item"><div class="placeholder-logo">Client 5</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { HorizontalNavigation } from './../base';

export default {
  name: 'PortfolioSection',
  components: {
    HorizontalNavigation
  },
  setup() {
    const clientLogosTrack = ref(null);
    const logoTrack = ref(null);
    const portfolioCarousel = ref(null);
    const portfolioTrack = ref(null);
    const currentSlide = ref(0);
    const totalSlides = ref(3);

    let animationPaused = false;
    let animationId = null;
    let scrollPosition = 0;
    let logoSetWidth = 0;
    let scrollSpeed = 0.5; // Pixels to move per frame (reduced speed)
    let resizeTimeout = null; // For debouncing resize events

    // Portfolio carousel variables
    let isPortfolioDragging = false;
    let portfolioStartX = 0;
    let portfolioStartTranslate = 0;
    let portfolioCurrentTranslate = 0;
    let isTransitioning = false;
    const portfolioDragThreshold = 50; // Minimum drag distance to trigger slide change

    // Variables for drag functionality
    let isDragging = false;
    let startX = 0;
    let startScrollPosition = 0;
    let dragVelocity = 0;
    let lastDragTime = 0;
    let lastDragX = 0;
    let momentumAnimationId = null;

    // Function to clone logos for endless loop
    const setupEndlessLoop = () => {
      if (!logoTrack.value) return;

      // Reset scroll position
      scrollPosition = 0;
      if (logoTrack.value) {
        logoTrack.value.style.transform = 'translateX(0)';
      }

      // Get all original logo items
      const logoItems = logoTrack.value.querySelectorAll('.logo-item');
      if (!logoItems.length) return;

      // Clear any existing clones
      const existingClones = logoTrack.value.querySelectorAll('.logo-clone');
      existingClones.forEach(clone => clone.remove());

      // Clone the logo items multiple times to ensure we have enough for any screen width
      const numClones = Math.ceil(window.innerWidth / (logoItems.length * 200)) + 1;

      for (let i = 0; i < numClones; i++) {
        logoItems.forEach(item => {
          const clone = item.cloneNode(true);
          clone.classList.add('logo-clone');
          logoTrack.value.appendChild(clone);
        });
      }

      // Calculate the width of one complete set of logos
      logoSetWidth = Array.from(logoItems).reduce((width, item) => {
        const itemWidth = item.offsetWidth + parseInt(getComputedStyle(item).marginLeft) + parseInt(getComputedStyle(item).marginRight);
        return width + itemWidth;
      }, 0);

      // Adjust the animation speed based on screen width
      adjustScrollSpeed();

      console.log(`Logo set width: ${logoSetWidth}px, Created ${numClones} clones, Speed: ${scrollSpeed}px/frame`);

      // Start the animation
      startAnimation();
    };

    // Animate the logos with requestAnimationFrame for smoother performance
    const animate = () => {
      if (!logoTrack.value || animationPaused) return;

      // Increment scroll position
      scrollPosition -= scrollSpeed; // Use the scrollSpeed variable

      // Reset position when we've scrolled one full set width
      if (Math.abs(scrollPosition) >= logoSetWidth) {
        scrollPosition = 0;
      }

      // Apply the transform
      logoTrack.value.style.transform = `translateX(${scrollPosition}px)`;

      // Continue the animation
      animationId = requestAnimationFrame(animate);
    };

    // Function to adjust animation speed based on screen width
    const adjustScrollSpeed = () => {
      // Adjust speed based on screen width (faster on larger screens)
      // Reduced to 1/4 of the original speed
      const baseSpeed = 0.25; // Further reduced from 0.5 to 0.25
      const screenWidthFactor = Math.max(0.8, Math.min(1.5, window.innerWidth / 1200));
      scrollSpeed = baseSpeed * screenWidthFactor;

      console.log(`Adjusted scroll speed: ${scrollSpeed} pixels per frame`);
    };

    const startAnimation = () => {
      if (animationId) cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    // Toggle animation on hover
    const pauseAnimation = () => {
      animationPaused = true;
    };

    const resumeAnimation = () => {
      if (!isDragging) { // Only resume if not dragging
        animationPaused = false;
        if (!animationId) startAnimation();
      }
    };

    // Drag functionality
    const startDrag = (e) => {
      // Get the appropriate client X position (touch or mouse)
      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;

      isDragging = true;
      startX = clientX;
      startScrollPosition = scrollPosition;
      lastDragX = clientX;
      lastDragTime = Date.now();
      dragVelocity = 0;

      // Pause the auto-scrolling animation
      pauseAnimation();

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
      if (!isDragging || !logoTrack.value) return;

      // Prevent default to avoid scrolling the page
      if (e.cancelable) e.preventDefault();

      // Get the appropriate client X position (touch or mouse)
      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const deltaX = clientX - startX;

      // Update scroll position based on drag
      scrollPosition = startScrollPosition + deltaX;

      // Apply the transform
      logoTrack.value.style.transform = `translateX(${scrollPosition}px)`;

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

      // Remove event listeners
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('touchend', endDrag);

      // Apply momentum scrolling if velocity is significant
      if (Math.abs(dragVelocity) > 0.1) {
        applyMomentum();
      } else {
        // If no significant momentum, check if we need to reset position
        checkAndResetPosition();

        // Resume auto-scrolling after a short delay
        setTimeout(resumeAnimation, 1000);
      }
    };

    const applyMomentum = () => {
      // Apply momentum with decay
      const decayFactor = 0.95;

      const animateMomentum = () => {
        if (Math.abs(dragVelocity) < 0.05) {
          // Stop momentum when velocity becomes very small
          cancelAnimationFrame(momentumAnimationId);
          momentumAnimationId = null;

          // Check if we need to reset position
          checkAndResetPosition();

          // Resume auto-scrolling after momentum ends
          setTimeout(resumeAnimation, 1000);
          return;
        }

        // Update position based on velocity
        scrollPosition += dragVelocity * 16; // Assuming ~60fps (16ms)

        // Apply decay to velocity
        dragVelocity *= decayFactor;

        // Apply the transform
        if (logoTrack.value) {
          logoTrack.value.style.transform = `translateX(${scrollPosition}px)`;
        }

        // Continue momentum animation
        momentumAnimationId = requestAnimationFrame(animateMomentum);
      };

      // Start momentum animation
      momentumAnimationId = requestAnimationFrame(animateMomentum);
    };

    const checkAndResetPosition = () => {
      if (!logoTrack.value || !logoSetWidth) return;

      // If scrolled too far in either direction, reset to within bounds
      if (scrollPosition > 0) {
        // Scrolled too far right, reset to negative multiple of logoSetWidth
        const offset = Math.ceil(Math.abs(scrollPosition) / logoSetWidth) * logoSetWidth;
        scrollPosition = -offset;
        logoTrack.value.style.transform = `translateX(${scrollPosition}px)`;
      } else if (Math.abs(scrollPosition) > logoSetWidth * 2) {
        // Scrolled too far left, reset to within one or two sets
        const sets = Math.floor(Math.abs(scrollPosition) / logoSetWidth);
        const newSets = sets % 2;
        scrollPosition = -(newSets * logoSetWidth + (Math.abs(scrollPosition) % logoSetWidth));
        logoTrack.value.style.transform = `translateX(${scrollPosition}px)`;
      }
    };

    // Handle window resize
    const handleResize = () => {
      // Debounce the resize event
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      resizeTimeout = setTimeout(() => {
        console.log('Window resized, reconfiguring carousel');
        setupEndlessLoop();
      }, 200);
    };

    onMounted(() => {
      // Initialize after DOM is fully loaded
      setTimeout(() => {
        setupEndlessLoop();

        // Add event listeners for hover and drag
        if (clientLogosTrack.value) {
          // Hover events
          clientLogosTrack.value.addEventListener('mouseenter', pauseAnimation);
          clientLogosTrack.value.addEventListener('mouseleave', resumeAnimation);

          // Drag events
          clientLogosTrack.value.addEventListener('mousedown', startDrag);
          clientLogosTrack.value.addEventListener('touchstart', startDrag, { passive: true });

          // Add cursor styles
          clientLogosTrack.value.style.cursor = 'grab';
        }

        // Handle window resize
        window.addEventListener('resize', handleResize);
      }, 100);
    });

    onUnmounted(() => {
      // Clean up event listeners and animation
      stopAnimation();

      // Clean up any ongoing momentum animation
      if (momentumAnimationId) {
        cancelAnimationFrame(momentumAnimationId);
      }

      if (clientLogosTrack.value) {
        // Remove hover events
        clientLogosTrack.value.removeEventListener('mouseenter', pauseAnimation);
        clientLogosTrack.value.removeEventListener('mouseleave', resumeAnimation);

        // Remove drag events
        clientLogosTrack.value.removeEventListener('mousedown', startDrag);
        clientLogosTrack.value.removeEventListener('touchstart', startDrag);
      }

      // Remove any lingering document events
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('touchend', endDrag);

      window.removeEventListener('resize', handleResize);
    });

    // Portfolio carousel methods
    const prevPortfolioSlide = () => {
      if (isTransitioning) return;
      isTransitioning = true;

      // Fade out current slide first
      setTimeout(() => {
        // Then change the slide
        currentSlide.value = (currentSlide.value - 1 + totalSlides.value) % totalSlides.value;

        // Reset transition state after animation completes
        setTimeout(() => {
          isTransitioning = false;
        }, 800); // Match this with your CSS transition duration for opacity
      }, 300); // Half the fade-out time
    };

    const nextPortfolioSlide = () => {
      if (isTransitioning) return;
      isTransitioning = true;

      // Fade out current slide first
      setTimeout(() => {
        // Then change the slide
        currentSlide.value = (currentSlide.value + 1) % totalSlides.value;

        // Reset transition state after animation completes
        setTimeout(() => {
          isTransitioning = false;
        }, 800); // Match this with your CSS transition duration for opacity
      }, 300); // Half the fade-out time
    };

    const goToSlide = (index) => {
      if (isTransitioning || currentSlide.value === index) return;
      isTransitioning = true;

      // Fade out current slide first
      setTimeout(() => {
        // Then change the slide
        currentSlide.value = index;

        // Reset transition state after animation completes
        setTimeout(() => {
          isTransitioning = false;
        }, 800); // Match this with your CSS transition duration for opacity
      }, 300); // Half the fade-out time
    };

    // Portfolio touch/drag functionality
    const startPortfolioDrag = (event) => {
      if (isTransitioning) return;

      isPortfolioDragging = true;

      // Get the starting position (handle both mouse and touch events)
      const clientX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
      portfolioStartX = clientX;
      portfolioStartTranslate = currentSlide.value * -100; // In percentage
      portfolioCurrentTranslate = portfolioStartTranslate;

      // Add event listeners for drag and end drag events
      if (event.type.includes('mouse')) {
        document.addEventListener('mousemove', portfolioDrag);
        document.addEventListener('mouseup', endPortfolioDrag);
      } else {
        document.addEventListener('touchmove', portfolioDrag);
        document.addEventListener('touchend', endPortfolioDrag);
      }

      // Prevent default to avoid text selection during drag
      event.preventDefault();
    };

    const portfolioDrag = (event) => {
      if (!isPortfolioDragging) return;

      // Get current position
      const clientX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
      const deltaX = clientX - portfolioStartX;

      // Calculate how much to translate (as a percentage of carousel width)
      const carouselWidth = portfolioCarousel.value ? portfolioCarousel.value.offsetWidth : 1;
      const percentageDelta = (deltaX / carouselWidth) * 100;

      // Update current translate position
      portfolioCurrentTranslate = portfolioStartTranslate + percentageDelta;

      // Apply the translation (with limits to prevent excessive dragging)
      const minTranslate = -(totalSlides.value - 1) * 100;
      const maxTranslate = 0;
      const limitedTranslate = Math.max(Math.min(portfolioCurrentTranslate, maxTranslate), minTranslate);

      // Apply the transform
      if (portfolioTrack.value) {
        portfolioTrack.value.style.transform = `translateX(${limitedTranslate}%)`;
        portfolioTrack.value.style.transition = 'none';
      }
    };

    const endPortfolioDrag = () => {
      if (!isPortfolioDragging) return;
      isPortfolioDragging = false;

      // Remove event listeners
      document.removeEventListener('mousemove', portfolioDrag);
      document.removeEventListener('mouseup', endPortfolioDrag);
      document.removeEventListener('touchmove', portfolioDrag);
      document.removeEventListener('touchend', endPortfolioDrag);

      // Calculate the drag distance as a percentage
      const dragDistance = portfolioCurrentTranslate - portfolioStartTranslate;

      // Determine if we should change slides based on drag distance
      if (Math.abs(dragDistance) > (portfolioDragThreshold / portfolioCarousel.value.offsetWidth) * 100) {
        // If dragged far enough, move to next/previous slide
        if (dragDistance > 0) {
          prevPortfolioSlide();
        } else {
          nextPortfolioSlide();
        }
      } else {
        // If not dragged far enough, snap back to current slide
        if (portfolioTrack.value) {
          portfolioTrack.value.style.transform = `translateX(-${currentSlide.value * 100}%)`;
          portfolioTrack.value.style.transition = 'transform 0.3s ease-out';
        }
      }
    };

    // Initialize portfolio carousel
    onMounted(() => {
      // Add event listeners for portfolio carousel drag
      if (portfolioCarousel.value) {
        portfolioCarousel.value.addEventListener('mousedown', startPortfolioDrag);
        portfolioCarousel.value.addEventListener('touchstart', startPortfolioDrag);
      }
    });

    // Original portfolio navigation methods (for client logos)
    const prevSlide = () => {
      console.log('Previous slide');
      // Implement previous slide functionality
    };

    const nextSlide = () => {
      console.log('Next slide');
      // Implement next slide functionality
    };

    return {
      clientLogosTrack,
      logoTrack,
      portfolioCarousel,
      portfolioTrack,
      currentSlide,
      prevSlide,
      nextSlide,
      prevPortfolioSlide,
      nextPortfolioSlide,
      goToSlide
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.portfolio-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 6rem 0;
  overflow: hidden;
  background-color: #f2f2f2;

  .container {
  
    width: 100%;
    margin: 0 auto;
    padding: 0rem;
    position: relative;
  }
}

.portfolio-header {
  max-width: 950px;
  margin-bottom: 4rem;
  text-align: left;
}

.portfolio-titles {
  margin-bottom: 1.5rem;
}

.portfolio-subtitle {
  font-size: 2.2rem;
  font-family: $font-headline;
  font-weight: 300;
  color: #333;
  margin-bottom: 0.5rem;
  line-height: 1.1;
  letter-spacing: 0.02em;

  @media (max-width: $breakpoint-md) {
    font-size: 1.8rem;
  }
}

.portfolio-title {
  font-size: 2.8rem;
  font-family: $font-headline;
  font-weight: 700;
  color: #555;
  margin-bottom: 1rem;
  line-height: 1.1;

  @media (max-width: $breakpoint-md) {
    font-size: 2.2rem;
  }
}

.portfolio-description {
  font-size: 1.125rem;
  font-family: $font-primary;
  color: #555;
  line-height: 1.5;
  max-width: 800px;
}

/* Client logos styles moved to src/assets/scss/components/_portfolio-section.scss */

.portfolio-showcase {
  position: relative;
  width: 100%;
  padding: 2rem 0;
}

.portfolio-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
  }
}

.portfolio-device {
  
  position: relative;
  height: 600px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  .portfolio-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: $breakpoint-md) {
    flex: 0 0 100%;
    margin-bottom: 2rem;
    height: 300px;
  }
}

/* Navigation styles moved to HorizontalNavigation component */
</style>
