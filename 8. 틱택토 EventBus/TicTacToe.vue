<template>
  <div>
    <div>{{ turn }}님의 턴입니다.</div>
    <TableCompnent :table-data="tableData" :turn="turn"/>
    <div v-if="winner">{{ winner }}님의 승리</div>
  </div>
</template>
<script>
import TableCompnent from './TableCompnent.vue';
import EventBus from './EventBus';
export default {
  components: {
      TableCompnent
  },
  created() {
    EventBus.$on('clickTd', this.onClickTd);
  },
  beforeDestroy() {
    EventBus.$on('clickTd', this.onClickTd);
  },
  data() {
    return {
      tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      turn: 'O', // 턴전환: O팀 ↔ X팀
      winner: ''
    }
  },
  methods: {
    onClickTd(rowIndex, cellIndex) {
      
      this.$set(this.tableData[rowIndex], cellIndex, this.turn) // [arg1]: 바꿀 대상 [arg2]: key|index [arg3]: 바꿀 값 - Vue3에서는 더이상 지원하지 않음
      /* 가로/세로/대각 3목 여부 */
      let win = false;
      if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn) {
        win = true; // 가로줄 3목 여부
      }
      if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn) {
        win = true; // 세로줄 3목 여부
      }
      if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn) {
        win = true; // 대각선↘ 3목 여부
      }
      if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn) {
        win = true; // 대각선↙ 3목 여부
      }
      /* 이긴 경우(3목 달성) */
      if (win) {
        this.winner = this.turn;
        this.turn = 'O';
        this.tableData = [['', '', ''], ['', '', ''], ['', '', '']]
      } else { /* 무승부 */
        let all = true;
        this.tableData.forEach((row) => { /* 무승부 검사 */
          row.forEach((cell) => {
            console.log("cell : ", cell, " !cell : ", !cell)
            if (!cell) { /* ''일 경우 */
              all = false;
            }
          });
        });
        if (all) { /* 무승부 */
          this.winner = '';
          this.turn = 'O';
          this.tableData = [['', '', ''], ['', '', ''], ['', '', '']]
        } else {
          this.turn = this.turn === 'O' ? 'X' : 'O'
        }
      }
    },
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
