<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>
<script>
import { CLICK_CELL, SET_WINNER, NO_WINNER, RESET_GAME, CHANGE_TURN } from './store';
export default {
  name: 'TdComponent',
  props: {
    rowIndex: Number,
    cellIndex: Number,
  },
  computed: {
    tableData() {
      return this.$store.state.tableData;
    },
    cellData() {
      return this.$store.state.tableData[this.rowIndex][this.cellIndex];
    },
    turn() {
      return this.$store.state.turn;
    },
  },
  methods: {
    onClickTd() {
      if (this.cellData) return; // 선택된 cell 재클릭 방지

      const cellIndex = this.cellIndex;
      const rowIndex = this.rowIndex;
      const tableData = this.tableData;
      const turn = this.turn;
      
      this.$store.commit(CLICK_CELL, {row: rowIndex, cell: cellIndex}) // CLICK_CELL mutations 메소드 호출(commit)
      let win = false; // 승/무 여부
      /* 3목 여부 확인 */
      if (tableData[rowIndex][0] === turn && tableData[rowIndex][1] === turn && tableData[rowIndex][2] === turn) {
        win = true; // 가로줄 3목 여부
      }
      if (tableData[0][cellIndex] === turn && tableData[1][cellIndex] === turn && tableData[2][cellIndex] === turn) {
        win = true; // 세로줄 3목 여부
      }
      if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
        win = true; // 대각선↘ 3목 여부
      }
      if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
        win = true; // 대각선↙ 3목 여부
      }
      /* 이긴 경우(3목 달성) */
      if (win) {
        this.$store.commit(SET_WINNER, turn) // SET_WINNER mutations 메소드 호출(commit)
        this.$store.commit(RESET_GAME) // RESET_GAME mutations 메소드 호출(commit)
      } else { /* 무승부 */
        let all = true;
        tableData.forEach((row) => { /* 무승부 검사 */
          row.forEach((cell) => {
            if (!cell) { /* ''일 경우 */
              all = false;
            }
          });
        });
        if (all) { /* 무승부 */
          this.$store.commit(NO_WINNER) // NO_WINNER mutations 메소드 호출(commit)
          this.$store.commit(RESET_GAME) // RESET_GAME mutations 메소드 호출(commit)
        } else { // !(승&&무)
          this.$store.commit(CHANGE_TURN) // CHANGE_TURN mutations 메소드 호출(commit)
        }
      }
    }
  }
}
</script>
<style scoped>
</style>
