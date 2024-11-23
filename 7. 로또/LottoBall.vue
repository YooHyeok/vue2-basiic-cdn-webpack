<template>
  <div class="ball" :style="{ background }">{{ number }}</div>
</template>
<script>
export default {
  name: 'LottoBall',
  props: {
    number: {
      type: Number
    }
  },
  data() {
    let background;
    switch(true) {
      case this.number <= 10 :
        background = 'red'
        break;
      case this.number <= 20 :
        background = 'orange'
        break;
      case this.number <= 30 :
        background = 'yellow'
        break;
      case this.number <= 40 :
        background = 'blue'
        break;
      default :
      background = 'green'
    }
    return {
      background,
    }
  },
  created() {
  }
}
</script>
<style scoped>
  .ball {
    display : inline-block;
    border: 1px solid black;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    margin-right: 20px;
  }
</style>
