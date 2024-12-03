<template>
  <div>
    <div>{{ turnMessage }}</div>
    <TableCompnent/>
    <div v-if="winner">{{ winMessage }}</div>
  </div>
</template>
<script>
import TableCompnent from './TableCompnent.vue';
export default {
  components: {
      TableCompnent
  },
  computed: {
    store() {
      return this.$store
    },
    turnMessage() {
      return this.store.getters.turnMessage
    },
    winner() {
      return this.store.state.winner
    },
    winMessage() {
      return this.store.getters.winMessage
    }
  },
}
</script>
<style>
  table {
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>
