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
  /**
   * 로또 번호 생성
   */
  const getWinNumbers = () => {
    const candidate = Array(45).fill().map((value, index) => index + 1);
    const shuffle = [];
    while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor( Math.random() * candidate.length ), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length -1];
    const winNumbers = shuffle.slice(0, 6).sort((previous, current) => previous - current);
    return [...winNumbers, bonusNumber]
  }
  export default {
    components: {
      LottoBall
    },
    data() {
      return {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false
      }
    },
    mounted() {
      console.log(this.winNumbers)
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