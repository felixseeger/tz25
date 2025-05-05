<template>
  <section id="journey" class="journey-section" ref="sectionRef">
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

      <!-- Desktop Journey Steps -->
      <div class="journey-steps-container desktop-journey" ref="journeyStepsContainer">
        <div class="journey-steps grid-animate">
          <a href="#" class="journey-step animate-item" ref="journeyStep" v-animate-on-scroll="{ animation: 'fade-up', delay: 0.1, staggerChildren: true }">
            <h3 class="journey-step__title">ESSENTIALS</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/essentilas-icn.svg" alt="Essentials" />
              <div class="journey-step__overlay">
                <p class="journey-step__overlay-text">Marke, Positionierung, Strategie und Packaging Design – die Grundlage für erfolgreiches Absatzmarketing.</p>
              </div>
            </div>
          </a>

          <div class="journey-step__divider animate-item" ref="journeyDivider" v-animate-on-scroll="{ animation: 'fade-left', delay: 0.2, duration: 0.6 }"></div>

          <a href="#" class="journey-step animate-item" ref="journeyStep" v-animate-on-scroll="{ animation: 'fade-up', delay: 0.2, staggerChildren: true }">
            <h3 class="journey-step__title">SELL-IN</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/sell-in-icn.svg" alt="Sell-In" />
              <div class="journey-step__overlay">
                <p class="journey-step__overlay-text">Ein top vorbereiteter Außendienst und auf den Vertriebskanal zugeschnittene Maßnahmen steigern den Hineinverkauf.</p>
              </div>
            </div>
          </a>

          <div class="journey-step__divider animate-item" ref="journeyDivider" v-animate-on-scroll="{ animation: 'fade-left', delay: 0.3, duration: 0.6 }"></div>

          <a href="#" class="journey-step animate-item" ref="journeyStep" v-animate-on-scroll="{ animation: 'fade-up', delay: 0.3, staggerChildren: true }">
            <h3 class="journey-step__title">SELL-THROUGH</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/sell-through-icn.svg" alt="Sell-Through" />
              <div class="journey-step__overlay">
                <p class="journey-step__overlay-text">Strategien, Konzepte und maßgeschneiderte Tools für Großhändler optimieren den Durchverkauf.</p>
              </div>
            </div>
          </a>

          <div class="journey-step__divider animate-item" ref="journeyDivider" v-animate-on-scroll="{ animation: 'fade-left', delay: 0.4, duration: 0.6 }"></div>

          <a href="#" class="journey-step animate-item" ref="journeyStep" v-animate-on-scroll="{ animation: 'fade-up', delay: 0.4, staggerChildren: true }">
            <h3 class="journey-step__title">SELL-OUT</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/sell-out_txt-ico.svg" alt="Sell-Out" />
              <div class="journey-step__overlay">
                <p class="journey-step__overlay-text">Endverbraucher-Nachfrage beim Handel steigern und starke Impulse für den Abverkauf setzen.</p>
              </div>
            </div>
          </a>

          <div class="journey-step__divider animate-item" ref="journeyDivider" v-animate-on-scroll="{ animation: 'fade-left', delay: 0.5, duration: 0.6 }"></div>

          <a href="#" class="journey-step animate-item" ref="journeyStep" v-animate-on-scroll="{ animation: 'fade-up', delay: 0.5, staggerChildren: true }">
            <h3 class="journey-step__title">FULL SERVICE</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/full-service_txt-ico.svg" alt="Full Service" />
              <div class="journey-step__overlay">
                <p class="journey-step__overlay-text">Umsetzung aus einer Hand. Kreation, Automatisierung, Crafting, Produktion, Bespielung aller Touchpoints.</p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <!-- Mobile Journey Accordion -->
      <div class="mobile-journey">
        <div class="mobile-journey-accordion">
          <!-- ESSENTIALS -->
          <div class="accordion-item" :class="{ 'active': activeIndex === 0 }">
            <div class="accordion-header" @click="toggleAccordion(0)">
              <div class="accordion-icon-small">
                <img src="../../assets/images/essentilas-icn.svg" alt="Essentials" />
              </div>
              <h3 class="accordion-title">ESSENTIALS</h3>
              <span class="accordion-toggle-icon">{{ activeIndex === 0 ? '⌃' : '⌄' }}</span>
            </div>
            <div class="accordion-content" v-show="activeIndex === 0">
              <p class="accordion-text">Marke, Positionierung, Strategie und Packaging Design – die Grundlage für erfolgreiches Absatzmarketing.</p>
            </div>
          </div>

          <!-- SELL-IN -->
          <div class="accordion-item" :class="{ 'active': activeIndex === 1 }">
            <div class="accordion-header" @click="toggleAccordion(1)">
              <div class="accordion-icon-small">
                <img src="../../assets/images/sell-in-icn.svg" alt="Sell-In" />
              </div>
              <h3 class="accordion-title">SELL-IN</h3>
              <span class="accordion-toggle-icon">{{ activeIndex === 1 ? '⌃' : '⌄' }}</span>
            </div>
            <div class="accordion-content" v-show="activeIndex === 1">
              <p class="accordion-text">Ein top vorbereiteter Außendienst und auf den Vertriebskanal zugeschnittene Maßnahmen steigern den Hineinverkauf.</p>
            </div>
          </div>

          <!-- SELL-THROUGH -->
          <div class="accordion-item" :class="{ 'active': activeIndex === 2 }">
            <div class="accordion-header" @click="toggleAccordion(2)">
              <div class="accordion-icon-small">
                <img src="../../assets/images/sell-through-icn.svg" alt="Sell-Through" />
              </div>
              <h3 class="accordion-title">SELL-THROUGH</h3>
              <span class="accordion-toggle-icon">{{ activeIndex === 2 ? '⌃' : '⌄' }}</span>
            </div>
            <div class="accordion-content" v-show="activeIndex === 2">
              <p class="accordion-text">Strategien, Konzepte und maßgeschneiderte Tools für Großhändler optimieren den Durchverkauf.</p>
            </div>
          </div>

          <!-- SELL-OUT -->
          <div class="accordion-item" :class="{ 'active': activeIndex === 3 }">
            <div class="accordion-header" @click="toggleAccordion(3)">
              <div class="accordion-icon-small">
                <img src="../../assets/images/sell-out_txt-ico.svg" alt="Sell-Out" />
              </div>
              <h3 class="accordion-title">SELL-OUT</h3>
              <span class="accordion-toggle-icon">{{ activeIndex === 3 ? '⌃' : '⌄' }}</span>
            </div>
            <div class="accordion-content" v-show="activeIndex === 3">
              <p class="accordion-text">Endverbraucher-Nachfrage beim Handel steigern und starke Impulse für den Abverkauf setzen.</p>
            </div>
          </div>

          <!-- FULL SERVICE -->
          <div class="accordion-item" :class="{ 'active': activeIndex === 4 }">
            <div class="accordion-header" @click="toggleAccordion(4)">
              <div class="accordion-icon-small">
                <img src="../../assets/images/full-service_txt-ico.svg" alt="Full Service" />
              </div>
              <h3 class="accordion-title">FULL SERVICE</h3>
              <span class="accordion-toggle-icon">{{ activeIndex === 4 ? '⌃' : '⌄' }}</span>
            </div>
            <div class="accordion-content" v-show="activeIndex === 4">
              <p class="accordion-text">Umsetzung aus einer Hand. Kreation, Automatisierung, Crafting, Produktion, Bespielung aller Touchpoints.</p>
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

    // Mobile accordion state
    const activeIndex = ref(null);

    // Toggle accordion function
    const toggleAccordion = (index) => {
      activeIndex.value = activeIndex.value === index ? null : index;
    };

    const { createTimeline, gsap } = useGsap();
    const { sectionRef } = useSectionAnimation({
      triggerStart: 'top 70%',
      triggerEnd: 'bottom 20%',
      baseDelay: 0.2,
      staggerDelay: 0.2,
      duration: 0.8,
      distance: 50
    });

    // Function to initialize animations
    const initAnimations = () => {
      // Create a timeline for the journey section
      const tl = createTimeline({
        trigger: sectionRef.value,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      });

      // Add animations to the timeline if elements exist
      if (journeyHeader.value) {
        tl.from(journeyHeader.value, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      }

      // Ensure the journey steps container is visible
      if (journeyStepsContainer.value) {
        journeyStepsContainer.value.style.opacity = '1';
        journeyStepsContainer.value.style.visibility = 'visible';
      }
    };

    onMounted(() => {
      // Initialize section animations
      try {
        initAnimations();
        console.log('Journey section animations initialized');
      } catch (error) {
        console.error('Error initializing journey section animations:', error);
      }

      // Get all journey steps and dividers for reference
      setTimeout(() => {
        try {
          const steps = document.querySelectorAll('.journey-step');
          const dividers = document.querySelectorAll('.journey-step__divider');

          console.log('Found journey steps:', steps.length);
          console.log('Found journey dividers:', dividers.length);

          // Update the refs for potential future use
          journeySteps.value = Array.from(steps);
          journeyDividers.value = Array.from(dividers);
        } catch (error) {
          console.error('Error getting journey steps and dividers:', error);
        }
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
      sectionRef,
      activeIndex,
      toggleAccordion
    };
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

</style>