<template>
  <section class="testimonials-section">
    <div class="testimonials-background"></div>
    <div class="container">
      <div class="testimonials-header">
        <h2 class="testimonials-title">DAS SAGEN UNSERE</h2>
        <h1 class="testimonials-subtitle">ÜBERZEUGTEN KUNDEN</h1>
      </div>

      <div class="testimonials-carousel">
        <div class="testimonials-carousel__wrapper" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
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
                <img src="../../assets/images/bridgestone-logo.svg" alt="Bridgestone Logo">
              </div>
            </div>
          </div>

          <!-- Add more testimonials as needed -->
          <div class="testimonial-slide">
            <div class="testimonial-content">
              <p class="testimonial-text">
                „Unser langjähriger Agenturpartner TAKTZEIT versteht es, sich auf unsere vielfältigen Anforderungen agil einzustellen und sich mit uns kontinuierlich weiter-
                zuentwickeln. Das Agenturteam überzeugt durch sein herausragendes Servicelevel und verbindet zuverlässig kreative Ideen mit tatsächlicher Umsetzbarkeit.
                Die tiefgreifende Expertise von TAKTZEIT im Bereich Sales Activation und der kompetente Umgang mit unseren Marken erfüllen unsere hohen Ansprüche an
                einen modernen Kreativ-Dienstleister."
              </p>
              <p class="testimonial-author">Michael Schmidt | Marketing Director | Beispiel GmbH</p>

            </div>
            <div class="testimonial-logo-container">
              <div class="testimonial-logo">
                <img src="../../assets/images/bridgestone-logo.svg" alt="Bridgestone Logo">
                </div>
                </div>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <HorizontalNavigation @prev="prevSlide" @next="nextSlide" />
    </div>

  </section>
</template>

<script>
import { HorizontalNavigation } from './../base';

export default {
  name: 'TestimonialsSection',
  components: {
    HorizontalNavigation
  },
  data() {
    return {
      currentSlide: 0,
      totalSlides: 2 // Update this based on the number of testimonials
    }
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.testimonials-section {
  position: relative;
  padding: 6rem 0;
  color: $text-color;
  overflow: visible; /* Changed from hidden to visible to ensure navigation is visible */
  min-height: 100vh;
  display: flex;
  align-items: center;
  width: 100vw;
  max-width: 100vw;

  .container {
    max-width: 1920px;
    width: 100%;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 2;
    display: flex; /* Added flex display */
    flex-direction: column; /* Stack children vertically */
    align-items: center; /* Center children horizontally */

  }
}

.testimonials-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #444444;
  background-image: url('../assets/images/testamonials.svg');
  background-size: cover;
  background-position: vertical center;
  background-repeat: no-repeat;
  opacity: 1; /* Adjust opacity to ensure text is readable */
  z-index: 1;
}

.testimonials-header {
  margin-bottom: 4rem;
  max-width: 800px;
}

.testimonials-title {
  font-size: 2rem;
  font-family: $font-headline;
  font-weight: 300;
  text-align: left;
  margin-bottom: 0.5rem;
  color: $text-color;

  @media (max-width: $breakpoint-md) {
    font-size: 1.5rem;
  }
}

.testimonials-subtitle {
  font-size: 3rem;
  font-family: $font-headline;
  font-weight: 700;
  margin-bottom: 0;
  color: $text-color;
  text-align: left;

  @media (max-width: $breakpoint-md) {
    font-size: 2rem;
  }
}

.testimonials-carousel {
  position: relative;
  overflow: hidden;
  margin-bottom: 6rem; /* Increased from 2rem to 6rem to make room for navigation */
  width: 100%; /* Ensure it takes full width */
  max-width: 1200px; /* Limit maximum width for better readability */


  &__wrapper {
    display: flex;
    transition: transform 0.5s ease;
    width: 100%;
  }
}

.testimonial-slide {
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
}

.testimonial-content {
  max-width: 800px;
}

.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-style: italic;
  color: $text-color;
  text-align: left;
  white-space: pre-line;
}

.testimonial-author {
  font-size: 0.9rem;
  font-weight: 500;
  text-align: left;
  color: rgba($text-color, 0.8);
}

.testimonial-logo-container {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
  width: 100%; // Ensure container takes full width for centering
}

.testimonial-logo {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 240px;
    max-height: 100px;
    margin-bottom: 1rem;
  }

  .testimonial-tagline {
    font-size: 1rem;
    font-style: italic;
    color: $text-color;
    margin: 0 0 2rem 0;
  }
}

/* Navigation styles moved to HorizontalNavigation component */
</style>
