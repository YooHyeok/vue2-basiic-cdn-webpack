<template>
  <div>
    <div>{{ turnMsg }}</div>
    <TableCompnent/>
    <div v-if="winner">{{ winMsg }}</div>
  </div>
</template>
<script>
import TableCompnent from './TableCompnent.vue';
import { mapState, mapGetters } from 'vuex';
export default {
  components: {
      TableCompnent
  },
  computed: {
    ...mapState(['winner', 'turn']),
    ...mapState({
      winnerV2: state=> state.winner,
      turnV2: state=> state.turn
    }),
    ...mapState({
      winnerV3(state) {state.winner + 1}, 
      turnV3(state) {state.turn + this.value} // 기존 state에 컴포넌트 data 조합(일반함수는 this 사용 가능)
    }),
    ...mapGetters(['winMessage']),
    ...mapGetters(['turnMessage']),
    ...mapGetters({winMsg: 'winMessage'}), // getters는 화살표 함수 참조가 불가능하다.
    ...mapGetters({turnMsg: 'turnMessage'}), // getters는 화살표 함수 참조가 불가능하다.
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
