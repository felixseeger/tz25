<template>
  <div class="page-layout" :class="{ [`page-layout--${pageType}`]: pageType }">
    <!-- Page Header -->
    <header v-if="showHeader" class="page-layout__header">
      <div class="container">
        <div class="page-layout__header-content">
          <h1 class="page-layout__title">{{ title }}</h1>
          <p v-if="subtitle" class="page-layout__subtitle">{{ subtitle }}</p>
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <div class="page-layout__content">
      <div class="container">
        <slot></slot>
      </div>
    </div>

    <!-- Page Footer -->
    <footer v-if="$slots.footer" class="page-layout__footer">
      <div class="container">
        <slot name="footer"></slot>
      </div>
    </footer>

    <!-- Default Footer -->
    <FooterSection v-if="showFooter" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import FooterSection from '../../components/sections/FooterSection.vue';

export default defineComponent({
  name: 'PageLayout',
  components: {
    FooterSection
  },
  props: {
    /**
     * Page title
     */
    title: {
      type: String,
      required: true
    },
    /**
     * Page subtitle
     */
    subtitle: {
      type: String,
      default: ''
    },
    /**
     * Page type/variant
     */
    pageType: {
      type: String,
      default: ''
    },
    /**
     * Whether to show the page header
     */
    showHeader: {
      type: Boolean,
      default: true
    },
    /**
     * Whether to show the default footer
     */
    showFooter: {
      type: Boolean,
      default: true
    }
  }
});
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 80px; // Space for fixed navbar

  &__header {
    padding: 3rem 0 2rem;
    background-color: $primary-color;
    color: $text-color;
  }

  &__header-content {
    text-align: left;
    max-width: 800px;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 1rem;
    text-align: left;

    @media (max-width: $breakpoint-md) {
      font-size: 2rem;
    }
  }

  &__subtitle {
    font-size: 1.2rem;
    margin: 0;
    max-width: 800px;
    text-align: left;

    @media (max-width: $breakpoint-md) {
      font-size: 1rem;
    }
  }

  &__content {
    flex: 1;
    padding: 3rem 0;
  }

  &__footer {
    padding: 2rem 0;
    background-color: #f5f5f5;
  }

  // Page type variants
  &--light {
    background-color: #ffffff;

    .page-layout__header {
      background-color: #f5f5f5;
      color: #333;
    }
  }

  &--dark {
    background-color: #333;
    color: #fff;

    .page-layout__header {
      background-color: #222;
    }

    .page-layout__content {
      color: #fff;
    }
  }

  &--karriere {
    background-color: #ffffff;

    .page-layout__header {
      background-color: #595959;
      color: $text-color;
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 40%;
        height: 100%;
        background-image: url('../../assets/images/webdev.svg');
        background-repeat: no-repeat;
        background-position: right center;
        background-size: contain;
        opacity: 0.2;
        z-index: 1;
      }
    }
  }

  // Legal page styles moved to _legal-pages.scss
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
}
</style>
