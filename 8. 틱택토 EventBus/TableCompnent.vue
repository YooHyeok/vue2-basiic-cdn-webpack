<template>
  <table>
    <TrComponents 
      v-for="(rowData, index) in tableData" 
      :row-data="rowData" 
      :row-index="index" 
      :key="index"
    />
  </table>
</template>
<script>
import TrComponents from './TrComponents'
export default {
  name: 'TableComponent',
  components: {
    TrComponents
  },
  props: {
    tableData: Array,
  }
}
</script>
<style scoped>
</style>
