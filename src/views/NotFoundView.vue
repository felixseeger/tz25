<template>
  <div class="not-found">
    <div class="video-container">
      <video autoplay loop playsinline class="not-found-video" ref="videoPlayer">
        <source src="../assets/images/404.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div class="video-controls">
        <button @click="toggleMute" class="sound-toggle">
          <span v-if="isMuted">🔇</span>
          <span v-else>🔊</span>
        </button>
      </div>
    </div>
    <div class="content">
      <h1>404</h1>
      <p>Seite nicht gefunden</p>
      <router-link to="/" class="home-link">Zurück zur Startseite</router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'NotFoundView',
  setup() {
    const videoPlayer = ref(null);
    const isMuted = ref(true); // Start muted by default for better user experience

    // Toggle mute/unmute
    const toggleMute = () => {
      if (videoPlayer.value) {
        videoPlayer.value.muted = !videoPlayer.value.muted;
        isMuted.value = videoPlayer.value.muted;
      }
    };

    onMounted(() => {
      // Ensure video starts muted (browsers may ignore the muted attribute)
      if (videoPlayer.value) {
        videoPlayer.value.muted = true;
      }
    });

    return {
      videoPlayer,
      isMuted,
      toggleMute
    };
  }
});
</script>

<style lang="scss" scoped>
// No inline styles needed - using global styles from _not-found.scss
</style>
