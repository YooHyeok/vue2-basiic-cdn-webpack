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
import store from './store';
import TableCompnent from './TableCompnent.vue';
import MineForm from './MineForm.vue';
export default {
  store,
  components: {
    MineForm,
    TableCompnent
  },
  computed: {
   ...mapState(['timer', 'result'])
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
