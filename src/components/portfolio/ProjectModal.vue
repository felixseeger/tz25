<template>
  <div v-if="show" class="project-modal-overlay" @click="closeModal">
    <div class="project-modal" @click.stop>
      <button class="modal-close-button" @click="closeModal" aria-label="Close modal">
        <span class="close-icon">×</span>
      </button>
      
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{{ project.title }}</h2>
          <div class="modal-category">{{ project.category }}</div>
        </div>
        
        <div class="modal-body">
          <div class="modal-image-container">
            <img :src="project.image" :alt="project.title" class="modal-image">
          </div>
          
          <div class="modal-details">
            <p class="modal-description">{{ project.description }}</p>
            
            <div class="modal-info">
              <div class="info-item">
                <h4>Client</h4>
                <p>{{ project.client }}</p>
              </div>
              
              <div class="info-item">
                <h4>Year</h4>
                <p>{{ project.year || 'N/A' }}</p>
              </div>
              
              <div class="info-item">
                <h4>Services</h4>
                <p>{{ project.services || 'N/A' }}</p>
              </div>
            </div>
            
            <div v-if="project.link" class="modal-link">
              <a :href="project.link" target="_blank" rel="noopener noreferrer" class="project-link-button">
                Visit Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    project: {
      type: Object,
      required: true,
      default: () => ({
        id: '',
        title: '',
        description: '',
        image: '',
        category: '',
        client: '',
        year: '',
        services: '',
        link: ''
      })
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  },
  mounted() {
    // Add event listener for escape key to close modal
    document.addEventListener('keydown', this.handleKeyDown);
    
    // Prevent body scrolling when modal is open
    if (this.show) {
      document.body.style.overflow = 'hidden';
    }
  },
  beforeUnmount() {
    // Remove event listener
    document.removeEventListener('keydown', this.handleKeyDown);
    
    // Restore body scrolling
    document.body.style.overflow = '';
  },
  watch: {
    show(newVal) {
      // Toggle body scrolling based on modal visibility
      document.body.style.overflow = newVal ? 'hidden' : '';
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    handleKeyDown(e) {
      if (this.show && e.key === 'Escape') {
        this.closeModal();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.project-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;
  animation: fadeIn 0.3s ease-out;
}

.project-modal {
  position: relative;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  background-color: #fff;
  border-radius: 4px;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.modal-close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  
  .close-icon {
    font-size: 1.5rem;
    line-height: 1;
    color: #333;
  }
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eee;
  
  .modal-title {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  .modal-category {
    display: inline-block;
    background-color: $primary-color;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 3px;
    font-size: 0.9rem;
    font-weight: 600;
  }
}

.modal-body {
  display: flex;
  flex-direction: column;
  
  @media (min-width: $breakpoint-md) {
    flex-direction: row;
  }
}

.modal-image-container {
  width: 100%;
  
  @media (min-width: $breakpoint-md) {
    width: 60%;
  }
  
  .modal-image {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}

.modal-details {
  padding: 2rem;
  width: 100%;
  
  @media (min-width: $breakpoint-md) {
    width: 40%;
  }
  
  .modal-description {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #333;
  }
}

.modal-info {
  margin-bottom: 2rem;
  
  .info-item {
    margin-bottom: 1rem;
    
    h4 {
      font-size: 0.9rem;
      text-transform: uppercase;
      color: #666;
      margin-bottom: 0.25rem;
    }
    
    p {
      font-size: 1rem;
      color: #333;
    }
  }
}

.modal-link {
  .project-link-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: $primary-color;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 600;
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
