<template>
  <section id="portfolio" class="portfolio-section">
    <div class="section-container">
      <div class="portfolio-header">
        <div class="portfolio-titles">
          <h2 class="portfolio-subtitle">UNSERE PROJEKTE –</h2>
          <h2 class="portfolio-title">ERFOLGSGESCHICHTEN</h2>
        </div>
        <p class="portfolio-description">
          So, jetzt haben wir uns Ihnen ausführlich vorgestellt. Noch etwas vergessen? Natürlich, das Schönste zum Schluss: die Arbeit für unsere Kunden aus den unterschiedlichsten Branchen. Denn das ist es, wofür wir Tag für Tag mit Herz und Hand unser Bestes geben.
        </p>
      </div>

      <!-- Portfolio Grid Component -->
      <PortfolioGrid />
    </div>
  </section>
</template>

<script>
import PortfolioGrid from './PortfolioGrid.vue';

export default {
  name: 'PortfolioGridSection',
  components: {
    PortfolioGrid
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.portfolio-section {
  position: relative;
  min-height: 100vh;
  padding: 6rem 0;
  background-color: #f2f2f2;

  .container {
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
    padding: 0 2rem;

    @media (max-width: $breakpoint-md) {
      padding: 0 1rem;
    }
  }
}

.portfolio-header {
  max-width: 950px;
  margin-bottom: 4rem;
  text-align: left;
  margin-top: 75px; /* Move text down by 75px */
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
</style>
