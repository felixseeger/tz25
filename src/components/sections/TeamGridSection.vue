<template>
  <section class="team-grid-section">
    <div class="section-container">
      <div class="team-header">
        <h2 class="team-title">MOVE TOGETHER –</h2>
        <h2 class="team-subtitle">DAS TEAM TAKTZEIT</h2>
        <p class="team-description">
          Ehent ut eos nonsequi torehent fugia cus, conseque minci rat molum fugitatem velectur, ellenis reratiur? Quiant id est rest porempo resecte ent.
        </p>
      </div>
    </div>

    <div class="team-grid">
      <!-- Row 1 -->
      <div class="team-grid-item team-grid-item--image">
        <img src="../../assets/images/team-members/team-tobi.jpg" alt="Team Member" class="team-grid-image" />
      </div>
      <div class="team-grid-item team-grid-item--quote">
        <div class="quote">
          <span class="quote-mark">"</span>
          <p class="quote-text">Utam acerios nobitae quatqui cuptius illatnibus dolet, odia dit etusandanto quo dolectem. Itatis et volupti</p>
        </div>
      </div>

      <!-- Row 2 -->
      <div class="team-grid-item team-grid-item--image">
        <img src="../../assets/images/team-members/team-kirsten.jpg" alt="Team Member" class="team-grid-image" />
      </div>
      <div class="team-grid-item team-grid-item--quote">
        <div class="quote">
          <span class="quote-mark">"</span>
          <p class="quote-text">Utam acerios nobitae quatqui cuptius illatnibus dolet, odia dit etusandanto quo dolectem. Itatis et volupti</p>
        </div>
      </div>

      <!-- Row 3 -->
      <div class="team-grid-item team-grid-item--image">
        <img src="../../assets/images/team-members/team-jan.jpg" alt="Team Member" class="team-grid-image" />
      </div>
      <div class="team-grid-item team-grid-item--quote">
        <div class="quote">
          <span class="quote-mark">"</span>
          <p class="quote-text">Utam acerios nobitae quatqui cuptius illatnibus dolet, odia dit etusandanto quo dolectem. Itatis et volupti</p>
        </div>
      </div>

      <!-- Row 4 -->
      <div class="team-grid-item team-grid-item--image">
        <img src="../../assets/images/team-members/team-melissa.jpg" alt="Team Member" class="team-grid-image" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TeamGridSection'
}
</script>

<style lang="scss" scoped>
.team-grid-section {
  background-color: #D9D9D9;
  padding: 3rem 0 0 0;
  width: 100%;
}

.team-header {
  margin-bottom: 2rem;
  padding: 0 1.5rem;

  .team-title {
    font-size: 1.1rem;
    font-weight: 400;
    color: #4D4D4D;
    margin-bottom: 0.2rem;
    text-transform: uppercase;
  }

  .team-subtitle {
    font-size: 1.8rem;
    font-weight: 700;
    color: #4D4D4D;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  .team-description {
    font-size: 0.9rem;
    line-height: 1.4;
    color: #4D4D4D;
  }
}

.team-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  width: 100%;
  margin: 0;
  padding: 0;
}

.team-grid-item {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;

  &--image {
    aspect-ratio: 1/1;
    overflow: hidden;

    .team-grid-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &--quote {
    background-color: #E6E6E6;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1;

    .quote {
      padding: 1.5rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;

      .quote-mark {
        font-size: 4rem;
        line-height: 1;
        color: #4D4D4D;
        display: block;
        margin-bottom: 0.5rem;
        font-family: Georgia, serif;
        opacity: 0.7;
      }

      .quote-text {
        font-size: 0.85rem;
        line-height: 1.4;
        color: #4D4D4D;
        margin: 0;
        max-width: 90%;
      }
    }
  }
}

@media (max-width: 480px) {
  .team-header {
    padding: 0 1rem;

    .team-title {
      font-size: 1rem;
    }

    .team-subtitle {
      font-size: 1.5rem;
    }

    .team-description {
      font-size: 0.85rem;
    }
  }

  .team-grid-item {
    &--quote {
      .quote {
        padding: 1rem;

        .quote-mark {
          font-size: 3rem;
        }

        .quote-text {
          font-size: 0.8rem;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .team-grid-section {
    display: none;
  }
}
</style>
