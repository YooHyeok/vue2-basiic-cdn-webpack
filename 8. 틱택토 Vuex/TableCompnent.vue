<template>
  <table>
    <TrComponents 
      v-for="(___, index) in tableData"
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
  computed: {
    tableData() {
      return this.$store.state.tableData
    }
  }
}
</script>
<style scoped>
</style>
