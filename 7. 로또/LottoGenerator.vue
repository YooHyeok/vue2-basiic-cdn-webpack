<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <LottoBall v-for="(ball, idx) in winBalls" :number="ball.number" :key="idx"/>
    </div>
    <div>보너스</div>
    <LottoBall v-if="bonus" :number="bonus"/>
    <button v-if="redo" @click="onClickRedo">한 번 더!</button>
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
  let timeouts = []
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
      this.showBalls();
      /* for (let i = 0; i < this.winNumbers.length -1; i++) {
       timeouts[i] = setTimeout(() => { // i = 0: 1초 후 [0] 추가 / 1: 2초후 [1] 추가
          this.winBalls.push({number: this.winNumbers[i]});
        }, (i + 1) * 1000);
      }
      timeouts[6] = setTimeout(() => {
        this.bonus = this.winNumbers[6];
        this.redo = true;
      }, 7000) */
    },
    beforeDestory() {
      timeouts.forEach(timeout => {
        clearTimeout(timeout)
      })
    },
    computed: {
      
    },
    watch: {

    },
    methods: {
      onClickRedo() {
        this.winNumbers = getWinNumbers();
        this.winBalls = [];
        this.bonus = null;
        this.redo = false;
        this.showBalls();
      },
      showBalls() {
        for (let i = 0; i < this.winNumbers.length -1; i++) {
          setTimeout(() => { // i = 0: 1초 후 [0] 추가 / 1: 2초후 [1] 추가
            this.winBalls.push({number: this.winNumbers[i]});
          }, (i + 1) * 1000);
        }
        setTimeout(() => {
          this.bonus = this.winNumbers[6];
          this.redo = true;
        }, 7000)
      }
    },
  }
</script>
<style scoped>
</style>
