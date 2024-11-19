<template>
  <div>
    <div id="screen" v-bind:class="state" @click="onClickScreen">{{ message }}</div> <!-- 클릭 영역 -->
    <template v-if="true">
      <!-- <div>평균 시간: {{ result.reduce((acc, cur) => acc + cur, 0) / result.length || 0 }} ms</div> -->
      <!-- <div>평균 시간: {{ computedAverage }} ms</div> --> <!-- 연산 computed 적용 -->
      <div>평균 시간: {{ average }} ms</div> <!-- 연산 watched 적용 -->
      <button @click="onReset" :disabled="disabled">리셋</button>
    </template>
  </div>
</template>
<script>
  let startTime = 0;
  let endTime = 0;
  let timeOut = null;
  export default {
    data() {
      return {
        result: [],
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        average: 0,
        computedAverage: 0,
        disabled: true
      }
    },
    computed: {
      computedAverage() {
        const sum = this.result.reduce((acc, cur) => acc + cur, 0)
        const length = this.result.length
        return length === 0 ? 0 : sum / length
      }
    },
    watch: {
      result: {
        handler(o, n) {
          const sum = n.reduce((acc, cur) => acc + cur, 0)
          const length = n.length
          this.average = sum / length
        },
        deep: true
      } 
    },
    methods: {
      onReset() {
        this.result = [];
        this.state = 'waiting'
        this.message = '클릭해서 시작하세요'
        this.disabled = true;
      },
      onClickScreen() {
        if (this.state === 'waiting') {
          this.state = 'ready'
          this.message = '초록색이 되면 클릭하세요'
          timeOut = setTimeout(()=>{
            this.state = 'now';
            this.message = '지금 클릭!';
            this.disabled = false;
            startTime = new Date();
          }, Math.floor(Math.random() * 1000) + 2000);
          return;
        }
        if (this.state === 'ready') {
          clearTimeout(timeOut)
          this.state = 'waiting'
          this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요'
          return;
        }
        if (this.state === 'now') {
          endTime = new Date();
          this.state = 'waiting'
          this.message = '클릭해서 시작하세요'
          this.result.push(endTime - startTime)
          return;
        }
      }
    },
  }
</script>
<style>
  #screen {
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }
    #screen.waiting {
        background-color: aqua;
    }
    #screen.ready {
        background-color: red;
        color: white;
    }
    #screen.now {
        background-color: greenyellow;
    }
</style>