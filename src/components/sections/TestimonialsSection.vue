<template>

  <section class="testimonials-section">
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

      <div class="testimonials-carousel">
        <div class="testimonials-carousel__wrapper" :style="{ '--slide-offset': `-${currentSlide * 12.5}%` }">
          <!-- Testimonial 1 -->
          <div class="testimonial-slide">
            <div class="testimonial-content">
              <p class="testimonial-text">
                „Unser langjähriger Agenturpartner TAKTZEIT versteht es, sich auf unsere vielfältigen Anforderungen agil einzustellen und sich mit uns kontinuierlich weiter-
                zuentwickeln. Das Agenturteam überzeugt durch sein herausragendes Servicelevel und verbindet zuverlässig kreative Ideen mit tatsächlicher Umsetzbarkeit.
                Die tiefgreifende Expertise von TAKTZEIT im Bereich Sales Activation und der kompetente Umgang mit unseren Marken erfüllen unsere hohen Ansprüche an
                einen modernen Kreativ-Dienstleister."
              </p>
              <p class="testimonial-author">Julia J. Köhnen | Head of Marketing, Central Europe | DACH & Nordics Bridgestone Europe NV/SA</p>
            </div>
            <div class="testimonial-logo-container">
              <div class="testimonial-logo">
                <img
                  src="../../assets/images/client-logos/bridgestone.svg"
                  alt="Bridgestone Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>

          <!-- Add more testimonials as needed -->
          <div class="testimonial-slide">
            <div class="testimonial-content">
              <p class="testimonial-text">
                „TAKTZEIT steht bei uns für die Entwicklung von genialen und sinnvollen Design- Konzepten und dem guten und zielgruppengenauen Aufbau von B2B und B2C Strategien. Das vielseitige Know-how unterstützt uns digital, analog und strategisch enorm. Die schnelle und zuverlässige Bearbeitung unserer Ideen wird durch eine sehr enge und kollegiale Zusammenarbeit abgerundet.
              </p>
              <p>
                Mit TAKTZEIT haben wir eine Agentur gefunden, die mitdenkt und unsere Werbeaussagen emotional und empathisch visualisiert. Hier stehen die Wünsche der Kunden an erster Stelle, wir sagen Danke!“
              </p>
              <p class="testimonial-author">Michael Schmidt | Marketing Director | Beispiel GmbH</p>

            </div>
            <div class="testimonial-logo-container">
              <div class="testimonial-logo">
                <img
                  src="../../assets/images/client-logos/bridgestone.svg"
                  alt="Bridgestone Logo"
                  width="100%"
                  height="auto"
                />
                </div>
                </div>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <div class="navigation-container">
        <HorizontalNavigation @prev="prevSlide" @next="nextSlide" />
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
      totalSlides: 8 // Updated to match the number of testimonials
    }
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
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


