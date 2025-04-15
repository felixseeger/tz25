<template>

  <section class="testimonials-section">
    <div class="testimonials-background">
      <img
        src="../../assets/images/testamonials.svg"
        alt="Testimonials Background"
        class="testimonials-background-image loading"
        loading="lazy"
        ref="backgroundImage"
        @load="handleImageLoaded"
      />
    </div>
    <div class="section-container">
      <div class="testimonials-header">
        <h2 class="testimonials-title">DAS SAGEN UNSERE</h2>
        <h2 class="testimonials-subtitle">ÜBERZEUGTEN KUNDEN</h2>
      </div>

      <div class="testimonials-carousel">
        <div class="testimonials-carousel__wrapper" :style="{ '--slide-offset': `-${currentSlide * 12.5}%` }">
          <!-- Testimonial 1 - Bridgestone -->
          <div class="testimonial-slide">
            <div class="testimonial-content">
              <p class="testimonial-text">
                „Unser langjähriger Agenturpartner TAKTZEIT versteht es, sich auf unsere vielfältigen Anforderungen agil einzustellen und sich mit uns kontinuierlich weiter-
                zuentwickeln. Das Agenturteam überzeugt durch sein herausragendes Servicelevel und verbindet zuverlässig kreative Ideen mit tatsächlicher Umsetzbarkeit.
                Die tiefgreifende Expertise von TAKTZEIT im Bereich Sales Activation und der kompetente Umgang mit unseren Marken erfüllen unsere hohen Ansprüche an
                einen modernen Kreativ-Dienstleister."
              </p>
              <p class="testimonial-author">Julia J. Köhnen | Head of Marketing, Central Europe | DACH & Nordics Bridgestone Europe NV/SA</p>
            </div>
            <div class="testimonial-logo-container">
              <div class="testimonial-logo">
                <img
                  src="../../assets/images/client-logos/bridgestone.svg"
                  alt="Bridgestone Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>

          <!-- Dr. Clauder Testimonial -->
          <div class="testimonial-slide">
            <div class="testimonial-content">
              <p class="testimonial-text">
                „TAKTZEIT steht bei uns für die Entwicklung von genialen und sinnvollen Design- Konzepten und dem guten und zielgruppengenauen Aufbau von B2B und B2C Strategien. Das vielseitige Know-how unterstützt uns digital, analog und strategisch enorm. Die schnelle und zuverlässige Bearbeitung unserer Ideen wird durch eine sehr enge und kollegiale Zusammenarbeit abgerundet.&nbsp;
              </p>
              <p>Mit TAKTZEIT haben wir eine Agentur gefunden, die mitdenkt und unsere Werbeaussagen emotional und empathisch visualisiert. Hier stehen die Wünsche der Kunden an erster Stelle, wir sagen Danke!“</p>
              <p class="testimonial-author">
                Anna Heuvens<br>
                Marketing Managerin<br>
                Dr.Clauder Solution for pets GmbH</p>
            </div>
            <div class="testimonial-logo-container">
              <div class="testimonial-logo">
                <img
                  src="../../assets/images/client-logos/drclauder.png"
                  alt="Dr. Clauder Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>

          <!-- Epson Testimonial -->
          <div class="testimonial-slide">
            <div class="testimonial-content">
              <p class="testimonial-text">
                „Als Technologieunternehmen möchten wir für unsere Fachhandelspartner mehr als nur ein weiterer Hardwarelieferant sein. Epson bietet Vertriebspartnern daher exklusiven Zugang zu Marketinginstrumenten und Expertise rund um Vertriebs- und Online bezogene Themen. Um diesen Zugang zu ermöglichen, haben wir intensiv nach einer Agentur mit Hands-on Mentalität und einem hohen Level an Know-how gesucht, die wir schließlich in TAKTZEIT gefunden haben. Die Ergebnisse der bisherigen Zusammenarbeit haben sowohl unsere als auch die Erwartungen der Fachhandelspartner übertroffen. TAKTZEIT denkt immer mit und arbeitet sich schnell und sicher in neue Themen und Marktbereiche ein. Darüber hinaus hat die Agentur besondere Stärken im Bereich Grafik und Design, die sie schon oft zielführend und gewinnbringend für uns eingesetzt haben.“
              </p>
              <p class="testimonial-author">
              Jörn Bon Ahlen<br>
              Head of Marketing DACH<br>
              Epson Deutschland GmbH</p>
            </div>
            <div class="testimonial-logo-container">
              <div class="testimonial-logo">
                <img
                  src="../../assets/images/client-logos/epson.png"
                  alt="Epson Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>

          <!-- Remy & Nauen Testimonial -->
          <div class="testimonial-slide">
            <div class="testimonial-content">
              <p class="testimonial-text">
                „TAKTZEIT begleitet uns mit seiner interdisziplinären Marketing- und Kommunikations-Expertise bereits seit vielen Jahren hochprofessionell in größeren und kleineren Projekten. So hat sich TAKTZEIT mit strategischem Weitblick um unseren umfassenden und medienübergreifenden Markenrelaunch gekümmert und setzt darauf aufbauend unsere analogen und digitalen Werbemaßnahmen um."
              </p>
              <p class="testimonial-author">
                Philipp Mehdorn<br>
                Geschäftsführer<br>
                REMY / NAUEN GmbH / Co. KG</p>
            </div>
            <div class="testimonial-logo-container">
              <div class="testimonial-logo">
                <img
                  src="../../assets/images/client-logos/remyundnauen.webp"
                  alt="Remy & Nauen Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>

          <!-- Hapert Testimonial -->
          <div class="testimonial-slide">
            <div class="testimonial-content">
              <p class="testimonial-text">
                „TAKTZEIT denkt immer mit und trägt dadurch bei wichtigen Entscheidungen oder Projekten zu optimalen Lösungen bei. Die Agentur hält sich stets an Vereinbarungen und die Kommunikation läuft reibungslos! Kurz gesagt, eine sehr angenehme Agentur, mit der man gut zusammenarbeiten kann."
              </p>
              <p class="testimonial-author">
                Malou Kokken<br>
                Marketing Managerin<br>
                WAGENBOUW HAPERT B.V./HAPERT Anhänger</p>
            </div>
            <div class="testimonial-logo-container">
              <div class="testimonial-logo">
                <img
                  src="../../assets/images/client-logos/hapert.png"
                  alt="Hapert Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>

          <!-- Sofidel/Regina Testimonial -->
          <div class="testimonial-slide">
            <div class="testimonial-content">
              <p class="testimonial-text">
                „Die Zusammenarbeit mit TAKTZEIT zeichnet sich durch ein hohes Maß an Professionalität, Kreativität und Zuverlässigkeit aus. Das Team hat es geschafft, unsere Marke Regina im hart umkämpften Konsumgütermarkt erfolgreich zu positionieren und durch innovative Kampagnen die Kundenbindung zu stärken. Besonders beeindruckt hat uns die Fähigkeit, schnell auf Marktveränderungen zu reagieren und flexible Lösungen anzubieten, die unsere Verkaufszahlen nachweislich gesteigert haben."
              </p>
              <p class="testimonial-author">
                Brand Manager<br>
                Sofidel Group</p>
            </div>
            <div class="testimonial-logo-container">
              <div class="testimonial-logo">
                <img
                  src="../../assets/images/client-logos/sofidel.webp"
                  alt="Regina Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>

          <!-- Bechem Testimonial -->
          <div class="testimonial-slide">
            <div class="testimonial-content">
              <p class="testimonial-text">
                „Wir schätzen an unserem langjährigen Agenturpartner TAKTZEIT die konstant hochwertige und zuverlässige Zusammenarbeit wie auch die Bereitschaft und den Willen, gemeinsam mit uns neue Wege zu gehen."
              </p>
              <p class="testimonial-author">
                Leiter Marketing<br>
                Carl Bechem GmbH</p>
            </div>
            <div class="testimonial-logo-container">
              <div class="testimonial-logo">
                <img
                  src="../../assets/images/client-logos/bechem.png"
                  alt="Bechem Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>

          <!-- Evonik Testimonial -->
          <div class="testimonial-slide">
            <div class="testimonial-content">
              <p class="testimonial-text">
                „TAKTZEIT unterstützt uns seit 10 Jahren als zuverlässiger Agenturpartner u. a. in den Bereichen Markenaufbau, Packaging Design und B2B Kommunikation im internationalen Kontext. Die konstant hohe Qualität der Ergebnisse und die Treffsicherheit der Art Works schätzen wir ebenso wie das ausgeprägte Verständnis für unsere Vertriebskanäle und die Fähigkeit, komplexe Zusammenhänge klar auf den Punkt zu bringen. Das Team überzeugt mit einem sehr hohen Serviceanspruch und einer stets sehr angenehmen und professionellen Zusammenarbeit."
              </p>
              <p class="testimonial-author">
              Head of Marketing Communications<br>
              Evonik Industries AG</p>
            </div>
            <div class="testimonial-logo-container">
              <div class="testimonial-logo">
                <img
                  src="../../assets/images/client-logos/evonik.png"
                  alt="Evonik Logo"
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <div class="navigation-container">
        <HorizontalNavigation @prev="prevSlide" @next="nextSlide" />
      </div>
    </div>

  </section>
</template>

<script>
import { HorizontalNavigation } from './../base';
import { LazyImage } from './../ui';

export default {
  name: 'TestimonialsSection',
  components: {
    HorizontalNavigation,
    LazyImage
  },
  data() {
    return {
      currentSlide: 0,
      totalSlides: 8 // Updated to match the number of testimonials
    }
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    },
    handleImageLoaded() {
      // When the image is loaded, remove the loading class and add the loaded class
      if (this.$refs.backgroundImage) {
        this.$refs.backgroundImage.classList.remove('loading');
        this.$refs.backgroundImage.classList.add('loaded');
      }
    }
  }
}
</script>

