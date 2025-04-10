<template>
  <section id="brand" class="brand-section">
    <div class="container">
      <h2 class="brand-title" style="opacity: 1 !important; color: white; display: block !important; visibility: visible !important;">{{ currentSlideTitle }}</h2>
      <div class="brand-content">
        <BrandCarousel
          :slides="carouselSlides"
          :autoplay="true"
          :autoplay-speed="6000"
          @slide-changed="handleSlideChange"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useGsap } from '../../composables/useGsap';
import BrandCarousel from '../ui/BrandCarousel.vue';

export default {
  name: 'BrandSection',
  components: {
    BrandCarousel
  },
  setup() {
    const { createTimeline } = useGsap();
    const carouselContainer = ref(null);
    const currentSlideTitle = ref('MARKE & DESIGN'); // Default title

    // Define the carousel slides with content from the screenshots
    const carouselSlides = [
      {
        title: 'MARKE & DESIGN',

        items: [
          {
            title: 'COOPERATE IDENTITY',
            description: 'Wir geben Ihrer Marke ein klares Profil'
          },
          {
            title: 'PACKAGING DESIGN',
            description: 'Für eine Verpackung, die zum Zugreifen verführt'
          },
          {
            title: 'DESIGN TEMPLATES',
            description: 'Für vielfältige Design-Vorlagen im Baukasten-System'
          },
          {
            title: 'COOPERATE DESIGN',
            description: 'Für einen stimmigen Look'
          },
          {
            title: 'STYLEGUIDES',
            description: 'Damit alles perfekt zusammenpasst'
          },
          {
            title: 'DESIGN CLEARING',
            description: 'Das Beauty make over für Ihr bestehendes Design'
          },
          {
            title: 'POSITIONIERUNGEN',
            description: 'Für ein klares Statement zu Ihrem Markenversprechen'
          },
          {
            title: 'COMMUNICATION GUIDELINES',
            description: 'Für eine einheitliche Sprache in Ihrer Markenkommunikation'
          }
        ]
      },
      {
        title: 'STRATEGIE & KONZEPT',

        items: [
          {
            title: 'Sales Marketing Strategien',
            description: 'Mit der richtigen Strategie mehr Verkaufen'
          },
          {
            title: 'Trade & Shopper Marketing',
            description: 'Mit profunder Kenntnis von Handel und Shopper zum Erfolg'
          },
          {
            title: 'POS Marketing',
            description: 'Da punkten, wo die Kaufentscheidung fällt'
          },
          {
            title: 'Sales Promotions',
            description: 'Abverkaufs-Power, die auch auf die Marke einzahlt'
          },
          {
            title: 'Verkaufsförderung',
            description: 'Die Kaufentscheidung zu Ihren Gunsten pushen'
          },
          {
            title: 'Go-to-market Strategien',
            description: 'Treue Kunden sind die besten – und rentabelsten'
          },
          {
            title: 'Channel-Strategien',
            description: 'Die richtigen Vertriebs- und Kommunikations-Kanäle nutzen'
          },
          {
            title: 'E-Commerce',
            description: 'Damit Ihnen mehr Kunden ins Netz gehen'
          }
        ]
      },
      {
        title: 'SERVICE & UMSETZUNG',

        items: [
          {
            title: 'Projekt Management',
            description: 'Für die komplette Abwicklung Ihrer Projekte'
          },
          {
            title: 'Artworks & Layouts',
            description: 'Für die visuelle Gestaltung Ihrer Maßnahmen'
          },
          {
            title: 'Textentwicklung',
            description: 'Für treffende Texte aller Art, von Headline bis Website Content'
          },
          {
            title: 'Druckdaten-Erstellung',
            description: 'Für den optimalen Druck Ihrer Werbemittel'
          },
          {
            title: 'Produktionssteuerung',
            description: 'Für Produktions-Handling, bei dem Sie entspannen können'
          },
          {
            title: 'Verlagshandling',
            description: 'Für die zuverlässige, kompetente Schnittstelle zwischen Kunde und Verlag'
          },
          {
            title: 'Mediaplanung & -buchung',
            description: 'Für den effizienten Einsatz Ihres Mediaspendings'
          },
          {
            title: 'Sourcing',
            description: 'Für effektive Beschaffungsstrategien Ihrer Waren und Dienstleistungen'
          },
          {
            title: 'Analyse & Reporting',
            description: 'Für eine sorgfältige Nachbereitung und Auswertung Ihrer Maßnahmen'
          }
        ]
      },
      {
        title: 'DIGITALE LÖSUNGEN',

        items: [
          {
            title: 'Websites',
            description: 'Für Ihren glanzvollen Auftritt im Netz'
          },
          {
            title: 'Apps',
            description: 'Für optimale Anwendungslösungen für jedes Endgerät'
          },
          {
            title: 'Social Media',
            description: 'Für guten Content und ergebnisstarke Kampagnen'
          },
          {
            title: 'Webhosting',
            description: 'Für den sicheren Webspace Ihrer individuellen Anforderungen'
          },
          {
            title: 'Domain-Service',
            description: 'Für Ihre Wunschdomain im World Wide Web'
          },
          {
            title: 'Onlineshops / Plattformen',
            description: 'Für erfolgreiches Verkaufen im Internet'
          },
          {
            title: 'Film / Video / TV',
            description: 'Für bewegte Bilder, die Bewegung in Ihr Business bringen'
          },
          {
            title: 'Audio & Sounddesign',
            description: 'Für den perfekten Sound Ihrer Marke'
          },
          {
            title: 'SEO & SEA',
            description: 'Für Werbung, die auch dem Algorithmus schmeckt'
          },
          {
            title: 'Digitale Transformation',
            description: 'Für Ihren Weg von Analog nach Digital'
          }
        ]
      }
    ];

    onMounted(() => {
      // Create a timeline for the carousel animation
      const tl = createTimeline({
        scrollTrigger: {
          trigger: '.brand-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      });

      // Animate the title and carousel with a fade-in effect
      tl.to('.brand-title', { // Changed from 'from' to 'to' to ensure final state is visible
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        immediateRender: false // Ensure it doesn't set initial state
      }).from('.brand-carousel', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3');
    });

    // Function to handle slide change event from carousel
    const handleSlideChange = (title) => {
      currentSlideTitle.value = title;
    };

    return {
      carouselSlides,
      carouselContainer,
      currentSlideTitle,
      handleSlideChange
    };
  }
}
</script>

<style lang="scss" scoped>
// No inline styles needed - using global styles from _brand-section.scss
</style>
