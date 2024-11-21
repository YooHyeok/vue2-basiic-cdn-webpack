<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <LottoBall v-for="(ball, idx) in winBalls" :number="ball.number" :key="idx"/>
    </div>
    <div>보너스</div>
    <LottoBall v-if="bonus" :number="3"/>
    <button v-if="redo">한 번 더!</button>
  </div>
</template>
<script>
  import LottoBall from './LottoBall'
  export default {
    components: {
      LottoBall
    },
    data() {
      return {
        winBalls: [
          {number : 5}
        ],
        bonus: null,
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