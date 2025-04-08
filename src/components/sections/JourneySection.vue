<template>
  <section class="journey-section">
    <div class="container">
      <div class="journey-header" ref="journeyHeader">
        <h2 class="journey-section__title" ref="journeyTitle">IHRE EXPERTEN FÜR DIE GESAMTE</h2>
        <h1 class="journey-section__subtitle" ref="journeySubtitle">SALES ACTIVATION JOURNEY</h1>
        <p class="journey-section__description" ref="journeyDescription">
          Marke, Vertrieb, Handel, Absatz – hier sind wir zuhause: Stationärer oder digitaler POS, Multi- oder
          Omnichannel-Strategie, kurzfristige Aktivierung oder langfristige Bindung, Außendienst, Handel oder
          Shopper, Packaging Design oder Positionierung – Ihren Herausforderungen im Absatzmarketing begegnen wir auf Augenhöhe & begeistern mit innovativen, kreativen und realistischen Lösungen.
        </p>
      </div>

      <div class="journey-steps-container" ref="journeyStepsContainer">
        <div class="journey-steps">
          <div class="journey-step" ref="journeyStep">
            <h3 class="journey-step__title">ESSENTIALS</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/essentilas-icn.svg" alt="Essentials" />
            </div>
          </div>

          <div class="journey-step__divider" ref="journeyDivider"></div>

          <div class="journey-step" ref="journeyStep">
            <h3 class="journey-step__title">SELL-IN</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/sell-in-icn.svg" alt="Sell-In" />
            </div>
          </div>

          <div class="journey-step__divider" ref="journeyDivider"></div>

          <div class="journey-step" ref="journeyStep">
            <h3 class="journey-step__title">SELL-THROUGH</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/sell-through-icn.svg" alt="Sell-Through" />
            </div>
          </div>

          <div class="journey-step__divider" ref="journeyDivider"></div>

          <div class="journey-step" ref="journeyStep">
            <h3 class="journey-step__title">SELL-OUT</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/sell-out_txt-ico.svg" alt="Sell-Out" />
            </div>
          </div>

          <div class="journey-step__divider" ref="journeyDivider"></div>

          <div class="journey-step" ref="journeyStep">
            <h3 class="journey-step__title">FULL SERVICE</h3>
            <div class="journey-step__icon">
              <img src="../../assets/images/full-service_txt-ico.svg" alt="Full Service" />
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
          journeyStepsContainer.value.style.opacity = '1';
          journeyStepsContainer.value.style.visibility = 'visible';
        }

        // Make all steps visible first (in case animation fails)
        steps.forEach(step => {
          step.style.opacity = '1';
          step.style.transform = 'none';
        });

        dividers.forEach(divider => {
          divider.style.opacity = '1';
          divider.style.transform = 'none';
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
          container.style.opacity = '1';
          container.style.visibility = 'visible';
        }

        allSteps.forEach(step => {
          step.style.opacity = '1';
          step.style.transform = 'none';
        });

        allDividers.forEach(divider => {
          divider.style.opacity = '1';
          divider.style.transform = 'none';
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

</style>