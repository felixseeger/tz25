<template>
  <section class="hero">
    <div class="hero__background"></div>
    <div class="hero__container">
      <div class="hero__content">
        <div class="hero__column hero__column--left">
          <!-- <div class="hero__title" ref="heroTitle">
            <span style="font-family: 'Greycliff CF', 'Arial Black', 'Helvetica Neue', Arial, sans-serif; color: #c02020; font-size:10rem;font-weight: 100; line-height:1em; text-align: center;">WE</span><span style="font-weight: 900; font-size:10rem;color: #c02020; text-align: center;">MO</span><br>
              <span style="font-family: 'Greycliff CF', 'Arial Black', 'Helvetica Neue', Arial, sans-serif; color: #c02020; font-size:10rem;font-weight: 100; line-height:1em; text-align: center;">VE</span><br><span style="font-family: 'Greycliff CF', 'Arial Black', 'Helvetica Neue', Arial, sans-serif; line-height:1em; color: #c02020; font-size:10rem;font-weight: 100; text-align: center;">SALES</span>
          </div> -->
          <div class="hero__title-overlay" >
            <img src="../../assets/images/hero.png" alt="WEMOVESALES" class="hero__title-image hero__title-image--base"  />
            <!-- <img src="../../assets/images/wemovesales_in.png" alt="WEMOVESALES IN" class="hero__title-image hero__title-image--overlay"  /> -->
          </div>
          <!-- CTA buttons for mobile - will be positioned via CSS -->
          <!-- <div class="hero__cta hero__cta--mobile" ref="heroCtaMobile">
            <a href="#contact" class="hero__button" @click.prevent="scrollToContact">Kontakt</a>
            <a href="#portfolio" class="hero__button hero__button--outline" @click.prevent="scrollToPortfolioSection">Portfolio</a>
          </div> -->
        </div>
        <div class="hero__column hero__column--right">
          <div class="hero__video" style="display: block !important; visibility: visible !important; opacity: 1 !important; position: relative; z-index: 50;">
            <div class="hero__video-container" @click="openVideoModal" role="button" tabindex="0" @keydown.enter="openVideoModal" @keydown.space="openVideoModal" style="display: flex !important; visibility: visible !important; opacity: 1 !important; position: relative; z-index: 50;">
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
            <!-- <div class="hero__cta" ref="heroCta">
              <a href="#contact" class="hero__button" @click.prevent="scrollToContact">Kontakt</a>
              <a href="#portfolio" class="hero__button hero__button--outline" @click.prevent="scrollToPortfolioSection">Portfolio</a>
            </div> -->
          </div>
        </div>
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
// Video file is missing, using a placeholder
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

    return {
      scrollToContact,
      scrollToPortfolioSection,
      scrollToNextSection,
      isVideoModalOpen,
      videoSrc,
      openVideoModal,
      closeVideoModal,
      heroTitle,
      heroText,
      heroCta,
      heroCtaMobile,
      showHeroScrollIndicator,
      hasScrolledPastThreshold
    };
  }
}
</script>

<style lang="scss" scoped>
/* Styles moved to src/assets/scss/components/_hero-section.scss */

/* Hero Scroll Indicator Styles */
.hero__scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  opacity: 1;
  visibility: visible;
  animation: fadeIn 1s ease-in-out 1s forwards;
  transition: opacity 0.5s ease, visibility 0.5s ease, transform 0.5s ease;

  &.is-hidden {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-50%) translateY(20px);
  }

  &-icon {
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

  &-text {
    color: white;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }

  &:hover {
    .hero__scroll-indicator-text {
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Media queries for responsive design */
@media (max-width: 768px) {
  .hero__scroll-indicator {
    bottom: 30px;

    &-icon {
      width: 36px;
      height: 36px;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    &-text {
      font-size: 0.7rem;
    }
  }
}

@media (max-width: 576px) {
  .hero__scroll-indicator {
    bottom: 20px;

    &-icon {
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
