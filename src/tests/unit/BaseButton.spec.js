import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '@/components/base/BaseButton.vue';

describe('BaseButton.vue', () => {
  // Test rendering with default props
  it('renders correctly with default props', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Test Button'
      }
    });
    
    expect(wrapper.text()).toBe('Test Button');
    expect(wrapper.classes()).toContain('base-button');
    expect(wrapper.classes()).toContain('base-button--primary');
    expect(wrapper.classes()).toContain('base-button--medium');
    expect(wrapper.attributes('type')).toBe('button');
    expect(wrapper.attributes('disabled')).toBeFalsy();
  });

  // Test different variants
  it('applies the correct variant class', () => {
    const variants = ['primary', 'secondary', 'outline', 'text', 'danger'];
    
    variants.forEach(variant => {
      const wrapper = mount(BaseButton, {
        props: { variant }
      });
      
      expect(wrapper.classes()).toContain(`base-button--${variant}`);
    });
  });

  // Test different sizes
  it('applies the correct size class', () => {
    const sizes = ['small', 'medium', 'large'];
    
    sizes.forEach(size => {
      const wrapper = mount(BaseButton, {
        props: { size }
      });
      
      expect(wrapper.classes()).toContain(`base-button--${size}`);
    });
  });

  // Test block prop
  it('applies block class when block prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: { block: true }
    });
    
    expect(wrapper.classes()).toContain('base-button--block');
  });

  // Test disabled state
  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true }
    });
    
    expect(wrapper.classes()).toContain('base-button--disabled');
    expect(wrapper.attributes('disabled')).toBe('');
  });

  // Test loading state
  it('shows loading state when loading prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true },
      slots: {
        default: 'Test Button'
      }
    });
    
    expect(wrapper.classes()).toContain('base-button--loading');
    expect(wrapper.find('.base-button__loader').exists()).toBe(true);
    expect(wrapper.find('.base-button__content--hidden').exists()).toBe(true);
    expect(wrapper.attributes('disabled')).toBe('');
  });

  // Test icon rendering
  it('renders icon when icon prop is provided', () => {
    const wrapper = mount(BaseButton, {
      props: { 
        icon: '/path/to/icon.svg',
        iconAlt: 'Icon Alt Text'
      }
    });
    
    expect(wrapper.find('.base-button__icon').exists()).toBe(true);
    expect(wrapper.find('.base-button__icon-img').exists()).toBe(true);
    expect(wrapper.find('.base-button__icon-img').attributes('src')).toBe('/path/to/icon.svg');
    expect(wrapper.find('.base-button__icon-img').attributes('alt')).toBe('Icon Alt Text');
  });

  // Test icon position
  it('positions icon correctly based on iconPosition prop', () => {
    const wrapper = mount(BaseButton, {
      props: { 
        icon: '/path/to/icon.svg',
        iconPosition: 'right'
      }
    });
    
    expect(wrapper.find('.base-button__icon--right').exists()).toBe(true);
  });

  // Test click event
  it('emits click event when clicked', async () => {
    const wrapper = mount(BaseButton);
    
    await wrapper.trigger('click');
    
    expect(wrapper.emitted()).toHaveProperty('click');
    expect(wrapper.emitted().click).toHaveLength(1);
  });

  // Test that click event is not emitted when disabled
  it('does not emit click event when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true }
    });
    
    await wrapper.trigger('click');
    
    expect(wrapper.emitted().click).toBeFalsy();
  });

  // Test that click event is not emitted when loading
  it('does not emit click event when loading', async () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true }
    });
    
    await wrapper.trigger('click');
    
    expect(wrapper.emitted().click).toBeFalsy();
  });
});
