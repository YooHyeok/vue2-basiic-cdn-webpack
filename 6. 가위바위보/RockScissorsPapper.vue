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
  export default {
    data() {
      return {
        imgCoord: rspCoords.바위,
        result: '',
        score: 0,
      }
    },
    computed: {
      computedStyleObject () {
        return { 
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`
        }
      }
    },
    methods: {
      onClickButton(choice) {
        console.log(choice)
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