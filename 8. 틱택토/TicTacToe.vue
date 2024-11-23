<template>
  <TableCompnent :table-data="tableData"/>
</template>
<script>
import TableCompnent from './TableCompnent.vue';
export default {
  components: {
      TableCompnent
  },
  data() {
    return {
      tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      turn: 'O' // 턴전환: O팀 ↔ X팀 
    }
  },
  methods: {
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
