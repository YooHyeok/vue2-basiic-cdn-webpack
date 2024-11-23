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
      this.$root.$data.turn = this.$root.$data.turn === 'O' ? 'X' : 'O'
    }
  }
}
</script>
<style scoped>
</style>
