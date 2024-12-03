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
import { mapState } from 'vuex';
import TrComponents from './TrComponents'
export default {
  name: 'TableComponent',
  components: {
    TrComponents
  },
  computed: {
    ...mapState({
      tableData: state => state.tableData
    })
  }
}
</script>
<style scoped>
</style>
