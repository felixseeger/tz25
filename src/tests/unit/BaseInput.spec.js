import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInput from '@/components/base/BaseInput.vue';

describe('BaseInput.vue', () => {
  // Test rendering with default props
  it('renders correctly with default props', () => {
    const wrapper = mount(BaseInput);
    
    expect(wrapper.classes()).toContain('base-input');
    expect(wrapper.classes()).toContain('base-input--medium');
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find('input').attributes('type')).toBe('text');
    expect(wrapper.find('label').exists()).toBe(false);
  });

  // Test label rendering
  it('renders label when label prop is provided', () => {
    const wrapper = mount(BaseInput, {
      props: { label: 'Test Label' }
    });
    
    expect(wrapper.find('label').exists()).toBe(true);
    expect(wrapper.find('label').text()).toBe('Test Label');
  });

  // Test required indicator
  it('shows required indicator when required prop is true', () => {
    const wrapper = mount(BaseInput, {
      props: { 
        label: 'Test Label',
        required: true 
      }
    });
    
    expect(wrapper.find('.base-input__required').exists()).toBe(true);
    expect(wrapper.find('.base-input__required').text()).toBe('*');
  });

  // Test different input types
  it('renders the correct input type', () => {
    const types = ['text', 'password', 'email', 'number', 'tel', 'url', 'search'];
    
    types.forEach(type => {
      const wrapper = mount(BaseInput, {
        props: { type }
      });
      
      expect(wrapper.find('input').attributes('type')).toBe(type);
    });
  });

  // Test textarea rendering
  it('renders textarea when type is textarea', () => {
    const wrapper = mount(BaseInput, {
      props: { type: 'textarea' }
    });
    
    expect(wrapper.find('textarea').exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(false);
  });

  // Test different sizes
  it('applies the correct size class', () => {
    const sizes = ['small', 'medium', 'large'];
    
    sizes.forEach(size => {
      const wrapper = mount(BaseInput, {
        props: { size }
      });
      
      expect(wrapper.classes()).toContain(`base-input--${size}`);
    });
  });

  // Test disabled state
  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(BaseInput, {
      props: { disabled: true }
    });
    
    expect(wrapper.classes()).toContain('base-input--disabled');
    expect(wrapper.find('input').attributes('disabled')).toBe('');
  });

  // Test readonly state
  it('is readonly when readonly prop is true', () => {
    const wrapper = mount(BaseInput, {
      props: { readonly: true }
    });
    
    expect(wrapper.find('input').attributes('readonly')).toBe('');
  });

  // Test error state
  it('shows error state and message when error prop is provided', () => {
    const wrapper = mount(BaseInput, {
      props: { error: 'Error message' }
    });
    
    expect(wrapper.classes()).toContain('base-input--error');
    expect(wrapper.find('.base-input__helper').exists()).toBe(true);
    expect(wrapper.find('.base-input__helper--error').exists()).toBe(true);
    expect(wrapper.find('.base-input__helper').text()).toBe('Error message');
  });

  // Test success state
  it('shows success state when success prop is true', () => {
    const wrapper = mount(BaseInput, {
      props: { success: true }
    });
    
    expect(wrapper.classes()).toContain('base-input--success');
  });

  // Test helper text
  it('shows helper text when helperText prop is provided', () => {
    const wrapper = mount(BaseInput, {
      props: { helperText: 'Helper text' }
    });
    
    expect(wrapper.find('.base-input__helper').exists()).toBe(true);
    expect(wrapper.find('.base-input__helper').text()).toBe('Helper text');
  });

  // Test icon rendering
  it('renders left icon when icon prop is provided', () => {
    const wrapper = mount(BaseInput, {
      props: { 
        icon: '/path/to/icon.svg',
        iconAlt: 'Icon Alt Text'
      }
    });
    
    expect(wrapper.classes()).toContain('base-input--with-icon');
    expect(wrapper.find('.base-input__icon').exists()).toBe(true);
    expect(wrapper.find('.base-input__icon-img').exists()).toBe(true);
    expect(wrapper.find('.base-input__icon-img').attributes('src')).toBe('/path/to/icon.svg');
    expect(wrapper.find('.base-input__icon-img').attributes('alt')).toBe('Icon Alt Text');
  });

  // Test right icon rendering
  it('renders right icon when iconRight prop is provided', () => {
    const wrapper = mount(BaseInput, {
      props: { 
        iconRight: '/path/to/icon.svg',
        iconRightAlt: 'Icon Alt Text'
      }
    });
    
    expect(wrapper.classes()).toContain('base-input--with-icon-right');
    expect(wrapper.find('.base-input__icon--right').exists()).toBe(true);
    expect(wrapper.find('.base-input__icon-img').exists()).toBe(true);
    expect(wrapper.find('.base-input__icon-img').attributes('src')).toBe('/path/to/icon.svg');
    expect(wrapper.find('.base-input__icon-img').attributes('alt')).toBe('Icon Alt Text');
  });

  // Test clear button
  it('shows clear button when clearable is true and has value', async () => {
    const wrapper = mount(BaseInput, {
      props: { 
        modelValue: 'Test Value',
        clearable: true
      }
    });
    
    expect(wrapper.find('.base-input__clear').exists()).toBe(true);
    
    // Test clear button click
    await wrapper.find('.base-input__clear').trigger('click');
    
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['']);
    expect(wrapper.emitted()).toHaveProperty('clear');
  });

  // Test character counter
  it('shows character counter when showCharacterCount and maxlength are provided', () => {
    const wrapper = mount(BaseInput, {
      props: { 
        modelValue: 'Test',
        maxlength: 10,
        showCharacterCount: true
      }
    });
    
    expect(wrapper.find('.base-input__counter').exists()).toBe(true);
    expect(wrapper.find('.base-input__counter').text()).toBe('4/10');
  });

  // Test input event
  it('emits update:modelValue event on input', async () => {
    const wrapper = mount(BaseInput);
    
    await wrapper.find('input').setValue('New Value');
    
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['New Value']);
  });

  // Test focus event
  it('emits focus event and updates focused state', async () => {
    const wrapper = mount(BaseInput);
    
    await wrapper.find('input').trigger('focus');
    
    expect(wrapper.emitted()).toHaveProperty('focus');
    expect(wrapper.classes()).toContain('base-input--focused');
  });

  // Test blur event
  it('emits blur event and updates focused state', async () => {
    const wrapper = mount(BaseInput);
    
    // First focus
    await wrapper.find('input').trigger('focus');
    expect(wrapper.classes()).toContain('base-input--focused');
    
    // Then blur
    await wrapper.find('input').trigger('blur');
    
    expect(wrapper.emitted()).toHaveProperty('blur');
    expect(wrapper.classes()).not.toContain('base-input--focused');
  });

  // Test number type conversion
  it('converts string to number for number input type', async () => {
    const wrapper = mount(BaseInput, {
      props: { type: 'number' }
    });
    
    await wrapper.find('input').setValue('42');
    
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([42]);
  });
});
