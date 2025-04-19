<template>
  <section class="journey-section" ref="sectionRef">
    <div class="section-container">
      <div class="journey-header" ref="journeyHeader">
        <h2 class="journey-section__title" ref="journeyTitle" v-animate-on-scroll="{ animation: 'fade-up', delay: 0.1, duration: 0.8 }">IHRE EXPERTEN FÜR DIE GESAMTE</h2>
        <h2 class="journey-section__subtitle" ref="journeySubtitle" v-animate-on-scroll="{ animation: 'fade-up', delay: 0.3, duration: 0.8 }">SALES ACTIVATION JOURNEY</h2>
        <p class="journey-section__description" ref="journeyDescription" v-animate-on-scroll="{ animation: 'fade-up', delay: 0.5, duration: 0.8 }">
          Marke, Vertrieb, Handel, Absatz – hier sind wir zuhause: Stationärer oder digitaler POS, Multi- oder
          Omnichannel-Strategie, kurzfristige Aktivierung oder langfristige Bindung, Außendienst, Handel oder
          Shopper, Packaging Design oder Positionierung – Ihren Herausforderungen im Absatzmarketing begegnen wir auf Augenhöhe & begeistern mit innovativen, kreativen und realistischen Lösungen.
        </p>
      </div>

      <div class="journey-steps-container" ref="journeyStepsContainer">
        <div class="journey-steps grid-animate">
          <div class="journey-step animate-item" ref="journeyStep" v-animate-on-scroll="{ animation: 'fade-up', delay: 0.1, staggerChildren: true }">
            <h3 class="journey-step__title">ESSENTIALS</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/essentilas-icn.svg" alt="Essentials" />
              <div class="journey-step__overlay">
                <p class="journey-step__overlay-text">Marke, Positionierung, Strategie und Packaging Design – die Grundlage für erfolgreiches Absatzmarketing.</p>
              </div>
            </div>
          </div>

          <div class="journey-step__divider animate-item" ref="journeyDivider" v-animate-on-scroll="{ animation: 'fade-left', delay: 0.2, duration: 0.6 }"></div>

          <div class="journey-step animate-item" ref="journeyStep" v-animate-on-scroll="{ animation: 'fade-up', delay: 0.2, staggerChildren: true }">
            <h3 class="journey-step__title">SELL-IN</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/sell-in-icn.svg" alt="Sell-In" />
              <div class="journey-step__overlay">
                <p class="journey-step__overlay-text">Ein top vorbereiteter Außendienst und auf den Vertriebskanal zugeschnittene Maßnahmen steigern den Hineinverkauf.</p>
              </div>
            </div>
          </div>

          <div class="journey-step__divider animate-item" ref="journeyDivider" v-animate-on-scroll="{ animation: 'fade-left', delay: 0.3, duration: 0.6 }"></div>

          <div class="journey-step animate-item" ref="journeyStep" v-animate-on-scroll="{ animation: 'fade-up', delay: 0.3, staggerChildren: true }">
            <h3 class="journey-step__title">SELL-THROUGH</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/sell-through-icn.svg" alt="Sell-Through" />
              <div class="journey-step__overlay">
                <p class="journey-step__overlay-text">Strategien, Konzepte und maßgeschneiderte Tools für Großhändler optimieren den Durchverkauf.</p>
              </div>
            </div>
          </div>

          <div class="journey-step__divider animate-item" ref="journeyDivider" v-animate-on-scroll="{ animation: 'fade-left', delay: 0.4, duration: 0.6 }"></div>

          <div class="journey-step animate-item" ref="journeyStep" v-animate-on-scroll="{ animation: 'fade-up', delay: 0.4, staggerChildren: true }">
            <h3 class="journey-step__title">SELL-OUT</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/sell-out_txt-ico.svg" alt="Sell-Out" />
              <div class="journey-step__overlay">
                <p class="journey-step__overlay-text">Endverbraucher-Nachfrage beim Handel steigern und starke Impulse für den Abverkauf setzen.</p>
              </div>
            </div>
          </div>

          <div class="journey-step__divider animate-item" ref="journeyDivider" v-animate-on-scroll="{ animation: 'fade-left', delay: 0.5, duration: 0.6 }"></div>

          <div class="journey-step animate-item" ref="journeyStep" v-animate-on-scroll="{ animation: 'fade-up', delay: 0.5, staggerChildren: true }">
            <h3 class="journey-step__title">FULL SERVICE</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/full-service_txt-ico.svg" alt="Full Service" />
              <div class="journey-step__overlay">
                <p class="journey-step__overlay-text">Umsetzung aus einer Hand. Kreation, Automatisierung, Crafting, Produktion, Bespielung aller Touchpoints.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useGsap } from '../../composables/useGsap';
import { useSectionAnimation } from '../../composables/useSectionAnimation';

export default {
  name: 'JourneySection',
  setup() {
    // Refs for elements to animate
    const journeyHeader = ref(null);
    const journeyTitle = ref(null);
    const journeySubtitle = ref(null);
    const journeyDescription = ref(null);
    const journeyStepsContainer = ref(null);
    const journeySteps = ref([]);
    const journeyDividers = ref([]);

    const { createTimeline, gsap } = useGsap();
    const { sectionRef } = useSectionAnimation({
      triggerStart: 'top 70%',
      triggerEnd: 'bottom 20%',
      baseDelay: 0.2,
      staggerDelay: 0.2,
      duration: 0.8,
      distance: 50
    });

    onMounted(() => {
      // Initialize section animations
      initAnimations();

      // Log for debugging
      console.log('Journey section animations initialized');

      // Ensure the journey steps container is visible
      if (journeyStepsContainer.value) {
        journeyStepsContainer.value.style.opacity = '1';
        journeyStepsContainer.value.style.visibility = 'visible';
      }

      // Get all journey steps and dividers for reference
      setTimeout(() => {
        const steps = document.querySelectorAll('.journey-step');
        const dividers = document.querySelectorAll('.journey-step__divider');

        console.log('Found journey steps:', steps.length);
        console.log('Found journey dividers:', dividers.length);

        // Update the refs for potential future use
        journeySteps.value = Array.from(steps);
        journeyDividers.value = Array.from(dividers);
      }, 500);
    });

    return {
      journeyHeader,
      journeyTitle,
      journeySubtitle,
      journeyDescription,
      journeyStepsContainer,
      journeyStep: journeySteps,
      journeyDivider: journeyDividers,
      sectionRef
    };
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

</style>