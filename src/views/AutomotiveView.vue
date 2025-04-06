<template>
  <div class="automotive">
    <div class="page-header">
      <h1>AUTOMOTIVE <span class="new-tag">NEW</span></h1>
    </div>
    <div class="page-content">
      <p>Automotive Informationen hier</p>

      <SectionLinks :links="sectionLinks" title="Entdecken Sie weitere Bereiche:" />
    </div>
    <FooterSection />
  </div>
</template>

<script>
import { ref } from 'vue';
import { FooterSection } from '../components/sections';
import { SectionLinks } from '../components/navigation';

export default {
  name: 'AutomotiveView',
  components: {
    FooterSection,
    SectionLinks
  },
  setup() {
    const sectionLinks = ref([
      {
        section: 'portfolio',
        title: 'PORTFOLIO',
        description: 'Sehen Sie unsere Arbeiten'
      },
      {
        section: 'services',
        title: 'LEISTUNGEN',
        description: 'Entdecken Sie unsere Dienstleistungen'
      },
      {
        section: 'contact',
        title: 'KONTAKT',
        description: 'Nehmen Sie Kontakt mit uns auf'
      },
      {
        section: 'testimonials',
        title: 'KUNDEN',
        description: 'Was unsere Kunden über uns sagen'
      }
    ]);

    return {
      sectionLinks
    };
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';

.automotive {
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