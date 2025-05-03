<template>
  <div class="client-logos-container">
    <div class="client-logos">
      <div class="client-logos-track">
        <!-- "All" filter option -->
        <button
          type="button"
          class="client-logo logo-item"
          :class="{ 'active': !selectedClientId }"
          @click="resetFilter"
          aria-label="Show all clients"
          :aria-pressed="!selectedClientId"
        >
          <div class="all-clients">All</div>
        </button>

        <!-- Client logo filter buttons -->
        <button
          v-for="client in clientsList"
          :key="client.id"
          type="button"
          class="client-logo logo-item"
          :class="{ 'active': client.active }"
          @click="selectClient(client.id)"
          :aria-label="`Filter by ${client.name}`"
          :aria-pressed="client.active"
        >
          <img :src="client.logo" :alt="client.name" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientLogoFilters',
  props: {
    clientsList: {
      type: Array,
      required: true
    },
    selectedClientId: {
      type: String,
      default: null
    }
  },
  emits: ['select-client', 'reset-filter'],
  methods: {
    selectClient(clientId) {
      this.$emit('select-client', clientId);
    },
    resetFilter() {
      this.$emit('reset-filter');
    }
  }
}
</script>

<style lang="scss" scoped>
/* Styles moved to src/assets/scss/components/_client-logo-filters.scss */
</style>
