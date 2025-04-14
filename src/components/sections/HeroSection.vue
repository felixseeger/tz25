<template>
  <section class="hero">
    <div class="hero__background"></div>
    <div class="hero__container">
      <!-- Hero Carousel -->
      <div class="hero__carousel">
        <div class="hero__carousel-track">
          <!-- Slide 1 (Original Content) -->
          <div class="hero__slide" :class="{
            'active': currentSlide === 0,
            'prev': currentSlide === 1,
            'next': currentSlide === 2
          }">
            <div class="hero__content">
              <div class="hero__column hero__column--left">
                <div class="hero__title-overlay">
                  <img src="../../assets/images/hero.png" alt="WEMOVESALES" class="hero__title-image hero__title-image--base" />
                </div>
              </div>
              <div class="hero__column hero__column--right">
                <div class="hero__video">
                  <div class="hero__video-container" @click="openVideoModal" role="button" tabindex="0" @keydown.enter="openVideoModal" @keydown.space="openVideoModal">
                    <h2 class="hero__video-title">PLAY<span>FULLY</span></h2>
                    <div class="hero__play-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="hero__text" ref="heroText">
                  <p>
                    Sales Activation – Wir aktivieren Absatz. Seit mehr als 15 Jahren stehen wir unseren Kunden mit Herz und Verstand zur Seite. Wir sind über 20 Expert:innen mit einem tiefgreifenden Know-how im Absatzmarketing und bringen Kundenprojekte mit Gespür und höchstem Engagement zum Erfolg. Aus Düsseldorf – für Deutschland, DACH oder ganz Europa.
                  </p>
                  <div class="hero__cart-wrapper">
                    <img src="/src/assets/images/cart.svg" alt="Shopping Cart" class="hero__cart-icon">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Slide 2 (New Content) -->
          <div class="hero__slide" :class="{
            'active': currentSlide === 1,
            'prev': currentSlide === 2,
            'next': currentSlide === 0
          }">
            <div class="hero__content">
              <div class="hero__column hero__column--left">
                <div class="hero__title-overlay">
                  <h1 class="hero__slide-title">INNOVATIVE<br><span>SOLUTIONS</span></h1>
                </div>
              </div>
              <div class="hero__column hero__column--right">
                <div class="hero__text">
                  <p>
                    Unsere innovativen Lösungen verbinden kreative Konzepte mit technischer Exzellenz. Wir entwickeln maßgeschneiderte Strategien, die Ihre Marke stärken und Ihren Absatz steigern. Mit unserem ganzheitlichen Ansatz begleiten wir Sie von der ersten Idee bis zur erfolgreichen Umsetzung.
                  </p>
                  <div class="hero__cta">
                    <a href="#services" class="hero__button" @click.prevent="scrollToServices">Unsere Services</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Slide 3 (New Content) -->
          <div class="hero__slide" :class="{
            'active': currentSlide === 2,
            'prev': currentSlide === 0,
            'next': currentSlide === 1
          }">
            <div class="hero__content">
              <div class="hero__column hero__column--left">
                <div class="hero__title-overlay">
                  <h1 class="hero__slide-title">EXPERT<br><span>TEAM</span></h1>
                </div>
              </div>
              <div class="hero__column hero__column--right">
                <div class="hero__text">
                  <p>
                    Unser Team aus erfahrenen Experten bringt jahrelange Branchenerfahrung und frische Perspektiven zusammen. Wir verstehen die Herausforderungen des modernen Marketings und entwickeln Lösungen, die Ihre Zielgruppe begeistern und messbare Ergebnisse liefern.
                  </p>
                  <div class="hero__cta">
                    <a href="#team" class="hero__button" @click.prevent="scrollToTeam">Unser Team</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Navigation -->
        <div class="hero__carousel-nav">
          <button
            v-for="index in 3"
            :key="index"
            class="hero__carousel-dot"
            :class="{ 'active': currentSlide === index - 1 }"
            @click="setSlide(index - 1)"
            :aria-label="`Go to slide ${index}`"
          ></button>
        </div>

        <!-- Carousel Arrows -->
        <button class="hero__carousel-arrow hero__carousel-arrow--prev" @click="prevSlide" aria-label="Previous slide">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button class="hero__carousel-arrow hero__carousel-arrow--next" @click="nextSlide" aria-label="Next slide">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>
      <!-- Hero Scroll Indicator - Visible only in hero section -->
      <div class="hero__scroll-indicator" :class="{ 'is-hidden': !showHeroScrollIndicator }" @click="scrollToNextSection">
        <div class="hero__scroll-indicator-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </div>
        <div class="hero__scroll-indicator-text">Scroll</div>
      </div>
    </div>

    <!-- Use the VideoModal component instead of custom implementation -->
    <VideoModal
      :is-open="isVideoModalOpen"
      :video-src="videoSrc"
      @close="closeVideoModal"
    />
  </section>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useNavigation } from '../../composables/useNavigation';
import { useGsap } from '../../composables/useGsap';
import { VideoModal } from '../ui';
// Use a placeholder for the video file since it doesn't exist
const videoFile = '';

