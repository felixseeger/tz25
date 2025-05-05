<template>
  <div class="mobile-journey-accordion">
    <div 
      v-for="(step, index) in journeySteps" 
      :key="index" 
      class="accordion-item"
      :class="{ 'active': activeIndex === index }"
    >
      <div class="accordion-header" @click="toggleAccordion(index)">
        <h3 class="accordion-title">{{ step.title }}</h3>
        <span class="accordion-icon">{{ activeIndex === index ? '↑' : '↓' }}</span>
      </div>
      <div class="accordion-content" v-show="activeIndex === index">
        <div class="accordion-icon-container">
          <img :src="step.iconSrc" :alt="step.title" class="accordion-step-icon" />
        </div>
        <p class="accordion-text">{{ step.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'MobileJourneyAccordion',
  props: {
    journeySteps: {
      type: Array,
      required: true
    }
  },
  setup() {
    const activeIndex = ref(null);

    const toggleAccordion = (index) => {
      activeIndex.value = activeIndex.value === index ? null : index;
    };

    return {
      activeIndex,
      toggleAccordion
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.mobile-journey-accordion {
  width: 100%;
  margin-top: 1rem;

  .accordion-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;

    &.active {
      .accordion-header {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }

  .accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }

  .accordion-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    padding-left: 1.5rem;
    font-family: $font-headline;
    letter-spacing: 1px;
    color: #fff;
  }

  .accordion-icon {
    font-size: 1.25rem;
    margin-right: 1.5rem;
    transition: transform 0.3s ease;
    color: #fff;
  }

  .accordion-content {
    padding: 0 1.5rem 1.5rem;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .accordion-icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.5rem 0;
    height: 120px;
  }

  .accordion-step-icon {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .accordion-text {
    color: #fff;
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
    text-align: left;
  }
}
</style>
