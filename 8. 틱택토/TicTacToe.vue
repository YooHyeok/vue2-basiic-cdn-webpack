<template>
  <div>
    <TableCompnent :table-data="tableData" :turn="turn"/>
    <div>{{ turn }}님의 턴입니다.</div>
  </div>
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
    example(){
      console.log("내가 니 증조 할애비다")
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
