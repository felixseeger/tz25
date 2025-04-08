<template>
  <section id="brand" class="brand-section">
    <div class="brand-content">
      <div class="container">
      <h2 class="brand-title">MARKE & DESIGN</h2>

      <div class="brand-grid-wrapper">
        <img src="@/assets/images/brand_bg.svg" alt="Background" class="brand-grid-background" />
        <img src="@/assets/images/brand_tria.svg" alt="Triangle" class="brand-grid-triangle" ref="brandTriangle" />
        <div class="brand-grid" ref="brandGrid">
          <!-- Row 1 -->
          <div class="brand-item" ref="brandItem">
            <h3 class="brand-item__title">SCHLAGWORT BLINDTEXT</h3>
            <p class="brand-item__description">Pudae essitias aut officientam veremposse ofitatet mo volorest vlis aut verit re</p>
          </div>

          <div class="brand-item" ref="brandItem">
            <h3 class="brand-item__title">SCHLAGWORT BLINDTEXT</h3>
            <p class="brand-item__description">Pudae essitias aut officientam veremposse ofitatet mo volorest vlis aut verit re</p>
          </div>

          <div class="brand-item" ref="brandItem">
            <h3 class="brand-item__title">SCHLAGWORT BLINDTEXT</h3>
            <p class="brand-item__description">Pudae essitias aut officientam veremposse ofitatet mo volorest vlis aut verit re</p>
          </div>

          <!-- Row 2 -->
          <div class="brand-item" ref="brandItem">
            <h3 class="brand-item__title">SCHLAGWORT BLINDTEXT</h3>
            <p class="brand-item__description">Pudae essitias aut officientam veremposse ofitatet mo volorest vlis aut verit re</p>
          </div>

          <div class="brand-item" ref="brandItem">
            <h3 class="brand-item__title">SCHLAGWORT BLINDTEXT</h3>
            <p class="brand-item__description">Pudae essitias aut officientam veremposse ofitatet mo volorest vlis aut verit re</p>
          </div>

          <div class="brand-item" ref="brandItem">
            <h3 class="brand-item__title">SCHLAGWORT BLINDTEXT</h3>
            <p class="brand-item__description">Pudae essitias aut officientam veremposse ofitatet mo volorest vlis aut verit re</p>
          </div>

          <!-- Row 3 -->
          <div class="brand-item" ref="brandItem">
            <h3 class="brand-item__title">SCHLAGWORT BLINDTEXT</h3>
            <p class="brand-item__description">Pudae essitias aut officientam veremposse ofitatet mo volorest vlis aut verit re</p>
          </div>

          <div class="brand-item" ref="brandItem">
            <h3 class="brand-item__title">SCHLAGWORT BLINDTEXT</h3>
            <p class="brand-item__description">Pudae essitias aut officientam veremposse ofitatet mo volorest vlis aut verit re</p>
          </div>

          <div class="brand-item" ref="brandItem">
            <h3 class="brand-item__title">SCHLAGWORT BLINDTEXT</h3>
            <p class="brand-item__description">Pudae essitias aut officientam veremposse ofitatet mo volorest vlis aut verit re</p>
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
  name: 'BrandSection',
  setup() {
    const brandGrid = ref(null);
    const brandItems = ref([]);
    const brandTriangle = ref(null);

    const { createTimeline } = useGsap();

    onMounted(() => {
      // Wait for the DOM to be fully rendered
      setTimeout(() => {
        // Get all brand items from the DOM
        const items = document.querySelectorAll('.brand-item');

        // Update the refs
        brandItems.value = Array.from(items);

        // Create a timeline for the brand grid animation
        const tl = createTimeline({
          scrollTrigger: {
            trigger: brandGrid.value,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            // markers: true, // Uncomment for debugging
          }
        });

        // Animate the triangle
        if (brandTriangle.value) {
          tl.from(brandTriangle.value, {
            x: -100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
          });
        }

        // Animate each brand item with a stagger effect
        if (brandItems.value.length > 0) {
          tl.from(brandItems.value, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
          }, '-=0.4');
        }
      }, 500);
    });

    return {
      brandGrid,
      brandItems,
      brandTriangle,
      brandItem: brandItems
    };
  }
}
</script>

<style lang="scss" scoped>
// No inline styles needed - using global styles from _brand-section.scss
</style>
