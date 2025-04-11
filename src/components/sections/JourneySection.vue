<template>
  <section class="journey-section">
    <div class="container">
      <div class="journey-header" ref="journeyHeader">
        <h2 class="journey-section__title" ref="journeyTitle">IHRE EXPERTEN FÜR DIE GESAMTE</h2>
        <h2 class="journey-section__subtitle" ref="journeySubtitle">SALES ACTIVATION JOURNEY</h2>
        <p class="journey-section__description" ref="journeyDescription">
          Marke, Vertrieb, Handel, Absatz – hier sind wir zuhause: Stationärer oder digitaler POS, Multi- oder
          Omnichannel-Strategie, kurzfristige Aktivierung oder langfristige Bindung, Außendienst, Handel oder
          Shopper, Packaging Design oder Positionierung – Ihren Herausforderungen im Absatzmarketing begegnen wir auf Augenhöhe & begeistern mit innovativen, kreativen und realistischen Lösungen.
        </p>
      </div>

      <div class="journey-steps-container initial-state" ref="journeyStepsContainer">
        <div class="journey-steps">
          <div class="journey-step initial-state" ref="journeyStep">
            <h3 class="journey-step__title">ESSENTIALS</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/essentilas-icn.svg" alt="Essentials" />
              <div class="journey-step__overlay">
                <p>Marke, Positionierung, Strategie und Packaging Design – die Grundlage für erfolgreiches Absatzmarketing.</p>
              </div>
            </div>
          </div>

          <div class="journey-step__divider initial-state" ref="journeyDivider"></div>

          <div class="journey-step initial-state" ref="journeyStep">
            <h3 class="journey-step__title">SELL-IN</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/sell-in-icn.svg" alt="Sell-In" />
              <div class="journey-step__overlay">
                <p>Ein top vorbereiteter Außendienst und auf den Vertriebskanal zugeschnittene Maßnahmen steigern den Hineinverkauf.</p>
              </div>
            </div>
          </div>

          <div class="journey-step__divider initial-state" ref="journeyDivider"></div>

          <div class="journey-step initial-state" ref="journeyStep">
            <h3 class="journey-step__title">SELL-THROUGH</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/sell-through-icn.svg" alt="Sell-Through" />
              <div class="journey-step__overlay">
                <p>Strategien, Konzepte und maßgeschneiderte Tools für Großhandelspartner optimieren den Durchverkauf.</p>
              </div>
            </div>
          </div>

          <div class="journey-step__divider initial-state" ref="journeyDivider"></div>

          <div class="journey-step initial-state" ref="journeyStep">
            <h3 class="journey-step__title">SELL-OUT</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/sell-out_txt-ico.svg" alt="Sell-Out" />
              <div class="journey-step__overlay">
                <p>Endverbaucher-Nachfrage beim Handel steigern und starke Impulse für den Abverkauf setzen.</p>
              </div>
            </div>
          </div>

          <div class="journey-step__divider initial-state" ref="journeyDivider"></div>

          <div class="journey-step initial-state" ref="journeyStep">
            <h3 class="journey-step__title">FULL SERVICE</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/full-service_txt-ico.svg" alt="Full Service" />
              <div class="journey-step__overlay">
                <p>Umsetzung aus einer Hand: Kreation, Aktionsbetreuung, Clearing, Produktion, Bespielung aller Touchpoints u.v.m.</p>
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

    onMounted(() => {
      // Create a timeline for the header animation
      const headerTimeline = createTimeline({
        scrollTrigger: {
          trigger: journeyHeader.value,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          // markers: true, // Uncomment for debugging
        }
      });

      // Animate the header elements
      headerTimeline
        .from(journeyTitle.value, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        })
        .from(journeySubtitle.value, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.4')
        .from(journeyDescription.value, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.4');

      // Create a timeline for the steps animation
      const stepsTimeline = createTimeline({
        scrollTrigger: {
          trigger: journeyStepsContainer.value,
          start: 'top 80%', // Start animation earlier
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          // markers: true, // Uncomment for debugging
        }
      });

      // Wait for the DOM to be fully rendered
      setTimeout(() => {
        // Get all journey steps and dividers from the DOM
        const steps = document.querySelectorAll('.journey-step');
        const dividers = document.querySelectorAll('.journey-step__divider');

        console.log('Found journey steps:', steps.length);
        console.log('Found journey dividers:', dividers.length);

        if (steps.length === 0) {
          console.error('No journey steps found in the DOM');
          return; // Exit if no steps are found
        }

        // Update the refs
        journeySteps.value = Array.from(steps);
        journeyDividers.value = Array.from(dividers);

        // Make sure the container is visible
        if (journeyStepsContainer.value) {
          journeyStepsContainer.value.classList.add('animated-state');
          journeyStepsContainer.value.classList.remove('initial-state');
        }

        // Make all steps visible first (in case animation fails)
        steps.forEach(step => {
          step.classList.add('animated-state');
          step.classList.remove('initial-state');
        });

        dividers.forEach(divider => {
          divider.classList.add('animated-state');
          divider.classList.remove('initial-state');
        });

        // Now set up for animation
        if (journeySteps.value.length > 0) {
          // Set initial state for journey steps - positioned below their final position
          gsap.set(journeySteps.value, { y: 100, opacity: 0 });
        }

        if (journeyDividers.value.length > 0) {
          // Set initial state for journey dividers
          gsap.set(journeyDividers.value, { scaleX: 0, opacity: 0 });
        }
      }, 500);

      // Create a function to run the animation
      const runAnimation = () => {
        if (journeySteps.value.length === 0 || journeyDividers.value.length === 0) {
          console.error('Cannot run animation: steps or dividers not found');
          return;
        }

        console.log('Running journey steps animation');

        // Animate the steps with a staggered effect
        stepsTimeline
          // First, animate the steps moving up from the bottom
          .to(journeySteps.value, {
            y: 0, // Move to their final position
            opacity: 1,
            duration: 1.2, // Longer duration for more dramatic effect
            stagger: 0.25, // Increased stagger time for more pronounced sequential effect
            ease: 'back.out(1.7)', // More pronounced overshoot for a bouncy effect
            clearProps: 'transform' // Clean up transforms after animation
          })
          // Then animate the dividers with a slight delay
          .to(journeyDividers.value, {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.25, // Match the stagger time of the steps
            ease: 'power2.out'
          }, '-=1.5'); // Start slightly before the steps animation finishes
      };

      // Run the animation after the initial state is set
      setTimeout(runAnimation, 600);

      // Fallback: If animation doesn't work, make everything visible after a delay
      setTimeout(() => {
        const allSteps = document.querySelectorAll('.journey-step');
        const allDividers = document.querySelectorAll('.journey-step__divider');
        const container = document.querySelector('.journey-steps-container');

        if (container) {
          container.classList.add('animated-state');
          container.classList.remove('initial-state');
        }

        allSteps.forEach(step => {
          step.classList.add('animated-state');
          step.classList.remove('initial-state');
        });

        allDividers.forEach(divider => {
          divider.classList.add('animated-state');
          divider.classList.remove('initial-state');
        });

        console.log('Fallback visibility applied to journey steps');
      }, 2000);
    });

    return {
      journeyHeader,
      journeyTitle,
      journeySubtitle,
      journeyDescription,
      journeyStepsContainer,
      journeyStep: journeySteps,
      journeyDivider: journeyDividers
    };
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.journey-step__icon {
  position: relative;
  overflow: hidden;
  border-radius: 8px; /* Optional: adds rounded corners to the overlay */
}

.journey-step__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #D8292F; /* The red background color you specified */
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Changed from center to flex-start for left alignment */
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 1rem;
  text-align: left; /* Changed from center to left */
  color: white;
  font-size: 0.9rem;
  line-height: 1.4;
  pointer-events: none; /* Ensures the overlay doesn't interfere with hover */
}

.journey-step:hover .journey-step__overlay {
  opacity: 0.95; /* Slightly transparent to show a hint of the icon underneath */
}

.journey-step__overlay p {
  margin: 0;
  font-weight: 500;
  text-align: left;
  width: 100%;
}

/* Responsive adjustments for the overlay */
@media (max-width: $breakpoint-md) {
  .journey-step__overlay {
    font-size: 0.8rem;
    padding: 0.75rem;
  }
}

@media (max-width: $breakpoint-sm) {
  .journey-step__overlay {
    font-size: 0.75rem;
    padding: 0.5rem;
  }
}
</style>