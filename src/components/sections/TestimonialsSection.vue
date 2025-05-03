<template>

  <section class="testimonials-section" id="testimonials" style="background-color: #595959;">
    <div class="testimonials-background">
      <img
        src="../../assets/images/testamonials.svg"
        alt="Testimonials Background"
        class="testimonials-background-image loading"
        loading="lazy"
        ref="backgroundImage"
        @load="handleImageLoaded"
      />
    </div>
    <div class="container">
      <div class="testimonials-header">
        <h2 class="testimonials-title">DAS SAGEN UNSERE</h2>
        <h2 class="testimonials-subtitle">ÜBERZEUGTEN KUNDEN</h2>
      </div>

      <div class="testimonials-carousel" ref="carousel" style="position: relative; overflow: hidden; width: 100%; max-width: 1200px; margin: 0 auto 4rem auto; display: flex; justify-content: center;">
        <div class="testimonials-carousel__wrapper" :style="{ transform: `translateX(-${currentSlide * 100}%)`, display: 'flex', transition: 'transform 0.5s ease', width: `${totalSlides * 100}%`, flexWrap: 'nowrap' }" ref="carouselWrapper">
          <!-- Testimonial 1 - Bridgestone -->
          <div class="testimonial-slide" style="flex: 0 0 100%; min-width: 100%; display: flex; flex-direction: column; align-items: center; width: 100%; padding: 0; box-sizing: border-box; flex-shrink: 0;">
            <div class="testimonial-content" style="width: 90%; max-width: 90%; margin-left: auto; margin-right: auto; padding: 1rem; margin-bottom: 2rem; box-sizing: border-box; text-align: left;">
              <p class="testimonial-text">
                „Unser langjähriger Agenturpartner TAKTZEIT versteht es, sich auf unsere vielfältigen Anforderungen agil einzustellen und sich mit uns kontinuierlich weiter-
                zuentwickeln. Das Agenturteam überzeugt durch sein herausragendes Servicelevel und verbindet zuverlässig kreative Ideen mit tatsächlicher Umsetzbarkeit.
                Die tiefgreifende Expertise von TAKTZEIT im Bereich Sales Activation und der kompetente Umgang mit unseren Marken erfüllen unsere hohen Ansprüche an
                einen modernen Kreativ-Dienstleister."
              </p>
              <p class="testimonial-author">Julia J. Köhnen | Head of Marketing, Central Europe | DACH & Nordics Bridgestone Europe NV/SA</p>
            </div>
            <div class="testimonial-logo-container" style="display: flex; justify-content: center; margin: 2rem auto; width: 90%; max-width: 90%; box-sizing: border-box;">
              <div class="testimonial-logo" style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 240px;">
                <img
                  src="../../assets/images/client-logos/bridgestone.svg"
                  alt="Bridgestone Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>

          <!-- Dr. Clauder Testimonial -->
          <div class="testimonial-slide" style="flex: 0 0 100%; min-width: 100%; display: flex; flex-direction: column; align-items: center; width: 100%; padding: 0; box-sizing: border-box; flex-shrink: 0;">
            <div class="testimonial-content" style="width: 90%; max-width: 90%; margin-left: auto; margin-right: auto; padding: 1rem; margin-bottom: 2rem; box-sizing: border-box; text-align: left;">
              <p class="testimonial-text">
                „TAKTZEIT steht bei uns für die Entwicklung von genialen und sinnvollen Design- Konzepten und dem guten und zielgruppengenauen Aufbau von B2B und B2C Strategien. Das vielseitige Know-how unterstützt uns digital, analog und strategisch enorm. Die schnelle und zuverlässige Bearbeitung unserer Ideen wird durch eine sehr enge und kollegiale Zusammenarbeit abgerundet.&nbsp;
              </p>
              <p>Mit TAKTZEIT haben wir eine Agentur gefunden, die mitdenkt und unsere Werbeaussagen emotional und empathisch visualisiert. Hier stehen die Wünsche der Kunden an erster Stelle, wir sagen Danke!“</p>
              <p class="testimonial-author">
                Anna Heuvens<br>
                Marketing Managerin<br>
                Dr.Clauder Solution for pets GmbH</p>
            </div>
            <div class="testimonial-logo-container" style="display: flex; justify-content: center; margin: 2rem auto; width: 90%; max-width: 90%; box-sizing: border-box;">
              <div class="testimonial-logo" style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 240px;">
                <img
                  src="../../assets/images/client-logos/drclauder.png"
                  alt="Dr. Clauder Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>

          <!-- Epson Testimonial -->
          <div class="testimonial-slide" style="flex: 0 0 100%; min-width: 100%; display: flex; flex-direction: column; align-items: center; width: 100%; padding: 0; box-sizing: border-box; flex-shrink: 0;">
            <div class="testimonial-content" style="width: 90%; max-width: 90%; margin-left: auto; margin-right: auto; padding: 1rem; margin-bottom: 2rem; box-sizing: border-box; text-align: left;">
              <p class="testimonial-text">
                „Als Technologieunternehmen möchten wir für unsere Fachhandelspartner mehr als nur ein weiterer Hardwarelieferant sein. Epson bietet Vertriebspartnern daher exklusiven Zugang zu Marketinginstrumenten und Expertise rund um Vertriebs- und Online bezogene Themen. Um diesen Zugang zu ermöglichen, haben wir intensiv nach einer Agentur mit Hands-on Mentalität und einem hohen Level an Know-how gesucht, die wir schließlich in TAKTZEIT gefunden haben. Die Ergebnisse der bisherigen Zusammenarbeit haben sowohl unsere als auch die Erwartungen der Fachhandelspartner übertroffen. TAKTZEIT denkt immer mit und arbeitet sich schnell und sicher in neue Themen und Marktbereiche ein. Darüber hinaus hat die Agentur besondere Stärken im Bereich Grafik und Design, die sie schon oft zielführend und gewinnbringend für uns eingesetzt haben.“
              </p>
              <p class="testimonial-author">
              Jörn Bon Ahlen<br>
              Head of Marketing DACH<br>
              Epson Deutschland GmbH</p>
            </div>
            <div class="testimonial-logo-container" style="display: flex; justify-content: center; margin: 2rem auto; width: 90%; max-width: 90%; box-sizing: border-box;">
              <div class="testimonial-logo" style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 240px;">
                <img
                  src="../../assets/images/client-logos/epson.png"
                  alt="Epson Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>

          <!-- Remy & Nauen Testimonial -->
          <div class="testimonial-slide" style="flex: 0 0 100%; min-width: 100%; display: flex; flex-direction: column; align-items: center; width: 100%; padding: 0; box-sizing: border-box; flex-shrink: 0;">
            <div class="testimonial-content" style="width: 90%; max-width: 90%; margin-left: auto; margin-right: auto; padding: 1rem; margin-bottom: 2rem; box-sizing: border-box; text-align: left;">
              <p class="testimonial-text">
                „TAKTZEIT begleitet uns mit seiner interdisziplinären Marketing- und Kommunikations-Expertise bereits seit vielen Jahren hochprofessionell in größeren und kleineren Projekten. So hat sich TAKTZEIT mit strategischem Weitblick um unseren umfassenden und medienübergreifenden Markenrelaunch gekümmert und setzt darauf aufbauend unsere analogen und digitalen Werbemaßnahmen um."
              </p>
              <p class="testimonial-author">
                Philipp Mehdorn<br>
                Geschäftsführer<br>
                REMY / NAUEN GmbH / Co. KG</p>
            </div>
            <div class="testimonial-logo-container" style="display: flex; justify-content: center; margin: 2rem auto; width: 90%; max-width: 90%; box-sizing: border-box;">
              <div class="testimonial-logo" style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 240px;">
                <img
                  src="../../assets/images/client-logos/remyundnauen.webp"
                  alt="Remy & Nauen Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>

          <!-- Hapert Testimonial -->
          <div class="testimonial-slide" style="flex: 0 0 100%; min-width: 100%; display: flex; flex-direction: column; align-items: center; width: 100%; padding: 0; box-sizing: border-box; flex-shrink: 0;">
            <div class="testimonial-content" style="width: 90%; max-width: 90%; margin-left: auto; margin-right: auto; padding: 1rem; margin-bottom: 2rem; box-sizing: border-box; text-align: left;">
              <p class="testimonial-text">
                „TAKTZEIT denkt immer mit und trägt dadurch bei wichtigen Entscheidungen oder Projekten zu optimalen Lösungen bei. Die Agentur hält sich stets an Vereinbarungen und die Kommunikation läuft reibungslos! Kurz gesagt, eine sehr angenehme Agentur, mit der man gut zusammenarbeiten kann."
              </p>
              <p class="testimonial-author">
                Malou Kokken<br>
                Marketing Managerin<br>
                WAGENBOUW HAPERT B.V./HAPERT Anhänger</p>
            </div>
            <div class="testimonial-logo-container" style="display: flex; justify-content: center; margin: 2rem auto; width: 90%; max-width: 90%; box-sizing: border-box;">
              <div class="testimonial-logo" style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 240px;">
                <img
                  src="../../assets/images/client-logos/hapert.png"
                  alt="Hapert Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>

          <!-- Sofidel/Regina Testimonial -->
          <div class="testimonial-slide" style="flex: 0 0 100%; min-width: 100%; display: flex; flex-direction: column; align-items: center; width: 100%; padding: 0; box-sizing: border-box; flex-shrink: 0;">
            <div class="testimonial-content" style="width: 90%; max-width: 90%; margin-left: auto; margin-right: auto; padding: 1rem; margin-bottom: 2rem; box-sizing: border-box; text-align: left;">
              <p class="testimonial-text">
                „Die Zusammenarbeit mit TAKTZEIT zeichnet sich durch ein hohes Maß an Professionalität, Kreativität und Zuverlässigkeit aus. Das Team hat es geschafft, unsere Marke Regina im hart umkämpften Konsumgütermarkt erfolgreich zu positionieren und durch innovative Kampagnen die Kundenbindung zu stärken. Besonders beeindruckt hat uns die Fähigkeit, schnell auf Marktveränderungen zu reagieren und flexible Lösungen anzubieten, die unsere Verkaufszahlen nachweislich gesteigert haben."
              </p>
              <p class="testimonial-author">
                Brand Manager<br>
                Sofidel Group</p>
            </div>
            <div class="testimonial-logo-container" style="display: flex; justify-content: center; margin: 2rem auto; width: 90%; max-width: 90%; box-sizing: border-box;">
              <div class="testimonial-logo" style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 240px;">
                <img
                  src="../../assets/images/client-logos/sofidel.webp"
                  alt="Regina Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>

          <!-- Bechem Testimonial -->
          <div class="testimonial-slide" style="flex: 0 0 100%; min-width: 100%; display: flex; flex-direction: column; align-items: center; width: 100%; padding: 0; box-sizing: border-box; flex-shrink: 0;">
            <div class="testimonial-content" style="width: 90%; max-width: 90%; margin-left: auto; margin-right: auto; padding: 1rem; margin-bottom: 2rem; box-sizing: border-box; text-align: left;">
              <p class="testimonial-text">
                „Wir schätzen an unserem langjährigen Agenturpartner TAKTZEIT die konstant hochwertige und zuverlässige Zusammenarbeit wie auch die Bereitschaft und den Willen, gemeinsam mit uns neue Wege zu gehen."
              </p>
              <p class="testimonial-author">
                Leiter Marketing<br>
                Carl Bechem GmbH</p>
            </div>
            <div class="testimonial-logo-container" style="display: flex; justify-content: center; margin: 2rem auto; width: 90%; max-width: 90%; box-sizing: border-box;">
              <div class="testimonial-logo" style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 240px;">
                <img
                  src="../../assets/images/client-logos/bechem.png"
                  alt="Bechem Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>

          <!-- Evonik Testimonial -->
          <div class="testimonial-slide" style="flex: 0 0 100%; min-width: 100%; display: flex; flex-direction: column; align-items: center; width: 100%; padding: 0; box-sizing: border-box; flex-shrink: 0;">
            <div class="testimonial-content" style="width: 90%; max-width: 90%; margin-left: auto; margin-right: auto; padding: 1rem; margin-bottom: 2rem; box-sizing: border-box; text-align: left;">
              <p class="testimonial-text">
                „TAKTZEIT unterstützt uns seit 10 Jahren als zuverlässiger Agenturpartner u. a. in den Bereichen Markenaufbau, Packaging Design und B2B Kommunikation im internationalen Kontext. Die konstant hohe Qualität der Ergebnisse und die Treffsicherheit der Art Works schätzen wir ebenso wie das ausgeprägte Verständnis für unsere Vertriebskanäle und die Fähigkeit, komplexe Zusammenhänge klar auf den Punkt zu bringen. Das Team überzeugt mit einem sehr hohen Serviceanspruch und einer stets sehr angenehmen und professionellen Zusammenarbeit."
              </p>
              <p class="testimonial-author">
              Head of Marketing Communications<br>
              Evonik Industries AG</p>
            </div>
            <div class="testimonial-logo-container" style="display: flex; justify-content: center; margin: 2rem auto; width: 90%; max-width: 90%; box-sizing: border-box;">
              <div class="testimonial-logo" style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 240px;">
                <img
                  src="../../assets/images/client-logos/evonik.png"
                  alt="Evonik Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <div class="navigation-container" aria-label="Testimonial Navigation" style="width: 100%; display: flex; flex-direction: column; align-items: center; margin-top: 2rem; position: relative; z-index: 10; max-width: 1200px; margin-left: auto; margin-right: auto;">
        <HorizontalNavigation @prev="prevSlide" @next="nextSlide" />
        <div class="testimonials-indicators" style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">
          <span
            v-for="(_, index) in totalSlides"
            :key="index"
            :class="['testimonials-indicator', { active: currentSlide === index }]"
            style="width: 12px; height: 12px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.3); cursor: pointer; transition: all 0.3s ease;"
            :style="currentSlide === index ? 'background-color: white; transform: scale(1.2);' : ''"
            @click="goToSlide(index)"
            :aria-label="`Go to slide ${index + 1}`"
            role="button"
            tabindex="0"
          ></span>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { HorizontalNavigation } from './../base';
