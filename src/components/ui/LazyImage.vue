<template>
  <div 
    class="lazy-image-container"
    :class="{ 'lazy-image-loaded': isLoaded, 'lazy-image-loading': !isLoaded }"
    :style="{ 
      aspectRatio: aspectRatio, 
      width: width, 
      height: height,
      backgroundColor: placeholderColor
    }"
  >
    <!-- Placeholder while image is loading -->
    <div v-if="!isLoaded && showPlaceholder" class="lazy-image-placeholder">
      <slot name="placeholder">
        <div class="lazy-image-placeholder-content">
          <div class="lazy-image-placeholder-spinner"></div>
        </div>
      </slot>
    </div>
    
    <!-- Actual image (hidden until loaded) -->
    <img
      v-show="isLoaded"
      ref="imageRef"
      :src="currentSrc"
      :alt="alt"
      :width="width"
      :height="height"
      :class="[
        'lazy-image', 
        { 'lazy-image-fade-in': fadeIn },
        imageClass
      ]"
      :style="imageStyle"
      @load="onImageLoaded"
      @error="onImageError"
    />
    
    <!-- Error state -->
    <div v-if="hasError" class="lazy-image-error">
      <slot name="error">
        <div class="lazy-image-error-content">
          <span>Failed to load image</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'LazyImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: 'auto'
    },
    aspectRatio: {
      type: String,
      default: null
    },
    placeholderColor: {
      type: String,
      default: '#f0f0f0'
    },
    threshold: {
      type: Number,
      default: 0.1
    },
    rootMargin: {
      type: String,
      default: '50px 0px'
    },
    fadeIn: {
      type: Boolean,
      default: true
    },
    showPlaceholder: {
      type: Boolean,
      default: true
    },
    imageClass: {
      type: [String, Object, Array],
      default: ''
    },
    imageStyle: {
      type: Object,
      default: () => ({})
    },
    // Support for responsive images
    srcset: {
      type: String,
      default: ''
    },
    sizes: {
      type: String,
      default: ''
    },
    // Low quality image placeholder
    lqip: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const imageRef = ref(null);
    const isIntersecting = ref(false);
    const isLoaded = ref(false);
    const hasError = ref(false);
    let observer = null;

    // Determine which source to use
    const currentSrc = computed(() => {
      // If the element is not yet intersecting, use the low quality placeholder if available
      if (!isIntersecting.value && props.lqip) {
        return props.lqip;
      }
      // Otherwise use the full image
      return isIntersecting.value ? props.src : '';
    });

    // Set up intersection observer
    const setupObserver = () => {
      if (!imageRef.value) return;

      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          isIntersecting.value = entry.isIntersecting;
          
          // If the image is already loaded, disconnect the observer
          if (entry.isIntersecting && isLoaded.value) {
            observer.disconnect();
          }
          
          // Emit event when the image enters or leaves the viewport
          emit(entry.isIntersecting ? 'enter' : 'leave', entry);
        },
        {
          threshold: props.threshold,
          rootMargin: props.rootMargin
        }
      );

      observer.observe(imageRef.value);
    };

    // Handle image load event
    const onImageLoaded = () => {
      isLoaded.value = true;
      hasError.value = false;
      emit('load', { src: props.src });
      
      // Disconnect observer once the image is loaded
      if (observer && isIntersecting.value) {
        observer.disconnect();
        observer = null;
      }
    };

    // Handle image error event
    const onImageError = (error) => {
      hasError.value = true;
      emit('error', { src: props.src, error });
    };

    // Set up observer when component is mounted
    onMounted(() => {
      // Use requestAnimationFrame to ensure the DOM is fully rendered
      requestAnimationFrame(() => {
        setupObserver();
      });
    });

    // Clean up observer when component is unmounted
    onBeforeUnmount(() => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    });

    return {
      imageRef,
      isIntersecting,
      isLoaded,
      hasError,
      currentSrc,
      onImageLoaded,
      onImageError
    };
  }
};
</script>

<style lang="scss">
.lazy-image-container {
  position: relative;
  overflow: hidden;
  display: block;
  width: 100%;
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
  
  &.lazy-image-loaded {
    background-color: transparent;
  }
}

.lazy-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  
  &.lazy-image-fade-in {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
}

.lazy-image-loaded .lazy-image.lazy-image-fade-in {
  opacity: 1;
}

.lazy-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: inherit;
  z-index: 1;
}

.lazy-image-placeholder-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.lazy-image-placeholder-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  animation: lazy-image-spin 1s linear infinite;
}

.lazy-image-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.05);
  z-index: 2;
}

.lazy-image-error-content {
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  font-size: 14px;
  color: #ff3333;
}

@keyframes lazy-image-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
