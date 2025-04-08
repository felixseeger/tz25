<template>
  <teleport to="body" v-if="isOpen">
    <div class="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-modal-title">
      <div class="video-modal__overlay" @click="closeModal" aria-hidden="true"></div>
      <button class="video-modal__close" @click="closeModal" aria-label="Close video">
        ×
      </button>
      <div class="video-modal__content">
        <div class="video-modal__header">
          <button class="video-modal__sound-toggle" @click="toggleSound" :aria-label="isMuted ? 'Unmute video' : 'Mute video'">
            <span class="video-modal__sound-icon" :class="{ 'video-modal__sound-icon--muted': isMuted }">
              <svg v-if="!isMuted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            </span>
          </button>
        </div>
        <div class="video-modal__video-container" role="presentation">
          <video
            ref="videoPlayer"
            class="video-modal__video"
            :src="videoSrc"
            :muted="isMuted"
            controls
            autoplay
            @ended="videoEnded"
            id="video-modal-title"
            aria-label="Video content"
          ></video>
        </div>
      </div>
    </div>
  </teleport>
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
  width: 100vw;
  height: 100vh;
  z-index: 999999; /* Extremely high z-index to ensure it's above everything */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &__overlay {
    position: fixed; /* Changed from absolute to fixed */
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.98); /* Almost black background */
    backdrop-filter: blur(10px); /* Increased blur effect */
    z-index: 999990; /* Very high z-index */
  }

  &__content {
    position: relative;
    width: 95%;
    max-width: 1800px; /* Further increased max-width */
    max-height: 95vh; /* Increased max-height */
    z-index: 999995; /* Very high z-index */
    background-color: #000;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    margin: 0 auto; /* Center horizontally */
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem; /* Increased padding */
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 999996; /* Very high z-index */
    border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border */
  }

  &__sound-toggle {
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    cursor: pointer;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.3s ease, transform 0.3s ease;
    margin: 0 5px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
      transform: scale(1.1);
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }

  &__close {
    position: fixed;
    top: 20px;
    right: 20px;
    background: transparent; /* Removed background color */
    border: none; /* Removed border */
    color: white;
    cursor: pointer;
    width: 100px; /* Much bigger */
    height: 100px; /* Much bigger */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    font-size: 100px; /* Even bigger X for better visibility without background */
    font-weight: 300; /* Lighter font weight for a cleaner look */
    z-index: 9999999; /* Extremely high z-index */
    pointer-events: auto !important; /* Ensure it can be clicked */
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.7); /* Add text shadow for better visibility */

    &:hover {
      transform: scale(1.2); /* Larger scale effect */
      color: rgba(255, 255, 255, 0.9); /* Slightly transparent white */
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.8); /* Enhanced glow effect */
    }

    svg {
      width: 48px;
      height: 48px;
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
    height: 0;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
    max-height: calc(95vh - 80px); /* Account for header height */
    overflow: hidden;
    z-index: 999997; /* Very high z-index */
  }

  &__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: #000;
    max-height: calc(95vh - 80px); /* Account for header height */
    z-index: 999998; /* Very high z-index */
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
