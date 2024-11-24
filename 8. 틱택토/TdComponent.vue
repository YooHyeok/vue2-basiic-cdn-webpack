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
      const rootData = this.$root.$data;
      this.$parent.example()
      rootData.tableData
        [this.rowIndex] /* 클릭 된 가로(tr) 행 */
        [this.cellIndex] /* 클릭 된 세로(td) 행 */
          = rootData.turn; /* 현재 turn(팀) 값으로 초기화 */
      // this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn) // [arg1]: 바꿀 대상 [arg2]: key|index [arg3]: 바꿀 값 - Vue3에서는 더이상 지원하지 않음
      rootData.turn = rootData.turn === 'O' ? 'X' : 'O'
    }
  }
}
</script>
<style scoped>
</style>
