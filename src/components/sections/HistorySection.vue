<template>
  <section id="history" class="history-section" ref="historySection" :class="{ 'in-view': isInView }">
    <div class="history-background"></div>
    <div class="section-container">
      <div class="history-content">
        <div class="history-text-content">
          <h2 class="history-title" >WIR SIND IHRE NEUE AGENTUR MIT</h2>
          <!-- <h2 class="history-headline">LEIDENSCHAFT</h2> -->
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
                <!-- <h3>GRÜNDUNG</h3> -->
                <p>Im April 2005 gründen wir, Sven Carsten Hennings und Till Belkoura, die Agentur TAKTZEIT in Mönchengladbach. Mit unserem klaren Fokus auf Trade Marketing machen wir schon bald als kleines Start-up großen Eindruck bei namhaften Unternehmen wie Bridgestone oder Disney/Buena Vista.</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2007</div>
              <div class="timeline-content">
                <!-- <h3>EXPANSION</h3> -->
                <p>Gründung einer GmbH, Umzug nach Düsseldorf, erste Mitarbeiter und Azubis, die mit uns Gründern ein starkes Team bilden – Zukunft here we come!</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2009</div>
              <div class="timeline-content">
                <!-- <h3>DIGITAL SHIFT</h3> -->
                <p>Ohne Digital läuft nichts! Deshalb erweitern wir unsere Kernkompetenz um digitale Lösungen für vernetzte Kampagnen aus einer Hand. Eine Service Leistung, die neue Kunden wie Wrigley und Lux Tools / Obi voll überzeugt.</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2011</div>
              <div class="timeline-content">
                <!-- <h3>INTERNATIONALE KUNDEN</h3> -->
                <p>Mittlerweile haben wir 10 motivierte Mitarbeiter und Mitarbeiterinnen bei TAKTZEIT – wir brauchen mehr Platz für unsere Kreativität! In der alten Limonadenfabrik in Düsseldorf finden wir den Raum für neue Kompetenzfelder und neue große Etats wie EVONIK und BECHEM in der B2B Kommunikation.</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2016</div>
              <div class="timeline-content">
                <!-- <h3>INNOVATION & WACHSTUM</h3> -->
                <p>Wir wachsen weiter – 15 Werbeprofis tummeln sich jetzt in unserem Team. Zeit für einen weiteren Umzug. In einer bezaubernden Gründerzeit-Villa in Düsseldorf Grafenberg finden wir Muße und Motivation für Kunden aus Deutschland, Österreich, der Schweiz und den Niederlanden – mit einem erstmaligen Jahresumsatz von über 2 Mio. Euro.</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2020</div>
              <div class="timeline-content">
                <!-- <h3>INNOVATION & WACHSTUM</h3> -->
                <p>Wir starten in das neue Jahrzehnt mit noch mehr Mitarbeitern, noch mehr Kunden und noch mehr Aufgabenbereichen. Durch die erfolgreiche Akquise bei z.B. Epson, Dr. Clauder und Rossmann, kann das mittlerweile 20köpfige Team das komplette Leistungsportfolio im Bereich Sales Activation und B2B voll ausspielen. Wir freuen uns auf die Zukunft. Und auf Sie!</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2025</div>
              <div class="timeline-content">
                <!-- <h3>INNOVATION & WACHSTUM</h3> -->
                <p>Wir feiern unser 20 jähriges Bestehen!</p>
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
      showTimeline: false,
      isInView: false
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
              // Set the isInView property to true when the section is visible
              this.isInView = true;

              // Dispatch a custom event when the history section becomes visible
              document.dispatchEvent(new CustomEvent('history-section-visible', {
                detail: { visible: true }
              }));
              console.log('History section visible event dispatched');

              // Initialize the animations when the section becomes visible
              this.initAnimations();
            } else {
              // Set the isInView property to false when the section is not visible
              this.isInView = false;

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