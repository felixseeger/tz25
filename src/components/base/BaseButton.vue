<template>
  <button
    :type="type"
    :class="[
      'base-button',
      `base-button--${variant}`,
      `base-button--${size}`,
      { 'base-button--block': block },
      { 'base-button--disabled': disabled },
      { 'base-button--loading': loading }
    ]"
    :disabled="disabled || loading"
    @click="onClick"
  >
    <!-- Loading Spinner -->
    <span v-if="loading" class="base-button__loader">
      <span class="base-button__loader-dot"></span>
      <span class="base-button__loader-dot"></span>
      <span class="base-button__loader-dot"></span>
    </span>
    
    <!-- Icon (if provided) -->
    <span v-if="icon && !loading" class="base-button__icon" :class="{ 'base-button__icon--right': iconPosition === 'right' }">
      <img v-if="typeof icon === 'string'" :src="icon" :alt="iconAlt || 'button icon'" class="base-button__icon-img">
      <component v-else :is="icon"></component>
    </span>
    
    <!-- Button Content -->
    <span class="base-button__content" :class="{ 'base-button__content--hidden': loading }">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    /**
     * Button type attribute
     * @values button, submit, reset
     */
    type: {
      type: String,
      default: 'button',
      validator: value => ['button', 'submit', 'reset'].includes(value)
    },
    /**
     * Button variant/style
     * @values primary, secondary, outline, text, danger
     */
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'outline', 'text', 'danger'].includes(value)
    },
    /**
     * Button size
     * @values small, medium, large
     */
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    /**
     * Whether the button should take full width
     */
    block: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the button is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the button is in loading state
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Icon to display in the button (URL string or component)
     */
    icon: {
      type: [String, Object],
      default: null
    },
    /**
     * Alt text for icon (if icon is a string URL)
     */
    iconAlt: {
      type: String,
      default: ''
    },
    /**
     * Position of the icon
     * @values left, right
     */
    iconPosition: {
      type: String,
      default: 'left',
      validator: value => ['left', 'right'].includes(value)
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    /**
     * Handle button click
     * @param {Event} event - Click event
     */
    const onClick = (event) => {
      if (props.disabled || props.loading) return;
      emit('click', event);
    };

    return {
      onClick
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: $font-primary;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  text-decoration: none;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba($primary-color, 0.3);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  // Variants
  &--primary {
    background-color: $primary-color;
    color: $text-color;
    
    &:hover:not(.base-button--disabled):not(.base-button--loading) {
      background-color: darken($primary-color, 10%);
    }
  }
  
  &--secondary {
    background-color: $secondary-color;
    color: $text-color;
    
    &:hover:not(.base-button--disabled):not(.base-button--loading) {
      background-color: darken($secondary-color, 10%);
    }
  }
  
  &--outline {
    background-color: transparent;
    border: 2px solid $primary-color;
    color: $primary-color;
    
    &:hover:not(.base-button--disabled):not(.base-button--loading) {
      background-color: rgba($primary-color, 0.1);
    }
  }
  
  &--text {
    background-color: transparent;
    color: $primary-color;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    
    &:hover:not(.base-button--disabled):not(.base-button--loading) {
      background-color: rgba($primary-color, 0.1);
    }
  }
  
  &--danger {
    background-color: #e53935;
    color: white;
    
    &:hover:not(.base-button--disabled):not(.base-button--loading) {
      background-color: darken(#e53935, 10%);
    }
  }
  
  // Sizes
  &--small {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    min-height: 36px;
  }
  
  &--medium {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    min-height: 44px;
  }
  
  &--large {
    font-size: 1.125rem;
    padding: 1rem 2rem;
    min-height: 52px;
  }
  
  // Block
  &--block {
    display: flex;
    width: 100%;
  }
  
  // Disabled
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  // Loading
  &--loading {
    cursor: wait;
  }
  
  // Icon
  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    &:not(&--right) {
      margin-right: 0.5rem;
    }
    
    &--right {
      margin-left: 0.5rem;
      order: 1;
    }
    
    &-img {
      width: 1em;
      height: 1em;
      object-fit: contain;
    }
  }
  
  // Content
  &__content {
    transition: opacity 0.2s ease;
    
    &--hidden {
      opacity: 0;
    }
  }
  
  // Loader
  &__loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    
    &-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: currentColor;
      margin: 0 2px;
      opacity: 0.8;
      animation: dot-flashing 1s infinite alternate;
      
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
}

@keyframes dot-flashing {
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.8;
  }
}
</style>
