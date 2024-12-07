<template>
  <div>
    <MineForm/>
    <div>{{ timer }}</div>
    <TableCompnent/>
    <div>{{ result }}</div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import store, { INCREMENT_TIMER } from './store';
import TableCompnent from './TableCompnent.vue';
import MineForm from './MineForm.vue';

let inverval;
export default {
  store,
  components: {
    MineForm,
    TableCompnent
  },
  computed: {
   ...mapState(['timer', 'result', 'isHalted'])
  },
  watch: {
    isHalted(n, o) {
      if (n === false) { // false: 게임 시작
        inverval = setInterval(() => {
          store.commit(INCREMENT_TIMER);
        }, 1000)
        return
      }
      clearInterval(inverval);
    }
  },
  methods: {
   
  }
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
