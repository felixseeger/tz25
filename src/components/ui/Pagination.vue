<template>
  <div class="pagination" role="navigation" aria-label="Pagination">
    <button 
      class="pagination-button pagination-prev" 
      @click="prev" 
      :disabled="currentPage === 1"
      aria-label="Previous page"
    >
      <img src="../../assets/images/arrow_left.svg" alt="Previous" class="pagination-arrow" />
    </button>
    
    <div class="pagination-info">
      <span class="pagination-current">{{ currentPage }}</span>
      <span class="pagination-separator">/</span>
      <span class="pagination-total">{{ totalPages }}</span>
    </div>
    
    <button 
      class="pagination-button pagination-next" 
      @click="next" 
      :disabled="currentPage === totalPages"
      aria-label="Next page"
    >
      <img src="../../assets/images/arrow_right.svg" alt="Next" class="pagination-arrow" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ['update:currentPage'],
  setup(props, { emit }) {
    const prev = () => {
      if (props.currentPage > 1) {
        emit('update:currentPage', props.currentPage - 1);
      }
    };

    const next = () => {
      if (props.currentPage < props.totalPages) {
        emit('update:currentPage', props.currentPage + 1);
      }
    };

    return {
      prev,
      next
    };
  }
};
</script>

<style lang="scss" scoped>
// Styles will be added to src/assets/scss/components/_pagination.scss
</style>
