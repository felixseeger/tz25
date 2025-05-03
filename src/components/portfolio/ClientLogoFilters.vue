<template>
  <div class="client-logos-container">
    <div class="client-logos">
      <div class="client-logos-track">
        <!-- "All" filter option -->
        <div
          class="client-logo logo-item"
          :class="{ 'active': !selectedClientId }"
          @click="resetFilter"
        >
          <div class="all-clients">All</div>
        </div>

        <!-- Client logo filter buttons -->
        <div
          v-for="client in clientsList"
          :key="client.id"
          class="client-logo logo-item"
          :class="{ 'active': client.active }"
          @click="selectClient(client.id)"
        >
          <img :src="client.logo" :alt="client.name" />
        </div>
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
