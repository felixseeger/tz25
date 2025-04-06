<template>
  <div 
    class="base-input" 
    :class="[
      `base-input--${size}`,
      { 'base-input--focused': isFocused },
      { 'base-input--disabled': disabled },
      { 'base-input--error': error },
      { 'base-input--success': success },
      { 'base-input--with-icon': icon || iconRight },
      { 'base-input--with-icon-right': iconRight }
    ]"
  >
    <label v-if="label" :for="id" class="base-input__label">
      {{ label }}
      <span v-if="required" class="base-input__required">*</span>
    </label>
    
    <div class="base-input__wrapper">
      <!-- Left Icon -->
      <div v-if="icon" class="base-input__icon">
        <img v-if="typeof icon === 'string'" :src="icon" :alt="iconAlt || 'input icon'" class="base-input__icon-img">
        <component v-else :is="icon"></component>
      </div>
      
      <!-- Input Element -->
      <input
        v-if="type !== 'textarea'"
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :min="min"
        :max="max"
        :step="step"
        :maxlength="maxlength"
        class="base-input__field"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      >
      
      <!-- Textarea Element -->
      <textarea
        v-else
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :rows="rows"
        :maxlength="maxlength"
        class="base-input__field base-input__field--textarea"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      ></textarea>
      
      <!-- Right Icon -->
      <div v-if="iconRight" class="base-input__icon base-input__icon--right">
        <img v-if="typeof iconRight === 'string'" :src="iconRight" :alt="iconRightAlt || 'input icon'" class="base-input__icon-img">
        <component v-else :is="iconRight"></component>
      </div>
      
      <!-- Clear Button -->
      <button
        v-if="clearable && modelValue && !disabled && !readonly"
        type="button"
        class="base-input__clear"
        @click="onClear"
        aria-label="Clear input"
      >
        &times;
      </button>
    </div>
    
    <!-- Helper Text / Error Message -->
    <div v-if="helperText || error" class="base-input__helper">
      <span :class="{ 'base-input__helper--error': error }">
        {{ error || helperText }}
      </span>
    </div>
    
    <!-- Character Counter -->
    <div v-if="showCharacterCount && maxlength" class="base-input__counter">
      {{ modelValue ? modelValue.length : 0 }}/{{ maxlength }}
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'BaseInput',
  props: {
    /**
     * Input model value (v-model)
     */
    modelValue: {
      type: [String, Number],
      default: ''
    },
    /**
     * Input type
     * @values text, password, email, number, tel, url, search, textarea
     */
    type: {
      type: String,
      default: 'text',
      validator: value => [
        'text', 'password', 'email', 'number', 'tel', 
        'url', 'search', 'textarea', 'date', 'time', 'datetime-local'
      ].includes(value)
    },
    /**
     * Input label
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * Input placeholder
     */
    placeholder: {
      type: String,
      default: ''
    },
    /**
     * Input ID (auto-generated if not provided)
     */
    id: {
      type: String,
      default: () => `input-${Math.random().toString(36).substring(2, 9)}`
    },
    /**
     * Whether the input is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the input is readonly
     */
    readonly: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the input is required
     */
    required: {
      type: Boolean,
      default: false
    },
    /**
     * Input size
     * @values small, medium, large
     */
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    /**
     * Helper text to display below the input
     */
    helperText: {
      type: String,
      default: ''
    },
    /**
     * Error message to display (also sets the input to error state)
     */
    error: {
      type: String,
      default: ''
    },
    /**
     * Whether the input is in success state
     */
    success: {
      type: Boolean,
      default: false
    },
    /**
     * Icon to display on the left side of the input (URL string or component)
     */
    icon: {
      type: [String, Object],
      default: null
    },
    /**
     * Alt text for left icon (if icon is a string URL)
     */
    iconAlt: {
      type: String,
      default: ''
    },
    /**
     * Icon to display on the right side of the input (URL string or component)
     */
    iconRight: {
      type: [String, Object],
      default: null
    },
    /**
     * Alt text for right icon (if iconRight is a string URL)
     */
    iconRightAlt: {
      type: String,
      default: ''
    },
    /**
     * Whether the input should be clearable
     */
    clearable: {
      type: Boolean,
      default: false
    },
    /**
     * Whether to show character count (only works with maxlength)
     */
    showCharacterCount: {
      type: Boolean,
      default: false
    },
    /**
     * Maximum length of the input
     */
    maxlength: {
      type: [Number, String],
      default: null
    },
    /**
     * Minimum value (for number inputs)
     */
    min: {
      type: [Number, String],
      default: null
    },
    /**
     * Maximum value (for number inputs)
     */
    max: {
      type: [Number, String],
      default: null
    },
    /**
     * Step value (for number inputs)
     */
    step: {
      type: [Number, String],
      default: null
    },
    /**
     * Number of rows (for textarea)
     */
    rows: {
      type: [Number, String],
      default: 3
    },
    /**
     * Autocomplete attribute
     */
    autocomplete: {
      type: String,
      default: 'off'
    }
  },
  emits: ['update:modelValue', 'focus', 'blur', 'clear'],
  setup(props, { emit }) {
    const isFocused = ref(false);
    
    /**
     * Handle input event
     * @param {Event} event - Input event
     */
    const onInput = (event) => {
      let value = event.target.value;
      
      // Handle number type conversion
      if (props.type === 'number' && value !== '') {
        value = Number(value);
      }
      
      emit('update:modelValue', value);
    };
    
    /**
     * Handle focus event
     * @param {Event} event - Focus event
     */
    const onFocus = (event) => {
      isFocused.value = true;
      emit('focus', event);
    };
    
    /**
     * Handle blur event
     * @param {Event} event - Blur event
     */
    const onBlur = (event) => {
      isFocused.value = false;
      emit('blur', event);
    };
    
    /**
     * Handle clear button click
     */
    const onClear = () => {
      emit('update:modelValue', '');
      emit('clear');
    };
    
    return {
      isFocused,
      onInput,
      onFocus,
      onBlur,
      onClear
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.base-input {
  margin-bottom: 1.5rem;
  width: 100%;
  
  &__label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    font-size: 0.9rem;
    color: #333;
  }
  
  &__required {
    color: #e53935;
    margin-left: 0.25rem;
  }
  
  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  &__field {
    width: 100%;
    font-family: $font-primary;
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: all 0.3s ease;
    color: #333;
    
    &::placeholder {
      color: #999;
      opacity: 1;
    }
    
    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
    }
    
    &--textarea {
      resize: vertical;
      min-height: 100px;
    }
  }
  
  &__icon {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    z-index: 1;
    
    &-img {
      width: 1.2em;
      height: 1.2em;
      object-fit: contain;
    }
    
    &--right {
      right: 12px;
    }
  }
  
  &__clear {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    color: #999;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: #666;
    }
  }
  
  &__helper {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: #666;
    
    &--error {
      color: #e53935;
    }
  }
  
  &__counter {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: #666;
    text-align: right;
  }
  
  // Size variants
  &--small {
    .base-input__field {
      padding: 0.5rem;
      font-size: 0.875rem;
    }
    
    .base-input__icon {
      left: 8px;
      font-size: 0.875rem;
    }
    
    &.base-input--with-icon .base-input__field {
      padding-left: 2rem;
    }
    
    &.base-input--with-icon-right .base-input__field {
      padding-right: 2rem;
    }
  }
  
  &--medium {
    .base-input__field {
      padding: 0.75rem;
      font-size: 1rem;
    }
    
    .base-input__icon {
      left: 12px;
      font-size: 1rem;
    }
    
    &.base-input--with-icon .base-input__field {
      padding-left: 2.5rem;
    }
    
    &.base-input--with-icon-right .base-input__field {
      padding-right: 2.5rem;
    }
  }
  
  &--large {
    .base-input__field {
      padding: 1rem;
      font-size: 1.125rem;
    }
    
    .base-input__icon {
      left: 16px;
      font-size: 1.125rem;
    }
    
    &.base-input--with-icon .base-input__field {
      padding-left: 3rem;
    }
    
    &.base-input--with-icon-right .base-input__field {
      padding-right: 3rem;
    }
  }
  
  // States
  &--focused {
    .base-input__label {
      color: $primary-color;
    }
  }
  
  &--disabled {
    opacity: 0.6;
    
    .base-input__field {
      cursor: not-allowed;
      background-color: #f5f5f5;
    }
  }
  
  &--error {
    .base-input__field {
      border-color: #e53935;
      
      &:focus {
        box-shadow: 0 0 0 3px rgba(#e53935, 0.1);
      }
    }
    
    .base-input__label {
      color: #e53935;
    }
  }
  
  &--success {
    .base-input__field {
      border-color: #4caf50;
      
      &:focus {
        box-shadow: 0 0 0 3px rgba(#4caf50, 0.1);
      }
    }
  }
  
  &--with-icon-right {
    .base-input__clear {
      right: 40px;
    }
  }
}
</style>
