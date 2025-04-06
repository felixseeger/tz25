<template>
  <div v-if="isOpen" class="video-modal">
    <div class="video-modal__overlay" @click="closeModal"></div>
    <div class="video-modal__content">
      <div class="video-modal__header">
        <button class="video-modal__sound-toggle" @click="toggleSound" :aria-label="isMuted ? 'Unmute video' : 'Mute video'">
          <span class="video-modal__sound-icon" :class="{ 'video-modal__sound-icon--muted': isMuted }">
            <svg v-if="!isMuted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          </span>
        </button>
        <button class="video-modal__close" @click="closeModal" aria-label="Close video">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="video-modal__video-container">
        <video 
          ref="videoPlayer" 
          class="video-modal__video" 
          :src="videoSrc" 
          :muted="isMuted" 
          controls 
          autoplay
          @ended="videoEnded"
        ></video>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

export default {
  name: 'VideoModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    videoSrc: {
      type: String,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const videoPlayer = ref(null);
    const isMuted = ref(true); // Start muted by default
    
    // Toggle sound on/off
    const toggleSound = () => {
      isMuted.value = !isMuted.value;
      if (videoPlayer.value) {
        videoPlayer.value.muted = isMuted.value;
      }
    };
    
    // Close the modal
    const closeModal = () => {
      emit('close');
    };
    
    // Handle video end
    const videoEnded = () => {
      // Optional: do something when video ends
      console.log('Video playback ended');
    };
    
    // Handle escape key to close modal
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && props.isOpen) {
        closeModal();
      }
    };
    
    // Watch for modal open/close to handle body scroll
    watch(() => props.isOpen, (newVal) => {
      if (newVal) {
        // Disable scrolling on body when modal is open
        document.body.style.overflow = 'hidden';
        // Add event listener for escape key
        window.addEventListener('keydown', handleKeyDown);
      } else {
        // Re-enable scrolling when modal is closed
        document.body.style.overflow = '';
        // Remove event listener
        window.removeEventListener('keydown', handleKeyDown);
        // Pause video when modal is closed
        if (videoPlayer.value) {
          videoPlayer.value.pause();
        }
      }
    });
    
    // Clean up on component unmount
    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    });
    
    return {
      videoPlayer,
      isMuted,
      toggleSound,
      closeModal,
      videoEnded
    };
  }
};
</script>

<style lang="scss" scoped>
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
  }
  
  &__content {
    position: relative;
    width: 90%;
    max-width: 1200px;
    z-index: 1001;
    background-color: #000;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  &__sound-toggle, &__close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
  
  &__sound-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    
    &--muted {
      color: #ff5252;
    }
  }
  
  &__video-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }
  
  &__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: #000;
  }
}

// Animation for modal
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.9); }
  to { transform: scale(1); }
}

.video-modal {
  animation: fadeIn 0.3s ease forwards;
  
  &__content {
    animation: scaleIn 0.3s ease forwards;
  }
}
</style>
