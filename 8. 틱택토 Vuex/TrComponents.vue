<template>
  <tr>
    <TdComponent 
      v-for="(___, index) in rowData" 
      :row-data="rowData" 
      :row-index="rowIndex" 
      :cell-index="index" 
      :key="index"
    />
  </tr>
</template>
<script>
import TdComponent from './TdComponent'
export default {
  name: 'TrComponents',
  components: {
    TdComponent
  },
  computed: {
    rowData() {
      return this.$store.state.tableData[this.rowIndex]
    }
  },
  props: {
    rowIndex: Number
  }
}
</script>
<style scoped>
</style>
