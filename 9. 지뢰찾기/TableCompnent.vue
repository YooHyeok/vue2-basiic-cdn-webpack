<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td v-for="(cellData, cellIndex) in rowData" :key="cellIndex" :style="cellDataStyle(rowIndex, cellIndex)" @click="onClickTd(rowIndex, cellIndex)" >
        {{ cellDataText(rowIndex, cellIndex) }}
      </td>
    </tr>
  </table>
</template>
<script>
import { mapState } from "vuex";
import store, { CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUSTION_CELL } from "./store";
export default {
  store,
  name: 'TableComponent',
  data() {
    return {
      value: "바보"
    }
  },
  computed: {
    ...mapState(['tableData', 'isHalted']),
    cellDataStyle(state) {
       return function(row, cell) {
        switch (store.state.tableData[row][cell]) {
          case CODE.NORMAL : 
          case CODE.MINE : 
            return {
              background: '#444'
            };
          case CODE.CLICKED_MINE : 
          case CODE.OPENED : 
            return {
              background: 'white'
            };
          case CODE.FLAG : 
          case CODE.FLAG_MINE : 
            return {
              background: 'red'
            };
          case CODE.QUESTION : 
          case CODE.QUESTION_MINE : 
            return {
              background: 'yellow'
            };
          default : 
            return {};
        }
      }
    },
    cellDataText() {
      return function(row, cell) {
        switch (store.state.tableData[row][cell]) {
          case CODE.NORMAL :
            return '';
          case CODE.MINE :
            return 'X';
          case CODE.FLAG, CODE.FLAG_MINE :
            return '!'
          case CODE.QUESTION, CODE.QUESTION_MINE :
            return '?';
          case CODE.CLICKED_MINE :
            return '펑';
          default : 
            return '';
        }
      }
    },
    
  },
  methods: {
    onClickTd(row, cell) {
      if (this.isHalted) return;
      store.commit(OPEN_CELL, {row, cell})
    }
  }
}
</script>
<style scoped>
</style>
