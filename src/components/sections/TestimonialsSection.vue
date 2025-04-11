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
    <div class="container">
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
                „TAKTZEIT steht bei uns für die Entwicklung von genialen und sinnvollen Design- Konzepten und dem guten und zielgruppengenauen Aufbau von B2B und B2C Strategien. Das vielseitige Know-how unterstützt uns digital, analog und strategisch enorm. Die schnelle und zuverlässige Bearbeitung unserer Ideen wird durch eine sehr enge und kollegiale Zusammenarbeit abgerundet."
              </p>
              <p class="testimonial-author">Anna Heuvens
Marketing Managerin
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
                „Mit TAKTZEIT haben wir einen Partner gefunden, der unsere komplexen Produkte versteht und es schafft, diese in klare und ansprechende Marketingbotschaften zu übersetzen. Die Kreativität und das technische Verständnis des Teams haben uns dabei geholfen, unsere Marktposition im B2B-Bereich deutlich zu stärken. Besonders beeindruckt hat uns die Fähigkeit, sowohl digitale als auch analoge Kampagnen nahtlos zu integrieren und dabei stets den Fokus auf messbare Ergebnisse zu legen."
              </p>
              <p class="testimonial-author">Marketing Director Epson Europe</p>
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
              <p class="testimonial-author">Philipp Mehdorn
Geschäftsführer
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
              <p class="testimonial-author">Malou Kokken
Marketing Managerin
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
              <p class="testimonial-author">Brand Manager
Sofidel Group</p>
            </div>
            <div class="testimonial-logo-container">
              <div class="testimonial-logo">
                <img
                  src="../../assets/images/client-logos/regina.png"
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
                „Mit TAKTZEIT haben wir einen strategischen Partner gefunden, der uns dabei unterstützt, unsere komplexen Industrieprodukte verständlich und zielgruppengerecht zu kommunizieren. Die Agentur hat ein tiefes Verständnis für unsere technischen Anforderungen entwickelt und schafft es, diese in überzeugende Marketingbotschaften zu übersetzen. Die professionelle Beratung und die kreativen Lösungen haben wesentlich dazu beigetragen, unsere Marktposition zu stärken und neue Geschäftsbeziehungen aufzubauen."
              </p>
              <p class="testimonial-author">Leiter Marketing
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
                „TAKTZEIT hat uns mit ihrer strategischen Beratung und kreativen Umsetzung dabei geholfen, unsere komplexen Spezialchemieprodukte verständlich und überzeugend zu kommunizieren. Die Agentur versteht es, wissenschaftliche Inhalte in ansprechende Marketingbotschaften zu übersetzen und dabei die Balance zwischen Fachlichkeit und Zugänglichkeit zu wahren. Die enge Zusammenarbeit und das tiefe Verständnis für unsere Branche machen TAKTZEIT zu einem wertvollen Partner für unsere Kommunikationsaktivitäten."
              </p>
              <p class="testimonial-author">Head of Marketing Communications
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