export default {
  name: 'HeroSection',
  components: {
    VideoModal
  },
  setup() {
    const isVideoModalOpen = ref(false);
    const videoSrc = videoFile; // Using the imported video file
    const heroTitle = ref(null);
    const heroText = ref(null);
    const heroCta = ref(null);
    // Mobile CTA is commented out in the template
    const heroCtaMobile = ref(null);

    // Carousel state
    const currentSlide = ref(0);
    const autoplayInterval = ref(null);
    const autoplayDelay = 5000; // 5 seconds between slides

    // Track visibility of hero scroll indicator
    const showHeroScrollIndicator = ref(true);
    // Flag to track if user has scrolled past threshold
    const hasScrolledPastThreshold = ref(false);

    const { navigateToHomeSection } = useNavigation();
    const { createTimeline } = useGsap();

    // Initialize animations when component is mounted
    // Function to check if user has scrolled out of hero section
    const checkHeroVisibility = () => {
      const heroSection = document.querySelector('.hero');
      if (!heroSection) return;

      const heroRect = heroSection.getBoundingClientRect();
      const heroHeight = heroRect.height;
      const scrollPosition = window.scrollY;

      // Check if user has scrolled past threshold (30% of hero height)
      if (scrollPosition >= (heroHeight * 0.3)) {
        // Once scrolled past threshold, permanently hide the indicator
        hasScrolledPastThreshold.value = true;
        showHeroScrollIndicator.value = false;
      } else if (!hasScrolledPastThreshold.value) {
        // Only show indicator if user hasn't scrolled past threshold before
        showHeroScrollIndicator.value = true;
      }
    };

    onMounted(() => {
      // Ensure text and buttons are visible immediately
      if (heroText.value) {
        heroText.value.style.opacity = '1';
        heroText.value.style.visibility = 'visible';
        heroText.value.style.display = 'block';
      }

      if (heroCta.value) {
        heroCta.value.style.opacity = '1';
        heroCta.value.style.visibility = 'visible';
        heroCta.value.style.display = 'flex';
      }

      if (heroCtaMobile.value) {
        heroCtaMobile.value.style.opacity = '1';
        heroCtaMobile.value.style.visibility = 'visible';
        heroCtaMobile.value.style.display = 'flex';
      }

      // Create a timeline for the hero section animations
      const tl = createTimeline({
        defaults: { duration: 0.8, ease: 'power3.out' }
      });

      // Add animations to the timeline - but start with opacity 1
      // Only animate elements that exist
      if (heroTitle.value) {
        tl.from(heroTitle.value, { y: 50, opacity: 1 });
      }

      if (heroText.value) {
        tl.from(heroText.value, { y: 30, opacity: 1 }, '-=0.4');
      }

      if (heroCta.value) {
        tl.from(heroCta.value, { y: 20, opacity: 1 }, '-=0.2');
      }

      if (heroCtaMobile.value) {
        tl.from(heroCtaMobile.value, { y: 20, opacity: 1 }, '-=0.2');
      }

      // Start carousel autoplay
      startAutoplay();

      // Add scroll event listener to check hero visibility
      window.addEventListener('scroll', checkHeroVisibility);
      // Check initial visibility
      checkHeroVisibility();
    });

    // Clean up event listener when component is unmounted
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', checkHeroVisibility);
    });

    const scrollToContact = () => {
      console.log('Scrolling to contact section');
      navigateToHomeSection('contact', { scrollDelay: 500 });
    };

    const scrollToPortfolioSection = () => {
      console.log('Scrolling to portfolio section');
      navigateToHomeSection('portfolio', { scrollDelay: 500 });
    };

    const scrollToNextSection = () => {
      console.log('Scrolling to journey section');
      navigateToHomeSection('journey', { scrollDelay: 300 });
    };

    const openVideoModal = () => {
      console.log('Opening video modal');
      isVideoModalOpen.value = true;
    };

    const closeVideoModal = () => {
      console.log('Closing video modal');
      isVideoModalOpen.value = false;
    };

    // Carousel functions
    const nextSlide = () => {
      console.log('Next slide clicked, current slide:', currentSlide.value);
      currentSlide.value = (currentSlide.value + 1) % 3; // 3 slides total
      console.log('New slide index:', currentSlide.value);
      resetAutoplay();
    };

    const prevSlide = () => {
      console.log('Previous slide clicked, current slide:', currentSlide.value);
      currentSlide.value = (currentSlide.value - 1 + 3) % 3; // 3 slides total
      console.log('New slide index:', currentSlide.value);
      resetAutoplay();
    };

    const setSlide = (index) => {
      console.log('Dot clicked, setting slide to:', index);
      currentSlide.value = index;
      resetAutoplay();
    };

    const startAutoplay = () => {
      // Clear any existing interval
      if (autoplayInterval.value) {
        clearInterval(autoplayInterval.value);
      }

      // Set up autoplay
      autoplayInterval.value = setInterval(() => {
        nextSlide();
      }, autoplayDelay);
    };

    const resetAutoplay = () => {
      // Reset the autoplay timer when user interacts with carousel
      if (autoplayInterval.value) {
        clearInterval(autoplayInterval.value);
        startAutoplay();
      }
    };

    const scrollToServices = () => {
      navigateToHomeSection('services', { scrollDelay: 500 });
    };

    const scrollToTeam = () => {
      navigateToHomeSection('team', { scrollDelay: 500 });
    };

    // Note: Autoplay is started in the main onMounted function

    // Clean up interval when component is unmounted
    onBeforeUnmount(() => {
      if (autoplayInterval.value) {
        clearInterval(autoplayInterval.value);
      }
    });

    return {
      scrollToContact,
      scrollToPortfolioSection,
      scrollToNextSection,
      scrollToServices,
      scrollToTeam,
      isVideoModalOpen,
      videoSrc,
      openVideoModal,
      closeVideoModal,
      heroTitle,
      heroText,
      heroCta,
      heroCtaMobile,
      showHeroScrollIndicator,
      hasScrolledPastThreshold,
      // Carousel props
      currentSlide,
      nextSlide,
      prevSlide,
      setSlide
    };
  }
}
</script>

<style lang="scss" scoped>
/* Styles moved to src/assets/scss/components/_hero-section.scss */
</style>
