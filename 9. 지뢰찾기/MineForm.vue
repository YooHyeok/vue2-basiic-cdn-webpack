<template>
  <div>
    <input type="number" placeholder="세로" :value="row" @change="onChangeRow">
    <input type="number" placeholder="가로" :value="cell" @change="onChangeCell">
    <input type="number" placeholder="지뢰" :value="mine" @change="onChangeMine">
    <button @click="onClickBtn">시작</button>
  </div>
</template>
<script>
import store, { START_GAME } from './store'
export default {
  name: 'MineForm',
  data() {
    return {
      row: 10,
      cell: 10,
      mine: 10,
    }
  },
  methods: {
    onChangeRow(e) {
      this.row = e.target.value;
    },
    onChangeCell(e) {
      this.cell = e.target.value;
    },
    onChangeMine(e) {
      this.mine = e.target.value;
    },
    /**
     * ## 버튼 클릭 함수
     * START_GAME mutations을 호출하며 입력된 데이터 전송
     */
    onClickBtn() {
      store.commit(START_GAME, { row: this.row, cell: this.cell, mine: this.mine })
    }
  }
}
</script>
<style scoped>
</style>
