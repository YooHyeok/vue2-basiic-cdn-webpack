<template>
  <td>{{ cellData }}</td>
</template>
<script>
export default {
  name: 'TdComponent',
  props: {
    rowData: Array,
    rowIndex: Number,
    cellData: String,
    cellIndex: Number,
  }
}
</script>
<style scoped>
</style>
