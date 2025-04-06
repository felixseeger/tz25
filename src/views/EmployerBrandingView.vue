<template>
  <div class="employer-branding">
    <div class="page-header">
      <h1>EMPLOYER BRANDING <span class="new-tag">NEW</span></h1>
    </div>
    <div class="page-content">
      <p>Employer Branding Informationen hier</p>
    </div>
    <FooterSection />
  </div>
</template>

<script>
import { FooterSection } from '../components/sections';

export default {
  name: 'EmployerBrandingView',
  components: {
    FooterSection
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';

.employer-branding {
  min-height: 100vh;
  padding-top: 100px;

  .page-header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      font-weight: bold;

      .new-tag {
        font-size: 1rem;
        background-color: $primary-color;
        color: $text-color;
        padding: 2px 6px;
        border-radius: 4px;
        vertical-align: super;
        margin-left: 5px;
      }
    }
  }

  .page-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}
</style>