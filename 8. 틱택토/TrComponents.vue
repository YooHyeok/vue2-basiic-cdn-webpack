<template>
  <tr>
    <TdComponent 
      v-for="(cellData, index) in rowData" 
      :row-data="rowData" 
      :row-index="rowIndex" 
      :cell-data="cellData" 
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
  props: {
    rowData: Array,
    rowIndex: Number
  }

}
</script>
<style scoped>
</style>
