<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>
<script>
import { eventBus } from './EventBus';
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
      if (this.cellData) return; // 선택된 cell 재클릭 방지
      eventBus.$emit('clickTd', this.rowIndex, this.cellIndex)
    }
  }
}
</script>
<style scoped>
</style>
