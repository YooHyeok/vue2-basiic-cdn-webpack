<template>
  <TableCompnent :table-data="tableData"/>
</template>
<script>
import TableCompnent from './TableCompnent.vue';
export default {
  components: {
      TableCompnent
  },
  data() {
    return {
      tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ]
    }
  },
  methods: {
    
  },
}
</script>
<style scoped>
</style>
