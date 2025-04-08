<template>
  <div class="karriere-page">
    <div class="karriere-content" style="position: relative; z-index: 10; color: white;">
      <div class="karriere-header">
        <h1 class="karriere-header__title">KARRIERE BEI TAKTZEIT</h1>
        <h2 class="karriere-header__subtitle">WIR SUCHEN DICH!</h2>

        <p class="karriere-header__text">
          Taktzeit ist ein fest etabliertes Team, das Dir die besten Jobs anbieten kann. Und zwar anspruchsvolle, kreative Arbeitsplätze ohne Wenn & Aber. Du arbeitest in den Bereichen Projektmanagement, Kreativkonzept, oder Web Development sowohl für internationale Markenartikel als auch für mittelständische Unternehmen. Du entwickelst oder betreust vielfältige Projekte von Print-Kampagnen über Packaging bis zu digitalen Medien und Social Media.
        </p>
      </div>

      <div class="job-listings">
        <div class="job-listing">
          <h3 class="job-listing__title">WEB DEVELOPER <span class="job-listing__subtitle">(M/W/D)</span></h3>
        </div>

        <div class="job-listing">
          <h3 class="job-listing__title">WEB DEVELOPER <span class="job-listing__subtitle">(M/W/D)</span></h3>
        </div>

        <div class="job-listing">
          <h3 class="job-listing__title">WEB DEVELOPER <span class="job-listing__subtitle">(M/W/D)</span></h3>
        </div>

        <div class="job-listing">
          <h3 class="job-listing__title">WEB DEVELOPER <span class="job-listing__subtitle">(M/W/D)</span></h3>
        </div>

        <div class="apply-button-container">
          <BaseButton variant="primary" class="apply-button">JETZT BEWERBEN</BaseButton>
        </div>
      </div>
    </div>

    <div class="rocket-background"></div>

    <!-- Footer Section -->
    <FooterSection class="karriere-footer" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { BaseButton } from '../components/base';
import { FooterSection } from '../components/sections';

export default defineComponent({
  name: 'KarriereView',
  components: {
    BaseButton,
    FooterSection
  }
});
</script>

<!-- Some styles added inline to ensure content visibility -->
<style lang="scss" scoped>
.karriere-header {
  &__subtitle,
  &__title,
  &__text {
    color: white !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
}

.job-listing {
  &__title {
    color: white !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
}
</style>
