<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
    </div>
    <div>보너스</div>
    <button v-if="redo">한 번 더!</button>
  </div>
</template>
<script>
  
  export default {
    data() {
      return {
        redo: false
      }
    },
    mounted() {
      
    },
    beforeDestory() {

    },
    computed: {
      
    },
    watch: {

    },
    methods: {
      
    },
  }
</script>
<style scoped>
</style>