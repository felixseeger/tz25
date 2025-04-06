<template>
  <PageLayout
    title="IMPRESSUM"
    pageType="legal"
    :showFooter="true"
  >
    <div class="impressum-content">
      <div class="impressum-grid">
        <div class="impressum-section impressum-section--copyright">
          <p class="impressum-text">© TAKTZEIT GmbH seit 2004</p>
          <p class="impressum-text">Es gelten unsere <router-link to="/agb">allgemeinen<br>Geschäftsbedingungen</router-link>.</p>
        </div>

        <div class="impressum-section impressum-section--company">
          <h1 class="impressum-heading">TAKTZEIT GmbH</h1>
          <p class="impressum-text">Marketing Kommunikation</p>
          <p class="impressum-text impressum-text--bold">GESCHÄFTSADRESSE:</p>
          <p class="impressum-text">Burgmüllerstr. 28<br>D-40235 Düsseldorf</p>
        </div>

        <div class="impressum-section impressum-section--contact">
          <p class="impressum-text impressum-text--bold">TEL</p>
          <p class="impressum-text">+49 211 36 11 78 90</p>
          <p class="impressum-text impressum-text--bold">FAX</p>
          <p class="impressum-text">+49 211 36 11 78 99</p>
          <p class="impressum-text impressum-text--bold">E-MAIL</p>
          <p class="impressum-text"><a href="mailto:info@taktzeit.com">info@taktzeit.com</a></p>
        </div>

        <div class="impressum-section impressum-section--management">
          <p class="impressum-text impressum-text--bold">VERTRETUNGSBERECHTIGTE<br>GESCHÄFTSFÜHRER:</p>
          <p class="impressum-text">Sven-Carsten Hennings<br>Till Belkoura</p>
        </div>

        <div class="impressum-section impressum-section--legal">
          <p class="impressum-text impressum-text--bold">FINANZAMT & STEUERNUMMERN:</p>
          <p class="impressum-text">Finanzamt Düsseldorf-Altstadt<br>Steuernr.: 133/5873/1410<br>USt.-IdNr.: DE251841643<br>Eingetragen beim<br>Amtsgericht Düsseldorf<br>HRB 55457</p>
        </div>

        <div class="impressum-section impressum-section--responsibility">
          <p class="impressum-text impressum-text--bold">Verantwortlich für den Inhalt<br>gemäß § 10 Absatz 3 MDStV:</p>
          <p class="impressum-text">Sven-Carsten Hennings</p>
        </div>

        <div class="impressum-section impressum-section--disclaimer">
          <p class="impressum-text impressum-text--bold">HAFTUNGSHINWEIS:</p>
          <p class="impressum-text">Trotz sorgfältiger inhaltlicher<br>Kontrolle übernehmen wir keine<br>Haftung für die Inhalte externer<br>Links. Für den Inhalt verlinkter<br>Seiten sind ausschließlich deren<br>Betreiber verantwortlich.</p>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script>
import { defineComponent } from 'vue';
import PageLayout from '../components/layout/PageLayout.vue';

export default defineComponent({
  name: 'ImpressumView',
  components: {
    PageLayout
  }
});
</script>

<!-- Styles moved to _legal-pages.scss -->
<style lang="scss" scoped>
// No inline styles needed - using global styles from _legal-pages.scss
</style>
