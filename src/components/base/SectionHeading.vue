<template>
  <div 
    class="section-heading" 
    :class="[
      `section-heading--${alignment}`,
      `section-heading--${size}`,
      { 'section-heading--with-subtitle': subtitle },
      { 'section-heading--with-description': description },
      { 'section-heading--with-accent': accent }
    ]"
  >
    <!-- Subtitle (displayed above the main heading) -->
    <h3 v-if="subtitle" class="section-heading__subtitle">{{ subtitle }}</h3>
    
    <!-- Main Heading -->
    <component 
      :is="tag" 
      class="section-heading__title"
      :id="id"
    >
      {{ title }}
      <span v-if="accent" class="section-heading__accent">{{ accent }}</span>
    </component>
    
    <!-- Description Text -->
    <p v-if="description" class="section-heading__description">{{ description }}</p>
    
    <!-- Optional Divider -->
    <div v-if="divider" class="section-heading__divider"></div>
    
    <!-- Slot for additional content -->
    <div v-if="$slots.default" class="section-heading__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionHeading',
  props: {
    /**
     * Main heading text
     */
    title: {
      type: String,
      required: true
    },
    /**
     * Subtitle text (displayed above the main heading)
     */
    subtitle: {
      type: String,
      default: ''
    },
    /**
     * Description text (displayed below the main heading)
     */
    description: {
      type: String,
      default: ''
    },
    /**
     * HTML tag to use for the main heading
     * @values h1, h2, h3, h4, h5, h6
     */
    tag: {
      type: String,
      default: 'h2',
      validator: value => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
    },
    /**
     * Heading size
     * @values small, medium, large, xlarge
     */
    size: {
      type: String,
      default: 'large',
      validator: value => ['small', 'medium', 'large', 'xlarge'].includes(value)
    },
    /**
     * Text alignment
     * @values left, center, right
     */
    alignment: {
      type: String,
      default: 'left',
      validator: value => ['left', 'center', 'right'].includes(value)
    },
    /**
     * Whether to show a divider below the heading
     */
    divider: {
      type: Boolean,
      default: false
    },
    /**
     * ID attribute for the heading (useful for anchor links)
     */
    id: {
      type: String,
      default: ''
    },
    /**
     * Accent text (displayed with different styling)
     */
    accent: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.section-heading {
  margin-bottom: 2.5rem;
  
  &__subtitle {
    font-family: $font-headline;
    font-weight: 300;
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: $primary-color;
  }
  
  &__title {
    font-family: $font-headline;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 1rem;
    line-height: 1.2;
    color: inherit;
  }
  
  &__accent {
    color: $primary-color;
  }
  
  &__description {
    margin-top: 0;
    margin-bottom: 0;
    line-height: 1.6;
    max-width: 800px;
  }
  
  &__divider {
    width: 60px;
    height: 3px;
    background-color: $primary-color;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  &__content {
    margin-top: 1.5rem;
  }
  
  // Alignment variants
  &--left {
    text-align: left;
    
    .section-heading__divider {
      margin-left: 0;
      margin-right: auto;
    }
    
    .section-heading__description {
      margin-left: 0;
      margin-right: auto;
    }
  }
  
  &--center {
    text-align: center;
    
    .section-heading__divider {
      margin-left: auto;
      margin-right: auto;
    }
    
    .section-heading__description {
      margin-left: auto;
      margin-right: auto;
    }
  }
  
  &--right {
    text-align: right;
    
    .section-heading__divider {
      margin-left: auto;
      margin-right: 0;
    }
    
    .section-heading__description {
      margin-left: auto;
      margin-right: 0;
    }
  }
  
  // Size variants
  &--small {
    .section-heading__subtitle {
      font-size: 1rem;
      
      @media (max-width: $breakpoint-md) {
        font-size: 0.9rem;
      }
    }
    
    .section-heading__title {
      font-size: 1.5rem;
      
      @media (max-width: $breakpoint-md) {
        font-size: 1.25rem;
      }
    }
    
    .section-heading__description {
      font-size: 0.9rem;
    }
  }
  
  &--medium {
    .section-heading__subtitle {
      font-size: 1.25rem;
      
      @media (max-width: $breakpoint-md) {
        font-size: 1.1rem;
      }
    }
    
    .section-heading__title {
      font-size: 2rem;
      
      @media (max-width: $breakpoint-md) {
        font-size: 1.75rem;
      }
    }
    
    .section-heading__description {
      font-size: 1rem;
    }
  }
  
  &--large {
    .section-heading__subtitle {
      font-size: 1.5rem;
      
      @media (max-width: $breakpoint-md) {
        font-size: 1.25rem;
      }
    }
    
    .section-heading__title {
      font-size: 3rem;
      
      @media (max-width: $breakpoint-md) {
        font-size: 2.5rem;
      }
      
      @media (max-width: $breakpoint-sm) {
        font-size: 2rem;
      }
    }
    
    .section-heading__description {
      font-size: 1.1rem;
      
      @media (max-width: $breakpoint-md) {
        font-size: 1rem;
      }
    }
  }
  
  &--xlarge {
    .section-heading__subtitle {
      font-size: 2rem;
      
      @media (max-width: $breakpoint-md) {
        font-size: 1.5rem;
      }
      
      @media (max-width: $breakpoint-sm) {
        font-size: 1.25rem;
      }
    }
    
    .section-heading__title {
      font-size: 4.5rem;
      letter-spacing: -1px;
      
      @media (max-width: $breakpoint-md) {
        font-size: 3.5rem;
      }
      
      @media (max-width: $breakpoint-sm) {
        font-size: 2.5rem;
      }
    }
    
    .section-heading__description {
      font-size: 1.25rem;
      
      @media (max-width: $breakpoint-md) {
        font-size: 1.1rem;
      }
      
      @media (max-width: $breakpoint-sm) {
        font-size: 1rem;
      }
    }
  }
}
</style>
