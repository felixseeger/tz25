<template>
  <div class="section-links">
    <h2>{{ title }}</h2>
    <div class="links-grid">
      <a 
        v-for="link in links" 
        :key="link.section"
        href="#" 
        @click.prevent="navigateToHomeSection(link.section)" 
        class="section-link"
      >
        <span class="section-link__title">{{ link.title }}</span>
        <span class="section-link__desc">{{ link.description }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import { useNavigation } from '../../composables/useNavigation';

export default {
  name: 'SectionLinks',
  props: {
    title: {
      type: String,
      default: 'Entdecken Sie mehr über uns:'
    },
    links: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(link => 
          typeof link.section === 'string' && 
          typeof link.title === 'string' && 
          typeof link.description === 'string'
        );
      }
    }
  },
  setup() {
    const { navigateToHomeSection } = useNavigation();
    
    return {
      navigateToHomeSection
    };
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.section-links {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;
    color: $primary-color;
  }
  
  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    
    @media (max-width: $breakpoint-sm) {
      grid-template-columns: 1fr;
    }
  }
  
  .section-link {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    text-decoration: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 100%;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      background-color: $primary-color;
      
      .section-link__title,
      .section-link__desc {
        color: white;
      }
    }
    
    &__title {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: $primary-color;
      transition: color 0.3s ease;
    }
    
    &__desc {
      font-size: 0.9rem;
      color: #666;
      transition: color 0.3s ease;
    }
  }
}
</style>
