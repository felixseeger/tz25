<template>
  <section id="brand" class="brand-section" ref="brandSection">
    <div class="brand-content">
      <div class="section-container">
        <!-- Brand Carousel Component -->
        <BrandCarousel />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useGsap } from '../../composables/useGsap';
import BrandCarousel from '../brand/BrandCarousel.vue';

export default {
  name: 'BrandSection',
  components: {
    BrandCarousel
  },
  setup() {
    const brandSection = ref(null);
    const { createTimeline } = useGsap();

    onMounted(() => {
      // Wait for the DOM to be fully rendered
      setTimeout(() => {
        // Create a timeline for the brand section animation
        const tl = createTimeline({
          scrollTrigger: {
            trigger: brandSection.value,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            // markers: true, // Uncomment for debugging
          }
        });

        // Animation for the carousel
        tl.from('.brand-carousel', {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      }, 500);
    });

    return {
      brandSection
    };
  }
}
</script>

<style lang="scss" scoped>
// No inline styles needed - using global styles from _brand-section.scss
</style>
