<template>
  <div>
    <!-- <div id="computer" :class="{ state: true, hello: false}"></div> --> <!-- 객체형식으로 가능 -->
    <div id="computer" :style="computedStyleObject"/>
    <div>
      <button @click="onClickButton('바위')">바위</button>
      <button @click="onClickButton('가위')">가위</button>
      <button @click="onClickButton('보')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>현재 {{ score }}점</div>
  </div>
</template>
<script>
  const rspCoords = {
    바위: '0',
    가위: '-136px',
    보: '-284px'
  }
  const scores = {
    가위: 1,
    바위: 0,
    보: -1
  }
  const computerChoice = (imgCoord) => {
    /* return (
      Object.entries(rspCoords) // 객체를 2차원 배열로 변환 (property기준 row)
      .find(arr => arr[1] === imgCoord)[0]
      ); */
      for (const key in rspCoords) {
        if (rspCoords[key] === imgCoord) 
          return key;
      }
  }
  let interval = null;
  export default {
    data() {
      return {
        imgCoord: rspCoords.바위,
        result: '',
        score: 0,
      }
    },
    mounted() {
      this.changeHand()
    },
    beforeDestroy() {
      clearInterval(interval)
    },
    computed: {
      computedStyleObject () {
        return { 
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`
        }
      }
    },
    methods: {
      changeHand() {
        interval = setInterval(()=>{
          if (this.imgCoord === rspCoords.바위) {
            this.imgCoord = rspCoords.가위
            return;
          }
          if (this.imgCoord === rspCoords.가위) {
            this.imgCoord = rspCoords.보
            return;
          }
          this.imgCoord = rspCoords.바위
        }, 100)
      },
      onClickButton(choice) {
        clearInterval(interval); // 손 정지
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(this.imgCoord)]
        const diff = myScore - cpuScore;
        try {
          if(diff === 0) {
            this.result = '비겼습니다.'
            return 
          }
          if([-1, 2].includes(diff)) {
            this.result = '이겼습니다.'
            this.score += 1;
            return 
          }
          this.result = '졌습니다.'
          this.score -= 1;
        } finally {
          setTimeout(() => {
            this.changeHand()
          }, 2000)
        }
      }
    },
  }
</script>
<style scoped>
  #computer {
    width: 148px;
    height: 200px;
    background-position: 0 0;
  }
</style>