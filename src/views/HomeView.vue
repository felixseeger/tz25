  <template>
    <div class="home">
      <HeroSection id="hero" />
      <JourneySection id="journey" />
      <TestimonialsSection id="testimonials" />
      <HistorySection id="history" />
      <div id="team">
        <TeamSection class="desktop-only" />
        <TeamGridSection class="mobile-only" />
      </div>
      <ServicesSection id="services" />
      <BrandSection id="brand" />
      <PortfolioGridSection id="portfolio" />
      <ContactSection id="contact" />
      <FooterSection id="footer" />
    </div>
  </template>

  <script>
  import {
    HeroSection,
    JourneySection,
    HistorySection,
    TestimonialsSection,
    ServicesSection,
    TeamSection,
    TeamGridSection,
    BrandSection,
    ContactSection,
    FooterSection
  } from '../components/sections';
  import { PortfolioGridSection } from '../components/portfolio';

  export default {
    name: 'HomeView',
    components: {
      HeroSection,
      JourneySection,
      TestimonialsSection,
      HistorySection,
      TeamSection,
      TeamGridSection,
      ServicesSection,
      BrandSection,
      PortfolioGridSection,
      ContactSection,
      FooterSection
    }
  }
  </script>

  <style lang="scss" scoped>
  @import '../assets/scss/_variables.scss';

  .home {
    min-height: 100vh;
    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
  }
  </style>
