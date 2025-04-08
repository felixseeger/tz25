<template>
  <section id="history" class="history-section">
    <div class="history-background"></div>
    <div class="container">
      <div class="history-content">
        <div class="history-text-content">
          <h2 class="history-title">WIR SIND IHRE NEUE AGENTUR MIT</h2>
          <h1 class="history-headline">LEIDENSCHAFT</h1>
          <p class="history-description">
            Wir sind Kreativität, Hands-On Mentalität und Praxisorientierung für zugeschnit­tene Lösungen und das für jedes Budget.
          </p>
        </div>

        <div class="history-button-container">
          <button class="history-button" @click="openTimeline">
            <img src="../../assets/images/history-btn.svg" alt="Unsere Geschichte" class="history-button__image">
          </button>
        </div>
      </div>
    </div>

    <!-- Timeline Sidebar -->
    <div class="timeline-container" v-if="showTimeline">
      <transition name="timeline-bg">
        <div v-if="showTimeline" class="timeline-backdrop" @click="closeTimeline"></div>
      </transition>

      <transition name="timeline">
        <div v-if="showTimeline" class="timeline-sidebar">
          <button class="timeline-close" @click="closeTimeline" aria-label="Timeline schließen">
            <img src="../../assets/images/close.svg" alt="Schließen">
          </button>

          <h2 class="timeline-title">UNSERE GESCHICHTE</h2>

          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-year">2005</div>
              <div class="timeline-content">
                <h3>GRÜNDUNG</h3>
                <p>TAKTZEIT wurde als spezialisierte Agentur für Sales Activation im Herzen von Düsseldorf gegründet.</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2010</div>
              <div class="timeline-content">
                <h3>EXPANSION</h3>
                <p>Erweiterung des Teams und Umzug in größere Büroräume.</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2015</div>
              <div class="timeline-content">
                <h3>DIGITAL SHIFT</h3>
                <p>Integration digitaler Strategien und Erweiterung des Serviceangebots.</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2020</div>
              <div class="timeline-content">
                <h3>INTERNATIONALE KUNDEN</h3>
                <p>Ausbau des Kundenportfolios mit internationalen Marken.</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">HEUTE</div>
              <div class="timeline-content">
                <h3>INNOVATION & WACHSTUM</h3>
                <p>Kontinuierliche Weiterentwicklung als führende Agentur für Sales Activation mit einem vielfältigen Kundenstamm.</p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HistorySection',
  data() {
    return {
      showTimeline: false
    }
  },
  methods: {
    openTimeline() {
      this.showTimeline = true;
      document.body.classList.add('timeline-open');

      // Add animation for timeline items after the timeline is opened
      setTimeout(() => {
        this.animateTimelineItems();
      }, 500); // Wait for the timeline to open
    },
    closeTimeline() {
      this.showTimeline = false;
      document.body.classList.remove('timeline-open');
    },
    handleOpenTimelineEvent() {
      this.openTimeline();
    },
    animateTimelineItems() {
      // Import GSAP dynamically to avoid SSR issues
      import('gsap').then(({ gsap }) => {
        // Get all timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');

        if (timelineItems.length === 0) {
          console.error('No timeline items found');
          return;
        }

        // Set initial state - all items start below their final position and invisible
        gsap.set(timelineItems, {
          y: 50,
          opacity: 0
        });

        // Create a timeline for the items
        gsap.to(timelineItems, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15, // Each item starts 0.15s after the previous one
          ease: 'power2.out'
        });
      }).catch(error => {
        console.error('Error loading GSAP for timeline items:', error);
      });
    },

    initAnimations() {
      // Import GSAP dynamically to avoid SSR issues
      import('gsap').then(({ gsap }) => {
        // Get the history section elements
        const historyTitle = document.querySelector('.history-title');
        const historyHeadline = document.querySelector('.history-headline');
        const historyDescription = document.querySelector('.history-description');
        const historyButton = document.querySelector('.history-button');

        // Create a timeline for the history section
        const tl = gsap.timeline({
          defaults: { duration: 0.8, ease: 'power3.out' }
        });

        // Check if elements exist before animating
        if (!historyTitle || !historyHeadline || !historyDescription || !historyButton) {
          console.error('Some history section elements not found');
          return;
        }

        // Set initial state - all elements start below their final position and invisible
        gsap.set([historyTitle, historyHeadline, historyDescription, historyButton], {
          y: 50,
          opacity: 0
        });

        // Add staggered bottom-up animations with offset timing
        tl.to(historyTitle, {
          y: 0,
          opacity: 1,
          duration: 0.8
        })
        .to(historyHeadline, {
          y: 0,
          opacity: 1,
          duration: 0.8
        }, '-=0.5') // Start 0.5s before the previous animation ends
        .to(historyDescription, {
          y: 0,
          opacity: 1,
          duration: 0.8
        }, '-=0.5') // Start 0.5s before the previous animation ends
        .to(historyButton, {
          y: 0,
          opacity: 1,
          duration: 0.8
        }, '-=0.5'); // Start 0.5s before the previous animation ends

        // Add a fallback to ensure elements are visible even if animation fails
        setTimeout(() => {
          [historyTitle, historyHeadline, historyDescription, historyButton].forEach(el => {
            if (el) {
              el.style.opacity = '1';
              el.style.transform = 'none';
            }
          });
        }, 2000);
      }).catch(error => {
        console.error('Error loading GSAP:', error);
      });
    }
  },
  mounted() {
    // Listen for the custom event from the FixedHistoryButton
    const historySection = document.getElementById('history');
    if (historySection) {
      historySection.addEventListener('open-timeline', this.handleOpenTimelineEvent);

      // Set up an intersection observer to detect when the history section is visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Dispatch a custom event when the history section becomes visible
              document.dispatchEvent(new CustomEvent('history-section-visible', {
                detail: { visible: true }
              }));
              console.log('History section visible event dispatched');

              // Initialize the animations when the section becomes visible
              this.initAnimations();
            } else {
              document.dispatchEvent(new CustomEvent('history-section-visible', {
                detail: { visible: false }
              }));
            }
          });
        },
        { threshold: 0.05 } // Trigger when just 5% of the section is visible
      );

      observer.observe(historySection);

      // Store the observer in a variable that can be accessed in beforeUnmount
      this.observer = observer;
    }

    // Initialize GSAP animations
    this.initAnimations();
  },
  beforeUnmount() {
    // Clean up when component is destroyed
    document.body.classList.remove('timeline-open');

    // Remove event listener
    const historySection = document.getElementById('history');
    if (historySection) {
      historySection.removeEventListener('open-timeline', this.handleOpenTimelineEvent);
    }

    // Disconnect the observer if it exists
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
</script>

<style lang="scss" scoped>
/* Styles moved to FixedHistoryButton component */
</style>