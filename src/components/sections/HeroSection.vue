<template>
  <section class="hero">
    <div class="hero__background"></div>
    <div class="hero__container">
      <div class="hero__content">
        <div class="hero__column hero__column--left">
          <div class="hero__title font-critical" ref="heroTitle">
            <div class="hero__title-overlay">
              <img src="../../assets/images/hero.svg" alt="WEMOVESALES" class="hero__title-image hero__title-image--base" />
              <img src="../../assets/images/wemovesales_in.png" alt="WEMOVESALES IN" class="hero__title-image hero__title-image--overlay" />
            </div>
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
          <div class="hero__text font-important" ref="heroText">
            <p>
              Sales Activation – Wir aktivieren Absatz. Seit mehr als 15 Jahren stehen wir unseren Kunden mit Herz und Verstand zur Seite. Wir sind über 20 Expert:innen mit einem tiefgreifenden Know-how im Absatzmarketing und bringen Kundenprojekte mit Gespür und höchstem Engagement zum Erfolg. Aus Düsseldorf – für Deutschland, DACH oder ganz Europa.
            </p>
            <div class="hero__cta" ref="heroCta">
              <a href="#contact" class="hero__button" @click.prevent="scrollToContact">Kontakt</a>
              <a href="#portfolio" class="hero__button hero__button--outline" @click.prevent="scrollToPortfolioSection">Portfolio</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hero__scroll-indicator" @click="scrollToNextSection">
      <div class="hero__scroll-indicator-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </div>
      <div class="hero__scroll-indicator-text">Scroll</div>
    </div>

    <div class="hero__video-modal" :class="{ 'is-open': isVideoModalOpen }">
      <div class="hero__video-modal-content">
        <button class="hero__video-modal-close" @click="closeVideoModal">×</button>
        <video
          v-if="isVideoModalOpen"
          class="hero__video-modal-video"
          controls
          autoplay
        >
          <source :src="videoSrc" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useNavigation } from '../../composables/useNavigation';
import { useGsap } from '../../composables/useGsap';
import videoFile from '../../assets/images/230926a_TZ23_reel_De.mp4';

export default {
  name: 'HeroSection',
  setup() {
    const isVideoModalOpen = ref(false);
    const videoSrc = videoFile; // Using the imported video file
    const heroTitle = ref(null);
    const heroText = ref(null);
    const heroCta = ref(null);

    const { navigateToHomeSection } = useNavigation();
    const { createTimeline } = useGsap();

    // Initialize animations when component is mounted
    onMounted(() => {
      // Create a timeline for the hero section animations
      const tl = createTimeline({
        defaults: { duration: 0.8, ease: 'power3.out' }
      });

      // Add animations to the timeline
      tl.from(heroTitle.value, { y: 50, opacity: 0 })
        .from(heroText.value, { y: 30, opacity: 0 }, '-=0.4')
        .from(heroCta.value, { y: 20, opacity: 0 }, '-=0.2');
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
      heroCta
    };
  }
}
</script>

<style lang="scss" scoped>
/* Styles moved to src/assets/scss/components/_hero-section.scss */
</style>
