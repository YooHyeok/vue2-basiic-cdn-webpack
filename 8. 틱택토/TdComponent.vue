<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>
<script>
export default {
  name: 'TdComponent',
  props: {
    rowData: Array,
    rowIndex: Number,
    cellData: String,
    cellIndex: Number,
  },
  methods: {
    onClickTd() {
      console.log(this.$root.$data) // 가장 최상위 부모의 data변수 접근
      this.$root.example() // 가장 최상위 부모 메소드 접근
      console.log(this.$parent.$data) // 직계 부모의 data변수 접근
      this.$parent.example()
      if (this.cellData) return; // 선택된 cell 재클릭 방지

      const cellIndex = this.cellIndex;
      const rowIndex = this.rowIndex;
      const rootData = this.$root.$data;
      
      rootData.tableData
        [rowIndex] /* 클릭 된 가로(tr) 행 */
        [cellIndex] /* 클릭 된 세로(td) 행 */
          = rootData.turn; /* 현재 turn(팀) 값으로 초기화 */
      // this.$set(rootData.tableData[rowIndex], cellIndex, rootData.turn) // [arg1]: 바꿀 대상 [arg2]: key|index [arg3]: 바꿀 값 - Vue3에서는 더이상 지원하지 않음
      /* 가로/세로/대각 3목 여부 */
      let win = false;
      if (rootData.tableData[rowIndex][0] === rootData.turn && rootData.tableData[rowIndex][1] === rootData.turn && rootData.tableData[rowIndex][2] === rootData.turn) {
        win = true; // 가로줄 3목 여부
      }
      if (rootData.tableData[0][cellIndex] === rootData.turn && rootData.tableData[1][cellIndex] === rootData.turn && rootData.tableData[2][cellIndex] === rootData.turn) {
        win = true; // 세로줄 3목 여부
      }
      if (rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn) {
        win = true; // 대각선↘ 3목 여부
      }
      if (rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn) {
        win = true; // 대각선↙ 3목 여부
      }
      /* 이긴 경우(3목 달성) */
      if (win) {
        rootData.winner = rootData.turn;
        rootData.turn = 'O';
        rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']]
      } else { /* 무승부 */
        let all = true;
        rootData.tableData.forEach((row) => { /* 무승부 검사 */
          row.forEach((cell) => {
            console.log("cell : ", cell, " !cell : ", !cell)
            if (!cell) { /* ''일 경우 */
              all = false;
            }
          });
        });
        if (all) { /* 무승부 */
          rootData.winner = '';
          rootData.turn = 'O';
          rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']]
        } else {
          rootData.turn = rootData.turn === 'O' ? 'X' : 'O'
        }
      }
    }
  }
}
</script>
<style scoped>
</style>
