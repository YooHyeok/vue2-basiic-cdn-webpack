<template>
  <div>
    <div>{{ turn }}님의 턴입니다.</div>
    <TableCompnent/>
    <div v-if="winner">{{ winner }}님의 승리</div>
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
    turn() {
      return this.store.state.turn
    },
    winner() {
      return this.store.state.winner
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
