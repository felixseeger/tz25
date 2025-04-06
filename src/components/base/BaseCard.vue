<template>
  <div 
    class="base-card" 
    :class="[
      `base-card--${variant}`,
      { 'base-card--hoverable': hoverable },
      { 'base-card--flat': flat },
      { 'base-card--full-height': fullHeight }
    ]"
  >
    <!-- Card Image -->
    <div v-if="image || $slots.image" class="base-card__image">
      <slot name="image">
        <img v-if="image" :src="image" :alt="imageAlt || ''" />
      </slot>
    </div>
    
    <!-- Card Header -->
    <div v-if="title || subtitle || $slots.header" class="base-card__header">
      <slot name="header">
        <h3 v-if="title" class="base-card__title">{{ title }}</h3>
        <p v-if="subtitle" class="base-card__subtitle">{{ subtitle }}</p>
      </slot>
    </div>
    
    <!-- Card Body -->
    <div class="base-card__body">
      <slot></slot>
    </div>
    
    <!-- Card Footer -->
    <div v-if="$slots.footer" class="base-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    /**
     * Card title
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * Card subtitle
     */
    subtitle: {
      type: String,
      default: ''
    },
    /**
     * Card image URL
     */
    image: {
      type: String,
      default: ''
    },
    /**
     * Alt text for the card image
     */
    imageAlt: {
      type: String,
      default: ''
    },
    /**
     * Card variant/style
     * @values default, outlined, elevated
     */
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'outlined', 'elevated'].includes(value)
    },
    /**
     * Whether the card should have hover effects
     */
    hoverable: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the card should have no shadow
     */
    flat: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the card should take full height of its container
     */
    fullHeight: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.base-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &__image {
    width: 100%;
    
    img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
    }
  }
  
  &__header {
    padding: 1.5rem 1.5rem 0;
  }
  
  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  &__subtitle {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0;
    margin-bottom: 0;
  }
  
  &__body {
    padding: 1.5rem;
    flex: 1;
  }
  
  &__footer {
    padding: 0 1.5rem 1.5rem;
    border-top: 1px solid #f0f0f0;
    padding-top: 1rem;
  }
  
  // Variants
  &--default {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  &--outlined {
    border: 1px solid #e0e0e0;
    box-shadow: none;
  }
  
  &--elevated {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  // Modifiers
  &--hoverable {
    cursor: pointer;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
    }
  }
  
  &--flat {
    box-shadow: none;
  }
  
  &--full-height {
    height: 100%;
  }
}
</style>