import { LazyImage } from './../ui';

export default {
  name: 'TestimonialsSection',
  components: {
    HorizontalNavigation,
    LazyImage
  },
  data() {
    return {
      currentSlide: 0,
      totalSlides: 8, // Updated to match the number of testimonials
      touchStartX: 0,
      touchEndX: 0,
      isAnimating: false,
      autoplayInterval: null,
      autoplayDelay: 5000 // 5 seconds between slides
    }
  },
  mounted() {
    // Count the actual number of slides
    this.$nextTick(() => {
      const slides = this.$el.querySelectorAll('.testimonial-slide');
      this.totalSlides = slides.length;
      console.log(`Found ${this.totalSlides} testimonial slides`);

      // Add touch event listeners for mobile swipe
      if (this.$refs.carousel) {
        this.$refs.carousel.addEventListener('touchstart', this.handleTouchStart, { passive: true });
        this.$refs.carousel.addEventListener('touchend', this.handleTouchEnd, { passive: true });
      }

      // Add keyboard navigation
      window.addEventListener('keydown', this.handleKeyDown);

      // Start autoplay
      this.startAutoplay();

      // Pause autoplay on hover
      if (this.$refs.carousel) {
        this.$refs.carousel.addEventListener('mouseenter', this.stopAutoplay);
        this.$refs.carousel.addEventListener('mouseleave', this.startAutoplay);
      }
    });
  },
  beforeUnmount() {
    // Clean up event listeners
    if (this.$refs.carousel) {
      this.$refs.carousel.removeEventListener('touchstart', this.handleTouchStart);
      this.$refs.carousel.removeEventListener('touchend', this.handleTouchEnd);
      this.$refs.carousel.removeEventListener('mouseenter', this.stopAutoplay);
      this.$refs.carousel.removeEventListener('mouseleave', this.startAutoplay);
    }
    window.removeEventListener('keydown', this.handleKeyDown);

    // Clear autoplay interval
    this.stopAutoplay();
  },
  methods: {
    // Debounce function to prevent rapid clicking
    debounce(func, wait) {
      let timeout;
      return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
      };
    },
    nextSlide() {
      if (this.isAnimating) return;
      this.isAnimating = true;

      // Stop autoplay temporarily
      this.stopAutoplay();

      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      console.log(`Moving to slide ${this.currentSlide + 1} of ${this.totalSlides}`);

      // Reset animation flag after transition completes
      setTimeout(() => {
        this.isAnimating = false;

        // Restart autoplay after a delay
        setTimeout(() => {
          this.startAutoplay();
        }, 2000);
      }, 500); // Match the transition duration in CSS
    },
    prevSlide() {
      if (this.isAnimating) return;
      this.isAnimating = true;

      // Stop autoplay temporarily
      this.stopAutoplay();

      this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
      console.log(`Moving to slide ${this.currentSlide + 1} of ${this.totalSlides}`);

      // Reset animation flag after transition completes
      setTimeout(() => {
        this.isAnimating = false;

        // Restart autoplay after a delay
        setTimeout(() => {
          this.startAutoplay();
        }, 2000);
      }, 500); // Match the transition duration in CSS
    },
    handleTouchStart(e) {
      // Stop autoplay when user starts touching
      this.stopAutoplay();
      this.touchStartX = e.changedTouches[0].screenX;
    },
    handleTouchEnd(e) {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    },
    handleSwipe() {
      const swipeThreshold = 50; // Minimum distance to register as a swipe
      const swipeDistance = this.touchEndX - this.touchStartX;

      if (swipeDistance > swipeThreshold) {
        // Swiped right, go to previous slide
        this.prevSlide();
      } else if (swipeDistance < -swipeThreshold) {
        // Swiped left, go to next slide
        this.nextSlide();
      } else {
        // If no swipe was detected, restart autoplay
        setTimeout(() => {
          this.startAutoplay();
        }, 1000);
      }
    },
    handleKeyDown(e) {
      // Add keyboard navigation
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
      }
    },
    goToSlide(index) {
      if (this.isAnimating) return;
      this.isAnimating = true;

      // Stop autoplay temporarily
      this.stopAutoplay();

      // Go to the selected slide
      this.currentSlide = index;

      // Reset animation flag after transition completes
      setTimeout(() => {
        this.isAnimating = false;

        // Restart autoplay after a delay
        setTimeout(() => {
          this.startAutoplay();
        }, 2000);
      }, 500);
    },
    startAutoplay() {
      // Clear any existing interval
      this.stopAutoplay();

      // Start a new interval
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, this.autoplayDelay);
    },
    stopAutoplay() {
      // Clear the interval
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null;
      }
    },
    handleImageLoaded() {
      // When the image is loaded, remove the loading class and add the loaded class
      if (this.$refs.backgroundImage) {
        this.$refs.backgroundImage.classList.remove('loading');
        this.$refs.backgroundImage.classList.add('loaded');
      }
    }
  }
}
</script>

