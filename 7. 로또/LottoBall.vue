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
    try {
        if (this.number <= 10) {
          background = 'red'
          return;
      }
      if (this.number <= 20) {
        background = 'orange'
        return;
      }
      if (this.number <= 30) {
        background = 'yellow'
        return;
      }
      if (this.number <= 40) {
        background = 'blue'
        return;
      }
      background = 'green'
    }
    finally {
      return {
        background,
      }
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
